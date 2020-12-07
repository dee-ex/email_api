package main

import (
	"io"
	"io/ioutil"
	// "fmt"
	"net/http"
	"errors"
	"encoding/json"

	"github.com/gorilla/mux"
	"github.com/emersion/go-imap"
	"github.com/emersion/go-imap/client"
	"github.com/emersion/go-message/mail"
)

func HandleGetAllSent(w http.ResponseWriter, r *http.Request) {
	var data LoginUser
    err := json.NewDecoder(r.Body).Decode(&data)
    if err != nil {
        http.Error(w, err.Error(), 400)
        return
    }
	c, err := IMAPLogin(data.Username, data.Password)
	if err != nil {
        http.Error(w, err.Error(), 400)
        return
    }

    defer c.Logout()
    envelopes, err := GetAllSent(c)
    if err != nil {
    	http.Error(w, err.Error(), 500)
    	return
    }
	json.NewEncoder(w).Encode(envelopes)
}

func HandleGetDetailSent(w http.ResponseWriter, r *http.Request) {
	var data LoginUser
    err := json.NewDecoder(r.Body).Decode(&data)
    if err != nil {
        http.Error(w, err.Error(), 400)
        return
    }
	c, err := IMAPLogin(data.Username, data.Password)
	if err != nil {
        http.Error(w, err.Error(), 400)
        return
    }

    defer c.Logout()
    envelopes, err := GetAllSent(c)
    if err != nil {
    	http.Error(w, err.Error(), 500)
    	return
    }

    vars := mux.Vars(r)
    seqid := 0
    // fmt.Println(len(envelopes))
    for i, enve := range envelopes {
    	// fmt.Println(i, enve.MessageId)
    	if enve.MessageId == vars["id"] {
    		seqid = i
    		break
    	}
    }
    if seqid == 0 {
    	http.Error(w, "Not found", 404)
    	return	
    }
    mail, err := GetDetailSent(c, uint32(seqid))
    json.NewEncoder(w).Encode(mail)
}

func GetAllSent(c *client.Client) ([]Envelope, error) {
    done := make(chan error, 1)
    mbox, err := c.Select("[Gmail]/Sent Mail", false)
	if err != nil {
        return nil, err
	}
	from := uint32(1)
	to := mbox.Messages
	seqset := new(imap.SeqSet)
	seqset.AddRange(from, to)

	messages := make(chan *imap.Message, 10)
	done = make(chan error, 1)
	go func() {
		done <- c.Fetch(seqset, []imap.FetchItem{imap.FetchEnvelope}, messages)
	}()

	envelopes := []Envelope{}

	for msg := range messages {
		enve := Envelope{msg.Envelope.Date, msg.Envelope.Subject, msg.Envelope.From, msg.Envelope.Sender, msg.Envelope.ReplyTo, msg.Envelope.To, msg.Envelope.Cc, msg.Envelope.Bcc, msg.Envelope.InReplyTo, msg.Envelope.MessageId}
		envelopes = append(envelopes, enve)
	}

	if err := <-done; err != nil {
        return nil, err
	}

	return envelopes, nil
}

func GetDetailSent(c *client.Client, seqid uint32) (*Mail, error) {
	seqSet := new(imap.SeqSet)
	seqSet.AddNum(seqid + 1)

	var section imap.BodySectionName
	items := []imap.FetchItem{section.FetchItem()}

	messages := make(chan *imap.Message, 1)
	go func() {
		if err := c.Fetch(seqSet, items, messages); err != nil {
			return
		}
	}()

	msg := <-messages
	if msg == nil {
		return nil, errors.New("Server didn't returned message")
	}

	r := msg.GetBody(&section)
	if r == nil {
		return nil, errors.New("Server didn't returned message body")
	}

	// Create a new mail reader
	mr, err := mail.CreateReader(r)
	if err != nil {
		return nil, err
	}

	m := Mail{}
	header := mr.Header
	if date, err := header.Date(); err == nil {
		m.Date = date
	}
	if from, err := header.AddressList("From"); err == nil {
		m.From = from
	}
	if reply_to, err := header.AddressList("Reply-To"); err == nil {
		m.ReplyTo = reply_to
	}
	if to, err := header.AddressList("To"); err == nil {
		m.To = to
	}
	if cc, err := header.AddressList("Cc"); err == nil {
		m.Cc = cc
	}
	if bcc, err := header.AddressList("Bcc"); err == nil {
		m.Bcc = bcc
	}
	if in_reply_to, err := header.AddressList("In-Reply-To"); err == nil {
		m.InReplyTo = in_reply_to
	}
	if subject, err := header.Subject(); err == nil {
		m.Subject = subject
	}

	for {
		p, err := mr.NextPart()
		if err == io.EOF {
			break
		} else if err != nil {
			return nil, err
		}

		switch p.Header.(type) {
		case *mail.InlineHeader:
			b, _ := ioutil.ReadAll(p.Body)
			m.Body = string(b)
		}
	}
	return &m, nil
}
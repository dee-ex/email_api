package main

import (
	"time"

	"github.com/emersion/go-imap"
	"github.com/emersion/go-message/mail"
)

type (
	LoginUser struct {
		Username string `json: "username"`
		Password string `json: "password"`
	}
	Envelope struct {
	    Date time.Time `json: "date"`
	    Subject string `json: "subject"`
	    From []*imap.Address `json: "from"`
	    Sender []*imap.Address `json: "sender"`
	    ReplyTo []*imap.Address `json: "reply_to"`
	    To  []*imap.Address `json: "to"`
	    Cc  []*imap.Address `json: "cc"`
    	Bcc []*imap.Address `json: "bcc"`
    	InReplyTo string `json: "in_reply_to"`
	    MessageId string `json: "message_id"`
	}
	Mail struct {
	    Date time.Time `json: "date"`
	    Subject string `json: "subject"`
	    From []*mail.Address `json: "from"`
	    ReplyTo []*mail.Address `json: "reply_to"`
	    To  []*mail.Address `json: "to"`
	    Cc  []*mail.Address `json: "cc"`
    	Bcc []*mail.Address `json: "bcc"`
    	InReplyTo  []*mail.Address `json: "in_reply_to"`
	    Body string `json: "body"`	
	}
	DataSent struct {
		From string `json: "from"`
		Password string `json: "password"`
		To string `json: "to"`
		Subject string `json: "subject"`
		Body string `json: "body"`
	}
)
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/emersion/go-sasl"
	"github.com/emersion/go-smtp"
)

func HandleSend(w http.ResponseWriter, r *http.Request) {
	var data DataSent
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	auth := sasl.NewPlainClient("", data.From, data.Password)

	msg := strings.NewReader(fmt.Sprintf("To: %s\r\nFrom: %s\r\nSubject: %s\r\n\r\n%s\r\n", data.To, data.From, data.Subject, data.Body))
	err = smtp.SendMail("smtp.gmail.com:587", auth, data.From, []string{data.To}, msg)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
}

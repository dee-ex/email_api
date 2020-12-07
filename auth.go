package main

import (
	"net/http"
	"encoding/json"

	"github.com/emersion/go-imap/client"
)

type (
	LoginStatus struct {
		Success bool `json: "success"`
	}
)

func HandleLogin(w http.ResponseWriter, r *http.Request) {
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
    c.Logout()
}

func IMAPLogin(username, password string) (*client.Client, error) {
	c, err := client.DialTLS("imap.gmail.com:993", nil)
	if err != nil {
		return nil, err
	}

	if err := c.Login(username, password); err != nil {
		return nil, err
	}
	return c, nil
}
package main

import (
    "log"
    "net/http"

    "github.com/gorilla/mux"
)

func StartServer() {
    router := mux.NewRouter().StrictSlash(true)

    router.HandleFunc("/login", HandleLogin).Methods("GET")
    router.HandleFunc("/mailbox/inbox", HandleGetAllInbox).Methods("GET")
    router.HandleFunc("/mailbox/inbox/{id}", HandleGetDetailInbox).Methods("GET")
    router.HandleFunc("/mailbox/sent", HandleGetAllSent).Methods("GET")
    router.HandleFunc("/mailbox/sent/{id}", HandleGetDetailSent).Methods("GET")
    router.HandleFunc("/send", HandleSend).Methods("POST")

    log.Fatal(http.ListenAndServe(":8000", router))
}

func main() {
    log.Println("SERVER STARTS 8000")
    StartServer()
}
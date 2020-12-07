package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func StartServer() {
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/login", HandleLogin).Methods("POST")
	router.HandleFunc("/mailbox/inbox", HandleGetAllInbox).Methods("POST")
	router.HandleFunc("/mailbox/inbox/{id}", HandleGetDetailInbox).Methods("POST")
	router.HandleFunc("/mailbox/sent", HandleGetAllSent).Methods("POST")
	router.HandleFunc("/mailbox/sent/{id}", HandleGetDetailSent).Methods("POST")
	router.HandleFunc("/send", HandleSend).Methods("POST")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},                                                 // All origins
		AllowedMethods: []string{http.MethodGet, http.MethodPost, http.MethodOptions}, // Allowing only get, just an example
	})
	enhancedRouter := c.Handler(router)

	enhancedRouter = handlers.LoggingHandler(os.Stdout, enhancedRouter)

	log.Fatal(http.ListenAndServe(":8000", enhancedRouter))
}

func main() {
	log.Println("SERVER STARTS 8000")
	StartServer()
}

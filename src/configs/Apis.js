import axios from "axios"

export let endpoints={
    "points":"/points/",
    "lines":"/lines/",
    "trips":"/trips/",
    "tickets": (tripId) => `/trips/${tripId}/tickets/`,
    "line":(lineId) => `/lines/${lineId}/`,
    "login": "/o/token/",
    "current-user": "/users/current-user/",
    "book-ticket":(tripId) =>  `/trips/${tripId}/book-ticket/`,
    "sell-ticket":(tripId) => `/trips/${tripId}/sell-ticket/`,
    "register": "/users/",
    "change-profile":"/users/change-profile/",
    "users-ticket":"/users/tickets/",
    "ticket-detail":(ticketId) => `tickets/${ticketId}/detail/`,
    "change-pass": "/users/change-password/", 
    "feedback": (ticketId) =>`/tickets/${ticketId}/feedback/`,
    "get-feedback": (tripId) => `users/get-feedbacks`
}

export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})
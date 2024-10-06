package com.minho.backend.response;

public class ServerErrorResponse {

    private final String status = "error";

    private String message;

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

}
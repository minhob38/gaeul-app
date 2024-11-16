package com.minho.backend.constant;

import lombok.Getter;

public class ErrorCode {

    @Getter
    public enum Server {

        // normal
        SERVER_0000("server error"),

        // database error
        SERVER_0001("id does not exist"),

        // external api service error
        SERVER_0011("api request fail by invalid argument"),

        SERVER_0012("api request fail by external server");

        private final String description;

        Server(String description) {
            this.description = description;
        }

    }

    @Getter
    public enum Client {

        // normal
        CLIENT_0000("client error"),

        // not found error
        CLIENT_0001("api does not exist"),

        // argument error
        CLIENT_0002("argument is invalid");

        private final String description;

        Client(String description) {
            this.description = description;
        }

    }

    @Getter
    public enum Auth {

        // normal
        AUTH_0000("auth error"),

        // user
        AUTH_0001("user already exists"), AUTH_0002("user does not exists"),

        // password
        AUTH_0011("password does not match"), AUTH_0012("both current and new password are required"),
        AUTH_0013("current password is same as new password"),

        // jwt
        AUTH_0021("jwt does not exist"), AUTH_0022("jwt is invalid"), AUTH_0023("jwt is expired"),
        AUTH_0024("bearer token is invalid");

        private final String description;

        Auth(String description) {
            this.description = description;
        }

    }

}

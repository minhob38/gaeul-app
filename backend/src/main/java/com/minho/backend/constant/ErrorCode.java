package com.minho.backend.constant;

import lombok.Getter;

public class ErrorCode {

    @Getter
    public enum Server {

        // normal
        SERVER_0000("server error");

        private final String description;

        Server(String description) {
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
        AUTH_0011("password does not match"),

        // jwt
        AUTH_0021("jwt does not exist"), AUTH_0022("jwt is invalid"), AUTH_0023("jwt is expired");

        private final String description;

        Auth(String description) {
            this.description = description;
        }

    }

}

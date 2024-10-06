package com.minho.backend.constant;

import lombok.Getter;

public class ErrorCode {

    @Getter
    public enum Auth {

        // user
        AUTH_0001("user already exists"), AUTH_0002("user does not exists"),

        // password
        AUTH_0011("password does not match"),

        // jwt
        AUTH_0021("jwt secret key is invalid"), AUTH_0022("jwt is invalid"), AUTH_0023("jwt is expired");

        private final String description;

        Auth(String description) {
            this.description = description;
        }

    }

}

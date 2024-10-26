package com.minho.backend.api.source.domain.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

public class SourceCommand {

    @Getter
    @RequiredArgsConstructor
    public static class Fetch {

        private final String email;

        private final String password;

        // public User toEntity() {
        // return User.builder().email(this.email).password(this.password).build();
        // }

    }

}

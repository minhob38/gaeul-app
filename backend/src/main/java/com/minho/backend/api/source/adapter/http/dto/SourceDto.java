package com.minho.backend.api.source.adapter.http.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

public class SourceDto {

    @ToString
    @Getter
    @RequiredArgsConstructor
    public static class Data {

        private final String message;

    }

    // POST:api/v1/mail/fetch
    public static class Fetch {

        @Getter
        @ToString
        public static class RequestBody {

            @NotBlank(message = "email is required - '':(X) / '':(X) / null:(X)")
            String email;

            @NotBlank(message = "password is required - '':(X) / '':(X) / null:(X)")
            String password;

        }

    }

}
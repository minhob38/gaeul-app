package com.minho.backend.api.auth.adapter.http.dto;

import com.minho.backend.api.auth.domain.dto.AuthInfo;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

public class AuthDto {

    // POST:api/auth/signup
    public static class Signup {

        @Getter
        @ToString
        public static class RequestBody {

            @NotBlank(message = "email is required - '':(X) / '':(X) / null:(X)")
            String email;

            @NotBlank(message = "password is required - '':(X) / '':(X) / null:(X)")
            String password;

        }

        @ToString
        @Getter
        @RequiredArgsConstructor
        public static class Data {

            private final String key;

        }

    }

    // POST:api/auth/signin
    public static class Signin {

        @Getter
        @ToString
        public static class RequestBody {

            @NotBlank(message = "email is required - '':(X) / ' ':(X) / null:(X)")
            String email;

            @NotBlank(message = "password is required - '':(X) / '':(X) / null:(X)")
            String password;

        }

        @ToString
        @Getter
        @RequiredArgsConstructor
        public static class Data {

            private final String key;

            private final String accessToken;

        }

    }

    // GET:api/auth/me
    public static class ReadMe {

        @ToString
        @Getter
        @RequiredArgsConstructor
        public static class Data {

            private final String key;

            private final String email;

        }

    }

    // Patch:api/auth/me
    public static class ModifyMe {

        @Getter
        @ToString
        public static class RequestBody {

            String email;

            String currentPassword;

            String newPassword;

        }

        @ToString
        @Getter
        @RequiredArgsConstructor
        public static class Data {

            private final String key;

            private final String email;

        }

    }

}
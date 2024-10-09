package com.minho.backend.api.auth.adapter.http.dto;

import com.minho.backend.api.auth.domain.dto.AuthInfo;
import jakarta.validation.constraints.NotBlank;
import java.time.ZonedDateTime;
import java.util.Date;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

public class AuthDto {

    @ToString
    @Getter
    @RequiredArgsConstructor
    public static class Data {

        private final String key;

        private final String email;

        private final String name;

        // private final String password; <- password는 숨기기

        private final ZonedDateTime passwordChangedAt;

        private final ZonedDateTime signedupAt;

        private final Date signedinAt;

        private final ZonedDateTime signedoutAt;

        private final Date createdAt;

        private final Date updatedAt;

        private final String accessToken;

    }

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

    }

    // GET:api/auth/me
    public static class ReadMe {

    }

    // Patch:api/auth/me
    public static class ModifyMe {

        @Getter
        @ToString
        public static class RequestBody {

            String name;

            String currentPassword;

            String newPassword;

        }

    }

}
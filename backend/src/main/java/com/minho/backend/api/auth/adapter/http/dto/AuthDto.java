package com.minho.backend.api.auth.adapter.http.dto;

import com.minho.backend.api.common.AuthType;
import jakarta.validation.constraints.NotBlank;
import java.time.ZonedDateTime;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

public class AuthDto {

    @ToString
    @Getter
    @RequiredArgsConstructor
    public static class Data {

        private final String key;

        private final AuthType authType;

        private final String email;

        private final String name;

        // private final String password; <- password는 숨기기

        private final ZonedDateTime passwordChangedAt;

        private final ZonedDateTime signedupAt;

        private final ZonedDateTime signedinAt;

        private final ZonedDateTime signedoutAt;

        private final String accessToken;

        private final String refreshToken;

        private final ZonedDateTime refreshTokenExpiresAt;

        private final String oauthId;

        private final String oauthName;

        // private final String oauthAccessToken; <- oauth access token은 숨기기

        // private final ZonedDateTime oauthAccessTokenExpiresAt <- oauth access token
        // expires in은 숨기기;

        // private final String oauthRefreshToken; <- oauth refresh token은 숨기기;

        // private final ZonedDateTime oauthRefreshTokenExpiresAt; <- oauth refresh token
        // expires in은 숨기기

        private final ZonedDateTime trashedAt;

        private final ZonedDateTime untrashedAt;

        private final ZonedDateTime purgedAt;

        private final ZonedDateTime unpurgedAt;

        private final ZonedDateTime createdAt;

        private final ZonedDateTime updatedAt;

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
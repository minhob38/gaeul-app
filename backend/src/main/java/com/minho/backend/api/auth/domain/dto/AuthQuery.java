package com.minho.backend.api.auth.domain.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

public class AuthQuery {

    @Getter
    @RequiredArgsConstructor
    public static class ReadMe {

        private final Long userId;

    }

    @Getter
    @RequiredArgsConstructor
    public static class OAuthPage {

        private final String provider;

    }

    @Getter
    @RequiredArgsConstructor
    public static class OAuthSignin {

        private final String authorizationCode;

    }

}

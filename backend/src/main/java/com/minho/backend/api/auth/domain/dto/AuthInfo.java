package com.minho.backend.api.auth.domain.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

public class AuthInfo {

    @RequiredArgsConstructor
    @Getter
    public static class SignupInfo {

        private final String key;

    }

    @RequiredArgsConstructor
    @Getter
    public static class SigninInfo {

        private final String key;

        private final String accessToken;

    }

    @RequiredArgsConstructor
    @Getter
    public static class MeInfo {

        private final String key;

        private final String email;

    }

}
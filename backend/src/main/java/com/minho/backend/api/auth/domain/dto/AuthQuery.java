package com.minho.backend.api.auth.domain.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

public class AuthQuery {

    @Getter
    @RequiredArgsConstructor
    public static class ReadMe {

        private final Long userId;

    }

}

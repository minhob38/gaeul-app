package com.minho.backend.api.auth.domain.dto;

import com.minho.backend.api.auth.domain.entity.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

public class AuthQuery {

    @Getter
    @RequiredArgsConstructor
    public static class ReadMe {

        private final Long userId;

    }

}

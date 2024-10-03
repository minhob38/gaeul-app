package com.minho.backend.api.auth.domain.dto;

import com.minho.backend.api.auth.domain.entity.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

public class AuthCommand {

    @Getter
    @RequiredArgsConstructor
    public static class SignupCommand {

        private final String email;

        private final String password;

        public User toEntity() {
            return User.builder().email(this.email).password(this.password).build();
        }

    }

    @Getter
    @RequiredArgsConstructor
    public static class SigninCommand {

        private final String email;

        private final String password;

        public User toEntity() {
            return User.builder().email(this.email).password(this.password).build();
        }

    }

    @Getter
    @RequiredArgsConstructor
    public static class ModifyPasswordCommand {

        private final Long userId;

        private final String newPassword;

        private final String currentPassword;

    }

    @Getter
    @RequiredArgsConstructor
    public static class SignoutCommand {

        private final Long userId;

    }

}

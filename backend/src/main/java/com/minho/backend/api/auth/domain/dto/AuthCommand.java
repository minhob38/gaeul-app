package com.minho.backend.api.auth.domain.dto;

import com.minho.backend.api.auth.domain.entity.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

public class AuthCommand {

    @Getter
    @RequiredArgsConstructor
    public static class Signup {

        private final String email;

        private final String password;

        public User toEntity() {
            return User.builder().email(this.email).password(this.password).build();
        }

    }

    @Getter
    @RequiredArgsConstructor
    public static class Signin {

        private final String email;

        private final String password;

        public User toEntity() {
            return User.builder().email(this.email).password(this.password).build();
        }

    }

    @Getter
    @RequiredArgsConstructor
    public static class ModifyMe {

        private final Long userId;

        private final String email;

        private final String currentPassword;

        private final String newPassword;

    }

    @Getter
    @RequiredArgsConstructor
    public static class Signout {

        private final Long userId;

    }

}

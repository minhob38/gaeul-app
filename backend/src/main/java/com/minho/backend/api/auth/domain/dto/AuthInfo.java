package com.minho.backend.api.auth.domain.dto;

import java.time.ZonedDateTime;
import java.util.Date;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

// TODO: 하나의 Info로 묶기
public class AuthInfo {

    @RequiredArgsConstructor
    @Getter
    public static class Signup {

        private final Long id;

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

    }

    @RequiredArgsConstructor
    @Getter
    public static class Signin {

        private final Long id;

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

    @RequiredArgsConstructor
    @Getter
    public static class ReadMe {

        private final Long id;

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

    }

    @RequiredArgsConstructor
    @Getter
    public static class ModifyMe {

        private final Long id;

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

    }

}
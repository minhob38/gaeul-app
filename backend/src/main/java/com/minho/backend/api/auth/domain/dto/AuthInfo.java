package com.minho.backend.api.auth.domain.dto;

import java.time.ZonedDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@ToString
@Builder
@Getter
@RequiredArgsConstructor
public class AuthInfo {

    private final Long id;

    private final String key;

    private final String email;

    private final String name;

    // private final String password; <- password는 숨기기

    private final ZonedDateTime passwordChangedAt;

    private final ZonedDateTime signedupAt;

    private final ZonedDateTime signedinAt;

    private final ZonedDateTime signedoutAt;

    private final ZonedDateTime trashedAt;

    private final ZonedDateTime untrashedAt;

    private final ZonedDateTime purgedAt;

    private final ZonedDateTime unpurgedAt;

    private final ZonedDateTime createdAt;

    private final ZonedDateTime updatedAt;

    private final String accessToken;

}
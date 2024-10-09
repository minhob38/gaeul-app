package com.minho.backend.api.auth.domain.dto;

import java.time.ZonedDateTime;
import java.util.Date;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

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

    private final Date signedinAt;

    private final ZonedDateTime signedoutAt;

    private final Date createdAt;

    private final Date updatedAt;

    private final String accessToken;

}
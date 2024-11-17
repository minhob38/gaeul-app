package com.minho.backend.api.auth.adapter.oauth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class GoogleUserResponse {

    @JsonProperty("family_name")
    private String familyName;

    @JsonProperty("given_name")
    private String givenName;

    @JsonProperty("verified_email")
    private String verifiedEmail;

    private String name;

    private String picture;

    private String email;

    private String id;

}

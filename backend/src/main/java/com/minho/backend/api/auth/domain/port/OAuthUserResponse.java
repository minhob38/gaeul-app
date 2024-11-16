package com.minho.backend.api.auth.domain.port;

import com.minho.backend.api.auth.domain.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@Builder
public class OAuthUserResponse {

    private final String id;

    private final String email;

    private final String name;

    public User toEntity() {
        return User.builder().email(this.email).name(this.name).build();
    }

}

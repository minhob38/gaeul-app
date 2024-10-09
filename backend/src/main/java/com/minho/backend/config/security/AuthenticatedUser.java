package com.minho.backend.config.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@RequiredArgsConstructor
public class AuthenticatedUser implements UserDetails {

    private Long id;

    private String key;

    private String email;

    private String password;

    private Date createdAt;

    private Date updatedAt;

    @Builder
    public AuthenticatedUser(Long id, String key, String email, String password, Date createdAt, Date updatedAt) {
        this.id = id;
        this.key = key;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<String> roles = new ArrayList<>();
        roles.add("ROLE_" + "ADMIN");

        return roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return "minho";
    }

}

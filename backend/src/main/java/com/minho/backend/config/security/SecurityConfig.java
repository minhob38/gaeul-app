package com.minho.backend.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationCheckEntryPoint authenticationCheckEntryPoint;

    private final JwtConfig jwtConfig;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // https://docs.spring.io/spring-security/reference/servlet/authorization/authorize-http-requests.html
        http.csrf(csrf -> csrf.disable())
            .httpBasic(Customizer.withDefaults())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authorize -> authorize.requestMatchers("/api/auth/signup")
                .permitAll()
                .requestMatchers("api/auth/signin")
                .permitAll()
                .anyRequest()
                .authenticated())
            .exceptionHandling(exception -> exception.authenticationEntryPoint(authenticationCheckEntryPoint))
            .apply(jwtConfig);

        return http.build();
    }

}

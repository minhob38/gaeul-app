package com.minho.backend.config.security;

import com.minho.backend.config.security.exception.AuthenticationCheckEntryPoint;
import com.minho.backend.config.security.jwt.JwtConfig;
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
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        // https://docs.spring.io/spring-security/reference/servlet/authorization/authorize-http-requests.html
        httpSecurity.csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults()) // https://docs.spring.io/spring-security/reference/servlet/integrations/cors.html
            .httpBasic(Customizer.withDefaults())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authorize -> authorize.requestMatchers("/api/v1/auth/signup")
                .permitAll()
                .requestMatchers("api/v1/auth/signin")
                .permitAll()
                .anyRequest()
                .authenticated())
            .exceptionHandling(exception -> exception.authenticationEntryPoint(authenticationCheckEntryPoint))
            .apply(this.jwtConfig);

        return httpSecurity.build();
    }

}

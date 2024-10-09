package com.minho.backend.util;

import com.minho.backend.config.EnvironmentConfig;
import com.minho.backend.constant.ErrorCode;
import com.minho.backend.exception.AuthException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AuthUtil {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public AuthUtil() {
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    public String encodePassword(String password) {
        return this.bCryptPasswordEncoder.encode(password);
    }

    public Boolean matchPassword(String plainPassword, String encodedPassword) {
        return bCryptPasswordEncoder.matches(plainPassword, encodedPassword);
    }

    public String createJwt(String userKey, Long expireMinutes) {
        Date now = Date.from(Instant.now());
        Date expireAt = new Date(now.getTime() + expireMinutes * 60 * 1000);

        SecretKey secretKey = Keys.hmacShaKeyFor(EnvironmentConfig.getJwtSecretKey().getBytes());
        return Jwts.builder()
            .signWith(secretKey)
            .claim("user_key", userKey)
            .expiration(expireAt)
            .claim("service", "my service")
            .compact();
    }

    public Jws<Claims> validJwt(String jwt) throws AuthException {
        SecretKey secretKey = Keys.hmacShaKeyFor(EnvironmentConfig.getJwtSecretKey().getBytes());

        try {
            Jws<Claims> claims = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(jwt);
            return claims;
        }
        catch (SecurityException | MalformedJwtException e) {
            log.info("### invalid jwt");
            throw new AuthException(ErrorCode.Auth.AUTH_0022);
        }
        catch (ExpiredJwtException e) {
            log.info("### expired jwt");
            throw new AuthException(ErrorCode.Auth.AUTH_0023);
        }
        catch (Exception e) {
            log.info("### jwt error");
            throw new AuthException(ErrorCode.Auth.AUTH_0022);
        }
    }

    public JwtPayload parseJwt(Jws<Claims> claims) {
        Claims payload = claims.getPayload();
        return new JwtPayload(payload.get("user_key", String.class));
    }

}

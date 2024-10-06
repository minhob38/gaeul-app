package com.minho.backend.util;

import com.minho.backend.config.SecretConfig;
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

    private final SecretConfig secretConfig;

    @Autowired
    public AuthUtil(SecretConfig secretConfig) {
        this.secretConfig = secretConfig;
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

        SecretKey secretKey = Keys.hmacShaKeyFor(this.secretConfig.getJwtSecretKey().getBytes());
        return Jwts.builder()
            .signWith(secretKey)
            .claim("user_key", userKey)
            .expiration(expireAt)
            .claim("my_temp_key", "my_temp_value")
            .compact();
    }

    public Jws<Claims> validJwt(String jwt) throws AuthException {
        SecretKey secretKey = Keys.hmacShaKeyFor(this.secretConfig.getJwtSecretKey().getBytes());

        try {
            Jws<Claims> claims = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(jwt);
            return claims;
        }
        catch (SecurityException | MalformedJwtException e) {
            throw new AuthException(ErrorCode.Auth.AUTH_0022);
        }
        catch (ExpiredJwtException e) {
            throw new AuthException(ErrorCode.Auth.AUTH_0023);
        }
        catch (Exception e) {
            throw new AuthException(ErrorCode.Auth.AUTH_0022);
        }
    }

    public Claims parseJwt(Jws<Claims> claims) {
        Claims payload = claims.getPayload();
        return payload;
    }

    // public Authentication getAuthentication(String jwt) {
    // Claims claims = this.validJwt(jwt);
    // List authorities = Arrays.stream(claims.get("user_key").toString().split(",")).map(
    // SimpleGrantedAuthority::new)
    // .collect(Collectors.toList());
    //
    // return new UsernamePasswordAuthenticationToken("admin", "abc", authorities);
    // }

}

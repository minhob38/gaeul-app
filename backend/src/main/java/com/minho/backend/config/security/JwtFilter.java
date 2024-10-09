package com.minho.backend.config.security;

import com.minho.backend.constant.ErrorCode;
import com.minho.backend.exception.AuthException;
import com.minho.backend.exception.ServerException;
import com.minho.backend.util.AuthUtil;
import com.minho.backend.util.JwtPayload;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtFilter extends OncePerRequestFilter {

    private static final String[] nochecks = { "/api/auth/signup", "/api/auth/signin" };

    private final AuthUtil authUtil;

    private final AuthenticatedUserService authenticatedUserService;

    private final AuthenticationCheckEntryPoint authenticationCheckEntryPoint;

    private boolean checkIsAuthCheckPath(String requestURI) {
        return !PatternMatchUtils.simpleMatch(nochecks, requestURI);
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        log.info("### jwt filter ###");

        HttpServletRequest httpRequest = request;
        String requestURI = httpRequest.getRequestURI();

        System.out.println(this.checkIsAuthCheckPath(requestURI));
        try {
            if (!this.checkIsAuthCheckPath(requestURI)) {
                chain.doFilter(request, response);
                return;
            }

            String jwt = httpRequest.getHeader("access_token");
            Jws<Claims> claims = this.authUtil.validJwt(jwt);
            JwtPayload payload = this.authUtil.parseJwt(claims);

            AuthenticatedUser authenticatedUser = this.authenticatedUserService.findUserByKey(payload.getUserKey());

            Authentication authentication = new UsernamePasswordAuthenticationToken(authenticatedUser, null,
                    authenticatedUser.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authentication);

            chain.doFilter(request, response);
        }
        catch (AuthException e) {
            authenticationCheckEntryPoint.commence(request, response, new JwtAuthenticationException(e));
        }
        catch (Exception e) {
            authenticationCheckEntryPoint.commence(request, response,
                    new ServerAuthenticationException(new ServerException(ErrorCode.Server.SERVER_0000)));
        }
    }

}

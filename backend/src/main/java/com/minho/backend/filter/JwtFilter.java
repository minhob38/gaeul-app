package com.minho.backend.filter;

import com.minho.backend.config.security.AuthenticatedUserService;
import com.minho.backend.util.AuthUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@RequiredArgsConstructor
@Component
public class JwtFilter extends OncePerRequestFilter {

    private static final String[] nochecks = { "/api/auth/signup", "/api/auth/signin" };

    private final AuthUtil authUtil;

    private final AuthenticatedUserService authenticatedUserService;

    private boolean checkIsAuthCheckPath(String requestURI) {
        System.out.println(requestURI);
        return !PatternMatchUtils.simpleMatch(nochecks, requestURI);
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) {
        System.out.println("do filter");

        HttpServletRequest httpRequest = request;
        String requestURI = httpRequest.getRequestURI();

        System.out.println(this.checkIsAuthCheckPath(requestURI));
        try {
            if (!this.checkIsAuthCheckPath(requestURI)) {
                chain.doFilter(request, response);
                return;
            }

            String jwt = httpRequest.getHeader("access_token");
            System.out.println(jwt);
            Jws<Claims> claims = this.authUtil.validJwt(jwt);
            Claims payload = this.authUtil.parseJwt(claims);
            System.out.println(payload);
            payload.get("user_key");
            // this.authenticatedUserService.findUserByKey(p)
            // throw new AuthException("hahahah");
            // this.authUtil.validJwt()

            // SecurityContextHolder.getContext().setAuthentication(authentication);
            // this.authUtil.validJwt()
            // new UsernamePasswordAuthenticationToken()

            // chain.doFilter(request, response);

            // Authentication authentication = this.authUtil.getAuthentication(jwt);
            // SecurityContextHolder.getContext().setAuthentication(authentication);
            // security 복잡하지만, 결론은
            // SecurityContextHolder.getContext().setAuthentication(authentication)
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

}

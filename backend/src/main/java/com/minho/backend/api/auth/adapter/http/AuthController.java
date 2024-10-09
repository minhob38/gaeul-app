package com.minho.backend.api.auth.adapter.http;

import com.minho.backend.api.auth.adapter.http.dto.AuthDto;
import com.minho.backend.api.auth.adapter.http.dto.AuthDto.ReadMe.Data;
import com.minho.backend.api.auth.adapter.http.mapper.AuthAdapterMapper;
import com.minho.backend.api.auth.application.AuthApplication;
import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.dto.AuthQuery;
import com.minho.backend.config.security.AuthenticatedUser;
import com.minho.backend.exception.AuthException;
import com.minho.backend.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping(value = "/api/auth")
@RestController
public class AuthController {

    private final AuthApplication authApplication;

    private final AuthAdapterMapper authAdapterMapper;

    @PostMapping(value = "/signup")
    public ApiResponse<AuthDto.Signup.Data> postSignup(@Validated @RequestBody AuthDto.Signup.RequestBody requestBody)
            throws AuthException {
        AuthCommand.Signup command = this.authAdapterMapper.toSignupCommand(requestBody);
        AuthInfo.Signup info = this.authApplication.signup(command);
        AuthDto.Signup.Data data = this.authAdapterMapper.toSignupData(info);

        return ApiResponse.success(data);
    }

    @PostMapping(value = "/signin")
    public ApiResponse<AuthDto.Signin.Data> postSignin(@Validated @RequestBody AuthDto.Signin.RequestBody requestBody)
            throws AuthException {
        AuthCommand.Signin command = this.authAdapterMapper.toSigninCommand(requestBody);
        AuthInfo.Signin info = this.authApplication.signin(command);
        AuthDto.Signin.Data data = this.authAdapterMapper.toSigninData(info);

        return ApiResponse.success(data);
    }

    @GetMapping(value = "/me")
    public ApiResponse<AuthDto.ReadMe.Data> getMe() throws AuthException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthenticatedUser authenticatedUser = (AuthenticatedUser) authentication.getPrincipal();
        Long userId = authenticatedUser.getId();

        AuthQuery.ReadMe query = this.authAdapterMapper.toReadMeQuery(userId);
        AuthInfo.ReadMe info = this.authApplication.readMe(query);
        AuthDto.ReadMe.Data data = this.authAdapterMapper.toReadMeData(info);

        return ApiResponse.success(data);
    }

}

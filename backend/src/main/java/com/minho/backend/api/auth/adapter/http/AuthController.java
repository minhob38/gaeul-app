package com.minho.backend.api.auth.adapter.http;

import com.minho.backend.api.auth.adapter.http.dto.AuthDto;
import com.minho.backend.api.auth.adapter.http.mapper.AuthAdapterMapper;
import com.minho.backend.api.auth.application.AuthApplication;
import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.dto.AuthQuery;
import com.minho.backend.config.security.authentication.AuthenticatedUser;
import com.minho.backend.config.security.annotation.SigninUser;
import com.minho.backend.exception.AuthException;
import com.minho.backend.exception.ServerException;
import com.minho.backend.response.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/auth")
@RestController
public class AuthController {

    private final AuthApplication authApplication;

    private final AuthAdapterMapper authAdapterMapper;

    @PostMapping(value = "/signup")
    public ApiResponse<AuthDto.Data> postSignup(@Validated @RequestBody AuthDto.Signup.RequestBody requestBody)
            throws AuthException {
        AuthCommand.Signup command = this.authAdapterMapper.toSignupCommand(requestBody);
        AuthInfo info = this.authApplication.signup(command);
        AuthDto.Data data = this.authAdapterMapper.toSignupData(info);

        return ApiResponse.success(data);
    }

    @DeleteMapping(value = "/me")
    public ApiResponse<AuthDto.Data> deleteMe(@SigninUser AuthenticatedUser user)
            throws AuthException, ServerException {
        Long userId = user.getId();
        AuthCommand.RemoveMe command = this.authAdapterMapper.toRemoveMeCommand(userId);
        AuthInfo info = this.authApplication.removeMe(command);
        AuthDto.Data data = this.authAdapterMapper.toRemoveMeData(info);

        return ApiResponse.success(data);
    }

    @PostMapping(value = "/signin")
    public ApiResponse<AuthDto.Data> postSignin(@Validated @RequestBody AuthDto.Signin.RequestBody requestBody)
            throws AuthException, ServerException {
        AuthCommand.Signin command = this.authAdapterMapper.toSigninCommand(requestBody);
        AuthInfo info = this.authApplication.signin(command);
        AuthDto.Data data = this.authAdapterMapper.toSigninData(info);

        return ApiResponse.success(data);
    }

    @GetMapping(value = "/oauth-page")
    public void getOAuthPage(
            @RequestParam("provider") @Pattern(regexp = "^(google)$",
                    message = "invalid oauth provider") String provider,
            HttpServletResponse response) throws IOException {
        AuthQuery.OAuthPage query = this.authAdapterMapper.toOAuthPageQuery(provider);
        String oauthPageUrl = this.authApplication.oauthPage(query);

        log.info("### OAuth Page URL: {} ###", oauthPageUrl);
        response.sendRedirect(oauthPageUrl);
    }

    @GetMapping(value = "/oauth-signin")
    public ApiResponse<AuthDto.Data> getOAuthSignin(@RequestParam("code") String code)
            throws ServerException, AuthException {
        AuthQuery.OAuthSignin query = this.authAdapterMapper.toOAuthSigninQuery(code);
        AuthInfo info = this.authApplication.oauthSignin(query);
        AuthDto.Data data = this.authAdapterMapper.toOAuthSigninData(info);

        return ApiResponse.success(data);
    }

    @PostMapping(value = "/signout")
    public ApiResponse<AuthDto.Data> postSignout(@SigninUser AuthenticatedUser user) throws ServerException {
        Long userId = user.getId();
        AuthCommand.Signout command = this.authAdapterMapper.toSignoutCommand(userId);
        AuthInfo info = this.authApplication.signout(command);
        AuthDto.Data data = this.authAdapterMapper.toSignoutData(info);

        return ApiResponse.success(data);
    }

    @PatchMapping(value = "/me")
    public ApiResponse<AuthDto.Data> patchMe(@Validated @RequestBody AuthDto.ModifyMe.RequestBody requestBody,
            @SigninUser AuthenticatedUser user) throws AuthException, ServerException {
        Long userId = user.getId();
        AuthCommand.ModifyMe command = this.authAdapterMapper.toModifyMeCommand(requestBody, userId);
        AuthInfo info = this.authApplication.modifyMe(command);
        AuthDto.Data data = this.authAdapterMapper.toModifyMeData(info);

        return ApiResponse.success(data);
    }

    @GetMapping(value = "/me")
    public ApiResponse<AuthDto.Data> getMe(@SigninUser AuthenticatedUser user) throws AuthException {
        Long userId = user.getId();

        AuthQuery.ReadMe query = this.authAdapterMapper.toReadMeQuery(userId);
        AuthInfo info = this.authApplication.readMe(query);
        AuthDto.Data data = this.authAdapterMapper.toReadMeData(info);

        return ApiResponse.success(data);
    }

}

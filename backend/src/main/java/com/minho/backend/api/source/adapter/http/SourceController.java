package com.minho.backend.api.source.adapter.http;

import com.minho.backend.api.auth.adapter.http.dto.AuthDto;
import com.minho.backend.api.auth.adapter.http.mapper.AuthAdapterMapper;
import com.minho.backend.api.auth.application.AuthApplication;
import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.dto.AuthQuery;
import com.minho.backend.api.source.adapter.http.dto.SourceDto;
import com.minho.backend.api.source.adapter.http.mapper.SourceAdapterMapper;
import com.minho.backend.api.source.application.SourceApplication;
import com.minho.backend.api.source.domain.dto.SourceCommand;
import com.minho.backend.api.source.domain.dto.SourceInfo;
import com.minho.backend.config.security.annotation.SigninUser;
import com.minho.backend.config.security.authentication.AuthenticatedUser;
import com.minho.backend.exception.AuthException;
import com.minho.backend.exception.ServerException;
import com.minho.backend.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/source")
@RestController
public class SourceController {

    private final SourceApplication sourceApplication;

    private final SourceAdapterMapper sourceAdapterMapper;

    @PostMapping(value = "/fetch")
    public ApiResponse<SourceDto.Data> fetch(@Validated @RequestBody SourceDto.Fetch.RequestBody requestBody) {
        SourceCommand.Fetch command = this.sourceAdapterMapper.toFetchCommand(requestBody);
        SourceInfo info = this.sourceApplication.fetch(command);
        SourceDto.Data data = this.sourceAdapterMapper.toFetchData(info);

        return ApiResponse.success(data);
    }

}

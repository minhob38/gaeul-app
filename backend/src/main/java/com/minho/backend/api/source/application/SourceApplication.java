package com.minho.backend.api.source.application;

import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.dto.AuthQuery;
import com.minho.backend.api.auth.domain.port.AuthServicePort;
import com.minho.backend.api.source.domain.dto.SourceCommand;
import com.minho.backend.api.source.domain.dto.SourceInfo;
import com.minho.backend.api.source.domain.port.SourceServicePort;
import com.minho.backend.exception.AuthException;
import com.minho.backend.exception.ServerException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SourceApplication {

    private final SourceServicePort sourceService;

    public SourceInfo fetch(SourceCommand.Fetch command) {
        SourceInfo info = this.sourceService.fetch(command);
        return info;
    }

}

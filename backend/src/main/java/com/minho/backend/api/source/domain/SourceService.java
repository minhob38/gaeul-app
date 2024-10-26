package com.minho.backend.api.source.domain;

import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.dto.AuthQuery;
import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.api.auth.domain.mapper.AuthDomainMapper;
import com.minho.backend.api.auth.domain.port.AuthPersistencePort;
import com.minho.backend.api.auth.domain.port.AuthServicePort;
import com.minho.backend.api.source.domain.dto.SourceCommand;
import com.minho.backend.api.source.domain.dto.SourceInfo;
import com.minho.backend.api.source.domain.mapper.SourceDomainMapper;
import com.minho.backend.api.source.domain.port.SourcePersistencePort;
import com.minho.backend.api.source.domain.port.SourceServicePort;
import com.minho.backend.constant.ErrorCode;
import com.minho.backend.exception.AuthException;
import com.minho.backend.exception.ServerException;
import com.minho.backend.util.AuthUtil;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SourceService implements SourceServicePort {

    // private final SourcePersistencePort sourcePersistenceAdapter;

    private final SourceDomainMapper sourceDomainMapper;

    @Override
    public SourceInfo fetch(SourceCommand.Fetch command) {
        return this.sourceDomainMapper.toFetchInfo("hello world");
    }

}

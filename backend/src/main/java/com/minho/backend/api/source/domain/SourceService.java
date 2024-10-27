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
import com.minho.backend.api.source.domain.entity.Mail;
import com.minho.backend.api.source.domain.mapper.SourceDomainMapper;
import com.minho.backend.api.source.domain.port.SourceMailPort;
import com.minho.backend.api.source.domain.port.SourcePersistencePort;
import com.minho.backend.api.source.domain.port.SourceServicePort;
import com.minho.backend.constant.ErrorCode;
import com.minho.backend.exception.AuthException;
import com.minho.backend.exception.ServerException;
import com.minho.backend.util.AuthUtil;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SourceService implements SourceServicePort {

    private final SourcePersistencePort sourcePersistenceAdapter;

    private final SourceMailPort sourceMailAdapter;

    private final SourceDomainMapper sourceDomainMapper;

    @Override
    public SourceInfo fetch(SourceCommand.Fetch command) {
        List<Mail> mails = this.sourceMailAdapter.fetchEmail(command.getEmail(), command.getPassword());

        for (Mail mail : mails) {
            this.sourcePersistenceAdapter.saveMail(mail);
        }

        return this.sourceDomainMapper.toFetchInfo("hello world");
    }

}

package com.minho.backend.api.source.adapter.http.mapper;

import com.minho.backend.api.source.adapter.http.dto.SourceDto;
import com.minho.backend.api.source.domain.dto.SourceCommand;
import com.minho.backend.api.source.domain.dto.SourceInfo;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-27T20:49:33+0900",
    comments = "version: 1.6.1, compiler: javac, environment: Java 17.0.8.1 (Amazon.com Inc.)"
)
@Component
public class SourceAdapterMapperImpl implements SourceAdapterMapper {

    @Override
    public SourceCommand.Fetch toFetchCommand(SourceDto.Fetch.RequestBody requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        String email = null;
        String password = null;

        email = requestBody.getEmail();
        password = requestBody.getPassword();

        SourceCommand.Fetch fetch = new SourceCommand.Fetch( email, password );

        return fetch;
    }

    @Override
    public SourceDto.Data toFetchData(SourceInfo info) {
        if ( info == null ) {
            return null;
        }

        String message = null;

        message = info.getMessage();

        SourceDto.Data data = new SourceDto.Data( message );

        return data;
    }
}

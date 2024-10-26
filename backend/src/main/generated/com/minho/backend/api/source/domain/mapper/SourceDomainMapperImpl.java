package com.minho.backend.api.source.domain.mapper;

import com.minho.backend.api.source.domain.dto.SourceInfo;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-27T00:06:55+0900",
    comments = "version: 1.6.1, compiler: javac, environment: Java 17.0.8.1 (Amazon.com Inc.)"
)
@Component
public class SourceDomainMapperImpl implements SourceDomainMapper {

    @Override
    public SourceInfo toFetchInfo(String message) {
        if ( message == null ) {
            return null;
        }

        String message1 = null;

        message1 = message;

        SourceInfo sourceInfo = new SourceInfo( message1 );

        return sourceInfo;
    }
}

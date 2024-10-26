package com.minho.backend.api.source.adapter.http.mapper;

import com.minho.backend.api.source.adapter.http.dto.SourceDto;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.source.domain.dto.SourceCommand;
import com.minho.backend.api.source.domain.dto.SourceInfo;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR,
        unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface SourceAdapterMapper {

    // fetch
    SourceCommand.Fetch toFetchCommand(SourceDto.Fetch.RequestBody requestBody);

    // @Mapping(target = "accessToken", ignore = true)
    SourceDto.Data toFetchData(SourceInfo info);

}

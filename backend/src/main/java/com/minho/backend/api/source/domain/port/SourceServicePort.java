package com.minho.backend.api.source.domain.port;

import com.minho.backend.api.source.domain.dto.SourceCommand;
import com.minho.backend.api.source.domain.dto.SourceInfo;

public interface SourceServicePort {

    SourceInfo fetch(SourceCommand.Fetch command);

}

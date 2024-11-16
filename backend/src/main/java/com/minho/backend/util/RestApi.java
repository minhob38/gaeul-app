package com.minho.backend.util;

import com.minho.backend.constant.ErrorCode;
import com.minho.backend.exception.ServerException;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.*;

import java.io.IOException;

@Getter
@Slf4j
@Component
public class RestApi {

    private final RestTemplate restTemplate;

    private HttpHeaders httpHeaders;

    public RestApi() {
        this.restTemplate = new RestTemplate();
        this.httpHeaders = new HttpHeaders();

        this.restTemplate.getInterceptors().add(new ClientHttpRequestInterceptor() {
            @Override
            public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution)
                    throws IOException {
                return execution.execute(request, body);
            }
        });
    }

    public void authenticateHeader(String key, String header) {
        this.httpHeaders.set(key, header);
    }

    public void handleError(HttpStatusCodeException httpStatusCodeException) throws ServerException {
        if (httpStatusCodeException instanceof HttpClientErrorException) {
            throw new ServerException(ErrorCode.Server.SERVER_0011,
                    new Exception(httpStatusCodeException.getMessage()));
        }

        if (httpStatusCodeException instanceof HttpServerErrorException) {
            throw new ServerException(ErrorCode.Server.SERVER_0012,
                    new Exception(httpStatusCodeException.getMessage()));
        }
    }

    public <T> T get(String url, Class<T> responseType) throws ServerException {
        try {
            HttpEntity httpEntity = new HttpEntity<>(this.httpHeaders);
            ResponseEntity<T> responseEntity = this.restTemplate.exchange(url, HttpMethod.GET, httpEntity,
                    responseType);
            return responseEntity.getBody();
        }
        catch (HttpClientErrorException | HttpServerErrorException e) {
            this.handleError(e);
        }

        return null;
    }

    public <T> T post(String url, Object requestBody, Class<T> responseType) throws ServerException {
        try {
            HttpEntity<Object> httpEntity = new HttpEntity<>(requestBody, this.httpHeaders);
            ResponseEntity<T> responseEntity = restTemplate.exchange(url, HttpMethod.POST, httpEntity, responseType);
            return responseEntity.getBody();
        }
        catch (HttpClientErrorException | HttpServerErrorException e) {
            this.handleError(e);
        }

        return null;
    }

    public <T> T put(String url, Object requestBody, Class<T> responseType) throws ServerException {
        try {
            HttpEntity<Object> httpEntity = new HttpEntity<>(requestBody, this.httpHeaders);
            ResponseEntity<T> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, httpEntity, responseType);
            return responseEntity.getBody();
        }
        catch (HttpClientErrorException | HttpServerErrorException e) {
            this.handleError(e);
        }

        return null;
    }

    public <T> T patch(String url, Object requestBody, Class<T> responseType) throws ServerException {
        try {
            HttpEntity<Object> httpEntity = new HttpEntity<>(requestBody, httpHeaders);
            ResponseEntity<T> responseEntity = restTemplate.exchange(url, HttpMethod.PATCH, httpEntity, responseType);

            return responseEntity.getBody();
        }
        catch (HttpClientErrorException | HttpServerErrorException e) {
            this.handleError(e);
        }

        return null;
    }

    public <T> T delete(String url, Class<T> responseType) throws ServerException {
        try {
            HttpEntity<Object> httpEntity = new HttpEntity<>(httpHeaders);
            ResponseEntity<T> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, httpEntity, responseType);

            return responseEntity.getBody();
        }
        catch (HttpClientErrorException | HttpServerErrorException e) {
            this.handleError(e);
        }

        return null;
    }

}

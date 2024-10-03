package com.minho.backend.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {

    private Status status;

    private T data;

    private String message;

    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<T>(Status.SUCCESS, data, message);
    }

    public static <T> ApiResponse<T> success(T data) {
        return success(data, null);
    }

    public static <T> ApiResponse<T> failure(T data, String message) {
        return new ApiResponse<T>(Status.SUCCESS, data, message);
    }

    public static <T> ApiResponse<T> failure(T data) {
        return failure(data, null);
    }

    // TODO: enum 소문자로 바꾸기
    enum Status {

        SUCCESS, FAILURE

    }

}
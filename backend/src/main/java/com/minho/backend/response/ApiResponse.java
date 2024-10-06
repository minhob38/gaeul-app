package com.minho.backend.response;

import com.minho.backend.constant.ErrorCode;
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

    private String status;

    private T data;

    private String message;

    private String code;

    public static <T> ApiResponse<T> success(T data, String message) {
        return (ApiResponse<T>) ApiResponse.builder()
            .status(Status.SUCCESS.toString())
            .data(data)
            .message(message)
            .build();
    }

    public static <T> ApiResponse<T> success(T data) {
        return success(data, null);
    }

    public static ApiResponse failure(String message) {
        return ApiResponse.builder().status(Status.FAILURE.toString()).message(message).build();
    }

    public static ApiResponse error(String code, String message) {
        return ApiResponse.builder().status(Status.ERROR.toString()).code(code).message(message).build();
    }

    enum Status {

        SUCCESS, FAILURE, ERROR;

        @Override
        public String toString() {
            return name().toLowerCase();
        }

    }

}
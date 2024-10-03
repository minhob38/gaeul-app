package com.minho.backend.api.auth.adapter.http.dto;

import com.minho.backend.api.auth.domain.dto.AuthInfo;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

public class AuthDto {

  // POST:api/auth/signup
  public static class Signup {

    @Getter
    @ToString
    public static class RequestBody {

      @NotBlank(message = "email is required - '':(X) / ' ':(X) / null:(X)")
      String email;

      @NotBlank(message = "password is required - '':(O) / ' ':(O) / null:(X)")
      String password;
    }

    @ToString
    @Getter
    @RequiredArgsConstructor
    public static class Data {

      private final Long userId;
    }
  }

  // GET:api/auth/me
  static class ReadMe {

    @ToString
    @Getter
    static class Data {

      private final Long userId;
      private final String email;

      Data(AuthInfo.MeInfo userInfo) {
        this.userId = userInfo.getUserId();
        this.email = userInfo.getEmail();
      }
    }
  }

//  // Patch-api/auth/password
//  static class ModifyPassword {
//    @Getter
//    static class Form {
//      @NotBlank(message = "current password is required")
//      @Length(max = 10)
//      String currentPassword;
//
//      @NotBlank
//      @Length(max = 10)
//      String newPassword;
//
//
//      // ModelAttribute는 member 할당을 위해, setter 함수가 있어야합니다.
//      public void setCurrentPassword(String currentPassword) {
//        this.currentPassword = currentPassword;
//      }
//
//      public void setNewPassword(String newPassword) {
//        this.newPassword = newPassword;
//      }
//    }
//
//  }
}
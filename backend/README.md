# Backend
## Spring 설정
### 초기 설정
- spring initializer
<img src="https://github.com/user-attachments/assets/d3aa5c84-39e6-40f0-8e28-5eaad5006282" />
- compiler
- lombok
- formatter
- docker

## Spring 실행
### 환경변수
`application.properties`의 `spring.profiles.active={환경}` 설정에 따라, `application.properties-{환경}`의 값을 가져옴

## 아키텍처
### Hexagonal(Port-Adapter) Architecture
- port
  - 안쪽 계층의 api 개념
      - input port: 안쪽 계층을 노출시킨 api
      - output port: 바깥 계층을 사용하기 위한 api
  - interface로 안쪽(고수준)과 바깥(저수준) 계층을 분리
- adapter
  - port를 매개체로 안쪽과 바깥 계층을 연결
    - input adapter: 바깥쪽 계층에서 안쪽 계층의 port를 사용하여, 안쪽 코드를 실행
    - output adapter: 안쪽 계층에서 바깥쪽 계층의 port를 사용하여, 바깥쪽 코드를 실행

📝 예시
- 바깥쪽 계층의 persistence를 mysql에서 mongodb로 바꾼다해도, 안쪽 계층의 코드는 interface(output port)를 의존하고 있기 때문에, 의존성주입만 바꾸고 코드를 변경하지 않아도 됨
- 반대로 바깥쪽 계층의 controller에서 다른 안쪽 계층의 코드로 바꾼다해도, 바깥쪽 계층의 코드는 interface(input port)를 의존하고 있기 때문에, 의존성주입만 바꾸고 코드를 변경하지 않아도 됨

<img src="https://github.com/user-attachments/assets/b9acc6a5-d802-475d-9c30-4a581ecff306" />



### mapper
- domain entity mapper
```java
/**
 * domain entity는 setter가 없어야 하기에, mapstruct interface가 아닌 별도의 method로 mapping을 처리
 * (entity class는 final로 변수를 선언하지 않기 때문에, @RequiredConstructor로 생성자가 만들어지지 않음)
 */
public interface AuthDomainMapper {
  User toEntity(AuthCommand.SignupCommand command); -> x
}

↓

public static class SignupCommand {

  private final String email;
  private final String password;

  public User toEntity() {
    return User.builder()
        .email(this.email)
        .password(this.password)
        .build();
  }
}
```

- jpa entity mapper

### 도메인
info
command
query

mapstruct는 setter 또는 constructor가 필요...

### Git
Formatting
./gradlew checkFormat
./gradlew format 


### 인증
`SecurityFilterChain`과 `SecurityConfigurerAdapter`에서 jwt filter 등록  
↓  
jwt filter에서 jwt 유효성 검증  
↓
jwt가 valid하면, 해당 user key로 user를 조회하여, `AuthenticatedUserService(UserDetailService)`에서 `AuthenticatedUser(UserDetail)`를 반환
(jwt invalid: `AuthenticationEntryPoint`로 예외를 던짐)  
↓  
`SecurityContextHolder`에 인증정보를 저장  
↓  
`SecurityContextHolder`에 저장된 인증정보를 꺼내 사용  

https://javadevjournal.com/spring-security/spring-security-authentication/
<img src="https://github.com/user-attachments/assets/14bf3dfc-7995-4c5e-ab71-6ae45c567d2d" />


./gradlew checkFormat
./gradlew format 

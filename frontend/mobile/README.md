# Mobile
## react-native-cli 설정
### 설치
참고문서: https://reactnative.dev/docs/set-up-your-environment
- homebrew
- xcode
  - cli 설정
<img src="https://github.com/user-attachments/assets/b7c23ade-82c4-4023-bd40-1df70d24625b" />
- android studio
  - 환경변수 설정 (zsh 또는 bash에 설정)
    ```.zshrc
    export ANDROID_SDK_ROOT=/Users/minho/Library/Android/sdk``
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    ```
    `ANDROID_SDK_ROOT`는 android studio settings에서 볼수 있음
    <img src="https://github.com/user-attachments/assets/84e1501d-9d5f-4e93-a8e7-cf1333875941" />


https://developer.android.com/studio?hl=ko&_gl=1*3v031t*_up*MQ..*_ga*MTQ3NjQxNDIyOS4xNzI3OTQyODYw*_ga_6HH9YJMN9M*MTcyNzk0Mjg1OS4xLjAuMTcyNzk0Mjk3OS4wLjAuMTg3NzY5NzU.
- node
- ruby
`$ brew install ruby`
- rbenv
`$ brew install rbenv && rbenv install 2.7.5`
- watch
`$ brew install watchman`

### application 만들기
`npx react-native init MyMobile`
👷🏻 에러발생하면 지우기
```
sudo npm cache clean --force -g
sudo npm upgrade react-native -g
```
- ios 설치
```
$ cd ios
$ pod install
$ npx pod-install
```
👷🏻 에러발생하면 지우기


### application 실행
```
$ cd MyMobile
$ npm run ios
```



안드로이드
npx react-native run-android

## 아키텍처
hexagonal...


  Run instructions for iOS:
    • cd "/Users/minho/Desktop/minho/startup/gaeul-app/frontend/mobile/MyMobile/ios"
    
    • Install Cocoapods
      • bundle install # you need to run this only once in your project.
      • bundle exec pod install
      • cd ..
    
    • npx react-native run-ios
    - or -
    • Open MyMobile/ios/MyMobile.xcodeproj in Xcode or run "xed -b ios"
    • Hit the Run button


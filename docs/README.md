## 1. 상수 값 정리 

#### DOM에 쓰일 상수 - ✅
  - ``$USER_INPUT``
  - ``$SUBMIT_BUTTON``
  - ``$RESULT``
  - ``$RESTART_BUTTON``

#### 게임 조건에 쓰일 상수 ✅
  - ``MIN_NUMBER_RANGE = 1``
  - ``MAX_NUMBER_RANGE = 9``
  - ``MAX_NUMBER_LENGTH = 3``

#### 텍스트, 에러 메세지와 같은 상수 ✅
  - ``MSG_ERROR_XXX = 'blah blah'``
  - ``MSG_GAME_STLIKE = '스트라이크'``
  - ``MSG_GAME_BALL = '볼'``
  - ``MSG_GAME_NOTHING = '낫싱'``
  - ``MSG_GAME_WIN = '⚾정답을 맞추셨습니다⚾'``

---
## 2. 구현 할 기능 목록⚾

#### 사용자 입력 값
  1. ``확인 버튼 클릭 시 입력의 유효성 검사``
  2. ``유효하지 않을 경우 에러 & input 초기화, focus``
     - ``입력값이 전부 숫자인가?``
     - ``숫자가 3자리인가?``
     - ``중복되지 않는 서로 다른 수 인가?`` 
     - ``입력 가능한 숫자 범위 내의 수 인가?``     
  3. ``유효하면 저장?``

#### 랜덤 난수 생성
- ``게임 초기화 시 생생하여 저장``
- ``MissonUtils 라이브러리의 Random.pickNumberInRange 사용``
```javascript
const randomNumber = Random.pickNumberInRange(1, 9);
```

#### 게임 진행
  - ``랜덤 난수 a와 사용자 입력값 b로 play() 메서드 호출``
```javascript
export default class BaseballGame {
  play(a, b) {
    return "결과 값 String";
  }
}
```
  - ``play() 메서드 내에서 필요한 작업 나누기``
    - ``스트라이크 판별 로직``
    - ``볼 판별 로직``
    - ``스트라이크 볼 유무에 따라 결과 문자열 return``
    
#### 재시작 
  - ``게임 종료 시 재시작 버튼 노출``
  - ``재시작 버튼 클릭 시 게임 초기화 & 버튼 숨김``


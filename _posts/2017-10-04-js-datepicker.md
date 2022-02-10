---
layout: post
title:  "Date Picker로 Date 값 저장하기"
subtitle: "데이트피커 사용 시 Date 타입 형식에 맞게 String 저장하는 방법"
date:   2017-10-04 03:15:30
author: jaeyoon
categories: ["배움", "개발"]
tags:
  - "javascript"
  - "regex"
  - "published"
---

**데이트피커 사용 시 Date 타입 형식에 맞게 String 저장하는 방법**

예쁜 date picker 플러그인들은 대부분 인풋을 클릭하면 드랍다운이 보여지면서 그 안에 table요소 달력을 띄워놓는 형식이다. 이때 input[type='date']에는 브라우저 디폴트 date picker가 달려 있기 때문에 대부분 input[type='text']를 대신 사용한다. 그러고 나서 JS로든 서버 측에서든 date 변수로 바꿔주는 것이다.

하지만 그럴 필요 없이 간단한 작업을 통해 input[type='date']를 그대로 사용하는 것이 가능하다. 물론 어떤 datepicker 라이브러리를 사용하느냐에 따라 다르겠으나, date format을 조작할 수 있는 옵션이 딸려 있다면 더욱 쉽다. 나의 경우 vanilla js 버전 [Pikaday](https://github.com/dbushell/Pikaday)를 기준으로 아래 코드를 썼다. 자주 쓰이는 jQuery datepicker도 유사한 방식으로 가능하다.

<br>

**1. HTML**


 ```html
 <input id="datepicker" type="date">
 ```

위에서 말했듯이 date type으로 input을 만들어준다.

<br>

**2. CSS**

 ```css
 input[type="date"]::-webkit-calendar-picker-indicator,
 input[type="date"]::-webkit-inner-spin-button {
     display: none;
     appearance: none;
 }
 ```

 첫번째 가상선택자 ::webkit-calendar-picker-indicator 는 역삼각형 모양의 datepicker 드롭다운 시키는 버튼 선택자이고,

 두번째 가상선택자 ::webkit-inner-spin-button은 1일씩 올리거나 내리는 위아래 버튼 선택자이다.

 둘다 뵈기 싫은 느낌이 다분하니 `display: none` 시켜주도록 하자. `appearance: none` 도 platform-native 스타일링을 제거해주기 위해 넣는 편이 좋다.

```scss
input[type="date"]::-webkit-calendar-picker-indicator {
   color: rgba(0, 0, 0, 0); //숨긴다
   opacity: 1;
   display: block;
   background: url(https://mywildalberta.ca/images/GFX-MWA-Parks-Reservations.png) no-repeat; // 대체할 아이콘
   width: 20px;
   height: 20px;
   border-width: thin;
}
```

참고로 그냥 브라우저 디폴트 datepicker을 사용하되, 아이콘을 바꾸고 싶은 경우에는 위와 같이 버튼을 숨기고 아이콘을 넣어줄 수 있다.

<br>

**3. JS**

```javascript
var picker = new Pikaday({ 
 field: document.getElementById('datepicker'),
 format: 'yyyy-MM-dd',
 toString(date, format) {
   let day = ("0" + date.getDate()).slice(-2);
   let month = ("0" + (date.getMonth() + 1)).slice(-2);
   let year = date.getFullYear();
   return `${year}-${month}-${day}`;
 }
});
```

datepicker 라이브러리에 따라 다르지만, 이 코드의 핵심은 5~8번째 줄이다. 
string 타입으로 리턴을 해주는데, 이를 date type input이 인식할 수 있는 string 형태로 변환해주기만 하면 된다.

- `format: 'yyyy-MM-dd'`

 내가 사용한 Pikaday 같은 경우에는 아무 설정도 하지않으면, `11 August, 2018` 형태로 반환이 된다.  포맷을 설정해주면 이제 `2018-8-11` 형태로 반환되기 시작된다.

- `( "0" + date.getDate() ).slice(-2);`

 그러나 Pickaday 옵션에 포맷을 설정해주어도 한 자리 수 앞에 0이 삽입되지 않아 오류가 발생한다. 이는 위와 같은 코드로 커스터마이즈할 수 있다. 입력값을 `date`라는 변수로 받아 js 내장함수 `getDate()`로 `date`에서 일자 부분을 빼온다. 이 일자 앞에 무조건 `"0"`을 붙이고 `slice(-2)`로 뒤 두 자리만 남기는 것이다. 



위 코드를 모두 작성하고 나면 다음과 같은 결과를 얻을 수 있다.

<p data-height="265" data-theme-id="0" data-slug-hash="ddXwVb" data-default-tab="js,result" data-user="jyoonsong" data-embed-version="2" data-pen-title="datepicker with date type input - disabling default datepicker" class="codepen">See the Pen <a href="https://codepen.io/jyoonsong/pen/ddXwVb/">datepicker with date type input - disabling default datepicker</a> by JaeYoon Song (<a href="https://codepen.io/jyoonsong">@jyoonsong</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>


<br>
#### Ref

https://css-tricks.com/almanac/properties/a/appearance/

https://stackoverflow.com/questions/29436074/change-date-input-triangle-to-a-calendar-icon

https://stackoverflow.com/questions/11320615/disable-native-datepicker-in-google-chrome
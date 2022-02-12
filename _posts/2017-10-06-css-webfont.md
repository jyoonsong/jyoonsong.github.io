---
layout: post
title:  "CSS 웹 폰트의 모든 것: 글꼴 로드 최적화하는 방법"
subtitle: "간단하게 FOUT(Flash of Unstyled Text) 방지하기"
date:   2017-10-06 03:15:30
author: jaeyoon
categories: ["배움", "개발"]
tags:
  - "css"
  - "published"
---

#### Font-Face

CSS에는 `@font-face` 라는 CSS at-rule 이 있다. 이는 웹 폰트를 정의하기 위해 CSS2부터 추가된 기능이고, 표시하려 하는 글꼴이 사용자 PC에 설치되지 않은 경우에 웹폰트를 내려받아 표시한다.



**1. 특징**

- **하나의 글꼴엔 @font-face 규칙 한 번만 선언한다**

  불필요한 요청의 원인이 된다. 원인은 [여기](https://www.paulirish.com/2009/bulletproof-font-face-implementation-syntax/) 참고

- **IE9의 경우 @media 내부에 허용 안됨**

  IE9의 문제같지만 사실 CSS 2.1. 명세에 따르면 유효하지 않다고 나와 있음. IE9만 이를 잘 따른 것이었다. 미디어 쿼리는 실제 요소에 적용시킬 때 사용한다.

  ```css
  @media all and (min-width:768px) {
  	body {font-family: 나눔고딕, NanumGothic, ng}
  }
  ```

<br>

**2. 지원 글꼴 확장자**

- `.woff` - W3C 권장 형식. IE6~8을 제외한 대부분의 브라우저가 지원. IE도 9부터는 지원.
- `.eot` - IE만 지원한다. Chrome, Safari, Firefox, Opera는 woff만 지원하고 eot는 미지원한다.

<br>

**3. 구성**

- `font-family` - 사용할 폰트의 이름을 선언. 실제 이름이 뭐든 아무거나 지정해줘도 되지만 유지보수를 위해 되도록 잘 적어주자. 또 IE11 이하에서는 31자 이상은 적용 안됨.
- `src` - 폰트 파일의 경로를 적어주는 곳. 브라우저는 적용할 수 있는 폰트를 찾을 때까지 선언한 순서대로 이동하기 때문에 local을 반드시 위에 적어주어야 한다.
  - `local(글꼴명)` - 로컬에 이미 설치된 폰트를 불러올 때.
  - `url(글꼴명)` - 다운로드할 웹폰트의 주소를 적을 때.

<br>

**4. 순서**

아래와 같은 순서를 지켜주는 것이 바람직하다.

```css
@font-face {
  font-family: ng; 
  src: local(NanumGothic); /* 외부자원 참조 전에 시스템 글꼴을 우선 참조 */
  src: url(NanumSquareR.eot);  /* here you go, IE */
  src: local(@), url(NanumSquareR.woff) format('woff'), /* everyone else take this */
       url(NanumSquareR.ttf); /* 다섯번째 */
}
```

- **eot가 woff 앞에**

  IE9+, 크롬, 사파리, 파폭, 오페라는 eot 글꼴에 대한 `format('embedded-opentype')` 선언을 굳이 안 써줘도, 영리하게도 eot 글꼴은 내려받지 않는다. 반면 IE6~8은 `format('woff')`를 해줘도 바보같이 woff 파일까지 내려받아버리기 때문에 eot를 woff 앞에 써준다

- **local(@) Bulletproof**

  이 앞에 `local(@)`을 적어주면, `local()` 값을 처리하지 못하는 특성상 woff 글꼴을 추가로 요청하지 않고 해당 줄을 무시하게 된다. `@`는 시스템에 존재하지 않을 만한 걸 임의로 적어준 것이다.혹시나 해당 문자열의 이름을 가진 글꼴이 존재해서 적용되면 큰일이니깐.  특히 2byte 짜리 문자열은 Mac OS에서 아예 시스템 글꼴 이름으로 처리하지 않는다. 

- **format()**

  해당 형식을 지원하는 브라우저만 글꼴을 내려받도록 해준다. 값은 반드시 따옴표 안에 있어야 하며, 작성하지 않는 경우 지원 여부에 무관하게 모든 형식의 글꼴을 모든 형식의 글꼴이 내려받아지는 것이 원칙이다. 다만 위에서도 말했듯 대부분의 브라우저가 eot 글꼴은 무시하고, IE7~8은 이 코드를 해석하지 못한다.

<br>

**5. 사용**

실제 CSS 파일에서는 위에서 선언한 font-family 이름을 사용하면 된다. 한글 이름으로 되는 경우도 있으므로 한글도 함께 써준다. 아래 코드에서는 앞 세 개가 제대로 작동 안하면 맥의 경우 디폴트 폰트인 애플고딕이 적용된다.

```scss
body {
  font-family: 나눔고딕, NanumGothic, ng, Apple Gothic;
}
```

<hr>
<br>

#### Google Fonts

구글 폰트의 경우 로드할 수 있는 방법이 CSS 파일 내부의 `@import` , HTML 파일 내부의 `<link>` 태그, JS 로딩 세 가지이다. 이중 가장 빠른 방법은 `link` 코드를 이용하는 것이다. 

- **폰트의 코드는 하나로 합쳐라**

  코드 한 줄에 `|`로 나누어 여러 폰트를 한 번에 로드할 수 있다. 예컨대 Open Sans와 Oswald 폰트를 불러올 때에는 아래와 같은 한 줄만 head 안에 추가해 주면 된다.

  ```html
  <link href='http://fonts.googleapis.com/css?family=Open+Sans|Oswald' rel='stylesheet' type='text/css'>
  ```

- **여러 옵션은 여러 폰트나 마찬가지**

  한 폰트의 굵기를 300부터 800까지 모조리 다 다운로드하는 것은 서로 다른 6가지 폰트를 로드하는 것과 마찬가지이다. 최소한만 선택적으로 가져오는 것이 좋다.

- **Load Time를 확인하라**

  구글 폰트 페이지에서는 폰트를 선택한 장바구니에서 로딩 시간을 slow, moderate, fast로 표시해주고 있다. 또 개발자도구 Network에서 체크하는 것도 필요하다.

- **Web Font Loader 을 사용하라**

  FOUT(Flash of Unstyled Text) 혹은 FOIT(Flash of Invisible Text)를 방지하는 데 최후의 방책이다. 아래와 같은 코드를 추가해주면 CSS 로드 전에 구글 폰트가 로드되도록 확실히 설정해준다.

  ```html
  <script src="//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"></script>
  <script>
    WebFont.load({
      google: {
        families: ['Open Sans', 'Oswald']
      }
    });
  </script>
  ```
<br>
   


#### Ref

https://nolboo.kim/blog/2013/10/22/google-web-font-faster-tip/<br>
https://css-tricks.com/fout-foit-foft/<br>
https://www.paulirish.com/2009/bulletproof-font-face-implementation-syntax/
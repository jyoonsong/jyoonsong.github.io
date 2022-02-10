---
layout: post
title:  "jQuery? Vanilla JS? 무엇이 답인가"
subtitle: "끊임 없는 변화 속에서 중요한 것은 변하지 않는 것."
date:   2017-12-24 12:15:30
author: jaeyoon
categories: ["기록", "생각"]
tags:
  - "javascript"
  - "jQuery"
  - "vanillaJS"
  - "published"
---

**끊임없는 변화 속에서 중요한 것은 변하지 않는 것**

- **jQuery의 전성기**

  2010년대 초반은 jQuery의 전성기였다. $는 간편했고, AJAX와 애니메이션을 심플하게 만들어 주었으며, 수많은 플러그인이  jQuery 기반으로 나왔다. 이러한 간편함과 플러그인 커뮤니티 덕분에 jQuery는 오랜 시간 큰 사랑을 받았다.



- **스마트폰의 대두**

  그러나 이제 많은 사람들이 jQuery Free를 외치고 있다. 이는 스마트폰의 시대가 열리면서 본격적이 되었다. 휴대폰에 탑재된 느리고 열등한 CPU와 적은 메모리, 그리고 작은 데이터 대역폭(bandwidth)은 jQuery를 사용하기에 적절하지 못한 환경이었기 때문이다.



- **모듈화의 시대**

  한 마디로 jQuery는 너무 무겁다. jQuery의 내부적 요소들을 살펴보면, 불필요한 군살들이 너무 많다. 모듈화의 시대에서는 이제 jQuery의 부분부분을 조각내어 단일 목적의 lightweight 라이브러리들이 만들어지고 있다. 사용자의 3G/4G 데이터를 잡아먹지 않도록 말이다.



- **JavaScript Revolution**

  또한 node.js의 영향도 크다. node.js의 등장과 함께 JS는 더이상 단지 '브라우저의 언어'라는 명목에서 벗어나 서버 사이드 언어로 발전했다. 이와 동시에 jQuery는 오로지 client-side에서 DOM을 조작하는 라이브러리라는 점에서 가치가 떨어진다. 이러한 것들은 서버사이드로 전이 가능한 것이 아니기 때문이다.



- **새로운 프론트엔드 프레임워크/라이브러리**

  결정적으로 현재 React, Angular, Vue처럼 더 직관적이고 최신 기술의 프론트엔드 프레임워크/라이브러리가 등장하면서 jQuery의 인기는 절감되었다. 

  애니메이션의 경우, GSAP(GreenSock Animation Platform)이라는 애니메이션에만 집중한 라이브러리가 훨씬 더 빠른 성능을 자랑하고 있다. 아래는 GreenSock에서 직접 올린 각종 애니메이션 라이브러리 속도 비교 코드이다.




<p data-height="265" data-theme-id="0" data-slug-hash="srfxA" data-default-tab="js,result" data-user="GreenSock" data-embed-version="2" data-pen-title="Speed Test: GSAP, CSS Transitions (Zepto), jQuery 3, anime, WAAPI" class="codepen">GSAP, Zepto, jQuery, Anime, WAAPI 속도 비교 <a href="https://codepen.io/GreenSock/pen/srfxA/">Speed Test: GSAP, CSS Transitions (Zepto), jQuery 3, anime, WAAPI</a> by GreenSock (<a href="https://codepen.io/GreenSock">@GreenSock</a>) on <a href="https://codepen.io">CodePen</a>.</p>
  <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>


- **Vanilla JS**

  jQuery 플러그인들 중 종종 jQuery를 버리고 Vanilla JS 버전을 업데이트하는 경우가 있다. 새로운 라이브러리인가 생각할 수 있지만 [Vanilla-JS](http://vanilla-js.com) 웹사이트를 보면 알 수 있듯이 그냥 순수 JavaScript를 일컫는 말이다. Vanilla는 비격식으로 *평범한, 특별할 것 없는* 이라는 뜻을 가진 형용사이다. 위 웹사이트에 가서 파일을 다운로드받으면, 0byte에 바로 코딩을 시작하라는 주석 뿐이다. JavaScript 코딩에 있어 프레임워크/라이브러리가 필요하다는 의견을 비꼬기 위해 만들어진 개그 사이트인 것이다. 


- **jQuery를 쓰지 못하면 개발 생산성이 떨어지는가?**

  `$` 대신 `querySelector` 쓴다고 효율성이 뚝 떨어지는 건 아니라고 본다. jQuery 선택자는 항상 jQuery Object(마치 array처럼 사용 가능)를 반환하는데 index를 매번 붙여주는 게 가끔은 불편한 경우도 있다. 또한 [You might not need jQuery](http://youmightnotneedjquery.com/)에서 볼 수 있듯이 AJAX를 JS로 직접 구현하는 등의 작업도 아주 복잡한 일은 아니다. 



- **jQuery Free가 답인가?**

  물론 랜딩페이지처럼 간단한 one page application에 있어서는 여전히 jQuery가 강자이다. 또 플러그인 생태계를 생각하면 jQuery Free란 굉장히 아쉬운 아이디어이다. 하지만 테크 업계는 빠르게 변화하고, 변화를 따라가기 위해서는 기존 툴을 버려야 할 때가 온다. 

  ​

  이 글은 jQuery를 비난하고, React나 Angular의 중요성을 옹호하고자 한 것이 아니다. 나의 결론은 개발자가 오로지 한 가지 언어와 프레임워크로만 개발을 지속하는 것은 거의 불가능에 가까운 일이므로, 무언가를 버릴 시점에선 버리고 배울 시점에선 배우자는 이야기이다. IT는 그 어느 업계보다 변화가 빠르기에, 경쟁력을 갖추기 위해 중요한 것은 빠르게 변화하는 '유행' 프레임워크가 아니라, 변화에 빠르게 적응하는 감각과 실력을 갖추는 것이다.

  ​

  얼마 전 구글의 UX 엔지니어 김종민 님께서 메일로 *UX 엔지니어는 단지 직종일 뿐, 모든 직종이 새로 만들어지고 사라지듯이 이 또한 지금의 유행에 따른 직종* 이라고 말씀하셨던 게 생각난다. 실제로 김종민 님은 단 한 번도 'UX 엔지니어'가 되기 위해 공부한 적이 없다고 한다. 즉 중요한 것은 유행을 뒤쫓는 것이 아니라, 개발에 대한 이해나 디자인 감각처럼 **변하지 않는 것을 익히는 것**이다. 변하지 않는 것을 파악하면, 다른 직종이 나오더라도 적응할 수 있기 때문이다. 세상에 잘하는 사람들은 참 많은데 그 사람들 중에서 내가 독보적인 사람이 되려면 어떤 부분에 흥미를 느끼고 자신이 있는지가 중요하다는 말씀이, 어찌보면 참 교과서적인 말로 들릴 수도 있지만, 김종민 님께서 살아온 삶에 너무 극명히 드러나있어 내 가치관과 진로관에 와닿는다. 그런 의미에서 나는 이 글에서 찾던 '답'을 jQuery Free가 아닌, *변하지 않는 것* 이라고 정의내리고 싶다.
---
layout: post
title:  "오픈소스와 집단지성의 경이로움에 대하여"
subtitle: "드리블(Dribbble)에서 깃헙(Github)까지: Day-Night Switch에 담긴 이야기"
date:   2017-10-11 03:15:30
author: jaeyoon
categories: ["기록", "생각"]
tags:
  - "오픈소스"
  - "커뮤니티"
  - "OSS"
  - "Github"
  - "Dribbble"
  - "Codepen"
  - "published"
---

**드리블(Dribbble)에서 깃헙(Github)까지: Day-Night Switch에 담긴 이야기**

지난 학기 김창희 교수님 경영과학 시간에 냈던 과제물 [DEA를 통한 OSS의 효율성 분석](http://jaeyoon.io/lab)에서 나는 *오픈소스의 효율성 측면에서 '다수의 참여'는 긍정적인 것만은 아니다* 는 결론을 내렸다. 그런데 과제 발표 당시 전달 미스가 있었는지, 이를 오픈소스 자체에 대한 부정적 견해로 오해한 친구가 있었다. 거두절미하고 말하자면 전혀 아니다. 오픈소스의 효율성을 고려했을 때 '소수 엘리트 집단의 규제'가 필요하다는 것 뿐이지, 여전히 나는 오픈소스의 팬이며 그 경이로움은 끝이 없다고 믿는다.

StackOverFlow, GitHub, Linux 등등 오픈소스의 대단함을 엿볼 수 있는 멋진 것들이 참 많지만, 오늘은 그 중에서도 디자이너 포트폴리오 사이트인 [Dribbble](https://dribbble.com)과 짤막한 소스코드 공유 사이트 [Codepen](https://codepen.io)에 중점을 두고 벌어진 이야기를 하나 해보려 한다.

이야기는 2015년 1월 30일, 인도의 한 디자이너 [Ramakrishna V](http://www.ramakrish.in)가 [Day-Night Toggle Button](https://dribbble.com/shots/1907553-Day-Night-Toggle-Button)이라는 제목의 일러스트레이션을 Dribbble에 업로드하는 데서부터 시작된다.

<figure>
  <img data-action="zoom" src="https://cdn.dribbble.com/users/484057/screenshots/1907553/day-night-toggle_1x.jpg" alt="Static한 Day-Night Toggle Button"/>
  <figcaption> Static한 Day-Night Toggle Button </figcaption>
</figure>

iOS 토글 버튼에 낮과 밤이라는 컨셉을 입힌 귀여운 아이디어이다. 이는 순식간에 드리블 사이트 Popular 코너에 이름을 올리며 많은 사람들로부터 뜨거운 반응을 얻는다.

다음날, New York 브루클린의 디자이너 [Tsuriel](http://tsurieldesign.com)은 이에 After Effects로 애니메이션을 넣은 GIF 버전을 드리블에 업로드한다. 
이 애니메이션 역시 뜨거운 반응을 얻었고, 지금은 Day Night Switch를 검색했을 때 Ramakrishna V가 작업한 최초 게시물보다도 오히려 먼저 나온다.

<figure>
  <img data-action="zoom" src="https://cdn.dribbble.com/users/470545/screenshots/1909289/switch_02.gif" alt="Ramakrishna V의 애니메이션"/>
  <figcaption> Ramakrishna V의 애니메이션 </figcaption>
</figure>

또 이번에는 미국 Minnesota 주에 사는 [Jason Dicks](https://twitter.com/In_finiteloop)는 이를 Pure CSS로 구현한 Codepen을 만들어 올린다.

<p data-height="265" data-theme-id="0" data-slug-hash="qEXzOQ" data-default-tab="css,result" data-user="jsndks" data-embed-version="2" data-pen-title="Pure CSS Day/Night Toggle Swith" class="codepen">Jason Dicks가 구현한 Day-Night Toggle Button <a href="https://codepen.io/jsndks/pen/qEXzOQ/">Pure CSS Day/Night Toggle Swith</a> by Jason Dicks (<a href="https://codepen.io/jsndks">@jsndks</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

코드를 보면 알 수 있듯이 JavaScript 없이 오직 CSS만으로 애니메이션을 구현했다. 구름, 달 표면의 Crater나 밤하늘의 별들도 모두 이미지가 아닌 CSS이다.

한 달 후, 애니메이션이 아쉬웠던지 영국 런던에 사는 UI 엔지니어 [Ashley Nolan](http://ashleynolan.co.uk)이 손 본 코드를 Codepen에 재업로드한다. 이는 아직까지도 'CSS Button'을 검색하면 가장 먼저 뜨는 인기 있는 Codepen 게시물 중 하나로 손꼽히고 있다.

<p data-height="265" data-theme-id="0" data-slug-hash="wBppKz" data-default-tab="css,result" data-user="ashleynolan" data-embed-version="2" data-pen-title="A bunch of funky CSS3 Toggle Buttons" class="codepen">Ashley Nolan의 Toggle Button 시리즈 <a href="https://codepen.io/ashleynolan/pen/wBppKz/">A bunch of funky CSS3 Toggle Buttons</a> by Ashley Nolan (<a href="https://codepen.io/ashleynolan">@ashleynolan</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

1년이 훌쩍 지나고, 2016년 9월, 독일 북부에 사는 iOS 개발자 [Finn Gaida](https://github.com/finngaida/DayNightSwitch)는 이를 실제 iOS에 적용할 수 있도록 짠 Swift 프로젝트를 GitHub에 오픈소스로 공개했다.

<figure>
  <img data-action="zoom" src="{{ '/assets/img/171011/finn.png' | relative_url }}" alt="iOS용 Day-Night Toggle Button"/>
  <figcaption> iOS용 Day-Night Toggle Button </figcaption>
</figure>

또 런던의 디자이너 [Juliana Martinhago](https://dribbble.com/shots/3617536-Daily-UI-Challenge-015)가 Dribbble과 [Uplabs](https://uplabs.com) 에 약간 수정된 버전의 애니메이션을 포스팅했고,

<figure>
  <img data-action="zoom" src="https://cdn.dribbble.com/users/396527/screenshots/3617536/switch-final.gif" alt="Juliana Martinhago가 수정한 버전"/>
  <figcaption> Juliana Martinhago가 수정한 버전 </figcaption>
</figure>

이를 본 이란의 Android 개발자 [Mahfa](https://github.com/Mahfa/DayNightSwitch)는 불과 네 달 전, Android 버전 스위치를 GitHub에 공유했다.

<figure>
  <img data-action="zoom" src="{{ '/assets/img/171011/mahfa.png' | relative_url }}" alt="Android용 Day-Night Toggle Button"/>
  <figcaption> Android용 Day-Night Toggle Button </figcaption>
</figure>

이렇게 디자이너의 영감이 담긴 Static한 이미지 한 장이 실제 iOS, Android의 스위치로 사용되기까지, 경제적 유인도 면대면으로 이루어지는 팀워크도 없었다. 즉 전통적인 관점에서는 설명이 되지 않는 현상이다. 3년 전에 올라온 일러스트레이션 하나가 세계 곳곳의 디자이너와 개발자에게 영감이 되어 여러 가지 오픈소스 작품을 생성해내는 힘은 무엇일까? 비슷한 원리로 또다른 문제들을 해결할 수 있지 않을까?

이 이야기는 내가 웹서핑을 하다가 우연히 발견하게 된 사소한 사례이지만, 똑같은 원리로 사람들은 [리눅스](https://github.com/torvalds/linux)를 만들어내고 [MySQL](https://github.com/mysql)을 만들어냈다. 앎의 나눔을 아까워하지 않는 오픈소스 문화가 참 좋다.


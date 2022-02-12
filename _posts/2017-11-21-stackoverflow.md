---
layout: post
title:  "StackOverFlow에 Example Code를 첨부해야하는 또다른 이유"
subtitle: "Safari에서 animation-play-state 버그 디버깅하기"
date:   2017-11-21 12:15:30
author: jaeyoon
categories: ["기록", "생각"]
tags:
  - "StackOverFlow"
  - "커뮤니티"
  - "브라우저호환성"
  - "published"
---

**Safari에서 animation-play-state 버그 디버깅하기**

StackOverFlow에 질문을 할 때, Preview 코드를 첨부하지 않으면 -1를 받기 십상이다. 반드시 StackOverFlow에 있는 [Example Code 작성법 포스팅](https://stackoverflow.com/help/mcve)을 참고하여 Minimal, Complete, and Verifiable Example, 소위 MCVE를 함께 첨부하고, 사전에 리서치를 충분히 했다는 인상을 확실히 남겨주어야 한다.
가장 큰 이유는 이런 노력을 통해 Reputation 점수를 확보하지 않으면 이용할 수 있는 기능이 굉장히 제한되기 때문이다. 특히 인상깊었던 제한 정책 중 하나는 StackOverFlow가 질문글에 달 수 있는 태그까지 Reputation 점수에 따라 차별화시킨다는 것. 더 구체적이고 전문적인 태그를 달수록 질 좋은 답변이 달릴 확률이 높아지기 때문에, 논리적으로 충분히 차별화 포인트가 된다.

<figure>
  <img data-action="zoom" src="https://cdn-images-1.medium.com/max/1600/1*ZkkpjuqrWTVNPxGqRR-CHQ.png" alt="StackOverFlow 질문의 Reputation 점수와 Example Code 예시"/>
  <figcaption> StackOverFlow 질문의 Reputation 점수와 Example Code 예시 </figcaption>
</figure>

하지만 내가 이 글에서 말하고자 하는 바는 Reputation 외에도 Example Code가 유용한 또다른 이유이다. 바로 Full Code를 StackOverFlow에서 요구하는 대로 Minimal, Complete, and Verifiable하게 바꾸는 과정에서 답을 찾기가 쉽기 때문. 즉 **질문을 올리기 전에 질문을 쓰는 과정에서 답을 스스로 찾게 되는 것**이다. 필요 없다고 생각이 드는 부분을 하나씩 지워나가면서 코드 리뷰를 하게 되고 그 과정에서 문제를 일으키는 부분이 눈에 들어올 때가 많다.

나의 경우 포트폴리오 웹을 만들면서 Three.js 없이 CSS3 3d Transform만으로 3d animation을 구현하려 이것저것 시도를 많이 했는데, IE는 당연하지만 유난히 Safari에서 알 수 없는 에러가 굉장히 많았다. JS로 한 요소의 transform 값을 바꾸니 자꾸만 괴상한 자리로 가는 것이다. 심지어 Inspector조차 element를 선택하면 올바른 자리에 있다고 말하고, 콘솔에서 `getComputedStyle` 을 이용해봐도 올바른 값을 가지고 있다고 이야기해 도저히 디버깅을 할 수가 없었다.

그래서 StackOverFlow에 질문글을 올리기로 결심했고, 방대한 양의 코드를 전부 첨부할 수는 없으니 질문의 핵심이 되는 코드만 남겨두고 다른 코드를 하나씩 정리하기 시작했다. 그런데 웬걸, `animation-play-state: paused` 가 있던 줄을 삭제하니 완벽하게 워킹하는 것이다. 처음에는 SCSS 컴파일러를 없앤 타이밍에 제대로 작동하기 시작해서 SCSS 컴파일러 문제인 줄 알았다. 하지만 조금 더 코드를 살펴보니 Safari에서는 `transform: rotateY()` 값과 `animation-play-state: paused` 가 conflict를 일으키는 모양이다. 또 `.getComputedStyle` 과 `.getPropertyValue` 로 리턴되는 transform matrix가 keyframes animation으로 바뀐 transform 값이 아닌 element에 적용된 본래의 transform 값이다. 이때문에 결국 safari에선 animation이 smooth하지 않지만 (하려면 할 수 있겠으나 코드를 더럽히기도 싫고 귀찮다…) 어찌 됐든 전혀 다른 position을 가지게 되던 큰 문제는 해결되었다.

<figure>
  <img data-action="zoom" src="{{ '/assets/img/171121/bug1.png' | relative_url }}" alt="Safari Animation-play-state 버그"/>
  <img data-action="zoom" src="{{ '/assets/img/171121/bug2.png' | relative_url }}" alt="Safari Animation-play-state 버그 - 콘솔"/>
  <figcaption> Safari에서 발생하는 Animation-play-state 버그 (Console에 뜨는 위치값과 브라우저 상에 렌더링되는 위치가 전혀 다른 것을 확인할 수 있다.) </figcaption>
</figure>

이런 브라우저 호환성 이슈들은 참 태클하기 싫은 어려운 문제다. 아래 깃헙 스크린샷을 보면 Mobile Compatibility 테스팅하다가 분노에 휩싸인 나의 커밋 메시지를 볼 수 있다. 특히 크롬에서 완벽하게 작동하는 것을 확인한 채 뿌듯한 마음으로 모바일 브라우저를 켰을 때 괴상한 광경을 목격한 순간의 감정은 말로 표현할 수 없다. 아래는 내가 당시 느낀 그 감정을 듬뿍 담아 작성했던 커밋 메시지 내역이다.

<figure>
  <img data-action="zoom" src="{{ '/assets/img/171121/commit.png' | relative_url }}" alt="분노의 Commit 내역"/>
  <figcaption> 분노의 Commit 내역 </figcaption>
</figure>

그럼에도 불구하고 디버깅이 즐거운 것은, 이 모든 에러를 해결하고 나면 극도의 쾌감을 맛볼 수 있기 때문이다. 더 많은 분노를 일으킨 버그였을 수록 해결되었을 때 더 높은 쾌감을 선사한다. 뭐 개발이 아니라 그 어떤 일도 마찬가지이로 시행착오가 있을 때, 일을 마무리짓고 나면 결과물에 대한 애정과 보람이 더 크지 않나 싶다. 아무튼 내 포트폴리오 웹은 이런 식으로 완성이 되었다. 결과적으로 돌이켜보면 고집부리지 말고 유료 플러그인이나 three.js 같은 라이브러리 가져다 쓰는 게 현명했던 것 같기도 하지만, 어찌되었든 다양한 고민을 안겨준 즐거운 시간이었다.

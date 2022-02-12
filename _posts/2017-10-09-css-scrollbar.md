---
layout: post
title: "CSS 스크롤바에 대한 거의 모든 것"
subtitle:  "스크롤은 유지한 채 스크롤바만 깔끔하게 없애는 법을 알아보자"
date:   2017-10-09 03:15:30
author: jaeyoon
categories: ["배움", "개발"]
tags:
  - "css"
  - "published"
---

**스크롤은 유지한 채 스크롤바만 깔끔하게 없애는 법을 알아보자**

윈도우 혹은 특정 브라우저에서 스크롤바가 걸리적거리는 경우가 있다. 특히 table의 경우에는 다음과 같이 더욱 난장판이다:

<figure>
	<img data-action="zoom" src="https://jandi-box.com/files-thumb/13597036/fe8868e9eca403a9d326e1ed41bdc3c3.png?size=640" alt="스크롤바 난장판">
	<figcaption>난장판이 된 스크롤바</figcaption>
</figure>

이는 간단한 CSS 코드로 쉽게 해결 가능한 문제이다.

**1. 우선 스크롤이 아예 필요 없는 경우**

```scss
th, td {
  overflow: hidden;
}
```

**2. 가로축만 스크롤 되게 하고 싶은 경우**

```scss
th, td {
  overflow-y: hidden;
  overflow-x: auto; // 스크롤 있는 경우에만 표시
}
```

**3. 스크롤바만 없애되, 스크롤은 유지하고픈 경우**

```scss
th, td {
  -ms-overflow-style: none; // IE에서 스크롤바 감춤
  &::-webkit-scrollbar { 
    display: none !important; // 윈도우 크롬 등
  }
}
```

**4. 보너스로 커스텀 스타일 적용하기**

```scss
.scrollbar {
	&::-webkit-scrollbar {
		width: 3px;
		background: none;
	}
	&::-webkit-scrollbar-thumb {
	    background: #f8f7fb;
	    opacity: .4;
	}
	&::-webkit-scrollbar-track {
	    background: none;
	}
}
```

<br>



#### Ref

[https://stackoverflow.com/questions/3296644/hiding-the-scrollbar-on-an-html-page](https://stackoverflow.com/questions/3296644/hiding-the-scrollbar-on-an-html-page)

[https://developer.mozilla.org/en-US/docs/Web/CSS/overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)

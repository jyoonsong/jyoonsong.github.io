---
layout: post
title:  "지킬(Jekyll) 포스팅에 이미지 첨부하는 방법 총체적 정리"
subtitle: "경로 지정과 이미지 첨부, 그리고 이미지 캡션 작성까지"
date:   2017-12-30 03:15:30
author: jaeyoon
categories: ["배움", "개발"]
tags:
  - "블로그"
  - "HTML"
  - "Jekyll"
  - "Markdown"
  - "published"
---

<h4><b>경로 설정하기</b></h4>

지킬에서 Path를 찾아나갈 때에는 기본적으로 `_config.yml`에서 정의된 `url`과 `baseurl`이라는 변수가 사용된다. 이를 위해 아래 이미지에서 알 수 있듯이 `url`은 도메인 root path, `baseurl`은 subpath를 말한다. 후자는 사이트가 도메인의 root가 아닌 subpath에 호스팅된 경우에 유용하게 사용된다.

![Jekyll의 이미지 Path](https://byparker.com/img/what-is-a-baseurl.jpg)

```yml
//_config.yml
url: "http://blog.jaeyoon.io"
baseurl: "my-baseurl"
```
{% raw %}
지킬은 기본적으로 YAML Front Matter을 가진 파일이 아니면 Liquid를 프로세싱하지 않는데, 이 YAML Front Matter은 기본적으로 아래 두 줄로 표시된다.

```yml
---
---
```

따라서 이 두 줄이 추가되지 않은 파일에서는 `{{ site.baseurl }}`과 같이 위에서 정의한 리퀴드 변수를 사용할 수 없다. 
{% endraw %}


<br>

<h4><b>이미지 첨부하기</b></h4>

**1. HTML 문법으로**

Absolute URL (절대 경로) - `url`과 `baseurl`을 앞에 붙여준다.

{% raw %}
```html
<img data-action="zoom" src='{{ "/assets/img/image.png" | relative_url }}' alt='absolute'>
<!-- result : http://blog.jaeyoon.io/my-baseurl/assets/img/image.png -->
```
{% endraw %}

Relative URL (상대 경로) - `baseurl`을 앞에 붙여준다.

{% raw %}
```html
<img data-action="zoom" src='{{ "/assets/img/image.png" | relative_url }}' alt='relative'>
<!-- result : /my-baseurl/assets/img/image.png -->
```
{% endraw %}


**2. 마크다운(MD) 문법으로**

Jekyll이 사용하는 마크다운-HTML 컨버터인 `kramdown` 하에서는 아래 네 가지 방식이 모두 허용된다. 

{% raw %}
```markdown
- ![Image Alt 텍스트]({{site.url}}/assets/img/image.png )
- ![Image Alt 텍스트](http://blog.jaeyoon.io/assets/img/image.png)
- ![Image Alt 텍스트]({{"/assets/img/image.png"| relative_url}})
- ![Image Alt 텍스트](/assets/img/image.png)
```
{% endraw %}

클래스명, alt값 등은 `{:property = "value"}`형태로 붙여주면 된다.

```markdown
![Image Alt 텍스트](/assets/img/image.png){:class="img-responsive"}
```



**3. SASS/SCSS 파일 안에서 이미지 불러오기**

YAML Front Matter 블록이 정의된 `main.scss` 파일에서 리퀴드 문법으로 사이트 URL 변수를 정의해준다.

{% raw %}
```scss
// main.scss
$baseurl: "{{ site.baseurl }}";
@import "custom";
```
{% endraw %}

그리고 임포트되는 기타 SCSS파일들에서는 이 변수를 사용하여 작업하면 된다.

```scss
// custom.scss
background-image: url("#{$baseurl}/assets/img/image.png");
```



**4. defaults 세팅으로 불러오기**

`_config.yml`에서 마치 디폴트 레이아웃이 정의되어 있는 것처럼, 같은 방식으로 디폴트 이미지 경로를 지정해준다

```yml
defaults:
  - scope:
      path: "assets/img"
    values:
      image: true
```

이에 따라 지킬이 생성할 사이트는  `assets/img` 경로의 static한 이미지 파일들을 불러올 것이다. 즉 해당 경로의 이미지 파일들은 모두 `image: true`라는 YML Front Matter를 가지게 되는 것이다. 이러한 설정을 하에서는 `background-image`를 불러올 때에도 따로 변수를 생성할 필요없이 바로 경로를 적어줘도 된다.

{% raw %}
```markdown
{ % assign image_files = site.static_files | where: "image", true %}
{ % for myimage in image_files %}
  {{ myimage.path }}
{ % endfor %}
```
{% endraw %}

위 코드는 `assets/img`의 모든 파일이 출력되는 결과를 가져온다



<br>

<h4><b>이미지 캡션 달기</b></h4>

**1. HTML figure 태그**

포스팅 MD 파일 안에 HTML 태그를 포함시켜도 상관 없기 때문에 귀찮은 방법이지만 일일이 figure 태그로 마크업하는 방법이 있다.

{% raw %}
```html
<figure>
  <img data-action="zoom" src='{{ "/assets/img/image.png" | relative_url }}' alt='absolute'>
  <figcaption>여기에 캡션을 작성합니다.</figcaption>
</figure>
```
{% endraw %}



**2. Custom CSS**

스타일시트를 커스터마이즈하여 마크다운 문법으로 작성한 결과에 캡션 스타일을 먹이도록 할 수 있다. 예컨대 아래 코드에서는 img 태그 바로 뒤에 나오는 em 태그에만 캡션 스타일을 적용시킨다. em태그 말고도 `>` 로 사용하는 blockquote 태그, 또는 `{:.image-caption}` 로 클래스를 정의해서 사용해도 된다.

{% raw %}
```markdown
![Image Alt 텍스트]({{"/assets/img/image.png"| relative_url}})
*여기에 캡션을 작성합니다.*
```
{% endraw %}

위 마크다운은 `kramdown`에 의해 아래와 같은 HTML로 변환된다.

```html
<p>
  <img data-action="zoom" src="http://blog.jaeyoon.io/assets/img/image.png" alt="Image Alt 텍스트">
  <em>여기에 캡션을 작성합니다.</em>
</p>
```

따라서 CSS는 아래와 같이 커스터마이징해주면 된다. 이 경우, em과 img 태그가 같은 p 태그를 부모로 가지도록 두 태그 사이에 빈 줄이 생기지 않도록 주의해야 한다.

```scss
img + em {
  text-align: center;
  font-size: .8rem;
  color: $grey-color-light;
}
```



**3. 마크다운 Table**

표를 이용해도 깔끔한 뷰를 만들 수 있다.

{% raw %}
```markdown
| ![Image Alt 텍스트]({{"/assets/img/image.png"| relative_url}}) | 
|:--:| 
| 여기에 캡션을 작성합니다. |
```
{% endraw %}

| ![Image Alt 텍스트](https://dummyimage.com/600x300/ffd9e5/ffffff&text=like+this+yo) |
|:--:| 
|              여기에 캡션을 작성합니다.              |



**4. _includes에서 Partial View 만들기**

Liquid가 제공하는 기능을 가장 full로 이용하는 방법인데, `_includes` 폴더에 새로운 html 조각 파일을 만들고, 이를 가져다가 사용하는 것이다. html 조각 파일에는 table 태그를 사용할 수도 있고, figure 태그로 마크업을 할 수도 있다.

{% raw %}
```html
<!-- _includes/image.html -->
<figure>
  <img data-action="zoom" src='{{ include.url }}' alt='{{ include.alt }}'>
  <figcaption>{{ include.description }}</figcaption>
</figure>
```
{% endraw %}

실제 포스팅을 작성하는 md 파일에서는 아래와 같이 사용하면 된다.

{% raw %}
```markdown
{% include image.html url='{{"/assets/img/logo.png"| relative_url}}' description='여기에 캡션을 작성합니다.' alt='Image Alt 텍스트' %}
```
{% endraw %}


<br>

<h4><b>Ref</b></h4>

jekyll 다큐멘테이션 - http://jekyllrb.com <br>
StackOverFlow - https://stackoverflow.com
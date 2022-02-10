---
layout: post
title:  "장고 프로젝트에서 SASS/SCSS 사용하기"
subtitle: "django-sass-processor을 설치해보자"
date:   2017-10-08 03:15:30
author: jaeyoon
categories: ["배움", "개발"]
tags:
  - "django"
  - "sass/scss"
  - "published"
---

#### CSS 프리프로세서에 대하여

SASS/SCSS는 스타일시트 언어인 CSS를 조금이나마 프로그래밍 언어처럼 사용할 수 있게 도와주는 CSS 프리프로세서(preprocessor)이다. SASS 말고도 Bootstrap이 v3까지 쓰던 LESS 또는 문법을 극도로 간소화한 Stylus라는 녀석들도 CSS 프리프로세서이다. 하지만 브라우저가 이해하는 언어는 CSS이지, SCSS, LESS 등이 아니기 때문에 이를 다시 CSS로 컴파일해줄 프로세서(processor)가 필요하다.

<figure>

​	<img data-action="zoom" data-action="zoom" src="https://image.slidesharecdn.com/preprocessor-100427070152-phpapp02/95/preprocessor-3-728.jpg?cb=1319966096" alt="프리프로세서의 개념">

​	<figcaption>프리프로세서의 개념</figcaption>

</figure>



<br>

#### 장고 프로젝트와 SCSS

SCSS를 컴파일할 방법은 굉장히 많은데, 각 에디터별로 SASS 플러그인을 설치하면 쉽게 컴파일할 수 있곤 하다. 또 Ruby On Rails를 사용하면, 따로 플러그인을 설치하지 않아도 자동으로  `폴더명.scss` 파일이 스캐폴딩되어 Asset Pipeline을 통해 하나의 CSS 파일로 합쳐진다. SASS 자체가 Ruby로 코딩되었기 때문에 레일즈와는 죽이 참 잘 맞는 모양이다. Node.js에서는 `gulp-sass` 이라는 걸프 플러그인을 설치하여 `gulp` 가 sass/scss로부터 css파일을 만들어내도록 한다.

그렇다면 이제 이 글의 주인공 장고는 어떨까? 사실 별 거 없다. 그냥 [django-sass-processor](https://github.com/jrief/django-sass-processor) 라는 플러그인을 붙여주면 된다. 그런데 환경 설정이 레일즈나 노드JS에서보다는 할 게 좀더 많아서 살짝만 정리해보기로 한다.



<br>

#### 설치

아래처럼 `pip` 로 세 가지를 설치해준다.

```bash
pip install libsass django-compressor django-sass-processor
```

잠깐 딴소리긴 하지만 명령어에 `freeze > requirements.txt` 를 추가해주면 requirements.txt 파일에도 추가되어 다른 팀원들도 문제 없이 컴파일을 진행할 수 있게 된다. `pip-save` 라는 패키지도 있다고는 하는데, 나는 그냥 npm이랑 비슷하게 `-s` 를 치면 `freeze > requirements.txt` 를 실행하도록 설정해두었다. 자세한 것은 [여기](http://blog.abhiomkar.in/2015/11/12/pip-save-npm-like-behaviour-to-pip/)를 참고하면 좋다.



<br>

#### 환경 설정

`settings.py`에서 다음과 같은 설정을 해주어야 작동한다.

- **필수 사항**

  ```python
  INSTALLED_APPS = [
      ...
      'sass_processor',
      ...
  ]
  SASS_PROCESSOR_ENABLED = True
  SASS_PROCESSOR_ROOT = os.path.join(BASE_DIR, 폴더명(있을 경우), 'static')
  ```

  `SASS_PROCESSOR_ROOT` 의 경우 설정해주지 않으면 `STATIC_ROOT` 를 디폴트 값으로 가진다. 다른 경로 설정을 살펴보고 만약 `STATIC_ROOT` 로 설정되어도 맞다면 굳이 작성해줄 필요 없다.

- **추천 옵션 사항**

  ```python
  SASS_OUTPUT_STYLE = 'compact'
  ```

  `expanded `, `nested` , `compact` , `compressed` 의 네 가지 값을 가질 수 있는데, 뒤로 갈수록 더 촘촘히 많이 압축된다고 보면 된다. 디폴트는 `DEBUG`가 True인 경우에는 `nested`, False인 경우에는 `compressed` 이다.

  ```python
  SASS_PRECISION = 8
  ```

  `bootstrap-sass` 를 사용하는 경우 위와 같은 설정을 해주어야 한다.



<br>

#### 사용 방법

장고 템플릿 안에서 아래와 같이 사용하면 된다. 원래 쓰던 {% raw %} `{% block css }` {% endraw %} 대신이라고 보면 된다. 엔딩 태그는 없다.

{% raw %}
```
{% load sass_tags %}

<link href="{% sass_src 'css/main.scss' %}" rel="stylesheet" type="text/css" />
```
{% endraw %}


위에 명시해준 경로 앞에 아까 환경설정에서 정의한 `SASS_PROCESSOR_ROOT` 가 붙는다고 생각하면 된다. 예컨대 `SASS_PROCESSOR_ROOT` 를 `myapp/static` 으로 설정해 놨으면 렌더링되는 HTML은 다음과 같다.

```html
<link href="/myapp/static/css/main.css" rel="stylesheet" type="text/css" />
```

기타 더 자세한 사용법은 [프로젝트 README 파일](https://github.com/jrief/django-sass-processor/blob/master/README.md)을 참고하기 바란다.



<br>

#### Ref

https://github.com/jrief/django-sass-processor/blob/master/README.md
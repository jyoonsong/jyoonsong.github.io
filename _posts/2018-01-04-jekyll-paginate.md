---
layout: post
title:  "Jekyll Pagination 젬을 통해 무한 스크롤 만들기"
subtitle: "jekyll-pagination-v2 젬을 이용하여 블로그를 페이징해보자"
date:   2018-01-04 03:15:30
author: jaeyoon
categories: ["배움", "개발"]
tags:
- "jekyll"
- "published"
---

**jekyll-pagination-v2 젬을 이용하여 블로그를 페이징해보자**

Jekyll은 버전 2에서 버전 3으로 대대적인 업데이트를 했는데, 호환에 신경을 안 썼는지 기존 플러그인들 중 무용지물이 된 것이 수두룩하다. (Hexo가 인기를 끌고 있는 이유 중 하나이기도 하다.)

같은 이유로 [jekyll-pagination 젬](https://github.com/jekyll/jekyll-paginate)도 버전 3과 호환이 되기는 하지만 더이상 업데이트하지 않겠다고 선언하여 여러 가지 문제점이 많다. 레포지토리 description에 `NO LONGER UNDER ACTIVE DEVELOPMENT as of Jekyll 3: Pagination Generator for Jekyll` 라고 써있고, 최근 이슈들에도 대부분 '이제 얜 버렸다'는 답변이 달려 있다.

더 이상 업데이트가 안 되는 대신, [jekyll-pagination-v2 젬](https://github.com/sverrirs/jekyll-paginate-v2)이 새로이 나왔는데, 문제는 이 녀석이 [github-pages 젬](https://github.com/github/pages-gem)과 호환이 안된다는 점이다. 그래서 [Travis CI](https://travis-ci.org)를 적용해줘야 하는데, 여간 골치아픈 일이 아니었다. Hexo로 갈아탈까 몇 번이고 생각했지만 테마 직접 만들어야 성에 차는 내 성격상 새로 파는 일이 더 귀찮았다. 아무튼 이 글에서는 우선 `jekyll-pagination-v2` 젬 및 infinite scroll 적용 방법을 알아보고, 다음 글에서 `travis CI`를 통해 디플로이 시키는 방법을 알아보도록 하겠다.

<br>

**1. 기본 페이지네이션**

규정상 가장 흔한 비밀번호 조건은 영어소문자, 숫자 포함 8자 이상의 비밀번호.

```ruby
# GEMFILE
group :jekyll_plugins do
  gem "jekyll-paginate-v2"
end
```
```yaml
# _config.yml
plugins:
  - jekyll-paginate-v2
pagination:
  enabled: true
  per_page: 9
  sort_reverse: true # 안 해주면 오래된 것부터 나옴
```
<br>

**2. 카테고리 페이지네이션**

여러 가지 구조로 만들 수 있지만, 나는 `_posts` 디렉토리 하나에 포스팅 몰아 넣는 걸 좋아해서 이 방식대로 만들었다. 우선 `categories`라는 폴더를 만들고, 그 안에 카테고리별로  페이지를 만들어둔다.

```javascript
// 디렉토리 구조
categories
ㄴ 관심사.md
ㄴ 카테고리.md
```
해당 페이지 안에는 이렇게 작성해준다. 아래처럼 설정해두면 페이징된 경로는 `카테고리명/번호` 가 될 것이다.
```yaml
# categories/카테고리.md
---
layout: home
title: "관심사"
description: "IT/테크, 실리콘밸리, 추천 툴 등"
permalink: "/관심사"
pagination: 
  enabled: true
  category: "관심사"
  permalink: /:num/
---
```
`jekyll-paginate-v2`를 만든 sverrirs는 페이지네이터에게 혼란이 오지 않도록 아래처럼 url 양식 명시하는 것을 추천한다. 
```yaml
# _config.yml
permalink: /:year/:month/:title.html
```

다 했으면 이제 기본 템플릿 `_layouts/home.html` 에서 아마 `site.posts` 였던 것을 `paginator.posts`로 바꿔준다. 그 아래에는 페이지네이터 네비게이션도 추가해주면 일단 완성이다.

{% raw %}
```html
<!-- _layouts/home.html -->
{% for post in paginator.posts %}
	<a href="{{ post.url | relative_url }}">
      <strong>{{ post.title | escape }}</strong>
	</a>
{% endfor %}
{% if paginator.total_pages > 1 %}
  <ul class="pager">
    {% if paginator.previous_page %}
    <li>
      <a class="previous" href="{{ paginator.previous_page_path | prepend: site.baseurl | replace: '//', '/' }}">&larr; 이전</a>
    </li>
    {% endif %}
    {% if paginator.next_page %}
    <li>
      <a class="next" href="{{ paginator.next_page_path | prepend: site.baseurl | replace: '//', '/' }}">다음 &rarr;</a>
    </li>
    {% endif %}
  </ul>
{% endif %}
```

{% endraw %}

<br>

**2.1. v1과의 차이점** 

페이지네이션 v2 젬은 v1과 비교했을 때, 네비게이션을 1,2,3,4,5 형식으로 여러 숫자가 뜨도록 하고자 할 때 `trail` 옵션을 통해 아주 간단하게 추가할 수 있어 훨씬 편리하다. 무엇보다도 [Readme.md](https://github.com/sverrirs/jekyll-paginate-v2/blob/master/README-GENERATOR.md) 와 [examples](https://github.com/sverrirs/jekyll-paginate-v2/tree/master/examples) 정리가 너무 잘 되어 있다. 또한 더 복잡한 카테고리/태그를 자동 생성할 수 있는 [autopages](https://github.com/sverrirs/jekyll-paginate-v2/blob/master/README-AUTOPAGES.md)도 함께 딸려오는데 지킬 쓰다보면 자연스럽게 필요를 느끼는 아주아주 유용한 기능이니 참고하길 바란다.

<br>

**3. 무한 스크롤 (Infinite Scroll)**

일단 무한 스크롤은 페이지네이션이 적용되어 있어야 사용 가능하다. 왜냐하면 ajax 처리할 *다음 페이지* 가 어떻게든 존재해야하기 때문.

나는 핀트러스트로 유명한 [Masonry](https://masonry.desandro.com/) 레이아웃을 쓰고 있기 때문에, 같은 저자가 만든 [Infinite-scroll](https://infinite-scroll.com/) 플러그인을 활용했다. vanilla javascript 버전도 있고 jQuery 버전도 있다. 다음과 같은 js 코드를 추가해주면 간단히 적용 가능하다.

```javascript
if ( document.querySelector('.pager') ) {
  var infScroll = new InfiniteScroll( grid, {
    path: '.next',
    append: '.grid-item',
    outlayer: msnry,
    status: '.page-load-status',
    hideNav: '.pager',
    scrollThreshold: 0,
    responseType: 'document'
  });
}
```

물론 html도 상응해서 마크업을 해줘야 한다. 나같은 경우는 불러올 포스팅 하나하나가 `.grid-item` 으로 마크업 되어 있고, 그걸 감싼 컨테이너를 `grid`라는 변수로 넣어줬다. 나머지 클래스명들은 위 페이지네이션 네비게이션 마크업과 일치한다.

<br>

#### Ref

https://github.com/sverrirs/jekyll-paginate-v2/tree/master/examples<br>
https://infinite-scroll.com/api.html
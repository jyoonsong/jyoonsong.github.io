---
layout: post
title:  "오픈소스와 집단지성의 경이로움에 대하여"
subtitle: "Day-Night Switch에 담긴 이야기"
date:   2017-10-11 03:15:30
author: jae
categories: 생각
---

지난 학기 김창희 교수님 경영과학 시간에 냈던 과제물 [DEA를 통한 OSS의 효율성 분석]()에서 내렸던 결론은 *오픈소스와 집단지성이 효율성 측면에서는 긍정적인 것만은 아니다* 였지만, 여전히 나는 오픈소스의 팬이며 그 경이로움은 끝이 없다고 믿는다.

StackOverFlow, GitHub, Linux 등등 오픈소스의 대단함을 엿볼 수 있는 멋진 것들이 참 많지만, 오늘은 그 중에서도 디자이너 포트폴리오 사이트인 [Dribbble](https://dribbble.com)과 짤막한 소스코드 공유 사이트 [Codepen](https://codepen.io)에 중점을 두고 벌어진 이야기를 하나 해보려 한다.

이야기는 2015년 1월 30일, 인도의 한 디자이너 [Ramakrishna V]()가 [Day-Night Toggle Button]()이라는 제목의 일러스트레이션을 Dribbble에 업로드하는 데서부터 시작된다.

![1](https://cdn.dribbble.com/users/484057/screenshots/1907553/day-night-toggle_1x.jpg)

iOS 토글 버튼에 낮과 밤이라는 컨셉을 입힌 귀여운 아이디어이다. 이는 순식간에 드리블 사이트 Popular 코너에 이름을 올리며 많은 사람들로부터 뜨거운 반응을 얻는다.

다음날, New York 브루클린의 디자이너 [Tsuriel](tsurieldesign.com)은 이에 After Effects로 애니메이션을 넣은 GIF 버전을 드리블에 업로드한다.

![2](https://cdn.dribbble.com/users/470545/screenshots/1909289/switch_02.gif) 

또 이번에는 미국 Minnesota 주에 사는 [Jason Dicks]()는 이를 Pure CSS로 구현한 Codepen을 만들어 올린다.

[코드 넣기](https://codepen.io/jsndks/pen/qEXzOQ)

한 달 후, 애니메이션이 아쉬웠던지 영국 런던에 사는 UI 엔지니어 [Ashley Nolan](ashleynolan.co.uk)이 손 본 코드를 Codepen에 재업로드한다. 이는 아직까지도 'CSS Button'을 검색하면 가장 먼저 뜨는 인기 있는 Codepen 게시물 중 하나로 손꼽히고 있다.

[코드 넣기](https://codepen.io/ashleynolan/pen/wBppKz)

1년이 훌쩍 지나고, 2016년 9월, 독일 북부에 사는 iOS 개발자 [Finn Gaida](https://github.com/finngaida/DayNightSwitch)는 이를 실제 iOS에 적용할 수 있도록 짠 Swift 프로젝트를 GitHub에 오픈소스로 공개했다.

![캡처]()

또 런던의 디자이너 [Juliana Martinhago](https://dribbble.com/shots/3617536-Daily-UI-Challenge-015)가 Dribbble과 [Uplabs](https://uplabs.com) 에 약간 수정된 버전의 애니메이션을 포스팅했고,

![4](https://cdn.dribbble.com/users/396527/screenshots/3617536/switch-final.gif)

이를 본 이란의 Android 개발자 [Mahfa](https://github.com/Mahfa/DayNightSwitch)는 불과 네 달 전, Android 버전 스위치를 GitHub에 공유했다.

![캡처]()

마지막으로 어제, bootstrap-switch / react-switch



3년 전에 올라온 일러스트레이션 하나가 세계 곳곳의 디자이너와 개발자에게 영감이 되어 여러 가지 오픈소스 작품을 생성해낸 것이다. 이 이야기는 내 포트폴리오 사이트를 Day-Night 테마로 구상하면서, 같은 테마의 거의 모든 것들을 샅샅이 찾아봤는데 그러던 중 알게된 것이다. 포트폴리오 사이트에 포함시킬까 생각도 해봤지만, 다른 컴포넌트와 조화롭지 않은 것 같아 그냥 제외했다. 그래도 언제든지  

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at th          e source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/

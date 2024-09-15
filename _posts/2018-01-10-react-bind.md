---
layout: post
title:  "React에서의 바인딩(Binding) 방법들 (v16+ 기준)"
subtitle: "다양한 컴포넌트 - 이벤트/메서드 연결 방법을 알아보자"
date:   2018-01-10 03:15:30
author: jaeyoon
categories: ["배움", "개발"]
tags:
- "react"
- "published"
---

> 이 글은 현재 가장 최신인 16.2.0버전의 React를 기준으로 작성되었습니다. 

### 왜 필요한가?

JavaScript에서 다음 두 코드는 동일하지 **않다**

```jsx
obj.method();
```

```jsx
var method = obj.method;
method();
```

결론부터 말하자면 두 번째 코드는 오류가 나게 된다. Binding은 두 번째 코드가 첫번째 코드와 똑같이 작동할 수 있도록 해준다.

React에서는 일반적으로 다른 컴포넌트로 pass할 메소드만 binding하면 된다. 예컨대 `<button onClick={this.handleClick}>`에서는 `this.handleClick`을 pass하고 있으므로 binding이 필요하다. 반면 `render` 메소드 또는 [lifecycle 메소드](https://hackernoon.com/reactjs-component-lifecycle-methods-a-deep-dive-38275d9d13c0)에는 binding이 필요없다. 다른 컴포넌트로 pass되지 않으니깐.

JavaScript에서의 `bind`에 대해 알아보려면 [여기](http://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/)를 참고하라.

<br>



### 어떻게 하는가?

함수들이 컴포넌트 attributes 예컨대 `this.props`와 `this.state`에 대한 액서스를 가지도록 하는 방법에는 여러 가지가 있다.



**1. `constructor()` 에서 바인딩** (ES2015) : `this.method.bind(this)`

   ```jsx
   class Foo extends Component {
     constructor(props) {
       super(props);
       this.handleClick = this.handleClick.bind(this);
     }
     handleClick() {
       console.log('Click happened');
     }
     render() {
       return <button onClick={this.handleClick}>Click Me</button>;
     }
   }
   ```

   ​

**2. `render()`에서 바인딩** : `this.method.bind(this)`

   ```jsx
   class Foo extends Component {
     handleClick() {
       console.log('Click happened');
     }
     render() {
       return <button onClick={this.handleClick.bind(this)}>Click Me</button>;
     }
   }
   ```

    

**3. `render()` 에서 Arrow Function으로 바인딩** : `() => this.method()`

   ```jsx
   class Foo extends Component {
     handleClick() {
       console.log('Click happened');
     }
     render() {
       return <button onClick={() => this.handleClick()}>Click Me</button>;
     }
   }
   ```

   ​

**4. Class Properties** (실험적) : `method = () =>`

   ```jsx
   class Foo extends Component {
     handleClick = () => {
       console.log('Click happened');
     }
     render() {
       return <button onClick={this.handleClick}>Click Me</button>;
     }
   }
   ```
   ​

<br>


### Ref

- [Andrew Wray](https://blog.andrewray.me/react-es6-autobinding-and-createclass/)
- [React Documentation](https://reactjs.org/docs/faq-functions.html#why-is-binding-necessary-at-all)


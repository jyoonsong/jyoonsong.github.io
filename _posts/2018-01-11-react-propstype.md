---
layout: post
title:  "React에서 PropsType Validation하는 법 (v15.5+ 기준)"
subtitle: "커스텀 Validator 함수로 Props의 타입 검증 쉽게 하기"
date:   2018-01-11 03:15:30
author: jaeyoon
categories: ["배움", "개발"]
tags:
- "react"
- "published"
---

### 효과

**컴포넌트 클래스의 `propTypes` 객체를 설정**하면,

- 컴포넌트에서 원하는 props의 type & 전달된 props의 type 이 *일치하지 않을 때*, 콘솔에서 오류 메시지가 나타나도록 할 수 있다.
- `isRequired`로 필수 props를 지정할 수 있다. 즉 props를 *지정하지 않으면* 콘솔에서 오류 메시지가 나타난다.

<figure>
  <img data-action="zoom" src="https://velopert.com/wp-content/uploads/2016/03/%EC%9D%B4%EB%AF%B8%EC%A7%80-3-1.png" alt="콘솔의 오류 메시지 예시">
  <figcaption>콘솔의 오류 메시지 예시</figcaption>
</figure>

<br>



### 설치

> React v15.5부터는 PropTypes는 deprecated 되고 prop-types라는 다른 패키지로 이동되어, **따로 설치**하지 않으면 에러가 난다. (참고: https://reactjs.org/docs/typechecking-with-proptypes.html)

- 설치 `npm install —save prop-types`
- 사용되는 컴포넌트마다 임포트해준다 `import PropTypes from 'prop-types';`

<br>



### 사용

> 이전 버전의 경우 `title: React.PropTypes.stinrg` 처럼 앞에 `React`를 붙여줘야 한다. `PropTypes`가 `React`에서 분리되기 이전이기 때문. 

```jsx
// src/components/Content.js
import React from 'react';
 
class Content extends React.Component {
    render(){
        return (
            <div>
                <h2>{ this.props.title }</h2>
                <p> { this.props.body } </p>
            </div>
        );
    }
}

Content.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string.isRequired
};

export default Content;
```

하지만 위처럼 일일이 작성하면 귀찮으니 아래 [공식문서의 예시](https://reactjs.org/docs/typechecking-with-proptypes.html)와 같이 Custom Validator 함수를 정의하는 것이 좋은 방법이다. Array 혹은 Object를 사용하는 버전도 있다.

```jsx
import PropTypes from 'prop-types';
class MyComponent extends React.Component {
    /* ... */
}
MyComponent.propTypes = {
  // 선언해둔다 (디폴트로 optional)
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array (or fragment) containing these types.
  optionalNode: PropTypes.node,

  // A React element.
  optionalElement: PropTypes.element,

  // an instance of a class. This uses JS's instanceof operator.
  optionalMessage: PropTypes.instanceOf(Message),

  // ensure that your prop is limited to specific values by treating it as an enum.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // An object taking on a particular shape
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // 위의 것들 중 어느 것이든 isRequired와 묶을 수 있다
  requiredFunc: PropTypes.func.isRequired,

  // 묶지 않고 any data type이지만 isRequired 쓰고플 때
  requiredAny: PropTypes.any.isRequired,

  // Custom validator 함수 (기본)
  // It should return an `Error` object if the validation fails. 
  // Don't `console.warn` or throw, as this won't work inside `oneOfType`.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // Custom validator 함수 (`arrayOf`, `objectOf` 사용 버전)
  // It should return an `Error` object if the validation fails. 
  // The validator will be called for each key in the array or object. The first two arguments of the validator are the array or object itself, and the current item's key.
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

<br>


### Ref

- [React Documentation](https://reactjs.org/docs/)

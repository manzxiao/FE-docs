此文档没有安装，入门教程，默认为知道什么是 TS，懂得怎么安装并使用简单的 TS。

默认都懂:

- 基本类型： `boolean` `number` `string` `void` `null` `undefined` 等
- 可以被赋予任何值的 `any`
- 不确定的值 `unknown`
- 数组的类型 `any[]` `Array<T>`
- 枚举 `enum`
- 以及一些我们会漏掉的类型，如果有兴趣的可以提出，我们可以补上来。
- 下面开始介绍 Typescript

```tsx
import React from 'react';
import '../2.由any 和 unknown 引发的问题';
import '../3.泛型';
import '../4.函数重载';
import '../5.抽象类';
import '../6.infer';
import '../7.高级类型';
type a = { x: 1; y: '2' };
type b = { x: 1; z: '2' };

type c = a & b; // a 和 b的所有属性都要满足
type d = a | b; // a 或者 b都可以

const P: c = { x: 1, y: '2', z: '2' };
const O: d = { x: 1, y: '2' };
export default () => <>宝贝，点开下面的codesandbox</>;
```

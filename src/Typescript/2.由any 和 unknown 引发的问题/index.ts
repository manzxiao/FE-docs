/**
 * 一：any 引发的问题
 */
// 有个字符串 `{name:'baby'}`;
const str = JSON.stringify({ name: 'baby' });
// 我们想要获取这个name的值，可以这么做
const parser = JSON.parse(str); // 此时的结果const parser: any 是一个any类型。

// 我们这时候有一个函数
interface Parser {
  name: string;
}
function parserName(parser: Parser) {
  return parser.name;
}

const value = parserName(parser); // any 类型可以赋值给parser
console.info(value); // baby

// 但是，数据不会是一直符合要求的，比如我们有另外一个数据

const str2 = JSON.stringify('');
const parser2 = JSON.parse(str2);
const value2 = parserName(parser2);
console.info(value2); // 打印出来的是undefined 也没有报错。

/**
 *  1.0 自定义类型守卫
 */
// 由此我们引出了另外一个话题 自定义类型守卫
function isParser(parser: any): parser is Parser {
  return typeof parser === 'object' && typeof parser.name === 'string';
}
// 这时候，我们就不会出现undefined的情况了
if (isParser(parser)) {
  const value3 = parserName(parser2);
  console.info(value3);
}

// 自定义类型守卫公式
// function  函数名( 形参：参数类型)  : 形参 is A类型{
// 	return  true or false
// }

// case2：
// 判断是否是字符串的自定义守卫方法
// 1. 一般情况下我们会这么写
function isString(str: any): boolean {
  return typeof str === 'string';
}

// 其实应该这么写
function isString2(str: any): str is string {
  return typeof str === 'string';
}

function Test(value: any) {
  if (isString(value)) {
    // value.
    // value.这时候的.是出现不了任何东西的，因为他不知道我这个value是字符串，因为这个方法还未执行。
  }
  if (isString2(value)) {
    value.includes; // 这时候就可以有字符串的任何方法了。
  }
}

/**
 * 1.1  类型断言
 */
//  两个类中任意一个的属性和方法是另一个类的属性和方法完全相同或子集

class People {
  public username!: string;
  eat() {}
  step() {
    console.log('People=>step');
  }
}

class Stu extends People {
  public student!: string;
  study() {}
}

class Stu2 {
  public student!: string;
  study() {}
}

let people = new People();
//let result = people as Stu;// 类型断言 正确
let result = <Stu>people; // 也可以这么转 类型转换 正确

let stu = new Stu();
let result2 = stu as People; // 正确

// let result3 = <Stu2>people; //类型“People”缺少类型“Stu2”中的以下属性: student, study

/**
 * 1.2 类型守卫
 */

//  - 类型判断：`typeof`  => 无法获取一个自定义类或者构造函数的创建类型，可以使用instanceof或者 Object.prototype.toString.call 代替
//  - 属性或者方法判断：`in`
//  - 实例判断：`instanceof`
//  - 字面量相等判断：`==`, `===`, `!=`, `!==`

/**
 *  1.3 const 能被更改怎么办。
 */
const arr1 = [1, 2, 3, 'abc'];
arr1[0] = 3;

const arr = [1, 2, 3, 'abc'] as const; // type const = readonly [1, 2, 3, "abc"]
// arr[0] = 3 // 报错，因为他是只读属性

/**
 * 二：虽然不会输出undefined了，但是，还是有一个问题，某某人没有调用 isParser 就去调用了parserName，导致出现了undefined，而这个只有到线上了才会被发现。
 * 我们用 unknown 尝试去解决下问题
 */

const str3 = JSON.stringify({ name: 'baby' });
const parser3: unknown = JSON.parse(str);
// const value3 = parserName(parser3); // 这时候调用就会报错了。我们必须先判断parser3的类型
if (isParser(parser3)) {
  const value3 = parserName(parser3);
}

// 很显然 unknown 更符合我们的需求，因为any绕过了类型检查，而unknown需要判断类型后才能继续使用。

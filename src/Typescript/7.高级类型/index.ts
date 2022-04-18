// 常用高阶类型。
// type a = Partial<> //随便先写一个高级类型，点进去，就可以知道目前常用的高级类型有哪些
// 以下的高阶类型都是系统中拷贝过来的代码
// 了解这种很好的方法就是自己去模拟一些场景和数据
// 参考 https://blog.csdn.net/roamingcode/article/details/104111165

interface IUser {
  name?: string;
  age: number;
  department: string;
}

/**
 * 1.1 把所有参数变为可选的。
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// 这边有两个个关键字 keyof in，现在我们来模拟数据代入试

type P = Partial<IUser>;
// P的结果是
// type P = {
//   name?: string | undefined;
//   age?: number | undefined;
//   department?: string | undefined;
// }

// 先看下 keyof T 得到的结果是什么
type unionKey = keyof IUser;
// unionKey 结果如下，其获得了接口类型 IUser 中的所有属性名组成的联合类型
// type unionKey = "name" | "age" | "department"
// const a:unionKey = '1'  // 报错
// const a:unionKey = 'name'  // 正确

// P in keyof T 就是遍历 P in unionKey
// 得到的结果大致是  {name?: IUser[name],age?:IUser[age],department?:IUser[department]}

/**
 * 1.2 把所有参数变为必填的
 */

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type RequiredUser = Required<IUser>;
// const r:RequiredUser = {}; // 报错
// -? 这个符号我只在这块地方看到过,其他地方的应用有看到的补充下。

/**
 * 1.3 把所有参数变为必填的
 */
// 加了只读
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * 1.4 选择需要的。
 */

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type pickType = Pick<IUser, 'name'>;
type pickType2 = Pick<IUser, 'name' | 'age'>;
// 1. 还是一样，把数据代入
// type Pick<IUser, K extends keyof IUser> = {
//   [P in K]: IUser[P];
// };

type keyofUser = keyof IUser;
// K extends keyof IUser => 表示泛型约束 type pickType = Pick<IUser,"depart">; 这样就不行，因为depart不在这三个字符串中 => "name" extends "name" | "age" | "department"

// type Pick<IUser, 'name' | "age" extends keyof "name" | "age" | "department"> = {
//   [P in K]: IUser[P]; 这样子结果就很明显了，遍历 'name' | "age"，值为 IUser['name'] IUser['age']
// };

/**
 * 1.5 定义一个对象的 key 和 value 类型
 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type recordType = Record<'name', IUser>;
type recordType2 = Record<'name' | 'age', number>;
// => 等于
// type recordType2 = {
//   name: number;
//   age: number;
// }
// 也就是说，第一个值确定你的 key，第二个值确定value的类型。
// 值得注意的是K 是受到泛型约束的 K extends keyof any => 相当于 K extends string | number | symbol。为什么相当于，因为。挪上去的时候就是这么现实的，TS规定的

/**
 * 1.6 排除条件成立的类型，保留不符合泛型约束条件的类型，直白点就是 如果第一个参数受到第二个参数的泛型约束成立，就返回nerve，如果不成立，就返回第一个参数
 */
type Exclude<T, U> = T extends U ? never : T;

type result1 = Exclude<'name', keyof IUser>; // T extends U ? never : T; => 'name' extends "name" | "age" | "department" 符合，所以是never
type result2 = Exclude<'role' | 'age', keyof IUser>; // 'role'|"age" extends "name" | "age" | "department"  "role"不符合，保留，"age" 符合去掉

/**
 * 1.7 保留条件成立的类型，去掉不符合泛型约束条件的类型。 和 Exclude 有点像。
 */
type Extract<T, U> = T extends U ? T : never;

type result3 = Extract<'name', keyof IUser>; // T extends U ? never : T; => 'name' extends "name" | "age" | "department" 符合，所以是never
type result4 = Extract<'role' | 'age', keyof IUser>; // 'role'|"age" extends "name" | "age" | "department"  "age"符合，保留，"role" 符合去掉

/**
 * 1.8 去掉不想要的条件。
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type result5 = Omit<IUser, 'name'>;
// type result5 = {
//   age: number;
//   department: string;
// }
// Omit如果是自己实现，是有难度的，有兴趣的可以试试
// 一样的，把参数代入  Pick<T, Exclude<keyof T, K>>; => Pick<IUser, Exclude<keyof IUser, 'name'>>;
type result51 = Exclude<keyof IUser, 'name'>; // 去掉 "name" | "age" | "department" 符合 name 的条件 =》 "age" | "department"

// 按照1.4 选择需要的。
type result52 = Pick<IUser, 'age' | 'department'>;
// 结果为
// type result52 = {
//   age: number;
//   department: string;
// }

/**
 * 1.9 去掉null | undefined
 */
type NonNullable<T> = T extends null | undefined ? never : T;

interface Stuff {
  foo: number | null;
  bar: string | null;
}

type NonTest = NonNullable<number | null | undefined>;

// case2
let stuff: Stuff;
function isNonNullable<T>(a: T): a is NonNullable<T> {
  return a !== null;
}
function getStuff(): Stuff;
function getStuff<K extends keyof Stuff>(key: K): NonNullable<Stuff[K]>;
function getStuff<K extends keyof Stuff>(key?: K): Stuff | NonNullable<Stuff[K]> {
  if (key == null) return stuff;

  const value = stuff?.[key];
  if (isNonNullable(value)) {
    return value;
  }
  throw new Error(`${key} is null`);
}

const myStuff = getStuff('foo');

/**
 * 2.0 获取函数参数类型
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

type getParams = (baby: string) => never;

type result7 = Parameters<getParams>;
// => T extends (...args: infer P) => any ? P : never; => (baby:string) => never     extends      (...args: infer P) => any    ? P : never;
// 所以 ...args 就是 [baby:string] 继承关系成立，所以返回  baby

/**
 * 2.1 获取类参数类型 在编辑器中查看，codesand 会报错
 */

// type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (
//   ...args: infer P
// ) => any
//   ? P
//   : never;

class Son {
  constructor(baby: string) {}
}

type result8 = ConstructorParameters<typeof Son>;

/**
 * 2.2 获取函数返回值类型
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

type getParams2 = (baby: string) => string;

type result9 = ReturnType<getParams>;
type result10 = ReturnType<getParams2>; // string

/**
 * 2.3 获取类返回值类型 在编辑器中查看，codesand 会报错
 */
// type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (
//   ...args: any
// ) => infer R
//   ? R
//   : any;

type result11 = InstanceType<typeof Son>;

const resutt11Test = new Son('1');

/**
 * 2.4 不常用的大小写转换
 */
// 字符串大小写，一般不会使用到
// intrinsic是内置关键字。
/**
 * Convert string literal type to uppercase
 */
type Uppercase<S extends string> = intrinsic;

/**
 * Convert string literal type to lowercase
 */
type Lowercase<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to uppercase
 */
type Capitalize<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to lowercase
 */
type Uncapitalize<S extends string> = intrinsic;

type Cases<T extends string> =
  `${Uppercase<T>} ${Lowercase<T>} ${Capitalize<T>} ${Uncapitalize<T>}`;
type T11 = Cases<'bar'>; // type T11 = "BAR bar Bar bar"

export default {};

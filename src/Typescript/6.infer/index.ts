// infer 表示在extends 条件语句中以占位符出现用来修饰数据类型的关键字，被修饰的数据类型等到使用的时候才推断出来
// infer 通常出现在  extends 条件语句后的函数类型的参数类型位置上
// infer 出现在 extends 条件语句后的函数类型的返回值类型上
// infer 出现在类型的泛型具体化类型上
// 最常用的场景是用来解包，比如获取一个没有被export 出来的 interface

// 定义一个类型，这里先把 infer P 看成一个占位符。
type InferType<T> = T extends (param: infer P) => any ? P : T;

/**
 * demo1
 */
interface Customer {
  customerName: string;
  buyMoney: number;
}

type customerFuncType = (customer: Customer) => void;

// 我们这里假设上面的Customer 类型被作者藏起来，很吝啬。但是我们在某种场景下需要用到，好在作者心机不够导出了 customerFuncType。
type result = InferType<customerFuncType>; //result的类型就是 Customer
// 把公式套进去，此时相当于 type InferType<T> = T extends (param: infer Customer) => any ? Customer : T;
// 推断了 InferType

// 注意：下面会报错：仅条件类型的 "extends" 子句中才允许 "infer" 声明
// type interType2 = (params:infer P) => any;

// demo2
// 尝试解包
type ref = React.MutableRefObject<string | undefined>;
// 这个时候我们想获取 string|undefined 需要怎么做?
// 第一步 写个 T extends (ref=React.MutableRefObject<string | undefined>)
// 第二步 把你要推断的类型改成 infer P => T extends (ref=React.MutableRefObject<infer P>)
// 第三步 返回你需要的理性 infer P => T extends (ref=React.MutableRefObject<infer P> ? P : never)
// 第四步 传入T，也就是ref。得到结果
type infer2<T> = T extends React.MutableRefObject<infer P> ? P : never;

type result2 = infer2<ref>;
export {};

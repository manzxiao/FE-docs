// 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
// 参考 https://ts.xcatliu.com/advanced/generics.html
/**
 * 1.1
 */
// function createArray(length: number, value: any): Array<any> {
//   let result = [];
//   for (let i = 0; i < length; i++) {
//     result[i] = value;
//   }
//   return result;
// }

// createArray(3, 'x'); // ['x', 'x', 'x']

/**
 * 1.2
 */
// 我们预期的是，数组中每一项都应该是输入的 value 的类型。
// function createArray<T>(length: number, value: T): Array<T> {
//   let result: T[] = [];
//   for (let i = 0; i < length; i++) {
//     result[i] = value;
//   }
//   return result;
// }

// createArray<string>(3, 'x'); // ['x', 'x', 'x']

/**
 * 1.3 泛型约束
 */
// 我们预期的是，数组中每一项都应该是输入的 value 的类型。
// 并且 value 是 object类型
function createArray<T extends object>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

interface obj {
  a: string;
}

createArray<obj>(3, { a: '1' }); // ['x', 'x', 'x']

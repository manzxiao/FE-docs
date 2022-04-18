// 一个再任何位置都不能被实例化的类就是抽象类
// 花是抽象类，玫瑰花是具体的类
// 人是抽象类，中国人是具体的类

abstract class People {
  public name!: string;
  public eat() {}
  abstract howEat(): void; // 抽象方法， 没有方法体，不需要任何具体的实现
  constructor() {}
}

// 无法实例化 new People()
// class Handsome extends People{}

class Handsome extends People {
  howEat(): void {
    //   需要实现父类的抽象方法
    throw new Error('Method not implemented.');
  }
}

interface MyMouseEvent {
  M(e: any): void;
  M2(e: any): void;
}

// // 此时我们必须实现M 和 M2，我只想实现M 怎么办，写个适配器就好了
// class MouseListener implements MyMouseEvent {} //这里会要求我们实现两个接口函数

abstract class Adapt implements MyMouseEvent {
  M(e: any): void {
    throw new Error('Method not implemented.');
  }
  abstract M2(e: any): void;
}

class MouseListener extends Adapt {
  M2(e: any): void {
    throw new Error('Method not implemented.');
  }
}

export {};

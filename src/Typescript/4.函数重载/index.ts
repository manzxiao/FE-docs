type MessageType = 'image' | 'audio' | string;

type Message = {
  id: number;
  type: MessageType;
  sendMessage: string;
};

let messages: Message[] = [
  {
    id: 1,
    type: 'image',
    sendMessage: '你好啊，约吗 1',
  },
  {
    id: 2,
    type: 'image',
    sendMessage: '不约 2',
  },
  {
    id: 3,
    type: 'audio',
    sendMessage: 'hello world 3',
  },
  {
    id: 4,
    type: 'xx',
    sendMessage: 'hello honey 4',
  },
  {
    id: 5,
    type: 'audio',
    sendMessage: '不约 5',
  },
];
/**
 * 1.习惯写法
 */
// function getMessage(value: number | MessageType): Message | undefined | Message[] {
//   if (typeof value === 'number') {
//     return messages.find((msg) => value === msg.id);
//   } else {
//     return messages.filter((msg) => value === msg.type);
//   }
// }

// console.info(getMessage('audio'));
// console.info(getMessage(1));

// // 2. 看起来没有什么问题，其实这里是非常适合用函数重载的。

// // 我们尝试想要得到一个值
// const msg = getMessage(1);
// // 这时候我们通过肉眼可以看到 这个 message 是找到 { id: 1, type: 'image', sendMessage: '你好啊，约吗 1' } 这个结果的。
// // 但是当我们 用 msg. 的时候是无法推导得到结果的。

/**
 * 2. 更优写法
 */
// 函数重载规则：
// - 一个实现签名+一个或者多个重载签名合成
// - 只能调用重载签名，不能调用实现签名。
// - 实现签名会兼容所有的类型。

// function getMessage(value: number): Message;
// function getMessage(value: MessageType): Message[];
// function getMessage(value: number | MessageType): Message | undefined | Message[] {
//     if (typeof value === "number") {
//         return messages.find(msg => value === msg.id);
//     } else {
//         return messages.filter(msg => value === msg.type);
//     }
// }

// const msgs = getMessage("image");
// const msgs2 = getMessage(1);

/**
 * 3. 想要再新增一个参数呢
 */

function getMessage(value: number): Message;
function getMessage(value: MessageType, limit: number): Message[];
// 可以赋予一个默认值
function getMessage(value: number | MessageType, limit: any = 1): Message | undefined | Message[] {
  if (typeof value === 'number') {
    return messages.find((msg) => value === msg.id);
  } else {
    return messages.filter((msg) => value === msg.type).splice(0, limit);
  }
}

const msgs = getMessage('image', 2);
const msgs2 = getMessage(1);

export {};

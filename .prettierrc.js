module.exports = {
  // 箭头函数只有一个参数的时候可以忽略括号
  arrowParens: "avoid",
  // 括号内部不要出现空格
  bracketSpacing: true,
  // 行结束符使用 Unix 格式（windows下lf会报错）
  endOfLine: 'crlf',
  // true: 把 > 放在最后一行末尾，而不是单独起一行
  bracketSameLine: false,
  // 行宽
  printWidth: 100,
  // 换行方式
  proseWrap: 'preserve',
  // 分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 缩进
  tabWidth: 2,
  // 使用 tab 缩进
  useTabs: false,
  // 后置逗号，多行对象、数组在最后一行增加逗号
  trailingComma: 'es5',
  // 指定解析器
  parser: 'typescript',
}

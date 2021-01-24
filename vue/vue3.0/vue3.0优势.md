# 性能比vue2.0快了几乎两倍
- 利用proxy代替了defineproperty
- tree shaking（按需编译代码）
- composition api(类似hooks未来) 可以把传入但没有使用的代码去掉打包
- ts support（用typescript重写 便于类型检查）
- custom renderer api(自定义渲染)
- reactivity 做数据响应式的模块
- Compile-dom 依赖于Compile-core 是做代码编译的，将template编译成render函数
  1. baseParse函数将template解析成抽象语法树ast
  2. 根据ast用transform模块转化(静态标记等优化,处理v-on，v-if等等优化)
  3. generate函数 生成代码字符串 string
  4. 使用new Function 把string转换成可执行函数
  5. 这个函数执行后返回vdom（含静态标记） 
- runtime-dom 依赖于runtime-core 处理vue在挂载的时候的生命周期和特殊用法的逻辑 runtime-core会用到reactivity的响应式逻辑
- vue2.0采用的optionAPI，所有的配置项都需要被打包和引入，很难去做tree-shaking




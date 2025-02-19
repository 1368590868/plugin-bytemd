## Bytemd Rough Notation 插件
这个插件将 rough-notation 库与 Bytemd（一个 Markdown 编辑器）集成。它为渲染出来的 Markdown 内容中的特定 HTML 元素提供可视化的注释效果，并且可以自定义注释样式。此外，插件还包括一个自动为代码块添加“复制代码”按钮的功能。

## 特性
集成 Rough Notation：为 Markdown 中的特定 HTML 元素（如 <strong>、<blockquote>）添加可定制的标注效果，包括框、突出显示、划线等样式。
可自定义注释：你可以定义自定义的注释规则，包括指定哪些 HTML 标签需要被注释以及注释的样式选项。
复制代码按钮：为每个代码块自动添加“复制”按钮，方便用户一键复制代码内容到剪贴板。
## 安装
你可以通过 npm 或 pnpm 安装该插件：

```bash
npm install bytemd-plugin-rough-notation
```
或者

```bash
pnpm add bytemd-plugin-rough-notation
```
## 使用方法
### 基本使用
使用该插件时，你需要导入并将其添加到 Bytemd 编辑器的插件列表中：

```javascript
import { roughNotationPlugin, pluginCopyCode } from 'bytemd-plugin-rough-notation';

const editor = new Bytemd({
  plugins: [
    roughNotationPlugin(),  // 默认的标注规则
    pluginCopyCode()        // 复制代码按钮功能
  ]
});
```
这样会启用注释效果和复制代码功能。

### 自定义注释
如果你希望自定义注释的规则，可以传入自定义的注释配置。例如：

```javascript
import { roughNotationPlugin } from 'bytemd-plugin-rough-notation';

const customAnnotations = [
  {
    tag: 'h1',
    option: {
      type: 'underline',
      color: '#00f',
      animate: true,
      animationDuration: 1200,
      strokeWidth: 2
    }
  },
  {
    tag: 'p',
    option: {
      type: 'highlight',
      color: '#ff0',
      animate: true,
      animationDuration: 800,
      strokeWidth: 1
    }
  }
];

const editor = new Bytemd({
  plugins: [
    roughNotationPlugin(customAnnotations),
    pluginCopyCode()
  ]
});
```
### 插件配置
* AnnotationConfig：定义每个注释的配置。
* tag：需要标注的 HTML 元素（例如 strong、blockquote、h1 等）。
* option：rough-notation 的配置选项，定义标注效果的样式。包括 type、color、animate、strokeWidth 等选项。
### 默认标注规则
插件内置了一些默认的标注规则，针对常见的 HTML 标签（如 strong、blockquote、ul、ol、del 等）。你可以通过自定义配置来覆盖这些默认规则。

### Rough Notation 类型
rough-notation 支持以下几种注释类型：

* box：在元素周围绘制一个框。
* highlight：高亮元素的背景。
* bracket：在元素左右添加括号。
* crossed-off：对元素进行划线处理。
复制代码按钮
* pluginCopyCode 函数会自动为每个代码块（<pre><code>）添加一个“复制”按钮。点击按钮后，代码块的内容会被复制到剪贴板中。

## 示例
以下是一个 Markdown 示例，展示了标注效果和复制代码按钮的显示：

```markdown
# 带标注的 Markdown

## 示例 1: **加粗文本**
这段文本是 **加粗** 的，并且会显示一个框。

## 示例 2: 引用块
> 这是一段引用文本，会被高亮并添加括号。

## 示例 3: 代码块
```

```javascript
console.log("Hello, World!");
```


## 自定义样式

你可以通过 CSS 自定义注释的外观。插件会将标注样式应用到 `rough-notation` 元素，你可以根据需要调整 CSS。

示例（在 `index.css` 中）：

```css
.copy-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

.copy-btn:hover {
  background-color: #45a049;
}
许可
MIT 许可，具体内容请见 LICENSE 文件。
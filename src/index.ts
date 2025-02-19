import type { BytemdPlugin } from "bytemd";
import { annotate, annotationGroup } from "rough-notation";
import "./index.css";

// 定义注释配置的类型
interface AnnotationConfig {
  tag: string; // 需要标注的 HTML 标签
  option: Parameters<typeof annotate>[1]; // rough-notation 选项
}

// 默认的标注规则
const defaultAnnotations: AnnotationConfig[] = [
  {
    tag: "strong",
    option: {
      type: "box",
      color: "#4a148c",
      animate: true,
      animationDuration: 1000,
      strokeWidth: 1,
    },
  },
  {
    tag: "blockquote",
    option: {
      type: "highlight",
      brackets: ["left", "right"],
      color: "#C4C2C3",
      multiline: true,
      animate: true,
      animationDuration: 1000,
      strokeWidth: 1,
    },
  },
  {
    tag: "ol, ul",
    option: {
      type: "bracket",
      color: "#B36C4C",
      animate: true,
      animationDuration: 1000,
      strokeWidth: 4,
      brackets: ["left", "right"],
    },
  },
  {
    tag: "del",
    option: {
      type: "crossed-off",
      color: "#b71c1c",
      animate: true,
      animationDuration: 1000,
      strokeWidth: 1,
    },
  },
  {
    tag: "em",
    option: {
      type: "highlight",
      color: "#ffd54f",
      animate: true,
      animationDuration: 1000,
      strokeWidth: 1,
    },
  },
];

export function roughNotationPlugin(
  customAnnotations: AnnotationConfig[] = []
): BytemdPlugin {
  // 如果传入了自定义配置，则覆盖默认配置
  const finalAnnotations =
    customAnnotations.length > 0 ? customAnnotations : defaultAnnotations;

  return {
    viewerEffect({ markdownBody }) {
      // 创建标注
      const createAnnotations = (
        selector: string,
        options: Parameters<typeof annotate>[1]
      ) => {
        const elements = markdownBody.querySelectorAll(selector);
        const annotations = Array.from(elements)
          .filter((el): el is HTMLElement => el instanceof HTMLElement)
          .map((el) => annotate(el, options));
        const group = annotationGroup(annotations);
        group.show();
      };

      // 遍历最终的标注规则，应用到 Markdown 渲染结果
      finalAnnotations.forEach(({ tag, option }) => {
        createAnnotations(tag, option);
      });
    },
  };
}

export function pluginCopyCode(): BytemdPlugin {
  return {
    viewerEffect({ markdownBody }) {
      const addCopyButtons = () => {
        markdownBody.querySelectorAll("pre code").forEach((codeBlock) => {
          const pre = codeBlock.parentElement;
          if (!pre) return;

          pre.style.position = "relative";

          if (pre.querySelector(".copy-btn")) return;

          const button = document.createElement("button");
          button.className = "copy-btn";
          button.innerText = "📋 复制";
          button.onclick = async () => {
            try {
              await navigator.clipboard.writeText(codeBlock.textContent || "");
              button.innerText = "✅ 复制成功";
              setTimeout(() => (button.innerText = "📋 复制"), 1500);
            } catch (err) {
              console.error("复制失败", err);
            }
          };

          pre.appendChild(button);
        });
      };

      addCopyButtons();
    },
  };
}

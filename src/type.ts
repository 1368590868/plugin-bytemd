import { annotate } from 'rough-notation';

/**
 * 单个标注的配置类型
 */
export interface AnnotationConfig {
  tag: string; // 需要标注的 HTML 标签，如 'strong', 'em'
  option: Parameters<typeof annotate>[1]; // 取 annotate 函数的第二个参数类型
}

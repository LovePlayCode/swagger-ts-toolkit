/**
 * 驼峰命名转换函数
 */
export function camelCase(str: string): string {
  return str.replace(/(?:^|_)(\w)/g, (match, letter) => letter.toUpperCase());
}

/**
 * 转换为小驼峰命名
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/[_\s]+(.)?/g, (_, letter) => letter ? letter.toUpperCase() : '')
    .replace(/^[A-Z]/, (letter) => letter.toLowerCase());
}

/**
 * 转换为帕斯卡命名
 */
export function toPascalCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
      return word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

/**
 * 转换为短横线命名
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * 转换为下划线命名
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .toLowerCase();
}

/**
 * 清理和格式化注释文本
 */
export function formatComment(text: string): string {
  return text
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 转义模板字符串中的特殊字符
 */
export function escapeTemplateString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
}
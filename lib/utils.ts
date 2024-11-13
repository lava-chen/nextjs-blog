import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};
export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export function generateTOCFromMarkdown(markdownContent: string) {
  try {
    // 定义正则表达式来匹配标题
    const headingRegex = /^(#{1,6})\s+(.*)/gm;
    const toc = [];

    // 定义一个变量来跟踪当前的深度
    const depthMap = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 };

    let match;
    while ((match = headingRegex.exec(markdownContent)) !== null) {
      const depth = match[1].length; // 标题级别
      const title = match[2].trim(); // 标题内容
      const url = `#${title.toLowerCase().replace(/\s+/g, "-")}`; // 生成 URL

      toc.push({
        value: title,
        url: url,
        depth: depthMap[depth as 1 | 2 | 3 | 4 | 5 | 6] || 1,
      });
    }

    return toc;
  } catch (error) {
    console.error("读取文件失败:", error);
  }
}

export function calculateReadingTime(markdownContent: string) {
  // 计算 Markdown 内容中的单词数量
  const words = markdownContent
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  // 假设平均阅读速度为每分钟 200 个单词
  const wordsPerMinute = 200;
  const minutes = words / wordsPerMinute; // 计算所需分钟
  const time = Math.round(minutes * 60 * 1000); // 将时间转换为毫秒
  const readingTime = {
    text: `${Math.ceil(minutes)} min read`, // 取整分钟
    minutes: Number(minutes.toFixed(2)), // 保留两位小数
    time: time,
    words: words,
  };
  return readingTime;
}

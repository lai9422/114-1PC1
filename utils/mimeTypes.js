// utils/mimeTypes.js

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.ejs': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

/**
 * 根據副檔名回傳對應的 MIME 類型
 * @param {string} extname - 副檔名（包含點，例如 '.css'）
 * @returns {string} MIME 類型，預設為 'text/plain'
 */
export function getContentType(extname) {
  return contentTypes[extname] || 'text/plain';
}
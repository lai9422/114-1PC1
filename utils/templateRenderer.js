// utils/templateRenderer.js

import { readFile } from 'fs';
import { render } from 'ejs';

/**
 * 渲染 EJS 模板
 * @param {object} res - HTTP response 物件
 * @param {string} filePath - EJS 檔案路徑（相對於專案根目錄）
 * @param {object} [data={}] - 傳入模板的資料
 */
export function renderTemplate(res, filePath, data = {}) {
  readFile('.' + filePath, 'utf8', (err, template) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`錯誤：無法讀取模板文件 - ${err.message}`);
      return;
    }

    try {
      const html = render(template, data);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    } catch (renderErr) {
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`模板渲染錯誤：${err.message}`);
    }
  });
}

/**
 * 渲染 404 頁面（固定為 index3.ejs）
 * @param {object} res - HTTP response 物件
 */
export function render404(res) {
  renderTemplate(res, '/index3.ejs', { message: '頁面不存在' });
}
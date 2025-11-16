// utils/templateRenderer.js

import { readFile } from 'fs'; // Node.js 檔案系統模組
import { render } from 'ejs';   // EJS 模板引擎

/**
 * 渲染 EJS 模板
 * @param {object} res - HTTP response 物件
 * @param {string} filePath - EJS 檔案路徑（相對於專案根目錄）
 * @param {object} [data={}] - 傳入模板的資料
 */
export function renderTemplate(res, filePath, data = {}) { // 默認資料為空物件
  readFile('.' + filePath, 'utf8', (err, template) => { // 讀取 EJS 模板文件
    if (err) { // 讀取錯誤
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' }); // 伺服器錯誤
      res.end(`錯誤：無法讀取模板文件 - ${err.message}`); // 回傳錯誤訊息
      return;
    }

    try { // 嘗試渲染模板
      const html = render(template, data); // 使用 EJS 渲染模板
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); // 成功回應
      res.end(html);  // 回傳渲染後的 HTML
    } catch (renderErr) {   // 渲染錯誤
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' }); // 伺服器錯誤
      res.end(`模板渲染錯誤：${err.message}`); // 回傳錯誤訊息
    }
  });
}

/**
 * 渲染 404 頁面（固定為 index3.ejs）
 * @param {object} res - HTTP response 物件
 */
export function render404(res) { // 使用 renderTemplate 函式渲染 404 頁面
  renderTemplate(res, '/index3.ejs', { message: '頁面不存在' }); // 傳入錯誤訊息
}
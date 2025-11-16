// 2b-refactored.js

import { createServer } from 'http'; // Node.js HTTP 模組
import { renderTemplate } from './utils/templateRenderer.js'; // 正確匯入 renderTemplate
import { handleStaticFile } from './utils/staticFileHandler.js'; // 正確匯入 handleStaticFile

createServer((req, res) => { // 建立 HTTP 伺服器
  let filePath = ''; // 用於存放要渲染的模板路徑
  let data = {}; // 用於存放傳遞給模板的資料

  // 路由邏輯：使用 switch 處理明確路徑
  switch (req.url) { // 根據請求的 URL 進行路由處理
    case '/': // 根路徑
      filePath = '/index.ejs'; // 指定要渲染的 EJS 模板路徑
      renderTemplate(res, filePath, data); // 呼叫渲染函式並傳遞資料
      return;

    case '/calculator': // 計算機路徑
      filePath = '/index2.ejs'; // 指定計算機模板路徑
      renderTemplate(res, filePath); // 呼叫渲染函式（無需額外資料）
      return;

    default: // 預設情況
      // 其他路徑 → 視為靜態文件
      handleStaticFile(res, req.url); // 呼叫靜態文件處理函式
      return;
  }
}).listen(3000, () => {
  // 在終端機（控制台）輸出訊息，告知開發者伺服器已啟動
  // 使用者可以透過瀏覽器訪問 http://localhost:3000 來查看網站
  console.log('伺服器已啟動！請訪問 http://localhost:3000'); 
  console.log('可用路由：');
  console.log('  - http://localhost:3000');
  console.log('  - http://localhost:3000/calculator');
  console.log('  - 其他路徑將顯示 404 錯誤頁面');
});
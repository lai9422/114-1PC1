// 2b-refactored.js

import { createServer } from 'http';
import { renderTemplate } from './utils/templateRenderer.js';
import { handleStaticFile } from './utils/staticFileHandler.js';

createServer((req, res) => {
  let filePath = '';
  let data = {};

  // 路由邏輯：使用 switch 處理明確路徑
  switch (req.url) {
    case '/':
      filePath = '/index.ejs';
      renderTemplate(res, filePath, data);
      return;

    case '/calculator':
      filePath = '/index2.ejs';
      renderTemplate(res, filePath);
      return;

    default:
      // 其他路徑 → 視為靜態文件
      handleStaticFile(res, req.url);
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
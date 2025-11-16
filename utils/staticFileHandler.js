// utils/staticFileHandler.js

import { readFile } from 'fs'; // Node.js 檔案系統模組
import { extname } from 'path'; // Node.js 路徑模組
import { getContentType } from './mimeTypes.js'; // 正確匯入  getContentType
import { render404 } from './templateRenderer.js';  // 正確匯入 render404

export function handleStaticFile(res, filePath) { // 處理靜態檔案請求
  const fullPath = '.' + filePath; // 假設靜態檔案位於專案根目錄下
  const ext = extname(filePath); // 取得檔案副檔名
  const contentType = getContentType(ext); // 使用匯入的 getContentType 函式取得 MIME 類型

  readFile(fullPath, (err, content) => { // 讀取檔案內容
    if (err) { // 發生錯誤（例如檔案不存在）
      render404(res);  // 直接使用匯入的 render404
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType }); // 設定成功回應標頭
    res.end(content); // 回傳檔案內容
  });
}
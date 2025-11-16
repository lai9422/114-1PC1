// utils/staticFileHandler.js

import { readFile } from 'fs';
import { extname } from 'path';
import { getContentType } from './mimeTypes.js';
import { render404 } from './templateRenderer.js';  // 正確匯入

export function handleStaticFile(res, filePath) {
  const fullPath = '.' + filePath;
  const ext = extname(filePath);
  const contentType = getContentType(ext);

  readFile(fullPath, (err, content) => {
    if (err) {
      render404(res);  // 直接使用匯入的 render404
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}
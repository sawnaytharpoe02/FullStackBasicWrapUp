import http, { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import { Menu, MenuCategory } from "./types";
import { nanoid } from "nanoid";

let menus: Menu[] = [];
const menuCategory: MenuCategory[] = [];

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const { url, method } = req;
    if (url === '/') {
      const data = fs.readFileSync('index.html');
      res.write(data);
      res.end();
    } else if (url === '/script.js') {
      const data = fs.readFileSync('script.js');
      res.write(data);
      res.end();
    } else if (url.includes('/menu')) {
      switch (method) {
        case 'GET':
          res.write(JSON.stringify(menus));
          res.end();
          break;
        case 'POST':
          let data = '';
          req.on('data', (chunk) => {
            data += chunk;
          });
          req.on('end', () => {
            const menu = JSON.parse(data);
            menu.id = nanoid();
            menus.push(menu);
            res.write(JSON.stringify(menus));
            res.end();
          });
          break;
        case 'PUT':
          break;
        case 'DELETE':
          let id = url.split('/menu?id=')[1];
          menus = menus.filter((menu) => menu.id !== id);
          res.write(JSON.stringify(menus));
          res.end();
          break;
      }
    } else if (url === 'menu-category') {
      switch (method) {
        case 'GET':
          res.write(JSON.stringify(menuCategory));
          res.end();
          break;
        case 'POST':
          break;
        case 'PUT':
          break;
        case 'DELETE':
          break;
      }
    }
  }
);

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

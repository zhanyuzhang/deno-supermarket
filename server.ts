import { Application, Context } from "./deps.ts";
import {
  createGood,
  fetchAllGoods,
  fetchOneGood,
  updateGood,
  deleteGood,
} from "./controllers/goods.ts";

const app = new Application();

app
  .static('/pages', './public') // 静态资源

  // 以下是5个api
  .get("/api/goods", fetchAllGoods)
  .post("/api/goods", createGood)
  .get("/api/goods/:name", fetchOneGood)
  .put("/api/goods/:id", updateGood)
  .delete("/api/goods/:id", deleteGood)

  .start({ port: 8000 });
  console.log('listening on port 8000')
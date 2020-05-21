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

  // 以下是增删查改的api
  .get("/api/goods", fetchAllGoods)
  .post("/api/goods", createGood)
  .get("/api/goods/:name", fetchOneGood)
  .put("/api/goods/:id", updateGood)
  .delete("/api/goods/:id", deleteGood)

  .start({ port: 8000 });
  console.log('start successfully. you can visit it on http://localhost:8000/pages/')

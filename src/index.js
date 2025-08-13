import express from "express";
import morgan from "morgan";
import routerAuth from "./routes/auth.routes.js";
import routerTask from "./routes/tareas.routes.js";
import ConectMDB from "./db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//settings
app.set("port", process.env.PORT || 3000);
//middlewares
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", routerAuth);
app.use("/api", routerTask);
ConectMDB();
app.listen(app.get("port"), () => {
  console.log(`servidor ejecutandose en puerto ${app.get("port")}`);
});

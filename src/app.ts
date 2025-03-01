// import { config } from "dotenv";
// config();
// import express, { Express } from "express";
// import cors from "cors";
// import "reflect-metadata";
// import router from "./api/routes/index.routes";
// import { supabase } from "./config/supabaseClient";

// export default (): Express => {
//   const app = express();

//   app.set("port", process.env.PORT || 5001);
//   app.use(express.json());
//   app.use(
//     cors({
//       origin: "*",
//       methods: ["OPTIONS", "POST", "GET"],
//     }),
//   );

//   app.get("/teste-db", async (req, res) => {
//     const { data, error } = await supabase.from("users").select("*");

//     console.log("🚀 ~ app.get ~ error:", error);
//     console.log("🚀 ~ app.get ~ data:", data);
//     if (error) return res.status(500).json({ error: error.message });

//     res.json(data);
//   });

//   router(app);

//   return app;
// };
import { config } from "dotenv";
config();

import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import "reflect-metadata";
import compression from "compression";
import router from "./api/routes/index.routes";
import { supabase } from "./config/supabaseClient";
import { errorHandler, logRequests } from "./api/middleware/errorHandler";

export const createApp = (): Express => {
  const app = express();

  app.set("port", process.env.PORT || 5001);
  app.use(express.json());
  app.use(compression()); // 🚀 Compacta respostas HTTP para otimizar a rede
  app.use(logRequests);

  app.use(
    cors({
      origin: "*",
      methods: ["OPTIONS", "POST", "GET"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  app.get(
    "/teste-db",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { data, error } = await supabase.from("users").select("*");

        if (error) throw new Error(error.message);

        console.log("📌 [DB Response]:", data);
        res.json(data);
      } catch (err) {
        next(err);
      }
    },
  );

  router(app);

  app.use(errorHandler);

  return app;
};

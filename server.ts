import { createApp } from "./src/app";
import PostgresStrategy from "./src/database/strategies/postgres/postgres.strategy";

const app = createApp();

PostgresStrategy.connect()
  .then(() => {
    const port = app.get("port");
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1);
  });

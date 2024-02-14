import app from "./src/app";

const PORT = process.env.PORT || "5001";

app.listen(PORT, () => {
  console.log("🚀 [server]: listening on port " + PORT);
});
import server from "./src/app";

const app = server()
const port = app.get('port')

app.listen(port, () => {
  console.log("🚀 [server]: listening on port " + port);
});









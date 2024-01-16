// 애플리케이션 진입점
require("dotenv").config();
const { startServer } = require("./server");

const port = process.env.PORT || 8080;

startServer(port)
  .then(() => {
    console.log(`Server running on port ${port}`);
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
  });

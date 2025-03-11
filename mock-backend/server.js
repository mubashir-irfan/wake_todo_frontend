const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Function to update counts in db.json
const updateCounts = () => {
  const dbFilePath = path.join(__dirname, "db.json");
  const db = JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));

  const uncompleted = db.tasks.filter(
    (task) => !task.completed && !task.deleted
  ).length;
  const completed = db.tasks.filter(
    (task) => task.completed && !task.deleted
  ).length;
  const deleted = db.tasks.filter((task) => task.deleted).length;

  db.counts = { uncompleted, completed, deleted };

  fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2), "utf-8");
};

// Middleware to update counts on task changes
server.use((req, res, next) => {
  // Convert DELETE requests to PATCH requests that set deleted=true
  if (req.method === "DELETE" && req.url.startsWith("/tasks/")) {
    req.method = "PATCH";
    req.body = { deleted: true };
  }

  if (
    ["POST", "PUT", "PATCH", "DELETE"].includes(req.method) &&
    req.url.startsWith("/tasks")
  ) {
    setTimeout(updateCounts, 100);
  }
  next();
});

server.use(router);

server.listen(3003, () => {
  console.log("JSON Server is running on port 3003");
});

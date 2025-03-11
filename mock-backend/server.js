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
  console.log('updating counts', { uncompleted, completed, deleted })
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

// Middleware to handle pagination
server.use((req, res, next) => {
  if (req.method === "GET" && req.url.startsWith("/tasks")) {
    const tasks = router.db.get("tasks").value();
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedTasks = tasks.slice(startIndex, endIndex);
    const totalItems = tasks.length;
    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = endIndex < totalItems;

    res.json({
      tasks: paginatedTasks,
      pagination: {
        totalItems,
        totalPages,
        pageSize: limit,
        currentPage: page,
        hasNextPage,
      },
    });
  } else {
    next();
  }
});

server.use(router);

server.listen(3003, () => {
  console.log("JSON Server is running on port 3003");
});
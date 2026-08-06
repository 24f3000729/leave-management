const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so the front-end Next.js app can connect
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Main APIs
app.use("/api/manager", routes);

// Base route for sanity checks
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Leave Management API Server",
    endpoints: {
      dashboardStats: "/api/manager/dashboard-stats?from=YYYY-MM-DD&to=YYYY-MM-DD",
      employees: "/api/manager/employees",
    },
  });
});

app.listen(PORT, () => {
  console.log(`[Backend Server] Running on http://localhost:${PORT}`);
});

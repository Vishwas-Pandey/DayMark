require("dotenv").config();
const connectDB = require("./src/config/db");
const startCronJobs = require("./src/jobs/cronJobs");
const app = require("./src/app");

// Connect DB
connectDB();

// Start cron jobs
startCronJobs();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

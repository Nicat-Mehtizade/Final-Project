const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const userRouter = require("./routes/userRouter");
const commentRouter = require("./routes/commentRouter");
const activityRouter = require("./routes/activityRouter");
const authRouter=require("./routes/authRouter")
connectDB();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/comments", commentRouter);
app.use("/api/activity", activityRouter);
app.use("/api", authRouter)

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

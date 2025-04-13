const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const userRouter = require("./routes/userRouter");
const commentRouter = require("./routes/commentRouter");
const activityRouter = require("./routes/activityRouter");
const authRouter=require("./routes/authRouter")
const session = require("cookie-session");
const passport = require("passport");
const path=require("path")
const cookieParser = require("cookie-parser");

connectDB();
require("./config/passport")
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    name: "session",
    keys: [process.env.SESSION_SECRET || "secret"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRouter);
app.use("/api/comments", commentRouter);
app.use("/api/activity", activityRouter);
app.use("/api", authRouter)

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

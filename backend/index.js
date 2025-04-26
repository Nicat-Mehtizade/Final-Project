const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const userRouter = require("./routes/userRouter");
const commentRouter = require("./routes/commentRouter");
const activityRouter = require("./routes/activityRouter");
const authRouter=require("./routes/authRouter")
const likeRouter=require("./routes/likeRouter")
const basketRouter=require("./routes/basketRouter")
const seatRouter=require("./routes/seatRouter")
const session = require("express-session");
const passport = require("passport");
const passportRouter=require("./routes/passportRouter")
const passportConfig=require("./config/passport")
const path=require("path")
const cookieParser = require("cookie-parser");

connectDB();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
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
app.use("/api/seats", seatRouter)
app.use("/api/likes", likeRouter)
app.use("/api/basket", basketRouter)
app.use("/api", authRouter)
app.use("/api", passportRouter)

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

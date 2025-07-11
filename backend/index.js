process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const userRouter = require("./routes/userRouter");
const commentRouter = require("./routes/commentRouter");
const activityRouter = require("./routes/activityRouter");
const authRouter = require("./routes/authRouter");
const likeRouter = require("./routes/likeRouter");
const basketRouter = require("./routes/basketRouter");
const promoCodeRouter = require("./routes/promoCodeRouter");
const seatRouter = require("./routes/seatRouter");
const session = require("express-session");
const passport = require("passport");
const passportRouter = require("./routes/passportRouter");
const passportConfig = require("./config/passport");
const stripeRouter = require("./routes/stripeRouter");
const path = require("path");
const cookieParser = require("cookie-parser");
const http = require("http");
const { initSocket } = require("./config/socket");

connectDB();
dotenv.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);
initSocket(server);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRouter);
app.use("/api/comments", commentRouter);
app.use("/api/activity", activityRouter);
app.use("/api/seats", seatRouter);
app.use("/api/likes", likeRouter);
app.use("/api/basket", basketRouter);
app.use("/api/promo", promoCodeRouter);
app.use("/api", authRouter);
app.use("/api", passportRouter);
app.use("/api", stripeRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

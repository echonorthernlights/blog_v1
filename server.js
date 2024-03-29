require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/connectDB");
const corsOptions = require("./config/corsOptions");

const userRouter = require("./routes/userRoutes");
const articleRouter = require("./routes/articleRoutes");
const commentRouter = require("./routes/commentRoutes");
const likeRouter = require("./routes/likeRoutes");

const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

app.use(logger);

// cors policy middleware + configuration
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});*/

//Routes
app.use("/users", userRouter);
app.use("/articles", articleRouter);
app.use("/comments", commentRouter);
app.use("/like", likeRouter);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT} ....`);
  });
};
// error handler middleware
app.use(errorHandler);

start();

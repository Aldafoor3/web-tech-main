const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

PORT = process.env.PORT | 3000;
MONGO_URI = "mongodb+srv://webslingers:WEBSLINGERS4@cluster0.r4iia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const app = express();
dotenv.config();


app.use(express.json());
app.use(cors({
  origin:[
    "http://localhost:4200",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
}))

/* App-wide logging middleware:
Any request which is sent to the backend
is logged to the console. This happens on any request
anywhere in the app */
app.use((req, res, next) => {
  const {method, url, body} = req;
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}: ${method} request to ${url} with the JSON body ${JSON.stringify(body)} has been sent`)
  next();
})

const taskRoutes = require("./routes/task-routes")

app.use("/tasks", taskRoutes)



/* App-wide error handling middleware:
If a server-internal error occurs anywhere in the application,
the frontend recieves a HTTP 500 error status message
with the contents of the error */
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
})



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  });

app.get("/", (_, res) => {
  res.render("index");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
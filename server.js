const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
const server = http.createServer(app);
const mongo_uri = require("./config").MONGODB_URI;
const imageSchema = require("./models/image");

mongoose
  .connect(mongo_uri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected..."));

mongoose.connection.on("error", (error) => console.log(error));

app.use(
  cors({
    origin: "https://boiling-shelf-56263.herokuapp.com/",
  })
);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "client", "build")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/", upload.single("image"), function (req, res) {
  const file = req.file;
  const created_at = new Date().getTime();
  if (typeof file === "undefined")
    return res.status(400).send({ error: "Problem with sending the data" });

  const newImage = new imageSchema({
    created_at,
    path: file.path,
  });

  newImage
    .save()
    .then((result) => res.redirect("/"))
    .catch((error) => res.status(400).send({ error }));
});

app.get("/uploads/:image_name", function (req, res) {
  const { image_name } = req.params;
  res.sendFile(path.join(__dirname, "uploads", image_name));
});

app.get("/images", function (req, res) {
  imageSchema
    .find({})
    .then((result) => res.send(result))
    .catch((error) => res.status(400).send({ error }));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = require("./config").PORT;
server.listen(PORT, () => console.log("Server is listening on PORT ", PORT));

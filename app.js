const express = require("express");
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require('connect-mongo');
const pageRoute = require("./routes/pageRoutes")
const courseRoute = require("./routes/courseRoute")
const categoryRoute = require("./routes/categoryRoute")
const userRoute = require("./routes/userRoute")

const app = express();


global.userIN = null



//Bu middlewareları kullanmazsak bir istek gönderdiğimizde hata alırız
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: "mongodb://localhost/smartedu-db" })
}))
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
})

//Connect DB
mongoose.connect('mongodb://localhost/smartedu-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected!'));




//Template Engine
app.set("view engine", "ejs");


//Routes
app.use("/", pageRoute)
app.use("/courses", courseRoute)
app.use("/categories", categoryRoute)
app.use("/users", userRoute)


const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

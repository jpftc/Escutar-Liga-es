const express = require("express");
const app = express();
const session = require("express-session");

const recorderController = require("./recorder/RecorderController");
const loginController = require("./login/LoginController");

app.set("view engine", "ejs");

app.use(session({
    secret: "kvlkdsglksdjfkljsdklfjsdkljfklsdjfklsdzjfk", cookie: { maxAge: 30000000 },
    resave: true,
    saveUninitialized: true
}));

app.use("/", recorderController);
app.use("/", loginController);

app.use(express.static("public"));

app.use(express.static("//a204/GRAVAÇÃO"));
app.use(express.static("//a204/GRAVACAO"));
app.use(express.static("//a204/GRAVADOR"));

app.listen(3000, (req, res) => {
    console.log("Server is running...");
});
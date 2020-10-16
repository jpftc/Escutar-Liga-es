const express = require("express");
const app = express();
const session = require("express-session");

const recorderController = require("./recorder/RecorderController");
const loginController = require("./login/LoginController");

app.use("/", recorderController);
app.use("/", loginController);

app.set("view engine", "ejs");

app.use(session({
    secret: "kvlkdsglksdjfkljsdklfjsdkljfklsdjfklsdzjfk", cookie: { maxAge: 30000000 },
    resave: true,
    saveUninitialized: true
}));

app.use(express.static("public"));

app.listen(3000, (req, res) => {
    console.log("Server is running...");
});
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser, { json } from "body-parser";
import bcrypt from "bcryptjs";
import fs from "fs";
import jwt from "jsonwebtoken";
import checkAuth from "./auth";
import cookieParser from "cookie-parser";

const port = 8000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// load user data from user.json (create the file if doesn't exist)
let users: { email: string; password: string }[] = [];
try {
  const userData = fs.readFileSync("./data/user.json", "utf-8");
  users = JSON.parse(userData);
} catch (error) {
  users = [];
}

app.post("/signup", (req: Request, res: Response) => {
  const { email, password } = req.body;

  // validation
  // hashed the password
  // Save the user list to user.json
  // res to the client

  if (!email || !password) {
    return res.status(400).send("Email and Password are required");
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = { email, password: hash };
  users.push(newUser);

  fs.writeFileSync("./data/user.json", JSON.stringify(users, null, 2));

  res.status(201).send("User registered successfully");
});

app.post("/signin", (req: Request, res: Response) => {
  // validation
  // check user exist or not with email
  // compare password match or not
  // create and send jwt token to the client upon successful authentication
  // give res back the token inside the cookie
  // redirect to the home page

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email and Password are required");
  }

  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).send("User not found");
  }

  const isPasswordMatch = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).send("Invalid credentials");
  }

  const token = jwt.sign({ email }, "2A7F9B3C5D6E8G1H0J4K", {
    expiresIn: "1hr",
  });
  res.cookie("token", token);
  res.redirect("/");
});

app.post("/signout", (req: Request, res: Response) => {
  // clear token cookie
  // redirect to the sign in page

  res.clearCookie("token");
  res.redirect("/signin.html");
});

app.get("/data", checkAuth, (req: Request, res: Response) => {
  res.sendFile(__dirname + "/data/data.json");
});

app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "./index.html");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  // check token from req cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).redirect("/signin.html");
  }

  jwt.verify(token, "2A7F9B3C5D6E8G1H0J4K", (err) => {
    if (err) {
      return res.status(401).send("Unauthorized");
    }

    next();
  });
};


export default checkAuth

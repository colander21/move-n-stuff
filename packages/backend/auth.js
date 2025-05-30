import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "./user.js";

function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET,
      { expiresIn: "12h" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

export function registerUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username or password was invalid format");
  }

  // Check if user already exists in the DB
  userModel
    .findOne({ username })
    .then((existingUser) => {
      if (existingUser) {
        // FIGURE OUT HOW TO ACCESS THIS MSG
        return res.status(409).send("Username is already taken");
      }

      // Hash the password
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPassword) => {
          // Save new user to DB
          const newUser = new userModel({ username, hashedPassword });
          return newUser.save().then(() => {
            // Generate token and send response
            return generateAccessToken(username).then((token) => {
              res.status(201).send({ token });
            });
          });
        });
    })
    .catch((err) => {
      console.error("Signup error:", err);
    });
}

// This will be used to protect endpoints that we want to make sure it has auth for
// Such as our collections, boxes, and items
export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token was received");
    res.status(401).end();
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (decoded) {
        next();
      } else {
        console.log("JWT error:", error);
        res.status(401).end();
      }
    });
  }
}

// This will be used to check username and password and generates and returns
// an access token if username and password match DB.
export function loginUser(req, res) {
  const { username, password } = req.body;

  userModel
    .findOne({ username })
    .then((retrievedUser) => {
      if (!retrievedUser) {
        res.status(401).send("Unauthorized");
      } else {
        bcrypt
          .compare(password, retrievedUser.hashedPassword)
          .then((matched) => {
            if (matched) {
              generateAccessToken(username).then((token) => {
                res.status(200).send({ token });
              });
            } else {
              res.status(401).send("Unauthorized");
            }
          })
          .catch(() => {
            res.status(401).send("Unauthorized");
          });
      }
    })
    .catch((err) => {
      console.error("Login error:", err);
    });
}

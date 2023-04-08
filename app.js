const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
port = 3005;
// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());
app.use(cors());
// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password are correct
  if (username === "user" && password === "password") {
    // Generate a JWT token
    const token = jwt.sign({ username }, "secret", { expiresIn: "1h" });

    // Return the token to the client
    res.json({ token });
  } else {
    // Return an error message if the username or password is incorrect
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Protected endpoint
app.get("/api/data", (req, res) => {
  // Get the authorization header from the request
  const authHeader = req.headers["authorization"];

  // Check if the authorization header is present and has a Bearer token
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the JWT token from the authorization header
    const token = authHeader.substring("Bearer ".length);

    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, "secret");

      // Return the protected data to the client
      res.json({ data: "Protected data", user: decoded.username });
    } catch (err) {
      // Return an error message if the JWT token is invalid or has expired
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    // Return an error message if the authorization header is missing or invalid
    res
      .status(401)
      .json({ message: "Missing or invalid authorization header" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

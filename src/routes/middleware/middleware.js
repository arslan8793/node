const jwt = require("jsonwebtoken");

const secretKey = "mySecreteKey";

function generateToken() {
  try {
    const token = jwt.sign({ user: "ansari" }, secretKey, { expiresIn: "1 hr" });
    console.log(token, "genereate");
    return token;
  } catch (err) {
    console.error(err);
  }
}
 generateToken();

function verifyToken(token) {
  try {
   const decode =  jwt.verify(token, secretKey) 
      return decode;
  } catch (error) {
    return { error: error.message };
  }
}

// let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYW5zYXJpIiwiaWF0IjoxNzA3NDU1MDgyLCJleHAiOjE3MDc0NTUxNDJ9.U_0_iXpurkrEw7hC6xKCFP_KC-T5gcbBP-R4qN_8CYg`
// console.log(verifyToken(token , "verify"));


async function customMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log({ token });

    const middleToken = await verifyToken(token);
    console.log(middleToken, "middle token");

    if (!middleToken.error) {
      console.log("inside");
      req.middleToken = middleToken;
      next();
    } else {
      res.send("Token expired ");
      console.log("else ---");
    }
  } catch (error) {
    res.send("Error occurred in catch block");
    console.log("Error occurred in catch block:");
  }
}

module.exports = { customMiddleware };


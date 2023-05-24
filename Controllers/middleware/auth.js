import Jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {

    let token = req.header("Authorization");
    console.log(token)
    if (!token) {
      return res.status(403).send("Access denied");
    }
    token=token.split(" ")[1]
    // if (token.startsWith("Barrer  ")) {
    //   console.log("here")
    //   token=token.slice(7, token.length).trimLeft();
    // }
    // console.log(token.slice(7, token.length).trimLeft())
    const verified = Jwt.verify(token, process.env.JWT_SECRET);
    console.log("verified",verified)
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

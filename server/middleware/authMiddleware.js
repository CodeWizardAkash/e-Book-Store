import jwt from "jsonwebtoken";
export const protect = (req, res, next) => {
  console.log(req.cookies);

  const token = req.cookies.jwt;

  // console.log("Token:", token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "No user" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    next();
  };
};

export default authorize;

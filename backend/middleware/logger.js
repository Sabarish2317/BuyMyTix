const logger = (req, res, next) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",").shift() ||
    req.socket?.remoteAddress;

  console.log("🔗 REQUEST LOG >>>");
  console.log(`📍 IP: ${ip}`);
  console.log(`📎 Route: ${req.method} ${req.originalUrl}`);

  if (Object.keys(req.headers).length)
    console.log("🧾 Headers:", req.headers.authorization);

  if (Object.keys(req.query).length) console.log("🔍 Query:", req.query);

  if (Object.keys(req.params).length) console.log("📦 Params:", req.params);

  if (req.body && Object.keys(req.body).length)
    console.log("📨 Body:", req.body);

  console.log("⛓ END LOG\n");

  next();
};

module.exports = logger;

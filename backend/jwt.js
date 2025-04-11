import { randomBytes } from "crypto";

const secretKey = randomBytes(32).toString("hex");
console.log(secretKey);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect("<URL>", { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
  await User.deleteOne({ email: "test@test.com" });
  const hashedPassword = await bcrypt.hash("123456", 10);
  await User.create({ username: "testuser", email: "test@test.com", password: hashedPassword, role: "user" });
  console.log("User recréé !");
  process.exit();
})();

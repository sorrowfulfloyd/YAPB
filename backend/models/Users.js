const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = mongoose.model(
  "User",
  new Schema({
    username: {
      type: String,
      required: [true, "Kullanıcı adı boş bırakılamaz"],
      cast: [false, "Bu değer string olmalıdır"],
    },
    email: {
      type: String,
      required: [false, "Mail adresi boş bırakılamaz"],
      cast: [false, "Bu değer string olmalıdır"],
    },
    password: {
      type: String,
      required: [true, "Şifre boş bırakılamaz"],
      cast: [false, "Bu değer string olmalıdır"],
    },
  }),
);

module.exports = User;

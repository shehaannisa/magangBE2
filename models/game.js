const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  // Tipe data ObjectId yang merujuk ke model "User". Ini menyimpan ID pengguna yang membuat (host) game
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // Tipe data ObjectId yang merujuk ke model "Quiz". Ini menyimpan ID kuis yang terkait dengan game
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  // Tipe data String. Ini menyimpan PIN atau kode unik yang digunakan untuk bergabung ke dalam game
  pin: {
    type: String,
  },
  // Ini menyatakan apakah game sedang berlangsung atau tidak.
  isLive: {
    type: Boolean,
    default: false,
  },
  // Array yang berisi ID pengguna (ObjectId) yang merujuk ke model "User". Ini menyimpan daftar pemain yang bergabung ke dalam game
  playerList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // Menyimpan tanggal dan waktu ketika game dibuat
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  // Array yang berisi ID player result (ObjectId) yang merujuk ke model "PlayerResult". Ini mungkin digunakan untuk menyimpan hasil permainan dari setiap pemain.
  playerResultList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlayerResult",
    },
  ],
});

module.exports = mongoose.model("Game", gameSchema);

const mongoose = require("mongoose");

const playerResultSchema = new mongoose.Schema({
  // ID pengguna (user) yang terkait dengan hasil pemain ini, merujuk ke model "User"
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // ID permainan yang terkait dengan hasil pemain ini, merujuk ke model "Game"
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },
  // Skor total yang diperoleh oleh pemain, tipe data Number, dengan nilai default 0
  score: {
    type: Number,
    default: 0,
  },
  // Array yang berisi detail jawaban untuk setiap pertanyaan dalam permainan
  answers: [
    {
      // Indeks pertanyaan yang dijawab
      questionIndex: { type: Number },
      // Boolean yang menunjukkan apakah pertanyaan ini dijawab atau tidak, dengan nilai default false
      answered: {
        type: Boolean,
        default: false,
      },
      // Array yang berisi jawaban yang diberikan oleh pemain untuk pertanyaan ini
      answers: [ String
        // {
        //   name: { type: String },
        //   body: { type: String },
        // },
      ],
      // correctAnswers: [
      //   {
      //     name: { type: String },
      //     body: { type: String },
      //   },
      // ],
      // Waktu yang diperlukan untuk menjawab pertanyaan (dalam satuan tertentu, mungkin detik)
      time: { type: Number },
      // Jumlah poin yang diperoleh oleh pemain untuk jawaban ini, dengan nilai default 0
      points: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("PlayerResult", playerResultSchema);

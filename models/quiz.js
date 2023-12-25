const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  // backgroundImage: { type: String },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // creatorName: { type: String },
  // pointsPerQuestion: {
  //   type: Number,
  //   min: 1,
  // },
  // Jumlah pertanyaan dalam quiz, tipe data Number, dengan nilai default 0.
  numberOfQuestions: {
    type: Number,
    default: 0,
  },
  isPublic: { type: Boolean, required: true, default: true },
  tags: [String],
  likesCount: { type: [String], default: [] },
  // comments: { type: [String], default: [] },
  dateCreated: { type: Date, default: new Date() },
  // Array yang berisi daftar pertanyaan dalam quiz. Setiap pertanyaan memiliki struktur yang terinci, termasuk tipe pertanyaan, jenis poin yang diberikan, waktu jawab, latar belakang, isi pertanyaan, dan daftar jawaban
  questionList: [
    {
      // Tipe pertanyaan, harus salah satu dari "True/False" atau "Quiz"
      questionType: {
        type: String,
        enum: ["True/False", "Quiz"],
        //timeline, grupowanie, kolejność
        required: true,
      },
      // Jenis poin yang diberikan per pertanyaan, harus salah satu dari "Standard", "Double", atau "BasedOnTime"
      pointType: {
        type: String,
        enum: ["Standard", "Double", "BasedOnTime"],
        required: true,
      },
      // Waktu yang diberikan untuk menjawab pertanyaan, dengan batasan minimum dan maksimum
      answerTime: {
        type: Number,
        min: 5,
        max: 90,
      },
      // backgroundImage: { type: String },
      // question: {
      //   type: String,
      //   required: true,
      // },
      // Array yang berisi jawaban-jawaban untuk pertanyaan, setiap jawaban memiliki nama, isi, dan indikator kebenaran
      answerList: [
        {
          name: { type: String },
          body: { type: String },
          isCorrect: { type: Boolean },
        },
      ],
      // Indeks pertanyaan dalam quiz
      questionIndex: { type: Number, required: true },
      // correctAnswersList: [
      //   {
      //     name: { type: String },
      //     body: { type: String },
      //   },
      // ],
      // answerList: [
      //   {
      //     name: { type: String },
      //     content: { type: String },
      //   },
      // ],
      // correctAnswer: [
      //   {
      //     name: { type: String },
      //     content: { type: String },
      //   },
      // ],
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);

const mongoose = require("mongoose")
const Leaderboard = require("../models/leaderboard")
const Quiz = require("../models/quiz")
const Game = require("../models/game")

const createLeaderboard = async (req, res) => {
  const { gameId, playerResultList } = req.body

  // Mengambil data game dan kuis yang terkait
  let game = await Game.findById(gameId)
  let quiz = await Quiz.findById(game.quizId)

  // Membuat objek leaderboard baru menggunakan model Leaderboard
  const leaderboard = new Leaderboard({
    gameId,
    playerResultList,
  })

  // Inisialisasi leaderboard untuk setiap pertanyaan dalam kuis
  quiz.questionList.forEach((question) => {
    leaderboard.questionLeaderboard.push({
      questionIndex: question.questionIndex,
      questionResultList: [],
    })
    leaderboard.currentLeaderboard.push({
      questionIndex: question.questionIndex,
      leaderboardList: [],
    })
  })

  try {
    // Menyimpan leaderboard baru ke basis data
    const newLeaderboard = await leaderboard.save()
    res.status(201).json(newLeaderboard)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getLeaderboard = async (req, res) => {
  let leaderboard
  try {
    // Mengambil leaderboard berdasarkan ID
    leaderboard = await Leaderboard.findById(req.params.id)
    if (leaderboard == null) {
      return res.status(404).json({ message: "Leaderboard not found" })
    }
    res.json(leaderboard)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addPlayerResult = async (req, res) => {
  const { leaderboardId } = req.params
  const { playerResultId } = req.body
  let leaderboard

  try {
    // Mengambil leaderboard berdasarkan ID
    leaderboard = await Leaderboard.findById(leaderboardId)
    // Menambahkan hasil pemain ke dalam daftar hasil pemain leaderboard
    leaderboard.playerResultList.push(playerResultId)
    // Menyimpan perubahan ke dalam basis data
    const newLeaderboard = await leaderboard.save()
    res.status(201).json(newLeaderboard)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const updateQuestionLeaderboard = async (req, res) => {
  const { leaderboardId } = req.params
  const { questionIndex, playerId, playerPoints } = req.body
  let leaderboard

  try {
    leaderboard = await Leaderboard.findById(leaderboardId)
    // Menambahkan hasil pemain untuk pertanyaan tertentu ke dalam daftar leaderboard pertanyaan
    leaderboard.questionLeaderboard[questionIndex - 1].questionResultList.push({
      playerId,
      playerPoints,
    })

    const newLeaderboard = await leaderboard.save()
    res.status(201).json(newLeaderboard)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const updateCurrentLeaderboard = async (req, res) => {
  const { leaderboardId } = req.params
  const { questionIndex, playerId, playerCurrentScore } = req.body
  let leaderboard

  try {
    leaderboard = await Leaderboard.findById(leaderboardId)
    leaderboard.currentLeaderboard[questionIndex - 1].leaderboardList.push({
      playerId,
      playerCurrentScore,
    })

    const newLeaderboard = await leaderboard.save()
    res.status(201).json(newLeaderboard)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  createLeaderboard,
  getLeaderboard,
  addPlayerResult,
  updateQuestionLeaderboard,
  updateCurrentLeaderboard,
}

// createLeaderboard: Membuat leaderboard baru dan menyimpannya ke basis data. Inisialisasi leaderboard untuk setiap pertanyaan dalam kuis.
// getLeaderboard: Mengambil leaderboard berdasarkan ID.
// addPlayerResult: Menambahkan hasil pemain ke dalam daftar hasil pemain leaderboard.
// updateQuestionLeaderboard: Memperbarui daftar leaderboard pertanyaan dengan hasil pemain untuk pertanyaan tertentu.
// updateCurrentLeaderboard: Memperbarui daftar leaderboard saat ini dengan skor pemain untuk pertanyaan tertentu.

const express = require("express");
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const {
  runForProfile,
  getLatest,
  listHistory,
  getById,
  remove,
} = require("../services/analysis.service");

const router = express.Router();

/* ---------------- ANALYSIS RUN ---------------- */
router.post("/run", auth, async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id }).lean();
    if (!profile) {
      return res.status(404).json({ message: "Profil bulunamadı" });
    }

    const result = await runForProfile({
      userId: req.user.id,
      profile,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
});

/* ---------------- LATEST ---------------- */
router.get("/latest", auth, async (req, res, next) => {
  try {
    const result = await getLatest({ userId: req.user.id });
    if (!result) {
      return res.status(404).json({ message: "Sonuç yok" });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/* ---------------- HISTORY ---------------- */
router.get("/history", auth, async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);

    const result = await listHistory({
      userId: req.user.id,
      page,
      limit,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
});

/* ---------------- GET BY ID ---------------- */
router.get("/:id", auth, async (req, res, next) => {
  try {
    const result = await getById({
      userId: req.user.id,
      id: req.params.id,
    });

    if (!result) {
      return res.status(404).json({ message: "Analiz bulunamadı" });
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
});

/* ---------------- DELETE ---------------- */
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const ok = await remove({
      userId: req.user.id,
      id: req.params.id,
    });

    if (!ok) {
      return res
        .status(404)
        .json({ message: "Silinecek analiz bulunamadı" });
    }

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

require("dotenv").config();
const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const passport = require("./config/passport");

const app = express();

/**
 * ✅ CORS AYARI (KRİTİK)
 * withCredentials = true kullandığımız için
 * origin '*' OLAMAZ
 */
app.use(
  cors({
    origin: "http://localhost:5173", // frontend adresin
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: "2mb" }));

// Passport
app.use(passport.initialize());

// Public klasörü
app.use(express.static(path.join(__dirname, "..", "public")));

// Routes
const authRoutes = require("./routes/auth.routes");
const oauthRoutes = require("./routes/auth.oauth.routes");
const profileRoutes = require("./routes/profile.routes");
const uploadRoutes = require("./routes/upload.routes");
const analysisRoutes = require("./routes/analysis.routes");

// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/oauth", oauthRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/analysis", analysisRoutes);

// Root
app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "..", "public", "index.html");
  if (fs.existsSync(indexPath)) return res.sendFile(indexPath);
  res.type("text/plain").send("API çalışıyor. Sağlık kontrolü için: /health");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  // Zod validation error
  if (err?.name === "ZodError") {
    return res.status(400).json({
      message: "Geçersiz veri",
      errors: err.errors?.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Mongo duplicate key
  if (err?.code === 11000) {
    return res.status(400).json({ message: "Bu e-posta zaten kayıtlı" });
  }

  res.status(500).json({ message: "Internal Server Error" });
});

// Process safety
process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

// Server start
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGODB_URI || "mongodb://localhost:27017/career_health")
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Server ready on :${PORT}`)
    );
  })
  .catch((e) => {
    console.error("DB connection error", e);
    process.exit(1);
  });

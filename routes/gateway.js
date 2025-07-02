const express = require("express");
const crypto = require("crypto");
const { analyzePayload } = require("../llm");
const { getCachedAnalysis, setCachedAnalysis } = require("../cache");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
  const payload = req.body;
  if (!payload) {
    return res.status(400).json({
      error: "Missing JSON body. Ensure Content-Type: application/json is set.",
    });
  }

  console.log(payload);

  // Hash the payload to use as cache key
  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(payload))
    .digest("hex");

  try {
    // 1) Check cache
    let cached = await getCachedAnalysis(hash);

    let result;
    if (cached) {
      console.log("Cache hit");
      result = JSON.parse(cached);
    } else {
      console.log("Cache miss. Analyzing...");
      const llmResponse = await analyzePayload(payload);

      // Parse LLM output (simple naive parse for now)
      const classification = llmResponse
        .match(/Classification:\s*(.*)/i)[1]
        .trim();
      const reason = llmResponse.match(/Reason:\s*(.*)/i)[1].trim();

      result = { classification, reason };
      await setCachedAnalysis(hash, JSON.stringify(result));
    }

    if (result.classification.toLowerCase() === "safe") {
      // Forward to backend dummy service
      const backendResponse = await axios.post(
        "http://localhost:3000/backend/hello",
        payload
      );
      res.json({
        gateway: "Safe request forwarded.",
        backend: backendResponse.data,
      });
    } else {
      res.status(403).json({
        message: "Request blocked by Vigilant AI",
        classification: result.classification,
        reason: result.reason,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Gateway Error" });
  }
});

module.exports = router;

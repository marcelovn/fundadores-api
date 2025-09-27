const mongoose = require('mongoose');

const ChapterSummarySchema = new mongoose.Schema(
  {
    chapter: Number,
    title: String,
    summary: String,
    entrepreneurialInsights: [String],
  },
  { _id: false }
);

const FounderSchema = new mongoose.Schema(
  {
    id: { type: String, index: true },
    title: String,
    author: String,
    founder: String,
    year: Number,
    summary: String,
    region: String,
    chapterSummaries: [ChapterSummarySchema],
  },
  { timestamps: false }
);

module.exports = mongoose.model('Founder', FounderSchema, process.env.MONGODB_COLLECTION || 'fundadores');

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

const RecommendedBookSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    author: String,
    reason: String,
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
    recommendedBooks: [RecommendedBookSchema],
    hasPaidAccess: { type: Boolean, default: false },
  },
  { timestamps: false }
);

module.exports = mongoose.model('Founder', FounderSchema, process.env.MONGODB_COLLECTION || 'fundadores');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Founder = require('./models/Founder');

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://mv_est:mv_est@cluster0.jklfu5a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = process.env.MONGODB_DB_NAME || 'fundadores';

app.use(cors());
app.use(express.json());

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    dbName,
  })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

function normalizeFounder(document) {
  if (!document) {
    return null;
  }

  const { _id, ...rest } = document;

  // Ensure all required fields are present with default values
  const normalized = {
    id: rest.id || (rest._id ? rest._id.toString() : null),
    title: rest.title || '',
    author: rest.author || '',
    founder: rest.founder || '',
    year: rest.year || null,
    summary: rest.summary || '',
    region: rest.region || '',
    chapterSummaries: rest.chapterSummaries || [],
    recommendedBooks: rest.recommendedBooks || [],
    hasPaidAccess: rest.hasPaidAccess !== undefined ? rest.hasPaidAccess : false,
  };

  return normalized;
}

app.get('/', async (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/fundadores', async (req, res) => {
  try {
    const founders = await Founder.find({}).lean();
    res.json(founders.map(normalizeFounder));
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erro ao carregar fundadores.' });
  }
});

app.get('/fundadores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const founder = (await Founder.findOne({ id }).lean()) || (mongoose.isValidObjectId(id) ? await Founder.findById(id).lean() : null);

    if (!founder) {
      res.status(404).json({ success: false, message: 'Founder não encontrado.' });
      return;
    }

    res.json(normalizeFounder(founder));
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erro ao carregar fundador.' });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

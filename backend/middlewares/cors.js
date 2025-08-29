import cors from 'cors';

const corsOptions = {
  origin: ['http://localhost:5000', 'https://biblio-handi-atari-jq4j.onrender.com'],
  credentials: true,
};

export default cors(corsOptions);
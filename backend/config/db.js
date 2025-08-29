import mysql from 'mysql2/promise'

// Crée un pool de connexions MSQL réutilisable dans toute l'application
const pool = mysql.createPool({
    user: process.env.DB_USER,          // Ex: root
    host: process.env.DB_HOST,          // Ex: localhost
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,           // Attendre la libération d'une connexion si pool plein
    connectionLimit: 10,               // Nombre max de connexions simultanées 
    queueLimit: 0                       // Pas de limite à la file d'attente
});

export default pool;
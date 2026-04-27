import express from 'express';
import { sequelize } from './database.js';
import peliculasRoutes from './routes/peliculas.routes.js';
import { logger } from './middlewares/logger.js';
import { validarApiKey } from './middlewares/apiKey.js';

const app = express();
app.use(express.json());

// middlewares
app.use(logger);
app.use(validarApiKey);

// rutas
app.use('/peliculas', peliculasRoutes);

app.get('/', (req, res) => {
    res.send('API funcionando');
});

const PORT = 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor en http://localhost:${PORT}`);
    });
});
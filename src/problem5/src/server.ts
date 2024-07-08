import express from 'express';
import resourceRoutes from './routes/resourceRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/resources', resourceRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

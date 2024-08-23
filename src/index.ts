import express from 'express';
import { addSchool } from './routes/addSchool';
import { listSchools } from './routes/listSchool';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/addSchool', addSchool);
app.get('/listSchools', listSchools);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

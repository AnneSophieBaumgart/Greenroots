import express from 'express';
import 'dotenv/config';
import homepageRouter from './app/Routes/homepage.route.js';
import treeRouter from './app/Routes/tree.route.js';
import contactRouter from './app/Routes/contact.route.js';


const app = express();

const PORT = process.env.PORT || 3000;

// Permet à Express de lire les données JSON envoyées dans les requêtes POST/PUT
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './app/Views');

app.use(express.static('./app/public'));

app.use('/', homepageRouter);
app.use('/api/trees', treeRouter);
app.use('/contact', contactRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
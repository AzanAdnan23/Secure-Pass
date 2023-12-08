import express from 'express';
const app = express();
const port = 3001; // Choose any port you prefer

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

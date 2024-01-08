import express from 'express';
import mongoose from 'mongoose';
import auth from './src/routes/auth.js';
import profile from './src/routes/profile.js'
import feed from './src/routes/Feed.js'
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/auth', auth);
app.use( '/profile',profile )
app.use( '/feed',feed )
const CONNECTION_URL = ''; //Enter your own mongoDB database connection url :)
 
mongoose.connect(CONNECTION_URL, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});
 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

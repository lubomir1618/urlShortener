import monk from 'monk';
import dotenv from 'dotenv';

dotenv.config();

const db = monk(process.env.MONGO_URL || '');

const urls = db.get('urls'); // add type and so on

console.log('urls', urls);
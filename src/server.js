import express from 'express';
import Routes from "./routes";
import cors from 'cors';

const app = express();

app.use(cors({ origin: '*', credentials: true }));

app.use(express.json());

app.use(Routes);

app.listen(process.env.PORT || 3333, () => console.log('server is on'));

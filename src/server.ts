import App from './app';
import { UserRouter } from './routes/user.router';

const app = new App([
    new UserRouter()
]);

app.getExpress().listen(3000);

import App from './app';
import { AccountRouter } from './routes/account.router';
import { UserRouter } from './routes/user.router';

const app = new App([
    new UserRouter(),
    new AccountRouter()
]);

app.getExpress().listen(3000);

import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from './App';

const root = createRoot(document.getElementById('root')!);
root.render(
    <Router>
        <Switch>
            <Route path='/'>
                <App />
            </Route>
        </Switch>
    </Router>
);
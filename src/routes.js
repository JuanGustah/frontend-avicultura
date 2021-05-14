import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Logon from './pages/logon'
import Register from './pages/register'
import Avicultura from './pages/avicultura'
import CheckEmail from './pages/logon/forgot_password/checkEmail';
import ChangePassword from './pages/logon/forgot_password/changePassword';
import Confirm from './pages/register/confirm';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/forgotpassword" exact component={CheckEmail} />
                <Route path="/forgotpassword/change/:id" component={ChangePassword} />
                <Route path="/register" exact component={Register} />
                <Route path="/register/legal" component={Register} />
                <Route path="/register/physical" component={Register} />
                <Route path="/register/confirm/:id" component={Confirm} />
                <Route path="/sector" component={Avicultura} />
                <Route path="/egg" component={Avicultura} />
                <Route path="/egg/gema" component={Avicultura} />
                <Route path="/egg/albumen" component={Avicultura} />
                <Route path="/egg/casca" component={Avicultura} />
                <Route path="/egg/revisar/:page" component={Avicultura} />
                <Route path="/egg/finalizar" component={Avicultura} />
                <Route path="/egg/details" component={Avicultura} />
                <Route path="/dashboard" component={Avicultura} />
                <Route path="/profile" component={Avicultura} />
                <Route path="/profile/edit" component={Avicultura} />
                <Route path="/profile/list-sector" component={Avicultura} />
                <Route path="/profile/sector" component={Avicultura} />
                <Route path="/profile/listsessions" component={Avicultura} />
                <Route path="/profile/listeggs" component={Avicultura} />
                <Route path="/profile/detailegg" component={Avicultura} />
                <Route path="/profile/about" component={Avicultura} />
                <Route path="/profile/faq" component={Avicultura} />
            </Switch>
        </BrowserRouter>
    )
}
import React, { useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';
import Bar from './Bar'
import Sector from './Sector'
import Egg from './Egg/gema'
import Albumen from './Egg/albumen'
import Casca from './Egg/casca'
import Revisar from './Egg/revisar'
import Dashboard from './Dashboard'
import Profile from './Profile'
import ListSector from './Profile/listSector'
import DetailSector from './Profile/detailSector'
import EggForm from './Egg/eggForm';
import Finalizar from './Egg/Finalizar';
import Details from './Egg/detalhes';
import ProfileEdit from './Profile/profileEdit';
import ListSessionsEggs from './Profile/listSessionsEggs';
import ListEggs from './Profile/listEggs';
import DetailEgg from './Profile/detailEgg';
import About from './Profile/about';
import FAQ from './Profile/faq';

export default function Avicultura() {
    const tokenJWT = sessionStorage.getItem('token');
    const history = useHistory();

    useEffect(() => {
        if (tokenJWT === null) {
            history.push('/');
        }
    }, [tokenJWT, history])

    return (
        <div style={{ display: 'flex' }}>
            <Bar />
            <Switch>
                <Route path="/sector" component={Sector} />
                <Route path="/egg" exact component={EggForm} />
                <Route path="/egg/gema" component={Egg} />
                <Route path="/egg/albumen" component={Albumen} />
                <Route path="/egg/casca" component={Casca} />
                <Route path="/egg/revisar/:page" component={Revisar} />
                <Route path="/egg/finalizar" component={Finalizar} />
                <Route path="/egg/details" component={Details} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/profile/edit" component={ProfileEdit} />
                <Route path="/profile/list-sector/:page" component={ListSector} />
                <Route path="/profile/sector" component={DetailSector} />
                <Route path="/profile/listsessions/:page" component={ListSessionsEggs} />
                <Route path="/profile/listeggs" component={ListEggs} />
                <Route path="/profile/detailegg" component={DetailEgg} />
                <Route path="/profile/about" component={About} />
                <Route path="/profile/faq" component={FAQ} />
            </Switch>
        </div>
    )
}
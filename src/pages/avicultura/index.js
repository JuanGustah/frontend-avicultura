import React,{useEffect} from 'react'
import {Route,Switch,useHistory} from 'react-router-dom';
import Bar from './Bar'
import Sector from './Sector'
import Egg from './Egg/gema'
import Albumen from './Egg/albumen'
import Casca from './Egg/casca'
import Revisar from './Egg/revisar'
import Dashboard from './Dashboard'
import Profile from './Profile'
import EggForm from './Egg/eggForm';

export default function Avicultura(){
    const tokenJWT=sessionStorage.getItem('token');
    const history=useHistory();

    useEffect(()=>{
        if(tokenJWT===null){
            history.push('/');
        }
    },[tokenJWT,history])

    return(
        <div style={{display:'flex'}}>
            <Bar/>
                <Switch>
                    <Route path="/sector" component={Sector}/>
                    <Route path="/egg" exact component={EggForm}/>
                    <Route path="/egg/gema" component={Egg}/>
                    <Route path="/egg/albumen" component={Albumen}/>
                    <Route path="/egg/casca" component={Casca}/>
                    <Route path="/egg/revisar/:page" component={Revisar}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/profile" component={Profile}/>
                </Switch>
        </div>
    )
}
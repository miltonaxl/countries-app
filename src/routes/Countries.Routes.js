import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Countries from '../components/countries';
import Country from '../components/country/Country';
import '../index.scss'
import Nav from '../components/ui/Navbar';
import { BgContext } from '../hooks/useContext';
const CountriesRoutes = () => {
    const [darkMode, setDarkMode] = useState(false);
   

    useEffect(() => {
       if(localStorage.getItem('dark-mode')){
           document.body.classList.add('dark-mode');
           setDarkMode(c => c = !c)
        }
    }, [])
    const changeEffect  = ()=>{
      if(darkMode){
        localStorage.setItem('dark-mode', 'darkmode')
        document.body.classList.add('dark-mode');
      }else{
        document.body.classList.remove('dark-mode');
        localStorage.removeItem('dark-mode')
      }
    }

    useEffect(() => {
      changeEffect();
      
    }, [darkMode])
    
    return (
        <div className="is-light-theme">
          <BgContext.Provider value={
              {
                bgDark:darkMode
              }
            }>
              <Router>

                <Nav setDarkMode={setDarkMode} darkMode={darkMode} />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Countries}/>
                        <Route exact path="/:name" component={Country}/>
                        <Redirect to="/"/>
                    </Switch>
                </div>
            
            </Router> 
          </BgContext.Provider>
        </div>
    )
}

export default CountriesRoutes;

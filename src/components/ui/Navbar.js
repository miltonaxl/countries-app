
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSearch, faSortDown, faSun } from '@fortawesome/free-solid-svg-icons';
import './index.scss';
import { BgContext } from '../../hooks/useContext';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const options = [
    {
      value: '',
      name:'Select by region'
    },
    {
      value: 'Americas',
      name: 'Americas'
    },
    {
      value: 'Asia',
      name: 'Asia'
    },
    {
      value: 'Africa',
      name: 'Africa'
    },
    {
      value: 'Polar',
      name: 'Polar'
    },
    {
      value: 'Oceania',
      name: 'Oceania'
    },
    {
      value: 'Europe',
      name: 'Europe'
    }
  ]
  



const Nav = React.memo(({setDarkMode, darkMode}) => {
    const handleDarMode = ()=>{
      setDarkMode(!darkMode)
    }

 

    return (
      <>
       <div className={`nav ${darkMode ? 'dark-nav': 'light-nav'}`}>
              <h1> Where in the world? </h1>
            
              
                <button className={`${darkMode ? 'border-gray-300 hover:border-gray-600 ': 'border-gray-800  hover:border-gray-300'}`}  onClick={handleDarMode}>
                   {
                     darkMode ? 
                      (<> <FontAwesomeIcon icon={faSun}/> Light mode</> )
                      
                      :
                      (<><FontAwesomeIcon icon={faMoon}/> Dark mode</>)
                   }
                </button>
           </div>
        </>
    )
})

export default Nav;



export const Navbar = React.memo( ({setRegion, setSearch})=>{
  const history = useHistory();
  let valueSelect = localStorage.getItem('region') || '';
  const handleChange = e =>{
    valueSelect = e.target.value
    localStorage.setItem('region', valueSelect)
    setRegion(valueSelect);
  }
  const {bgDark} = useContext(BgContext);

  const location = useLocation();

  const { q = '' } = queryString.parse(location.search)
  const  handleInput   = e =>{
    e.preventDefault();
    const search = e.target.value;
    history.push(`?q=${search}`);
    
    localStorage.setItem('search', search)
    if(search.length === 0) return;
    setSearch(search)
    
  } 

  if(q.length < 1)localStorage.removeItem('search');
  

  return (

          <div className="navbar">
                
          <div className="nav-inputs">

              <div className="form-group">
                  <label htmlFor="searchCountry" >
                          <FontAwesomeIcon icon={faSearch}/>
                  </label>
                  <input className="form-control" defaultValue={q} onKeyUp={handleInput} autoComplete="off" name="searchCountry" placeholder="Search by (name, language, capital, calling code)"/>
              </div>
              <div className="form-group-select">
                  
                  <select defaultValue={valueSelect}  onChange={handleChange} className="form-select" name="regions">
                      {
                          options.map(({value, name})=> <option className={`${ bgDark? 'dark-nav': 'light-nav'}`} key={value} value={value}>{name}</option>)
                      }
                  </select>

                  <label htmlFor="regions" >
                          <FontAwesomeIcon icon={ faSortDown }/>
                  </label>
              </div>
              
              
          <div>
              
          </div>
          </div>
          
      </div>

  )
})

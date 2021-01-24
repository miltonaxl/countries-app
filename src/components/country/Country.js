import { faLongArrowAltLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { getCountryById } from '../../selectors/getCountryById';
import Map from './Maps';
import { URLS } from '../../config/URLS';
import './index.scss';
import Loading from '../loading/Loading';
import { BgContext } from '../../hooks/useContext';




const Country = React.memo(({history}) => {

    const { name:id } = useParams()
    const backHome = () =>{
        const lastpath = localStorage.getItem('lastPath') || '/'
        history.replace(lastpath)
    }
    // const lastpath = localStorage.getItem('lastPath') || '/'
    // history.replace(lastpath)
    const handleClick = ()=>{
        backHome();
    }


    const [{data, loading, error}, setcountry] = useState({loading:true, data:null, error:null})

    getCountryById(id, setcountry)
 


    const [showModal, setShowModal ] = useState(false);

   
    window.onclick = e =>{
        if(e.target.className ==='modal' || e.target.className === 'close'){
            setShowModal(m => m = false)
        }    
    }

    return (
        <>
            <button 
                onClick={handleClick}
                className="button-back">
            <FontAwesomeIcon icon={faLongArrowAltLeft}/>  Go back
            </button>
            <div className="card">
            {
                    !!error&& (<div className="error">
                                                <h1>{error}</h1>
                                            </div>)
            }
            {
                loading ?       
                <Loading/>
                : 
                    <Card {...data}  setShowModal= {setShowModal}/>
               
                
            }
             </div>
             <div style={showModal ? {display:'block'} : {display:'none'}} className="modal">

                {/* <!-- Modal content --> */}
               { 
               
               loading ?       
               <FontAwesomeIcon className="faSpinner" icon={faSpinner} spin/>
               : 
               <div className="modal-content">

                    <span  className="close">&times;</span>
                    <p>{data.name}</p>
                    <div className="content-map">
                      <Map 
                            googleMapURL={URLS.urlMap}
                            containerElement={<div style={{ height: '200px' }}></div>}
                            mapElement={<div style={{ height: '100%' }}></div>}
                            loadingElement={<div>cargando</div>}
                            lat={data.latlng[0]}
                            lng={data.latlng[1]}
                        />
                    </div>
                </div>}

                </div>
        </>
    )
}
)
export default Country




const Card = React.memo(({ name,capital, region, population, languages, alpha3Code, borders, flag, subregion, setShowModal})=>{
    


    const handleModal = () => {
        setShowModal(m => m = !m);
    }

    const {bgDark} = useContext(BgContext);
    console.log(!bgDark);
    return (

        <>
                <img src={flag} alt="mapa"/>

            <div className="card-body">
                <h1>{name}</h1>
                <div className="card-text">
                    <p><b>Region : </b> {region}</p>
                    <p><b>SubRegion : </b> {subregion}</p>
                    <p><b>Capital : </b> {capital}</p>
                    <p><b>Population : </b> {population}</p>
                    <p><b>Language : </b> {languages.map(({nativeName})=> ` ${nativeName}` )}</p>
                    <p><b>Alpha3Code : </b> {alpha3Code}</p>
                    <p><b>Borders : </b>
                    {
                        (borders.length !== 0 ) && <div className="borders-group"> 
                            {
                                borders.map(borde=> <div key={borde} className="borders"> {borde} </div> )
                            }
                        </div>
                    }
                    
                    
                    </p>
                    
                </div>
              
                <button onClick={handleModal} className={`btnMap ${bgDark ? 'border-gray-400 rounded-lg border-2 hover:border-gray-100 text-gray-400 hover:text-gray-100 a' : 'border-gray-400 rounded-lg border-2 hover:border-gray-800 text-gray-400 hover:text-gray-800 b'}`}>View Map</button>
            </div>
            
           


           
        </>
    )
})
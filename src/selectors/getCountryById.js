import { URLS } from "../config/URLS";


export const getCountryById = async(id, setCountry)=>{

        try {
          const api = await fetch(`${URLS.rest}/name/${id.toLowerCase()}`);
           const countryInfo = await api.json();
           const info = !!countryInfo ? countryInfo[0] :  new Error('no encojntrado');
            setCountry({loading: false, data:info, error:null})
        } catch (error) {
            console.log(error);
        }
        
}
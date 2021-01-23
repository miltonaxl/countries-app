import { URLS } from "../config/URLS";


export const getCountryById = async(id, setCountry)=>{

        try {
          const api = await fetch(`${URLS.rest}/name/${id.toLowerCase()}`);
           const countryInfo = await api.json();
           const info = !!countryInfo && countryInfo[0];
            setCountry({loading: false, data:info, error:null})
        } catch (error) {
            setCountry({loading: true, data:null, error:null})
        }
        
}
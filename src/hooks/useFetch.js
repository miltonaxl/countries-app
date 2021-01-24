import { useEffect, useRef, useState } from "react";
import { URLS } from "../config/URLS";
import { getCountriesBysearch } from "../selectors/getCountriesByName";
import { getCountryByRegion } from "../selectors/getCountriesByRegion";


export const useFetch = (region = '', search = '') => {

    const isMounted = useRef(true);
    const [state, setstate] = useState({
        data:null, loading:true, error:null
    });

    
    useEffect(()=>{
       return ()=>{
           isMounted.current = false;
       }
    }, [])

    useEffect(()=>{

        setstate({
            data:null, loading:true, error:null
        });

        fetch(`${URLS.rest}/all`)
            .then(res => res.json())
            .then(data => 
                {
                    if(isMounted.current){
                        (search.length < 2 )?
                         data =  getCountryByRegion(data, region)
                         :
                         data = getCountriesBysearch(data, search);
                        setstate(
                            {
                                loading:false,
                                error:null,
                                data
                            }
                        )}
                }
            ).catch(error => setstate(
                {
                    loading:true,
                    error:error.message,
                    data:null
                }
            ))
    }, [region, search])
    return state;
}
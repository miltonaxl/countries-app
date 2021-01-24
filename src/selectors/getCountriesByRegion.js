

export const getCountryByRegion = (data, region)=>{
    if(region==='') return data;
    else return data.filter(c  => c.region === region );
}
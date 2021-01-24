export const getCountriesBysearch= (data, search)=>{
    if(search==='') return data;
    else return data.filter(c  => c.name.toLowerCase().includes(search.toLowerCase().trim()) ||  c.capital.toLowerCase().includes(search.toLowerCase().trim()) ||  c.languages[0].nativeName.toLowerCase().includes(search.toLowerCase().trim()) || c.callingCodes[0].toLowerCase().includes(search.toLowerCase().trim()));
}
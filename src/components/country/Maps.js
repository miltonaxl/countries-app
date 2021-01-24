import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps';


const MapComponent =React.memo( ({lat, lng})=>{
    return (
    <GoogleMap
        defaultZoom={5}
        defaultCenter={{lat, lng}}
    >
        {
            <Marker position={{lat, lng}}/>
        }   

    </GoogleMap>)
})

export default withScriptjs(
    withGoogleMap(
        MapComponent
    )
);
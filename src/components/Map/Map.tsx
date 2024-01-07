import React from 'react'
import { GoogleMap } from '@react-google-maps/api';
import './css/Map.scss'

const containerStyle = {
    width: '70vw',
    height: '70vh'
  };
  
  const center = {
    lat: 50.619900,
    lng: 26.251617
  };

export const Map = () => {
    
    const mapRef = React.useRef(undefined
        )
    const onLoad = React.useCallback(function callback(map) {
        mapRef.current = map
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        mapRef.current = map
      }, [])

    return (
        <section className='google-map'>
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            </GoogleMap>
        </section>
    )
}
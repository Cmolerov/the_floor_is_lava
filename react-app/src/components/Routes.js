import React, { useEffect, useState, Component } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

import * as routesAction from '../store/routes'


const containerStyle = {
  width: '200px',
  height: '200px'
};



function Routes(props) {
  const id = props.user.id;
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const routes = useSelector(state => state.routes.routes);
  const apiKey = useSelector(state => state.routes.apiKey)
  const [response, setResponse] = useState(null)
  let travelMode = 'WALKING'
  let origin = '42.35796768090105,-71.07336678423798'
  let destination = '42.369803176648205,-71.06982626829688'
  // let origin = "";
  // let destination = "";
  
  function directionsCallback (response) {
    console.log(response)
  
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response)
      } else {
        console.log('response: ', response)
      }
    }
  }
  
  //END MAP
  
  useEffect(() => {
    dispatch(routesAction.routesSearch(id))
      .then(() => setIsLoaded(true))
  }, [dispatch])

  return isLoaded &&(
    <>
      <div>{
        Object.values(routes).map((route, idx) => {
          const center = {
                          lat: route.startLat,
                          lng: route.startLong
                        };
            return (
              <div key={idx} className='routes__container'>
                <NavLink className='navlinks' to={`/routes/${route.id}`}>
                  <div className='routes__map-container'>
                    <div className='routes__map'>
                    <div>
                      <LoadScript
                        googleMapsApiKey={apiKey}
                      >
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                            center={center}
                        zoom={10}
                      >
                        {/* {
                          (
                            destination !== '' &&
                            origin !== ''
                          ) && (
                            <DirectionsService
                              options={{ 
                                destination: destination,
                                origin: origin,
                                travelMode: travelMode
                              }}
                              callback={directionsCallback}
                            />
                          )
                        }
              
                        {
                          response !== null && (
                            <DirectionsRenderer
                              // required
                              options={{
                                directions: response
                              }}
                              // optional
                              onLoad={directionsRenderer => {
                                console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                              }}
                            />
                          )
                        } */}
                      </GoogleMap>
                      </LoadScript>
        </div>
            </div>
              </div>
              </NavLink>
                <h2 className='routes__name'>{route.name}</h2>
                <div className='routes__description'><p>{route.description}</p></div>
              </div>
            )
          })
        }
    </div>
      </>
  )
}

export default Routes;
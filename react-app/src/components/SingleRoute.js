import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';
import './SingleRoute.css'
import * as routesAction from '../store/routes';


function SingleRoute() {

  const [currentLocation, setCurrentLocation] = useState(null)
  const [running, setRunning] = useState(false)
  
  const route = useSelector(state => state.routes.route);
  const origin = useSelector(state => `${state.routes.route.startLat},${state.routes.route.startLong}`);
  const start = useSelector(state => ({ 'lat': state.routes.route.startLat, 'lng': state.routes.route.startLong }));
  const end = useSelector(state => ({ 'lat': state.routes.route.endLat, 'lng': state.routes.route.endLong }));
  const destination = useSelector(state => `${state.routes.route.endLat},${state.routes.route.endLong}`)
  const apiKey = useSelector(state => state.routes.apiKey)
  const center = useSelector( state =>
  {
    return {
      lat: state.routes.route.startLat,
      lng: state.routes.route.startLong,
    }
  })
  const { routeId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded2, setIsLoaded2] = useState(false);
  const [response, setResponse] = useState(null);
  
    //TEST FOR CURRENT MOVEMENT

    let movementId, target, options;

    function success(pos) {
      var crd = pos.coords;
      // console.log(crd)
      setCurrentLocation({'lat': crd.latitude, 'lng': crd.longitude})
    
      if (target.lat === crd.latitude && target.lng === crd.longitude) {
        alert('You beat the volcano!');
        navigator.geolocation.clearWatch(movementId);
      }
    };
    
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };
    
    target = {
      lat : 0,
      lng: 0,
    }
    
    options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };
    
    movementId = navigator.geolocation.watchPosition(success, error, options);
      
      //END TEST FOR CURRENT MOVEMENT

  let travelMode = 'WALKING'

  const containerStyle = {
    width: '600px',
    height: '400px'
  };
  
  function directionsCallback(response) {
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response)
      } else {
        console.log('response: ', response)
      }
    }
  }

  const runRoute = () => {
    setRunning(true)
  };
  
  useEffect(() => {
    dispatch(routesAction.routeSearch(routeId))
      .then(() => setCurrentLocation(start))
      .then(() => setIsLoaded2(true))
  }, [])

  return isLoaded2 && currentLocation && (
      <div className='single__route__container'>
        <h1 className="route__p__name">{ route.name }</h1>
        <div className="main__div__map-container">
          <LoadScript
            googleMapsApiKey={apiKey}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              {
                (
                  destination !== '' &&
                  origin !== ''
                ) && (
                  <DirectionsService
                    // required
                    options={{ 
                      destination: destination,
                      origin: origin,
                      travelMode: travelMode
                    }}
                    // required
                    callback={directionsCallback}
                    // optional
                    onLoad={directionsService => {
                      console.log('DirectionsService onLoad directionsService: ', directionsService)
                    }}
                  />
                )
              }
    
              {
                response !== null && (
                  <DirectionsRenderer
                    // required
                    options={{
                      directions: response,
                      suppressMarkers: running ? true : false
                    }}
                    // optional
                    onLoad={directionsRenderer => {
                      console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                    }}
                  />
                )
              }
              {running ?
                <>
                <Marker
                key={1}
                position={start}
                icon={'https://img.icons8.com/office/30/000000/running.png'}
              />
              <Marker
                key={2}
                position={end}
                icon={'https://img.icons8.com/fluent-systems-filled/24/000000/finish-flag.png'}
                  />
                  </>
                :
                null}
            </GoogleMap>
          </LoadScript>
        </div>
        <button onClick={runRoute} className="single__route__run__button">Run Route</button>
      </div>
    )
}

export default SingleRoute;
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker, Circle } from '@react-google-maps/api';
// import './SingleRoute.css'

import * as workoutsAction from '../store/workouts'
import * as routesAction from '../store/routes';


function SingleRoute() {

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));
  }

  function getRandomNum(min, max) {
    let minn = getRandomInt(0, 1000) % 2 ? min - .000008 : min + .000008;
    let maxx = getRandomInt(0, 1000) % 2 ? max - .000008 : max + .000008;
    return Math.random() * (maxx - minn) + minn;
  }

  const [currentLocation, setCurrentLocation] = useState(null)
  const [running, setRunning] = useState(false)
  let [rad, setRad] = useState([])
  const { routeId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoaded2, setIsLoaded2] = useState(false);
  const [response, setResponse] = useState(null);
  const [lavas, setLavas] = useState([]);
  const [redirect, setRedirect] = useState(false)
  const increment = useRef(null);
  
  const route = useSelector(state => state.routes.route);
  const origin = useSelector(state => `${state.routes.route.startLat},${state.routes.route.startLong}`);
  const start = useSelector(state => ({ 'lat': state.routes.route.startLat, 'lng': state.routes.route.startLong }));
  const end = useSelector(state => ({ 'lat': state.routes.route.endLat, 'lng': state.routes.route.endLong }));
  const destination = useSelector(state => `${state.routes.route.endLat},${state.routes.route.endLong}`)
  const apiKey = useSelector(state => state.routes.apiKey)
  // const center = useSelector( state =>
  // {
  //   return {
  //     lat: state.routes.route.startLat,
  //     lng: state.routes.route.startLong,
  //   }
  // })

  useEffect(() => {
    dispatch(workoutsAction.workoutsSearch(routeId))
    .then(() => setIsLoaded(true))
  }, [dispatch])
  
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
    
    target = end
    
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

  let count = -1;
  function lavaFlowing() {
    increment.current = setInterval(function () {
      setRad((rad) => rad.concat([getRandomInt(80, 220)]))
      setLavas((lavas) => lavas.concat([     {
        lat: getRandomNum(route.startLat, route.endLat),
        lng: getRandomNum(route.startLong, route.endLong),
      }]))
    }, 5000);
  }

  const runRoute = () => {
    setRunning(true)
    lavaFlowing();
  };

  const stopRoute = () => {
    setRunning(false)
    clearInterval(increment.current)
    setLavas([])
  };

  const deleteRoute = async (e) => {
    e.preventDefault();
    let id = route.id;
      dispatch(routesAction.routeDelete({ id }))
      .then(() => setRedirect(true))
  };
  
  function homeRoutes() {
    if (redirect) {
      return <Redirect to='/routes' />
    }
  }
  
  useEffect(() => {
    dispatch(routesAction.routeSearch(routeId))
      .then(() => setCurrentLocation(start))
      .then(() => setIsLoaded2(true))
  }, [])

  return isLoaded2 && currentLocation && isLoaded &&(
    <div className='single__route__container'>
      {homeRoutes()}
        <h1 className="route__p__name">{ route.name }</h1>
        <div className="main__div__map-container">
        <LoadScript
            libraries={["visualization"]}
            googleMapsApiKey={apiKey}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              // center={center}
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
                {lavas ? (
                  lavas.map((lava) => {
                    count += 1
                    return (
                      <>
                     <Circle
                    // required
                    center={lava}
                      // required
                    options={{
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.4,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    clickable: false,
                    draggable: false,
                    editable: false,
                    radius: rad[count],
                    zIndex: 1,
                      }}
                        />
                      <Marker
                        key={lava.id}
                        draggable={false}
                        position={lava}
                        icon={'https://img.icons8.com/officexs/16/000000/volcano.png'}
                      />
                    </>
                    )
                  })
                ) : null }
             </>
                :
              null}
            </GoogleMap>
          </LoadScript>
      </div>
      <div className='button-holders'>
          <button onClick={runRoute} className="single__route__run__button">Run Route</button>
          <button onClick={stopRoute} className="single__route__run__button">Stop Run</button>
          <button onClick={deleteRoute} className="single__route__run__button">Delete Route</button>
        </div>
      </div>
    )
}

export default SingleRoute;
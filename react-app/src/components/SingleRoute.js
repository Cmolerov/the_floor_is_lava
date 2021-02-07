import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker, Circle } from '@react-google-maps/api';
// import './SingleRoute.css'

import { Modal } from '../context/Modal';
import SingleWorkoutStats from './SingleWorkoutStats/SingleWorkoutStats';

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

  const [showModal, setShowModal] = useState(false); 
  const [currentLocation, setCurrentLocation] = useState(null)
  const [running, setRunning] = useState(false)
  let [rad, setRad] = useState([])
  const { routeId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoaded2, setIsLoaded2] = useState(false);
  const [response, setResponse] = useState(null);
  const [lavas, setLavas] = useState([]);
  const [beginning, setBeginning] = useState(null);
  const [ending, setEnding] = useState(null)
  const [finished, setFinished] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const increment = useRef(null);
  const [totalSeconds, setTotalSeconds] = useState('00');
  const [totalMinutes, setTotalMinutes] = useState('00');
  const [totalHours, setTotalHours] = useState('00');
  const [time, setTime] = useState('');
  const [distance, setDistance] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  
  const route = useSelector(state => state.routes.route);
  const origin = useSelector(state => `${state.routes.route.startLat},${state.routes.route.startLong}`);
  const start = useSelector(state => ({ 'lat': state.routes.route.startLat, 'lng': state.routes.route.startLong }));
  const end = useSelector(state => ({ 'lat': state.routes.route.endLat, 'lng': state.routes.route.endLong }));
  const destination = useSelector(state => `${state.routes.route.endLat},${state.routes.route.endLong}`)
  const apiKey = useSelector(state => state.routes.apiKey)
  const workouts = useSelector(state => state.workouts.workouts)
  const completed = useSelector(state => state.workouts.completed)
  const fastestTime = useSelector(state => state.workouts.fastestTime)

  useEffect(() => {
    dispatch(workoutsAction.workoutsSearch(routeId))
    .then(() => setIsLoaded(true))
  }, [dispatch])

  // useEffect(() => {
  //   if (!showModal) {
  //     setDistance(null)
  //   }
  // },[showModal])

  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const pos = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         };
  //         setCurrentLocation(pos)
  //       }, (err) => {
  //         showError(err)
  //       })
  //   } else {
  //     alert("Try another browser for geolocation services")
  //   }
  // }
  
  // function showError(error) {
  //   switch(error.code) {
  //     case error.PERMISSION_DENIED:
  //       alert("You must allow location services to use this app")
  //       break;
  //     case error.POSITION_UNAVAILABLE:
  //       alert("Location information is unavailable.")
  //       break;
  //     case error.TIMEOUT:
  //       alert("The request to get user location timed out.")
  //       break;
  //     case error.UNKNOWN_ERROR:
  //       alert("An unknown error occurred.")
  //       break;
  //     default:
  //       break;
  //   }
  // }

    //TEST FOR CURRENT MOVEMENT

  let movementId, target, options;
  let timer;

    function success(pos) {
      var crd = pos.coords;
      setCurrentLocation({ 'lat': crd.latitude, 'lng': crd.longitude })
    
      if (target.lat === crd.latitude && target.lng === crd.longitude) {
        alert('You beat the volcano!');
        setFinished(true)
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
  
    // movementId = navigator.geolocation.watchPosition(success, error, options)
    // console.log("THIS IS THE MOVEMENT!?!?!?", movementId)
    // console.log("THIS IS WHERE I AM!", currentLocation)
      
      //END TEST FOR CURRENT MOVEMENT
  
  useEffect(() => {
    timer = setTimeout(() => {
      movementId = navigator.geolocation.watchPosition(success, error, options)
    }, 5000)
  }, [])

  let travelMode = 'WALKING'

  const containerStyle = {
    width: '510px',
    height: '280px'
  };

  const mapOptions = {
    disableDefaultUI: true
  }
  
  function directionsCallback(response) {
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response)
      } else {
        // console.log('response: ', response)
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
    }, 10000);
  }
  
useEffect(() => {
  let setIntervalReturn;

  if (isActive) {
    setIntervalReturn = setInterval(() => {
      const seconds = counter % 60;
      const minutes = Math.floor(counter / 60);
      const hours = Math.floor(counter / 3600);

      const finSeconds = String(seconds).length === 1 ? `0${seconds}`: seconds;
      const finMinutes = String(minutes).length === 1 ? `0${minutes}`: minutes;
      const finHours = String(hours).length === 1 ? `0${hours}`: hours;

      setTotalSeconds(finSeconds);
      setTotalMinutes(finMinutes);
      setTotalHours(finHours);
      setTime(`${totalHours}:${totalMinutes}:${totalSeconds}`);

      setCounter(counter => counter + 1);
    }, 1000)
  }

    return () => clearInterval(setIntervalReturn);
  }, [isActive, counter])


  const runRoute = () => {
    setBeginning(currentLocation)
    setIsActive(true)
    // timer()
    setRunning(true)
    lavaFlowing();
  };

  const stopRoute = (e) => {
    navigator.geolocation.clearWatch(movementId)
    clearTimeout(timer)
    setIsActive(false)
    setEnding(currentLocation)
    setRunning(false)
    clearInterval(increment.current)
    setLavas([])
    workoutSubmit(e)
  };

  const workoutSubmit = async (e) => {
    e.preventDefault();
      const startLat = beginning.lat
      const startLong = beginning.lng
      const endLat = currentLocation.lat
      const endLong = currentLocation.lng
    let isCompleted = false;
    if (endLat === route.endLat && endLong === route.endLong) {
        isCompleted = true
    }
    let proxyUrl = 'https://cors-anywhere-dale.herokuapp.com/'
    let data = await fetch(proxyUrl + `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&mode=walking&origins=${startLat},${startLong}&destinations=${endLat}%2C${endLong}&key=${apiKey}`)
    let resp = await data.json()
    setDistance(resp.rows[0].elements[0].distance.text)
    let dist = resp.rows[0].elements[0].distance.text
    setShowModal(true)
    dispatch(workoutsAction.workoutAdd({ time, isCompleted, endLong, startLat, startLong, endLat, routeId, dist }))
    // .then(() => setDistance(null))
};

  const deleteRoute = async (e) => {
    e.preventDefault();
    let id = route.id;
      dispatch(routesAction.routeDelete(id))
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

  return isLoaded2 && isLoaded && (
    <div className='single-route'>
      <div className='single-route-header'>
        <h1 className="route__p__name">{route.name}</h1>
      </div>
  <div className='single-route-holder'>
    {homeRoutes()}
        <div className='single-route-workout-container'>
          <div className='single-route-workout-info-header'>
            <h1>Workouts</h1>
          </div>
          <div className='workout-info'>
            <h2>Overview</h2>
            <p>Attempted Route <b>{ Object.keys(workouts).length }</b> time(s)</p>
            <p>Completed Route <b>{ completed }</b> time(s)</p>
            <p>Fastest time completed: <b>{ fastestTime }</b></p>
          </div>
          <div className='workouts-details'>
            <h2>Log</h2>
            <table id="workouts-log">
              <tr>
                <th>Date</th>
                <th>Speed</th>
                <th>Distance</th>
              </tr>
              {Object.values(workouts).map((workout, idx) => {
                let dateArr = workout.createdAt.split(' ')
                let time;
                if (workout.time[0] === '0' && workout.time[1] === '0') {
                  time = workout.time.slice(3)
                } else {
                  time = workout.time
                }
                return (
                <tr key={idx}>
                    <td>{`${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`}</td>
                    <td>{time}</td>
                    <td>{workout.distance}</td>
                </tr>
              )
              })
              }
            </table>
          </div>
      </div>
    <div className='single__route__container'>
        <div className="main__div__map-container">
        <LoadScript
            // libraries={["visualization"]}
            googleMapsApiKey={apiKey}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              options={mapOptions}
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
                      travelMode: travelMode,
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
                      // disableDefaultUI: true,
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
          {currentLocation.lat ? 
      <div className='button-holders'>
          <button onClick={runRoute} className="single__route__run__button">Run Route</button>
          <button onClick={stopRoute} className="single__route__run__button">Stop Run</button>
          <button onClick={deleteRoute} className="single__route__run__button">Delete Route</button>
        </div>
            :
            null
        }
      </div>
      </div>
      <Modal routeId={routeId} open={showModal} onClose={() => setShowModal(false)} >
        <SingleWorkoutStats open={showModal} onClose={() => setShowModal(false)} finished={finished} time={time} distance={distance} routeDistance={route.distance}/>
        </Modal>
      </div>
    )
}

export default SingleRoute;
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

import * as routesAction from '../store/routes'

function NewRoute(props) {
  const userId = props.user.id
  const dispatch = useDispatch()
  const apiKey = useSelector(state => state.routes.apiKey)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [id, setId] = useState(0);
  const [label, setLabel] = useState(false)
  const [ markers, setMarkers ] = useState([]);
  const [ myMap, setMyMap ] = useState(null);
  const [center, setCenter] = useState(null);
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [redirect, setRedirect] = useState(false)

  const routeSubmit = async (e) => {
    e.preventDefault();
    if (markers.length === 2) {

      const startLat = markers[0].coords.lat
      const startLong = markers[0].coords.lng
      const endLat = markers[1].coords.lat
      const endLong = markers[1].coords.lng
      dispatch(routesAction.routeAdd({ name, description, userId, startLat, startLong, endLat, endLong, apiKey }))
      .then(() => setRedirect(true))
    }
};

  useEffect(() => {
    dispatch(routesAction.routeSearch(8))
  }, [dispatch])

  useEffect(() => {
    getLocation()
  }, [])
  
  useEffect(() => {
    console.log(markers)
}, [markers])

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(pos)
          setCenter(pos)
        }, (err) => {
          showError(err)
        })
    } else {
      alert("Try another browser for geolocation services")
    }
  }
  
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("You must allow location services to use this app")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
      default:
        break;
    }
  }

  const addMarker = (coords) => {
    if (coords !== currentLocation) {
      setLabel("End")
    }
    setId((id)=>id+1);
    setMarkers((markers) => markers.concat([{ coords, id }]))
  }

  const updateName = (e) => {
    setName(e.target.value);
  };
  
  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  function homeRoutes() {
    if (redirect) {
      return <Redirect to='/routes' />
    }
  }

  return (
    <div className='new__route__container'>
      {homeRoutes()}
      <h1>New Route</h1>
      {center ? 
      <div>
      <LoadScript
      googleMapsApiKey={apiKey}
      >
        <GoogleMap
          mapContainerStyle={{
            height: "50vh",
            width: "50vw",
            margin: "20px",
          }}
          zoom={12}
          center={center}
          onLoad={map => {
            addMarker(currentLocation)
            setMyMap(map)
            }
          }
          onClick={(e)=> markers.length < 2 ? addMarker(e.latLng.toJSON()) : null}
    >{markers ? (
      markers.map((marker) => {
        return (
          <Marker
            key={marker.id}
            draggable={true}
            position={marker.coords}
            onDragEnd={e => marker.coords = e.latLng.toJSON()}
            label={marker.id === 0 ? { text: "start", color: 'rgba(214, 140, 140, 0.9)'} : null}
            icon={marker.id === 0 ? 'https://img.icons8.com/officexs/30/000000/volcano.png' : 'https://img.icons8.com/fluent-systems-filled/24/000000/finish-flag.png'}
          />
        )
      })
    ) : null }
    </GoogleMap>
    </LoadScript>
  </div>
    :
    null
      }
    <form className="form__new__route" onSubmit={routeSubmit}>
      <div>
      <label htmlFor="name"></label>
      <input
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          required={true}
          onChange={updateName}
      />
        </div>
        <div>
          <label htmlFor="description"></label>
          <input
              name="description"
              type="textarea"
              placeholder="Description"
              value={description}
              onChange={updateDescription}
          />
        <button className="new-route__button__create" type="submit">Create Route</button>
      </div>
    </form>
  </div>
  )
      
}

export default NewRoute;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker} from '@react-google-maps/api';

import * as routesAction from '../store/routes'

function UsersList() {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  const routes = useSelector(state => state.routes.routes)
  const apiKey = useSelector(state => state.routes.apiKey)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [id, setId] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false)
  const [label, setLabel] = useState(false)
  const [ markers, setMarkers ] = useState([]);
  const [ myMap, setMyMap ] = useState(null);
  const [center, setCenter] = useState(null);
  let start = "start"
  let end = "end"

  useEffect(() => {
    dispatch(routesAction.routesSearch(1))
    .then(() => setIsLoaded(true))
  }, [dispatch])

  useEffect(() => {
    dispatch(routesAction.routeSearch(8))
  }, [dispatch])

  useEffect(() => {
    console.log(markers)
  }, [markers])

  useEffect(() => {
    console.log(currentLocation)
  }, [currentLocation])

  useEffect(() => {
    getLocation()
}, [])

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

  return isLoaded && center &&(
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
  )

  // return renderMap();
}

export default UsersList;

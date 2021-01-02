import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import * as routesAction from '../store/routes'
import './Routes.css'
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
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    dispatch(routesAction.routesSearch(id))
      .then(() => setIsLoaded(true))
  }, [dispatch])

  function updateRedirect() {
    setRedirect(true)
  }

  function newRoute() {
    if (redirect) {
      return <Redirect to='/routes/new' />
    }
  }

  return isLoaded &&(
    <>
      {newRoute()}
      <div className="routes__div__banner">
        <h1>My Routes</h1>
      <button className="routes__button__new-route" onClick={updateRedirect}>Create New Route</button>
      </div>
      <div>{
        Object.values(routes).map((route, idx) => {
          const center = {
                          lat: route.startLat,
                          lng: route.startLong
                        };
          return (
              <div key={idx} className="main__div__container">
                <div className='routes__card__container'>
                  <NavLink className='navlinks' to={`/routes/${route.id}`}>
                    <div className='routes__map-container'>
                      <div className='routes__map'>
                        <div className='google__map-container'>
                          <LoadScript
                            googleMapsApiKey={apiKey}
                          >
                          <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                          >
                          </GoogleMap>
                          </LoadScript>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                  <h2 className='routes__h2__name'>{route.name}</h2>
                  <div className='routes__div__description'><p>{route.description}</p></div>
                  <div className="routes__div__distance">
                    <h4>Distance ~ <span>{route.distance}</span></h4>
                    <span className="routes__span__createdAt">Created:<h5 className="routes__h5__createdAt">{route.createdAt}</h5></span>
                  </div>
                </div>
              </div>
            )
          })
        }
    </div>
  </>
  )
}

export default Routes;
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as routesAction from '../store/routes'

function Routes(props) {
  const id = props.user.id;
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const routes = useSelector(state => state.routes.routes);
  
  useEffect(() => {
    dispatch(routesAction.routesSearch(id))
      .then(() => console.log("THE STORE IS UP AND RUNNING"))
      .then(() => setIsLoaded(true))
  }, [dispatch])
  let userRoutes;
  
  if (routes) {
    userRoutes =
      Object.values(routes).map((route, idx) => {
      return (
        <div key={idx} className="routes__container">
            <NavLink className='routes__navlinks' to={`/routes/${route.id}`}>
              <div className='routes__map-container'>
                <img className='routs__image' src="https://i.pinimg.com/originals/fb/87/92/fb8792fafecad712d36172ce77469860.png" width="200" height="150"/>
              </div>
            </NavLink>
              <h3 className='routes__name'>{route.name}</h3>
          <div className='routes__description'><p>{route.description}</p></div>
          <p><h3>{ route.startLat }</h3>Distance</p>
          <p>{`${route.startLong}`}</p>
        </div>
      )
    })
  } else {
    userRoutes = <div className='routes__no-results-found'> No Results Found </div>
  }

  return isLoaded && (
    <div>
      {userRoutes}
    </div>
  )
}

export default Routes;
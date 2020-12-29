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
        <div key={idx} className='results-container__body__local'>
            <NavLink className='navlinks' to={`/routes/${route.id}`}>
              <div className='results-local-header'>
                {/* <img className='results-local-header__image' src={person.avatar /> */}
              <h1 className='results-local-username'>{route.name}</h1>
              </div>
            </NavLink>
            <div className='results-local-user__bio'><p>{route.description}</p></div>
        </div>
      )
    })
  } else {
    userRoutes = <div className='no-results-found'> No Results Found </div>
  }

  return isLoaded && (
    <div>
      {userRoutes}
    </div>
  )
}

export default Routes;
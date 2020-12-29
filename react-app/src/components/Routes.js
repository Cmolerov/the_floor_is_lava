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

  return isLoaded && (
    <div>Here's a route: {routes[1].name}
      <div>with a description: {routes[1].description}</div>
    </div>
  )
}

export default Routes;
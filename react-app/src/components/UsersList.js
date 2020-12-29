import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom";

import * as routesAction from '../store/routes'

function UsersList() {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const routes = useSelector(state => state.routes.routes)
  console.log("THESE ARE THE ROUTES", routes)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(routesAction.routesSearch(1))
      .then(() => console.log("THE STORE IS UP AND RUNNING"))
      .then(() => setIsLoaded(true))
  }, [dispatch])

  useEffect(() => {
    dispatch(routesAction.routeSearch(8))
  }, [dispatch])

  const userComponents = users.map((user) => {
    return (
        <li key={user.id}>
          <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
        </li>
    );
  });

  return isLoaded &&(
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
      <div>Here's a route: {routes[1].name}</div>
      <div>with a description: {routes[1].description}</div>
    </>
  );
}

export default UsersList;

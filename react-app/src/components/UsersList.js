import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom";

import * as routesAction from '../store/routes'

function UsersList() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch()

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
  }, [dispatch])

  const userComponents = users.map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;

import React, { useEffect, useState, Component } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import * as routesAction from '../store/routes'


function SingleRoute() {
  const { routeId } = useParams();
  console.log(routeId);
  return (
    <h1>test</h1>
  )
}

export default SingleRoute;
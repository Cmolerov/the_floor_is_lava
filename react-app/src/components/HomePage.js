import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import './HomePage.css';
import * as routesAction from '../store/routes'

export default function HomePage(props) {
  const id = props.user.id;
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const routes = useSelector(state => state.routes.routes);
  const apiKey = useSelector(state => state.routes.apiKey)
    
    useEffect(() => {
        dispatch(routesAction.routesSearch(id))
            .then(() => setIsLoaded(true))
      }, [dispatch])

    return isLoaded &&(
        <div className="homePage_container">
            <div className="homePage_container-left">
                <div className="homePage_container-left_top">
                    <h1>Profile</h1>
                </div>
                <div className="homePage_container-left_bottom">
                    <h1>This Week</h1>
                </div>
            </div>
            <div className="homePage_container-middle">
                <div className="homePage_container-middle-container">
                    <h1>Activity of the Week</h1>
                    <p>{routes[1].name}</p>
                </div>
            </div>
            <div className="homePage_container-right">
                <div className="homePage_container-left_top">
                    <h1>Explore New Routes</h1>
                </div>
                <div className="homePage_container-left_bottom">
                    <h1>Route of the Day</h1>
                </div>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
// import "./HomePage.css";
import * as routesAction from "../store/routes";
// import Calendar from "./Calendar";

export default function HomePage(props) {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const routes = useSelector((state) => state.routes.routes);
    const apiKey = useSelector(state => state.routes.apiKey);

    const containerStyle = {
        width: '250px',
        height: '150px',
        boxShadow: '0px 0px 2px 0.5px rgba(252, 82, 0, 0.7)'
    };

    const activityStyle = {
        width: '200px',
        height: '100px',
        // border: '1px solid rgba(252, 82, 0, 1)'
        boxShadow: '0px 0px 2px 0.5px rgba(252, 82, 0, 0.7)'
    };
    
    const mapOptions = {
        disableDefaultUI: true
      }

    // console.log("long-lat", routes)
    
    // const center = {
    //      lat: 25.96150673256875 ,
    //      lng: -80.39468729802157 
    //   };

    // let username = props.username

    useEffect(() => {
        if (props.authenticated) {
            dispatch(routesAction.routesSearch(props.user.id)).then(() =>
                setIsLoaded(true)
            );
        }
    }, [dispatch, props.authenticated]);

    // if (props.authenticated) {
    //     id = props.user ? props.user.id : null;
    //     username = props.user ? props.user.username : null;
    // }

    return (
        isLoaded && (
            <div className="homePage_container">
                <div className="homePage_container_container">
                    <div className="homePage_container-left">
                        <div className="homePage_container-left_top animate__animated animate__slideInLeft">
                            <div className="homePage_profile">
                                <h2 className="card__header--profile"> Profile</h2>
                                <p>{props.user.username}</p>
                                <p>Member since 2020</p>
                                <p>Routes Completed: 65</p>
                                <p>Avg. Miles per week: 28 mi</p>
                            </div>
                        </div>
                        <div className="homePage_container-left_bottom animate__animated animate__slideInLeft">
                            <div className="homePage_profile">
                                <h2 className="card__header">Upcoming Events</h2>
                                <p><a className="homePage__events" href="https://www.baa.org/2021-boston-marathon-will-not-take-place-april" target="_blank" rel="noreferrer">The Boston Marathon</a></p>
                                <p><a className="homePage__events" href="https://race.spartan.com/en/race/find-race?gclid=CjwKCAiA9vOABhBfEiwATCi7GEmfCuWs1DF7eo4YHQ2iigOjbh4ypmbDiV17qWyjSuLKql_NdquEIxoCxlQQAvD_BwE" target="_blank" rel="noreferrer">The Spartan Race </a></p>
                                <p><a className="homePage__events" href="https://www.eventbrite.com/e/pacifica-runners-st-patricks-day-virtual-5k-2021-tickets-137686380671" target="_blank" rel="noreferrer">Pacifica Runners St.Pattys</a></p>
                                <p><a className="homePage__events" href="https://www.cantonhalf.com/" target="_blank" rel="noreferrer">Canton Half Marathon</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="homePage_container-middle">
                        <div className="homePage_container-middle-container animate__animated animate__slideInUp">
                            <h2 className="homePage_activityHeader">
                                Activity of the Week
                            </h2>
                            <NavLink
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to={`/routes/${routes[1].id}`}
                            >
                                <div className="homePage_routesCard">
                                    <p>
                                        {routes[1].name} || Distance:{" "}
                                        {routes[1].distance}
                                    </p>
                                    {/* <p>Description: {routes[1].description}</p> */}
                                    <p>
                                        <p>Avg. Pace: 17 min</p>
                                    </p>
                                    <div className="homePage__routes--map-container">
                                        <LoadScript
                                            googleMapsApiKey={apiKey}
                                        >
                                            <GoogleMap
                                                options={mapOptions}
                                                mapContainerStyle={activityStyle}
                                                center={
                                                    {
                                                        lat: routes[1].startLat,
                                                        lng: routes[1].startLong
                                                    }
                                            }
                                            zoom={10}
                                            >
                                        </GoogleMap>
                                        </LoadScript>
                                    </div>
                                </div>
                            </NavLink>
                            <NavLink
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to={`/routes/${routes[2].id}`}
                            >
                                <div className="homePage_routesCard">
                                    <p>
                                        {routes[2].name} || Distance:{" "}
                                        {routes[2].distance}
                                    </p>
                                    <p>
                                        <p>Avg. Pace: 21 min</p>
                                    </p>
                                    <div className="homePage__routes--map-container">
                                        <LoadScript
                                            googleMapsApiKey={apiKey}
                                        >
                                            <GoogleMap
                                                options={mapOptions}
                                                mapContainerStyle={activityStyle}
                                                center={
                                                    {
                                                        lat: routes[2].startLat,
                                                        lng: routes[2].startLong
                                                    }
                                            }
                                            zoom={10}
                                            >
                                        </GoogleMap>
                                        </LoadScript>
                                    </div>
                                </div>
                            </NavLink>
                            <NavLink
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to={`/routes/${routes[3].id}`}
                            >
                                <div className="homePage_routesCard">
                                    <p>
                                        {routes[3].name} || Distance:{" "}
                                        {routes[3].distance}
                                    </p>
                                    <p>
                                        <p>Avg. Pace: 9 min</p>
                                    </p>
                                    {/* <p>Description: {routes[3].description}</p> */}    <div className="homePage__routes--map-container">
                                        <LoadScript
                                            googleMapsApiKey={apiKey}
                                        >
                                            <GoogleMap
                                                options={mapOptions}
                                                mapContainerStyle={activityStyle}
                                                center={
                                                    {
                                                        lat: routes[3].startLat,
                                                        lng: routes[3].startLong
                                                    }
                                            }
                                            zoom={10}
                                            >
                                        </GoogleMap>
                                        </LoadScript>
                                    </div>
                                </div>
                            </NavLink>
                            <NavLink
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to={`/routes/${routes[4].id}`}
                            >
                                <div className="homePage_routesCard">
                                    <p>
                                        {routes[4].name} || Distance:{" "}
                                        {routes[4].distance}
                                    </p>
                                    <p>
                                        <p>Avg. Pace: 94 min</p>
                                    </p>
                                    <div className="homePage__routes--map-container">
                                        <LoadScript
                                            googleMapsApiKey={apiKey}
                                        >
                                            <GoogleMap
                                                options={mapOptions}
                                                mapContainerStyle={activityStyle}
                                                center={
                                                    {
                                                        lat: routes[4].startLat,
                                                        lng: routes[4].startLong
                                                    }
                                            }
                                            zoom={10}
                                            >
                                        </GoogleMap>
                                        </LoadScript>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                    <div className="homePage_container-right">
                        <div className="homePage_container-right_top animate__animated animate__slideInRight">
                            <NavLink
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to={`/routes/${routes[9].id}`}
                            >
                                <div className="homePage_newRoutes">
                                    <h2 className="card__header">Explore New Routes</h2>
                                    <p>Path: {routes[9].name} </p>
                                    <p> Distance: {routes[9].distance}</p>
                                    <p>Avg. Time: 57 min</p>
                                    <div className='google__map-container--home'>
                                        {/* {console.log("++++++++++++++++++", routes[9].startLong)} */}
                                        <LoadScript
                                            googleMapsApiKey={apiKey}
                                        >
                                            <GoogleMap
                                                options={mapOptions}
                                                mapContainerStyle={containerStyle}
                                                center={
                                                    {
                                                        lat: routes[9].startLat,
                                                        lng: routes[9].startLong
                                                    }
                                            }
                                            zoom={10}
                                        >
                                        </GoogleMap>
                                        </LoadScript>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <NavLink
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                            to={`/routes/${routes[6].id}`}
                        >
                            <div className="homePage_container-right_bottom animate__animated animate__slideInRight">
                                <div className="homePage_routeOfDay">
                                    <h2 className="card__header">Route of the Day</h2>
                                    <p>{routes[6].name}</p>
                                    <p>Distance: {routes[6].distance}</p>
                                    <div className='google__map-container--home'>
                                        <LoadScript
                                                googleMapsApiKey={apiKey}
                                            >
                                            <GoogleMap
                                                    options={mapOptions}
                                                    mapContainerStyle={containerStyle}
                                                    center={
                                                        {
                                                            lat: routes[6].startLat,
                                                            lng: routes[6].startLong
                                                        }
                                                }
                                                zoom={10}
                                            >
                                            </GoogleMap>
                                            </LoadScript>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    );
}

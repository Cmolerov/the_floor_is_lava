import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
// import "./HomePage.css";
import * as routesAction from "../store/routes";

export default function HomePage(props) {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const routes = useSelector((state) => state.routes.routes);
    let id;
    let username;

    useEffect(() => {
        dispatch(routesAction.routesSearch(id)).then(() => setIsLoaded(true));
    }, [dispatch]);

    if (props.authenticated) {
        id = props.user ? props.user.id : null;
        username = props.user ? props.user.username : null;
    }

    return (
        isLoaded && (
            <div className="homePage_container">
                <div className="homePage_container_container">
                    <div className="homePage_container-left">
                        <div className="homePage_container-left_top animate__animated animate__slideInLeft">
                            <div className="homePage_profile">
                                <h2> Profile</h2>
                                <p>{username ? username : "Mr. Bean"}</p>
                                <p>Member since 2020</p>
                                <p>Routes Completed: 65</p>
                                <p>Avg. Miles per week: 28 mi</p>
                            </div>
                        </div>
                        <div className="homePage_container-left_bottom animate__animated animate__slideInLeft">
                            <div className="homePage_profile">
                                <h2>This Week</h2>
                            </div>
                        </div>
                    </div>
                    <div className="homePage_container-middle">
                        <div className="homePage_container-middle-container animate__animated animate__slideInUp">
                            <h2 className="homePage_activityHeader">Activity of the Week</h2>
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
                                    {/* <p>Description: {routes[2].description}</p> */}
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
                                    {/* <p>Description: {routes[3].description}</p> */}
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
                                    {/* <p>Description: {routes[4].description}</p> */}
                                </div>
                            </NavLink>
                        </div>
                    </div>
                    <div className="homePage_container-right">
                        <div className="homePage_container-left_top animate__animated animate__slideInRight">
                            <NavLink
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to={`/routes/${routes[9].id}`}
                            >
                                <div className="homePage_newRoutes">
                                    <h2>Explore New Routes</h2>
                                    <p>Path: {routes[9].name} </p>
                                    <p> Distance: {routes[9].distance}</p>
                                    <p>Avg. Time: 57 min</p>
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
                            <div className="homePage_container-left_bottom animate__animated animate__slideInRight">
                                <div className="homePage_routeOfDay">
                                    <h2>Route of the Day</h2>
                                    <p>{routes[6].name}</p>
                                    <p>Distance: {routes[6].distance}</p>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    );
}

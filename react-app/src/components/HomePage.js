import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import "./HomePage.css";
import * as routesAction from "../store/routes";

export default function HomePage(props) {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const routes = useSelector((state) => state.routes.routes);
    let id;

    useEffect(() => {
        dispatch(routesAction.routesSearch(id)).then(() => setIsLoaded(true));
    }, [dispatch]);

    if (props.authenticated) {
        id = props.user.id;
    }
    return (
        isLoaded && (
            <div className="homePage_container">
                <div className="homePage_container_container">
                    <div className="homePage_container-left">
                        <div className="homePage_container-left_top">
                            <div className="homePage_profile">
                                <h2> Profile</h2>
                                <p>Mr.Bean</p>
                                <p>Member since 2020</p>
                                <p>Routes Completed: 65</p>
                                <p>Avg. Miles per week: 28 mi</p>
                            </div>
                        </div>
                        <div className="homePage_container-left_bottom">
                            <h2>This Week</h2>
                        </div>
                    </div>
                    <div className="homePage_container-middle">
                        <div className="homePage_container-middle-container">
                            <h2>Activity of the Week</h2>
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
                        </div>
                    </div>
                    <div className="homePage_container-right">
                        <div className="homePage_container-left_top">
                            <div className="homePage_newRoutes">
                                <h2>Explore New Routes</h2>
                                <p>Path: {routes[9].name} </p>
                                <p> Distance: {routes[9].distance}</p>
                                <p>Avg. Time: 57 min</p>
                            </div>
                        </div>
                        <div className="homePage_container-left_bottom">
                            <div className="homePage_routeOfDay">
                                <h2>Route of the Day</h2>
                                <p>{routes[6].name}</p>
                                <p>Distance: {routes[6].distance}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

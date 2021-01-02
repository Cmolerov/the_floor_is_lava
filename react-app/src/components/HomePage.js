import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./HomePage.css";
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
                            <h2>Profile</h2>
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
                                    Name: {routes[1].name} || Distance:{" "}
                                    {routes[1].distance}
                                </p>
                                <p>Description: {routes[1].description}</p>
                            </div>
                            <div className="homePage_routesCard">
                                <p>
                                    Name: {routes[2].name} || Distance:{" "}
                                    {routes[2].distance}
                                </p>
                                <p>Description: {routes[2].description}</p>
                            </div>
                            <div className="homePage_routesCard">
                                <p>
                                    Name: {routes[3].name} || Distance:{" "}
                                    {routes[3].distance}
                                </p>
                                <p>Description: {routes[3].description}</p>
                            </div>
                            <div className="homePage_routesCard">
                                <p>
                                    Name: {routes[4].name} || Distance:{" "}
                                    {routes[4].distance}
                                </p>
                                <p>Description: {routes[4].description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="homePage_container-right">
                        <div className="homePage_container-left_top">
                            <h2>Explore New Routes</h2>
                        </div>
                        <div className="homePage_container-left_bottom">
                            <h2>Route of the Day</h2>
                            <p>{routes[6].name}</p>
                            <p>Distance: {routes[6].distance}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

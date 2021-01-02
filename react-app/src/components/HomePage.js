import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authenticate } from "../services/auth";
import "./HomePage.css";
import * as routesAction from "../store/routes";

export default function HomePage(props) {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const routes = useSelector((state) => state.routes.routes);

    useEffect(() => {
        let id;
        (async () => {
            const userData = await authenticate();
            if (!userData.errors) {
                console.log(userData);
                id = userData.id;
                }
        })()
            .then(() => {
                dispatch(routesAction.routesSearch(id))
                .then(() => setIsLoaded(true));
        })
    }, [dispatch]);

    // console.log(props)
    // if (props.authenticated) {
    //     id = props.user.id;
    // }
    return (
        isLoaded && (
            <div className="homePage_container">
                <div className="homePage_container_container">
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
                            <div className="homePage_routesCard">
                                <p>Name: {routes[1].name}</p>
                                <p>Description: {routes[1].description}</p>
                            </div>
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
            </div>
        )
    );
}

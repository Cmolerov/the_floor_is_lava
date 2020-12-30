import React from "react";

export default function HomePage() {
    return (
        <div className="homePage_container">
            <div className="homePage_container-left">
                <div className="homePage_container-left_top"></div>
                <div className="homePage_container-left_bottom"></div>
            </div>
            <div className="homePage_container-middle">
                <div className="homePage_container-middle-container">
                    <h1>Activity of the Week</h1>
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

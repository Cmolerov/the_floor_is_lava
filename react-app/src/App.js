import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
import Routes from "./components/Routes";
import WelcomePage from "./components/WelcomePage";
import HomePage from "./components/HomePage";
import SingleRoute from "./components/SingleRoute";
import Footer from "./components/Footer";

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            const userData = await authenticate();
            if (!userData.errors) {
                setAuthenticated(true);
                setUser(userData);
            }
            setLoaded(true);
        })();
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <NavBar setAuthenticated={setAuthenticated} />
            <Switch>
                <Route exact path="/welcome">
                    <WelcomePage
                        authenticated={authenticated}
                        setAuthenticated={setAuthenticated}
                    />
                </Route>
                <Route path="/login" exact={true}>
                    <LoginForm
                        authenticated={authenticated}
                        setAuthenticated={setAuthenticated}
                    />
                </Route>
                <Route path="/sign-up" exact={true}>
                    <SignUpForm
                        authenticated={authenticated}
                        setAuthenticated={setAuthenticated}
                    />
                </Route>
                <ProtectedRoute
                    path="/users"
                    exact={true}
                    authenticated={authenticated}
                >
                    <UsersList />
                </ProtectedRoute>
                <ProtectedRoute
                    path="/users/:userId"
                    exact={true}
                    authenticated={authenticated}
                >
                    <User />
                </ProtectedRoute>
                <ProtectedRoute
                    path="/routes"
                    exact={true}
                    authenticated={authenticated}
                >
                    <Routes user={user} />
                </ProtectedRoute>
                <ProtectedRoute
                    path="/routes/:routeId"
                    exact={true}
                    authenticated={authenticated}
                >
                    <SingleRoute />
                </ProtectedRoute>
                <ProtectedRoute
                    path="/"
                    exact={true}
                    authenticated={authenticated}
                >
                    <HomePage />
                </ProtectedRoute>
            </Switch>
            <Footer setAuthenticated={setAuthenticated} />
        </BrowserRouter>
    );
}

export default App;

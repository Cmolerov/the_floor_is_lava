import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./services/auth";
import Routes from "./components/Routes";
import WelcomePage from "./components/WelcomePage";
import HomePage from "./components/HomePage";
import SingleRoute from "./components/SingleRoute";
import Footer from "./components/Footer";
import NewRoute from "./components/NewRoute";
import Calendar from "./components/Calendar";

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
            <NavBar
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
            />
            <Switch>
                {/* <Route exact path="/welcome">
                    <WelcomePage
                        authenticated={authenticated}
                        setAuthenticated={setAuthenticated}
                    />
                </Route> */}
                <Route path="/login" exact={true}>
                    <LoginForm
                        authenticated={authenticated}
                        setAuthenticated={setAuthenticated}
                        setUser={setUser}
                    />
                </Route>
                <Route path="/sign-up" exact={true}>
                    <SignUpForm
                        authenticated={authenticated}
                        setAuthenticated={setAuthenticated}
                        setUser={setUser}
                    />
                </Route>
                <ProtectedRoute
                    path="/routes/new"
                    exact={true}
                    authenticated={authenticated}
                >
                    <NewRoute user={user} />
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
                <Route path="/" exact={true} authenticated={authenticated}>
                    {authenticated ? (
                        <HomePage authenticated={authenticated} user={user} />
                    ) : (
                        <WelcomePage
                            authenticated={authenticated}
                            setAuthenticated={setAuthenticated}
                        />
                    )}
                </Route>
            </Switch>
            <Footer setAuthenticated={setAuthenticated} />
        </BrowserRouter>
    );
}

export default App;

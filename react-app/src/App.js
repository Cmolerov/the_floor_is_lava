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

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            if (!authenticated) {
                const userData = await authenticate();
                if (!userData.errors) {
                    setUser(userData);
                    setAuthenticated(true);
                }
                setLoaded(true);
            }
        })();
    },);

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
                        user={user}
                        setUser={setUser}
                    />
                </Route>
                <Route path="/sign-up" exact={true}>
                    <SignUpForm
                        authenticated={authenticated}
                        setAuthenticated={setAuthenticated}
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
                <ProtectedRoute
                    path="/"
                    exact={true}
                    authenticated={authenticated}
                >
                    {authenticated ? 
                    <HomePage user={user} setUser={setUser} authenticated={authenticated} />
                    :
                    <WelcomePage
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
                />
                }
                </ProtectedRoute>
            </Switch>
            <Footer setAuthenticated={setAuthenticated} />
        </BrowserRouter>
    );
}

export default App;

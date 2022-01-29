import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./pages/ProtectedRoute";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
            <Header/>
                <main>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <ProtectedRoute exact path="/profile" component={Profile} />
                        <ProtectedRoute path="/edit-profile/:id" component={EditProfile} />
                    </Switch>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;

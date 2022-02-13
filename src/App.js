import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import User from "./components/User/User";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/users/:userId" component={User}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;

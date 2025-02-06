import './App.css';
import TaskListComponent from "./components/TaskListComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {

    return (
        <div className="App">

            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path="/" element={<TaskListComponent/>}></Route>
                    {/*<Route path="/add" element={<div/>}></Route>*/}
                </Routes>
                <FooterComponent/>
            </BrowserRouter>
        </div>
    );
}

export default App;

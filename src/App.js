import { BrowserRouter, Routes, Route } from 'react-router-dom';

import store from './components/store/Store';
import ROUTES from './components/ROUTES/Routes';
import Header from './components/header/Header';

import Calculator from './components/calculator/Calculator';
import Graph2D from './components/graph2D/Graph2D';
import Graph3D from './components/graph3D/Graph3D';
import Page404 from './components/page404/Page404';

import window from './modules/graph2D/functions/functions';

import './App.css';

// постоянная перерисовка сцены
window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div className="header-row"><Header ROUTES = {ROUTES}/></div>
                <Routes>
                    <Route exact path = {ROUTES.MAIN.path} element = {<Calculator/>}/>
                    <Route exact path = {ROUTES.CALCULATOR.path} element = {<Calculator/>}/>
                    <Route exact path = {ROUTES.GRAPH2D.path} element = {<Graph2D store = {store}/>}/>
                    <Route exact path = {ROUTES.GRAPH3D.path} element = {<Graph3D/>}/>
                    <Route path="*" element = {<Page404/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

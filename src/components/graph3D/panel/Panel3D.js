import { useState } from 'react';

import cone from '../../../modules/graph3D/figures/cone';
import cube from '../../../modules/graph3D/figures/cube';
import sphera from '../../../modules/graph3D/figures/sphera';
import cylinder from '../../../modules/graph3D/figures/cylinder';
import tor from '../../../modules/graph3D/figures/tor';
import ellipsoid from '../../../modules/graph3D/figures/ellipsoid';
import ellipticalCylinder from '../../../modules/graph3D/figures/ellipticalCylinder';
import ellipticalParaboloid from '../../../modules/graph3D/figures/ellipticalParaboloid';
import hyperbolicCylinder from '../../../modules/graph3D/figures/hyperbolicCylinder';
import hyperbolicParaboloid from '../../../modules/graph3D/figures/hyperbolicParaboloid';
import parabolicCylinder from '../../../modules/graph3D/figures/parabolicCylinder';
import oneSheetedHyperboloid from '../../../modules/graph3D/figures/oneSheetedHyperboloid';
import twoSheetedHyperboloid from '../../../modules/graph3D/figures/twoSheetedHyperboloid';
import surprise from '../../../modules/graph3D/figures/surprise';

import Planets from "../../../modules/graph3D/figures/Planets";

import './panel3D.css';

function Panel3D(props) {
    const { 
        flags, 
        figures,
        locationFigure,
        move,
        transform,
        animations, 
        LIGHT
    } = props;

    let planets = new Planets();

    const [figuresLength, setFiguresLength] = useState(figures.length);  

    // рисовать/не рисовать точки
    const points = (e) => {
        flags.drawPoints = e.target.checked;
    }

    // рисовать/не рисовать ребра
    const edges = (e) => {
        flags.drawEdges = e.target.checked;
    }

    // рисовать/не рисовать полигоны
    const polygons = (e) => {
        flags.drawPolygons = e.target.checked;
    }

    // включить/выключить анимацию
    const anim = (e) => {
        flags.animation = e.target.checked;
    }

    // рисовать/не рисовать тени
    const shadow = (e) => {
        flags.dark = e.target.checked;
    }

    // двигать/не двигать свет
    const shine = (e) => {
        flags.light = e.target.checked;
    }

    // выбор фигуры
    const changeFigure = (e) => {
        let f = 0;
        switch (e.target.value) {
            case 'фигуры':
                f = 1;
                break;
            case 'конус':
                figures.push(new cone());
                break;
            case 'куб':
                figures.push(new cube());
                break;
            case 'сфера':
                figures.push(new sphera());
                break;
            case 'цилиндр':
                figures.push(new cylinder());
                break;
            case 'тор':
                figures.push(new tor());
                break;
            case 'эллипсоид':
                figures.push(new ellipsoid());
                break;
            case 'эллиптический цилиндр':
                figures.push(new ellipticalCylinder());
                break;
            case 'эллиптический параболоид':
                figures.push(new ellipticalParaboloid());
                break;
            case 'гиперболический цилиндр':
                figures.push(new hyperbolicCylinder());
                break;
            case 'гиперболический параболоид':
                figures.push(new hyperbolicParaboloid());
                break;
            case 'параболический цилиндр':
                figures.push(new parabolicCylinder());
                break;
            case 'однополостной гиперболоид':
                figures.push(new oneSheetedHyperboloid());
                break;
            case 'двуполостной гиперболоид':
                figures.push(new twoSheetedHyperboloid());
                break;
            case 'сюрприз 🎂':
                figures.push(new surprise());
                break;
            case 'солнечная система 🌌':
                planets.figures.forEach(figure => {
                    figures.push(figure);
                });
                planets.animations.forEach(anim => {
                    animations.push(anim)
                });
                break;
            default:
                break;
        }
        // вывод фигур по цилиндру
        if (f === 0) {
            const location = locationFigure;
            // определение расположения фигуры в цилиндре
            const matrix = move(
                location.R * Math.cos(location.t),
                location.R * Math.sin(location.t),
                location.k
            );
            // перемещение фигуры в свою позицию
            if (location.t < Math.PI * 2) {
                figures[figures.length - 1].points.forEach(point => {
                    transform(matrix, point);
                });
                location.t += location.dt;
            }
            // расстояние между фигурами в тройке
            if (location.t === Math.PI * 2) {
                location.t = 0;
            }
            // расстояние между тройками фигур
            if (figures.length % 3 === 0) {
                location.k += 80;
            }
        }
    }

    // сила освещения
    const setPowerLight = (e) => {
        LIGHT.lumen = e.target.value;
    }

    // удалить фигуру
    const deleteFigure = () => {
        if (figures.length > 0) {
            figures.pop();
            setFiguresLength(figures.length);
            // регулирование расположения следующих добавленных фигур
            locationFigure.t -= locationFigure.dt;
            if (figures.length % 3 !== 0 && figures.length + 1 >= 3) {
                locationFigure.k -= 80;
            }
        }
    }

    // изменить цвет фигур 
    const setColor = (e) => {
        const color = e.target.value;
        for (let i = 0; i < figures.length; i++) {
            figures[i].polygons.forEach(poly => {
                poly.color = poly.hexToRgb(color);
            });
        }
    }

    return (
        <div className="panel3d">
            <div className="checkbox">
                <label>
                    <input  
                        className="check3D" 
                        type="checkbox" 
                        onChange={points} 
                        defaultChecked={flags.drawPoints}
                    ></input>
                    &nbsp;&nbsp;точки
                </label> 
                <label>
                    <input 
                        className="check3D" 
                        type="checkbox" 
                        onChange={edges} 
                        defaultChecked={flags.drawEdges}
                    ></input>
                    &nbsp;&nbsp;ребра
                </label>
                <label>
                    <input  
                        className="check3D" 
                        type="checkbox" 
                        onChange={polygons} 
                        defaultChecked={flags.drawPolygons}
                    ></input>
                    &nbsp;&nbsp;полигоны
                </label>
                <label>
                    <input 
                        className="check3D" 
                        type="checkbox" 
                        onChange={anim} 
                        defaultChecked={flags.animation}
                    ></input>
                    &nbsp;&nbsp;анимация
                </label>
                <label>
                    <input
                        className="check3D" 
                        type="checkbox" 
                        onChange={shadow} 
                        defaultChecked={flags.dark}
                    ></input>
                    &nbsp;&nbsp;тени
                </label>
                <label>
                    <input
                        className="check3D" 
                        type="checkbox" 
                        onChange={shine} 
                        defaultChecked={flags.light}
                    ></input>
                    &nbsp;&nbsp;свет
                </label>  
            </div>
            <div className="figures-delete">
                <select 
                    className="figures" 
                    onChange={changeFigure}
                >
                    <option>фигуры</option>
                    <option>конус</option>
                    <option>куб</option>
                    <option>сфера</option>
                    <option>цилиндр</option>
                    <option>тор</option>
                    <option>эллипсоид</option>
                    <option>эллиптический параболоид</option>
                    <option>эллиптический цилиндр</option>
                    <option>гиперболический цилиндр</option>
                    <option>гиперболический параболоид</option>
                    <option>параболический цилиндр</option>
                    <option>однополостной гиперболоид</option>
                    <option>двуполостной гиперболоид</option>
                    <option>сюрприз 🎂</option>
                    <option>солнечная система 🌌</option>
                </select>
                <button className="delete" onClick={deleteFigure}>удалить</button>
            </div>
            <div className="powerlight-color">
                <input 
                    className="powerlight" 
                    type="range" 
                    min="25000" 
                    max="100000"
                    onChange={setPowerLight}
                    defaultValue={LIGHT.lumen}
                ></input>
                <input className="color" type="color" onChange={setColor} defaultValue="#ffc8fc"></input>
            </div>
        </div>
    );
}

export default Panel3D;
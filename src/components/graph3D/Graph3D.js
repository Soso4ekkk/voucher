import { useEffect, useState } from 'react';

import Canvas from '../../modules/canvas/Canvas';
import Math3D from '../../modules/graph3D/Math';
import Panel3D from './panel/Panel3D';

import Light from '../../modules/graph3D/entities/Light';
import Point from '../../modules/graph3D/entities/Point';

import './graph3D.css';

const spaceCanvas = require('../../images/space.jpg');
const cloudsCanvas = require('../../images/cloudsCanvas.jpg');

function Graph3D() {
    let canvas;
    let math;

    const WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            CAMERA: new Point(0, 0, -50),
            DISPLAY: new Point(0, 0, -30),
            P1: new Point(-10, 10, -30), // левый верхний угол
            P2: new Point(-10, -10, -30), // левый нижний угол
            P3: new Point(10, -10, -30) // правый нижний угол
    };

    // флажок мышки
    let canMove = false;

    // флажки чекбоксов
    let flags = {
        drawPoints: false,
        drawEdges: false,
        drawPolygons : true,
        animation: false,
        dark: false,
        light: false
    };

    // источник света
    let LIGHT = new Light(-20, 20, 0, 37500);

    // массивы фигур и связанных анимаций
    let figures = [];
    let animations = [];

    // вывод нескольких фигур одновременно
    let locationFigure = {
        R: 22,
        dt: Math.PI * 2 / 3,
        t: 0,
        k: 0,
    };

    // вращение фигур
    let dx = 0;
    let dy = 0;

    // основной фон канваса
    let clouds = new Image();
    clouds.src = cloudsCanvas;

    // фон солнечной системы для анимации
    let space = new Image();
    space.src = spaceCanvas;

    // переменные для FPS
    let fps = 0;
    let FPS = 0;
    let lastTimestamp = Date.now();

    const [figuresLength, setFiguresLength] = useState(figures.length);

    useEffect(() => {
        canvas = new Canvas({
            WIN: WIN,
            id: 'canvas3D',
            width: 580,
            height: 580
        });

        math = new Math3D({
            WIN: WIN
        }); 

        const animLoop = () => {
            // вычисление FPS
            fps++;
            const timestamp = Date.now();
            if (timestamp - lastTimestamp >= 1000) {
                FPS = fps;
                fps = 0;
                lastTimestamp = timestamp;
            }
            // вывод всей сцены
            math.calcPlaneEquation(WIN.CAMERA, WIN.DISPLAY); // плоскость экрана
            math.calcWinVectors(); // векторы экрана
            goAnimation(animations); // солнечная система
            run();
            window.requestAnimFrame(animLoop);
        }
        animLoop();
    });

    // перенос фигур и света
    const keyDownHandler = (e) => {
        switch (e.keyCode) {
            case 65: // a - сцена влево
                return transformScene(math.move(1, 0, 0));
            case 68: // d - сцена вправо
                return transformScene(math.move(-1, 0, 0));
            case 87: // w - сцена вверх
                return transformScene(math.move(0, -1, 0));
            case 83: // s - сцена вниз
                return transformScene(math.move(0, 1, 0));
            case 37: // стрелка влево - свет влево
                return moveLight(-1, 0, 0);
            case 39: // стрелка вправо - свет вправо
                return moveLight(1, 0, 0);
            case 38: // стрелка вверх - свет вверх
                return moveLight(0, 1, 0);
            case 40: // стрелка вниз - свет вниз
                return moveLight(0, -1, 0);
            default:
                break;
        }
    }

    // вынос общего из метода переноса света
    const moveLight = (dx, dy, dz) => {
        if (flags.light) {
            LIGHT.x += dx;
            LIGHT.y += dy;
            LIGHT.z += dz;
        }
    }

    // зум
    const wheel = (e) => {
        const delta = (e.deltaY > 0) ? 0.3 : -0.3;
        transformScene(math.move(
            WIN.CAMERA.x * delta,
            WIN.CAMERA.y * delta,
            WIN.CAMERA.z * delta
        ));
    }

    /************************************ вращения ************************************/
    const mouseMove = (e) => {
        const gradus = Math.PI / 180 / 4; 
        const matrix1 = math.rotateOy((dx - e.clientX) * gradus);
        const matrix2 = math.rotateOx((dy - e.clientY) * gradus);
        const matrix = math.multMatrixes(matrix1, matrix2);
        if (canMove) {
            if (flags.light) {
                LIGHT.x -= canvas.sx(dx - e.clientX);
                LIGHT.y += canvas.sy(dy - e.clientY);
            } else transformScene(matrix);
        }
        dx = e.clientX;
        dy = e.clientY;
    }

    const mouseUp = () => {
        canMove = false;
    }

    const mouseDown = () => {
        canMove = true;
    }

    /**********************************************************************************/

    // изменение сцены
    const transformScene = (matrix) => {
        math.transform(matrix, WIN.CAMERA);
        math.transform(matrix, WIN.DISPLAY);
        math.transform(matrix, WIN.P1);
        math.transform(matrix, WIN.P2);
        math.transform(matrix, WIN.P3);
    }

    /************************ анимация солнечной системы ************************/
    const figureAnimate = (figure, parentMatrix = math.one()) => {
        const matrix = figure.animations.reduce(
            (S, animation) => {
                const { method, value } = animation;
                const center = animation.center || figure.center;
                const { x, y, z } = center;
                let resMatrix = math.one();
                resMatrix = math.animateMatrix(-x, -y, -z, method, value);
                return math.multMatrixes(S, resMatrix);
            },
            parentMatrix
        );
        figure.points.forEach(point =>
            math.transform(matrix, point)
        );
        math.transform(matrix, figure.center);
        return figure.animations.reduce(
            (S, animation) => {
                const { method, value } = animation;
                const center = animation.center || figure.center;
                const { x, y, z } = center;
                let resMatrix = math.one();
                if (animation.check) {
                    return S;
                }
                resMatrix = math.animateMatrix(-x, -y, -z, method, value);
                return math.multMatrixes(S, resMatrix);
            },
            parentMatrix
        );
    }

    const goAnimation = (animations, parentMatrix) => {
        if (flags.animation) {
            animations.forEach(anim => {
                const matrix = figureAnimate(anim.root, parentMatrix)
                if (anim.nodes) {
                    goAnimation(anim.nodes, matrix);
                }
            });
        }
    }

    /****************************************************************************/

    const run = () => {
        // очистка экрана
        canvas.clear();

        // заливка фона канваса
        canvas.drawImg(clouds, 0, 0, 600, 600);

        // вывод фона и текста для анимации солнечной системы
        if (flags.animation && animations.length !== 0) {
            canvas.drawImg(space, 0, 0, 600, 600);
            figures.forEach(figure => {
                figure.animations.forEach(animation => {
                    if (animation.text) {
                        canvas.textAnim(
                            figure,
                            `${animation.text}`,
                            math.getProection(figure.points[0]),
                            math.getProection(figure.points[0]),
                            'white',
                            'black'
                        );
                    }
                });
            });
        }

        // вывод полигонов
        if (flags.drawPolygons) {
            const polygons = [];
            figures.forEach((figure, index) => {
                math.calcCenters(figure);
                math.calcRadius(figure);
                math.calcDistance(figure, WIN.CAMERA, 'distance');
                math.calcDistance(figure, LIGHT, 'lumen');
                figure.polygons.forEach(polygon => {
                    polygon.figureIndex = index;
                    polygons.push(polygon);
                });
            });
            math.sortByArtistAlgoritm(polygons);
            polygons.forEach(polygon => {
                if (polygon.visibility) {
                    const figure = figures[polygon.figureIndex];
                    const points = polygon.points.map(point => {
                        return {
                            x: math.getProection(figure.points[point]).x,
                            y: math.getProection(figure.points[point]).y
                        }
                    });
                    let { r, g, b } = polygon.color;
                    let lumen = polygon.lumen;
                    if (flags.dark) {
                        const { isShadow, dark } = math.calcShadow(polygon, figures, LIGHT);
                        lumen = math.calcIllumination(
                            polygon.lumen,
                            LIGHT.lumen * (isShadow ? dark : 1)
                        );
                    } else lumen = math.calcIllumination(polygon.lumen, LIGHT.lumen);
                    r = Math.round(r * lumen);
                    g = Math.round(g * lumen);
                    b = Math.round(b * lumen);
                    canvas.polygon3D(points, polygon.rgbToHex(r, g, b));
                }
            });
        }

        // вывод ребер
        if (flags.drawEdges) {
            figures.forEach(figure => {
                figure.edges.forEach(edge => {
                    const point1 = math.getProection(figure.points[edge.p1]);
                    const point2 = math.getProection(figure.points[edge.p2]);
                    canvas.line3D(point1.x, point1.y, point2.x, point2.y)
                });
            });
        }

        // вывод точек
        if (flags.drawPoints) {
            figures.forEach(figure => {
                figure.points.forEach(point => {
                    canvas.arc3D(
                        math.getProection(point).x,
                        math.getProection(point).y,
                    );
                });
            });
        }

        // вывод источника света
        if (flags.light) {
            canvas.arc3D(
                math.getProection(LIGHT).x,
                math.getProection(LIGHT).y,
                10,
                '#ffffff'
            );
            canvas.arc3D(
                math.getProection(LIGHT).x,
                math.getProection(LIGHT).y,
                8,
                '#ffff63'
            );
        }

        // вывод FPS
        canvas.text(`fps: ${FPS}`, -9.6, 9, '#e2228c');
    }

    return (
        <div 
            className="graph3D" 
            onKeyDown={keyDownHandler}
        >
            <Panel3D
                flags={flags}
                figures={figures}
                locationFigure={locationFigure}
                move={(dx, dy, dz) => math.move(dx, dy, dz)}
                transform={(matrix, point) => math.transform(matrix, point)}
                animations={animations}
                LIGHT={LIGHT}
            />
            <canvas 
                className="canvas3D" 
                id="canvas3D"
                onWheel={e => wheel(e)}
                onMouseMove={e => mouseMove(e)}
                onMouseUp={() => mouseUp()}
                onMouseDown={() => mouseDown()}
            ></canvas>
            <div className="keysRules">
                <div className="keysRules-row">
                    <div className="keysRules-wrapper">
                        <div className="keysRules_button">
                            <p>W</p>
                            <div className="keysASD">
                                <p>A</p>
                                <p>S</p>
                                <p>D</p>
                            </div>
                        </div>
                        <p className="textRules">&nbsp;&nbsp;-&nbsp;движение фигур</p>
                    </div>
                    <div className="keysRules-wrapper">
                        <div className="keysRules_button">
                            <p>↑</p>
                            <div className="keys234">
                                <p>←</p>
                                <p>↓</p>
                                <p>→</p>
                            </div>
                        </div>
                        <p className="textRules">&nbsp;&nbsp;-&nbsp;движение света</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Graph3D;
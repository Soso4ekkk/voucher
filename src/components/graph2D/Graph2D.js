import { useEffect } from 'react';

import Canvas from '../../modules/canvas/Canvas';
import UI from './ui/UI';

import './graph2D.css';

function Graph2D() {

    let canvas; 

    const WIN = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20
    };

    //массив функций
    let funcs = [];

    //флажок мышки
    let canMove = false;

    //производная по OX
    let derivativeX = 0;

    useEffect(() => {
        canvas = new Canvas({
            WIN: WIN,
            id: 'canvas2D',
            width: 600,
            height: 600,
        });
        
        const animLoop = () => {
            //вывод всей сцены
            runn();
            window.requestAnimFrame(animLoop);
        }
        animLoop();
    });

    //поле для графиков
    const printOXY = () => {
        const {LEFT, BOTTOM, HEIGHT, WIDTH} = WIN;
        //разметка 
        for (let i = 0; i < LEFT + WIDTH; i += 1) {
            canvas.line(i, BOTTOM, i, BOTTOM + HEIGHT, '#ddd');
            canvas.line(i, -0.1, i, 0.1, 'black');
        }
        for (let i = 0; i > LEFT; i -= 1) {
            canvas.line(i, BOTTOM, i, BOTTOM + HEIGHT, '#ddd');
            canvas.line(i, -0.1, i, 0.1, 'black');
        }
        for (let i = 0; i < BOTTOM + HEIGHT; i += 1) {
            canvas.line(LEFT, i, LEFT + WIDTH, i, '#ddd');
            canvas.line(-0.1, i, 0.1, i, 'black');
        }
        for (let i = 0; i > BOTTOM; i -= 1) {
            canvas.line(LEFT, i, LEFT + WIDTH, i, '#ddd');
            canvas.line(-0.1, i, 0.1, i, 'black');
        }
        //ось 0X
        canvas.line(LEFT, 0, LEFT + WIDTH, 0, 'black', 2);
        //ось 0Y
        canvas.line(0, BOTTOM, 0, BOTTOM + HEIGHT, 'black', 2);
        //стрелки
        canvas.line(LEFT + WIDTH, 0, LEFT + WIDTH - 0.7, 0.3, 'black', 1);
        canvas.line(LEFT + WIDTH, 0, LEFT + WIDTH - 0.7, -0.3, 'black', 1);
        canvas.line(0, BOTTOM + HEIGHT, 0.3, BOTTOM + HEIGHT - 0.7, 'black', 1);
        canvas.line(0, BOTTOM + HEIGHT, -0.3, BOTTOM + HEIGHT - 0.7, 'black', 1);
        //точка
        canvas.point(0, 0, 3);
        //текст
        canvas.text('0', 0.2, -0.8);
        canvas.text('1', 0.2, 0.8);
        canvas.text('-1', -0.9, -1.2);
        canvas.text('x', WIDTH + LEFT - 0.45, -0.8);
        canvas.text('y', 0.4, HEIGHT + BOTTOM - 0.5);
    }

    /**********************движения мышкой**********************/
    const mouseMove = (e) => {
        if (canMove) {
            WIN.LEFT -= canvas.sx(e.movementX);
            WIN.BOTTOM += canvas.sy(e.movementY);
        }
        derivativeX = WIN.LEFT * 2.2 + canvas.sx(e.clientX);
    }

    const mouseUp = () => {
        canMove = false;
    }

    const mouseDown = () => {
        canMove = true;
    }

    /***********************************************************/

    //зум
    const wheel = (e) => {
        const delta = (e.deltaY > 0) ? 0.3 : -0.3;
        if (WIN.WIDTH + delta > 0) {
                WIN.WIDTH += delta;
                WIN.HEIGHT += delta;
                WIN.LEFT -= delta / 2;
                WIN.BOTTOM -= delta / 2;
        }
    }

    //находит нули функции
    const getZero = (f, a, b, eps) => {
        if (f(a) * f(b) > 0) {
            return null;
        }
        if (Math.abs(f(a) - f(b)) <= eps) {
            return (a + b) / 2;
        }
        let half = (a + b) / 2;
        if (f(a) * f(half) <= 0) {
            return getZero(f, a, half, eps);
        }
        if (f(b) * f(half) <= 0) {
            return getZero(f, half, b, eps);
        }
    }

    //считает производную
    const getDerivative = (f, x0, dx = 0.0001) => {
        return (f(x0 + dx) - f(x0)) / dx;
    }

    //считает площадь интеграла
    const getIntegral = (f, a, b, func) => {
        const dx = (b - a) / 100;
        let x = a;
        let s = 0;
        while (x <= b) {
            s += (f(x) + f(x + dx)) / 2 * dx;
            x += dx
        }
        func.square =  s.toFixed(1);
    }

    //рисует функцию
    const printFunction = (f, color, width) => {
        const { LEFT, WIDTH, HEIGHT } = WIN;
        let x = LEFT;
        let dx = WIDTH / 1000;
        while (x < WIDTH + LEFT) {
            try {
                if (f(x) - f(x + dx) < HEIGHT && f(x + dx) - f(x) < HEIGHT) {
                    canvas.line(x, f(x), x + dx, f(x + dx), color, width);
                    //рисует нули функции
                    if (getZero(f, x, x + dx, 0.001) != null) {
                        canvas.point(getZero(f, x, x + dx, 0.001), 0, 2, 'red');
                    }
                }
            } catch (e) {}
            x += dx;
        }
    }

    //рисует площадь интеграла
    const printIntegral = (f, a, b) => {
        const dx = (b - a) / 100;
        let x = a;
        let points = [];
        points.push({ x, y: 0 });
        while (x <= b) {
            points.push({ x, y: f(x) });
            x += dx;
        }
        points.push({ x: b, y: 0 });
        canvas.polygon(points);
    }

    //рисует производную
    const printDerivative = (f, x0) => {
        const k = getDerivative(f, x0);
        //пересечение касательной с функцией
        canvas.point(x0, f(x0), 2, 'green');
        //угол касательной к оси OX
        if (Math.atan(k) <= 0) {
            canvas.duga((k * x0 - f(x0)) / k, 0, 15, 0, Math.PI - Math.atan(k));
        } else {
            canvas.duga((k * x0 - f(x0)) / k, 0, 15, 0, Math.PI * 2 - Math.atan(k));
        }
        const b = f(x0) - k * x0;
        const x1 = WIN.LEFT;
        const x2 = WIN.LEFT + WIN.WIDTH;
        const y1 = k * x1 + b;
        const y2 = k * x2 + b;
        canvas.line(x1, y1, x2, y2, 'blue', 1, true);
    }

    //добавляет функцию
    const addFunction = () => {
        funcs.push({
            f: () => null,
            color: 'black',
            width: 1,
            startIntegral: null,
            endIntegral: null,
            derivativeX: false,
            square: null,
            value: null
        });
    }

    //удаляет функцию
    const delFunction = (index) => {
        funcs.splice(index, 1);
    }

    const runn = () => {
        //очистка экрана
        canvas.clear();

        //вывод разметки
        printOXY();
        
        //вывод функций, производных, интегралов
        for (var i = 0; i < funcs.length; i++) {
            const func = funcs[i];
            if (func) {
                printFunction(
                    func.f,
                    func.color,
                    func.width
                );
                if (func.derivativeX) {
                    printDerivative(
                        func.f,
                        derivativeX
                    );
                }
                const start = func.startIntegral;
                const end = func.endIntegral;
                if (!isNaN(start) && !isNaN(end) && start < end) {
                    printIntegral(func.f, start, end);
                    getIntegral(func.f, start, end, func);
                }
            }
        }
    }

    return (
        <div className="graph2D">
            <canvas 
                className="canvas" 
                id="canvas2D"
                onWheel={e => wheel(e)}
                onMouseMove={e => mouseMove(e)}
                onMouseUp={() => mouseUp()}
                onMouseDown={() => mouseDown()}
            ></canvas>
            <UI
                funcs={funcs}
                addFunction={addFunction}
                delFunction={delFunction}
            ></UI>
        </div>
    );
}

export default Graph2D;
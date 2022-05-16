import { useRef } from 'react';

import './funcInputs.css';

function FuncInputs(props) {
    const { func, index, delFunction } = props;

    const square = useRef(null);

    // добавить функцию
    const setFunction = (e) => {
        try {
            let f;
            eval(`f = function(x){return ${e.target.value};}`);
            func.f = f;
            func.value = e.target.value;
        } catch (e) {}
    }

    // изменить цвет
    const setColor = (e) => {
        func.color = e.target.value;
    }

    // изменить ширину линии
    const setWidth = (e) => {
        func.width = e.target.value;
    }

    // начало интеграла
    const setStartIntegral = (e) => {
        func.startIntegral = e.target.value - 0;
        const start = func.startIntegral;
        const end = func.endIntegral;
        if (!isNaN(start) && !isNaN(end) && start < end) {
            getIntegral(func.f, start, end, func);
        }
    }

    // конец интеграла
    const setEndIntegral = (e) => {
        func.endIntegral = e.target.value - 0;
        const start = func.startIntegral;
        const end = func.endIntegral;
        if (!isNaN(start) && !isNaN(end) && start < end) {
            getIntegral(func.f, start, end, func);
        }
    }

    // рисовать/не рисовать производную
    const setDerevative = (e) => {
        func.derivativeX = e.target.checked;
    }

    // считает площадь интеграла
    const getIntegral = (f, a, b, func) => {
        const dx = (b - a) / 100;
        let x = a;
        let s = 0;
        while (x <= b) {
            s += Math.abs((f(x) + f(x + dx)) / 2 * dx);
            x += dx
        }
        square.current.value = s.toFixed(1);
        func.square = s.toFixed(1);
    }

    return (
        <div className="functionSettings">
            <div className="functionSettings-row">
                <input
                    className="inputFunction"
                    placeholder="y&nbsp;=&nbsp;f(x)"
                    onKeyUp={setFunction}
                    defaultValue={func.value}
                ></input>
                <input
                    className="checkDerevative"
                    type="checkbox"
                    onChange={setDerevative}
                    defaultChecked={func.derivativeX}
                ></input>
                <button
                    className="deleteFunction"
                    onClick={() => delFunction(index)}
                >удалить</button>
            </div>
            <div className="functionSettings-row">
                <input
                    className="inputFunction"
                    placeholder="start"
                    onKeyUp={setStartIntegral}
                    defaultValue={func.startIntegral}
                ></input>
                <input
                    className="inputFunction"
                    placeholder="end"
                    onKeyUp={setEndIntegral}
                    defaultValue={func.endIntegral}
                ></input>
                <input
                    className="outputSquare"
                    placeholder="square"
                    disabled={true}
                    ref={square}
                    defaultValue={func.square}
                ></input>
            </div>
            <div className="functionSettings-row">
                <input
                    className="changeWidth"
                    type="range" 
                    min="0.5" 
                    max="8.5"
                    onChange={setWidth}
                    defaultValue={func.width}
                ></input>
                <input
                    className="changeColor"
                    type="color"
                    onChange={setColor}
                    defaultValue={func.color}
                ></input>
            </div>
        </div>
    );
}

export default FuncInputs;
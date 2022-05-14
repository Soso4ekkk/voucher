import './funcInputs.css';

function FuncInputs(props) {
    const { func, index, delFunction } = props;

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
    }

    // конец интеграла
    const setEndIntegral = (e) => {
        func.endIntegral = e.target.value - 0;
    }

    // рисовать/не рисовать производную
    const setDerevative = (e) => {
        func.derivativeX = e.target.checked;
    }

    return (
        <div>
            <input
                className="graph2D-input"
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
                className="graph2D-button"
                onClick={() => delFunction(index)}
            >удалить</button>
            <input
                className="graph2D-input"
                placeholder="start"
                onKeyUp={setStartIntegral}
                defaultValue={func.startIntegral}
            ></input>
            <input
                className="graph2D-input"
                placeholder="end"
                onKeyUp={setEndIntegral}
                defaultValue={func.endIntegral}
            ></input>
            <input
                className="graph2D-input-square"
                placeholder="square"
                disabled={true}
                defaultValue={func.square}
            ></input>
            <input
                className="slider"
                type="range" 
                min="0.5" 
                max="8.5"
                onChange={setWidth}
                defaultValue={func.width}
            ></input>
            <input
                className="colors"
                type="color"
                onChange={setColor}
                defaultValue={func.color}
            ></input>
        </div>
    );
}

export default FuncInputs;
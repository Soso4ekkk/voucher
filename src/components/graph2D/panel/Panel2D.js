import { useState } from 'react';

import FuncInputs from '../funcInputs/FuncInputs';

import './panel2D.css';

function Panel2D(props) {
    const { funcs, addFunction, delFunction, close } = props;
        
    const [funcsLength, setFuncsLength] = useState(funcs.length); 

    // удаляет функцию
    const delFunctionClick = (index) => {
        delFunction(index);
        setFuncsLength(funcs.length);
    }

    // добавляет функцию
    const addFunctionClick = () => {
        addFunction();
        setFuncsLength(funcs.length);
    };

    return (
        <div 
            key={funcsLength}
            className="graph2D-panel"
        >
            <div className="graph2D-panel-close">
                <button 
                    className="close" 
                    onClick={close}
                ></button>
            </div>
            <div className="graph2D-panel-add">
                <button 
                    className="add"
                    onClick={addFunctionClick}
                >добавить</button>
            </div>
            <div className="graph2D-panel-functions">
                <div>
                    {funcs.map((func, index) => 
                        <FuncInputs 
                            key={index}
                            index={index}
                            func={func} 
                            delFunction={(index) => delFunctionClick(index)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Panel2D;
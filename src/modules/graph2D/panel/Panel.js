import { useState } from 'react';

import FuncInputs from '../funcInputs/FuncInputs';

function Panel(props) {
    const { funcs, addFunction, delFunction, close } = props;
        
    const [funcsLength, setFuncsLength] = useState(funcs.length); 

    //удаляет функцию
    const delFunctionClick = (index) => {
        delFunction(index);
        setFuncsLength(funcs.length);
    }

    return (
        <div>
            <div className="graph2D_panel">
                <button 
                    className="close" 
                    onClick={() => close()}
                ></button>
                <div><button 
                    className="add"
                    onClick={() => addFunction()}
                >добавить</button></div>
                <div>
                    {funcs.map((func, index) => 
                        <FuncInputs 
                            index={index}
                            func={func} 
                            delFunction={(index) => delFunctionClick(index)}
                        ></FuncInputs>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Panel;
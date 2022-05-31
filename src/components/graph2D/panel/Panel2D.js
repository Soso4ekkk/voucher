import { useEffect, useState } from 'react';

import FuncInputs from '../funcInputs/FuncInputs';

import './panel2D.css';

function Panel2D(props) {
    const { store, close } = props;

    const [funcsLength, setFuncsLength] = useState(store.getState().length); 

    useEffect(() => {
        store.subcribe(() => setFuncsLength(store.getState()?.length));
    });

    // удаляет функцию
    const delFunctionClick = (index) => {
        store.dispatch({
            type: 'delFunction',
            index
        });
    }

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
                    onClick={() => store.dispatch({ type: 'addFunction'})}
                >добавить</button>
            </div>
            <div className="graph2D-panel-functions">
                <div>
                    {store.getState().map((func, index) => 
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
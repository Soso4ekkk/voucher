import { useState } from 'react';

import Panel from '../panel/Panel';

import './ui.css';

function UI(props) {
    const { funcs, addFunction, delFunction } = props;
        
    const [showPanel, setShowPanel] = useState(false);

    const togglePanel = () => {
        setShowPanel(!showPanel);
    }

    return (
        <div>
            {showPanel ? 
                <Panel 
                    funcs={funcs} 
                    close={() => togglePanel()}
                    addFunction={() => addFunction()}
                    delFunction={(index) => delFunction(index)}
                ></Panel> : ''}
            <button 
                className="draw" 
                onClick={() => togglePanel()}
            >нарисовать<br></br>график</button>
        </div>
    );
}

export default UI;
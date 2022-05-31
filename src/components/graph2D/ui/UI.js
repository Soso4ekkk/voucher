import { useState } from 'react';

import Panel2D from '../panel/Panel2D';

import './ui.css';

function UI({ store }) {
        
    const [showPanel, setShowPanel] = useState(false);

    const togglePanel = () => {
        setShowPanel(!showPanel);
    }

    return (
        <div className="panel2D">
            <div className="panel2D-button">
                <button 
                    className="draw" 
                    onClick={togglePanel}
                >нарисовать<br/>график</button>
            </div>
            <div className="panel2D-window">
                {showPanel ? 
                    <Panel2D store={store}/> 
                : ''}
            </div>
        </div>
    );
}

export default UI;
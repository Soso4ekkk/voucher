import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './button/Button';

import './header.css';

function Header(props) {
    const { ROUTES } = props;
    
    const [ activeButton, setActiveButton ] = useState(ROUTES.CALCULATOR.path);
    const navigate = useNavigate();

    return (
        <div>
            <div className="main_page">
                {Object.values(ROUTES).map(route =>
                    route.path !== '/' ?
                    <Button
                        key={route.path}
                        onClick={setActiveButton}
                        isActive={activeButton}
                        path={route.path}
                        title={route.title}
                    ></Button> : '')}
                <div 
                    className="field"
                    onClick={() => navigate(-1)}
                >назад</div>
            </div>
        </div>
    );
}

export default Header;
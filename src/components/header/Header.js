import Button from './button/Button';

import './header.css';

function Header(props) {
    const { activeButton, setActiveButton } = props;

    return (
        <div>
            <div className="button">
                <Button
                    onClick={setActiveButton}
                    isActive={activeButton}
                    name="calculator"
                    title="калькулятор"
                ></Button>
                <Button
                    onClick={setActiveButton}
                    isActive={activeButton}
                    name="graph2D"
                    title="графика&nbsp;2D"
                ></Button>
                <Button
                    onClick={setActiveButton}
                    isActive={activeButton}
                    name="graph3D"
                    title="графика&nbsp;3D"
                ></Button>
            </div>
        </div>
    );
}

export default Header;
import Button from './button/Button';

import './header.css';

function Header(props) {
    const { activeButton, setActiveButton } = props;

    return (
        <div>
            {/****************************мем****************************/}
            <div>
                <img className="img" src="/images/trusov.png" alt="trusov" />
            </div>
            <div className="block_1">
                <div className="block_2">
                    <img src="/images/trusov&mushroom.png" alt="trusov&mushroom" />
                    <p className="block_3">
                        Я&nbsp;в&nbsp;себя&nbsp;так&nbsp;не&nbsp;верю,
                        <br></br>как&nbsp;верю&nbsp;в&nbsp;вас.
                        <br></br><br></br>©&nbsp;А.С.&nbsp;Трусов
                    </p>
                </div>
            </div>

            {/***********************************************************/}

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
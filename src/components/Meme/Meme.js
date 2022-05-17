import './meme.css';

function Meme() {
    return (
        <div className="meme">
            <div className="hidden_part">
                <p className="quote">
                    Я&nbsp;в&nbsp;себя&nbsp;так&nbsp;не&nbsp;верю,
                    <br/>как&nbsp;верю&nbsp;в&nbsp;вас.
                    <br/><br/>©&nbsp;А.С.&nbsp;Трусов
                </p>
            </div>
            <div className="visible_part">
                <div className="visible_part-bulb">
                    <div className="bulb"></div>
                </div>
                <div>
                    <img className="main_picture" src="/images/trusov.png" alt="trusov"/>
                </div>
            </div>
        </div>
    );
}

export default Meme;
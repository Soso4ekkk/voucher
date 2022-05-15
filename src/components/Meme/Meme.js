import './meme.css';

function Meme() {
    return (
        <div>
            <div className="memes">
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
            </div>
        </div>
    );
}

export default Meme;
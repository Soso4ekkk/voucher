import './button.css';

function Button(props) {
    const { title, name, isActive, onClick } = props;

    //выбор стиля кнопок меню
    const setActive = () => `field ${isActive === name ? 'active' : ''}`;

    return (
        <div
            className={setActive()}
            onClick={() => onClick(name)}
        >{title}</div>
    );
}

export default Button;
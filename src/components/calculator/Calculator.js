import { useEffect, useRef } from 'react';

import UniversalCalculator from '../../modules/calculator/UniversalCalculator';

import './calculator.css';

function Calculator() {
    let calculator;
    const elemA = useRef(null);
    const elemB = useRef(null);
    const elemC = useRef(null);

    useEffect(() => {
        calculator = new UniversalCalculator();
    });

    const operation = (operand) => {
        let a = calculator.toValue(elemA.current.value);
        let b = calculator.toValue(elemB.current.value);
        if (a && b) {
            let c;
            if (operand === 'zero' || operand === 'one')
                c = calculator[operand](null, a);
            else c = calculator[operand](a, b);
            elemC.current.value = c.toString();
        }
    }

    return (
        <div className="calculator">
            <div className="textArea">
                <div className="textArea-row">
                    <textarea 
                        ref={elemA}
                        className="numbers"
                        placeholder="0"
                    />
                    <textarea 
                        ref={elemB}
                        className="numbers"
                        placeholder="0"
                    />
                </div>
                <div className="textArea-row">
                    <textarea
                        ref={elemC}
                        className="result"
                        placeholder="&nbsp;result"
                        disabled={true}
                    />
                </div>
            </div>
            <div className="button-operation">
                <div className="button-row">
                    <button onClick={() => operation("add")}>&nbsp;add&nbsp;</button>
                    <button onClick={() => operation("sub")}>&nbsp;sub&nbsp;</button>
                    <button onClick={() => operation("mult")}>&nbsp;mult&nbsp;</button>
                </div>
                <div className="button-row">
                    <button onClick={() => operation("div")}>&nbsp;div&nbsp;</button>
                    <button onClick={() => operation("prod")}>&nbsp;prod&nbsp;</button>
                    <button onClick={() => operation("pow")}>&nbsp;pow&nbsp;</button>
                </div>
                <div className="button-row">
                    <button onClick={() => operation("one")}>&nbsp;one&nbsp;</button>
                    <button onClick={() => operation("zero")}>&nbsp;zero&nbsp;</button>
                </div>
            </div>
            <div className="inputRules">
                <div className="headerRules">
                    <p>формат&nbsp;ввода:</p>
                </div>
                <div className="pointsRules">
                    <p>обычные&nbsp;числа:&nbsp;1</p>
                    <p>комплексные&nbsp;числа:&nbsp;1&#177;i*2</p>
                    <p>вектора:&nbsp;(1&nbsp;2&nbsp;3)</p>
                    <p>матрицы:&nbsp;1,&nbsp;2/n3,&nbsp;4</p>
                    <p>полиномиалы:&nbsp;1*x^2&#177;2*x^3</p>
                </div>
            </div>
        </div>
    );
}

export default Calculator;
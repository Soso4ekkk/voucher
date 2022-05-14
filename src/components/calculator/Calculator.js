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
            <div>
                <div>
                    <textarea 
                        ref={elemA}
                        className="numbers"
                        placeholder="0"
                    ></textarea>
                    <textarea 
                        ref={elemB}
                        className="numbers"
                        placeholder="0"
                    ></textarea>
                </div>
                <div>
                    <textarea
                        ref={elemC}
                        className="result"
                        placeholder="result"
                        disabled={true}
                    ></textarea>
                </div>
            </div>
            <div>
                <button onClick={() => operation("add")}>&nbsp;Add&nbsp;</button>
                <button onClick={() => operation("sub")}>&nbsp;Sub&nbsp;</button>
                <button onClick={() => operation("mult")}>&nbsp;Mult&nbsp;</button>
            </div>
            <div>
                <button onClick={() => operation("div")}>&nbsp;Div&nbsp;</button>
                <button onClick={() => operation("prod")}>&nbsp;Prod&nbsp;</button>
                <button onClick={() => operation("pow")}>&nbsp;Pow&nbsp;</button>
            </div>
            <div>
                <button onClick={() => operation("one")}>&nbsp;One&nbsp;</button>
                <button onClick={() => operation("zero")}>&nbsp;Zero&nbsp;</button>
            </div>
            <div>
                <h2 className="h2">формат&nbsp;ввода:</h2>
                <p className="rules">
                    обычные&nbsp;числа:&nbsp;1<br />
                    комплексные&nbsp;числа:&nbsp;1&#177;i*2<br></br>
                    вектора&nbsp;(&nbsp;(1&nbsp;2&nbsp;3)&nbsp;)<br></br>
                    матрицы&nbsp;(&nbsp;1,&nbsp;2&nbsp;/n&nbsp;3,&nbsp;4&nbsp;)<br></br>
                    полиномиалы&nbsp;(&nbsp;1*x^2&#177;2*x^3&nbsp;)
                </p>
            </div>
        </div>
    );
}

export default Calculator;
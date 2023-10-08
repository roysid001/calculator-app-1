import { useState } from 'react';
import './App.css';
import Body from './components/Body';
import Screen from './components/Screen';
import ButtonBox from './ButtonBox';
import Button from './Button';

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="]
];

function App() {

  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (calc.num.length() < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : calc.num % 1 === 0
              ? Number(calc.num + value)
              : calc.num + value,
        res: !calc.sign ? 0 : calc.res
      });
    }
  }

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num
    });
  }

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res, // no previous calculation has been performed & there's a value in calc.num
      num: 0
    });
  }

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) => {
        sign === "+"
          ? a + b
          : sign === "-"
            ? a - b
            : sign === "X"
              ? a * b
              : a / b
      }
      setCalc({
        ...calc,
        res:
          calc.num === 0 && calc.sign === "/"
            ? "Cannot divide number by 0"
            : math(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: 0
      });
    }
  }

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(calc.num) : 0;
    let res = calc.res ? parseFloat(calc.res) : 0;
    setCalc({
      ...calc,
      num: (num / Math.pow(100, 1)),
      res: (res / Math.pow(100, 1)),
      sign: ""
    });
  }

  const invertClickHandler = () => {
    setCalc({
      num: calc.num ? calc.num * (-1) : 0,
      res: calc.res ? calc.res * (-1) : 0,
      sign: ""
    });
  }

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      num: 0,
      res: 0,
      sign: ""
    });
  }

  return (
    <div className="container">
      <Body>
        <Screen value={calc.num ? calc.num : calc.res}></Screen>
        <ButtonBox>
          {
            btnValues.flat().map((btn, i) => {
              return (
                <Button
                  key={i}
                  className={btn === "=" ? "equals" : ""}
                  value={btn}
                  onClick={
                    btn === "C"
                      ? resetClickHandler
                      : btn === "+-"
                        ? invertClickHandler
                        : btn === "%"
                          ? percentClickHandler
                          : btn === "="
                            ? equalsClickHandler
                            : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                              ? signClickHandler
                              : btn === "."
                                ? commaClickHandler
                                : numClickHandler
                  }
                />
              )
            })
          }
        </ButtonBox>
      </Body>
    </div>
  );
}

export default App;

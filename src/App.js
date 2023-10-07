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

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
  return (
    <div className="container">
      <Body>
        <Screen value="0"></Screen>
        <ButtonBox>
          {
            btnValues.flat().map((btn, i) => {
              return (
                <Button
                  key={i}
                  className={btn === "=" ? "equals" : ""}
                  value={btn}
                  onClick={() => {
                    console.log(`${btn} clicked!`);
                  }}
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

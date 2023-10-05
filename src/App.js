import './App.css';
import Body from './components/Body';
import Screen from './components/Screen';
import ButtonBox from './ButtonBox';
import Button from './Button';

function App() {
  return (
    <div className="container">
      <Body>
      <Screen value={"0"}></Screen>
      <ButtonBox>
        <Button 
        className=""
        value="0"
        onClick={() => {console.log("Button clicked!");}}
        ></Button>
      </ButtonBox>
      </Body>
    </div>
  );
}

export default App;

import './App.css'
import {Tree, Box, GameStep} from '../../logic';
import { MAX_STEPS } from '../../const';
import { useState } from 'react';

const tree = new Tree({useEmoji: false});

interface BoxProps {
  box: Box;
  onClick: Function;
}

function BoxElement({box, onClick}: BoxProps) {
  return (
    <div style={{backgroundColor: box.color, border: '1px solid black'}} className='box' onClick={() => onClick(box)} />
  );
}

function App() {
  const [counter, setCounter] = useState(tree.getScore());

  const steps = `${counter} / ${MAX_STEPS}`;

  const boxClick = (box: Box) => {
    const result = GameStep(tree, box.color);

    if (result === false) {
      alert('Вы проиграли!!');
    }

    setCounter(tree.getScore());
  }

  return (
    <div className="wrapper">
      <div className='score'>
        {steps}
      </div>
      <div className="field">
        {tree.getField().map((row) =>
        <div>
          {row.map((item) => 
            <BoxElement
              key={`${item.coords[0]} - ${item.coords[1]}`}
              box={item}
              onClick={boxClick}
            />
          )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App

import { ChangeEvent, useState } from 'react';
import {Tree, Box, GameStep} from '../../logic';
import { MAX_STEPS } from '../../const';
import { BoxElement } from './components/Box/Box';
import './App.css'
import { Header } from './components/Header/Header';
import { GameSettings } from './components/GameSettings/GameSettings';

const createTree = (size?: number) => {
  return new Tree({useEmoji: false, size});
}

function App() {
  const [tree, setTree] = useState(createTree());
  const [counter, setCounter] = useState(tree.getScore());

  const steps = `${counter} / ${MAX_STEPS}`;

  const boxClick = (box: Box) => {
    const result = GameStep(tree, box.color);

    if (result === false) {
      alert('Вы проиграли!!');
    }

    setCounter(tree.getScore());
  }

  const onChangeSize = (event: ChangeEvent<HTMLSelectElement>) => {
    const size = Number(event?.target?.value) || undefined;
    setTree(createTree(size));
  }

  return (
    <div className="wrapper">
      <Header score={steps} />
      <GameSettings onChange={onChangeSize}/>
      <div className="field">
        {tree.getField().map((row) =>
        <div className='field-row'>
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

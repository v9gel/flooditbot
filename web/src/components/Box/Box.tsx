import { Box } from "../../../../logic";
import './Box.css';

interface BoxProps {
  box: Box;
  onClick: Function;
}

export function BoxElement({box, onClick}: BoxProps) {
  return (
    <div
      style={{backgroundColor: box.color}}
      className='box'
      onClick={() => onClick(box)}
    />
  );
}
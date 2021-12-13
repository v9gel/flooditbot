import './Header.css';

interface HeaderProps {
  score: string;
}

export function Header({score}: HeaderProps) {
  return (
    <div className='score-message'>
      Your score:
      <div className='score'>{score}</div>
    </div>
  );
}
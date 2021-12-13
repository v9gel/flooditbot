import { ChangeEvent } from 'react';
import './GameSettings.css';

const options = [8, 12, 14, 18];

interface GameSettingsProps {
  onChange: (arg0: ChangeEvent<HTMLSelectElement>) => void;
}

export function GameSettings({onChange}: GameSettingsProps) {
  return (
    <div className='settings-wrapper'>
      <form>
        <label className='label'>
          Size:
          <select className='select' onChange={onChange}>
            {options.map((value) => <option value={value}>{value}</option>)}
          </select>
        </label>
      </form>
    </div>
  )
}
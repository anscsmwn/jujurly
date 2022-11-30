import { zeroPad } from 'react-countdown';
interface CountdownItemProps {
  value: number;
  label: string;
}

const CountdownItem = ({ value, label }: CountdownItemProps) => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col text-center">
        <p className="sm:text-6xl font-bold text-3xl">{zeroPad(value, 2)}</p>
        <p className="sm:text-lg text-sm">{label}</p>
      </div>
      {label !== 'Detik' && (
        <span className="text-xl font-bold mx-2 sm:mx-5">:</span>
      )}
    </div>
  );
};

export default CountdownItem;

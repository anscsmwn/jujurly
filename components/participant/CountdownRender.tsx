import React from 'react';
import CountdownItem from './CountdownItem';

interface CountdownRenderProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const CountdownRender = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: CountdownRenderProps) => {
  if (completed) {
    return <p className="text-6xl font-semibold">Waktu Habis</p>;
  } else {
    return (
      <div className="flex flex-row gap-1">
        <CountdownItem value={days} label="Hari" />
        <CountdownItem value={hours} label="Jam" />
        <CountdownItem value={minutes} label="Menit" />
        <CountdownItem value={seconds} label="Detik" />
      </div>
    );
  }
};

export default CountdownRender;

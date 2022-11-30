import React from 'react';
import ReactCountdown, { CountdownRendererFn } from 'react-countdown';
import CountdownRender from './CountdownRender';

const Countdown = () => {
  const countDown: CountdownRendererFn = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }) => {
    return (
      <CountdownRender
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        completed={completed}
      />
    );
  };
  return (
    <div className="flex items-center flex-col my-8">
      <p className="text-center">Voting Sedang Berlangsung :</p>
      <ReactCountdown date={Date.now() + 100000000} renderer={countDown} />
    </div>
  );
};

export default Countdown;

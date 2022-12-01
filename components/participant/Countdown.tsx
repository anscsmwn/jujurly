import React from 'react';
import ReactCountdown, { CountdownRendererFn } from 'react-countdown';
import { Votes } from 'type/types';
import CountdownRender from './CountdownRender';

interface CountdownProps {
  vote: Votes;
}

const Countdown = ({ vote }: CountdownProps) => {
  const now = new Date().getTime();
  const startDate = new Date(vote.startDate).getTime();
  const endDate = new Date(vote.endDate).getTime();
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
    <>
      {now > startDate && now < endDate && (
        <div className="flex items-center flex-col mb-8 mt-4">
          <p className="text-2xl font-semibold">Vote akan berakhir dalam :</p>
          <ReactCountdown date={endDate} renderer={countDown} />
        </div>
      )}
      {now < startDate && (
        <div className="flex items-center flex-col mb-8 mt-4">
          <p className="text-2xl font-semibold">
            Voting akan berlansung dalam :
          </p>
          <ReactCountdown date={startDate} renderer={countDown} />
        </div>
      )}
      {now > endDate && (
        <div className="flex items-center flex-col mb-8 mt-4">
          <p className="text-2xl font-semibold">Voting telah berakhir</p>
        </div>
      )}
    </>
  );
};

export default Countdown;

import React from 'react';

import style from './VoteControl.module.scss'

interface IVoteControl {
  votesUp: number;
}

const VoteControl = ({votesUp}:IVoteControl) => {
  return <div className={style.voteWrapper}>
            <div className={style.voteUpIcon}></div>
            <div className={style.count}>{votesUp}</div>
            <div className={style.voteDownIcon}></div>
          </div>
}

export default VoteControl
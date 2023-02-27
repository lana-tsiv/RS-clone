import React, {useEffect} from 'react';

import style from './VoteControl.module.scss'
import { useMangePosts } from '@/hooks/usePosts';
import { main } from '@/store/selectors';
import { useAppSelector } from '@/store/store';
import cn from 'classnames';
import toggleVote from '@/utils/votes';

interface IVoteControl {
  votesUp: number;
  postId: string;
  voters: Record<string, string>;
}

const VoteControl = ({votesUp, postId, voters}:IVoteControl) => {
  const {
    userEmail
	} = useAppSelector(main);

  const [down, setDown] = React.useState(false)
  const [up, setUp] = React.useState(false)
  const [votes, setVotes] = React.useState(votesUp)
  const [isVoted, setIsVoted] = React.useState(false)

  const toggleVoteState = (flag: any, cb: any,opposite: any, inc: any) => {
    setIsVoted(()=>true)
    if(!flag){
      setVotes(prev=> prev + inc)
      cb(()=>true)
      opposite(()=>false)
    }
    else{
      setVotes(prev=> prev - inc)
      cb(()=>false)
    }
  }
  const upHandler = () => toggleVoteState(up, setUp, setDown, down ? 2:1)
  const downHandler = () => toggleVoteState(down, setDown, setUp, up ? -2:-1)

  useEffect(() => {
   if(isVoted){
    const voteType = up ? 'up' : 'down'
    toggleVote({postId, email: userEmail, vote: up || down? voteType: null, count: ~~votes})
   } 
  }, [votes])

  const checkVotes = () => {
    if(!voters) return
    
    if(userEmail && voters && voters?.[userEmail]) {
      if(!voters?.[userEmail]) return 
      voters?.[userEmail] !=='down'? setUp(true) : setDown(true)
    }
  }
  useEffect(() => {
    checkVotes()
  }, [votesUp] )

  return <div className={style.voteWrapper}>
            <div className={
              cn(style.voteUpIcon, {
                [style.active]: up
              })
              }
              onClick={upHandler}
            />
            <div className={style.count}>{votes}</div>
            <div 
              className={cn(style.voteDownIcon, {
                [style.active]: down
              })}
              onClick={downHandler}
            />
          </div>
}

export default VoteControl

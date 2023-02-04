import React, {useEffect} from 'react';

import style from './VoteControl.module.scss'
import { useMangePosts } from '@/hooks/usePosts';

interface IVoteControl {
  votesUp: number;
  postId: string;
}

const VoteControl = ({votesUp, postId}:IVoteControl) => {
  const [votes, setVotes] = React.useState(votesUp)
  const {handleVotePost}= useMangePosts()

  const upHandler = () => setVotes(prev=> prev + 1)
  const downHandler = () => setVotes(prev=> prev - 1)

  useEffect(() => {
    if(votesUp === votes) return
      handleVotePost({votesUp: votesUp + 1, postId} as any)
  }, [votes])

  return <div className={style.voteWrapper}>
            <div className={style.voteUpIcon}
              onClick={upHandler}
            />
            <div className={style.count}>{votes}</div>
            <div 
              className={style.voteDownIcon}
              onClick={downHandler}
            />
          </div>
}

export default VoteControl

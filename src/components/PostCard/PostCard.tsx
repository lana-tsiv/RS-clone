/* eslint-disable @next/next/no-img-element */
import React, {useState, useEffect} from "react";
import PostActionPanel from './PostActionPanel';

import Tags from "./Tags";
import VoteControl from "./VoteControl";

import { IPost } from "@/types/common";

import style from "./PostCard.module.scss";

interface IPostCard {
  fields: IPost;
  commentsCount?: number;
}

const defaultPostPanelOptions = [
  {
    text: 'comments',
    icon: '!'
  }
]

const PostCard = ({ fields, commentsCount }: IPostCard) => {

  return (
    <div className={style.postCardContainer}>
      <VoteControl votesUp={fields.votesUp} />
        <div className={style.content}>
          <div className={style.postCardHeader}>
            <div className={style.title}>some</div>
          </div>
            <div className={style.text}>
              <p>{fields.text}</p>
            </div>
            <div className={style.image}>
              <img
                src={fields.images[0]}
                alt='post image'
              />
            </div>
          <Tags tags={fields.tags} />
        <PostActionPanel
            actionList={defaultPostPanelOptions}
        />
      </div>
    </div>
  );
};

export default PostCard;

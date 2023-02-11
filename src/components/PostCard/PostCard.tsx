/* eslint-disable @next/next/no-img-element */
import React, {useState, useEffect} from "react";
import PostActionPanel from './PostActionPanel';

import Tags from "./Tags";
import VoteControl from "./VoteControl";

import { IPost } from "@/types/common";

import style from "./PostCard.module.scss";
import CommentIcon from "@/components/common/CommentIcon";
import translate from "@/i18n/translate";
import {FormattedMessage} from "react-intl";

interface IPostCard {
  fields: IPost;
  postId: string,
  commentsCount?: number;
}

const defaultPostPanelOptions = [
  {
    text: <FormattedMessage id="defaultPostPanelOptions.comments" defaultMessage="comments" />,
    icon: CommentIcon
  }
]

const PostCard = ({
  fields,
  commentsCount,
  postId,
}: IPostCard) => {

  return (
    <div className={style.postCardContainer}>
      <VoteControl
        votesUp={fields.votesUp}
        postId={postId}
      />
      <div className={style.content}>
        <div className={style.postCardHeader}>
          <div className={style.title}>{fields?.title}</div>
        </div>
        <div className={style.text}>
          <p>{fields.text}</p>
        </div>
        <div className={style.image}>
         {fields?.images?.[0] && <img
            className={style.size}
            src={fields.images[0]}
            alt='post image'
          />}
        </div>
        {fields?.tags && <Tags tags={fields.tags} />}
        <PostActionPanel
            postId={postId}
            actionList={defaultPostPanelOptions}
        />
      </div>
    </div>
  );
};

export default PostCard;

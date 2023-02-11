/* eslint-disable @next/next/no-img-element */
import React from "react";
import PostActionPanel from './PostActionPanel';
import { FormattedMessage } from "react-intl";

import Tags from "./Tags";
import VoteControl from "./VoteControl";
import CommentIcon from "@/components/common/CommentIcon";

import { IPost } from "@/types/common";

import style from "./PostCard.module.scss";

interface IPostCard {
  fields: IPost;
  postId: string,
  commentsCount?: number;
  refView?: any;
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
  refView
}: IPostCard) => {

  return (
    <div className={style.postCardContainer} ref={refView? refView : null}>
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

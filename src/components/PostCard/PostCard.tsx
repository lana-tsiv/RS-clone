/* eslint-disable @next/next/no-img-element */
import React from "react";
import PostActionPanel from "./PostActionPanel";
import { FormattedMessage } from "react-intl";

import Tags from "./Tags";
import VoteControl from "./VoteControl";
import CommentIcon from "@/components/common/CommentIcon";

import { IPost } from "@/types/common";

import style from "./PostCard.module.scss";
import { dateFormattingWithSlash } from "@/utils/dateFormat";
import { useRouter } from "next/router";
import cn from "classnames";

interface IPostCard {
  fields: IPost;
  postId: string;
  commentsCount?: number;
  refView?: any;
  isSinglePost?: boolean;
}

const PostCard = ({ fields, commentsCount, postId, refView, isSinglePost }: IPostCard) => {
  const comments = [
    {
      icon: CommentIcon,
      text: `comments ${commentsCount}`,
    },
  ];

  const router = useRouter();

  const handleNavigate = () => router.push(`/posts/${postId}`);

  return (
    <div
      className={style.postCardContainer}
      ref={refView ? refView : null}
    >
      <VoteControl
        votesUp={fields.votesUp}
        postId={postId}
      />
      <div className={style.content}>
        <div className={style.postInfo}>
          <div className={style.author}>{fields?.displayName}</div>
          <div className={style.timestamp}>{dateFormattingWithSlash(fields?.timestamp).toString()}</div>
        </div>
        <div className={style.postCardHeader}>
          <div
            className={cn(style.title, { [style.titleClamp]: !isSinglePost })}
            onClick={handleNavigate}
          >
            {fields?.title}
          </div>
        </div>
        <div className={cn(style.text, { [style.textClamp]: !isSinglePost })}>
          <p>{fields.text}</p>
        </div>
        <div className={style.image}>
          {fields?.images?.[0] && (
            <img
              className={style.size}
              src={fields.images[0]}
              alt='post image'
            />
          )}
        </div>
        {fields?.tags && <Tags tags={fields.tags} />}
        <PostActionPanel
          postId={postId}
          actionList={comments}
          isCommentShown={isSinglePost}
        />
      </div>
    </div>
  );
};

export default PostCard;

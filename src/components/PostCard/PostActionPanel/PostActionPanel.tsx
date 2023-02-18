import React, { useState, ReactNode } from "react";
import style from "./PostActionPanel.module.scss";
import CommentBox from "@/components/PostCard/CommentBox";
import { auth } from '@/firebaseClient/clientApp';

interface IAction {
  text: ReactNode;
  icon: any;
  postId: string;
  isCommentShown?: boolean;
}

const Action = ({ 
  text,
  icon: Icon,
  postId,
  isCommentShown
}: IAction) => {
  const [uploadComment, setUploadComment] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);

  const clickHandle = () => {
    setUploadComment(!uploadComment);
  };

  return (
    <div className={style.wrap}>
      <div
        className={style.actionPanelContainer}
        onClick={clickHandle}
      >
        <div className={style.commentsIcon}>
          <Icon />
        </div>
        <div className={style.commentsCount}>
          {text} {commentsCount}
        </div>
      </div>
      {isCommentShown && auth?.currentUser &&
        <div className={uploadComment ? style.open : style.close}>
          <CommentBox
            postId={postId}
            onOpen={setCommentsCount}
          />
        </div>
      }
    </div>
  );
};

interface IPostActionPanel {
  actionList: { text: ReactNode; icon: any }[];
  id?: string;
  postId: string;
  isCommentShown?: boolean;
}


const PostActionPanel = ({ 
  actionList,
  id,
  postId,
  isCommentShown,
}: IPostActionPanel) => {
  return (
    <div className={style.postActionPanelContainer}>
      {actionList.map((action, index) => (
        <Action
          postId={postId}
          key={`action-${index}-${id}`}
          text={action.text}
          icon={action.icon}
          isCommentShown={isCommentShown}
        />
      ))}
    </div>
  );
};

export default PostActionPanel;

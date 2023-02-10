import React, {useState} from "react";
import style from "./PostActionPanel.module.scss";
import CommentBox from "@/components/PostCard/CommentBox";

interface IPostActionPanel {
  actionList: { text: React.ReactNode; icon: any }[];
  id?: string;
  postId: string
}

const Action = ({ text, icon: Icon, postId}: { text: React.ReactNode, icon: any, postId: string}) => {

    const [uploadComment, setUploadComment] = useState(false);
    const clickHandle = () => {
        setUploadComment(!uploadComment);
    }

    return (
    <div className={style.wrap}>
        <div className={style.actionPanelContainer}>
          <div
              onClick={clickHandle}
              className={style.commentsIcon}
          >
              <Icon />
          </div>
          <div className={style.commentsCount}>{text}</div>
        </div>
        <div className={uploadComment ? style.open : style.close}><CommentBox postId={postId}/></div>
    </div>
  );
};

const PostActionPanel = ({ actionList, id, postId }: IPostActionPanel) => {
  return (
    <div className={style.postActionPanelContainer}>
      {actionList.map((action, index) => (
        <Action
          postId={postId}
          key={`action-${index}-${id}`}
          text={action.text}
          icon={action.icon} />
      ))}
    </div>
  );
};

export default PostActionPanel;

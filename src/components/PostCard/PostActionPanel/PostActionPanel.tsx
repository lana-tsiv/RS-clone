import React from "react";
import style from "./PostActionPanel.module.scss";

interface IPostActionPanel {
  actionList: { text: string; icon: any }[];
  id?: string;
}

const Action = ({ text, icon: Icon }: { text: string, icon: any }) => {
  return (
    <div className={style.actionPanelContainer}>
      <div className={style.commentsIcon}><Icon /></div>
      <div className={style.commentsCount}>{text}</div>
    </div>
  );
};

const PostActionPanel = ({ actionList, id }: IPostActionPanel) => {
  return (
    <div className={style.postActionPanelContainer}>
      {actionList.map((action, index) => (
        <Action
          key={`action-${index}-${id}`}
          text={action.text}
          icon={action.icon} />
      ))}
    </div>
  );
};

export default PostActionPanel;

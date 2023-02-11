import React from "react";

import style from "./Tags.module.scss";

interface ITags {
  tags: string[];
}

const Tags = ({ tags }: ITags) => {
  if(!tags) return null;

  return (
    <div className={style.tagsContainer}>
      {tags.map((tag, index) => (
        <div
          key={index}
          className={style.tag}
        >
          <p>{tag}</p>
        </div>
      ))}
    </div>
  );
};

export default Tags;

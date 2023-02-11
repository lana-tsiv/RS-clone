import React from "react";

import style from "./Feed.module.scss";
import { usePosts } from "../../hooks/usePosts";
import { OrderOptions } from "../../constants/enums";
import PostCard from "../PostCard/PostCard";
import PostForm from '../Form/PostForm/PostForm';

interface IFeed {
  field?: [];
}

const Feed = (props: IFeed) => {
  const { postsData } = usePosts({
    end: 10,
    start: 0,
    order: OrderOptions.votesUp,
    limitSize: 10,
  });

  const list = postsData?.docs ? postsData?.docs : null;
  return list ? (
    <div className={style.feedContainer}>
      <PostForm/>
      {list.map((post: any, index: number) => {
        const postFields = post.data();
        
        return <PostCard
          key={`post-${post.id}-${index}`}
          fields={postFields}
          postId={post.id}
        />
      }
    )}
    </div>
  ) : null;
};

export default Feed;

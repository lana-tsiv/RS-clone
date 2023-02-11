import React from "react";
import { useInView } from 'react-intersection-observer'

import PostCard from "@/components/PostCard/PostCard";
import PostForm from '@/components/Form/PostForm/PostForm';

import { usePosts } from "@/hooks/usePosts";
import { OrderOptions } from "@/constants/enums";
import { useAppDispatch, useAppSelector } from '@/store/store';

import style from "./Feed.module.scss";
import { setPageSize } from '@/slices/main';
import { main } from '@/store/selectors'
import Button from '../common/Button';

interface IFeed {
  field?: [];
}

const Feed = (props: IFeed) => {
  const dispatch = useAppDispatch();
  const { ref, inView } = useInView()

  const {
		page,
		pageSize,
		sortDirection,
		sortFieldName,
		searchValue,
	} = useAppSelector(main);

  const pageHandler = (pageSize: number) => dispatch(setPageSize({ pageSize }));

  React.useEffect(() => {
    if(inView)
      pageHandler(pageSize+5)
    
  }, [inView])


  React.useEffect(() => {
    console.log(pageSize)
  },[pageSize])

  const { postsData } = usePosts({
    end: pageSize,
    start: 0,
    order: OrderOptions.votesUp,
    limitSize: pageSize,
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
          refView={list?.length - 1!= index ? null : ref}
        />
      }
    )}
    {inView && <span className={style.feedEnd}>End of Feed</span>}
    </div>
  ) : null;
};

export default Feed;

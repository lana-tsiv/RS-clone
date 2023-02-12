import React from "react";
import { useInView } from 'react-intersection-observer'

import PostCard from "@/components/PostCard/PostCard";
import PostForm from '@/components/Form/PostForm/PostForm';

import { usePosts } from "@/hooks/usePosts";
import { OrderOptions } from "@/constants/enums";
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setPageSize, setSort } from '@/slices/main';
import { main } from '@/store/selectors'

import style from "./Feed.module.scss";
import Select from '../common/Select';

const options = [
  {
    value: `${OrderOptions.votesUp}-asc`,
    label: 'Votes Asc'
  },
  {
    value: `${OrderOptions.votesUp}-desc`,
    label: 'Votes Desc'
  },
  {
    value: `${OrderOptions.timestamp}-asc`,
    label: 'Date Asc'
  },
  {
    value: `${OrderOptions.timestamp}-desc`,
    label: 'Date Desc'
  },
]

interface IFeed {
  field?: [];
}

const Feed = (props: IFeed) => {
  const dispatch = useAppDispatch();
  const { ref, inView } = useInView()

  const {
		pageSize,
    userDisplayName,
    sortFieldName,
    sortDirection
	} = useAppSelector(main);

  const pageHandler = (pageSize: number) => dispatch(setPageSize({ pageSize }));

  const sortHandler = ({sortFieldName, sortDirection }: any) => dispatch(setSort({ sortFieldName, sortDirection }));

  const selectHandler = (e: any) => {
    const [sortFieldName, sortDirection] = e.target.value.split('-');
    console.log(sortFieldName, sortDirection)
    sortHandler({sortFieldName, sortDirection})
  }

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
    limitSize: pageSize,
    sortFieldName: sortFieldName? sortFieldName : OrderOptions.votesUp,
    sortDirection: sortDirection? sortDirection : 'desc',
  });

  const list = postsData?.docs ? postsData?.docs : null;
  return list ? (
    <div className={style.feedContainer}>
     
      {userDisplayName && <PostForm/>}
      <div className={style.sortPanel}>
        <Select
          options={options}
          onChange={selectHandler}
          name="sort"
          title="Sort by"
        />
      </div>
      {list.map((post: any, index: number) => {
        const postFields = post.data();

        return <PostCard
          key={`post-${post.id}-${index}`}
          fields={postFields}
          postId={post.id}
          refView={list?.length - 1!= index ? null : ref}
          commentsCount={!!postFields?.commentsCount ? postFields?.commentsCount : 0}
        />
      }
    )}
    {inView && <span className={style.feedEnd}>End of Feed</span>}
    </div>
  ) : null;
};

export default Feed;

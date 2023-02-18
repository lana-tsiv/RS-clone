import React from 'react';
import { useRouter } from 'next/router'
import PostCard from '@/components/PostCard/PostCard';
import { useSinglePost } from '@/hooks/usePosts';

import style from './postView.module.scss';

const UserPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { singlePost } =  useSinglePost({postId: id as string})

  const parsePost = (post: any) => post ? post?.data() : null
  const post = parsePost(singlePost)
  {console.log(post)}
  return ( post &&
    <div className={style.postWrapper}>
      <PostCard
        postId={post.postId}
        fields={post}
        commentsCount={!!post?.commentsCount ? post?.commentsCount : ''}
        isSinglePost
      />
    </div>
   );
}

export default UserPage;
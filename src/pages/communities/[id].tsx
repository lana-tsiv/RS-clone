import React, { useState } from "react";
import { useRouter } from "next/router";

import { main } from "@/store/selectors";
import { useSingleCommunity } from "@/hooks/useCommunities";
import { removeCommunity, updateCommunity } from "@/api/communities";
import Button from "@/components/common/Button";

import style from "./communitiesView.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Feed from "@/components/Feed";
import { usePosts } from "@/hooks/usePosts";
import { OrderOptions } from "@/constants/enums";
import { useInView } from "react-intersection-observer";
import { setPageSize, setSort } from "@/slices/main";
import PostForm from "@/components/Form/PostForm";
import Select from "@/components/common/Select";
import PostCard from "@/components/PostCard";

const options = [
  {
    value: `${OrderOptions.votesUp}-asc`,
    label: "Votes Asc",
  },
  {
    value: `${OrderOptions.votesUp}-desc`,
    label: "Votes Desc",
  },
  {
    value: `${OrderOptions.timestamp}-asc`,
    label: "Date Asc",
  },
  {
    value: `${OrderOptions.timestamp}-desc`,
    label: "Date Desc",
  },
];

const CommunityPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singleCommunity } = useSingleCommunity({ communityId: id as string });

  const dispatch = useAppDispatch();
  const { ref, inView } = useInView();

  const {
    pageSize,
    userDisplayName,
    sortFieldName,
    sortDirection,
    searchValue,
  } = useAppSelector(main);

  const pageHandler = (pageSize: number) => dispatch(setPageSize({ pageSize }));

  const sortHandler = ({ sortFieldName, sortDirection }: any) =>
    dispatch(setSort({ sortFieldName, sortDirection }));

  const selectHandler = (e: any) => {
    const [sortFieldName, sortDirection] = e.target.value.split("-");
    sortHandler({ sortFieldName, sortDirection });
  };

  React.useEffect(() => {
    if (inView) pageHandler(pageSize + 5);
  }, [inView]);

  React.useEffect(() => {
    console.log(pageSize);
  }, [pageSize]);

  const parseCommunity = (community: any) =>
    community ? community?.data() : null;

  const community = parseCommunity(singleCommunity);

  console.log(community);
  return (
    <div className={style.communities_wrapper}>
      <div className={style.community_title}>
        <div>{community?.displayName}</div>
        <Button
          clickHandler={() => {
            removeCommunity(id as string);
            router.push("/communities");
          }}
          text={"Remove community"}
          isSecondary
        />
      </div>
      <span className={style.descriptions}>{community?.description}</span>
      <div className={style.posts_wrapper}>
        <div className={style.posts}>
          <h2>Posts</h2>
          {community?.posts ? (
            <div className={style.feedContainer}>
              {userDisplayName &&
                community?.users?.some(
                  (item: any) => item === userDisplayName
                ) && <PostForm isCommunityPost={true} community={community} />}
              <div className={style.sortPanel}>
                <Select
                  options={options}
                  onChange={selectHandler}
                  name="sort"
                  title="Sort by"
                />
              </div>
              {community?.posts.map((post: any, index: number) => {
                return (
                  <PostCard
                    key={`post-${post.id}-${index}`}
                    fields={post}
                    postId={post.id}
                    refView={community?.posts.length - 1 != index ? null : ref}
                    commentsCount={
                      !!post?.commentsCount
                        ? post?.commentsCount
                        : ""
                    }
                  />
                );
              })}
              {inView && <span className={style.feedEnd}>End of Feed</span>}
            </div>
          ) : null}
        </div>
        <div className={style.users}>
          {!!userDisplayName &&
            community?.users?.every(
              (item: any) => item !== userDisplayName
            ) && (
              <button
                onClick={() => {
                  updateCommunity(id, {
                    displayName: community.displayName,
                    description: community?.description,
                    users: [...community.users, userDisplayName],
                    posts: community?.posts,
                  });

                  alert(`${userDisplayName} have joined the community`);
                  setTimeout(() => window.location.reload(), 1000);
                }}
              >
                Join
              </button>
            )}
          <h2>Community Members:</h2>
          {community?.users?.map((name: string, index: number) => (
            <span key={index}>{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;

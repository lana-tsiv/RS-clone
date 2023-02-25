import React from "react";
import { useRouter } from "next/router";

import { useSingleCommunity } from "@/hooks/useCommunities";

import style from "./communitiesView.module.scss";

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singleCommunity } = useSingleCommunity({ communityId: id as string });

  const parseCommunity = (community: any) =>
    community ? community?.data() : null;

  const community = parseCommunity(singleCommunity);
  console.log(community);

  return (
    <div className={style.communitiesWrapper}>
      <span>{community?.displayName}</span>
      <span className={style.descriptions}>{community?.description}</span>
    </div>
  );
};

export default UserPage;

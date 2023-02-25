import React, { useEffect, useState } from "react";

import { getAllCommunities } from "@/api/communities";

import style from "./communitiesView.module.scss";

const CommunitiesPage = () => {
  const [communitiesList, setCommunitiesList] = useState<any[]>([]);

  useEffect(() => {
    getAllCommunities().then((data) => {
      setCommunitiesList(data);
    });
  }, []);

  console.log(communitiesList);

  return (
    <div className={style.communitiesWrapper}>
      {communitiesList.map((community, index) => (
        <a href={`communities/${community.id}`} key={index}>
          {community.displayName}
        </a>
      ))}
    </div>
  );
};

export default CommunitiesPage;

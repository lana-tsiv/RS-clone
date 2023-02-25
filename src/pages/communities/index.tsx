import NextLink from "next/link";
import ReactModal from "react-modal";
import React, { useEffect, useState } from "react";

import { main } from "@/store/selectors";
import { useAppSelector } from "@/store/store";
import { getAllCommunities } from "@/api/communities";

import Button from "@/components/common/Button";
import CreateCommunityModal from "@/components/Header/Communities/CreateCommunityModal";

import style from "./communitiesView.module.scss";

const CommunitiesPage = () => {
  const [isCommunityModalOpen, setCommunityModa] = useState(false);
  const [communitiesList, setCommunitiesList] = useState<any[]>([]);
  const { userDisplayName } = useAppSelector(main);

  const isAuth = !!userDisplayName;

  useEffect(() => {
    getAllCommunities().then((data) => {
      setCommunitiesList(data);
    });
  }, []);

  return (
    <div className={style.communities_wrapper}>
      {isAuth && (
        <Button
          clickHandler={() => setCommunityModa(!isCommunityModalOpen)}
          text="create community"
          isSecondary
        />
      )}
      {communitiesList.map((community, index) => (
        <NextLink href={`communities/${community.id}`} key={index}>
          {community.displayName}
        </NextLink>
      ))}
      <ReactModal
        className={style.community_modal}
        isOpen={isCommunityModalOpen}
        onRequestClose={() => setCommunityModa(!isCommunityModalOpen)}
        ariaHideApp={false}
      >
        <div className={style.community_modal__wrapper}>
          <div />
          <div>Create your community</div>
          <Button
            clickHandler={() => setCommunityModa(!isCommunityModalOpen)}
            text="Close"
            isSecondary
          />
        </div>
        <CreateCommunityModal setCommunityModa={setCommunityModa} />
      </ReactModal>
    </div>
  );
};

export default CommunitiesPage;

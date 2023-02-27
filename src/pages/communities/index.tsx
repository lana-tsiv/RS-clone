import NextLink from "next/link";
import ReactModal from "react-modal";
import React, { useEffect, useState } from "react";

import { main } from "@/store/selectors";
import { useAppSelector } from "@/store/store";
import { getAllCommunities } from "@/api/communities";

import Button from "@/components/common/Button";
import CreateCommunityModal from "@/components/Header/Communities/CreateCommunityModal";

import style from "./communitiesView.module.scss";
import { useRouter } from 'next/router';
import { useCommunities } from '@/hooks/useCommunities';

const CommunitiesPage = () => {
  const [isCommunityModalOpen, setCommunityModa] = useState(false);
  const { userDisplayName } = useAppSelector(main);

  const { communitiesData} = useCommunities();

  const isAuth = !!userDisplayName;

  const router = useRouter();

  const handleNavigate = (id: string) => router.push(`/communities/${id}`);

  const CommunityCard = ({name, count , id, desc}: any) => {
    return (
      <div 
        className={style.cardWrapper}
        onClick={() => handleNavigate(id)}
      >
        <div className={style.cardHeader}>
          <span className={style.cardName}>
            <NextLink href={`communities/${id}`}>
                {name}
            </NextLink>  
          </span>
          <span className={style.cardCount}>{count}</span>
        </div>
        <div className={style.content}>
          <span>{desc}</span>
        </div>
      </div>
    );
  }
console.log(communitiesData)
  return (
    <div className={style.communities_wrapper}>
      {isAuth && (
        <Button
          clickHandler={() => setCommunityModa(!isCommunityModalOpen)}
          text="create community"
          isSecondary
        />
      )}
      <div className={style.communityList}>
        {communitiesData && communitiesData?.map((community: any, index: any) => (
          <CommunityCard 
            key={`community_card_${index}`}
            name={community.displayName}
            count={community.users?.length}
            id={community.id}
            desc={community.description}
          />
        ))}
      </div>
      <ReactModal
        className={style.community_modal}
        isOpen={isCommunityModalOpen}
        onRequestClose={() => setCommunityModa(!isCommunityModalOpen)}
        ariaHideApp={false}
      >
        <div className={style.community_modal__wrapper}>
          <div className={style.header}>
            <div>Create your community</div>
            <Button
              clickHandler={() => setCommunityModa(!isCommunityModalOpen)}
              text="Close"
              isSecondary
            />
          </div>
          <CreateCommunityModal setCommunityModa={setCommunityModa} />
        </div>
      </ReactModal>
    </div>
  );
};

export default CommunitiesPage;

import { useMutation, useQuery } from "@/hooks/reactQuery";
import { useQueryClient } from "@tanstack/react-query";

import { ICommunity } from "@/types/common";
import { updateCommunity } from '../api/communities';
import {
  createCommunity,
  getAllCommunities,
  getCommunity,
} from "@/api/communities";
import {
  CREATE_COMMUNITY,
  COMMUNITIES,
  SINGLE_COMMUNITY,
  UPDATE_COMMUNITY,
} from "@/constants/queryKeys";

export const useCommunities = () => {
  const queryClient = useQueryClient();
  const {
    data: communitiesData,
    isLoading: isLoadingCommunities,
    isFetching: isFetchingCommunities,
  } = useQuery({
    queryKey: [COMMUNITIES],
    queryFn: () => getAllCommunities(),
    refetchOnWindowFocus: false,
    onSuccess: (res: any) => {
      console.log(res);
      console.log("COMMUNITIES FETCHED");
    },
  });

  const { mutate: handleCreateCommunity, isLoading: isLoadingCreateCommunity } =
    useMutation<ICommunity>({
      mutationKey: [CREATE_COMMUNITY],
      mutationFn: createCommunity,
      onSuccess: () => {
        return [queryClient.invalidateQueries([COMMUNITIES])];
      },
    });

  return {
    communitiesData,
    handleCreateCommunity,
    isLoadingCommunities: isLoadingCommunities || isFetchingCommunities,
    isLoadingCreateCommunity,
  };
};

export const useSingleCommunity = ({ communityId }: any) => {
  const queryClient = useQueryClient();

  const { data: singleCommunity } = useQuery({
    queryKey: [
      SINGLE_COMMUNITY,
      communityId,
    ],
    queryFn: () => getCommunity(communityId),
    refetchOnWindowFocus: false,
    enabled: [!!communityId],
    onSuccess: () => {
      console.log("SINGLE COMMUNITY FETCHED");
    },
  });

  const { 
    mutate: handleUpdateCommunity,
    isLoading: isLoadingUpdateCommunity 
  } =
    useMutation<any>({
      mutationKey: [UPDATE_COMMUNITY],
      mutationFn: updateCommunity,
      enabled: [!!communityId],
      onSuccess: () => {
        return [
          queryClient.invalidateQueries([COMMUNITIES]),
          queryClient.invalidateQueries([SINGLE_COMMUNITY])
        ];
      },
    });

  return { 
    singleCommunity,
    handleUpdateCommunity,
    isLoadingUpdateCommunity
   };
};

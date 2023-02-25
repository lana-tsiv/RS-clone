import { useMutation, useQuery } from "@/hooks/reactQuery";
import { useQueryClient } from "@tanstack/react-query";

import { ICommunity } from "@/types/common";
import {
  createCommunity,
  getAllCommunities,
  getCommunity,
} from "@/api/communities";
import {
  CREATE_COMMUNITY,
  COMMUNITIES,
  SINGLE_COMMUNITY,
} from "@/constants/queryKeys";

export const useCommunities = () => {
  const queryClient = useQueryClient();
  const {
    data: communitiesData,
    isLoading: isLoadingCommunities,
    isFetching: isFetchingCommunities,
  } = useQuery({
    queryKey: [COMMUNITIES],
    queryFn: () => getAllCommunities,
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
  const { data: singleCommunity } = useQuery({
    queryKey: [SINGLE_COMMUNITY, communityId],
    queryFn: () => getCommunity(communityId),
    refetchOnWindowFocus: false,
    enabled: [!!communityId],
    onSuccess: () => {
      console.log("SINGLE COMMUNITY FETCHED");
    },
  });

  return { singleCommunity };
};

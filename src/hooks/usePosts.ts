import { useMutation, useQuery } from '@/hooks/reactQuery';

import { CREATE_POST, POSTS, VOTE_POST } from '@/constants/queryKeys';
import { createPost, getAllPosts, updatePost } from '@/api/posts';
import { IPost } from '../types/common';

export const usePosts = (params?: any) => {

    const {
		end,
		start,
		order,
		limitSize,
	} = params || {};

    const {
		data: postsData,
		isLoading: isLoadingPosts,
		isFetching: isFetchingPosts,
	} = useQuery({
		queryKey: [POSTS],
		queryFn: () => getAllPosts({ end, start, order,limitSize }),
		refetchOnWindowFocus: false,
	});

	const {
		mutate: handleCreatePost,
		isLoading: isLoadingCreatePost,
	} = useMutation<IPost>({
		mutationKey: [CREATE_POST],
		mutationFn: createPost,
		onSuccess: () => {
			console.log('POST ADDED')
		},
	});

	return { 
		postsData,
		handleCreatePost,
		isLoadingPosts: isLoadingPosts || isFetchingPosts,
		isLoadingCreatePost,
	};
};

export const useMangePosts = () => {
	const {
		mutate: handleVotePost,
	} = useMutation({
		mutationKey: [VOTE_POST],
		mutationFn: updatePost,
		onSuccess: () => {
			console.log('POST VOTED')
		},
	});

	return { handleVotePost }
}

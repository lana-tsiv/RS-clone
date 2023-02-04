import { createPost, getAllPosts } from '@/api/posts';
import { CREATE_POST, POSTS } from '@/constants/queryKeys';
import { useMutation, useQuery } from '@/hooks/reactQuery';
import { IPost } from '@/types/common';

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
	} = useMutation({
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
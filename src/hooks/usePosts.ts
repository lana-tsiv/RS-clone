import { useMutation, useQuery } from '@/hooks/reactQuery';
import { useQueryClient } from '@tanstack/react-query';

import { CREATE_POST, POSTS, VOTE_POST } from '@/constants/queryKeys';
import { createPost, getAllPosts, getPost, updatePost } from '@/api/posts';

import { IPost } from '@/types/common';
import { SINGLE_POST } from '../constants/queryKeys';

export const usePosts = (params?: any) => {
	const queryClient = useQueryClient();

    const {
		end,
		start,
		limitSize,
		sortFieldName,
		sortDirection,
		searchValue,
		postId
	} = params || {};

    const {
		data: postsData,
		isLoading: isLoadingPosts,
		isFetching: isFetchingPosts,
	} = useQuery({
		queryKey: [
			POSTS,
			limitSize,
			sortFieldName,
			sortDirection,
			searchValue
		],
		queryFn: () => getAllPosts({ 
			end,
			start,
			sortFieldName,
			sortDirection,
			limitSize,
			searchValue
		}),
		refetchOnWindowFocus: false,
		onSuccess: () => {
			console.log('POSTS FETCHED')
		}
	});

	const {
		data: singlePost
	} = useQuery({
		queryKey: [
			SINGLE_POST,
			postId
		],
		queryFn: () => getPost(postId),
		refetchOnWindowFocus: false,
		enabled: [!!postId],
		onSuccess: () => {
			console.log('SINGLE POST FETCHED')
		}
	});

	const {
		mutate: handleCreatePost,
		isLoading: isLoadingCreatePost,
	} = useMutation<IPost>({
		mutationKey: [CREATE_POST],
		mutationFn: createPost,
		onSuccess: () => {
			return [ queryClient.invalidateQueries([POSTS]) ];
		},
	});

	return { 
		postsData,
		singlePost: singlePost || null,
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

export const useSinglePost = ({postId}: any) => {
	const {
		data: singlePost
	} = useQuery({
		queryKey: [
			SINGLE_POST,
			postId
		],
		queryFn: () => getPost(postId),
		refetchOnWindowFocus: false,
		enabled: [!!postId],
		onSuccess: () => {
			console.log('SINGLE POST FETCHED')
		}
	});

	return { singlePost }
}
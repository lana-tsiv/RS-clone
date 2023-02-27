import { useMutation, useQuery } from '@/hooks/reactQuery';
import { useQueryClient } from '@tanstack/react-query';

import { CREATE_POST, POSTS, VOTE_POST } from '@/constants/queryKeys';
import { createPost, getAllPosts, updatePost } from '@/api/posts';

import { IPost } from '@/types/common';
import { createUser, getUserByEmail } from '@/api/users';

export const useUsers = (params?: any) => {
	const queryClient = useQueryClient();

    const {
		email,
		lastname,
		name,
		displayName,
		password,
		role
	} = params || {};

    const {
		data: userData,
		isLoading: isLoadingUser,
		isFetching: isFetchingUser,
	} = useQuery({
		queryKey: [
			'users',
		],
		queryFn: () => getUserByEmail({email}),
		refetchOnWindowFocus: false,
		onSuccess: () => {
			console.log('USER FETCHED')
		}
	});

	const {
		mutate: handleCreateUser,
		isLoading: isLoadingCreateUser,
	} = useMutation<IPost>({
		mutationKey: ['create-user'],
		mutationFn: () => createUser(params),
		onSuccess: () => {
			return [ queryClient.invalidateQueries([POSTS]) ];
		},
	});

	return { 
		postsData: userData,
		handleCreatePost: handleCreateUser,
		isLoadingPosts: isLoadingUser || isFetchingUser,
		isLoadingCreatePost: isLoadingCreateUser,
	};
};

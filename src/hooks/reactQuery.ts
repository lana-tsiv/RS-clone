import {
	MutationKey,
	QueryFunction,
	QueryKey,
	useMutation as useReactMutation,
	useQuery as useReactQuery,
} from '@tanstack/react-query';

interface UseReactQueryParams {
	queryKey: QueryKey;
	queryFn: QueryFunction;
	select?: (_data: any) => unknown;

	[x: string]: any;
}

interface UseReactMutationParams {
	mutationKey: MutationKey;
	mutationFn: any;
	onSuccess?: any;
	onError?: any;

	[x: string]: any;
}

const useQuery = ({ queryKey, queryFn, select, ...rest }: UseReactQueryParams): any => {
	const { enabled = [], ...options } = rest;

	const { data, error, isFetching, status, isLoading } = useReactQuery<any>(queryKey, queryFn, {
		retry: 0,
		select,
		keepPreviousData: true,
		...options,
	});

	return { data, error, isFetching, status, isLoading };
};

const useMutation = ({
	mutationKey,
	mutationFn,
	onSuccess,
	onError,
	...rest
}: UseReactMutationParams) => {

	const {
		data,
		error,
		isError,
		isLoading,
		isSuccess,
		mutate,
		mutateAsync,
		status,
	} = useReactMutation<any>(mutationFn, {
		mutationKey,
		onSuccess,
		...rest,
	});

	return { data, error, isError, isSuccess, isLoading, mutate, mutateAsync, status };
};

export {
	useQuery,
	useMutation,
};

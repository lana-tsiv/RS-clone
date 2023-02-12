import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
	page: number;
	pageSize: number;
	userDisplayName: string | null;
	userEmail: string | null;
	sortDirection: boolean | null;
	sortFieldName: string | null;
	searchValue: string;
}

const initialState: InitialState = {
	page: 1,
	pageSize: 5,
	sortDirection: false,
	sortFieldName: null,
	searchValue: '',
	userDisplayName: null,
	userEmail: null,
};

const common = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setUserEmail: (state, action: PayloadAction<{ userEmail: string | null }>) => {
			state.userEmail = action.payload.userEmail;
		},
		setUserDisplayName: (state, action: PayloadAction<{ userDisplayName: string | null }>) => {
			state.userDisplayName = action.payload.userDisplayName;
		},
		setPage: (state, action: PayloadAction<{ page: number }>) => {
			state.page = action.payload.page;
		},
		setPageSize: (state, action: PayloadAction<{ pageSize: number }>) => {
			state.pageSize = action.payload.pageSize;
			state.page = initialState.page;
		},
		setSort: (state, action: PayloadAction<{
			sortDirection: boolean | null;
			sortFieldName: string | null;
		}>) => {
			state.sortDirection = action.payload.sortDirection;
			state.sortFieldName = action.payload.sortFieldName;
		},
		setSearchValue: (state, action: PayloadAction<{ searchValue: string }>) => {
			state.searchValue = action.payload.searchValue;
			state.page = 1;
		},
	},
});

export const {
	setPage,
	setPageSize,
	setSort,
	setSearchValue,
	setUserEmail,
	setUserDisplayName,
} = common.actions;

export default common.reducer;

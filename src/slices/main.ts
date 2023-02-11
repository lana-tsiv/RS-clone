import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
	page: number;
	pageSize: number;
	sortDirection: boolean | null;
	sortFieldName: string | null;
	searchValue: string;
}

const initialState: InitialState = {
	page: 1,
	pageSize: 10,
	sortDirection: false,
	sortFieldName: null,
	searchValue: '',
};

const common = createSlice({
	name: 'main',
	initialState,
	reducers: {
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
} = common.actions;

export default common.reducer;

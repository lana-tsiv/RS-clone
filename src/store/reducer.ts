import main from '@/slices/main';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
	main
});

export type RootReducerType = typeof rootReducer;
export type AppRootStateType = ReturnType<RootReducerType>;

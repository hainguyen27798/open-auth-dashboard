import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/lib/store/store';
import type { TSearchState, User } from '@/types';

type TUserState = {
    searchUserState: TSearchState;
    currentUser: {
        isLoading: true;
        data: User | null;
    };
};

const initialState: TUserState = {
    searchUserState: {
        name: 'user',
        reload: 0,
        search: '',
        by: '',
    },
    currentUser: {
        isLoading: true,
        data: null,
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeSearchUserAction: (state, action) => {
            return {
                ...state,
                searchUserState: {
                    ...state.searchUserState,
                    ...action.payload,
                },
            };
        },
        changeCurrentUserAction: (state, action) => {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    ...action.payload,
                },
            };
        },
    },
});

export const { changeSearchUserAction, changeCurrentUserAction } = userSlice.actions;

export const selectSearchUserState = (state: RootState) => state.user.searchUserState;

export const selectCurrentUserState = (state: RootState) => state.user.currentUser;

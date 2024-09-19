import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/lib/store/store';
import type { Role, TSearchState } from '@/types';

type TRoleState = {
    searchRoleState: TSearchState;
    currentRole: {
        isLoading: true;
        data: Role | null;
    };
    reloadRolePermissions: number;
};

const initialState: TRoleState = {
    searchRoleState: {
        name: 'role',
        reload: 0,
        search: '',
        by: '',
        page: 1,
        pageSize: 5,
    },
    currentRole: {
        isLoading: true,
        data: null,
    },
    reloadRolePermissions: 0,
};

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        changeSearchRoleAction: (state, action) => {
            return {
                ...state,
                searchRoleState: {
                    ...state.searchRoleState,
                    ...action.payload,
                },
            };
        },
        changeCurrentRoleAction: (state, action) => {
            return {
                ...state,
                currentRole: {
                    ...state.currentRole,
                    ...action.payload,
                },
            };
        },
        reloadRolePermission: (state) => {
            return {
                ...state,
                reloadRolePermissions: Date.now(),
            };
        },
    },
});

export const { changeSearchRoleAction, changeCurrentRoleAction, reloadRolePermission } = roleSlice.actions;

export const selectSearchRoleState = (state: RootState) => state.role.searchRoleState;

export const selectCurrentRoleState = (state: RootState) => state.role.currentRole;

export const selectReloadRolePermission = (state: RootState) => state.role.reloadRolePermissions;

import { combineReducers } from 'redux';

import { permissionSlice, roleSlice, userSlice } from '@/lib/store/slices';

const rootReducer = combineReducers({
    permission: permissionSlice.reducer,
    role: roleSlice.reducer,
    user: userSlice.reducer,
});

export default rootReducer;

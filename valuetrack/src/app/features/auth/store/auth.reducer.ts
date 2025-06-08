import { createReducer, on } from "@ngrx/store";
import { initialAuthState } from "./auth.state";
import { loginSuccess, logout } from "./auth.actions";

export const authReducer = createReducer(
    initialAuthState,
    on(loginSuccess, (state, { user }) => ({
        ...state,
        user,
        isLoggedIn: true
    })),
    on(logout, state => ({
        ...state,
        user: null,
        isLoggedIn: false
    }))
);
export interface AuthState {
  user: any | null;
  isLoggedIn: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  isLoggedIn: false
};

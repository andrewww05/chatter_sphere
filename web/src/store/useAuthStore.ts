import api from '@/shared/http/instances';
import { create } from 'zustand';

enum AuthStatus {
    AUTHORIZED = 'authorized',
    UNAUTHORIZED = 'unauthorized',
    PENDING = 'pending',
}

interface AuthState {
    status: AuthStatus;
}

interface AuthActions {
    authorize: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>()((set) => ({
    status: AuthStatus.UNAUTHORIZED,
    authorize: async () => {
        set({ status: AuthStatus.PENDING });

        try {
            api.authorized.get('');
        } catch (error) {}
    },
}));

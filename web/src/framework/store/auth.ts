import { defineStore, acceptHMRUpdate } from 'pinia';
import { User } from '../../types';

export const useAuth = defineStore({
    id: 'auth',
    state: () => ({
        email: 'guest',
        isAdmin: false
    }),

    actions: {
        logout() {
            this.$patch({
                email: 'guest',
                isAdmin: false
            });
        },

        async login(user: User) {
            this.$patch({
                email: user.email,
                isAdmin: true
            });
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}

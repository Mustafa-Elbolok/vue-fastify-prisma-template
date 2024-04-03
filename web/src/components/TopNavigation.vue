<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import http from '../framework/utils/http';
import { storeToRefs } from 'pinia';
import { useAuth } from '../framework/store/auth';

const { logout } = useAuth();
const { isAdmin } = storeToRefs(useAuth());
const router = useRouter();

const drawer = ref(false);

function closeDrawer() {
    drawer.value = false;
}

function openDrawer() {
    drawer.value = true;
}

async function Logout() {
    closeDrawer();
    const response = await http.delete('/logout');
    if (response.status == 200) {
        logout();
        router.push('/');
    }
}
</script>

<template>
    <div class="page-top-app-bar">
        <ui-top-app-bar
            content-selector="#content-main"
            type="0"
            title="simple"
            @nav="openDrawer"
        />

        <ui-drawer v-model="drawer" type="modal">
            <ui-drawer-header
                class="inline-flex items-center cursor-pointer"
                @click="closeDrawer"
            >
                <img
                    src="/images/logo-primary.svg"
                    alt="logo"
                    class="max-h-[2rem] mt-5"
                />
                <ui-drawer-title> Simple </ui-drawer-title>
            </ui-drawer-header>
            <ui-drawer-content class="flex flex-col justify-between">
                <ui-list>
                    <ui-item @click="closeDrawer">
                        <RouterLink to="/">
                            <ui-item-first-content>
                                <ui-icon>home</ui-icon>
                            </ui-item-first-content>
                            <ui-item-text-content>Home</ui-item-text-content>
                        </RouterLink>
                    </ui-item>
                    <ui-item @click="closeDrawer">
                        <RouterLink to="/categories">
                            <ui-item-first-content>
                                <ui-icon>category</ui-icon>
                            </ui-item-first-content>
                            <ui-item-text-content
                                >Categories</ui-item-text-content
                            >
                        </RouterLink>
                    </ui-item>
                    <ui-item @click="closeDrawer">
                        <RouterLink to="/products">
                            <ui-item-first-content>
                                <ui-icon>local_offer</ui-icon>
                            </ui-item-first-content>
                            <ui-item-text-content
                                >Products</ui-item-text-content
                            >
                        </RouterLink>
                    </ui-item>
                    <ui-item @click="closeDrawer">
                        <RouterLink to="/dashboard">
                            <ui-item-first-content>
                                <ui-icon>dashboard</ui-icon>
                            </ui-item-first-content>
                            <ui-item-text-content
                                >Dashboard</ui-item-text-content
                            >
                        </RouterLink>
                    </ui-item>
                </ui-list>
                <ui-list v-if="isAdmin">
                    <ui-item @click="Logout">
                        <ui-item-first-content>
                            <ui-icon>logout</ui-icon>
                        </ui-item-first-content>
                        <ui-item-text-content>Logout</ui-item-text-content>
                    </ui-item>
                </ui-list>
            </ui-drawer-content>
        </ui-drawer>
    </div>
</template>

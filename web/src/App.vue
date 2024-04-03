<script setup lang="ts">
import { useRouter } from 'vue-router';
import DefaultLayout from './layouts/DefaultLayout.vue';
import { watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuth } from './framework/store/auth';
import http from './framework/utils/http';

const router = useRouter();
const { isAdmin } = storeToRefs(useAuth());

http.get('/me').then((res) => {
    if (res) useAuth().login(res.data.data.user);
});

watchEffect(() => {
    const { path, meta } = router.currentRoute.value;
    if (path == '/dashboard/login' && isAdmin.value) router.push('/dashboard');

    if (meta.requiresAuth && !isAdmin.value) router.push('/dashboard/login');
});
</script>

<template>
    <div class="w-full h-full">
        <DefaultLayout>
            <router-view :key="$route.fullPath" />
        </DefaultLayout>
    </div>
</template>

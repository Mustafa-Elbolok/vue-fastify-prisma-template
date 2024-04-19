<script setup lang="ts">
import { useRouter } from 'vue-router';
import DefaultLayout from './layouts/DefaultLayout.vue';
import { watchEffect } from 'vue';

const router = useRouter();

watchEffect(() => {
    const { path } = router.currentRoute.value;
    if (path == '/dashboard/login') router.push('/dashboard');

    // if (meta.requiresAuth && !isAdmin.value) router.push('/dashboard/login');
});
</script>

<template>
    <div class="w-full h-full">
        <DefaultLayout>
            <router-view :key="$route.fullPath" />
        </DefaultLayout>
    </div>
</template>

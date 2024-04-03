<script setup lang="ts">
import QuickAccess from '../components/QuickAccess.vue';
import Activites from '../components/Activites.vue';
</script>

<template>
    <div class="w-full h-full grid justify-items-center items-center pt-16">
        <div
            class="w-[85%] h-[90%] flex flex-col gap-y-10 bg-gray-100 rounded-xl p-10"
        >
            <header class="text-[1.3vw] font-semibold">
                Welcome back, Admin.
            </header>
            <QuickAccess />
            <Activites />
        </div>
    </div>
</template>

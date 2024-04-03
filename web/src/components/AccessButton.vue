<script setup lang="ts">
defineProps<{
    to: string;
    icon?: string;
}>();
</script>
<template>
    <router-link :to="to">
        <ui-button class="w-[12vw] text-[1vw] font-semibold h-[6vh]" outlined>
            <ui-icon v-if="icon">{{ icon }}</ui-icon>
            <slot></slot>
        </ui-button>
    </router-link>
</template>

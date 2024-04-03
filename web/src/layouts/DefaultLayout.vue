<script lang="ts">
import TopNavigation from '../components/TopNavigation.vue';

export default {
    name: 'DefaultLayout',
    components: {
        TopNavigation
    },
    setup() {}
};
</script>

<template>
    <TopNavigation />
    <slot></slot>
</template>

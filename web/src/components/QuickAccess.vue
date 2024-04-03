<script setup lang="ts">
import AccessButton from './AccessButton.vue';
</script>
<template>
    <div class="h-fit">
        <header class="text-[1.2vw] font-[500]">Quick Access</header>
        <div class="flex justify-evenly mt-7 gap-x-3">
            <AccessButton to="/dashboard/categories" icon="category">
                Categories
            </AccessButton>
            <AccessButton to="/dashboard/products" icon="local_offer">
                Products
            </AccessButton>
            <AccessButton to="/dashboard/categories/create">
                Add category
            </AccessButton>
            <AccessButton to="/dashboard/products/create">
                Add product
            </AccessButton>
        </div>
    </div>
</template>

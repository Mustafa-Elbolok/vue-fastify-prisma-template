<script setup lang="ts">
import { reactive, ref } from 'vue';
import http from '../framework/utils/http';
import CategoriesTab from '../components/CategoriesTab.vue';
import ProductsTab from '../components/ProductsTab.vue';
import { useRoute } from 'vue-router';

const category = reactive({
    name: '',
    id: null as number | null
});
const active = ref(0);

const route = useRoute();

http.get(`/api/category/${route.params.id}`).then(({ status, data }) => {
    if (status == 200) {
        const { category: categoryData } = data.data;
        category.name = categoryData.name;
        category.id = categoryData.id;
    }
});
</script>
<template>
    <div
        v-if="category.id"
        class="w-full h-full grid justify-items-center items-center pt-16"
    >
        <div class="w-[85%] h-[90%] flex flex-col gap-y-10 rounded-xl p-7">
            <header class="flex justify-between">
                <h2 class="text-[1.3vw]">Categories</h2>
            </header>
            <ui-tab-bar v-model="active">
                <ui-tab :key="0" content-indicator> products </ui-tab>
                <ui-tab :key="1" content-indicator> categories </ui-tab>
            </ui-tab-bar>
            <ProductsTab v-if="!active" :id="category.id" />
            <CategoriesTab v-else :id="category.id" />
        </div>
    </div>
</template>

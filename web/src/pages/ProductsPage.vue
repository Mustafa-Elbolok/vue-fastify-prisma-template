<script setup lang="ts">
import { reactive, watch } from 'vue';
import http from '../framework/utils/http';
import { Product } from '../types';

const pagination = reactive({
    page: 1,
    total: 0
});
const rows = reactive({
    data: [] as Product[]
});

watch(
    () => pagination.page,
    async () => {
        const { status, data } = await http.get(
            `/api/product?page=${pagination.page}&limit=10`
        );
        if (status == 200) {
            const { products } = data.data;
            rows.data = products;
            pagination.total = data.pagination.total;
        }
    },
    { immediate: true }
);
</script>
<template>
    <div class="w-full h-full grid justify-items-center items-center pt-16">
        <div class="w-[85%] h-[90%] flex flex-col gap-y-10 rounded-xl p-7">
            <header class="flex justify-between">
                <h2 class="text-[1.3vw]">Products</h2>
            </header>
            <div v-if="pagination.total > 0" class="flex flex-col gap-y-7">
                <ui-pagination
                    v-model="pagination.page"
                    :total="pagination.total"
                    show-total
                    :page-size="10"
                    position="right"
                >
                </ui-pagination>
                <div class="flex w-full flex-wrap gap-y-[5vh] pb-[5vh]">
                    <div v-for="row of rows.data" class="w-[33%] px-[2%]">
                        <ui-card>
                            <ui-card-content>
                                <ui-card-media class="w-full">
                                    <img
                                        class="w-full aspect-square"
                                        :src="row.picture"
                                        alt="product"
                                        :onerror="(e: any)=> e.target.src = `/images/product-placeholder.png`"
                                    />
                                </ui-card-media>
                                <div>
                                    <div class="p-4">{{ row.name }}</div>
                                </div>
                            </ui-card-content>
                            <ui-list-divider></ui-list-divider>
                            <div
                                class="inline-flex w-full justify-between items-center px-4"
                            >
                                {{ row.category?.name }}
                                <router-link
                                    :to="`/categories/${row.category_id}`"
                                >
                                    <ui-button
                                        class="w-[8vw] text-[.8vw] font-semibold h-[6vh] self-end"
                                    >
                                        See Category
                                    </ui-button>
                                </router-link>
                            </div>
                        </ui-card>
                    </div>
                </div>
            </div>
            <h2 class="text-center text-[1vw]" v-else>No products.</h2>
        </div>
    </div>
</template>

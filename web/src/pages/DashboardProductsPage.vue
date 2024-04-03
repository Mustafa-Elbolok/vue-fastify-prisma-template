<script setup lang="ts">
import { reactive, watch } from 'vue';
import http from '../framework/utils/http';
import { Product } from '../types';

const pagination = reactive({
    page: 1,
    total: 0
});
const rows = reactive({
    data: []
});

const dialog = reactive({
    open: false
});

const head = ['Name', 'Category', 'Created at', 'actions'];
const body = [
    'name',
    {
        fied: 'category',
        fn: (data: Product) => data.category && data.category.name
    },
    {
        fied: 'created_at',
        fn: (data: Product) =>
            data.created_at && new Date(data.created_at).toLocaleDateString()
    },
    {
        slot: 'actions'
    }
];

const removeProduct = async (id: number) => {
    const { status } = await http.delete(`/api/product/${id}`);
    if (status == 202) {
        const { status, data } = await http.get(
            `/api/product?page=${pagination.page}&limit=10`
        );
        if (status == 200) {
            dialog.open = false;
            const { products } = data.data;
            rows.data = products;
            pagination.total = data.pagination.total;
        }
    }
};

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
        <div
            class="w-[85%] h-[90%] flex flex-col gap-y-10 bg-gray-100 rounded-xl p-7"
        >
            <header class="flex justify-between">
                <h2 class="text-[1.3vw]">Products</h2>
                <router-link to="/dashboard/products/create">
                    <ui-button
                        class="w-30 text-[.8vw] font-semibold h-12"
                        unelevated
                    >
                        Add Product
                    </ui-button>
                </router-link>
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
                <ui-table
                    class="w-full max-h-[82%]"
                    :data="rows.data"
                    :thead="head"
                    :tbody="body"
                >
                    <template #actions="{ data }">
                        <router-link :to="`/dashboard/products/${data.id}`">
                            <ui-icon>edit</ui-icon>
                        </router-link>
                        <ui-icon
                            @click="() => removeProduct(data.id)"
                            class="text-red-600 pl-4 cursor-pointer"
                            >delete
                        </ui-icon>
                    </template>
                </ui-table>
            </div>
            <h2 class="text-center text-[1vw]" v-else>No products.</h2>
        </div>
    </div>
</template>

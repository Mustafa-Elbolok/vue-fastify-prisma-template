<script setup lang="ts">
import { reactive, watch } from 'vue';
import http from '../framework/utils/http';
import { Category } from '../types';

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

const head = [
    'Name',
    'Main Category',
    'Sub Categories',
    'products',
    'created at',
    'actions'
];
const body = [
    'name',
    'parent',
    'subCategoriesCount',
    'productsCount',
    {
        fied: 'created_at',
        fn: (data: Category) =>
            data.created_at && new Date(data.created_at).toLocaleDateString()
    },
    {
        slot: 'actions'
    }
];

const confirm = async (id: number) => {
    const { status } = await http.post('/confirm', {});
    if (status == 200) {
        const { status } = await http.delete(`/api/category/${id}`);
        if (status == 202) {
            const { status, data } = await http.get(
                `/api/category?page=${pagination.page}&limit=10`
            );
            if (status == 200) {
                dialog.open = false;
                const { categories, totalCategories } = data.data;
                rows.data = categories;
                pagination.total = totalCategories;
            }
        }
    }
};

watch(
    () => pagination.page,
    async () => {
        const { status, data } = await http.get(
            `/api/category?page=${pagination.page}&limit=10`
        );
        if (status == 200) {
            const { categories, totalCategories } = data.data;
            rows.data = categories;
            pagination.total = totalCategories;
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
                <h2 class="text-[1.3vw]">Categories</h2>
                <router-link to="/dashboard/categories/create">
                    <ui-button
                        class="w-30 text-[.8vw] font-semibold h-12"
                        unelevated
                    >
                        Add Category
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
                        <router-link :to="`/dashboard/categories/${data.id}`">
                            <ui-icon>edit</ui-icon>
                        </router-link>
                        <ui-icon
                            @click="() => (dialog.open = true)"
                            class="text-red-600 pl-4 cursor-pointer"
                            >delete
                        </ui-icon>
                        <ui-dialog v-model="dialog.open">
                            <ui-dialog-title>Confirm required</ui-dialog-title>
                            <ui-dialog-content>
                                Are you sure you want to delete this category
                            </ui-dialog-content>
                            <ui-dialog-actions>
                                <ui-button
                                    class="w-22 text-[.7vw] font-semibold h-12"
                                    @click="() => (dialog.open = false)"
                                >
                                    cancel
                                </ui-button>
                                <ui-button
                                    class="w-22 text-[.7vw] font-semibold h-12"
                                    @click="() => confirm(data.id)"
                                >
                                    Confirm
                                </ui-button>
                            </ui-dialog-actions>
                        </ui-dialog>
                    </template>
                </ui-table>
            </div>
            <h2 class="text-center text-[1vw]" v-else>No categories.</h2>
        </div>
    </div>
</template>

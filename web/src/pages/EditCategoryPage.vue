<script setup lang="ts">
import { reactive, ref } from 'vue';
import http from '../framework/utils/http';
import { useRoute, useRouter } from 'vue-router';

const category = reactive({
    name: '',
    picture: null as File | null
});

const image = ref(null as string | null);
const router = useRouter();
const route = useRoute();

http.get(`/api/category/${route.params.id}`).then(({ status, data }) => {
    if (status == 200) {
        const { category: categoryData } = data.data;
        category.name = categoryData.name;
        image.value = categoryData.picture;
    }
});

const uploadFileHandler = (event: any) => {
    image.value = null;
    category.picture = null;
    category.picture = event.target.files[0];
    image.value = URL.createObjectURL(event.target.files[0]);
};

const updateCategory = async () => {
    const { status } = await http.put(
        `/api/category/${route.params.id}`,
        category,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    if (status == 202) router.push('/dashboard/categories');
};

const onImageError = async () => {
    image.value = null;
};
</script>
<template>
    <div class="w-full h-full grid justify-items-center items-center pt-16">
        <div
            class="w-[85%] h-[90%] flex flex-col gap-y-10 bg-gray-100 rounded-xl p-7"
        >
            <header class="flex justify-between">
                <h2 class="text-[1.3vw]">Create Category</h2>
                <div class="flex gap-x-4">
                    <router-link to="/dashboard">
                        <ui-button
                            class="w-36 text-[.8vw] font-semibold h-12"
                            outlined
                        >
                            Cancel
                        </ui-button>
                    </router-link>
                    <ui-button
                        class="w-36 text-[.8vw] font-semibold h-12"
                        unelevated
                        @click="updateCategory"
                    >
                        update
                    </ui-button>
                </div>
            </header>
            <div class="grid grid-cols-2 w-full place-items-center">
                <section class="grid w-1/2">
                    <label
                        id="name-label"
                        class="text-[.8rem] translate-y-[50%] bg-gray-100 w-fit z-10 px-1 ml-2 text-gray-500"
                    >
                        Category name
                    </label>
                    <ui-textfield
                        v-model="category.name"
                        outlined
                        required
                        input-type="text"
                        :attrs="{
                            placeholder: 'Category name',
                            labelId: '#email-label',
                            autocomplete: 'off'
                        }"
                        placeholder="Category name"
                    />
                </section>
                <section class="grid col-[1/-1] w-full place-items-center py-7">
                    <header class="flex justify-between place-self-start pb-5">
                        <h2 class="text-[1.2vw]">Select picture</h2>
                    </header>
                    <section
                        class="h-[33vh] aspect-square grid grid-cols-1 grid-rows-1 overflow-hidden"
                    >
                        <div
                            v-if="image"
                            class="bg-slate-400 h-[33vh] w-[100%] aspect-square rounded-3xl overflow-hidden place-items-center grid"
                        >
                            <img
                                class="w-[90%] h-[90%] z-10"
                                :src="image"
                                :onerror="onImageError"
                            />
                        </div>
                        <div
                            v-else
                            class="bg-slate-400 h-[33vh] w-[100%] aspect-square rounded-3xl overflow-hidden"
                        >
                            <img
                                class="w-full h-full z-10"
                                src="/images/uploader.jpg"
                                alt="upload image here"
                            />
                        </div>
                        <input
                            type="file"
                            required
                            class="h-[100%] aspect-square z-20 cursor-pointer opacity-0 rounded-3xl"
                            :onchange="uploadFileHandler"
                        />
                    </section>
                </section>
            </div>
        </div>
    </div>
</template>

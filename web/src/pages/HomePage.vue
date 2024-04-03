<template>
    <div
        class="w-full h-full grid grid-cols-2 grid-flow-col justify-items-center items-center"
    >
        <div id="infograph" class="w-fit text-left grid items-center">
            <h2 class="text-[#6200ee] text-[8vw] leading-tight font-semibold">
                Simple.
            </h2>
            <h3 class="text-[1.75vw] ml-2">
                Shop smarter, keep it
                <span class="text-[#6200ee]">Simple.</span>
            </h3>
            <div class="flex justify-between mt-7 gap-x-3">
                <router-link to="/categories">
                    <ui-button
                        class="w-[15vw] text-[1.2vw] font-semibold h-[7vh]"
                        unelevated
                    >
                        See Categories
                    </ui-button>
                </router-link>
                <router-link to="/products">
                    <ui-button
                        class="w-[17vw] text-[1.2vw] font-semibold h-[7.2vh]"
                        outlined
                    >
                        Search Products
                    </ui-button>
                </router-link>
            </div>
        </div>
        <img
            src="/images/landing-illusion.svg"
            alt="Illusion"
            class="max-h-[50vh]"
        />
    </div>
</template>

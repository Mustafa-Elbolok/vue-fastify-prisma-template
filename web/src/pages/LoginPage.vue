<script setup lang="ts">
import { ref } from 'vue';
import http from '../framework/utils/http';
import { useRouter } from 'vue-router';
import { useAuth } from '../framework/store/auth';
import { useToast } from 'vue-toast-notification';

const email = ref('');
const password = ref('');
const { login } = useAuth();
const router = useRouter();
const toast = useToast();

async function submitLogin() {
    const response = await http.post('/login', {
        email: email.value,
        password: password.value
    });
    if (response.status == 200) {
        login(response.data.data.user);
        router.push('/dashboard');
    } else {
        toast.error('Invalid credentials');
    }
}
</script>

<template>
    <ui-card
        outlined
        class="w-fit h-fit items-center justify-items-center flex translate-x-[calc(50vw_-_50%)] translate-y-[calc(50vh_-_50%)]"
    >
        <div class="px-5 pt-5 text-center">
            <h2 class="text-[1.8rem] font-semibold">Welcome to</h2>
            <div class="grid grid-flow-col items-center text-center h-fit my-2">
                <img
                    src="/images/logo-primary.svg"
                    alt="logo"
                    class="max-h-[2rem] mt-1"
                />
                <h2 class="text-[1.3rem]">simple's dashboard</h2>
            </div>
            <ui-list-divider />
            <p class="text-gray-500 mt-2 text-[.8rem]">
                Plesae login with admin account <br />
                to access dashboard.
            </p>
        </div>
        <form class="max-w-[90vw] w-[350px] p-5" method="post">
            <section class="grid">
                <label
                    id="email-label"
                    class="text-[.8rem] translate-y-[50%] bg-white w-fit z-10 px-1 ml-2 text-gray-500"
                >
                    Email
                </label>
                <ui-textfield
                    v-model="email"
                    outlined
                    required
                    input-type="email"
                    :attrs="{
                        placeholder: 'E-mail Address',
                        labelId: '#email-label',
                        autocomplete: 'off'
                    }"
                    placeholder="E-mail"
                />
                <ui-textfield-helper id="pw-validation-msg" visible validMsg>
                    Enter a valid email, "example@domain.com"
                </ui-textfield-helper>
            </section>
            <section class="grid">
                <label
                    id="password-label"
                    class="text-[.8rem] translate-y-[50%] bg-white w-fit z-10 px-1 ml-2 text-gray-500"
                >
                    Password
                </label>
                <ui-textfield
                    v-model="password"
                    input-type="password"
                    outlined
                    required
                    pattern=".{8,32}"
                    helper-text-id="pw-validation-msg"
                    :attrs="{
                        autocomplete: 'new-password',
                        placeholder: 'Password',
                        labelId: '#password-label'
                    }"
                />
                <ui-textfield-helper id="pw-validation-msg" visible validMsg>
                    Must be at least 8 characters long
                </ui-textfield-helper>
            </section>
            <section class="grid mt-5">
                <ui-button
                    class="h-[5vh]"
                    native-type="button"
                    unelevated
                    @click="submitLogin"
                >
                    Login
                </ui-button>
            </section>
        </form>
    </ui-card>
</template>
../framework/context/AuthProvider

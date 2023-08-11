<template>
  <div class="relative shadow-md">
    <div class="flex justify-between items-center text-2xl sm:p-2 md:p-5">
      <!-- Widgets -->
      <WidgetEventNotification style="z-index: 1000000;" />
      
      <!-- --- Desktop --- -->
      <div
        id="desktop"
        class="hidden sm:flex w-full"
      >
        <div class="flex items-center">
          <img
            class="h-16 pr-10"
            src="~/assets/img/logo.svg"
          >
          <div class="text-3xl font-bold">
            {{ tld }}
          </div>
        </div>


        <!-- Navigation -->
        <div class="flex justify-center items-center flex-grow">
          <div
            v-for="item in navigation"
            :key="item"
            class="px-5"
          >
            <div class="relative">
              <div class="flex items-center">
                <router-link
                  :to="item[0]"
                  class="text-xl p-2 py-3 px-3 hover:opacity-100"
                  :class="[{ 'opacity-100': $route.path === item[0] }, { 'opacity-50': $route.path !== item[0] }]"
                >
                  {{ item[1] }}
                </router-link>
              </div>
            </div>
          </div>
        </div>


        <div class="flex items-center">
          <CogIcon
            v-if="isConnected"
            class="w-8 h-8 cursor-pointer mr-5"
            @click="$emit('update-settings', !settings)"
          />
          <WidgetCryptoWallet />
        </div>
      </div>


      <!-- --- Mobile --- -->
      <div
        id="mobile"
        class="grid sm:hidden w-full"
      >
        <div class="w-full flex justify-between py-4 px-2 items-center">
          <div class="flex items-center">
            <img
              class="h-12 pr-5"
              src="~/assets/img/logo.svg"
            >
            <div class="text-2xl font-bold">
              {{ tld }}
            </div>
          </div>

          <div
            v-if="!toggleNav"
            class="flex justify-end"
          >
            <button
              class="mr-3"
              @click="toggleNav = !toggleNav"
            >
              <svg
                class="fill-current h-6 w-6"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
            <DarkModeToggle />
          </div>
        </div>

        <!-- Navigation -->
        <div
          v-if="toggleNav"
          class="w-full text-xl mt-5"
        >
          <div class="flex justify-center">
            <div
              v-for="item in navigation"
              :key="item"
            >
              <router-link
                :to="item[0]"
                class="text-xl p-2 py-3 px-3"
                :class="[{ 'opacity-100': $route.path === item[0] }, { 'opacity-50': $route.path !== item[0]}]"
                @click="toggleNav = !toggleNav"
              >
                {{ item[1] }}
              </router-link>
            </div>
          </div>
          <div
            v-if="isConnected"
            class="flex justify-center my-5"
          >
            <div
              v-for="item in settingsNavigation"
              :key="item"
            >
              <router-link
                :to="item[0]"
                class="text-xl p-2 py-3 px-3"
                :class="[{ 'opacity-100': $route.path === item[0] }, { 'opacity-50': $route.path !== item[0]}]"
                @click="toggleNav = !toggleNav"
              >
                {{ item[1] }}
              </router-link>
            </div>
          </div>
      
          <div
            class="grid place-items-center w-full"
          >
            <div class="flex items-center my-5">
              <WidgetCryptoWallet />
            </div>


            <div
              class="w-full mt-2 p-2 grid place-items-center cursor-pointer bg-primary dark:bg-primary-dark"
              @click="toggleNav = !toggleNav"
            >
              <ArrowUpIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dropdown Menu - Settings -->
    <div
      v-if="settings"
      class="hidden sm:grid absolute border text-xl right-3 w-2/12 h-fit rounded-md shadow-lg ring-1 ring-black ring-opacity-5 bg-gradient-to-r dark:from-primary-start-dark dark:to-primary-end-dark from-primary-start to-primary-end"
      style="z-index: 1000;"
    > 
      <div
        v-if="isConnected"
        class="p-3 grid gap-y-3"
      >
        <router-link
          v-for="item in settingsNavigation"
          :key="item"
          :to="item[0]"
          @click="$emit('update-settings', !settings)"
        >
          {{ item[1] }}
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import { ArrowUpIcon, CogIcon } from '@heroicons/vue/solid';
import store from '~/store';

export default {
  components: {
    ArrowUpIcon,
    CogIcon
  },
  props: {
    settings: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update-settings'],
  data() {
      return {
        ...store,
        settingsNavigation: [
          ["/inventory", "Inventory"],
        ],
        navigation: [
          ["/", "HOME"],
          ["/#features", "FEATURES"],
          ["/faq", "FAQ"],
        ],
        toggleNav: false,
      }
  },
  computed: {
    isConnected() {
      return getAccount() ? true : false;
    }
  }
}
</script>

<style>
  html {
    scroll-behavior: smooth;
  }
</style>
        
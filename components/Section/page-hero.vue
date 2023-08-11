<template>
  <div
    id="home"
    class="overflow-x-hidden flex items-center justify-center"
  >
    <div class="">
      <!-- COPY SECTION -->
      <div class="flex flex-col gap-y-10 sm:flex-row">
        <div class="text-left text-shadow w-full sm:w-3/5">
          <h1 class="text-4xl md:text-5xl uppercase">
            Secure Your {{ tld }} Domain Today
          </h1>
          <div class="mt-5 text-lg md:text-xl">
            Embrace the future with your ideal {{ tld }} domain today. 
            Make your mark in the crypto world and transform ideas into reality in your unique digital space.
          </div>
          {{ isAllowlist }}
          <div class="mt-16 flex items-center">
            <WidgetDomainSearch
              @update-available="updateAvailable"
            />
            <div
              v-if="allowlistLookedUp && domainAvailable && isConnected && ((isAllowlist && signature.length !== 0) || !isAllowlist)"
              class="ml-5"
            >
              <PurchaseDomain
                :issuance-id="issuanceId"
                :search-bar="false"
                :label="label"
                button-css="p-2 rounded-md hover:bg-primary dark:hover:bg-primary-dark cursor-pointer mb-4 sm:mb-0"
                @update-namehash="updateNamehash"
              />
            </div>
            <div v-else-if="domainAvailable && isConnected && isAllowlist && signature.length === 0">
              <div
                v-if="!allowlistLookedUp"
                class="ml-5 text-xl font-semibold"
              >
                Fetching allowlist...
              </div>
              <div
                v-if="allowlistLookedUp"
                class="ml-5 text-xl font-semibold"
              >
                Wallet not on allowlist!
              </div>
            </div>
            <div
              v-else-if="domainAvailable && !isConnected"
              class="ml-5"
            >
              <div class="text-xl font-semibold">
                Connect wallet to purchase domain!
              </div>
            </div>
          </div>
        </div>
        <!-- IMAGE SECTION -->
        <div class="hidden sm:flex justify-center w-2/5">
          <img
            class="w-full sm:w-3/4 md:w-1/2"
            src="~assets/img/logo.svg"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '~/store';
  import { useRuntimeConfig } from '#app';

  export default {
    data() {
      return {
        ...store,
        domainAvailable: false,
        label: '',
        isAllowlist: false,
        signature: '',
        allowlistLookedUp: false,
      }
    },
    computed: {
      isConnected() {
        return getAccount() ? true : false;
      }
    },
    methods: {
      async updateAvailable(isAvailable, label) {
        const config = useRuntimeConfig();
        this.domainAvailable = isAvailable;
        this.label = label;
        if(this.dbAdmin.length !== 0 && this.dbCollection.length !== 0 && this.dbUrl.length !== 0 && config.public.DB_PASSWORD.length !== 0) {
          this.isAllowlist = true;
        }else {
          this.allowlistLookedUp = true;
        }
        if(isAvailable && this.isAllowlist) {
          await this.waitForLogin();
          // wait until the user is logged in to execute
          await this.checkAllowlist();
        }
      },
      async waitForLogin() {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            if (this.isConnected) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });
      },
      async checkAllowlist() {
        const config = useRuntimeConfig();
        this.signature = await querySignature(this.dbUrl, this.dbAdmin, config.public.DB_PASSWORD, this.dbCollection);
        this.allowlistLookedUp = true;
      },
      async updateNamehash(newHash) {
        if(newHash === null) {
          showErrorMessage(`${this.label} could not be purchased`)
        }else {
          showSuccessMessage(`${this.label} purchased`)
        }
      }
    }
  }
</script>
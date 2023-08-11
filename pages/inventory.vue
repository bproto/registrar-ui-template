<template>
  <div class="mx-5 lg:mx-32 my-10 text-xl min-h-screen">
    <div
      v-if="selectedDomain"
      class="h-full"
    >
      <WidgetDropdownMenu 
        class="w-1/3 mb-8"
        :selected-item="selectedDomain"
        :items="domains"
        :select-message="'Select domain...'"
        @update-item="selectDomain"
      />
      <div class="md:flex justify-between">
        <div class="mb-5 grid place-items-center">
          <img 
            src="~/assets/img/logo.svg"
            class="w-44 sm:w-52 md:w-96"
          >
        </div>

        <div class="w-full grid place-items-center">
          <div
            v-if="loadingSubdomains"
            class="h-full grid place-items-center"
          >
            <div class="flex items-center">
              <div class="w-7 h-7 animate-spin mr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
              <div>Looking for domains...</div>
            </div>
          </div>
          <div 
            v-else
            class="sm:w-3/4 sm:flex justify-center items-center w-2/3 mt-5 sm:mt-0"
          >
            <div
              v-if="depth > 0"
              class="my-5 sm:my-0 sm:mr-32 p-2 sm:p-16 border rounded-md grid place-items-center font-bold uppercase bg-gradient-to-r dark:from-primary-start-dark dark:to-primary-end-dark from-primary-start to-primary-end cursor-pointer"
              @click="loadRoot()"
            >
              Root
            </div>
            <!-- <div
              v-if="depth > 0"
              class="my-5 sm:my-0 sm:mx-32 p-2 sm:p-16 border rounded-md grid place-items-center font-bold uppercase bg-gradient-to-r dark:from-primary-start-dark dark:to-primary-end-dark from-primary-start to-primary-end cursor-pointer"
              @click="loadParent()"
            >
              {{ ancestry[ancestry.length-1] }}
            </div> -->
            <div
              v-if="selectedDomain.subdomains.length !== 0"
              class="w-full lg:w-1/3 border rounded-md"
            >
              <div 
                class="py-3 px-2 font-semibold border-b bg-gradient-to-r dark:from-primary-start-dark dark:to-primary-end-dark from-primary-start to-primary-end"
              >
                Subdomains
              </div>
              <div class="max-h-52 lg:max-h-96 overflow-x-auto ">
                <div
                  v-for="(domain, index) in selectedDomain.subdomains"
                  :key="domain"
                  class="text-lg"
                  @click="loadChild(domain)"
                >
                  <div 
                    class="cursor-pointer p-2 hover:bg-gradient-to-r dark:from-primary-start-dark dark:to-primary-end-dark from-primary-start to-primary-end"
                    :class="{ 'bg-gradient-to-l dark:from-primary-start-dark dark:to-primary-end-dark from-primary-start to-primary-end': index % 2 === 0 }"
                  >
                    {{ domain.fqn }}
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="text-center"
            >
              No subdomains yet!
            </div>
          </div>
        </div>
      </div>
      <div class="lg:grid place-items-center sm:mt-32">
        <div class="w-1/3 mt-10 sm:mt-0">
          <RegisterDomain
            :contract-address="zoneContract"
            :parent="selectedDomain.fqn"
            main-search-bar-css="grid w-5/6"
            button-css="p-2 rounded-md cursor-pointer hover:bg-primary dark:hover:bg-primary-dark"
            @update-namehash="updateNamehash"
          />
        </div>
      </div>
    </div> 
    <div
      v-else-if="loading"
      class="h-full grid place-items-center"
    >
      <div class="animate-pulse">
        Loading domains...
      </div>
    </div>
    <div
      v-else
      class="h-full grid place-items-center"
    >
      <div>
        This account does not own any .{{ tld }} domains!
      </div>
    </div>
  </div>
</template>

<script>
  import store from '~/store';

  export default {
    data(){
      return {
        ...store,
        loading: false,
        searchTerm: '',
        expand: false,
        tree: undefined,
        depth: 0,
        ancestry: [],
        domains: [],
        selectedDomain: undefined,
      }
    },
    computed: {
      selectedDomainIndex() {
        return this.domains.findIndex(obj => obj.fqn === this.selectedDomain.fqn);
      }
    },
    async beforeMount() {
      if(getAccount()) {
        this.loading = true;
        this.tree = await arrangeDomains(store.tld.value, await queryDomains(getAccount()));
        if(this.tree) {
          this.loadRoot();
        }
        this.loading = false;
      }
    },
    methods: {
      selectDomain(domain) {
        this.selectedDomain = domain;
      },
      loadChild(child) {
        this.depth++;
        this.ancestry.push(this.selectedDomain.fqn);
        this.domains = this.selectedDomain.subdomains;
        this.selectedDomain = child;
      },
      loadRoot() {
        this.depth = 0;
        this.ancestry = [];
        this.domains = this.tree.subdomains;
        this.selectedDomain = this.tree.subdomains[0];
      },
    }
  }; 
</script>
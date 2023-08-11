<template>
  <div>
    <PressSearch 
      v-if="press"
      :tld="tld"
      main-tw-css-classes="text-black"
      input-tw-css-classes="w-full"
      :restricted-terms="restrictedTerms" 
      :restricted-beginnings="restrictedBeginnings" 
      @update-typing="updateTyping"
      @update-available="updateAvailable"
    />

    <ChainSearch 
      v-else
      :tld="tld"
      :contract="zoneContract"
      :rpc-url="rpcUrl"
      main-tw-css-classes="text-black"
      input-tw-css-classes="w-full"
      :restricted-terms="restrictedTerms" 
      :restricted-beginnings="restrictedBeginnings" 
      @update-typing="updateTyping"
      @update-available="updateAvailable"
    />
  </div>
</template>

<script>
  import store from '~/store';
  import { useRuntimeConfig } from "#app";

  export default {
    emits: [
      'update-available'
    ],
    setup() {
      const config = useRuntimeConfig();

      return {
        rpcUrl: config.public.RPC_URL
      }
    },
    data() {
      return {
        ...store,
        available: false,
        typing: false,
        domain: '',
        restrictedTerms: [],
        restrictedBeginnings: []
      }
    },
    methods: {
      updateAvailable(available, domain) {
        this.available = available;
        this.typing = false;
        this.domain = domain;
        this.$emit('update-available', this.available, this.domain);
        if(available) {
          showSuccessMessage(`${this.domain} is available`)
        }else {
          showErrorMessage(`${this.domain} is not available`)
        }
      },
      updateTyping(typing) {
        this.typing = typing;
        this.$emit('update-available', false, this.domain);
      }
    },
  }
</script>
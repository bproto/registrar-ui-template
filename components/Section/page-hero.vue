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

  export default {
    data() {
      return {
        ...store
      }
    }
  }
</script>
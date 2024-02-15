<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style scoped>
.wrapper {
  @apply w-full min-h-[100vh] m-auto overflow-hidden bg-[#1B1717];
}


/* @media screen and (max-width: 440px) {
    .wrapper {
    --container-max-width: 360px;
  }
}

@media screen and (min-width: 441px) and (max-width: 720px) {
  .wrapper {
    --container-max-width: 420px;
  }
}
@media screen and (min-width: 721px) and (max-width: 1200px) {
  .wrapper {
    --container-max-width: 720px;
  }
}

@media screen and (min-width: 1201px) and (max-width: 1400px) {
  .wrapper {
    --container-max-width: 1140px;
  }
}

@media screen and (min-width: 1401px) {
  .wrapper {
    --container-max-width: 1440px;
  }
} */
</style>

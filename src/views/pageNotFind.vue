<template>
  <div>
    <h1>404</h1>
    <h1>Movie not found</h1>
  </div>
</template>

<script></script>

<style scoped>
div {
  @apply flex flex-col justify-center items-center w-full my-0 mx-auto;
}
div h1:nth-child(1) {
  @apply text-[6em] text-[#eeebdd] font-bold;
}
div h1:nth-child(2) {
  @apply text-[2.5em] text-[#ce1212] font-bold;
}
@media screen and (min-width: 941px) {
  div h1:nth-child(1) {
    @apply text-[8em];
  }
  div h1:nth-child(2) {
    @apply text-[3em];
  }
}
</style>

<template>
    <div>
          <h1 class="">404</h1>
          <h1 class="text-[40px] text-[#ce1212] font-bold">Movie not found</h1>
    </div>
  
</template>

<script>

</script>

<style scoped>
    div{
        @apply flex flex-col justify-center items-center w-full p-[1.25em] my-0 mx-auto text-[2.5em]
    }
    div h1:nth-child(1){
        @apply text-[6em] text-[#eeebdd] font-bold;
    }
    div h1:nth-child(2){
        @apply text-[2.5em] text-[#eeebdd] font-bold;
    }
</style>
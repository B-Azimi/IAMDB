<template>
  <div v-if="srcAddress" class="movie_wrapper w-full">
    <div class="posters">
      <div class="poster_wrapper">
        <div class="tooltip-wrapper">
          <h1>{{ moreLikeItem.title }}</h1>
        </div>
        <img class="poster-img" :src="srcAddress" :alt="moreLikeItem.title" />
      </div>
      <div class="details">
        <h5 class="movie-name">{{ moreLikeItem.title }}</h5>
        <div class="rating">
          <img
            v-show="isFave"
            class="fave_icon"
            src="..\assets\images\fi-sr-heart.svg"
            alt="fav"
          />
          <img class="star_icon" src="..\assets\images\star 1.svg" alt="star" />
          <p>{{ moreLikeItem.vote_average.toFixed(1) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { number, string, object, array } from "vue-types";
const srcAddress = ref("");
const isFave = ref(false);

const left = ref("");
const top = ref("");

const props = defineProps({
  moreLikeItem: object({
    title: string().isRequired.def(""),
    poster_path: string().isRequired.def(""),
    vote_average: number().isRequired.def(0),
    id: number().isRequired.def(0),
    imdb_id: string(),
  }),
  favList: array(),
});
srcAddress.value = `https://image.tmdb.org/t/p/original${props.moreLikeItem.poster_path}`;

for (let index = 0; index < props.favList.length; index++) {
  if (props.moreLikeItem.id == props.favList[index]) {
    isFave.value = true;
  }
}
</script>

<style scoped>
.tooltip-wrapper {
  @apply hidden flex-col items-center justify-center absolute top-0 right-0 left-0 bottom-0 text-center border border-solid border-[#000] text-[1.375em] p-[0.227272727em] rounded-[0.136363636em] bg-[#000000f2] opacity-70 text-white font-bold z-[9999];
}
.tooltip-wrapper h1 {
  font-size: 1.2em;
}
.movie_wrapper:hover {
  .tooltip-wrapper {
    display: flex;
  }
}
.posters {
  @apply w-full h-auto flex flex-col items-center justify-center;
}
.poster_wrapper {
  @apply relative w-full h-auto;
}
.poster-img {
  @apply block w-full h-full rounded-[0.75em];
}
.details {
  @apply w-full flex justify-between items-center py-[0.75em];
}
.rating {
  @apply flex py-0 px-[0.75em] justify-end items-center gap-[0.375em];
}
.fave_icon {
  @apply w-[0.875em] h-[0.875em];
}
.star_icon {
  @apply w-[0.875em] h-[0.875em];
}
.movie-name {
  @apply w-[60%] h-[1.3125] shrink-0 overflow-hidden overflow-ellipsis whitespace-nowrap font-bold ml-[0.625em] mr-[0.375em];
}
.rating p {
  color: rgba(238, 235, 221, 0.4);
  text-align: center;
}
@media screen and (min-width: 941px) {
  .details {
    @apply text-[16px] py-[0.75em];
  }
}
</style>

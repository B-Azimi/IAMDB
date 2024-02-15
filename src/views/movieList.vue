<template>
  <RouterLink class="block" :to="{ name: 'movieView', params: { id: movie.id}}" >
    <div class="movieList_container ">
    
      <div v-if="movie" class="movie ">
        <div class="poster w-[40%]">
          <img class="poster-img " :src="posterAddress" :alt="movie.title " />
        </div>
    
        <div class="details ">
          <div class="name ">
            <h5 class="movie-name">{{ movie.original_title }}</h5>
          </div>
    <hr/>
          <div  class="more ">
                <div class="star_icon ">
               <img class="self-stretch" src="..\assets\images\star 1.svg" alt="star icon">
            <p v-if="movie.vote_average" class="rating">{{ movie.vote_average.toFixed(1) }}</p>
            <p v-else class="rating">0.0</p>
            </div>
            <p v-if="movie.runtime" class="run-time">{{ movie.runtime }} min</p>
       <p v-else class="run-time">-- min</p>
            <!-- <button class="add flex">
              <p class="add-to-watchlist">Watchlist</p>
            </button> -->
          </div>
          <hr/>
               <p  class="category ">
              <ul class="movie_list ">
                <li  v-for="genre in movie.genres">{{ genre.name  }}&nbsp;&nbsp;  </li>
              </ul>
            </p>
            <hr/>
          <div class="over_view">
                <p class=" leading-[1.5em]">
            {{ movie.overview }}
          </p>
          </div>
      
        </div>
      </div>
    </div>
    </RouterLink>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { number, string, shape, object } from "vue-types";
const posterAddress = ref('')
const props = defineProps({
  movie: shape({
    original_title: string(),
    title: string(),
    genres: Array({
      // object{

      //   id: number(),
      //   name:string()
      // }
    }),
    runtime: number(),
    Plot: string(),
    poster_path: string(),
    backdrop_path: string(),
    vote_average: number(),
    id: number(),
  }).loose,
});
if (props.movie) {
  posterAddress.value=`https://image.tmdb.org/t/p/original${props.movie.poster_path}`
}

</script>

<style scoped>
.movieList_container{
  @apply w-full px-[1em] m-auto;
}
.movie{
@apply w-full h-[16.25em]  flex gap-[1em] justify-between p-[0.625em] items-center w-full;
}
.poster{
  @apply w-[40%] h-full py-[0.25em];
}
.poster-img{
  @apply min-w-[100px] h-full w-full m-auto object-cover rounded-lg;
}
@media screen and (min-width: 480px) {
.poster-img{
  @apply object-fill ;
}
}

/* .poster-img{
  @apply h-full w-[10em] object-cover rounded-lg;
} */
.details{
  @apply w-[60%] flex flex-col ;
}
.details .name{
  @apply flex w-full gap-[10px] py-[0.125em];
}
.more{
  @apply flex gap-[0.625em] py-[0.125em] items-center;
}
.category{
  @apply py-[0.125em];
}
.over_view{
  @apply mt-[0.3125em] py-[0.125em] max-w-[22.5em] max-h-[7.9em] whitespace-pre-wrap overflow-hidden overflow-ellipsis;
}
.star_icon{
  @apply flex  gap-[0.3125em] items-center;
}
.movie_list{
  @apply flex py-[0.1325] gap-[0.1325] flex-wrap;
}
@media screen and (min-width: 941px) {
  .movieList_container{
  @apply w-full  m-auto;
}

  .movie{
    @apply h-[25em] py-[1.5em] px-[1em] gap-[0.75em];
  }

.poster{
  @apply w-[40%] h-[25em] px-[5%] py-[0.25em];
}
.details{
  @apply text-[1.125em] w-[55%] gap-[0.625em] flex flex-col ;
}
.more{
  @apply text-[1.125em];
}
.movie-name{
   @apply text-[1.875em];
}
.category{
  @apply py-[0.125em];
}
.over_view{
  @apply mt-[0.3125em] w-[22.5em] max-h-[11.8125em] overflow-hidden overflow-ellipsis whitespace-normal;
}
}
</style>

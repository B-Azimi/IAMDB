<template>
  <div class="homePage_container">
    <section>
      <div class="background_wrapper">
        <div class="background_images">
          <div class="images_wrapper">
            <img
              src="..\assets\images\search-img\ET.png"
              alt="backgroun image"
            />
            <img
              src="..\assets\images\search-img\ET.png"
              alt="backgroun image"
            />
            <img
              src="..\assets\images\search-img\ET.png"
              alt="backgroun image"
            />
            <img
              src="..\assets\images\search-img\dune.png"
              alt="background image"
            />
            <img
              src="..\assets\images\search-img\kombat.png"
              alt="background image"
            />
            <img
              src="..\assets\images\search-img\groot.png"
              alt="background image"
            />
            <img
              src="..\assets\images\search-img\harry.png"
              alt="background image"
            />
          </div>
          <div class="images_wrapper">
            <img
              src="..\assets\images\search-img\things.png"
              alt="background image"
            />
            <img
              src="..\assets\images\search-img\captan-A.png"
              alt="background image"
            />
            <img
              src="..\assets\images\search-img\ET.png"
              alt="backgroun image"
            />
            <img
              src="..\assets\images\search-img\ring.png"
              alt="background image"
            />
            <img
              src="..\assets\images\search-img\doctor.png"
              alt="background image"
            />
            <img
              src="..\assets\images\search-img\batman.png"
              alt="background image"
            />
          </div>
          <div class="images_wrapper">
            <img
              src="..\assets\images\search-img\batman.png"
              alt="background image"
            />
            <img
              src="..\assets\images\search-img\matrix.png"
              alt="background image"
            />
            <img
              src="..\assets\images\search-img\lord.png"
              alt="background image"
            />
            <img
              src="..\assets\images\search-img\star-war.png"
              alt="background image"
            />
            <img
              src="..\assets\images\search-img\jurassic.png"
              alt="background image"
            />
          </div>
          <div class="images_wrapper">
            <img
              class="hidden_image hidden lg:block"
              src="..\assets\images\search-img\mandalorian.png"
              alt="background image"
            />
            <img
              src="..\assets\images\search-img\mandalorian.png"
              alt="background image"
            />
          </div>
          <div class="images_wrapper">
            <img
              src="..\assets\images\search-img\dune.png"
              alt="background image"
            />
            <img
              src="..\assets\images\search-img\dune.png"
              alt="background image"
            />
            <img
              src="..\assets\images\search-img\dombeldure.png"
              alt="background image"
            />
            <img
              src="..\assets\images\search-img\things.png"
              alt="background image"
            />
            <img
              src="..\assets\images\search-img\ww84.png"
              alt="background image"
            />
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="title_wrapper">
        <h1>IAMDB</h1>
        <form
          @submit.prevent="searchFunc"
          class="search_wrapper"
          action="search"
          id="search_form"
        >
          <input
            :disabled="isLoading"
            v-model="searchText"
            class="mobile_input"
            type="text"
            placeholder="Your favorite movie ..."
          />
          <input
            v-model="searchText"
            class="desktop_input hidden"
            type="text"
            placeholder="Type the name of your favorite movie ..."
            :disabled="isLoading"
          />
          <button
            :unselectable="isLoading"
            :disabled="isLoading"
            class="search_btn"
          >
            <span class="search_text">Search</span
            ><span class="search_icon"
              ><img src="..\assets\images\Vector.svg" alt="search icon"
            /></span>
          </button>
        </form>
      </div>
    </section>
    <section>
      <div v-if="matchList" class="search-result mt-[1.25em]">
        <ul>
          <li v-for="movie in matchList" :key="movie.id">
            <movieList :movie="movie" />
            <hr />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import movieList from "@/views/movieList.vue";
const matchList = ref([]);
const movies = ref(null);
const searchText = ref("");
const isLoading = ref(false);
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzdjYjE5NmZjNzlmYWIyNTA5NDMwOWFjMjFhY2E2YiIsInN1YiI6IjY1OWU2YTZlZDY1OTBiMDI1Y2IyNzU2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mLXwsygtwK0fKPTEx81EgxDShvY9ClmK8AxAPQ6Znhk",
  },
};
const searchFunc = () => {
  const fetchMovie = async (name) => {
    isLoading.value = true;
    searchText.value = "Searching ...";
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`,
      options
    );
    movies.value = await response.json();
    if (movies.value.total_results) {
      if (movies.value.results) {
        const ids = movies.value.results.map((item) => item.id);
        const promises = ids.map(async (id) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=details`,
            options
          );
          return await res.json();
        });
        matchList.value = await Promise.all(promises);
        isLoading.value = false;
        searchText.value = "";
      }
    } else {
      console.log(movies.value.Error);
      searchText.value = `Not Found, please search agin`;
      function MyMessage() {
        isLoading.value = false;
        searchText.value = "";
      }
      setTimeout(MyMessage, 2000);
    }
  };
  fetchMovie(searchText.value);
};
</script>

<style scoped>
.homePage_container {
  @apply w-screen min-h-[200vh] px-[0.9375em];
}
.background_wrapper {
  @apply w-[29.5em] h-[51.2em] mt-[-12.5em] ml-[-9.25em] pointer-events-none select-none;
  transform: perspective(800px) rotateY(-20deg) rotateZ(16.25deg)
    rotateX(20.5deg);
}
.background_images {
  @apply flex flex-col items-center opacity-80 z-0 pt-[6.386em] pr-[2.152em] pb-[11.27em] pl-[0.26em];
}
.images_wrapper {
  @apply flex w-full mb-[0.75em];
}
.background_images img {
  @apply mr-[0.725em] w-[3.323em] h-[5.3em] shrink-0 rounded-lg;
  box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.8), 1px 1px 0 rgba(0, 0, 0, 0.4);
}
@media screen and (min-width: 941px) {
  .hidden_image {
    display: block;
  }
}
.title_wrapper {
  @apply flex flex-col items-center mt-[-25em] w-full z-[9999];
}
.title_wrapper h1 {
  @apply text-[#EEEBDD] text-center text-[3em] font-bold;
}
.search_wrapper {
  @apply w-full mt-[4.0625em] py-[5.4375em] z-[9999];
}
.search_wrapper input::placeholder {
  color: rgba(238, 235, 221, 0.3);
}
.mobile_input {
  @apply w-full py-[0.75em] px-[2em] border-solid border-[1px] border-[#EEEBDD] rounded-[100px] bg-inherit;
}
.search_btn {
  @apply mt-[0.75em] flex gap-[0.75em] py-[0.75em] px-[1.5em] justify-center items-center rounded-[100px] bg-[#CE1212] w-full;
}
.search_btn:hover {
  background-color: #8e0d0d;
}
.search_text {
  @apply text-[#EEEBDD] leading-[1.25em];
}
.search_icon {
  @apply w-[1.125em] h-[1.125em];
}
.search_icon img {
  @apply w-full h-full;
}
.search-result {
  @apply w-full;
}
.search-result ul {
  @apply relative z-[9999];
}
.search-result li {
  @apply mb-[1.875em] w-full;
}

@media screen and (min-width: 941px) {
  .homePage_container {
    @apply w-screen min-h-[250vh] px-[7.5em];
  }
  .background_wrapper {
    @apply w-[68.284em] h-[118.5em] mt-[-18.2em] ml-[-26.5em];
    transform: perspective(1200px) rotateY(-15deg) rotateZ(19.5deg)
      rotateX(5deg);
  }
  .images_wrapper {
    @apply mb-[1.375em];
  }
  .background_images img {
    @apply mr-[1.5em] w-[7.695em] h-[11.526em];
  }
  .title_wrapper {
    @apply m-0 p-0  mt-[-86em] mb-[65em];
  }
  .title_wrapper h1 {
    @apply text-[6em] font-bold self-end mb-[1em];
  }
  .search_wrapper {
    @apply p-0 m-0 mt-[1.5em]  flex items-center justify-between gap-[0.75em] pb-[9.375em];
  }

  .desktop_input {
    @apply block text-[1.125em] w-full py-[0.75em] px-[1.777778em] border-solid border-[1px] border-[#EEEBDD] rounded-[100px] bg-inherit;
  }
  .mobile_input {
    @apply hidden;
  }
  .search_btn {
    @apply w-fit m-0 py-[1.125em] px-[2em] self-stretch;
  }
  .search_text {
    @apply text-[1.3125em] py-[0.095em] px-0 leading-[1.172em];
  }
  .search_icon {
    @apply w-[1.3125em] h-[1.3125em];
  }

  .search-result {
    @apply mt-[-45em];
  }
  .search-result li {
    @apply m-0 mb-[0.625em];
  }
}
@media screen and (min-width: 1080px) {
  .homePage_container {
    @apply w-screen min-h-[100vh] px-[7.5em];
  }

  .title_wrapper {
    @apply m-0 p-0  mt-[-85em] mb-[65em];
  }

  .desktop_input {
    @apply block text-[1.125em] w-full py-[1em] px-[1.7777em] border-solid border-[1px] border-[#EEEBDD] rounded-[100px] bg-inherit;
  }
}
@media screen and (min-width: 1360px) {
  .images_wrapper {
    @apply mb-[1.5em];
  }
  .background_images img {
    @apply mr-[1.5em] w-[7.695em] h-[11.726em];
  }
}
</style>

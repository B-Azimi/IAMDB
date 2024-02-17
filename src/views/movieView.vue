<template>
  <div class="all_container">
    <div class="cover-img_wrapper" v-if="movie">
      <img class="cover-img" :src="srcAddress" alt="cover image" />
    </div>
    <main>
      <div class="movie_infos">
        <div class="left_col hidden">
          <div class="left_col_poster">
            <img :src="srcAddress" alt="poster image" />
          </div>
          <div v-if="progressPercent" class="rating">
            <div id="progress" class="progress-bar">
              <progress
                value=""
                min="0"
                max="10"
                style="visibility: hidden; height: 0; width: 0"
              ></progress>
              {{ progressPercent }}
            </div>
            <div class="py-[0.375em]">
              <div class="votes">
                {{ detailsList.imdbVotes }}
              </div>
              <div class="leading-[1.172em]">ratings on IMDB</div>
            </div>
          </div>
        </div>
        <div class="info_wrapper" v-if="detailsList">
          <h1 class="title">{{ detailsList.Title }}</h1>
          <span class="Director">Directors : {{ detailsList.Director }}</span>

          <div class="short_info flex">
            <span>{{ detailsList.Year }}</span>
            <img
              class="w-[0.375em] h-[0.375em]"
              src="..\assets\images\Ellipse1.svg"
              alt="Ellipse"
            />
            <span>{{ detailsList.Rated }}</span>
            <img
              class="w-[0.375em] h-[0.375em]"
              src="..\assets\images\Ellipse1.svg"
              alt="Ellipse"
            />
            <span>{{ runTimeHour.toFixed() }}h {{ runTimeMin }}m</span>
          </div>
          <div class="links_wrapper">
            <div>
              <a
                class="trailer_btn"
                :href="`https://www.youtube.com/watch?v=${trailer_id}`"
                data-site="YouTube"
                :data-id="trailer_id"
                data-title="Play Trailer"
              >
                <span class="trailer_txt_wrapper">
                  <span class="trailer_text">Watch Trailer</span>
                </span>
                <span
                  ><img
                    class="trailer_icon"
                    src="..\assets\images\play1.svg"
                    alt="play icon" /></span
              ></a>
            </div>
            <div>
              <div class="share_box">
                <input type="checkbox" id="share_button" />
                <label for="share_button">
                  <span @click="shareHandler" class="share_btn">
                    <span v-show="!isSharing">
                      <img
                        class="share_icon"
                        src="..\assets\images\share1.svg"
                        alt="share icon"
                      />
                    </span>
                    <span v-show="isSharing">
                      <img
                        class="share_icon"
                        src="..\assets\images\x-modal-close.svg"
                        alt="close share"
                      />
                    </span>
                  </span>
                </label>

                <div v-show="isSharing" class="sm_list">
                  <a
                    v-if="webShareApiSupported"
                    @click="shareViaWebShare"
                    href=""
                    class="facebook"
                  >
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a
                    v-if="webShareApiSupported"
                    @click="shareViaWebShare"
                    href=""
                    class="instagram"
                  >
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a
                    v-if="webShareApiSupported"
                    @click="shareViaWebShare"
                    href=""
                    class="linkedin"
                  >
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                  <a
                    v-if="webShareApiSupported"
                    @click="shareViaWebShare"
                    href=""
                    class="discord"
                  >
                    <i class="fab fa-discord"></i>
                  </a>
                  <a
                    v-if="webShareApiSupported"
                    @click="shareViaWebShare"
                    href=""
                    class="whatsapp"
                  >
                    <i class="fab fa-whatsapp"></i>
                  </a>
                  <a
                    v-if="webShareApiSupported"
                    @click="shareViaWebShare"
                    href=""
                    class="telegram"
                  >
                    <i class="fab fa-telegram"></i>
                  </a>
                </div>
              </div>
            </div>

            <div class="fave_btn_wrapper">
              <input
                @click="toggleFav(`${movieId}`)"
                type="checkbox"
                :value="`${movieId}`"
                :id="`heart-checkbox-${movieId}`"
                class="hidden-checkbox hidden"
              />
              <label :for="`heart-checkbox-${movieId}`">
                <span v-show="!isFav" class="fave_btn">
                  <img
                    class="fave_icon"
                    src="..\assets\images\fi-rr-heart.svg"
                    alt="fave icon"
                  />
                </span>
                <span v-show="isFav" class="fave_btn">
                  <img
                    v-show="isFav"
                    class="fave_icon"
                    src="..\assets\images\fi-sr-heart.svg"
                    alt="fave icon"
                  />
                </span>
              </label>
            </div>
          </div>
          <p class="desc py-[0.875em]">{{ detailsList.Plot }}</p>

          <div class="details_wrapper">
            <h2 class="details-head">Details</h2>
            <div v-if="detailsList.Writer" class="details_title">
              <span>
                <h3>Writers</h3>
              </span>
              <span class="details">{{ detailsList.Writer }}</span>
            </div>
            <div v-if="detailsList.Genre" class="details_title">
              <span>
                <h3>Genres</h3>
              </span>
              <span class="details">{{ detailsList.Genre }}</span>
            </div>
            <div v-if="detailsList.Awards" class="details_title">
              <span>
                <h3>Awards</h3>
              </span>
              <span class="details">{{ detailsList.Awards }}</span>
            </div>
            <div v-if="detailsList.Country" class="details_title">
              <span>
                <h3>Country of Origin</h3>
              </span>
              <span class="details">{{ detailsList.Country }}</span>
            </div>
            <div v-if="detailsList.imdbRating" class="details_title">
              <span>
                <h3>IMDB Rating</h3>
              </span>
              <span class="details">{{ detailsList.imdbRating }}</span>
            </div>
          </div>
        </div>

        <div class="actors_wrapper">
          <h2>Cast & Crew</h2>

          <ul v-if="actorsList" class="actors_list">
            <li class="actor_item" v-for="actor in actorsList" :key="actor.id">
              <div>
                <img
                  :src="`https://image.tmdb.org/t/p/original${actor.profile_path}`"
                  :alt="actor.name"
                />
              </div>
              <div>
                <span class="actor_name">{{ actor.name }}</span>
                <br />
                <span>as {{ actor.character }}</span>
              </div>
            </li>
          </ul>

          <ul v-if="isShowAll" class="actors_list">
            <li class="actor_item" v-for="actor in moreActors" :key="actor.id">
              <div>
                <img
                  :src="`https://image.tmdb.org/t/p/original${actor.profile_path}`"
                  :alt="actor.name"
                />
              </div>
              <div>
                <span class="actor_name">{{ actor.name }}</span>
                <br />
                <span>as {{ actor.character }}</span>
              </div>
            </li>
          </ul>
          <div class="showAll_wrapper">
            <span class="show_txt" v-show="!isShowAll">Show all</span>
            <span class="show_txt" v-show="isShowAll">Show less</span>
            <button @click="showAllHandler">
              <span class="btn_icon"
                ><img
                  class="w-full h-full"
                  src="..\assets\images\angle-small-right1.svg"
                  alt="right arrow"
              /></span>
            </button>
          </div>
        </div>
      </div>

      <div v-if="shortPhotosList" class="photos_wrapper">
        <h2>Photos</h2>
        <div class="photos w-full">
          <div
            v-show="showModal"
            class="modal_overlay"
            @click="showModal = false"
          >
            <div v-show="showModal" :class="[showModal ? 'modal' : 'hidden']">
              <div class="content">
                <span @click="showModal = false" class="modal_close"
                  ><img
                    src="..\assets\images\x-modal-close.svg"
                    alt="close modal"
                /></span>
                <img class="expanded_img" :src="modalSrc" alt="modal photo" />
              </div>
            </div>
          </div>
          <ul class="photo_list">
            <li class="photo_item" v-for="item in imageSrc">
              <div class="image_container">
                <img
                  class="movie_img w-full"
                  :src="`${item}`"
                  alt="photo image"
                />
                <div @click="showModal = true" class="overlay">
                  <div class="expand_icon" @click="modalSrc = `${item}`">
                    <img
                      class="expand"
                      src="..\assets\images\expand-arrows-alt 1.svg"
                      alt="expand icon"
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
    <div v-if="matchList" class="more_wrapper pb-[1.5em] w-full">
      <h2 class="more_title">More like this</h2>
      <div class="swiper_wrapper">
        <swiper
          :slides-offset-before="offset"
          :slides-per-view="slideCount"
          centered-slides="true"
          loop="true"
          class="swiper"
        >
          <swiper-slide
            @click="routeHandler"
            class="swiper_slide"
            v-for="(item, index) in matchList"
            :key="item.id"
          >
            <RouterLink
              class="w-full m-auto"
              :to="{ name: 'movieView', params: { id: item.id } }"
            >
              <moreLike :moreLikeItem="item" :favList="favList" />
            </RouterLink>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css/bundle";
import moreLike from "./moreLike.vue";
import { ref, computed, watch } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { useMovieStore } from "../stores/movies";
const offset = ref(0);
const slideCount = ref();
function getWindowWidth() {
  if (window.innerWidth < 620) {
    slideCount.value = window.innerWidth / 245;
    offset.value = -100;
  } else if (window.innerWidth >= 621 && window.innerWidth < 830) {
    slideCount.value = window.innerWidth / 260;
    offset.value = -170;
  } else if (window.innerWidth >= 831 && window.innerWidth < 1130) {
    slideCount.value = window.innerWidth / 268;
    offset.value = -170;
  } else {
    slideCount.value = window.innerWidth / 275;
    offset.value = -240;
  }
}
window.onresize = getWindowWidth;
getWindowWidth();
const route = useRoute();
const isSharing = ref(false);
const shareHandler = () => {
  isSharing.value = !isSharing.value;
};

const movieId = computed(() => {
  return route.params.id;
});

const { toggleFav } = useMovieStore();
const isFav = computed(() => useMovieStore().movieIsFav(movieId.value));
const favList = computed(() => useMovieStore().favList);
const shortPhotosList = ref(null);
const modalSrc = ref("");
const runTimeHour = ref("");
const runTimeMin = ref("");
const showModal = ref(false);
const isLoading = ref(false);
const srcAddress = ref("");
const detailsList = ref(null);
const creditsList = ref(null);
const actorsList = ref(null);
const moreActors = ref(null);
const matchList = ref(null);
const moreList = ref(null);
const movie = ref(null);
const movie_id = ref(0);
const trailer_id = ref("");
const photosList = ref(null);
const imageSrc = ref([]);
const trailer = ref([]);
const isShowAll = ref(false);
const progressPercent = ref(0);
const showAllHandler = () => {
  isShowAll.value = !isShowAll.value;
};
const webShareApiSupported = computed(() => {
  return navigator.share;
});

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzdjYjE5NmZjNzlmYWIyNTA5NDMwOWFjMjFhY2E2YiIsInN1YiI6IjY1OWU2YTZlZDY1OTBiMDI1Y2IyNzU2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mLXwsygtwK0fKPTEx81EgxDShvY9ClmK8AxAPQ6Znhk",
  },
};
const routeHandler = () => {
  watch(
    movieId,
    async () => {
      if (movieId.value) {
        try {
          isLoading.value = true;
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId.value}?language=en-US&append_to_response=videos`,
            options
          );
          movie.value = await res.json();
        } catch (error) {
          console.log("Error! Could not reach the API. " + error);
        } finally {
          isLoading.value = false;
        }
      }

      movie_id.value = movie.value.imdb_id;

      for (let index = 0; index < movie.value.videos.results.length; index++) {
        if (movie.value.videos.results[index].type === "Trailer") {
          trailer.value.push(movie.value.videos.results[index]);
        }
      }
      if (trailer.value) {
        trailer_id.value = trailer.value[0].key;
      }

      srcAddress.value = `https://image.tmdb.org/t/p/w500${movie.value.poster_path}`;

      const fetchDetails = async (id) => {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=2e6340a4`
        );
        detailsList.value = await response.json();

        runTimeHour.value = detailsList.value.Runtime.split(" ")[0] / 60;
        runTimeMin.value = detailsList.value.Runtime.split(" ")[0] % 60;
        progressPercent.value = parseFloat(detailsList.value.imdbRating);
      };
      fetchDetails(movie_id.value);
      const fetchPhotos = async (id) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/images`,
          options
        );
        photosList.value = await response.json();
        shortPhotosList.value = photosList.value.backdrops.filter(
          (e, i) => i < 10
        );
        const srcAddresses = shortPhotosList.value.map(
          (item) => item.file_path
        );
        if (imageSrc.value) {
          imageSrc.value = [];
          srcAddresses.forEach((element) => {
            imageSrc.value.push(
              `https://image.tmdb.org/t/p/original${element}`
            );
          });
        }
      };
      fetchPhotos(movieId.value);

      const fetchMovies = async (id) => {
        isLoading.value = true;
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
          options
        );
        moreList.value = await response.json();

        if (moreList.value.total_results) {
          const ids = moreList.value.results
            .filter((e, i) => i > 0)
            .map((item) => item.id);
          const promises = ids.map(async (id) => {
            const res = await fetch(
              `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=details`,
              options
            );
            return await res.json();
          });
          matchList.value = await Promise.all(promises);
          isLoading.value = false;
        } else {
          console.log(moreList.value.Error);
        }
      };
      fetchMovies(movieId.value);

      const fetchCredits = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId.value}/credits?language=en-US`,
          options
        );
        creditsList.value = await response.json();
        actorsList.value = creditsList.value.cast.filter(
          (item, i) => item.known_for_department == "Acting" && i < 5
        );
        moreActors.value = creditsList.value.cast.filter(
          (item, i) => item.known_for_department == "Acting" && i >= 5
        );
      };
      fetchCredits();
    },
    { immediate: true }
  );
};
const handleFetch = () => {
  async () => {
    if (movieId.value) {
      try {
        isLoading.value = true;
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId.value}?language=en-US&append_to_response=videos`,
          options
        );
        movie.value = await res.json();
      } catch (error) {
        console.log("Error! Could not reach the API. " + error);
      } finally {
        isLoading.value = false;
      }
    }

    movie_id.value = movie.value.imdb_id;
    const trailer = ref([]);
    for (let index = 0; index < movie.value.videos.results.length; index++) {
      if (movie.value.videos.results[index].type === "Trailer") {
        trailer.value.push(movie.value.videos.results[index]);
      }
    }
    if (trailer.value) {
      trailer_id.value = trailer.value[0].key;
    }

    srcAddress.value = `https://image.tmdb.org/t/p/w500${movie.value.poster_path}`;
    isLoading.value = false;
    const fetchDetails = async (id) => {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=2e6340a4`
      );
      detailsList.value = await response.json();

      runTimeHour.value = detailsList.value.Runtime.split(" ")[0] / 60;
      runTimeMin.value = detailsList.value.Runtime.split(" ")[0] % 60;
      progressPercent.value = parseFloat(detailsList.value.imdbRating);
    };
    fetchDetails(movie_id.value);
    const fetchPhotos = async (id) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/images`,
        options
      );
      photosList.value = await response.json();
      shortPhotosList.value = photosList.value.backdrops.filter(
        (e, i) => i < 10
      );
      const srcAddresses = shortPhotosList.value.map((item) => item.file_path);
      srcAddresses.forEach((element) => {
        imageSrc.value.push(`https://image.tmdb.org/t/p/original${element}`);
      });
    };
    fetchPhotos(movieId.value);

    const fetchMovies = async (id) => {
      isLoading.value = true;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
        options
      );

      moreList.value = await response.json();

      isLoading.value = false;

      if (moreList.value.total_results) {
        const ids = moreList.value.results
          .filter((e, i) => i > 0)
          .map((item) => item.id);
        const promises = ids.map(async (id) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=details`,
            options
          );
          return await res.json();
        });
        matchList.value = await Promise.all(promises);
      } else {
        console.log(moreList.value.Error);
      }
    };
    fetchMovies(movieId.value);
  };
};

const shareViaWebShare = () => {
  navigator.share({
    title: movie.value.title,
    text: "Please shared me !",
    url: "URL to be shared",
  });
};
handleFetch();
routeHandler();
</script>

<style scoped>
main {
  @apply flex flex-col items-center justify-center px-[0.9375em] relative;
}
.cover-img_wrapper {
  @apply absolute left-0 right-0 w-full h-[16.5em];
  mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 0%,
    rgb(27, 23, 23) 100%
  );
  -webkit-mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 10%,
    rgb(27, 23, 23) 100%
  );
}

.cover-img {
  @apply block object-cover h-auto w-full m-auto;
}
.movie_infos {
  @apply mt-[10.875em] px-[0.75em];
}

.left_col_poster {
  @apply w-[17.25em] h-[25.94em];
}
.left_col_poster img {
  @apply w-full h-auto rounded-xl;
}
.rating {
  @apply flex items-center;
}
.votes {
  @apply leading-[1.2222222em] font-bold text-[1.125em] mb-[0.375em];
}
.progress-bar {
  @apply flex justify-center items-center w-[6.25em] h-[6.25em] rounded-[50%] mr-[1.125em];
  background: radial-gradient(closest-side, #1b1717 78%, transparent 80% 100%),
    conic-gradient(
      rgba(206, 18, 18, 1) v-bind((progressPercent * 10) + "%"),
      rgba(238, 235, 221, 0.4) 0
    );
}
.info_wrapper {
  @apply flex flex-col items-start self-stretch;
}
.title {
  @apply text-[2em] font-bold leading-[125%] mb-[0.375em];
}
.Director {
  @apply text-[1em] mb-[0.875em];
}
.short_info {
  @apply flex py-[0.429em] px-0 items-center gap-3 text-[0.875em] mb-[1em];
}
.links_wrapper {
  @apply flex items-center w-full mb-[0.875em] pb-[1.375em];
}
.links_wrapper > div {
}
.trailer_btn {
  @apply h-[2.75em] px-[1.5em] py-[0.75em] flex justify-center items-center bg-play_red rounded-[6.25em];
}
.trailer_text {
  @apply leading-[1.25em] mr-[0.75em];
}
.trailer_icon {
  @apply w-[1.125em] h-[1.125em];
}
.fave_btn_wrapper {
  @apply ml-[1.125em];
}
.fave_btn {
  @apply w-[2.75em] h-[2.75em]  p-[0.8125em] flex justify-center items-center rounded-[50%] border-solid border-[0.125em] border-[#EEEBDD];
}
.fave_icon {
  @apply w-[1.125em] h-[1.125em];
}
#share_button {
  display: none;
}
.share_box {
  @apply relative z-[9999] ml-[1.125em];
}

.share_btn {
  @apply w-[2.75em] h-[2.75em] flex justify-center items-center rounded-[50%] border-[0.125em] border-solid border-[#eeebdd] bg-inherit z-[1] cursor-pointer p-[0.8125em];
}
.share_icon {
  @apply w-[1.125em] h-[1.125em];
}
.share_btn ion-icon {
  @apply w-[1.125em] h-[1.125em];
}

.sm_list {
  @apply absolute top-[110%] left-[26%];
  transform: translate(50%, 50%);
}

.sm_list a {
  @apply absolute flex justify-center items-center rounded-[50%] w-[1.75em] h-[1.75em] no-underline transition-all duration-[0.3s];
}

#share_button:checked ~ .sm_list a:nth-child(1) {
  @apply delay-[0.2s] translate-x-[-2em] bg-[#3b5998];
}

#share_button:checked ~ .sm_list a:nth-child(2) {
  @apply delay-[0.2s] translate-x-[2em] bg-[#dd2553];
}

#share_button:checked ~ .sm_list a:nth-child(3) {
  @apply delay-[0.3s] translate-x-[4em] bg-[#000f94];
}

#share_button:checked ~ .sm_list a:nth-child(4) {
  @apply delay-[0.3s] translate-x-[-4em] bg-[#1077ec];
}

#share_button:checked ~ .sm_list a:nth-child(5) {
  @apply delay-[0.4s] translate-x-[6em] bg-[#0A3F00];
}

#share_button:checked ~ .sm_list a:nth-child(6) {
  background-color: #0088cc;
}

/* Hovering Effects */
#share_button:checked ~ .sm_list a:nth-child(1):hover {
  background-color: #ffffff;
  color: #3b5998;
}

#share_button:checked ~ .sm_list a:nth-child(2):hover {
  color: #dd2553;
  background-color: #fff;
}

#share_button:checked ~ .sm_list a:nth-child(3):hover {
  color: #000f94;
  background-color: #fff;
}

#share_button:checked ~ .sm_list a:nth-child(4):hover {
  color: #1077ec;
  background-color: #fff;
}

#share_button:checked ~ .sm_list a:nth-child(5):hover {
  color: #0a3f00;
  background-color: #fff;
}

#share_button:checked ~ .sm_list a:nth-child(6):hover {
  color: #0088cc;
  background-color: #fff;
}

.share_btn:visited {
  background-color: #000f94;
}

.thrailer_btn:hover {
  background-color: #8e0d0d;
}
.share_btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
.fave_btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
.desc {
  @apply text-[#eeebdd] opacity-60 text-[0.875em] mb-[1em];
}
.details_wrapper {
  @apply flex flex-col gap-[12px] pt-[24px] w-full;
}
.details-head {
  @apply flex flex-col justify-center self-stretch text-[1.5em] font-bold h-[2.0833333em];
}
.details_title {
  @apply py-[0.75em] flex justify-between self-stretch items-center border-b border-solid border-[#edebdd19];
}
.details_title h3 {
  @apply font-bold min-w-[10.69em];
}
.details {
  @apply w-[47%] text-[0.875em] text-[#eeebdd99];
}

.actors_wrapper {
  @apply w-full flex flex-col gap-[1.5em] pt-[2.75em] items-start;
}
.actors_wrapper h2 {
  @apply flex flex-col justify-center text-[1.5em] w-[11.0416667em] h-[2.08333333em] font-bold leading-[208.333%];
}
.actors_list {
  @apply flex flex-col gap-[1.5em] justify-center items-center w-full;
}
.actor_item {
  @apply w-full flex gap-[0.75em] items-center;
}
.actor_item img {
  @apply w-[4.6875em] h-[4.6875em] rounded-[50%] object-cover;
}
.actor_name {
  @apply font-bold text-[1em];
}
.showAll_wrapper {
  @apply flex pt-[12px] self-center justify-center items-center w-[100%];
}
.show_txt {
  @apply text-[#CE1212] text-[1.125em] leading-[1.16666667em] pr-[0.666666667em];
}
.btn_icon {
  @apply flex items-center justify-center p-[0.1875em] rounded-[50%] w-[2em] h-[2em] border-solid border-[0.125em] border-[#CE1212];
}
.photos_wrapper {
  @apply flex flex-col items-center justify-center self-stretch py-0 mb-[1.5em];
}
.photos_wrapper h2 {
  @apply flex flex-col justify-center self-stretch text-[1.5em] font-bold h-[2.08333333em] mb-[0.5em] leading-[208.333%];
}
.photo_list {
  @apply w-full flex flex-wrap items-center justify-around;
}
.photo_item {
  @apply w-[46%] mt-[0.75em] mr-[0.75em];
}
.image_container {
  @apply relative w-full rounded-xl;
}
.movie_img {
  @apply shrink-0 rounded-xl;
}
.overlay {
  @apply absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer bg-[#0b0b0b80] backdrop-blur-[2px] transition-all ease-linear	delay-[0.1s];
}
.image_container:hover .overlay {
  opacity: 0.9;
}
.expand {
  @apply w-[2em] h-[2em] m-auto;
}
.expanded_img {
  @apply w-full  rounded-[0.325em];
}
.expand_icon {
  @apply absolute top-[50%] left-[50%] text-center translate-x-[-50%] translate-y-[-50%];
  -ms-transform: translate(-50%, -50%);
}
.hidden {
  display: none;
}
.modal_overlay {
  @apply fixed top-0 left-0 w-screen h-screen bg-[#0b0b0b80] z-[9999] backdrop-blur-[2px];
}
.modal {
  @apply m-auto w-full h-full opacity-100;
}
.content {
  @apply flex flex-col justify-center items-end fixed top-[20vh] left-[10vw] right-[10vw] pointer-events-none;
}

.modal_close {
  @apply cursor-pointer pointer-events-auto translate-x-[-0.2em] translate-y-[1.35em] inline-flex py-[0.275em] px-[0.275em] justify-center items-center  rounded-[100%] border border-solid border-[#eeebdd] w-fit h-fit backdrop-blur-sm;
}
.modal_close img {
  @apply w-[0.5em] h-[0.5em] bg-inherit;
}
.more_wrapper {
  overflow-x: scroll;
}
.more_title {
  @apply w-full flex flex-col justify-center self-stretch text-[1.5em] px-[0.625em] font-bold mb-[1em] leading-[50px];
}
.swiper_wrapper {
  @apply w-full pl-[0.9375em] min-h-[50vh];
}
.swiper {
  @apply flex  snap-mandatory snap-x;
}
.swiper_slide {
  @apply flex gap-[1.5em] w-[14.375em] h-[24.1875em] mb-[1.875em] mr-[0.9375em] snap-always snap-start;
}

@media screen and (min-width: 941px) {
  main {
    padding: 0;
  }
  .movie_infos {
    @apply py-0 px-[7.5em] mt-[29.44em] flex items-start  justify-between mb-[3.875em];
  }
  .movie_infos > div {
    width: 23%;
  }
  .movie_infos > div:nth-child(2) {
    width: 42%;
  }
  .left_col {
    @apply flex flex-col gap-[1.5em];
  }
  .trailer_btn {
    @apply h-[3.8125em] px-[2em] py-[1.125em] flex justify-center items-center bg-play_red rounded-[6.25em];
  }
  .trailer_txt_wrapper {
    @apply flex flex-nowrap justify-center items-center  py-[0.09524em] mr-[0.5715em];
  }
  .trailer_text {
    @apply p-0 m-0   text-[1.3125em] leading-[1.172em];
  }
  .trailer_icon {
    @apply w-[1.3125em] h-[1.3125em];
  }
  .share_btn {
    @apply w-[3.8125em] h-[3.8125em] p-[1.25em];
  }
  .share_icon {
    @apply w-[1.3125em] h-[1.3125em];
  }
  .fave_btn {
    @apply w-[3.8125em] h-[3.8125em] p-[1.25em];
  }
  .fave_icon {
    @apply w-[1.3125em] h-[1.3125em];
  }
  .cover-img_wrapper {
    height: 41.94em;
  }

  .photos_wrapper {
    @apply px-[7.5em] mb-[3.125em] py-0;
  }
  .photos_wrapper h2 {
    @apply text-[1.75em] font-bold h-[1.78571429em] mb-[0.4286em] leading-[208.333%];
  }
  .info_wrapper {
    padding-top: 3.125em;
  }
  .showAll_wrapper {
    @apply w-fit self-start;
  }

  .photo_list {
    @apply w-full flex flex-wrap items-center justify-start;
  }
  .photo_item {
    @apply w-[17%] mt-[1.5em] mr-[1.5em];
  }
  .image_container {
    @apply w-full h-full m-0;
  }
  .content {
    @apply flex flex-col justify-center items-end fixed top-[10vh] left-[20vw] right-[20vw];
  }
  .modal_close {
    @apply w-[3.625em] h-[3.625em] translate-x-[-1.625em] translate-y-[4.875em] p-[1.25em] border-[0.125em] border-solid border-[#eeebdd];
  }
  .modal_close img {
    width: 1.125em;
    height: 1.125em;
  }
  .expanded_img {
    @apply w-full rounded-[0.325em];
  }
  .content {
    @apply top-[1vh] left-[20vw] right-[20vw] h-[39.5em];
  }
  .more_title {
    @apply text-[1.75em] m-0 py-0 px-[4.28571429em];
  }
  .swiper_slide {
    @apply flex gap-[1.5em] w-[17.1875em] min-h-[45em] mb-[1.875em] mr-[1.5em];
  }
  .swiper_wrapper {
    width: 100%;
    padding: 0;
    min-height: 45em;
  }
}

@media screen and (min-width: 1360px) {
  .photo_item {
    @apply w-[17.5%];
  }
  .more_title {
    @apply mb-[0.857142857em];
  }
  .swiper_slide {
    @apply min-h-[28.375em];
  }
}
</style>

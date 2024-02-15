import { defineStore } from "pinia";

export const useMovieStore = defineStore("movies", {
  state: () => ({
    favList: [],
  }),
  persist: {
    storage: sessionStorage,
    paths: ["favList"],
  },
  actions: {
    toggleFav(id) {
      const indexInFav = this.favList.indexOf(id);
      if (indexInFav > -1) {
        this.favList.splice(indexInFav, 1);
      } else {
        this.favList.push(id);
      }
    },
  },
  getters: {
    movieIsFav: (state) => {
      return (id) => state.favList.indexOf(id) > -1;
    },
  },
});

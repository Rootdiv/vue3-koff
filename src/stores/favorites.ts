import { defineStore } from 'pinia';

interface IStateFavorites {
  favoritesList: number[];
}

export const useFavoritesStore = defineStore('favorites', {
  state: (): IStateFavorites => ({
    favoritesList: JSON.parse(localStorage.getItem('koff-vue-favorites') || '[]'),
  }),
  getters: {
    isFavorites() {
      return (id: number) => this.favoritesList.includes(id);
    },
  },
  actions: {
    addToFavorites(id: number) {
      this.favoritesList.push(id);
      localStorage.setItem('koff-vue-favorites', JSON.stringify(this.favoritesList));
    },
    removeFromFavorites(removeId: number) {
      this.favoritesList = this.favoritesList.filter((id) => id !== removeId);
      localStorage.setItem('koff-vue-favorites', JSON.stringify(this.favoritesList));
    },
  },
});

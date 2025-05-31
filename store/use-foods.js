import { toast } from "@/hooks/use-toast";
import {
  addFavoriteFood,
  deleteFavoriteFood,
  getFavoriteFoods,
  getHistoryIngredients,
  ratingFood,
} from "@/lib/api/api";
import { create } from "zustand";

export const useFoodsStore = create((set, get) => ({
  loading: false,
  favoriteFoods: [],
  historyIngredients: [],
  isRatingDialogOpen: false,
  rating: null,
  hover: null,
  submitted: false,
  isRatingLoading: false,
  loadHistoryIngredients: false,

  fetchFavorites: async (userId, token) => {
    set({ loading: true });
    try {
      const response = await getFavoriteFoods(userId, token);
      set({ favoriteFoods: response.data });
    } catch (error) {
      console.error("Gagal mengambil makanan favorit:", error);
    } finally {
      set({ loading: false });
    }
  },

  fetchHistoryIngredients: async (userId, token) => {
    set({ loadHistoryIngredients: true });
    try {
      const response = await getHistoryIngredients(userId, token);
      set({ historyIngredients: response.data });
    } catch (error) {
      console.error("Gagal mengambil makanan favorit:", error);
    } finally {
      set({ loadHistoryIngredients: false });
    }
  }, 

  handleFavorite: async (userId, token, foodId) => {
    set({ loading: true });
    const { favoriteFoods } = get();
    const isFavorite = favoriteFoods?.some((food) => food.id == foodId);
    try {
      if (isFavorite) {
        await deleteFavoriteFood(userId, foodId, token);
        toast({
          title: "Berhasil menghapus dari favorit",
          description: "Resep telah dihapus dari daftar favorit Anda",
        });
      } else {
        await addFavoriteFood(userId, foodId, token);
        toast({
          title: "Berhasil menambahkan ke favorit",
          description: "Resep telah ditambahkan ke daftar favorit Anda",
        });
      }

      const response = await getFavoriteFoods(userId, token);
      set({ favoriteFoods: response.data });
    } catch (error) {
      console.error("Gagal memperbarui favorit:", error);
    } finally {
      set({ loading: false });
    }
  },

  openRatingDialog: () => set({ isRatingDialogOpen: true }),

  closeRatingDialog: () => {
    if (!get().isRatingLoading) {
      set({
        isRatingDialogOpen: false,
        submitted: false,
        rating: null,
        hover: null,
      });
    }
  },

  setRating: (value) => set({ rating: value }),
  setHover: (value) => set({ hover: value }),

  submitRating: async (foodId, userId, rating, token) => {
    if (!rating || get().isRatingLoading) return;
    set({ isRatingLoading: true });

    try {
      await ratingFood(foodId, userId, rating, token);
      set({ submitted: true });

      setTimeout(() => {
        get().closeRatingDialog();
      }, 1500);
    } catch (err) {
      toast({
        title: "Gagal mengirim rating",
        description: "Terjadi kesalahan saat mengirim rating.",
        variant: "destructive",
      });
    } finally {
      set({ isRatingLoading: false });
    }
  },
}));

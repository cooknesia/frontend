"use client";

import { useToast } from "@/hooks/use-toast";
import {
  addFavoriteFood,
  deleteFavoriteFood,
  getFavoriteFoods,
  ratingFood,
} from "@/lib/api/api";
import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";

const FoodsContext = createContext(); 

export const FoodsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const { user, token } = useAuth();
  const [refresh, setRefresh] = useState(false);
  const { toast } = useToast();
  const params = useParams();

  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isRatingLoading, setIsRatingLoading] = useState(false);

  const openRatingDialog = () => setIsRatingDialogOpen(true);
  const closeRatingDialog = () => {
    if (!isRatingLoading) {
      setIsRatingDialogOpen(false);
      setTimeout(() => {
        setSubmitted(false);
        setRating(null);
        setHover(null);
      }, 300);
    }
  };

  const submitRating = async () => {
    if (rating && !isRatingLoading && user) {
      setIsRatingLoading(true);
      try {
        await ratingFood(params.id, user.id, rating, token);
        setSubmitted(true);
        setTimeout(() => {
          closeRatingDialog();
        }, 1500);
      } catch (err) {
        toast({
          title: "Gagal mengirim rating",
          description: "Terjadi kesalahan saat mengirim rating.",
          variant: "destructive",
        });
      } finally {
        setIsRatingLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchFavoriteFoods = async () => {
      try {
        const response = await getFavoriteFoods(user.id, token);
        setFavoriteFoods(response.data);
      } catch (error) {
        console.error("Gagal mengambil makanan favorit:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteFoods();
  }, [user, token, params.id, refresh]);

  const handleFavorite = async () => {
    if (!user)
      return toast({
        title: "Anda harus masuk terlebih dahulu",
        description: "Silakan masuk untuk menambahkan resep ke favorit",
        variant: "destructive",
      });
    setLoading(true);
    const isFavorite = favoriteFoods?.some((food) => food.id == params.id);
    try {
      if (isFavorite) {
        await deleteFavoriteFood(user.id, params.id, token);
        toast({
          title: "Berhasil menghapus dari favorit",
          description: "Resep telah dihapus dari daftar favorit Anda",
        });
      } else {
        await addFavoriteFood(user.id, params.id, token);
        toast({
          title: "Berhasil menambahkan ke favorit",
          description: "Resep telah ditambahkan ke daftar favorit Anda",
        });
      }
    } catch (error) {
      console.error("Gagal memperbarui favorit:", error);
    } finally {
      setRefresh(!refresh);
    }
  };

  return (
    <FoodsContext.Provider
      value={{
        loading,
        favoriteFoods,
        handleFavorite,
        isRatingDialogOpen,
        openRatingDialog,
        closeRatingDialog,
        rating,
        setRating,
        hover,
        setHover,
        submitted,
        isRatingLoading,
        submitRating,
      }}
    >
      {children}
    </FoodsContext.Provider>
  );
};


export const useFoods = () => {
  const context = useContext(FoodsContext);
  if (!context) {
    throw new Error("useFoods harus digunakan di dalam FoodsProvider");
  }
  return context;
};

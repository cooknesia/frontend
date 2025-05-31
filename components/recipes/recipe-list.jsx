"use client";

import { RecipeCard } from "@/components/recipe-card";
import { getAllFoods } from "@/lib/api/api";
import { nanoid } from "nanoid";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import RecipeLayout from "../layout/recipe-layout";
import RecipeListSkeleton from "./recipe-sekeleton";

export function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const loader = useRef(null);

  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const province = searchParams.get("province");

  const fetchRecipes = async (pageToFetch) => {
    try {
      const res = await getAllFoods(keyword, province, pageToFetch);
      return res.data;
    } catch (error) {
      console.error("Gagal mengambil resep:", error);
      return { foods: [], pagination: { totalPages: 1 } };
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setPage(1);
    fetchRecipes(1).then((data) => {
      setRecipes(data.foods);
      setTotalPages(data.pagination.totalPages);
      setIsLoading(false);
    });
  }, [keyword, province]);

  useEffect(() => {
    if (page === 1) return;
    setIsFetchingMore(true);
    fetchRecipes(page).then((data) => {
      setRecipes((prev) => [...prev, ...data.foods]);
      setIsFetchingMore(false);
    });
  }, [page]);

  useEffect(() => {
    console.log("RECIPES : ", recipes);
  }, [recipes]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLoading &&
          !isFetchingMore &&
          page < totalPages
        ) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0,
        rootMargin: "300px",
      }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [isLoading, isFetchingMore, totalPages, page]);

  useEffect(() => {
    console.log("RECIPES CHANGED : ", recipes);
  }, [recipes])

  if (recipes.length === 0 && !isLoading) {
    return (
      <div className="text-center text-gray-500 py-8">
        Tidak ada resep yang ditemukan.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <RecipeLayout>
        {isLoading ? (
          <RecipeListSkeleton count={4} />
        ) : (
          recipes.map((recipe) => <RecipeCard key={nanoid()} recipe={recipe} />)
        )}
        {isFetchingMore && <RecipeListSkeleton count={3} />}
      </RecipeLayout>

      <div ref={loader} />
    </div>
  );
}

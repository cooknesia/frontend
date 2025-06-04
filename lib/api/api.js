import { buildQueryString } from "../utils";
import fetcher from "./api-client";

export async function signInGoogle(googleToken) {
  return fetcher("/auth/google", {
    method: "POST",
    data: { token: googleToken },
  });
}

export async function getPopularFoods() {
  return fetcher("/foods/popular");
}

export async function getAllFoods(keyword = "", province = "", page = 1) {
  const query = buildQueryString({
    keyword,
    province,
    page,
  });

  return fetcher(`/foods${query}`);
}

export async function getRecomendationFoods(ingredients, userId = "") {
  return fetcher(`/recommendations?userId=${userId}`, {
    method: "POST",
    data: { ingredients },
  });
}

export async function getFavoriteFoods(userId, token) {
  return fetcher(`/favorites/${userId}`, {}, token);
}

export async function getFoodById(foodId) {
  return fetcher(`/foods/${foodId}`);
}

export async function addFavoriteFood(userId, foodId, token) {
  return fetcher(
    `/favorites?userId=${userId}&foodId=${foodId}`,
    {
      method: "POST",
    },
    token
  );
}

export async function deleteFavoriteFood(userId, foodId, token) {
  return fetcher(
    `/favorites?userId=${userId}&foodId=${foodId}`,
    {
      method: "DELETE",
    },
    token
  );
}

export async function getIngredients(page = 1) {
  return fetcher(`/ingredients?page=${page}`);
}

export async function queryIngredients(keyword) {
  return fetcher(`/ingredients/search?keyword=${encodeURIComponent(keyword)}`);
}

export async function ratingFood(foodId, userId, rating, token) {
  return fetcher(
    `/ratings/${foodId}`,
    {
      method: "POST",
      data: { userId, rating },
    },
    token
  );
}

export async function getRatingFood(foodId, token) {
  return fetcher(`/ratings/${foodId}`, {}, token);
}

export async function getHistoryIngredients(userId, token) {
  return fetcher(
    `/recommendation-logs/${userId}`,
    {
      data: { token },
    },
    token
  );
}

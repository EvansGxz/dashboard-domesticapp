import apiFetch from "./api-fetch";

export async function indexCategories() {
  return await apiFetch(`categories`);
}

export async function showCategory(CategoryID) {
  return await apiFetch(`categories/${CategoryID}`);
}

export async function deleteCategory(CategoryID) {
  return await apiFetch(`categories/${CategoryID}`, { method: "DELETE" });
}

export async function createCategory(data) {
  return await apiFetch('categories/', { body: data });
}

export async function updateCategory(data, catId) {
  return await apiFetch(`categories/${catId}`, {
    body: data,
    method: "PATCH",
  });
}
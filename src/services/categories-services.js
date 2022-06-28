import apiFetch from "./api-fetch";

export async function indexCategories() {
  return await apiFetch(`categories`);
}
export async function indexsector() {
  return await apiFetch(`sector`);
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

export async function createECategory(data) {
  return await apiFetch('employee_categories/', { body: data });
}
export async function showHECategory(CategoryID) {
  return await apiFetch(`employee_category/${CategoryID}`);
}

export async function updateCategory(data, catId) {
  return await apiFetch(`categories/${catId}`, {
    body: data,
    method: "PATCH",
  });
}
import apiFetch from "./api-fetch";

export async function showEmployee(UserID) {
  return await apiFetch(`employee/${UserID}`);
}

export async function indexEmployee() {
  return await apiFetch(`employee/`);
}
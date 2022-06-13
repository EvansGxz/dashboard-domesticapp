import apiFetch from "./api-fetch";

export async function showAdmin(UserID) {
  return await apiFetch(`admin/${UserID}`);
}

export async function indexAdmin() {
  return await apiFetch(`admin/`);
}

export async function updateAdmin(data, userId) {
  console.log(data);
  return await apiFetch(`admin/${userId}`, {
    body: data,
    method: "PATCH",
  });
}
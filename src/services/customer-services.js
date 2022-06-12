import apiFetch from "./api-fetch";

export async function showCustomer(UserID) {
  return await apiFetch(`customer/${UserID}`);
}

export async function indexCustomer() {
  return await apiFetch(`customer/`);
}

export async function updateCustomer(data, userId) {
  console.log(data);
  return await apiFetch(`customers/${userId}`, {
    body: data,
    method: "PATCH",
  });
}
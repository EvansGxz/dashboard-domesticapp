import apiFetch from "./api-fetch";

export async function showCustomer(UserID) {
  return await apiFetch(`customer/${UserID}`);
}

export async function showCustomerID(UserID) {
  return await apiFetch(`user_id/${UserID}`);
}

export async function showCustomerCountry(UserID) {
  return await apiFetch(`customer_country/${UserID}`);
}

export async function indexCustomer() {
  return await apiFetch(`customer/`);
}

export async function updateCustomer(data, userId) {

  return await apiFetch(`customers/${userId}`, {
    body: data,
    method: "PATCH",
  });
}
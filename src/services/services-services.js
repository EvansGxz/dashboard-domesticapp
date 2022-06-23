import apiFetch from "./api-fetch";

export async function indexServices() {
  return await apiFetch(`services`);
}

export async function showService(ServiceID) {
  return await apiFetch(`service/${ServiceID}`);
}

export async function createService(newHability) {
  return await apiFetch('services/', { body: newHability });
}

export async function updateService(data, ServiceID) {
  return await apiFetch(`services/${ServiceID}`, {
    body: data,
    method: "PATCH",
  });
}

export async function deleteService(HabilityID) {
  return await apiFetch(`services/${HabilityID}`, { method: "DELETE" });
}

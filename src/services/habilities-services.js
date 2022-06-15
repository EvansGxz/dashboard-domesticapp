import apiFetch from "./api-fetch";

export async function indexHability() {
  return await apiFetch(`hability`);
}

export async function showHability(HabilityID) {
  return await apiFetch(`hability/${HabilityID}`);
}

export async function createHability(newHability) {
  return await apiFetch('hability/', { body: newHability });
}

export async function updateHability(data) {
  return await apiFetch("hability/", {
    body: data,
    method: "PATCH",
  });
}

export async function deleteHability(HabilityID) {
  return await apiFetch(`hability/${HabilityID}`, { method: "DELETE" });
}

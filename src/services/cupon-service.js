import apiFetch from "./api-fetch";

export async function showCupon(CuponrID) {
  return await apiFetch(`cupon/${CuponrID}`);
}

export async function indexCupon() {
  return await apiFetch(`cupons/`);
}

export async function createCupon(newCupon) {
  return await apiFetch('cupons/', { body: newCupon });
   
}

export async function updateCupon(data) {
  return await apiFetch("cupons/", {
    body: data,
    method: "PATCH",
  });
}

export async function deleteCupon(CuponUserID) {
  return await apiFetch(`cupons/${CuponUserID}`, { method: "DELETE" });
}

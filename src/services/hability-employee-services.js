import apiFetch from "./api-fetch";

export async function indexHEmployee() {
  return await apiFetch(`hability_employees`);
}

export async function showHEmployee(HEmployeeID) {
  return await apiFetch(`he/${HEmployeeID}`);
}

export async function createHEmployee(newHEmployee) {
  return await apiFetch('hability_employees/', { body: newHEmployee });  
}

export async function updateHEmployee(data, HEId) {
  return await apiFetch(`hability_employees/${HEId}`, {
    body: data,
    method: "PATCH",
  });
}

export async function deleteHEmployee(HabilityID) {
  return await apiFetch(`hability_employees/${HabilityID}`, { method: "DELETE" });
}

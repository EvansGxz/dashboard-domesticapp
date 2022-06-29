import apiFetch from "./api-fetch";

export async function indexNotify() {
  return await apiFetch(`notifications`);
}

export async function showNotify(NotifyID) {
  return await apiFetch(`notify/${NotifyID}`);
}

export async function createNotify(newNotify) {
  return await apiFetch('notifications/', { body: newNotify });
}

export async function updateNotify(data, NotifyID) {
  return await apiFetch(`notifications/${NotifyID}`, {
    body: data,
    method: "PATCH",
  });
}

export async function deleteNotify(NotifyID) {
  return await apiFetch(`notifications/${NotifyID}`, { method: "DELETE" });
}

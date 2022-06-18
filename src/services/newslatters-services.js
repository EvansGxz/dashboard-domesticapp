import apiFetch from "./api-fetch";

export async function indexNews() {
  return await apiFetch(`newslatters`);
}

export async function showNews(NewsID) {
  return await apiFetch(`newslatters/${NewsID}`);
}

export async function createNews(newHability) {
  return await apiFetch('newslatters/', { body: newHability });
}

export async function updateNews(data, NewsID) {
  return await apiFetch(`newslatters/${NewsID}`, {
    body: data,
    method: "PATCH",
  });
}

export async function deleteNews(HabilityID) {
  return await apiFetch(`newslatters/${HabilityID}`, { method: "DELETE" });
}

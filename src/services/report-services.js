import apiFetch from "./api-fetch";

export async function indexReport() {
  return await apiFetch(`reports`);
}

export async function showReport(ReportID) {
  return await apiFetch(`reports/${ReportID}`);
}

export async function createReport(newReport) {
  return await apiFetch('reports/', { body: newReport });
}

export async function updateReport(data, ReportID) {
  return await apiFetch(`reports/${ReportID}`, {
    body: data,
    method: "PATCH",
  });
}

export async function deleteReport(ReportID) {
  return await apiFetch(`reports/${ReportID}`, { method: "DELETE" });
}

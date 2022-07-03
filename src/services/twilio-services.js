import apiFetch from "./api-fetch";

export async function TwilioNotify(newHability) {
  return await apiFetch('api/create_service/', { body: newHability });
}

export async function EditServiceNotify(newHability) {
  return await apiFetch('api/edit_service/', { body: newHability });
}

export async function DeleteServiceNotify(newHability) {
  return await apiFetch('api/cancel_services/', { body: newHability });
}
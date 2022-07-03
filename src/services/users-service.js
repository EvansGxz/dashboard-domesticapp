import { tokenKey } from "../Config";
import apiFetch from "./api-fetch";

export async function getUser() {
  
  const { _token, ...user } = await apiFetch("profile");
 
  return user;
}

export async function createUser(newUser) {
  const { token, ...user } = await apiFetch('users', { body: newUser });
  sessionStorage.setItem(tokenKey, token);
  return user;
}

export async function createUser1(newUser) {
  return await apiFetch('users', { body: newUser });
}

export async function updateUser(data) {
  const { _token, ...user } = await apiFetch("profile", {
    body: data,
    method: "PATCH",
  });
  return user;
}

export async function deleteUser(userId) {
  return await apiFetch(`users/${userId}`, { method: "DELETE" });
}

export async function updateEmployee(data, userId) {

  return await apiFetch(`employees/${userId}`, {
    body: data,
    method: "PATCH",
  });
}

export async function updateUserID(data, ServiceID) {
  return await apiFetch(`user_update/${ServiceID}`, {
    body: data,
    method: "PATCH",
  });
}
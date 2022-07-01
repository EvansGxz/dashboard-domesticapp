import apiFetch from "./api-fetch";

export async function indexEmployeecategories() {
  return await apiFetch(`employee_categories`);
}

export async function showEmployeecategory(EmployeecategoryID) {
  return await apiFetch(`employee_categories/${EmployeecategoryID}`);
}

export async function showEmployeecat(EmployeecategoryID) {
  return await apiFetch(`employee_cat/${EmployeecategoryID}`);
}

export async function deleteEmployeecategory(EmployeecategoryID) {
  return await apiFetch(`employee_categories/${EmployeecategoryID}`);
}
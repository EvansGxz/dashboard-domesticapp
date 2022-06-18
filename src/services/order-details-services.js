import apiFetch from "./api-fetch";

export async function indexOrderDetails() {
  return await apiFetch(`order_details`);
}

export async function showOrderDetail(OrderDetailID) {
  return await apiFetch(`order/${OrderDetailID}`);
}

export async function showOrderCustomer(OrderDetailID) {
  return await apiFetch(`order_customer/${OrderDetailID}`);
}

export async function showOrderEmployee(OrderDetailID) {
  return await apiFetch(`order_employee/${OrderDetailID}`);
}

export async function indexOrder() {
  return await apiFetch(`orders/`);
}

export async function updateOrder(data, userId) {
  return await apiFetch(`order_details/${userId}`, {
    body: data,
    method: "PATCH",
  });
}

export async function deleteOrder(CuponUserID) {
  return await apiFetch(`order_details/${CuponUserID}`, { method: "DELETE" });
}

export async function createOrder(newCuponUser) {
  return await apiFetch('order_details/', { body: newCuponUser });
}

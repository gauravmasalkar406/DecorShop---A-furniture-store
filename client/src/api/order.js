import { host } from "./host";

export const addOrderItems = `${host}/api/order/add_order_items`;

export const updateOrderToPaid = `${host}/api/order/update_order_to_paid`;

export const updateOrderToDeliveredRoute = `${host}/api/order/update_order_to_delivered`;

export const getOrderByIdRoute = `${host}/api/order/get_order_by_id`;

export const stripePayRoute = `${host}/api/order/create_checkout_session`;

export const getMyOrdersRoute = `${host}/api/order/get_my_orders`;

export const getAllOrdersRoute = `${host}/api/order/get_all_orders_admin`;

export const host = 'https://delever.uz';
export const signUpUrl = `${host}/api/v1/client/sign-up/`;
export const signInUrl = `${host}/api/v1/client/sign-in/`;
export const verifyUrl = `${host}/api/v1/client/sign-in/verify/`;

export const vendorMenuURL = `${host}/api/v1/client/menu/`;

export const createOrderURL = `${host}/api/v1/client/order/`;

export const ordersURL = `${host}/api/v1/client/orders/`;

export const feedbackURL = (orderId: number) =>
  `${host}/api/v1/client/orders/${orderId}/feedback/`;

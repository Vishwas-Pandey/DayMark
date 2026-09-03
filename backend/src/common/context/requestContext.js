import { AsyncLocalStorage } from 'async_hooks';

export const requestContext = new AsyncLocalStorage();

export const getContext = () => requestContext.getStore() || {};
export const getRequestId = () => getContext().requestId;

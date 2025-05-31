'use server';

import axiosInstance from './axios-instance';

export default async function fetcher(
  endpoint,
  config = {},
  authToken = null
){
  try {
    const response = await axiosInstance.request({
      url: endpoint,
      ...config,
      headers: {
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
        ...config.headers,
      },
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || 'API request failed';
    throw new Error(message);
  }
}

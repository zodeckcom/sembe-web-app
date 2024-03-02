// apiHelpers.js

import axios, { AxiosResponse } from 'axios';

// Function to get base URL based on parameter
export const getBaseURL = (param: string): string => {
  if (param === 'onrender') {
    return 'https://sembe.onrender.com';
  } else if (param === 'railway') {
    return 'https://sembe.up.railway.app';
  } else {
    throw new Error('Invalid parameter provided');
  }
};

// Create Axios instance with dynamic baseURL
const instance = axios.create({
  timeout: 5000, // Adjust timeout as needed
  headers: {
    'Content-Type': 'application/json',
    // Add any common headers here
  },
});

// Helper function for making GET requests
export const get = async (url: string, params?: any): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse<AxiosResponse> = await instance.get(url, { params });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error.response ? error.response.data : error.message;
    } else {
      throw new Error(error as string);
    }
  }
};

// Helper function for making POST requests
export const post = async (url: string, data: any): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse<AxiosResponse> = await instance.post(url, data);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error.response ? error.response.data : error.message;
    } else {
      throw new Error(error as string);
    }
  }
};

// Add more helper functions for other HTTP methods (PUT, DELETE, etc.) as needed

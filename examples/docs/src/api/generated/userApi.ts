// 🤖 基于Swagger生成的API调用模块 - userApi
// ⚠️  请勿手动修改此文件

import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import type { components } from './api-generated';
import { API_ENDPOINTS } from './endpoints';

// 创建axios实例
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || process.env.VUE_APP_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * 构建URL路径，替换路径参数
 */
function buildUrl(path: string, pathParams: Record<string, any> = {}): string {
  let url = path;
  for (const [key, value] of Object.entries(pathParams)) {
    url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
  }
  return url;
}

/**
 * userApi 服务API接口
 */
export const userApiApi = {
  /**
   * 获取用户列表
   * @description GET /users
   * @returns Promise<any>
   */
  async getUserList(params?: any, config?: AxiosRequestConfig): Promise<any> {
    const url = buildUrl(API_ENDPOINTS.getUserList.path, params);
    return apiClient.get(url, { params, ...config });
  },

  /**
   * 创建新用户
   * @description POST /users
   * @returns Promise<any>
   */
  async createUser(data?: components['schemas']['CreateUserRequest'], params?: any, config?: AxiosRequestConfig): Promise<any> {
    const url = buildUrl(API_ENDPOINTS.createUser.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * 根据ID获取用户信息
   * @description GET /users/{userId}
   * @returns Promise<any>
   */
  async getUserById(params?: any, config?: AxiosRequestConfig): Promise<any> {
    const url = buildUrl(API_ENDPOINTS.getUserById.path, params);
    return apiClient.get(url, { params, ...config });
  },

  /**
   * 更新用户信息
   * @description PUT /users/{userId}
   * @returns Promise<any>
   */
  async updateUser(data?: components['schemas']['UpdateUserRequest'], params?: any, config?: AxiosRequestConfig): Promise<any> {
    const url = buildUrl(API_ENDPOINTS.updateUser.path, params);
    return apiClient.put(url, data, { ...config });
  },

  /**
   * 删除用户
   * @description DELETE /users/{userId}
   * @returns Promise<any>
   */
  async deleteUser(params?: any, config?: AxiosRequestConfig): Promise<any> {
    const url = buildUrl(API_ENDPOINTS.deleteUser.path, params);
    return apiClient.delete(url, { params, ...config });
  },

  /**
   * 用户登录
   * @description POST /auth/login
   * @returns Promise<any>
   */
  async login(data?: components['schemas']['LoginRequest'], params?: any, config?: AxiosRequestConfig): Promise<any> {
    const url = buildUrl(API_ENDPOINTS.login.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * 用户登出
   * @description POST /auth/logout
   * @returns Promise<any>
   */
  async logout(data?: any, params?: any, config?: AxiosRequestConfig): Promise<any> {
    const url = buildUrl(API_ENDPOINTS.logout.path, params);
    return apiClient.post(url, data, { ...config });
  },

};

// 导出服务类型
export type userApiApiType = typeof userApiApi;

// 导出axios实例供高级使用
export { apiClient };

// 导出常用类型
export type { components } from './api-generated';

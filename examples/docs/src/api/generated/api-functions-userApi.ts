// 🤖 基于Swagger自动生成的API调用函数 - userApi
// ⚠️  请勿手动修改此文件
// 📅 生成时间: 2025-11-07T07:53:40.290Z

// 注意：axios 需要安装为项目依赖
// npm install axios @types/axios
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import type { components } from './api-generated';

// API基础配置
const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_BASE_URL || process.env.VUE_APP_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// 创建axios实例
const apiClient = axios.create(API_CONFIG);

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 添加认证token
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    // 统一处理响应数据
    return response.data;
  },
  (error) => {
    // 统一错误处理
    console.error('API请求错误:', error);
    
    if (error.response?.status === 401) {
      // 未授权，清除token并跳转登录
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
function buildPath(path: string, pathParams: Record<string, any> = {}): string {
  let builtPath = path;
  for (const [key, value] of Object.entries(pathParams)) {
    builtPath = builtPath.replace(`{${key}}`, encodeURIComponent(String(value)));
  }
  return builtPath;
}

/**
 * userApi 服务API函数集合
 */
export const userApiApi = {
  /**
   * 获取用户列表
   * @description GET /users
   * @param page 页码，从1开始
   * @param limit 每页数量
   * @param search 搜索关键词（用户名或邮箱）
   * @param status 用户状态筛选
   * @returns Promise<Record<string, any>>
   */
  async getUserList(queryParams?: { page?: number; limit?: number; search?: string; status?: string }, config?: AxiosRequestConfig): Promise<Record<string, any>> {
    const url = '/users';
    const requestConfig: AxiosRequestConfig = {
      method: 'GET',
      url,
      params: queryParams,
      ...config,
    };

    return apiClient.request<Record<string, any>>(requestConfig);
  },

  /**
   * 创建新用户
   * @description POST /users
   * @param data 
   * @returns Promise<Record<string, any>>
   */
  async createUser(data: components['schemas']['CreateUserRequest'], config?: AxiosRequestConfig): Promise<Record<string, any>> {
    const url = '/users';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<Record<string, any>>(requestConfig);
  },

  /**
   * 根据ID获取用户信息
   * @description GET /users/{userId}
   * @param userId 用户ID
   * @returns Promise<Record<string, any>>
   */
  async getUserById(pathParams: { userId: number }, config?: AxiosRequestConfig): Promise<Record<string, any>> {
    const url = buildPath('/users/{userId}', pathParams);
    const requestConfig: AxiosRequestConfig = {
      method: 'GET',
      url,
      ...config,
    };

    return apiClient.request<Record<string, any>>(requestConfig);
  },

  /**
   * 更新用户信息
   * @description PUT /users/{userId}
   * @param userId 
   * @param data 
   * @returns Promise<Record<string, any>>
   */
  async updateUser(pathParams: { userId: number }, data: components['schemas']['UpdateUserRequest'], config?: AxiosRequestConfig): Promise<Record<string, any>> {
    const url = buildPath('/users/{userId}', pathParams);
    const requestConfig: AxiosRequestConfig = {
      method: 'PUT',
      url,
      data,
      ...config,
    };

    return apiClient.request<Record<string, any>>(requestConfig);
  },

  /**
   * 删除用户
   * @description DELETE /users/{userId}
   * @param userId 
   * @returns Promise<Record<string, any>>
   */
  async deleteUser(pathParams: { userId: number }, config?: AxiosRequestConfig): Promise<Record<string, any>> {
    const url = buildPath('/users/{userId}', pathParams);
    const requestConfig: AxiosRequestConfig = {
      method: 'DELETE',
      url,
      ...config,
    };

    return apiClient.request<Record<string, any>>(requestConfig);
  },

  /**
   * 用户登录
   * @description POST /auth/login
   * @param data 
   * @returns Promise<Record<string, any>>
   */
  async login(data: components['schemas']['LoginRequest'], config?: AxiosRequestConfig): Promise<Record<string, any>> {
    const url = '/auth/login';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<Record<string, any>>(requestConfig);
  },

  /**
   * 用户登出
   * @description POST /auth/logout

   * @returns Promise<Record<string, any>>
   */
  async logout(data?: any, config?: AxiosRequestConfig): Promise<Record<string, any>> {
    const url = '/auth/logout';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<Record<string, any>>(requestConfig);
  },

};

// 导出类型定义
export type userApiApiType = typeof userApiApi;

// 导出API客户端实例（供高级使用）
export { apiClient };

// 导出常用类型
export type { components } from './api-generated';

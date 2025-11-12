// 🤖 基于Swagger自动生成的API调用函数 - default
// ⚠️  请勿手动修改此文件
// 📅 生成时间: 2025-11-12T08:44:32.412Z

import type { components } from './api.d';

// ==================== 请求配置接口 ====================

/**
 * 通用请求配置接口
 */
export interface ApiRequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  [key: string]: any;
}

/**
 * 请求客户端接口
 */
export interface RequestClient {
  request<T = any>(config: ApiRequestConfig): Promise<T>;
}

/**
 * API客户端配置
 */
export interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  customClient?: RequestClient;
}

// ==================== API客户端管理 ====================

let globalApiClient: RequestClient | null = null;
// 使用用户提供的自定义请求实例
// 注意：在运行时需要确保自定义请求实例已经被设置
// 可以通过 configureApiClient({ customClient: customRequestInstance }) 来设置


/**
 * 配置全局API客户端
 * @param config 客户端配置
 */
export function configureApiClient(config: ApiClientConfig = {}): void {
  if (config.customClient) {
    // 使用用户提供的自定义客户端
    globalApiClient = config.customClient;
  } else {
    // 创建默认的Axios客户端
    let axios: any;
    try {
      axios = require('axios');
    } catch (e) {
      throw new Error('axios not found. Please install axios or provide customClient.');
    }

    const axiosInstance = axios.create({
      baseURL: config.baseURL || process.env.REACT_APP_API_BASE_URL || process.env.VUE_APP_API_BASE_URL || '/api',
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    globalApiClient = {
      request: <T = any>(requestConfig: ApiRequestConfig): Promise<T> => {
        return axiosInstance.request(requestConfig).then((response: any) => response.data);
      },
    };
  }
}

/**
 * 获取当前API客户端
 */
export function getApiClient(): RequestClient {
  if (!globalApiClient) {
    configureApiClient();
  }
  return globalApiClient!;
}

// ==================== 工具函数 ====================

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

// ==================== API函数集合 ====================

/**
 * default 服务API函数集合
 */
export const defaultApi = {
  /**
   * 获取用户列表
   * @description GET /users

   * @returns Promise<components['schemas']['User'][]>
   */
  async getUsers(config?: ApiRequestConfig): Promise<components['schemas']['User'][]> {
    const url = '/users';
    const requestConfig: ApiRequestConfig = {
      method: 'GET',
      url,
      ...config,
    };

    return getApiClient().request<components['schemas']['User'][]>(requestConfig);
  },

  /**
   * 创建用户
   * @description POST /users
   * @param data 
   * @returns Promise<components['schemas']['User']>
   */
  async createUser(data: components['schemas']['User'], config?: ApiRequestConfig): Promise<components['schemas']['User']> {
    const url = '/users';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['User']>(requestConfig);
  },

  /**
   * 获取用户详情
   * @description GET /users/{id}
   * @param id 
   * @returns Promise<components['schemas']['User']>
   */
  async getUserById(pathParams: { id: string }, config?: ApiRequestConfig): Promise<components['schemas']['User']> {
    const url = buildPath('/users/{id}', pathParams);
    const requestConfig: ApiRequestConfig = {
      method: 'GET',
      url,
      ...config,
    };

    return getApiClient().request<components['schemas']['User']>(requestConfig);
  },

  /**
   * 更新用户
   * @description PUT /users/{id}
   * @param id 
   * @param data 
   * @returns Promise<components['schemas']['User']>
   */
  async updateUser(pathParams: { id: string }, data: components['schemas']['User'], config?: ApiRequestConfig): Promise<components['schemas']['User']> {
    const url = buildPath('/users/{id}', pathParams);
    const requestConfig: ApiRequestConfig = {
      method: 'PUT',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['User']>(requestConfig);
  },

  /**
   * 删除用户
   * @description DELETE /users/{id}
   * @param id 
   * @returns Promise<void>
   */
  async deleteUser(pathParams: { id: string }, config?: ApiRequestConfig): Promise<void> {
    const url = buildPath('/users/{id}', pathParams);
    const requestConfig: ApiRequestConfig = {
      method: 'DELETE',
      url,
      ...config,
    };

    return getApiClient().request<void>(requestConfig);
  },

};

// ==================== 导出 ====================

export type defaultApiType = typeof defaultApi;
export type { components } from './api.d';

// ==================== 使用示例 ====================

/*
// 方式1: 使用默认配置
import { defaultApi } from './default';
const result = await defaultApi.someMethod();

// 方式2: 自定义baseURL和headers
import { defaultApi, configureApiClient } from './default';
configureApiClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'value' }
});

// 方式3: 使用完全自定义的客户端
import axios from 'axios';
import { defaultApi, configureApiClient } from './default';

const customAxios = axios.create({
  baseURL: 'https://api.example.com'
});

// 添加拦截器
customAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

customAxios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) window.location.href = '/login';
    return Promise.reject(error);
  }
);

configureApiClient({
  customClient: {
    request: (config) => customAxios.request(config)
  }
});
*/

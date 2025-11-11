// 🤖 基于Swagger自动生成的API调用函数 - productApi
// ⚠️  请勿手动修改此文件
// 📅 生成时间: 2025-11-11T02:14:58.167Z

import type { components } from './api-generated';

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
 * productApi 服务API函数集合
 */
export const productApiApi = {
  /**
   * 获取商品列表
   * @description GET /products
   * @param page 页码
   * @param pageSize 每页数量
   * @param categoryId 商品分类ID
   * @param keyword 搜索关键词
   * @param status 商品状态
   * @param minPrice 最低价格
   * @param maxPrice 最高价格
   * @param sortBy 排序字段
   * @param sortOrder 排序方向
   * @returns Promise<components['schemas']['ProductListResponse']>
   */
  async getProductList(queryParams?: { page?: number; pageSize?: number; categoryId?: number; keyword?: string; status?: string; minPrice?: number; maxPrice?: number; sortBy?: string; sortOrder?: string }, config?: ApiRequestConfig): Promise<components['schemas']['ProductListResponse']> {
    const url = '/products';
    const requestConfig: ApiRequestConfig = {
      method: 'GET',
      url,
      params: queryParams,
      ...config,
    };

    return getApiClient().request<components['schemas']['ProductListResponse']>(requestConfig);
  },

  /**
   * 创建新商品
   * @description POST /products
   * @param data 
   * @returns Promise<components['schemas']['ProductResponse']>
   */
  async createProduct(data: components['schemas']['CreateProductRequest'], config?: ApiRequestConfig): Promise<components['schemas']['ProductResponse']> {
    const url = '/products';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['ProductResponse']>(requestConfig);
  },

  /**
   * 根据ID获取商品详情
   * @description GET /products/{productId}
   * @param productId 商品ID
   * @returns Promise<components['schemas']['ProductResponse']>
   */
  async getProductById(pathParams: { productId: number }, config?: ApiRequestConfig): Promise<components['schemas']['ProductResponse']> {
    const url = buildPath('/products/{productId}', pathParams);
    const requestConfig: ApiRequestConfig = {
      method: 'GET',
      url,
      ...config,
    };

    return getApiClient().request<components['schemas']['ProductResponse']>(requestConfig);
  },

  /**
   * 更新商品信息
   * @description PUT /products/{productId}
   * @param productId 
   * @param data 
   * @returns Promise<components['schemas']['ProductResponse']>
   */
  async updateProduct(pathParams: { productId: number }, data: components['schemas']['UpdateProductRequest'], config?: ApiRequestConfig): Promise<components['schemas']['ProductResponse']> {
    const url = buildPath('/products/{productId}', pathParams);
    const requestConfig: ApiRequestConfig = {
      method: 'PUT',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['ProductResponse']>(requestConfig);
  },

  /**
   * 删除商品
   * @description DELETE /products/{productId}
   * @param productId 
   * @returns Promise<Record<string, any>>
   */
  async deleteProduct(pathParams: { productId: number }, config?: ApiRequestConfig): Promise<Record<string, any>> {
    const url = buildPath('/products/{productId}', pathParams);
    const requestConfig: ApiRequestConfig = {
      method: 'DELETE',
      url,
      ...config,
    };

    return getApiClient().request<Record<string, any>>(requestConfig);
  },

  /**
   * 获取商品分类列表
   * @description GET /categories
   * @param parentId 父分类ID，获取子分类
   * @param level 分类层级
   * @returns Promise<Record<string, any>>
   */
  async getCategoryList(queryParams?: { parentId?: number; level?: number }, config?: ApiRequestConfig): Promise<Record<string, any>> {
    const url = '/categories';
    const requestConfig: ApiRequestConfig = {
      method: 'GET',
      url,
      params: queryParams,
      ...config,
    };

    return getApiClient().request<Record<string, any>>(requestConfig);
  },

  /**
   * 获取商品库存
   * @description GET /products/{productId}/inventory
   * @param productId 
   * @returns Promise<Record<string, any>>
   */
  async getProductInventory(pathParams: { productId: number }, config?: ApiRequestConfig): Promise<Record<string, any>> {
    const url = buildPath('/products/{productId}/inventory', pathParams);
    const requestConfig: ApiRequestConfig = {
      method: 'GET',
      url,
      ...config,
    };

    return getApiClient().request<Record<string, any>>(requestConfig);
  },

  /**
   * 更新商品库存
   * @description PUT /products/{productId}/inventory
   * @param productId 
   * @param data 
   * @returns Promise<Record<string, any>>
   */
  async updateProductInventory(pathParams: { productId: number }, data: components['schemas']['UpdateInventoryRequest'], config?: ApiRequestConfig): Promise<Record<string, any>> {
    const url = buildPath('/products/{productId}/inventory', pathParams);
    const requestConfig: ApiRequestConfig = {
      method: 'PUT',
      url,
      data,
      ...config,
    };

    return getApiClient().request<Record<string, any>>(requestConfig);
  },

};

// ==================== 导出 ====================

export type productApiApiType = typeof productApiApi;
export type { components } from './api-generated';

// ==================== 使用示例 ====================

/*
// 方式1: 使用默认配置
import { productApiApi } from './productApi';
const result = await productApiApi.someMethod();

// 方式2: 自定义baseURL和headers
import { productApiApi, configureApiClient } from './productApi';
configureApiClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'value' }
});

// 方式3: 使用完全自定义的客户端
import axios from 'axios';
import { productApiApi, configureApiClient } from './productApi';

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

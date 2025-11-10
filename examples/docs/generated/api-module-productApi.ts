// 🤖 基于Swagger生成的API调用模块 - productApi
// ⚠️  请勿手动修改此文件

import axios, { AxiosResponse } from 'axios';

// 通用请求配置接口
interface ApiRequestConfig {
  url?: string;
  method?: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  timeout?: number;
  [key: string]: any;
}
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
 * productApi 服务API接口
 */
export const productApiApi = {
  /**
   * 获取商品列表
   * @description GET /products
   * @returns Promise<components['schemas']['ProductListResponse']>
   */
  async getProductList(params?: any, config?: ApiRequestConfig): Promise<components['schemas']['ProductListResponse']> {
    const url = buildUrl(API_ENDPOINTS.getProductList.path, params);
    return apiClient.get(url, { params, ...config });
  },

  /**
   * 创建新商品
   * @description POST /products
   * @returns Promise<any>
   */
  async createProduct(data?: components['schemas']['CreateProductRequest'], params?: any, config?: ApiRequestConfig): Promise<any> {
    const url = buildUrl(API_ENDPOINTS.createProduct.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * 根据ID获取商品详情
   * @description GET /products/{productId}
   * @returns Promise<components['schemas']['ProductResponse']>
   */
  async getProductById(params?: any, config?: ApiRequestConfig): Promise<components['schemas']['ProductResponse']> {
    const url = buildUrl(API_ENDPOINTS.getProductById.path, params);
    return apiClient.get(url, { params, ...config });
  },

  /**
   * 更新商品信息
   * @description PUT /products/{productId}
   * @returns Promise<components['schemas']['ProductResponse']>
   */
  async updateProduct(data?: components['schemas']['UpdateProductRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['ProductResponse']> {
    const url = buildUrl(API_ENDPOINTS.updateProduct.path, params);
    return apiClient.put(url, data, { ...config });
  },

  /**
   * 删除商品
   * @description DELETE /products/{productId}
   * @returns Promise<any>
   */
  async deleteProduct(params?: any, config?: ApiRequestConfig): Promise<any> {
    const url = buildUrl(API_ENDPOINTS.deleteProduct.path, params);
    return apiClient.delete(url, { params, ...config });
  },

  /**
   * 获取商品分类列表
   * @description GET /categories
   * @returns Promise<any>
   */
  async getCategoryList(params?: any, config?: ApiRequestConfig): Promise<any> {
    const url = buildUrl(API_ENDPOINTS.getCategoryList.path, params);
    return apiClient.get(url, { params, ...config });
  },

  /**
   * 获取商品库存
   * @description GET /products/{productId}/inventory
   * @returns Promise<any>
   */
  async getProductInventory(params?: any, config?: ApiRequestConfig): Promise<any> {
    const url = buildUrl(API_ENDPOINTS.getProductInventory.path, params);
    return apiClient.get(url, { params, ...config });
  },

  /**
   * 更新商品库存
   * @description PUT /products/{productId}/inventory
   * @returns Promise<any>
   */
  async updateProductInventory(data?: components['schemas']['UpdateInventoryRequest'], params?: any, config?: ApiRequestConfig): Promise<any> {
    const url = buildUrl(API_ENDPOINTS.updateProductInventory.path, params);
    return apiClient.put(url, data, { ...config });
  },

};

// 导出服务类型
export type productApiApiType = typeof productApiApi;

// 导出axios实例供高级使用
export { apiClient };

// 导出常用类型
export type { components } from './api-generated';

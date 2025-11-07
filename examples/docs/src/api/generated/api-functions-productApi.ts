// 🤖 基于Swagger自动生成的API调用函数 - productApi
// ⚠️  请勿手动修改此文件
// 📅 生成时间: 2025-11-07T07:53:40.691Z

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
  async getProductList(queryParams?: { page?: number; pageSize?: number; categoryId?: number; keyword?: string; status?: string; minPrice?: number; maxPrice?: number; sortBy?: string; sortOrder?: string }, config?: AxiosRequestConfig): Promise<components['schemas']['ProductListResponse']> {
    const url = '/products';
    const requestConfig: AxiosRequestConfig = {
      method: 'GET',
      url,
      params: queryParams,
      ...config,
    };

    return apiClient.request<components['schemas']['ProductListResponse']>(requestConfig);
  },

  /**
   * 创建新商品
   * @description POST /products
   * @param data 
   * @returns Promise<components['schemas']['ProductResponse']>
   */
  async createProduct(data: components['schemas']['CreateProductRequest'], config?: AxiosRequestConfig): Promise<components['schemas']['ProductResponse']> {
    const url = '/products';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<components['schemas']['ProductResponse']>(requestConfig);
  },

  /**
   * 根据ID获取商品详情
   * @description GET /products/{productId}
   * @param productId 商品ID
   * @returns Promise<components['schemas']['ProductResponse']>
   */
  async getProductById(pathParams: { productId: number }, config?: AxiosRequestConfig): Promise<components['schemas']['ProductResponse']> {
    const url = buildPath('/products/{productId}', pathParams);
    const requestConfig: AxiosRequestConfig = {
      method: 'GET',
      url,
      ...config,
    };

    return apiClient.request<components['schemas']['ProductResponse']>(requestConfig);
  },

  /**
   * 更新商品信息
   * @description PUT /products/{productId}
   * @param productId 
   * @param data 
   * @returns Promise<components['schemas']['ProductResponse']>
   */
  async updateProduct(pathParams: { productId: number }, data: components['schemas']['UpdateProductRequest'], config?: AxiosRequestConfig): Promise<components['schemas']['ProductResponse']> {
    const url = buildPath('/products/{productId}', pathParams);
    const requestConfig: AxiosRequestConfig = {
      method: 'PUT',
      url,
      data,
      ...config,
    };

    return apiClient.request<components['schemas']['ProductResponse']>(requestConfig);
  },

  /**
   * 删除商品
   * @description DELETE /products/{productId}
   * @param productId 
   * @returns Promise<Record<string, any>>
   */
  async deleteProduct(pathParams: { productId: number }, config?: AxiosRequestConfig): Promise<Record<string, any>> {
    const url = buildPath('/products/{productId}', pathParams);
    const requestConfig: AxiosRequestConfig = {
      method: 'DELETE',
      url,
      ...config,
    };

    return apiClient.request<Record<string, any>>(requestConfig);
  },

  /**
   * 获取商品分类列表
   * @description GET /categories
   * @param parentId 父分类ID，获取子分类
   * @param level 分类层级
   * @returns Promise<Record<string, any>>
   */
  async getCategoryList(queryParams?: { parentId?: number; level?: number }, config?: AxiosRequestConfig): Promise<Record<string, any>> {
    const url = '/categories';
    const requestConfig: AxiosRequestConfig = {
      method: 'GET',
      url,
      params: queryParams,
      ...config,
    };

    return apiClient.request<Record<string, any>>(requestConfig);
  },

  /**
   * 获取商品库存
   * @description GET /products/{productId}/inventory
   * @param productId 
   * @returns Promise<Record<string, any>>
   */
  async getProductInventory(pathParams: { productId: number }, config?: AxiosRequestConfig): Promise<Record<string, any>> {
    const url = buildPath('/products/{productId}/inventory', pathParams);
    const requestConfig: AxiosRequestConfig = {
      method: 'GET',
      url,
      ...config,
    };

    return apiClient.request<Record<string, any>>(requestConfig);
  },

  /**
   * 更新商品库存
   * @description PUT /products/{productId}/inventory
   * @param productId 
   * @param data 
   * @returns Promise<Record<string, any>>
   */
  async updateProductInventory(pathParams: { productId: number }, data: components['schemas']['UpdateInventoryRequest'], config?: AxiosRequestConfig): Promise<Record<string, any>> {
    const url = buildPath('/products/{productId}/inventory', pathParams);
    const requestConfig: AxiosRequestConfig = {
      method: 'PUT',
      url,
      data,
      ...config,
    };

    return apiClient.request<Record<string, any>>(requestConfig);
  },

};

// 导出类型定义
export type productApiApiType = typeof productApiApi;

// 导出API客户端实例（供高级使用）
export { apiClient };

// 导出常用类型
export type { components } from './api-generated';

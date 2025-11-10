// 🤖 基于Swagger自动生成的API调用函数 - productApi
// ⚠️  请勿手动修改此文件
// 📅 生成时间: 2025-11-10T08:59:31.755Z

import type { components } from './api-generated';

// ==================== 自定义Request支持 ====================

/**
 * 通用请求配置接口
 */
export interface ApiRequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  [key: string]: any;
}

/**
 * 请求客户端接口 - 支持任何HTTP客户端实现
 */
export interface RequestClient {
  request<T = any>(config: ApiRequestConfig): Promise<T>;
}

/**
 * 请求中间件接口
 */
export interface RequestMiddleware {
  onRequest?: (config: ApiRequestConfig) => ApiRequestConfig | Promise<ApiRequestConfig>;
  onResponse?: <T>(response: T) => T | Promise<T>;
  onError?: (error: any) => Promise<any>;
}

/**
 * API客户端配置
 */
export interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  middlewares?: RequestMiddleware[];
  customClient?: RequestClient;
}

// ==================== 默认实现 (Axios) ====================

// 默认使用axios，但支持替换为任何HTTP客户端
let defaultAxios: any;
try {
  defaultAxios = require('axios');
} catch (e) {
  console.warn('axios not found, please install axios or provide custom request client');
}

/**
 * 默认的Axios适配器
 */
class AxiosRequestClient implements RequestClient {
  private client: any;
  
  constructor(config: ApiClientConfig) {
    if (!defaultAxios) {
      throw new Error('axios is required for default client. Install axios or provide custom client.');
    }
    
    this.client = defaultAxios.create({
      baseURL: config.baseURL || process.env.REACT_APP_API_BASE_URL || process.env.VUE_APP_API_BASE_URL || '/api',
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    // 应用中间件
    this.setupMiddlewares(config.middlewares || []);
  }

  private setupMiddlewares(middlewares: RequestMiddleware[]) {
    // 请求拦截器
    this.client.interceptors.request.use(
      async (config: any) => {
        let processedConfig = config;
        
        // 应用所有请求中间件
        for (const middleware of middlewares) {
          if (middleware.onRequest) {
            processedConfig = await middleware.onRequest(processedConfig);
          }
        }
        
        return processedConfig;
      },
      async (error: any) => {
        // 应用错误中间件
        for (const middleware of middlewares) {
          if (middleware.onError) {
            try {
              return await middleware.onError(error);
            } catch (e) {
              // 继续到下一个中间件
            }
          }
        }
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.client.interceptors.response.use(
      async (response: any) => {
        let processedResponse = response.data;
        
        // 应用所有响应中间件
        for (const middleware of middlewares) {
          if (middleware.onResponse) {
            processedResponse = await middleware.onResponse(processedResponse);
          }
        }
        
        return processedResponse;
      },
      async (error: any) => {
        // 应用错误中间件
        for (const middleware of middlewares) {
          if (middleware.onError) {
            try {
              return await middleware.onError(error);
            } catch (e) {
              // 继续到下一个中间件
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async request<T = any>(config: ApiRequestConfig): Promise<T> {
    return this.client.request(config);
  }
}

// ==================== 内置中间件 ====================

/**
 * 认证中间件
 */
export const authMiddleware: RequestMiddleware = {
  onRequest: (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
};

/**
 * 错误处理中间件
 */
export const errorHandlingMiddleware: RequestMiddleware = {
  onError: (error) => {
    console.error('API请求错误:', error);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  },
};

/**
 * 日志中间件
 */
export const loggingMiddleware: RequestMiddleware = {
  onRequest: (config) => {
    console.log(`[API Request] ${config.method} ${config.url}`, config);
    return config;
  },
  onResponse: (response) => {
    console.log('[API Response]', response);
    return response;
  },
};

// ==================== API客户端管理 ====================

let globalApiClient: RequestClient;

/**
 * 配置全局API客户端
 */
export function configureApiClient(config: ApiClientConfig = {}): void {
  if (config.customClient) {
    // 使用用户提供的自定义客户端
    globalApiClient = config.customClient;
  } else {
    // 使用默认的Axios客户端
    globalApiClient = new AxiosRequestClient({
      ...config,
      middlewares: [
        authMiddleware,
        errorHandlingMiddleware,
        ...(config.middlewares || [])
      ]
    });
  }
}

/**
 * 获取当前API客户端
 */
export function getApiClient(): RequestClient {
  if (!globalApiClient) {
    // 使用默认配置初始化
    configureApiClient();
  }
  return globalApiClient;
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

// ==================== 自动初始化 ====================

// 自动使用默认配置初始化（用户也可以重新配置）
if (typeof window !== 'undefined' || typeof global !== 'undefined') {
  try {
    configureApiClient();
  } catch (e) {
    console.warn('Failed to initialize default API client:', e.message);
  }
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

// 导出类型定义
export type productApiApiType = typeof productApiApi;

// 导出常用类型
export type { components } from './api-generated';

// ==================== 使用示例 ====================

/*
// 方式1: 使用默认配置（自动初始化）
import { productApiApi } from './productApi';

// 方式2: 自定义配置
import { productApiApi, configureApiClient } from './productApi';
configureApiClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  middlewares: [customMiddleware]
});

// 方式3: 使用完全自定义的request客户端
import { productApiApi, configureApiClient } from './productApi';
import { myCustomClient } from './my-request-client';
configureApiClient({
  customClient: myCustomClient
});
*/

// 🤖 基于Swagger自动生成的API调用函数 - userApi
// ⚠️  请勿手动修改此文件
// 📅 生成时间: 2025-11-10T08:59:31.446Z

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
 * userApi 服务API函数集合
 */
export const userApiApi = {
  /**
   * paymentMgrServiceGetAppSetting
   * @description POST /elderSvrBackend/app/v1/setting/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetAppSettingResponse']>
   */
  async paymentMgrServiceGetAppSetting(data: components['schemas']['api.elder.backend.v1.GetAppSettingRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetAppSettingResponse']> {
    const url = '/elderSvrBackend/app/v1/setting/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.GetAppSettingResponse']>(requestConfig);
  },

  /**
   * iamServiceGetWebCosTempKey
   * @description POST /elderSvrBackend/common/v1/getWebCosTempKey
   * @param data 
   * @returns Promise<components['schemas']['system.v1.GetWebCosTempKeyReply']>
   */
  async iamServiceGetWebCosTempKey(data: components['schemas']['system.v1.GetWebCosTempKeyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetWebCosTempKeyReply']> {
    const url = '/elderSvrBackend/common/v1/getWebCosTempKey';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.GetWebCosTempKeyReply']>(requestConfig);
  },

  /**
   * dashboardServiceGetCommunityCredit
   * @description POST /elderSvrBackend/dashboard/v1/community/credit/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetCommunityCreditResponse']>
   */
  async dashboardServiceGetCommunityCredit(data: components['schemas']['api.elder.backend.v1.GetCommunityCreditRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetCommunityCreditResponse']> {
    const url = '/elderSvrBackend/dashboard/v1/community/credit/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.GetCommunityCreditResponse']>(requestConfig);
  },

  /**
   * dashboardServiceGetHelpSummary
   * @description POST /elderSvrBackend/dashboard/v1/help/summary
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetHelpSummaryResponse']>
   */
  async dashboardServiceGetHelpSummary(data: components['schemas']['api.elder.backend.v1.GetHelpSummaryRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetHelpSummaryResponse']> {
    const url = '/elderSvrBackend/dashboard/v1/help/summary';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.GetHelpSummaryResponse']>(requestConfig);
  },

  /**
   * paymentMgrServiceGetDeveloperSettings
   * @description POST /elderSvrBackend/developer/v1/settings/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetDeveloperSettingsResponse']>
   */
  async paymentMgrServiceGetDeveloperSettings(data: components['schemas']['api.elder.backend.v1.GetDeveloperSettingsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetDeveloperSettingsResponse']> {
    const url = '/elderSvrBackend/developer/v1/settings/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.GetDeveloperSettingsResponse']>(requestConfig);
  },

  /**
   * paymentMgrServiceUpdateDeveloperSettings
   * @description POST /elderSvrBackend/developer/v1/settings/update
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.UpdateDeveloperSettingsResponse']>
   */
  async paymentMgrServiceUpdateDeveloperSettings(data: components['schemas']['api.elder.backend.v1.UpdateDeveloperSettingsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.UpdateDeveloperSettingsResponse']> {
    const url = '/elderSvrBackend/developer/v1/settings/update';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.UpdateDeveloperSettingsResponse']>(requestConfig);
  },

  /**
   * serviceTypeServiceListCategories
   * @description POST /elderSvrBackend/help/v1/category/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.ListCategoriesResponse']>
   */
  async serviceTypeServiceListCategories(data: components['schemas']['api.elder.help.v1.ListCategoriesRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListCategoriesResponse']> {
    const url = '/elderSvrBackend/help/v1/category/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.ListCategoriesResponse']>(requestConfig);
  },

  /**
   * iamServiceGetUserPermissions
   * @description POST /elderSvrBackend/login/v1/get_permission
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetUserPermissionsResponse']>
   */
  async iamServiceGetUserPermissions(data: components['schemas']['api.elder.backend.v1.GetUserPermissionsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetUserPermissionsResponse']> {
    const url = '/elderSvrBackend/login/v1/get_permission';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.GetUserPermissionsResponse']>(requestConfig);
  },

  /**
   * iamServiceLoginByPhone
   * @description POST /elderSvrBackend/login/v1/loginByPhone
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.LoginByPhoneResponse']>
   */
  async iamServiceLoginByPhone(data: components['schemas']['api.elder.backend.v1.LoginByPhoneRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.LoginByPhoneResponse']> {
    const url = '/elderSvrBackend/login/v1/loginByPhone';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.LoginByPhoneResponse']>(requestConfig);
  },

  /**
   * iamServiceLogout
   * @description POST /elderSvrBackend/login/v1/logout
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.LogoutResponse']>
   */
  async iamServiceLogout(data: components['schemas']['api.elder.backend.v1.LogoutRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.LogoutResponse']> {
    const url = '/elderSvrBackend/login/v1/logout';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.LogoutResponse']>(requestConfig);
  },

  /**
   * iamServiceSendLoginCode
   * @description POST /elderSvrBackend/login/v1/sendCode
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.SendLoginCodeResponse']>
   */
  async iamServiceSendLoginCode(data: components['schemas']['api.elder.backend.v1.SendLoginCodeRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.SendLoginCodeResponse']> {
    const url = '/elderSvrBackend/login/v1/sendCode';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.SendLoginCodeResponse']>(requestConfig);
  },

  /**
   * iamServiceUpdateOrgUser
   * @description POST /elderSvrBackend/org_user/v1/update
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.UpdateOrgUserResponse']>
   */
  async iamServiceUpdateOrgUser(data: components['schemas']['api.elder.backend.v1.UpdateOrgUserRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.UpdateOrgUserResponse']> {
    const url = '/elderSvrBackend/org_user/v1/update';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.UpdateOrgUserResponse']>(requestConfig);
  },

  /**
   * paymentMgrServiceGetBanks
   * @description POST /elderSvrBackend/payment/v1/banks/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetBanksResponse']>
   */
  async paymentMgrServiceGetBanks(data: components['schemas']['api.elder.backend.v1.GetBanksRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetBanksResponse']> {
    const url = '/elderSvrBackend/payment/v1/banks/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.GetBanksResponse']>(requestConfig);
  },

  /**
   * paymentMgrServiceApplyEcommercement
   * @description POST /elderSvrBackend/payment/v1/ecommerce/apply
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ApplyEcommercementResponse']>
   */
  async paymentMgrServiceApplyEcommercement(data: components['schemas']['api.elder.backend.v1.ApplyEcommercementRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ApplyEcommercementResponse']> {
    const url = '/elderSvrBackend/payment/v1/ecommerce/apply';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ApplyEcommercementResponse']>(requestConfig);
  },

  /**
   * paymentMgrServiceGetEcommerceApplyment
   * @description POST /elderSvrBackend/payment/v1/ecommerce/applyment/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetEcommerceApplymentResponse']>
   */
  async paymentMgrServiceGetEcommerceApplyment(data: components['schemas']['api.elder.backend.v1.GetEcommerceApplymentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetEcommerceApplymentResponse']> {
    const url = '/elderSvrBackend/payment/v1/ecommerce/applyment/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.GetEcommerceApplymentResponse']>(requestConfig);
  },

  /**
   * paymentMgrServiceGetEcommerceApplymentStatus
   * @description POST /elderSvrBackend/payment/v1/ecommerce/applyment/status/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetEcommerceApplymentStatusResponse']>
   */
  async paymentMgrServiceGetEcommerceApplymentStatus(data: components['schemas']['api.elder.backend.v1.GetEcommerceApplymentStatusRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetEcommerceApplymentStatusResponse']> {
    const url = '/elderSvrBackend/payment/v1/ecommerce/applyment/status/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.GetEcommerceApplymentStatusResponse']>(requestConfig);
  },

  /**
   * paymentMgrServiceGetStaticData
   * @description POST /elderSvrBackend/payment/v1/static/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetStaticDataResponse']>
   */
  async paymentMgrServiceGetStaticData(data: components['schemas']['api.elder.backend.v1.GetStaticDataRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetStaticDataResponse']> {
    const url = '/elderSvrBackend/payment/v1/static/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.GetStaticDataResponse']>(requestConfig);
  },

  /**
   * residentAuditServiceApproveResidentApply
   * @description POST /elderSvrBackend/resident/v1/apply/approve
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ApproveResidentApplyResponse']>
   */
  async residentAuditServiceApproveResidentApply(data: components['schemas']['api.elder.backend.v1.ApproveResidentApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ApproveResidentApplyResponse']> {
    const url = '/elderSvrBackend/resident/v1/apply/approve';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ApproveResidentApplyResponse']>(requestConfig);
  },

  /**
   * residentAuditServiceGetResidentApply
   * @description POST /elderSvrBackend/resident/v1/apply/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetResidentApplyResponse']>
   */
  async residentAuditServiceGetResidentApply(data: components['schemas']['api.elder.backend.v1.GetResidentApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetResidentApplyResponse']> {
    const url = '/elderSvrBackend/resident/v1/apply/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.GetResidentApplyResponse']>(requestConfig);
  },

  /**
   * residentAuditServiceListResidentApply
   * @description POST /elderSvrBackend/resident/v1/apply/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListResidentApplyResponse']>
   */
  async residentAuditServiceListResidentApply(data: components['schemas']['api.elder.backend.v1.ListResidentApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListResidentApplyResponse']> {
    const url = '/elderSvrBackend/resident/v1/apply/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ListResidentApplyResponse']>(requestConfig);
  },

  /**
   * residentAuditServiceRefuseResidentApply
   * @description POST /elderSvrBackend/resident/v1/apply/refuse
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.RefuseResidentApplyResponse']>
   */
  async residentAuditServiceRefuseResidentApply(data: components['schemas']['api.elder.backend.v1.RefuseResidentApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.RefuseResidentApplyResponse']> {
    const url = '/elderSvrBackend/resident/v1/apply/refuse';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.RefuseResidentApplyResponse']>(requestConfig);
  },

  /**
   * serviceTypeServiceListHelpServiceRecords
   * @description POST /elderSvrBackend/service/records
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListHelpServiceRecordsResponse']>
   */
  async serviceTypeServiceListHelpServiceRecords(data: components['schemas']['api.elder.backend.v1.ListHelpServiceRecordsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListHelpServiceRecordsResponse']> {
    const url = '/elderSvrBackend/service/records';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ListHelpServiceRecordsResponse']>(requestConfig);
  },

  /**
   * serviceTypeServiceDeleteAreaCommunity
   * @description POST /elderSvrBackend/serviceType/v1/areas/delete
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.DeleteAreaResponse']>
   */
  async serviceTypeServiceDeleteAreaCommunity(data: components['schemas']['api.elder.backend.v1.DeleteAreaRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.DeleteAreaResponse']> {
    const url = '/elderSvrBackend/serviceType/v1/areas/delete';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.DeleteAreaResponse']>(requestConfig);
  },

  /**
   * serviceTypeServiceGetAreaCommunity
   * @description POST /elderSvrBackend/serviceType/v1/areas/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListAreasResponse']>
   */
  async serviceTypeServiceGetAreaCommunity(data: components['schemas']['api.elder.backend.v1.ListAreasRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListAreasResponse']> {
    const url = '/elderSvrBackend/serviceType/v1/areas/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ListAreasResponse']>(requestConfig);
  },

  /**
   * serviceTypeServiceSelectAreaCommunity
   * @description POST /elderSvrBackend/serviceType/v1/areas/select
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.SelectAreaResponse']>
   */
  async serviceTypeServiceSelectAreaCommunity(data: components['schemas']['api.elder.backend.v1.SelectAreaRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.SelectAreaResponse']> {
    const url = '/elderSvrBackend/serviceType/v1/areas/select';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.SelectAreaResponse']>(requestConfig);
  },

  /**
   * serviceTypeServiceUpdateServiceTypeAuditStatus
   * @description POST /elderSvrBackend/serviceType/v1/audit/status/update
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ServiceTypeAuditStatusResponse']>
   */
  async serviceTypeServiceUpdateServiceTypeAuditStatus(data: components['schemas']['api.elder.backend.v1.ServiceTypeAuditStatusRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ServiceTypeAuditStatusResponse']> {
    const url = '/elderSvrBackend/serviceType/v1/audit/status/update';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ServiceTypeAuditStatusResponse']>(requestConfig);
  },

  /**
   * serviceTypeServiceListServiceTypeAudits
   * @description POST /elderSvrBackend/serviceType/v1/audits/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListServiceTypeAuditsResponse']>
   */
  async serviceTypeServiceListServiceTypeAudits(data: components['schemas']['api.elder.backend.v1.ListServiceTypeAuditsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListServiceTypeAuditsResponse']> {
    const url = '/elderSvrBackend/serviceType/v1/audits/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ListServiceTypeAuditsResponse']>(requestConfig);
  },

  /**
   * serviceTypeServiceGetAllCategories
   * @description POST /elderSvrBackend/serviceType/v1/categories
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetAllCategoriesResponse']>
   */
  async serviceTypeServiceGetAllCategories(data: components['schemas']['api.elder.backend.v1.GetAllCategoriesRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetAllCategoriesResponse']> {
    const url = '/elderSvrBackend/serviceType/v1/categories';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.GetAllCategoriesResponse']>(requestConfig);
  },

  /**
   * serviceTypeServiceDeleteServiceType
   * @description POST /elderSvrBackend/serviceType/v1/delete
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.DeleteServiceTypeResponse']>
   */
  async serviceTypeServiceDeleteServiceType(data: components['schemas']['api.elder.backend.v1.DeleteServiceTypeRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.DeleteServiceTypeResponse']> {
    const url = '/elderSvrBackend/serviceType/v1/delete';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.DeleteServiceTypeResponse']>(requestConfig);
  },

  /**
   * serviceTypeServiceFilterArea
   * @description POST /elderSvrBackend/serviceType/v1/filterArea
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.FilterAreaResponse']>
   */
  async serviceTypeServiceFilterArea(data: components['schemas']['api.elder.backend.v1.FilterAreaRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.FilterAreaResponse']> {
    const url = '/elderSvrBackend/serviceType/v1/filterArea';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.FilterAreaResponse']>(requestConfig);
  },

  /**
   * serviceTypeServiceListRecommendationTags
   * @description POST /elderSvrBackend/serviceType/v1/recommendation/tags/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListRecommendationTagsResponse']>
   */
  async serviceTypeServiceListRecommendationTags(data: components['schemas']['api.elder.backend.v1.ListRecommendationTagsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListRecommendationTagsResponse']> {
    const url = '/elderSvrBackend/serviceType/v1/recommendation/tags/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ListRecommendationTagsResponse']>(requestConfig);
  },

  /**
   * serviceTypeServiceUpdateServiceTypeRecommendationTags
   * @description POST /elderSvrBackend/serviceType/v1/recommendation/tags/update
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.UpdateServiceTypeRecommendationTagsResponse']>
   */
  async serviceTypeServiceUpdateServiceTypeRecommendationTags(data: components['schemas']['api.elder.backend.v1.UpdateServiceTypeRecommendationTagsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.UpdateServiceTypeRecommendationTagsResponse']> {
    const url = '/elderSvrBackend/serviceType/v1/recommendation/tags/update';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.UpdateServiceTypeRecommendationTagsResponse']>(requestConfig);
  },

  /**
   * serviceTypeServiceSortServiceAuditType
   * @description POST /elderSvrBackend/serviceType/v1/sort
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.SortServiceAuditTypeResponse']>
   */
  async serviceTypeServiceSortServiceAuditType(data: components['schemas']['api.elder.backend.v1.SortServiceAuditTypeRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.SortServiceAuditTypeResponse']> {
    const url = '/elderSvrBackend/serviceType/v1/sort';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.SortServiceAuditTypeResponse']>(requestConfig);
  },

  /**
   * serviceTypeServiceListServiceTypeSubmissions
   * @description POST /elderSvrBackend/serviceType/v1/submissions/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListServiceTypeSubmissionsResponse']>
   */
  async serviceTypeServiceListServiceTypeSubmissions(data: components['schemas']['api.elder.backend.v1.ListServiceTypeSubmissionsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListServiceTypeSubmissionsResponse']> {
    const url = '/elderSvrBackend/serviceType/v1/submissions/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ListServiceTypeSubmissionsResponse']>(requestConfig);
  },

  /**
   * serviceTypeServiceSubmitServiceType
   * @description POST /elderSvrBackend/serviceType/v1/submit
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ServiceTypeSubmissionResponse']>
   */
  async serviceTypeServiceSubmitServiceType(data: components['schemas']['api.elder.backend.v1.ServiceTypeSubmissionRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ServiceTypeSubmissionResponse']> {
    const url = '/elderSvrBackend/serviceType/v1/submit';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ServiceTypeSubmissionResponse']>(requestConfig);
  },

  /**
   * iamServiceCheckStaffApply
   * @description POST /elderSvrBackend/staff/v1/apply/check
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.CheckStaffApplyResponse']>
   */
  async iamServiceCheckStaffApply(data: components['schemas']['api.elder.backend.v1.CheckStaffApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.CheckStaffApplyResponse']> {
    const url = '/elderSvrBackend/staff/v1/apply/check';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.CheckStaffApplyResponse']>(requestConfig);
  },

  /**
   * iamServiceImportStaffByCosUrl
   * @description POST /elderSvrBackend/staff/v1/import_by_cos
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ImportStaffByCosUrlResponse']>
   */
  async iamServiceImportStaffByCosUrl(data: components['schemas']['api.elder.backend.v1.ImportStaffByCosUrlRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ImportStaffByCosUrlResponse']> {
    const url = '/elderSvrBackend/staff/v1/import_by_cos';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ImportStaffByCosUrlResponse']>(requestConfig);
  },

  /**
   * iamServiceListImportErrRecords
   * @description POST /elderSvrBackend/staff/v1/import_err_records
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListImportErrRecordsResponse']>
   */
  async iamServiceListImportErrRecords(data: components['schemas']['api.elder.backend.v1.ListImportErrRecordsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListImportErrRecordsResponse']> {
    const url = '/elderSvrBackend/staff/v1/import_err_records';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ListImportErrRecordsResponse']>(requestConfig);
  },

  /**
   * iamServiceApplyStaffWithInviteLink
   * @description POST /elderSvrBackend/staff/v1/join/apply
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ApplyStaffWithInviteLinkResponse']>
   */
  async iamServiceApplyStaffWithInviteLink(data: components['schemas']['api.elder.backend.v1.ApplyStaffWithInviteLinkRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ApplyStaffWithInviteLinkResponse']> {
    const url = '/elderSvrBackend/staff/v1/join/apply';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ApplyStaffWithInviteLinkResponse']>(requestConfig);
  },

  /**
   * iamServiceApproveStaffApply
   * @description POST /elderSvrBackend/staff/v1/join/approve
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ApproveStaffApplyResponse']>
   */
  async iamServiceApproveStaffApply(data: components['schemas']['api.elder.backend.v1.ApproveStaffApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ApproveStaffApplyResponse']> {
    const url = '/elderSvrBackend/staff/v1/join/approve';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ApproveStaffApplyResponse']>(requestConfig);
  },

  /**
   * iamServiceListStaffApply
   * @description POST /elderSvrBackend/staff/v1/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListStaffApplyResponse']>
   */
  async iamServiceListStaffApply(data: components['schemas']['api.elder.backend.v1.ListStaffApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListStaffApplyResponse']> {
    const url = '/elderSvrBackend/staff/v1/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ListStaffApplyResponse']>(requestConfig);
  },

  /**
   * iamServiceCheckIfMiniUser
   * @description POST /elderSvrBackend/staff/v1/mini_user/check
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.CheckIfMiniUserResponse']>
   */
  async iamServiceCheckIfMiniUser(data: components['schemas']['api.elder.backend.v1.CheckIfMiniUserRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.CheckIfMiniUserResponse']> {
    const url = '/elderSvrBackend/staff/v1/mini_user/check';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.CheckIfMiniUserResponse']>(requestConfig);
  },

  /**
   * iamServiceReImportOrganizationUsers
   * @description POST /elderSvrBackend/staff/v1/re_import
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ReImportOrganizationUsersResponse']>
   */
  async iamServiceReImportOrganizationUsers(data: components['schemas']['api.elder.backend.v1.ReImportOrganizationUsersRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ReImportOrganizationUsersResponse']> {
    const url = '/elderSvrBackend/staff/v1/re_import';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ReImportOrganizationUsersResponse']>(requestConfig);
  },

  /**
   * iamServiceSendJoinOrgSms
   * @description POST /elderSvrBackend/staff/v1/send_join_sms
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.SendJoinOrgSmsResponse']>
   */
  async iamServiceSendJoinOrgSms(data: components['schemas']['api.elder.backend.v1.SendJoinOrgSmsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.SendJoinOrgSmsResponse']> {
    const url = '/elderSvrBackend/staff/v1/send_join_sms';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.SendJoinOrgSmsResponse']>(requestConfig);
  },

  /**
   * iamServiceBatchDeleteUser
   * @description POST /elderSvrBackend/user/v1/batch_delete
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.DeleteUserResponse']>
   */
  async iamServiceBatchDeleteUser(data: components['schemas']['api.elder.backend.v1.BatchDeleteUserRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.DeleteUserResponse']> {
    const url = '/elderSvrBackend/user/v1/batch_delete';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.DeleteUserResponse']>(requestConfig);
  },

  /**
   * iamServiceDeleteUser
   * @description POST /elderSvrBackend/user/v1/delete
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.DeleteUserResponse']>
   */
  async iamServiceDeleteUser(data: components['schemas']['api.elder.backend.v1.DeleteUserRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.DeleteUserResponse']> {
    const url = '/elderSvrBackend/user/v1/delete';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.DeleteUserResponse']>(requestConfig);
  },

  /**
   * iamServiceImportOrganizationUsers
   * @description POST /elderSvrBackend/user/v1/import
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ImportOrganizationUsersResponse']>
   */
  async iamServiceImportOrganizationUsers(data: components['schemas']['api.elder.backend.v1.ImportOrganizationUsersRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ImportOrganizationUsersResponse']> {
    const url = '/elderSvrBackend/user/v1/import';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ImportOrganizationUsersResponse']>(requestConfig);
  },

  /**
   * iamServiceRealName
   * @description POST /elderSvrBackend/user/v1/realName
   * @param data 
   * @returns Promise<components['schemas']['system.v1.RealNameReply']>
   */
  async iamServiceRealName(data: components['schemas']['system.v1.RealNameRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.RealNameReply']> {
    const url = '/elderSvrBackend/user/v1/realName';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.RealNameReply']>(requestConfig);
  },

  /**
   * iamServiceSearchUserByPhone
   * @description POST /elderSvrBackend/user/v1/search_by_phone
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.SearchUserByPhoneResponse']>
   */
  async iamServiceSearchUserByPhone(data: components['schemas']['api.elder.backend.v1.SearchUserByPhoneRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.SearchUserByPhoneResponse']> {
    const url = '/elderSvrBackend/user/v1/search_by_phone';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.SearchUserByPhoneResponse']>(requestConfig);
  },

  /**
   * iamServiceUpdateUser
   * @description POST /elderSvrBackend/user/v1/update
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.UpdateUserResponse']>
   */
  async iamServiceUpdateUser(data: components['schemas']['api.elder.backend.v1.UpdateUserRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.UpdateUserResponse']> {
    const url = '/elderSvrBackend/user/v1/update';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.UpdateUserResponse']>(requestConfig);
  },

  /**
   * iamServiceListOrgUser
   * @description POST /elderSvrBackend/users/v1/get_org_user
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListOrgUserResponse']>
   */
  async iamServiceListOrgUser(data: components['schemas']['api.elder.backend.v1.ListOrgUserRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListOrgUserResponse']> {
    const url = '/elderSvrBackend/users/v1/get_org_user';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ListOrgUserResponse']>(requestConfig);
  },

  /**
   * organizationServiceApplyOrganization
   * @description POST /elderSvrBackend/v1/organization/apply
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ApplyOrganizationResponse']>
   */
  async organizationServiceApplyOrganization(data: components['schemas']['api.elder.backend.v1.CreateOrganizationRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ApplyOrganizationResponse']> {
    const url = '/elderSvrBackend/v1/organization/apply';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ApplyOrganizationResponse']>(requestConfig);
  },

  /**
   * organizationServiceApproveOrganizationApply
   * @description POST /elderSvrBackend/v1/organization/apply/approve
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ApproveOrganizationApplyResponse']>
   */
  async organizationServiceApproveOrganizationApply(data: components['schemas']['api.elder.backend.v1.ApproveOrganizationApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ApproveOrganizationApplyResponse']> {
    const url = '/elderSvrBackend/v1/organization/apply/approve';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ApproveOrganizationApplyResponse']>(requestConfig);
  },

  /**
   * organizationServiceGetOrganizationApply
   * @description POST /elderSvrBackend/v1/organization/apply/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetOrganizationApplyResponse']>
   */
  async organizationServiceGetOrganizationApply(data: components['schemas']['api.elder.backend.v1.GetOrganizationApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetOrganizationApplyResponse']> {
    const url = '/elderSvrBackend/v1/organization/apply/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.GetOrganizationApplyResponse']>(requestConfig);
  },

  /**
   * organizationServiceListOrganizationApply
   * @description POST /elderSvrBackend/v1/organization/apply/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListOrganizationApplyResponse']>
   */
  async organizationServiceListOrganizationApply(data: components['schemas']['api.elder.backend.v1.ListOrganizationApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListOrganizationApplyResponse']> {
    const url = '/elderSvrBackend/v1/organization/apply/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ListOrganizationApplyResponse']>(requestConfig);
  },

  /**
   * organizationServiceRejectOrganizationApply
   * @description POST /elderSvrBackend/v1/organization/apply/reject
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.RejectOrganizationApplyResponse']>
   */
  async organizationServiceRejectOrganizationApply(data: components['schemas']['api.elder.backend.v1.RejectOrganizationApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.RejectOrganizationApplyResponse']> {
    const url = '/elderSvrBackend/v1/organization/apply/reject';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.RejectOrganizationApplyResponse']>(requestConfig);
  },

  /**
   * organizationServiceApplyOrgCertication
   * @description POST /elderSvrBackend/v1/organization/certification/apply
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ApplyOrgCerticationResponse']>
   */
  async organizationServiceApplyOrgCertication(data: components['schemas']['api.elder.backend.v1.ApplyOrgCerticationRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ApplyOrgCerticationResponse']> {
    const url = '/elderSvrBackend/v1/organization/certification/apply';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ApplyOrgCerticationResponse']>(requestConfig);
  },

  /**
   * organizationServiceApproveOrgCerticationApply
   * @description POST /elderSvrBackend/v1/organization/certification/apply/approve
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ApproveOrgCerticationApplyResponse']>
   */
  async organizationServiceApproveOrgCerticationApply(data: components['schemas']['api.elder.backend.v1.ApproveOrgCerticationApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ApproveOrgCerticationApplyResponse']> {
    const url = '/elderSvrBackend/v1/organization/certification/apply/approve';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ApproveOrgCerticationApplyResponse']>(requestConfig);
  },

  /**
   * organizationServiceListOrgCerticationApply
   * @description POST /elderSvrBackend/v1/organization/certification/apply/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListOrgCerticationApplyResponse']>
   */
  async organizationServiceListOrgCerticationApply(data: components['schemas']['api.elder.backend.v1.ListOrgCerticationApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListOrgCerticationApplyResponse']> {
    const url = '/elderSvrBackend/v1/organization/certification/apply/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ListOrgCerticationApplyResponse']>(requestConfig);
  },

  /**
   * organizationServiceRejectOrgCerticationApply
   * @description POST /elderSvrBackend/v1/organization/certification/apply/reject
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.RejectOrgCerticationApplyResponse']>
   */
  async organizationServiceRejectOrgCerticationApply(data: components['schemas']['api.elder.backend.v1.RejectOrgCerticationApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.RejectOrgCerticationApplyResponse']> {
    const url = '/elderSvrBackend/v1/organization/certification/apply/reject';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.RejectOrgCerticationApplyResponse']>(requestConfig);
  },

  /**
   * organizationServiceGetOrgCertications
   * @description POST /elderSvrBackend/v1/organization/certification/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetOrgCerticationsResponse']>
   */
  async organizationServiceGetOrgCertications(data: components['schemas']['api.elder.backend.v1.GetOrgCerticationsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetOrgCerticationsResponse']> {
    const url = '/elderSvrBackend/v1/organization/certification/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.GetOrgCerticationsResponse']>(requestConfig);
  },

  /**
   * organizationServiceCreateOrganization
   * @description POST /elderSvrBackend/v1/organization/create
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.CreateOrganizationResponse']>
   */
  async organizationServiceCreateOrganization(data: components['schemas']['api.elder.backend.v1.CreateOrganizationRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.CreateOrganizationResponse']> {
    const url = '/elderSvrBackend/v1/organization/create';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.CreateOrganizationResponse']>(requestConfig);
  },

  /**
   * organizationServiceGetOrganizationDetail
   * @description POST /elderSvrBackend/v1/organization/detail/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetOrganizationDetailResponse']>
   */
  async organizationServiceGetOrganizationDetail(data: components['schemas']['api.elder.backend.v1.GetOrganizationDetailRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetOrganizationDetailResponse']> {
    const url = '/elderSvrBackend/v1/organization/detail/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.GetOrganizationDetailResponse']>(requestConfig);
  },

  /**
   * organizationServiceListOrganizations
   * @description POST /elderSvrBackend/v1/organization/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListOrganizationsResponse']>
   */
  async organizationServiceListOrganizations(data: components['schemas']['api.elder.backend.v1.ListOrganizationsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListOrganizationsResponse']> {
    const url = '/elderSvrBackend/v1/organization/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ListOrganizationsResponse']>(requestConfig);
  },

  /**
   * organizationServiceUpdateOrganizationPaymentMethod
   * @description POST /elderSvrBackend/v1/organization/payment/method/update
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.UpdateOrganizationPaymentMethodResponse']>
   */
  async organizationServiceUpdateOrganizationPaymentMethod(data: components['schemas']['api.elder.backend.v1.UpdateOrganizationPaymentMethodRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.UpdateOrganizationPaymentMethodResponse']> {
    const url = '/elderSvrBackend/v1/organization/payment/method/update';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.UpdateOrganizationPaymentMethodResponse']>(requestConfig);
  },

  /**
   * organizationServiceListCommunitiesByServiceNetwork
   * @description POST /elderSvrBackend/v1/organization/service/communities
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListCommunitiesByServiceNetworkResponse']>
   */
  async organizationServiceListCommunitiesByServiceNetwork(data: components['schemas']['api.elder.backend.v1.ListCommunitiesByServiceNetworkRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListCommunitiesByServiceNetworkResponse']> {
    const url = '/elderSvrBackend/v1/organization/service/communities';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ListCommunitiesByServiceNetworkResponse']>(requestConfig);
  },

  /**
   * organizationServiceAddServiceNetwork
   * @description POST /elderSvrBackend/v1/organization/service/network
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.AddServiceNetworkResponse']>
   */
  async organizationServiceAddServiceNetwork(data: components['schemas']['api.elder.backend.v1.AddServiceNetworkRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.AddServiceNetworkResponse']> {
    const url = '/elderSvrBackend/v1/organization/service/network';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.AddServiceNetworkResponse']>(requestConfig);
  },

  /**
   * organizationServiceDeleteServiceNetwork
   * @description POST /elderSvrBackend/v1/organization/service/network/delete
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.DeleteServiceNetworkResponse']>
   */
  async organizationServiceDeleteServiceNetwork(data: components['schemas']['api.elder.backend.v1.DeleteServiceNetworkRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.DeleteServiceNetworkResponse']> {
    const url = '/elderSvrBackend/v1/organization/service/network/delete';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.DeleteServiceNetworkResponse']>(requestConfig);
  },

  /**
   * organizationServiceListServiceNetwork
   * @description POST /elderSvrBackend/v1/organization/service/network/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListServiceNetworkResponse']>
   */
  async organizationServiceListServiceNetwork(data: components['schemas']['api.elder.backend.v1.ListServiceNetworkRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListServiceNetworkResponse']> {
    const url = '/elderSvrBackend/v1/organization/service/network/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.ListServiceNetworkResponse']>(requestConfig);
  },

  /**
   * organizationServiceUpdateOrganization
   * @description POST /elderSvrBackend/v1/organization/update
   * @param data 
   * @returns Promise<components['schemas']['api.elder.backend.v1.UpdateOrganizationResponse']>
   */
  async organizationServiceUpdateOrganization(data: components['schemas']['api.elder.backend.v1.UpdateOrganizationRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.UpdateOrganizationResponse']> {
    const url = '/elderSvrBackend/v1/organization/update';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.backend.v1.UpdateOrganizationResponse']>(requestConfig);
  },

  /**
   * activityServiceGetNearbyActivitiesPlatform
   * @description POST /elderSvrMiniAPP/activity/platform/v1/suggest
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetNearbyActivitiesResponse']>
   */
  async activityServiceGetNearbyActivitiesPlatform(data: components['schemas']['api.elder.v1.activity.GetSuggestActivityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetNearbyActivitiesResponse']> {
    const url = '/elderSvrMiniAPP/activity/platform/v1/suggest';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetNearbyActivitiesResponse']>(requestConfig);
  },

  /**
   * activityServiceCancelCheckin
   * @description POST /elderSvrMiniAPP/activity/v1/cancelCheckin
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.CancelCheckinResponse']>
   */
  async activityServiceCancelCheckin(data: components['schemas']['api.elder.v1.activity.CancelCheckinRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CancelCheckinResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/cancelCheckin';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.CancelCheckinResponse']>(requestConfig);
  },

  /**
   * activityServiceCancelEnroll
   * @description POST /elderSvrMiniAPP/activity/v1/cancel_enroll
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.CancelEnrollResponse']>
   */
  async activityServiceCancelEnroll(data: components['schemas']['api.elder.v1.activity.CancelEnrollRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CancelEnrollResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/cancel_enroll';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.CancelEnrollResponse']>(requestConfig);
  },

  /**
   * activityServiceCheckCancelEnrollPermission
   * @description POST /elderSvrMiniAPP/activity/v1/check_cancel_enroll_permission
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.CheckCancelEnrollPermissionResponse']>
   */
  async activityServiceCheckCancelEnrollPermission(data: components['schemas']['api.elder.v1.activity.CheckCancelEnrollPermissionRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CheckCancelEnrollPermissionResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/check_cancel_enroll_permission';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.CheckCancelEnrollPermissionResponse']>(requestConfig);
  },

  /**
   * activityServiceCheckinActivity
   * @description POST /elderSvrMiniAPP/activity/v1/checkinActivity
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.CheckinActivityResponse']>
   */
  async activityServiceCheckinActivity(data: components['schemas']['api.elder.v1.activity.CheckinActivityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CheckinActivityResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/checkinActivity';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.CheckinActivityResponse']>(requestConfig);
  },

  /**
   * activityCommentServiceCreateComment
   * @description POST /elderSvrMiniAPP/activity/v1/comment/create
   * @param data 
   * @returns Promise<components['schemas']['api.elder.activity.v1.CreateCommentResponse']>
   */
  async activityCommentServiceCreateComment(data: components['schemas']['api.elder.activity.v1.CreateCommentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.CreateCommentResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/comment/create';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.activity.v1.CreateCommentResponse']>(requestConfig);
  },

  /**
   * activityCommentServiceDeleteComment
   * @description POST /elderSvrMiniAPP/activity/v1/comment/delete
   * @param data 
   * @returns Promise<components['schemas']['api.elder.activity.v1.DeleteCommentResponse']>
   */
  async activityCommentServiceDeleteComment(data: components['schemas']['api.elder.activity.v1.DeleteCommentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.DeleteCommentResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/comment/delete';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.activity.v1.DeleteCommentResponse']>(requestConfig);
  },

  /**
   * activityCommentServiceLikeComment
   * @description POST /elderSvrMiniAPP/activity/v1/comment/like
   * @param data 
   * @returns Promise<components['schemas']['api.elder.activity.v1.LikeResponse']>
   */
  async activityCommentServiceLikeComment(data: components['schemas']['api.elder.activity.v1.LikeRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.LikeResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/comment/like';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.activity.v1.LikeResponse']>(requestConfig);
  },

  /**
   * activityCommentServiceGetUserLikedComments
   * @description POST /elderSvrMiniAPP/activity/v1/comment/liked
   * @param data 
   * @returns Promise<components['schemas']['api.elder.activity.v1.GetUserLikedCommentsResponse']>
   */
  async activityCommentServiceGetUserLikedComments(data: components['schemas']['api.elder.activity.v1.GetUserLikedCommentsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.GetUserLikedCommentsResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/comment/liked';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.activity.v1.GetUserLikedCommentsResponse']>(requestConfig);
  },

  /**
   * activityCommentServiceListComments
   * @description POST /elderSvrMiniAPP/activity/v1/comment/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.activity.v1.ListCommentsResponse']>
   */
  async activityCommentServiceListComments(data: components['schemas']['api.elder.activity.v1.ListCommentsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.ListCommentsResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/comment/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.activity.v1.ListCommentsResponse']>(requestConfig);
  },

  /**
   * activityCommentServiceListUserCommentsByActivity
   * @description POST /elderSvrMiniAPP/activity/v1/comment/list_by_activity_user
   * @param data 
   * @returns Promise<components['schemas']['api.elder.activity.v1.ListUserCommentsByActivityResponse']>
   */
  async activityCommentServiceListUserCommentsByActivity(data: components['schemas']['api.elder.activity.v1.ListUserCommentsByActivityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.ListUserCommentsByActivityResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/comment/list_by_activity_user';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.activity.v1.ListUserCommentsByActivityResponse']>(requestConfig);
  },

  /**
   * activityCommentServiceUnlikeComment
   * @description POST /elderSvrMiniAPP/activity/v1/comment/unlike
   * @param data 
   * @returns Promise<components['schemas']['api.elder.activity.v1.LikeResponse']>
   */
  async activityCommentServiceUnlikeComment(data: components['schemas']['api.elder.activity.v1.UnlikeRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.LikeResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/comment/unlike';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.activity.v1.LikeResponse']>(requestConfig);
  },

  /**
   * activityServiceCreateActivity
   * @description POST /elderSvrMiniAPP/activity/v1/create_activity
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.CreateActivityResponse']>
   */
  async activityServiceCreateActivity(data: components['schemas']['api.elder.v1.activity.CreateActivityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CreateActivityResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/create_activity';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.CreateActivityResponse']>(requestConfig);
  },

  /**
   * activityServiceCreateMoment
   * @description POST /elderSvrMiniAPP/activity/v1/create_moment
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.CreateMomentResponse']>
   */
  async activityServiceCreateMoment(data: components['schemas']['api.elder.v1.activity.CreateMomentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CreateMomentResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/create_moment';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.CreateMomentResponse']>(requestConfig);
  },

  /**
   * activityServiceCreateActivityTemplate
   * @description POST /elderSvrMiniAPP/activity/v1/create_template
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.CreateActivityTemplateResponse']>
   */
  async activityServiceCreateActivityTemplate(data: components['schemas']['api.elder.v1.activity.CreateActivityTemplateRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CreateActivityTemplateResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/create_template';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.CreateActivityTemplateResponse']>(requestConfig);
  },

  /**
   * activityServiceListDefaultActivities
   * @description POST /elderSvrMiniAPP/activity/v1/default/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListDefaultActivitiesResponse']>
   */
  async activityServiceListDefaultActivities(data: components['schemas']['api.elder.v1.activity.ListDefaultActivitiesRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListDefaultActivitiesResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/default/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.ListDefaultActivitiesResponse']>(requestConfig);
  },

  /**
   * activityServiceDeleteActivity
   * @description POST /elderSvrMiniAPP/activity/v1/delete_activity
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.DeleteActivityResponse']>
   */
  async activityServiceDeleteActivity(data: components['schemas']['api.elder.v1.activity.DeleteActivityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.DeleteActivityResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/delete_activity';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.DeleteActivityResponse']>(requestConfig);
  },

  /**
   * activityServiceDeleteMoment
   * @description POST /elderSvrMiniAPP/activity/v1/delete_moment
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.DeleteMomentResponse']>
   */
  async activityServiceDeleteMoment(data: components['schemas']['api.elder.v1.activity.DeleteMomentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.DeleteMomentResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/delete_moment';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.DeleteMomentResponse']>(requestConfig);
  },

  /**
   * activityServiceEnrollActivity
   * @description POST /elderSvrMiniAPP/activity/v1/enroll
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.EnrollActivityResponse']>
   */
  async activityServiceEnrollActivity(data: components['schemas']['api.elder.v1.activity.EnrollActivityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.EnrollActivityResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/enroll';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.EnrollActivityResponse']>(requestConfig);
  },

  /**
   * activityServiceExportActivityCheckinList
   * @description POST /elderSvrMiniAPP/activity/v1/exportActivityCheckinList
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.ExportActivityCheckinListResponse']>
   */
  async activityServiceExportActivityCheckinList(data: components['schemas']['api.elder.v1.activity.ExportActivityCheckinListRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ExportActivityCheckinListResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/exportActivityCheckinList';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.ExportActivityCheckinListResponse']>(requestConfig);
  },

  /**
   * activityServiceGenerateCheckinQRCode
   * @description POST /elderSvrMiniAPP/activity/v1/generateCheckinQRCode
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GenerateCheckinQRCodeResponse']>
   */
  async activityServiceGenerateCheckinQRCode(data: components['schemas']['api.elder.v1.activity.GenerateCheckinQRCodeRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GenerateCheckinQRCodeResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/generateCheckinQRCode';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GenerateCheckinQRCodeResponse']>(requestConfig);
  },

  /**
   * activityServiceGenerateShareInfo
   * @description POST /elderSvrMiniAPP/activity/v1/generate_share
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GenerateShareResponse']>
   */
  async activityServiceGenerateShareInfo(data: components['schemas']['api.elder.v1.activity.GenerateShareRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GenerateShareResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/generate_share';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GenerateShareResponse']>(requestConfig);
  },

  /**
   * activityServiceGetActivity
   * @description POST /elderSvrMiniAPP/activity/v1/get_activity
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetActivityResponse']>
   */
  async activityServiceGetActivity(data: components['schemas']['api.elder.v1.activity.GetActivityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetActivityResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/get_activity';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetActivityResponse']>(requestConfig);
  },

  /**
   * activityServiceGetActivityCustomConfig
   * @description POST /elderSvrMiniAPP/activity/v1/get_activity_custom_config
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetActivityCustomConfigResponse']>
   */
  async activityServiceGetActivityCustomConfig(data: components['schemas']['api.elder.v1.activity.GetActivityCustomConfigRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetActivityCustomConfigResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/get_activity_custom_config';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetActivityCustomConfigResponse']>(requestConfig);
  },

  /**
   * activityServiceGetActivityByRecruitAndCommunity
   * @description POST /elderSvrMiniAPP/activity/v1/get_by_recruit_and_community
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetActivityByRecruitAndCommunityResponse']>
   */
  async activityServiceGetActivityByRecruitAndCommunity(data: components['schemas']['api.elder.v1.activity.GetActivityByRecruitAndCommunityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetActivityByRecruitAndCommunityResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/get_by_recruit_and_community';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetActivityByRecruitAndCommunityResponse']>(requestConfig);
  },

  /**
   * activityServiceGetCourseActivityList
   * @description POST /elderSvrMiniAPP/activity/v1/get_course_activity
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetCourseActivitiesResponse']>
   */
  async activityServiceGetCourseActivityList(data: components['schemas']['api.elder.v1.activity.GetCourseActivitiesRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetCourseActivitiesResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/get_course_activity';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetCourseActivitiesResponse']>(requestConfig);
  },

  /**
   * activityServiceGetCourseActivityById
   * @description POST /elderSvrMiniAPP/activity/v1/get_course_activity_by_id
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetCourseActivityByIdResponse']>
   */
  async activityServiceGetCourseActivityById(data: components['schemas']['api.elder.v1.activity.GetCourseActivityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetCourseActivityByIdResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/get_course_activity_by_id';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetCourseActivityByIdResponse']>(requestConfig);
  },

  /**
   * activityServiceGetMoment
   * @description POST /elderSvrMiniAPP/activity/v1/get_moment
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetMomentReply']>
   */
  async activityServiceGetMoment(data: components['schemas']['api.elder.v1.activity.GetMomentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetMomentReply']> {
    const url = '/elderSvrMiniAPP/activity/v1/get_moment';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetMomentReply']>(requestConfig);
  },

  /**
   * activityServiceGetMyEnrollActivity
   * @description POST /elderSvrMiniAPP/activity/v1/get_my_enroll_activity
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetMyEnrollActivityResponse']>
   */
  async activityServiceGetMyEnrollActivity(data: components['schemas']['api.elder.v1.activity.GetMyEnrollActivityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetMyEnrollActivityResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/get_my_enroll_activity';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetMyEnrollActivityResponse']>(requestConfig);
  },

  /**
   * activityServiceGetNearbyActivities
   * @description POST /elderSvrMiniAPP/activity/v1/get_nearby
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetNearbyActivitiesResponse']>
   */
  async activityServiceGetNearbyActivities(data: components['schemas']['api.elder.v1.activity.GetNearbyActivitiesRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetNearbyActivitiesResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/get_nearby';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetNearbyActivitiesResponse']>(requestConfig);
  },

  /**
   * activityServiceGetNotifications
   * @description POST /elderSvrMiniAPP/activity/v1/get_notify
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetNotificationsResponse']>
   */
  async activityServiceGetNotifications(data: components['schemas']['api.elder.v1.activity.GetNotificationsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetNotificationsResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/get_notify';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetNotificationsResponse']>(requestConfig);
  },

  /**
   * activityServiceGetOngoingNearbyActivities
   * @description POST /elderSvrMiniAPP/activity/v1/get_ongoing_activity
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetOnGoingActivitiesResponse']>
   */
  async activityServiceGetOngoingNearbyActivities(data: components['schemas']['api.elder.v1.activity.GetNearbyActivitiesRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetOnGoingActivitiesResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/get_ongoing_activity';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetOnGoingActivitiesResponse']>(requestConfig);
  },

  /**
   * activityServiceCancelHealthActivityEnroll
   * @description POST /elderSvrMiniAPP/activity/v1/health/cancel_enroll
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.CancelHealthActivityEnrollResponse']>
   */
  async activityServiceCancelHealthActivityEnroll(data: components['schemas']['api.elder.v1.activity.CancelHealthActivityEnrollRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CancelHealthActivityEnrollResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/health/cancel_enroll';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.CancelHealthActivityEnrollResponse']>(requestConfig);
  },

  /**
   * activityServiceCreateHealthActivity
   * @description POST /elderSvrMiniAPP/activity/v1/health/create
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.CreateHealthActivityResponse']>
   */
  async activityServiceCreateHealthActivity(data: components['schemas']['api.elder.v1.activity.CreateHealthActivityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CreateHealthActivityResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/health/create';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.CreateHealthActivityResponse']>(requestConfig);
  },

  /**
   * activityServiceEnrollHealthActivity
   * @description POST /elderSvrMiniAPP/activity/v1/health/enroll
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.EnrollHealthActivityResponse']>
   */
  async activityServiceEnrollHealthActivity(data: components['schemas']['api.elder.v1.activity.EnrollHealthActivityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.EnrollHealthActivityResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/health/enroll';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.EnrollHealthActivityResponse']>(requestConfig);
  },

  /**
   * activityServiceGetEnrollmentByActivityId
   * @description POST /elderSvrMiniAPP/activity/v1/health/enrollment/get_list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetEnrollmentByActivityIdResponse']>
   */
  async activityServiceGetEnrollmentByActivityId(data: components['schemas']['api.elder.v1.activity.GetEnrollmentByActivityIdRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetEnrollmentByActivityIdResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/health/enrollment/get_list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetEnrollmentByActivityIdResponse']>(requestConfig);
  },

  /**
   * activityServiceGetEnrollmentDetails
   * @description POST /elderSvrMiniAPP/activity/v1/health/enrollments/get_enroll_detail
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetEnrollmentDetailsResponse']>
   */
  async activityServiceGetEnrollmentDetails(data: components['schemas']['api.elder.v1.activity.GetEnrollmentDetailsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetEnrollmentDetailsResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/health/enrollments/get_enroll_detail';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetEnrollmentDetailsResponse']>(requestConfig);
  },

  /**
   * activityServiceCreateFamilyDoctorAppointment
   * @description POST /elderSvrMiniAPP/activity/v1/health/family_doctor/create_appointment
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.CreateFamilyDoctorAppointmentResponse']>
   */
  async activityServiceCreateFamilyDoctorAppointment(data: components['schemas']['api.elder.v1.activity.CreateFamilyDoctorAppointmentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CreateFamilyDoctorAppointmentResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/health/family_doctor/create_appointment';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.CreateFamilyDoctorAppointmentResponse']>(requestConfig);
  },

  /**
   * activityServiceDeleteFamilyDoctorAppointment
   * @description POST /elderSvrMiniAPP/activity/v1/health/family_doctor/delete_appointment
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.DeleteFamilyDoctorAppointmentResponse']>
   */
  async activityServiceDeleteFamilyDoctorAppointment(data: components['schemas']['api.elder.v1.activity.DeleteFamilyDoctorAppointmentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.DeleteFamilyDoctorAppointmentResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/health/family_doctor/delete_appointment';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.DeleteFamilyDoctorAppointmentResponse']>(requestConfig);
  },

  /**
   * activityServiceListFamilyDoctorAppointments
   * @description POST /elderSvrMiniAPP/activity/v1/health/family_doctor/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListFamilyDoctorAppointmentsResponse']>
   */
  async activityServiceListFamilyDoctorAppointments(data: components['schemas']['api.elder.v1.activity.ListFamilyDoctorAppointmentsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListFamilyDoctorAppointmentsResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/health/family_doctor/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.ListFamilyDoctorAppointmentsResponse']>(requestConfig);
  },

  /**
   * activityServiceGetFamilyDoctorServiceTypes
   * @description POST /elderSvrMiniAPP/activity/v1/health/family_doctor/service_types
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetFamilyDoctorServiceTypesResponse']>
   */
  async activityServiceGetFamilyDoctorServiceTypes(data: components['schemas']['api.elder.v1.activity.GetFamilyDoctorServiceTypesRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetFamilyDoctorServiceTypesResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/health/family_doctor/service_types';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetFamilyDoctorServiceTypesResponse']>(requestConfig);
  },

  /**
   * activityServiceUpdateFamilyDoctorAppointment
   * @description POST /elderSvrMiniAPP/activity/v1/health/family_doctor/update_appointment
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.UpdateFamilyDoctorAppointmentResponse']>
   */
  async activityServiceUpdateFamilyDoctorAppointment(data: components['schemas']['api.elder.v1.activity.UpdateFamilyDoctorAppointmentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.UpdateFamilyDoctorAppointmentResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/health/family_doctor/update_appointment';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.UpdateFamilyDoctorAppointmentResponse']>(requestConfig);
  },

  /**
   * activityServiceGenerateHealthCheckNotice
   * @description POST /elderSvrMiniAPP/activity/v1/health/generate_notice
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GenerateHealthCheckNoticeResponse']>
   */
  async activityServiceGenerateHealthCheckNotice(data: components['schemas']['api.elder.v1.activity.GenerateHealthCheckNoticeRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GenerateHealthCheckNoticeResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/health/generate_notice';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GenerateHealthCheckNoticeResponse']>(requestConfig);
  },

  /**
   * activityServiceGetHealthActivityInfo
   * @description POST /elderSvrMiniAPP/activity/v1/health/get_health_info
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetHealthActivityInfoResponse']>
   */
  async activityServiceGetHealthActivityInfo(data: components['schemas']['api.elder.v1.activity.GetHealthActivityInfoRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetHealthActivityInfoResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/health/get_health_info';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetHealthActivityInfoResponse']>(requestConfig);
  },

  /**
   * activityServiceGetHealthActivityListShareInfo
   * @description POST /elderSvrMiniAPP/activity/v1/health/get_health_share_info_list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetHealthActivityListShareInfoResponse']>
   */
  async activityServiceGetHealthActivityListShareInfo(data: components['schemas']['api.elder.v1.activity.GetHealthActivityListShareInfoRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetHealthActivityListShareInfoResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/health/get_health_share_info_list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetHealthActivityListShareInfoResponse']>(requestConfig);
  },

  /**
   * activityServiceGetHealthActivityList
   * @description POST /elderSvrMiniAPP/activity/v1/health/get_list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetHealthActivityListResponse']>
   */
  async activityServiceGetHealthActivityList(data: components['schemas']['api.elder.v1.activity.GetHealthActivityListRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetHealthActivityListResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/health/get_list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetHealthActivityListResponse']>(requestConfig);
  },

  /**
   * activityServiceImportHealthActivity
   * @description POST /elderSvrMiniAPP/activity/v1/health/import
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.ImportHealthActivityResponse']>
   */
  async activityServiceImportHealthActivity(data: components['schemas']['api.elder.v1.activity.ImportHealthActivityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ImportHealthActivityResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/health/import';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.ImportHealthActivityResponse']>(requestConfig);
  },

  /**
   * activityServiceGetMyEnrollments
   * @description POST /elderSvrMiniAPP/activity/v1/health/my_enrollments
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetMyHealthEnrollmentsResponse']>
   */
  async activityServiceGetMyEnrollments(data: components['schemas']['api.elder.v1.activity.GetMyEnrollmentsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetMyHealthEnrollmentsResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/health/my_enrollments';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetMyHealthEnrollmentsResponse']>(requestConfig);
  },

  /**
   * activityServiceLikeMoment
   * @description POST /elderSvrMiniAPP/activity/v1/like_moment
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.LikeMomentResponse']>
   */
  async activityServiceLikeMoment(data: components['schemas']['api.elder.v1.activity.LikeMomentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.LikeMomentResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/like_moment';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.LikeMomentResponse']>(requestConfig);
  },

  /**
   * activityServiceListActivitiesByTemplate
   * @description POST /elderSvrMiniAPP/activity/v1/list_activities_by_template
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListActivitiesByTemplateResponse']>
   */
  async activityServiceListActivitiesByTemplate(data: components['schemas']['api.elder.v1.activity.ListActivitiesByTemplateRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListActivitiesByTemplateResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/list_activities_by_template';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.ListActivitiesByTemplateResponse']>(requestConfig);
  },

  /**
   * activityServiceListActivityTemplates
   * @description POST /elderSvrMiniAPP/activity/v1/list_activity_templates
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListActivityTplsResponse']>
   */
  async activityServiceListActivityTemplates(data: components['schemas']['api.elder.v1.activity.ListActivityTplsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListActivityTplsResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/list_activity_templates';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.ListActivityTplsResponse']>(requestConfig);
  },

  /**
   * activityServiceListAlbumPhotos
   * @description POST /elderSvrMiniAPP/activity/v1/list_album_photos
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListAlbumPhotosResponse']>
   */
  async activityServiceListAlbumPhotos(data: components['schemas']['api.elder.v1.activity.ListAlbumPhotosRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListAlbumPhotosResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/list_album_photos';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.ListAlbumPhotosResponse']>(requestConfig);
  },

  /**
   * activityServiceListAlbums
   * @description POST /elderSvrMiniAPP/activity/v1/list_albums
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListAlbumsResponse']>
   */
  async activityServiceListAlbums(data: components['schemas']['api.elder.v1.activity.ListAlbumsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListAlbumsResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/list_albums';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.ListAlbumsResponse']>(requestConfig);
  },

  /**
   * activityServiceListEnrollActivity
   * @description POST /elderSvrMiniAPP/activity/v1/list_enroll_activity
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListEnrollActivityResponse']>
   */
  async activityServiceListEnrollActivity(data: components['schemas']['api.elder.v1.activity.ListEnrollActivityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListEnrollActivityResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/list_enroll_activity';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.ListEnrollActivityResponse']>(requestConfig);
  },

  /**
   * activityServiceListMoments
   * @description POST /elderSvrMiniAPP/activity/v1/list_moments
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListMomentsResponse']>
   */
  async activityServiceListMoments(data: components['schemas']['api.elder.v1.activity.ListMomentsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListMomentsResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/list_moments';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.ListMomentsResponse']>(requestConfig);
  },

  /**
   * activityServiceListPublishedActivities
   * @description POST /elderSvrMiniAPP/activity/v1/list_published_activities
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListPublishedActivitiesResponse']>
   */
  async activityServiceListPublishedActivities(data: components['schemas']['api.elder.v1.activity.ListPublishedActivitiesRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListPublishedActivitiesResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/list_published_activities';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.ListPublishedActivitiesResponse']>(requestConfig);
  },

  /**
   * activityServiceListUserActivities
   * @description POST /elderSvrMiniAPP/activity/v1/list_user_activities
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListUserActivitiesResponse']>
   */
  async activityServiceListUserActivities(data: components['schemas']['api.elder.v1.activity.ListUserActivitiesRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListUserActivitiesResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/list_user_activities';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.ListUserActivitiesResponse']>(requestConfig);
  },

  /**
   * activityServiceGetActivityPopularity
   * @description POST /elderSvrMiniAPP/activity/v1/popularity/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetActivityPopularityResponse']>
   */
  async activityServiceGetActivityPopularity(data: components['schemas']['api.elder.v1.activity.GetActivityPopularityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetActivityPopularityResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/popularity/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.GetActivityPopularityResponse']>(requestConfig);
  },

  /**
   * activityServiceSearchActivities
   * @description POST /elderSvrMiniAPP/activity/v1/search
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.SearchActivitiesResponse']>
   */
  async activityServiceSearchActivities(data: components['schemas']['api.elder.v1.activity.SearchActivitiesRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.SearchActivitiesResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/search';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.SearchActivitiesResponse']>(requestConfig);
  },

  /**
   * activityServiceShareMoment
   * @description POST /elderSvrMiniAPP/activity/v1/share_moment
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.ShareMomentResponse']>
   */
  async activityServiceShareMoment(data: components['schemas']['api.elder.v1.activity.ShareMomentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ShareMomentResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/share_moment';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.ShareMomentResponse']>(requestConfig);
  },

  /**
   * activityServiceSyncToActivityScore
   * @description POST /elderSvrMiniAPP/activity/v1/sync_to_activity_score
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.SyncToActivityScoreResponse']>
   */
  async activityServiceSyncToActivityScore(data: components['schemas']['api.elder.v1.activity.SyncToActivityScoreRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.SyncToActivityScoreResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/sync_to_activity_score';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.SyncToActivityScoreResponse']>(requestConfig);
  },

  /**
   * activityServiceUpdateActivity
   * @description POST /elderSvrMiniAPP/activity/v1/update_activity
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity.UpdateActivityResponse']>
   */
  async activityServiceUpdateActivity(data: components['schemas']['api.elder.v1.activity.UpdateActivityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.UpdateActivityResponse']> {
    const url = '/elderSvrMiniAPP/activity/v1/update_activity';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity.UpdateActivityResponse']>(requestConfig);
  },

  /**
   * activityGroupChatServiceCallback
   * @description GET /elderSvrMiniAPP/activity_group_chat/v1/callback
   * @param msgSignature 
   * @param timestamp 
   * @param nonce 
   * @param echostr 
   * @param body 
   * @returns Promise<components['schemas']['api.elder.v1.activity_group_chat.CallbackReply']>
   */
  async activityGroupChatServiceCallback(queryParams?: { msgSignature?: string; timestamp?: string; nonce?: string; echostr?: string; body?: string }, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity_group_chat.CallbackReply']> {
    const url = '/elderSvrMiniAPP/activity_group_chat/v1/callback';
    const requestConfig: ApiRequestConfig = {
      method: 'GET',
      url,
      params: queryParams,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity_group_chat.CallbackReply']>(requestConfig);
  },

  /**
   * activityGroupChatServiceGetGroupChatByRecruitAndCommunity
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/get_by_recruit_and_community
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatByRecruitAndCommunityResponse']>
   */
  async activityGroupChatServiceGetGroupChatByRecruitAndCommunity(data: components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatByRecruitAndCommunityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatByRecruitAndCommunityResponse']> {
    const url = '/elderSvrMiniAPP/activity_group_chat/v1/get_by_recruit_and_community';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatByRecruitAndCommunityResponse']>(requestConfig);
  },

  /**
   * activityGroupChatServiceGetActivityChatSwitch
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/get_chat_switch
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity_group_chat.GetActivityChatSwitchResponse']>
   */
  async activityGroupChatServiceGetActivityChatSwitch(data: components['schemas']['api.elder.v1.activity_group_chat.GetActivityChatSwitchRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity_group_chat.GetActivityChatSwitchResponse']> {
    const url = '/elderSvrMiniAPP/activity_group_chat/v1/get_chat_switch';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity_group_chat.GetActivityChatSwitchResponse']>(requestConfig);
  },

  /**
   * activityGroupChatServiceGetGroupChatDetail
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/get_group_detail
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatDetailResponse']>
   */
  async activityGroupChatServiceGetGroupChatDetail(data: components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatDetailRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatDetailResponse']> {
    const url = '/elderSvrMiniAPP/activity_group_chat/v1/get_group_detail';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatDetailResponse']>(requestConfig);
  },

  /**
   * activityGroupChatServiceGetGroupChatQrCode
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/get_info
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatQrCodeResponse']>
   */
  async activityGroupChatServiceGetGroupChatQrCode(data: components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatQrCodeRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatQrCodeResponse']> {
    const url = '/elderSvrMiniAPP/activity_group_chat/v1/get_info';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatQrCodeResponse']>(requestConfig);
  },

  /**
   * activityGroupChatServiceSetActivityChatSwitch
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/set_chat_switch
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity_group_chat.SetActivityChatSwitchResponse']>
   */
  async activityGroupChatServiceSetActivityChatSwitch(data: components['schemas']['api.elder.v1.activity_group_chat.SetActivityChatSwitchRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity_group_chat.SetActivityChatSwitchResponse']> {
    const url = '/elderSvrMiniAPP/activity_group_chat/v1/set_chat_switch';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity_group_chat.SetActivityChatSwitchResponse']>(requestConfig);
  },

  /**
   * activityGroupChatServiceSyncActivityGroupChat
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/sync_data
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.activity_group_chat.SyncActivityGroupChatResponse']>
   */
  async activityGroupChatServiceSyncActivityGroupChat(data: components['schemas']['api.elder.v1.activity_group_chat.SyncActivityGroupChatRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity_group_chat.SyncActivityGroupChatResponse']> {
    const url = '/elderSvrMiniAPP/activity_group_chat/v1/sync_data';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.activity_group_chat.SyncActivityGroupChatResponse']>(requestConfig);
  },

  /**
   * aiServiceListAiRecordByUserID
   * @description POST /elderSvrMiniAPP/ai/v1/chat/records
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.ai.ListAiRecordByUserIDResp']>
   */
  async aiServiceListAiRecordByUserID(data: components['schemas']['api.elder.v1.ai.ListAiRecordByUserIDReq'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.ai.ListAiRecordByUserIDResp']> {
    const url = '/elderSvrMiniAPP/ai/v1/chat/records';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.ai.ListAiRecordByUserIDResp']>(requestConfig);
  },

  /**
   * aiServiceStartChat
   * @description POST /elderSvrMiniAPP/ai/v1/chat/start
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.ai.StartChatRsp']>
   */
  async aiServiceStartChat(data: components['schemas']['api.elder.v1.ai.StartChatReq'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.ai.StartChatRsp']> {
    const url = '/elderSvrMiniAPP/ai/v1/chat/start';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.ai.StartChatRsp']>(requestConfig);
  },

  /**
   * aiServiceStopChat
   * @description POST /elderSvrMiniAPP/ai/v1/chat/stop
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.ai.StopChatRsp']>
   */
  async aiServiceStopChat(data: components['schemas']['api.elder.v1.ai.StopChatReq'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.ai.StopChatRsp']> {
    const url = '/elderSvrMiniAPP/ai/v1/chat/stop';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.ai.StopChatRsp']>(requestConfig);
  },

  /**
   * aiServiceUpdateChat
   * @description POST /elderSvrMiniAPP/ai/v1/chat/update
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.ai.UpdateChatResp']>
   */
  async aiServiceUpdateChat(data: components['schemas']['api.elder.v1.ai.UpdateChatReq'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.ai.UpdateChatResp']> {
    const url = '/elderSvrMiniAPP/ai/v1/chat/update';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.ai.UpdateChatResp']>(requestConfig);
  },

  /**
   * channelSign
   * @description POST /elderSvrMiniAPP/channel/v1/sign
   * @param data 
   * @returns Promise<components['schemas']['business.v1.SignReply']>
   */
  async channelSign(data: components['schemas']['business.v1.SignRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.SignReply']> {
    const url = '/elderSvrMiniAPP/channel/v1/sign';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.SignReply']>(requestConfig);
  },

  /**
   * commonAddressInverseResolution
   * @description POST /elderSvrMiniAPP/common/v1/addressInverseResolution
   * @param data 
   * @returns Promise<components['schemas']['system.v1.AddressInverseResolutionReply']>
   */
  async commonAddressInverseResolution(data: components['schemas']['system.v1.AddressInverseResolutionRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.AddressInverseResolutionReply']> {
    const url = '/elderSvrMiniAPP/common/v1/addressInverseResolution';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.AddressInverseResolutionReply']>(requestConfig);
  },

  /**
   * commonCountUnreadMessage
   * @description POST /elderSvrMiniAPP/common/v1/countUnreadMessages
   * @param data 
   * @returns Promise<components['schemas']['system.v1.CountUnreadMessagesReply']>
   */
  async commonCountUnreadMessage(data: components['schemas']['system.v1.CountUnreadMessageRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.CountUnreadMessagesReply']> {
    const url = '/elderSvrMiniAPP/common/v1/countUnreadMessages';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.CountUnreadMessagesReply']>(requestConfig);
  },

  /**
   * commonGenerateSoundText
   * @description POST /elderSvrMiniAPP/common/v1/generateSoundText
   * @param data 
   * @returns Promise<components['schemas']['system.v1.GenerateSoundTextResponse']>
   */
  async commonGenerateSoundText(data: components['schemas']['system.v1.GenerateSoundTextRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GenerateSoundTextResponse']> {
    const url = '/elderSvrMiniAPP/common/v1/generateSoundText';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.GenerateSoundTextResponse']>(requestConfig);
  },

  /**
   * commonGenerateWechatQRCode
   * @description POST /elderSvrMiniAPP/common/v1/generateWechatQRCode
   * @param data 
   * @returns Promise<components['schemas']['system.v1.GenerateWechatQRCodeReply']>
   */
  async commonGenerateWechatQRCode(data: components['schemas']['system.v1.GenerateWechatQRCodeRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GenerateWechatQRCodeReply']> {
    const url = '/elderSvrMiniAPP/common/v1/generateWechatQRCode';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.GenerateWechatQRCodeReply']>(requestConfig);
  },

  /**
   * commonGetCosTempKey
   * @description POST /elderSvrMiniAPP/common/v1/getCosTempKey
   * @param data 
   * @returns Promise<components['schemas']['system.v1.GetCosTempKeyReply']>
   */
  async commonGetCosTempKey(data: components['schemas']['system.v1.GetCosTempKeyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetCosTempKeyReply']> {
    const url = '/elderSvrMiniAPP/common/v1/getCosTempKey';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.GetCosTempKeyReply']>(requestConfig);
  },

  /**
   * commonHealthyCheck
   * @description GET /elderSvrMiniAPP/common/v1/healthy

   * @returns Promise<components['schemas']['system.v1.HealthyCheckReply']>
   */
  async commonHealthyCheck(config?: ApiRequestConfig): Promise<components['schemas']['system.v1.HealthyCheckReply']> {
    const url = '/elderSvrMiniAPP/common/v1/healthy';
    const requestConfig: ApiRequestConfig = {
      method: 'GET',
      url,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.HealthyCheckReply']>(requestConfig);
  },

  /**
   * commonNavigateToMiniProgram
   * @description POST /elderSvrMiniAPP/common/v1/navigateToMiniProgram
   * @param data 
   * @returns Promise<components['schemas']['system.v1.NavigateToMiniProgramReply']>
   */
  async commonNavigateToMiniProgram(data: components['schemas']['system.v1.NavigateToMiniProgramRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.NavigateToMiniProgramReply']> {
    const url = '/elderSvrMiniAPP/common/v1/navigateToMiniProgram';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.NavigateToMiniProgramReply']>(requestConfig);
  },

  /**
   * commonSetMessageStatusRead
   * @description POST /elderSvrMiniAPP/common/v1/setMessageStatusRead
   * @param data 
   * @returns Promise<components['schemas']['system.v1.MessageStatusChangeReply']>
   */
  async commonSetMessageStatusRead(data: components['schemas']['system.v1.MessageStatusChangeRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.MessageStatusChangeReply']> {
    const url = '/elderSvrMiniAPP/common/v1/setMessageStatusRead';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.MessageStatusChangeReply']>(requestConfig);
  },

  /**
   * commonStopServer
   * @description GET /elderSvrMiniAPP/common/v1/stopServer

   * @returns Promise<components['schemas']['system.v1.StopServerReply']>
   */
  async commonStopServer(config?: ApiRequestConfig): Promise<components['schemas']['system.v1.StopServerReply']> {
    const url = '/elderSvrMiniAPP/common/v1/stopServer';
    const requestConfig: ApiRequestConfig = {
      method: 'GET',
      url,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.StopServerReply']>(requestConfig);
  },

  /**
   * contributionServiceBatchCreateContributions
   * @description POST /elderSvrMiniAPP/contribution/v1/records/batch
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.contribution.BatchCreateContributionsResponse']>
   */
  async contributionServiceBatchCreateContributions(data: components['schemas']['api.elder.v1.contribution.BatchCreateContributionsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.contribution.BatchCreateContributionsResponse']> {
    const url = '/elderSvrMiniAPP/contribution/v1/records/batch';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.contribution.BatchCreateContributionsResponse']>(requestConfig);
  },

  /**
   * contributionServiceCreateContribution
   * @description POST /elderSvrMiniAPP/contribution/v1/records/create
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.contribution.ContributionRecord']>
   */
  async contributionServiceCreateContribution(data: components['schemas']['api.elder.v1.contribution.CreateContributionRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.contribution.ContributionRecord']> {
    const url = '/elderSvrMiniAPP/contribution/v1/records/create';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.contribution.ContributionRecord']>(requestConfig);
  },

  /**
   * contributionServiceListUserContributions
   * @description POST /elderSvrMiniAPP/contribution/v1/records/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.contribution.ListUserContributionsResponse']>
   */
  async contributionServiceListUserContributions(data: components['schemas']['api.elder.v1.contribution.ListUserContributionsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.contribution.ListUserContributionsResponse']> {
    const url = '/elderSvrMiniAPP/contribution/v1/records/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.contribution.ListUserContributionsResponse']>(requestConfig);
  },

  /**
   * contributionServiceGetUserContributionRank
   * @description POST /elderSvrMiniAPP/contribution/v1/records/rank
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.contribution.GetUserContributionRankResponse']>
   */
  async contributionServiceGetUserContributionRank(data: components['schemas']['api.elder.v1.contribution.GetUserContributionRankRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.contribution.GetUserContributionRankResponse']> {
    const url = '/elderSvrMiniAPP/contribution/v1/records/rank';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.contribution.GetUserContributionRankResponse']>(requestConfig);
  },

  /**
   * contributionServiceGetUserContributionStats
   * @description GET /elderSvrMiniAPP/contribution/v1/records/stats
   * @param userId 
   * @returns Promise<components['schemas']['api.elder.v1.contribution.ContributionStats']>
   */
  async contributionServiceGetUserContributionStats(queryParams?: { userId?: string }, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.contribution.ContributionStats']> {
    const url = '/elderSvrMiniAPP/contribution/v1/records/stats';
    const requestConfig: ApiRequestConfig = {
      method: 'GET',
      url,
      params: queryParams,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.contribution.ContributionStats']>(requestConfig);
  },

  /**
   * couponGrabCoupon
   * @description POST /elderSvrMiniAPP/coupon/v1/grab_coupon
   * @param data 
   * @returns Promise<components['schemas']['coupon.v1.GrabCouponReply']>
   */
  async couponGrabCoupon(data: components['schemas']['coupon.v1.GrabCouponRequest'], config?: ApiRequestConfig): Promise<components['schemas']['coupon.v1.GrabCouponReply']> {
    const url = '/elderSvrMiniAPP/coupon/v1/grab_coupon';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['coupon.v1.GrabCouponReply']>(requestConfig);
  },

  /**
   * couponGrabCouponStatus
   * @description POST /elderSvrMiniAPP/coupon/v1/grab_coupon_status
   * @param data 
   * @returns Promise<components['schemas']['coupon.v1.CouponStatusReply']>
   */
  async couponGrabCouponStatus(data: components['schemas']['coupon.v1.GrabCouponStatusRequest'], config?: ApiRequestConfig): Promise<components['schemas']['coupon.v1.CouponStatusReply']> {
    const url = '/elderSvrMiniAPP/coupon/v1/grab_coupon_status';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['coupon.v1.CouponStatusReply']>(requestConfig);
  },

  /**
   * couponInnerConsumeUserCoupon
   * @description POST /elderSvrMiniAPP/coupon/v1/inner_consume_user_coupon
   * @param data 
   * @returns Promise<components['schemas']['coupon.v1.ConsumeCouponReply']>
   */
  async couponInnerConsumeUserCoupon(data: components['schemas']['coupon.v1.UserCouponRequest'], config?: ApiRequestConfig): Promise<components['schemas']['coupon.v1.ConsumeCouponReply']> {
    const url = '/elderSvrMiniAPP/coupon/v1/inner_consume_user_coupon';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['coupon.v1.ConsumeCouponReply']>(requestConfig);
  },

  /**
   * couponMyCoupons
   * @description POST /elderSvrMiniAPP/coupon/v1/my_coupons
   * @param data 
   * @returns Promise<components['schemas']['coupon.v1.MyCouponsReply']>
   */
  async couponMyCoupons(data: components['schemas']['coupon.v1.CommonRequest'], config?: ApiRequestConfig): Promise<components['schemas']['coupon.v1.MyCouponsReply']> {
    const url = '/elderSvrMiniAPP/coupon/v1/my_coupons';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['coupon.v1.MyCouponsReply']>(requestConfig);
  },

  /**
   * courseServiceCancelEnroll
   * @description POST /elderSvrMiniAPP/course/v1/cancel_enroll
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.course.CancelEnrollResponse']>
   */
  async courseServiceCancelEnroll(data: components['schemas']['api.elder.v1.course.CancelEnrollRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.course.CancelEnrollResponse']> {
    const url = '/elderSvrMiniAPP/course/v1/cancel_enroll';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.course.CancelEnrollResponse']>(requestConfig);
  },

  /**
   * courseServiceEnrollCourse
   * @description POST /elderSvrMiniAPP/course/v1/enroll
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.course.EnrollCourseResponse']>
   */
  async courseServiceEnrollCourse(data: components['schemas']['api.elder.v1.course.EnrollCourseRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.course.EnrollCourseResponse']> {
    const url = '/elderSvrMiniAPP/course/v1/enroll';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.course.EnrollCourseResponse']>(requestConfig);
  },

  /**
   * courseServiceGetCourse
   * @description POST /elderSvrMiniAPP/course/v1/get_course
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.course.GetCourseResponse']>
   */
  async courseServiceGetCourse(data: components['schemas']['api.elder.v1.course.GetCourseRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.course.GetCourseResponse']> {
    const url = '/elderSvrMiniAPP/course/v1/get_course';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.course.GetCourseResponse']>(requestConfig);
  },

  /**
   * courseServiceGetCourseSchedule
   * @description POST /elderSvrMiniAPP/course/v1/get_course_schedule
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.course.GetCourseScheduleResponse']>
   */
  async courseServiceGetCourseSchedule(data: components['schemas']['api.elder.v1.course.GetCourseScheduleRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.course.GetCourseScheduleResponse']> {
    const url = '/elderSvrMiniAPP/course/v1/get_course_schedule';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.course.GetCourseScheduleResponse']>(requestConfig);
  },

  /**
   * courseServiceGetMyEnrollCourses
   * @description POST /elderSvrMiniAPP/course/v1/get_my_enroll_courses
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.course.GetMyEnrollCoursesResponse']>
   */
  async courseServiceGetMyEnrollCourses(data: components['schemas']['api.elder.v1.course.GetMyEnrollCoursesRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.course.GetMyEnrollCoursesResponse']> {
    const url = '/elderSvrMiniAPP/course/v1/get_my_enroll_courses';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.course.GetMyEnrollCoursesResponse']>(requestConfig);
  },

  /**
   * courseServiceGetNearbyCourses
   * @description POST /elderSvrMiniAPP/course/v1/get_nearby
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.course.GetNearbyCoursesResponse']>
   */
  async courseServiceGetNearbyCourses(data: components['schemas']['api.elder.v1.course.GetNearbyCoursesRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.course.GetNearbyCoursesResponse']> {
    const url = '/elderSvrMiniAPP/course/v1/get_nearby';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.course.GetNearbyCoursesResponse']>(requestConfig);
  },

  /**
   * courseServiceListCourseEnrolls
   * @description POST /elderSvrMiniAPP/course/v1/list_enrolls
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.course.ListCourseEnrollsResponse']>
   */
  async courseServiceListCourseEnrolls(data: components['schemas']['api.elder.v1.course.ListCourseEnrollsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.course.ListCourseEnrollsResponse']> {
    const url = '/elderSvrMiniAPP/course/v1/list_enrolls';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.course.ListCourseEnrollsResponse']>(requestConfig);
  },

  /**
   * emergencyCall
   * @description POST /elderSvrMiniAPP/emergency/v1/call
   * @param data 
   * @returns Promise<components['schemas']['business.v1.CallReply']>
   */
  async emergencyCall(data: components['schemas']['business.v1.CallRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.CallReply']> {
    const url = '/elderSvrMiniAPP/emergency/v1/call';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.CallReply']>(requestConfig);
  },

  /**
   * emergencyCancelCall
   * @description POST /elderSvrMiniAPP/emergency/v1/cancelCall
   * @param data 
   * @returns Promise<components['schemas']['business.v1.CancelCallReply']>
   */
  async emergencyCancelCall(data: components['schemas']['business.v1.CancelCallRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.CancelCallReply']> {
    const url = '/elderSvrMiniAPP/emergency/v1/cancelCall';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.CancelCallReply']>(requestConfig);
  },

  /**
   * emergencyCreate
   * @description POST /elderSvrMiniAPP/emergency/v1/create
   * @param data 
   * @returns Promise<components['schemas']['business.v1.CreateReply']>
   */
  async emergencyCreate(data: components['schemas']['business.v1.CreateRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.CreateReply']> {
    const url = '/elderSvrMiniAPP/emergency/v1/create';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.CreateReply']>(requestConfig);
  },

  /**
   * emergencyDescribeEmergencyTRTCInfo
   * @description POST /elderSvrMiniAPP/emergency/v1/describeEmergencyTRTCInfo
   * @param data 
   * @returns Promise<components['schemas']['business.v1.DescribeEmergencyTRTCInfoReply']>
   */
  async emergencyDescribeEmergencyTRTCInfo(data: components['schemas']['business.v1.DescribeEmergencyTRTCInfoRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.DescribeEmergencyTRTCInfoReply']> {
    const url = '/elderSvrMiniAPP/emergency/v1/describeEmergencyTRTCInfo';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.DescribeEmergencyTRTCInfoReply']>(requestConfig);
  },

  /**
   * emergencyDescribeEmergencyTRTCUsers
   * @description POST /elderSvrMiniAPP/emergency/v1/describeEmergencyTRTCUsers
   * @param data 
   * @returns Promise<components['schemas']['business.v1.DescribeEmergencyTRTCUsersReply']>
   */
  async emergencyDescribeEmergencyTRTCUsers(data: components['schemas']['business.v1.DescribeEmergencyTRTCUsersRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.DescribeEmergencyTRTCUsersReply']> {
    const url = '/elderSvrMiniAPP/emergency/v1/describeEmergencyTRTCUsers';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.DescribeEmergencyTRTCUsersReply']>(requestConfig);
  },

  /**
   * emergencyDescribeEmergencyTimelines
   * @description POST /elderSvrMiniAPP/emergency/v1/describeEmergencyTimelines
   * @param data 
   * @returns Promise<components['schemas']['business.v1.DescribeEmergencyTimelinesReply']>
   */
  async emergencyDescribeEmergencyTimelines(data: components['schemas']['business.v1.DescribeEmergencyTimelinesRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.DescribeEmergencyTimelinesReply']> {
    const url = '/elderSvrMiniAPP/emergency/v1/describeEmergencyTimelines';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.DescribeEmergencyTimelinesReply']>(requestConfig);
  },

  /**
   * emergencyMatchRespondRegion
   * @description POST /elderSvrMiniAPP/emergency/v1/matchRespondRegion
   * @param data 
   * @returns Promise<components['schemas']['business.v1.MatchRespondRegionReply']>
   */
  async emergencyMatchRespondRegion(data: components['schemas']['business.v1.MatchRespondRegionRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.MatchRespondRegionReply']> {
    const url = '/elderSvrMiniAPP/emergency/v1/matchRespondRegion';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.MatchRespondRegionReply']>(requestConfig);
  },

  /**
   * helpCenterServiceSyncUpdateRequestAddress
   * @description POST /elderSvrMiniAPP/help/v1/address/sync
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.SyncUpdateRequestAddressResponse']>
   */
  async helpCenterServiceSyncUpdateRequestAddress(data: components['schemas']['api.elder.help.v1.SyncUpdateRequestAddressRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.SyncUpdateRequestAddressResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/address/sync';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.SyncUpdateRequestAddressResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceGetCategoriesTree
   * @description POST /elderSvrMiniAPP/help/v1/categories/tree
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetCategoriesTreeResponse']>
   */
  async helpCenterServiceGetCategoriesTree(data: components['schemas']['api.elder.help.v1.GetCategoriesTreeRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetCategoriesTreeResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/categories/tree';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetCategoriesTreeResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceDeleteCategory
   * @description POST /elderSvrMiniAPP/help/v1/category/delete
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.DeleteCategoryResponse']>
   */
  async helpCenterServiceDeleteCategory(data: components['schemas']['api.elder.help.v1.DeleteCategoryRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.DeleteCategoryResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/category/delete';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.DeleteCategoryResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceListCategories
   * @description POST /elderSvrMiniAPP/help/v1/category/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.ListCategoriesResponse']>
   */
  async helpCenterServiceListCategories(data: components['schemas']['api.elder.help.v1.ListCategoriesRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListCategoriesResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/category/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.ListCategoriesResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceSearchHelpCategory
   * @description POST /elderSvrMiniAPP/help/v1/category/search
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.SearchHelpCategoryResponse']>
   */
  async helpCenterServiceSearchHelpCategory(data: components['schemas']['api.elder.help.v1.SearchHelpCategoryRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.SearchHelpCategoryResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/category/search';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.SearchHelpCategoryResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceGetHelpRequestCategorySummary
   * @description POST /elderSvrMiniAPP/help/v1/category/summary
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelpRequestCategorySummaryResponse']>
   */
  async helpCenterServiceGetHelpRequestCategorySummary(data: components['schemas']['api.elder.help.v1.GetHelpRequestCategorySummaryRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelpRequestCategorySummaryResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/category/summary';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetHelpRequestCategorySummaryResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceUpsertCategory
   * @description POST /elderSvrMiniAPP/help/v1/category/upsert
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.UpsertCategoryResponse']>
   */
  async helpCenterServiceUpsertCategory(data: components['schemas']['api.elder.help.v1.UpsertCategoryRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.UpsertCategoryResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/category/upsert';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.UpsertCategoryResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceGetCommunityCategories
   * @description POST /elderSvrMiniAPP/help/v1/community/categories
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetCommunityCategoriesResponse']>
   */
  async helpCenterServiceGetCommunityCategories(data: components['schemas']['api.elder.help.v1.GetCommunityCategoriesRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetCommunityCategoriesResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/community/categories';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetCommunityCategoriesResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceCreateOrUpdateContact
   * @description POST /elderSvrMiniAPP/help/v1/contact/create_or_update
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.CreateOrUpdateContactResponse']>
   */
  async helpCenterServiceCreateOrUpdateContact(data: components['schemas']['api.elder.help.v1.CreateOrUpdateContactRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.CreateOrUpdateContactResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/contact/create_or_update';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.CreateOrUpdateContactResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceDeleteContact
   * @description POST /elderSvrMiniAPP/help/v1/contact/delete
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.DeleteContactResponse']>
   */
  async helpCenterServiceDeleteContact(data: components['schemas']['api.elder.help.v1.DeleteContactRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.DeleteContactResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/contact/delete';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.DeleteContactResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceListUserContacts
   * @description POST /elderSvrMiniAPP/help/v1/contact/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.ListUserContactsResponse']>
   */
  async helpCenterServiceListUserContacts(data: components['schemas']['api.elder.help.v1.ListUserContactsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListUserContactsResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/contact/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.ListUserContactsResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceSyncUpdateContact
   * @description POST /elderSvrMiniAPP/help/v1/contact/sync
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.SyncUpdateContactResponse']>
   */
  async helpCenterServiceSyncUpdateContact(data: components['schemas']['api.elder.help.v1.SyncUpdateContactRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.SyncUpdateContactResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/contact/sync';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.SyncUpdateContactResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceGetOrgByHelpCategory
   * @description POST /elderSvrMiniAPP/help/v1/paid_org
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetOrgByHelpCategoryResponse']>
   */
  async helpCenterServiceGetOrgByHelpCategory(data: components['schemas']['api.elder.help.v1.GetOrgByHelpCategoryRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetOrgByHelpCategoryResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/paid_org';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetOrgByHelpCategoryResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceListOrgByCommunity
   * @description POST /elderSvrMiniAPP/help/v1/paid_org/by_community
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.ListOrgByCommunityResponse']>
   */
  async helpCenterServiceListOrgByCommunity(data: components['schemas']['api.elder.help.v1.ListOrgByCommunityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListOrgByCommunityResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/paid_org/by_community';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.ListOrgByCommunityResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceGetCommunityPaidOrg
   * @description POST /elderSvrMiniAPP/help/v1/paid_org/by_org
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetCommunityPaidOrgResponse']>
   */
  async helpCenterServiceGetCommunityPaidOrg(data: components['schemas']['api.elder.help.v1.GetCommunityPaidOrgRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetCommunityPaidOrgResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/paid_org/by_org';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetCommunityPaidOrgResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceCancelHelpRequest
   * @description POST /elderSvrMiniAPP/help/v1/request/cancel
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.CancelHelpRequestResponse']>
   */
  async helpCenterServiceCancelHelpRequest(data: components['schemas']['api.elder.help.v1.CancelHelpRequestRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.CancelHelpRequestResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/request/cancel';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.CancelHelpRequestResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceCreateHelpRequest
   * @description POST /elderSvrMiniAPP/help/v1/request/create
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.CreateHelpRequestResponse']>
   */
  async helpCenterServiceCreateHelpRequest(data: components['schemas']['api.elder.help.v1.CreateHelpRequestRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.CreateHelpRequestResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/request/create';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.CreateHelpRequestResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceCreateByThirdParty
   * @description POST /elderSvrMiniAPP/help/v1/request/create_by_third_party
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.CreateHelpRequestResponse']>
   */
  async helpCenterServiceCreateByThirdParty(data: components['schemas']['api.elder.help.v1.CreateHelpRequestThirdParty'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.CreateHelpRequestResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/request/create_by_third_party';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.CreateHelpRequestResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceCreateRetroactiveHelpRequest
   * @description POST /elderSvrMiniAPP/help/v1/request/create_retroactive
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.CreateRetroactiveHelpRequestResponse']>
   */
  async helpCenterServiceCreateRetroactiveHelpRequest(data: components['schemas']['api.elder.help.v1.CreateRetroactiveHelpRequestRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.CreateRetroactiveHelpRequestResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/request/create_retroactive';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.CreateRetroactiveHelpRequestResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceGetHelpRequestDetail
   * @description POST /elderSvrMiniAPP/help/v1/request/detail
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelpRequestDetailResponse']>
   */
  async helpCenterServiceGetHelpRequestDetail(data: components['schemas']['api.elder.help.v1.GetHelpRequestDetailRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelpRequestDetailResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/request/detail';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetHelpRequestDetailResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceFinishHelpRequest
   * @description POST /elderSvrMiniAPP/help/v1/request/finish
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.FinishHelpRequestResponse']>
   */
  async helpCenterServiceFinishHelpRequest(data: components['schemas']['api.elder.help.v1.FinishHelpRequestRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.FinishHelpRequestResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/request/finish';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.FinishHelpRequestResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceGetRetroactiveDraft
   * @description POST /elderSvrMiniAPP/help/v1/request/get_retroactive_draft
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetRetroactiveDraftResponse']>
   */
  async helpCenterServiceGetRetroactiveDraft(data: components['schemas']['api.elder.help.v1.GetRetroactiveDraftRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetRetroactiveDraftResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/request/get_retroactive_draft';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetRetroactiveDraftResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceGetStatusDetail
   * @description POST /elderSvrMiniAPP/help/v1/request/get_status_detail
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetStatusDetailResponse']>
   */
  async helpCenterServiceGetStatusDetail(data: components['schemas']['api.elder.help.v1.GetStatusDetailRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetStatusDetailResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/request/get_status_detail';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetStatusDetailResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceListHelpRequests
   * @description POST /elderSvrMiniAPP/help/v1/request/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.ListHelpRequestsResponse']>
   */
  async helpCenterServiceListHelpRequests(data: components['schemas']['api.elder.help.v1.ListHelpRequestsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListHelpRequestsResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/request/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.ListHelpRequestsResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceGetMyPublishedRequests
   * @description POST /elderSvrMiniAPP/help/v1/request/my_published
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetMyPublishedRequestsResponse']>
   */
  async helpCenterServiceGetMyPublishedRequests(data: components['schemas']['api.elder.help.v1.GetMyPublishedRequestsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetMyPublishedRequestsResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/request/my_published';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetMyPublishedRequestsResponse']>(requestConfig);
  },

  /**
   * helpCenterServicePreCheck
   * @description POST /elderSvrMiniAPP/help/v1/request/pre_check
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.PreCheckResponse']>
   */
  async helpCenterServicePreCheck(data: components['schemas']['api.elder.help.v1.PreCheckRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.PreCheckResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/request/pre_check';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.PreCheckResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceSaveRetroactiveDraft
   * @description POST /elderSvrMiniAPP/help/v1/request/save_retroactive_draft
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.SaveRetroactiveDraftResponse']>
   */
  async helpCenterServiceSaveRetroactiveDraft(data: components['schemas']['api.elder.help.v1.SaveRetroactiveDraftRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.SaveRetroactiveDraftResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/request/save_retroactive_draft';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.SaveRetroactiveDraftResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceSyncData
   * @description POST /elderSvrMiniAPP/help/v1/request/sync_data
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.SyncDataResponse']>
   */
  async helpCenterServiceSyncData(data: components['schemas']['api.elder.help.v1.SyncDataRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.SyncDataResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/request/sync_data';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.SyncDataResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceTriggerFillLocationForOldRequests
   * @description POST /elderSvrMiniAPP/help/v1/request/trigger_fill_location
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.TriggerFillLocationResponse']>
   */
  async helpCenterServiceTriggerFillLocationForOldRequests(data: components['schemas']['api.elder.help.v1.TriggerFillLocationRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.TriggerFillLocationResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/request/trigger_fill_location';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.TriggerFillLocationResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceUnFinishHelpRequest
   * @description POST /elderSvrMiniAPP/help/v1/request/un_finish
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.FinishHelpRequestResponse']>
   */
  async helpCenterServiceUnFinishHelpRequest(data: components['schemas']['api.elder.help.v1.FinishHelpRequestRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.FinishHelpRequestResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/request/un_finish';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.FinishHelpRequestResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceBatchUpdateCityInfo
   * @description POST /elderSvrMiniAPP/help/v1/request/update_city_info
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.BatchUpdateCityInfoResponse']>
   */
  async helpCenterServiceBatchUpdateCityInfo(data: components['schemas']['api.elder.help.v1.BatchUpdateCityInfoRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.BatchUpdateCityInfoResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/request/update_city_info';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.BatchUpdateCityInfoResponse']>(requestConfig);
  },

  /**
   * helpCenterServiceUpdateHelpRequestStatus
   * @description POST /elderSvrMiniAPP/help/v1/request/update_status
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.UpdateHelpRequestStatusResponse']>
   */
  async helpCenterServiceUpdateHelpRequestStatus(data: components['schemas']['api.elder.help.v1.UpdateHelpRequestStatusRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.UpdateHelpRequestStatusResponse']> {
    const url = '/elderSvrMiniAPP/help/v1/request/update_status';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.UpdateHelpRequestStatusResponse']>(requestConfig);
  },

  /**
   * helperServiceApplyHelper
   * @description POST /elderSvrMiniAPP/helper/v1/apply
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.ApplyHelperResponse']>
   */
  async helperServiceApplyHelper(data: components['schemas']['api.elder.help.v1.ApplyHelperRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ApplyHelperResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/apply';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.ApplyHelperResponse']>(requestConfig);
  },

  /**
   * helperServiceApproveHelperApply
   * @description POST /elderSvrMiniAPP/helper/v1/apply/approve
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.ApproveHelperApplyResponse']>
   */
  async helperServiceApproveHelperApply(data: components['schemas']['api.elder.help.v1.ApproveHelperApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ApproveHelperApplyResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/apply/approve';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.ApproveHelperApplyResponse']>(requestConfig);
  },

  /**
   * helperServiceCancelHelperApply
   * @description POST /elderSvrMiniAPP/helper/v1/apply/cancel
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.CancelHelperApplyResponse']>
   */
  async helperServiceCancelHelperApply(data: components['schemas']['api.elder.help.v1.CancelHelperApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.CancelHelperApplyResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/apply/cancel';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.CancelHelperApplyResponse']>(requestConfig);
  },

  /**
   * helperServiceGetHelperApply
   * @description POST /elderSvrMiniAPP/helper/v1/apply/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelperApplyResponse']>
   */
  async helperServiceGetHelperApply(data: components['schemas']['api.elder.help.v1.GetHelperApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelperApplyResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/apply/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetHelperApplyResponse']>(requestConfig);
  },

  /**
   * helperServiceListHelperApply
   * @description POST /elderSvrMiniAPP/helper/v1/apply/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.ListHelperApplyResponse']>
   */
  async helperServiceListHelperApply(data: components['schemas']['api.elder.help.v1.ListHelperApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListHelperApplyResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/apply/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.ListHelperApplyResponse']>(requestConfig);
  },

  /**
   * helperServiceRefuseHelperApply
   * @description POST /elderSvrMiniAPP/helper/v1/apply/refuse
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.RefuseHelperApplyResponse']>
   */
  async helperServiceRefuseHelperApply(data: components['schemas']['api.elder.help.v1.RefuseHelperApplyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.RefuseHelperApplyResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/apply/refuse';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.RefuseHelperApplyResponse']>(requestConfig);
  },

  /**
   * helperServiceCommentHelpEnrollment
   * @description POST /elderSvrMiniAPP/helper/v1/comment
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.CommentHelpEnrollmentResponse']>
   */
  async helperServiceCommentHelpEnrollment(data: components['schemas']['api.elder.help.v1.CommentHelpEnrollmentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.CommentHelpEnrollmentResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/comment';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.CommentHelpEnrollmentResponse']>(requestConfig);
  },

  /**
   * helperServiceGetRequestComment
   * @description POST /elderSvrMiniAPP/helper/v1/comment/by_request
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetRequestCommentResponse']>
   */
  async helperServiceGetRequestComment(data: components['schemas']['api.elder.help.v1.GetRequestCommentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetRequestCommentResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/comment/by_request';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetRequestCommentResponse']>(requestConfig);
  },

  /**
   * helperServiceTriggerPopulateCommentStatics
   * @description POST /elderSvrMiniAPP/helper/v1/comment/migration
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.TriggerPopulateCommentStaticsResponse']>
   */
  async helperServiceTriggerPopulateCommentStatics(data: components['schemas']['api.elder.help.v1.TriggerPopulateCommentStaticsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.TriggerPopulateCommentStaticsResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/comment/migration';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.TriggerPopulateCommentStaticsResponse']>(requestConfig);
  },

  /**
   * helperServiceGetAllResidentCommunities
   * @description POST /elderSvrMiniAPP/helper/v1/communities
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetAllResidentCommunitiesResponse']>
   */
  async helperServiceGetAllResidentCommunities(data: components['schemas']['api.elder.help.v1.GetAllResidentCommunitiesRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetAllResidentCommunitiesResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/communities';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetAllResidentCommunitiesResponse']>(requestConfig);
  },

  /**
   * helperServiceGetHelperRequestEnrollment
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentResponse']>
   */
  async helperServiceGetHelperRequestEnrollment(data: components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/enrollment/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentResponse']>(requestConfig);
  },

  /**
   * helperServiceListHelpEnrollmentHomPage
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/home_page
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.ListHelpEnrollmentHomPageResponse']>
   */
  async helperServiceListHelpEnrollmentHomPage(data: components['schemas']['api.elder.help.v1.ListHelpEnrollmentHomPageRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListHelpEnrollmentHomPageResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/enrollment/home_page';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.ListHelpEnrollmentHomPageResponse']>(requestConfig);
  },

  /**
   * helperServiceListHelperRequestEnrollment
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.ListHelperRequestEnrollmentResponse']>
   */
  async helperServiceListHelperRequestEnrollment(data: components['schemas']['api.elder.help.v1.ListHelperRequestEnrollmentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListHelperRequestEnrollmentResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/enrollment/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.ListHelperRequestEnrollmentResponse']>(requestConfig);
  },

  /**
   * helperServiceListHelpRequestEnrollmentByOrg
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/list/by_org
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.ListHelpRequestEnrollmentByOrgResponse']>
   */
  async helperServiceListHelpRequestEnrollmentByOrg(data: components['schemas']['api.elder.help.v1.ListHelpRequestEnrollmentByOrgRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListHelpRequestEnrollmentByOrgResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/enrollment/list/by_org';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.ListHelpRequestEnrollmentByOrgResponse']>(requestConfig);
  },

  /**
   * helperServiceListEnrollmentPhotoByOrgAndCommunity
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/photo/by_org
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.ListEnrollmentPhotoByOrgAndCommunityResponse']>
   */
  async helperServiceListEnrollmentPhotoByOrgAndCommunity(data: components['schemas']['api.elder.help.v1.ListEnrollmentPhotoByOrgAndCommunityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListEnrollmentPhotoByOrgAndCommunityResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/enrollment/photo/by_org';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.ListEnrollmentPhotoByOrgAndCommunityResponse']>(requestConfig);
  },

  /**
   * helperServiceGetHelperEnrollmentPhoto
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/photo/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelperEnrollmentPhotoResponse']>
   */
  async helperServiceGetHelperEnrollmentPhoto(data: components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelperEnrollmentPhotoResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/enrollment/photo/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetHelperEnrollmentPhotoResponse']>(requestConfig);
  },

  /**
   * helperServiceGetHelperRequestEnrollmentUser
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/user/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentUserResponse']>
   */
  async helperServiceGetHelperRequestEnrollmentUser(data: components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentUserRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentUserResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/enrollment/user/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentUserResponse']>(requestConfig);
  },

  /**
   * helperServiceGetHelper
   * @description POST /elderSvrMiniAPP/helper/v1/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelperResponse']>
   */
  async helperServiceGetHelper(data: components['schemas']['api.elder.help.v1.GetHelperRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelperResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetHelperResponse']>(requestConfig);
  },

  /**
   * helperServiceGetHelperWithCommunity
   * @description POST /elderSvrMiniAPP/helper/v1/get_by_community
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelperResponse']>
   */
  async helperServiceGetHelperWithCommunity(data: components['schemas']['api.elder.help.v1.GetHelperWithCommunityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelperResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/get_by_community';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetHelperResponse']>(requestConfig);
  },

  /**
   * helperServiceGetLastAuthorizedHelper
   * @description POST /elderSvrMiniAPP/helper/v1/get_last_authorized
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelperResponse']>
   */
  async helperServiceGetLastAuthorizedHelper(data: components['schemas']['api.elder.help.v1.GetHelperRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelperResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/get_last_authorized';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetHelperResponse']>(requestConfig);
  },

  /**
   * helperServiceTriggerPopulateLevelStatics
   * @description POST /elderSvrMiniAPP/helper/v1/level/migration
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.TriggerPopulateCommentStaticsResponse']>
   */
  async helperServiceTriggerPopulateLevelStatics(data: components['schemas']['api.elder.help.v1.TriggerPopulateCommentStaticsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.TriggerPopulateCommentStaticsResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/level/migration';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.TriggerPopulateCommentStaticsResponse']>(requestConfig);
  },

  /**
   * helperServiceListResidentLikeCnt
   * @description POST /elderSvrMiniAPP/helper/v1/like_cnt
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.ListResidentLikeCntResponse']>
   */
  async helperServiceListResidentLikeCnt(data: components['schemas']['api.elder.help.v1.ListResidentLikeCntRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListResidentLikeCntResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/like_cnt';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.ListResidentLikeCntResponse']>(requestConfig);
  },

  /**
   * helperServiceGetMyEnrolledHelpRequest
   * @description POST /elderSvrMiniAPP/helper/v1/my_enrolled
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.ListHelperRequestEnrollmentResponse']>
   */
  async helperServiceGetMyEnrolledHelpRequest(data: components['schemas']['api.elder.help.v1.GetMyEnrolledHelpRequestRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListHelperRequestEnrollmentResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/my_enrolled';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.ListHelperRequestEnrollmentResponse']>(requestConfig);
  },

  /**
   * helperServiceGetResidents2Comment
   * @description POST /elderSvrMiniAPP/helper/v1/need_to_comment
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetResidents2CommentResponse']>
   */
  async helperServiceGetResidents2Comment(data: components['schemas']['api.elder.help.v1.GetResidents2CommentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetResidents2CommentResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/need_to_comment';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetResidents2CommentResponse']>(requestConfig);
  },

  /**
   * helperServiceEnrollHelpRequest
   * @description POST /elderSvrMiniAPP/helper/v1/request/enroll
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.EnrollHelpRequestResponse']>
   */
  async helperServiceEnrollHelpRequest(data: components['schemas']['api.elder.help.v1.EnrollHelpRequestRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.EnrollHelpRequestResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/request/enroll';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.EnrollHelpRequestResponse']>(requestConfig);
  },

  /**
   * helperServiceCancelEnrollHelpRequest
   * @description POST /elderSvrMiniAPP/helper/v1/request/enroll/cancel
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.CancelHelpRequestEnrollmentResponse']>
   */
  async helperServiceCancelEnrollHelpRequest(data: components['schemas']['api.elder.help.v1.CancelHelpRequestEnrollmentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.CancelHelpRequestEnrollmentResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/request/enroll/cancel';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.CancelHelpRequestEnrollmentResponse']>(requestConfig);
  },

  /**
   * helperServiceFinishEnrollHelpRequest
   * @description POST /elderSvrMiniAPP/helper/v1/request/finish
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.FinishHelpEnrollmentResponse']>
   */
  async helperServiceFinishEnrollHelpRequest(data: components['schemas']['api.elder.help.v1.FinishHelpEnrollmentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.FinishHelpEnrollmentResponse']> {
    const url = '/elderSvrMiniAPP/helper/v1/request/finish';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.FinishHelpEnrollmentResponse']>(requestConfig);
  },

  /**
   * hospitalCheckSeekMedicalCondition
   * @description POST /elderSvrMiniAPP/hospital/v1/checkSeekMedicalCondition
   * @param data 
   * @returns Promise<components['schemas']['seek_medical.v1.CheckSeekMedicalConditionReply']>
   */
  async hospitalCheckSeekMedicalCondition(data: components['schemas']['seek_medical.v1.CheckSeekMedicalConditionRequest'], config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.CheckSeekMedicalConditionReply']> {
    const url = '/elderSvrMiniAPP/hospital/v1/checkSeekMedicalCondition';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['seek_medical.v1.CheckSeekMedicalConditionReply']>(requestConfig);
  },

  /**
   * hospitalDescribeDoctor
   * @description POST /elderSvrMiniAPP/hospital/v1/describeDoctor
   * @param data 
   * @returns Promise<components['schemas']['seek_medical.v1.DescribeDoctorReply']>
   */
  async hospitalDescribeDoctor(data: components['schemas']['seek_medical.v1.DescribeDoctorRequest'], config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.DescribeDoctorReply']> {
    const url = '/elderSvrMiniAPP/hospital/v1/describeDoctor';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['seek_medical.v1.DescribeDoctorReply']>(requestConfig);
  },

  /**
   * hospitalDescribeDoctorSchedule
   * @description POST /elderSvrMiniAPP/hospital/v1/describeDoctorSchedule
   * @param data 
   * @returns Promise<components['schemas']['seek_medical.v1.DescribeDoctorScheduleReply']>
   */
  async hospitalDescribeDoctorSchedule(data: components['schemas']['seek_medical.v1.DescribeDoctorScheduleRequest'], config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.DescribeDoctorScheduleReply']> {
    const url = '/elderSvrMiniAPP/hospital/v1/describeDoctorSchedule';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['seek_medical.v1.DescribeDoctorScheduleReply']>(requestConfig);
  },

  /**
   * hospitalDescribeElderInfoList
   * @description POST /elderSvrMiniAPP/hospital/v1/describeElderInfoList
   * @param data 
   * @returns Promise<components['schemas']['seek_medical.v1.DescribeElderInfoListReply']>
   */
  async hospitalDescribeElderInfoList(data: components['schemas']['seek_medical.v1.DescribeElderInfoListRequest'], config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.DescribeElderInfoListReply']> {
    const url = '/elderSvrMiniAPP/hospital/v1/describeElderInfoList';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['seek_medical.v1.DescribeElderInfoListReply']>(requestConfig);
  },

  /**
   * hospitalDescribeHospital
   * @description POST /elderSvrMiniAPP/hospital/v1/describeHospital
   * @param data 
   * @returns Promise<components['schemas']['seek_medical.v1.DescribeHospitalReply']>
   */
  async hospitalDescribeHospital(data: components['schemas']['seek_medical.v1.DescribeHospitalRequest'], config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.DescribeHospitalReply']> {
    const url = '/elderSvrMiniAPP/hospital/v1/describeHospital';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['seek_medical.v1.DescribeHospitalReply']>(requestConfig);
  },

  /**
   * hospitalGetHospitalInfoByDoctorID
   * @description POST /elderSvrMiniAPP/hospital/v1/getHospitalInfoByDoctorID
   * @param data 
   * @returns Promise<components['schemas']['seek_medical.v1.GetHospitalInfoByDoctorIDReply']>
   */
  async hospitalGetHospitalInfoByDoctorID(data: components['schemas']['seek_medical.v1.GetHospitalInfoByDoctorIDRequest'], config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.GetHospitalInfoByDoctorIDReply']> {
    const url = '/elderSvrMiniAPP/hospital/v1/getHospitalInfoByDoctorID';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['seek_medical.v1.GetHospitalInfoByDoctorIDReply']>(requestConfig);
  },

  /**
   * hospitalHealthMessageInfo
   * @description POST /elderSvrMiniAPP/hospital/v1/healthMessageInfo
   * @param data 
   * @returns Promise<components['schemas']['seek_medical.v1.HealthMessageInfoReply']>
   */
  async hospitalHealthMessageInfo(data: components['schemas']['seek_medical.v1.HealthMessageInfoRequest'], config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.HealthMessageInfoReply']> {
    const url = '/elderSvrMiniAPP/hospital/v1/healthMessageInfo';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['seek_medical.v1.HealthMessageInfoReply']>(requestConfig);
  },

  /**
   * hospitalHealthMessageList
   * @description POST /elderSvrMiniAPP/hospital/v1/healthMessageList
   * @param data 
   * @returns Promise<components['schemas']['seek_medical.v1.HealthMessageListReply']>
   */
  async hospitalHealthMessageList(data: components['schemas']['seek_medical.v1.HealthMessageListRequest'], config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.HealthMessageListReply']> {
    const url = '/elderSvrMiniAPP/hospital/v1/healthMessageList';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['seek_medical.v1.HealthMessageListReply']>(requestConfig);
  },

  /**
   * hospitalCheckElderSubscribeHealthMessage
   * @description POST /elderSvrMiniAPP/hospital/v1/sheckElderSubscribeHealthMessage
   * @param data 
   * @returns Promise<components['schemas']['seek_medical.v1.CheckElderSubscribeHealthMessageReply']>
   */
  async hospitalCheckElderSubscribeHealthMessage(data: components['schemas']['seek_medical.v1.HospitalNullBodyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.CheckElderSubscribeHealthMessageReply']> {
    const url = '/elderSvrMiniAPP/hospital/v1/sheckElderSubscribeHealthMessage';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['seek_medical.v1.CheckElderSubscribeHealthMessageReply']>(requestConfig);
  },

  /**
   * imGetUserSig
   * @description POST /elderSvrMiniAPP/im/v1/getUserSig
   * @param data 
   * @returns Promise<components['schemas']['business.v1.GetUserSigReply']>
   */
  async imGetUserSig(data: components['schemas']['business.v1.ImNullBodyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.GetUserSigReply']> {
    const url = '/elderSvrMiniAPP/im/v1/getUserSig';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.GetUserSigReply']>(requestConfig);
  },

  /**
   * imImConfig
   * @description POST /elderSvrMiniAPP/im/v1/imConfig
   * @param data 
   * @returns Promise<components['schemas']['business.v1.ImConfigReply']>
   */
  async imImConfig(data: components['schemas']['business.v1.ImNullBodyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ImConfigReply']> {
    const url = '/elderSvrMiniAPP/im/v1/imConfig';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.ImConfigReply']>(requestConfig);
  },

  /**
   * loginLogout
   * @description POST /elderSvrMiniAPP/login/v1/logout
   * @param data 
   * @returns Promise<components['schemas']['system.v1.LoginOperateReply']>
   */
  async loginLogout(data: components['schemas']['system.v1.LogoutRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.LoginOperateReply']> {
    const url = '/elderSvrMiniAPP/login/v1/logout';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.LoginOperateReply']>(requestConfig);
  },

  /**
   * loginRefresh
   * @description POST /elderSvrMiniAPP/login/v1/refresh
   * @param data 
   * @returns Promise<components['schemas']['system.v1.RefreshReply']>
   */
  async loginRefresh(data: components['schemas']['system.v1.RefreshRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.RefreshReply']> {
    const url = '/elderSvrMiniAPP/login/v1/refresh';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.RefreshReply']>(requestConfig);
  },

  /**
   * loginWxLogin
   * @description POST /elderSvrMiniAPP/login/v1/wxLogin
   * @param data 
   * @returns Promise<components['schemas']['system.v1.WxLoginReply']>
   */
  async loginWxLogin(data: components['schemas']['system.v1.WxLoginRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.WxLoginReply']> {
    const url = '/elderSvrMiniAPP/login/v1/wxLogin';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.WxLoginReply']>(requestConfig);
  },

  /**
   * messageModifyMiniProgromMessageSubscribe
   * @description POST /elderSvrMiniAPP/message/v1/ModifyMiniProgromMessageSubscribe
   * @param data 
   * @returns Promise<components['schemas']['business.v1.MessageOperateReply']>
   */
  async messageModifyMiniProgromMessageSubscribe(data: components['schemas']['business.v1.ModifyMiniProgromMessageSubscribeRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.MessageOperateReply']> {
    const url = '/elderSvrMiniAPP/message/v1/ModifyMiniProgromMessageSubscribe';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.MessageOperateReply']>(requestConfig);
  },

  /**
   * organizationGetOrganization
   * @description POST /elderSvrMiniAPP/organization/v1/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.organization.v1.GetOrganizationResponse']>
   */
  async organizationGetOrganization(data: components['schemas']['api.elder.organization.v1.GetOrganizationRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.organization.v1.GetOrganizationResponse']> {
    const url = '/elderSvrMiniAPP/organization/v1/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.organization.v1.GetOrganizationResponse']>(requestConfig);
  },

  /**
   * organizationJoinOrg
   * @description POST /elderSvrMiniAPP/organization/v1/join
   * @param data 
   * @returns Promise<components['schemas']['api.elder.organization.v1.JoinOrgResponse']>
   */
  async organizationJoinOrg(data: components['schemas']['api.elder.organization.v1.JoinOrgRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.organization.v1.JoinOrgResponse']> {
    const url = '/elderSvrMiniAPP/organization/v1/join';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.organization.v1.JoinOrgResponse']>(requestConfig);
  },

  /**
   * paymentServiceCloseOrder
   * @description POST /elderSvrMiniAPP/payment/v1/close_order
   * @param data 
   * @returns Promise<components['schemas']['api.elder.payment.v1.CloseOrderRes']>
   */
  async paymentServiceCloseOrder(data: components['schemas']['api.elder.payment.v1.CloseOrderReq'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.payment.v1.CloseOrderRes']> {
    const url = '/elderSvrMiniAPP/payment/v1/close_order';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.payment.v1.CloseOrderRes']>(requestConfig);
  },

  /**
   * paymentServiceCompleteOrder
   * @description POST /elderSvrMiniAPP/payment/v1/complete_order
   * @param data 
   * @returns Promise<components['schemas']['api.elder.payment.v1.CompleteOrderRes']>
   */
  async paymentServiceCompleteOrder(data: components['schemas']['api.elder.payment.v1.CompleteOrderReq'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.payment.v1.CompleteOrderRes']> {
    const url = '/elderSvrMiniAPP/payment/v1/complete_order';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.payment.v1.CompleteOrderRes']>(requestConfig);
  },

  /**
   * paymentServiceGetWxPaySign
   * @description POST /elderSvrMiniAPP/payment/v1/get_wx_pay_sign
   * @param data 
   * @returns Promise<components['schemas']['api.elder.payment.v1.GetWxPaySignRes']>
   */
  async paymentServiceGetWxPaySign(data: components['schemas']['api.elder.payment.v1.GetWxPaySignReq'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.payment.v1.GetWxPaySignRes']> {
    const url = '/elderSvrMiniAPP/payment/v1/get_wx_pay_sign';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.payment.v1.GetWxPaySignRes']>(requestConfig);
  },

  /**
   * paymentServiceListTransactions
   * @description POST /elderSvrMiniAPP/payment/v1/list_transactions
   * @param data 
   * @returns Promise<components['schemas']['api.elder.payment.v1.ListOrderRes']>
   */
  async paymentServiceListTransactions(data: string, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.payment.v1.ListOrderRes']> {
    const url = '/elderSvrMiniAPP/payment/v1/list_transactions';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.payment.v1.ListOrderRes']>(requestConfig);
  },

  /**
   * paymentServicePrePay
   * @description POST /elderSvrMiniAPP/payment/v1/pre_pay
   * @param data 
   * @returns Promise<components['schemas']['api.elder.payment.v1.PrePayRes']>
   */
  async paymentServicePrePay(data: components['schemas']['api.elder.payment.v1.PrePayReq'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.payment.v1.PrePayRes']> {
    const url = '/elderSvrMiniAPP/payment/v1/pre_pay';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.payment.v1.PrePayRes']>(requestConfig);
  },

  /**
   * paymentServiceRefund
   * @description POST /elderSvrMiniAPP/payment/v1/refund
   * @param data 
   * @returns Promise<components['schemas']['api.elder.payment.v1.RefundRes']>
   */
  async paymentServiceRefund(data: components['schemas']['api.elder.payment.v1.RefundReq'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.payment.v1.RefundRes']> {
    const url = '/elderSvrMiniAPP/payment/v1/refund';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.payment.v1.RefundRes']>(requestConfig);
  },

  /**
   * recruitmentServiceListRecruitApplicants
   * @description POST /elderSvrMiniAPP/recruit/v1/applicants
   * @param data 
   * @returns Promise<components['schemas']['api.elder.activity.v1.ListRecruitApplicantsResponse']>
   */
  async recruitmentServiceListRecruitApplicants(data: components['schemas']['api.elder.activity.v1.ListRecruitApplicantsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.ListRecruitApplicantsResponse']> {
    const url = '/elderSvrMiniAPP/recruit/v1/applicants';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.activity.v1.ListRecruitApplicantsResponse']>(requestConfig);
  },

  /**
   * recruitmentServiceApplyRecruitCampaign
   * @description POST /elderSvrMiniAPP/recruit/v1/apply
   * @param data 
   * @returns Promise<components['schemas']['api.elder.activity.v1.ApplyRecruitCampaignResponse']>
   */
  async recruitmentServiceApplyRecruitCampaign(data: components['schemas']['api.elder.activity.v1.ApplyRecruitCampaignRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.ApplyRecruitCampaignResponse']> {
    const url = '/elderSvrMiniAPP/recruit/v1/apply';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.activity.v1.ApplyRecruitCampaignResponse']>(requestConfig);
  },

  /**
   * recruitmentServiceCheckRecruitApplied
   * @description POST /elderSvrMiniAPP/recruit/v1/check_applied
   * @param data 
   * @returns Promise<components['schemas']['api.elder.activity.v1.CheckRecruitAppliedResponse']>
   */
  async recruitmentServiceCheckRecruitApplied(data: components['schemas']['api.elder.activity.v1.CheckRecruitAppliedRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.CheckRecruitAppliedResponse']> {
    const url = '/elderSvrMiniAPP/recruit/v1/check_applied';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.activity.v1.CheckRecruitAppliedResponse']>(requestConfig);
  },

  /**
   * recruitmentServiceCreateRecruitCampaign
   * @description POST /elderSvrMiniAPP/recruit/v1/create
   * @param data 
   * @returns Promise<components['schemas']['api.elder.activity.v1.CreateRecruitCampaignResponse']>
   */
  async recruitmentServiceCreateRecruitCampaign(data: components['schemas']['api.elder.activity.v1.CreateRecruitCampaignRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.CreateRecruitCampaignResponse']> {
    const url = '/elderSvrMiniAPP/recruit/v1/create';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.activity.v1.CreateRecruitCampaignResponse']>(requestConfig);
  },

  /**
   * recruitmentServiceDeleteRecruitCampaign
   * @description POST /elderSvrMiniAPP/recruit/v1/delete
   * @param data 
   * @returns Promise<components['schemas']['api.elder.activity.v1.DeleteRecruitCampaignResponse']>
   */
  async recruitmentServiceDeleteRecruitCampaign(data: components['schemas']['api.elder.activity.v1.DeleteRecruitCampaignRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.DeleteRecruitCampaignResponse']> {
    const url = '/elderSvrMiniAPP/recruit/v1/delete';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.activity.v1.DeleteRecruitCampaignResponse']>(requestConfig);
  },

  /**
   * recruitmentServiceListRecruitCampaigns
   * @description POST /elderSvrMiniAPP/recruit/v1/list
   * @param data 
   * @returns Promise<components['schemas']['api.elder.activity.v1.ListRecruitCampaignsResponse']>
   */
  async recruitmentServiceListRecruitCampaigns(data: components['schemas']['api.elder.activity.v1.ListRecruitCampaignsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.ListRecruitCampaignsResponse']> {
    const url = '/elderSvrMiniAPP/recruit/v1/list';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.activity.v1.ListRecruitCampaignsResponse']>(requestConfig);
  },

  /**
   * restaurantServiceGetOrderHistory
   * @description POST /elderSvrMiniAPP/restaurant/v1/getOrderHistory
   * @param data 
   * @returns Promise<components['schemas']['api.food_delivery.v1.OrderHistoryResponse']>
   */
  async restaurantServiceGetOrderHistory(data: components['schemas']['api.food_delivery.v1.OrderHistoryRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.OrderHistoryResponse']> {
    const url = '/elderSvrMiniAPP/restaurant/v1/getOrderHistory';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.food_delivery.v1.OrderHistoryResponse']>(requestConfig);
  },

  /**
   * restaurantServiceGetRestaurantDetail
   * @description POST /elderSvrMiniAPP/restaurant/v1/getRestaurantDetail
   * @param data 
   * @returns Promise<components['schemas']['api.food_delivery.v1.RestaurantDetailResponse']>
   */
  async restaurantServiceGetRestaurantDetail(data: components['schemas']['api.food_delivery.v1.RestaurantDetailRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.RestaurantDetailResponse']> {
    const url = '/elderSvrMiniAPP/restaurant/v1/getRestaurantDetail';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.food_delivery.v1.RestaurantDetailResponse']>(requestConfig);
  },

  /**
   * restaurantServiceGetRestaurantMenu
   * @description POST /elderSvrMiniAPP/restaurant/v1/getRestaurantMenu
   * @param data 
   * @returns Promise<components['schemas']['api.food_delivery.v1.MenuResponse']>
   */
  async restaurantServiceGetRestaurantMenu(data: components['schemas']['api.food_delivery.v1.MenuRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.MenuResponse']> {
    const url = '/elderSvrMiniAPP/restaurant/v1/getRestaurantMenu';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.food_delivery.v1.MenuResponse']>(requestConfig);
  },

  /**
   * restaurantServiceGetScanHistory
   * @description POST /elderSvrMiniAPP/restaurant/v1/getScanHistory
   * @param data 
   * @returns Promise<components['schemas']['api.food_delivery.v1.ScanHistoryResponse']>
   */
  async restaurantServiceGetScanHistory(data: components['schemas']['api.food_delivery.v1.ScanHistoryRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.ScanHistoryResponse']> {
    const url = '/elderSvrMiniAPP/restaurant/v1/getScanHistory';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.food_delivery.v1.ScanHistoryResponse']>(requestConfig);
  },

  /**
   * restaurantServiceImportMenu
   * @description POST /elderSvrMiniAPP/restaurant/v1/import
   * @param data 
   * @returns Promise<components['schemas']['api.food_delivery.v1.ImportMenuReply']>
   */
  async restaurantServiceImportMenu(data: components['schemas']['api.food_delivery.v1.ImportMenuRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.ImportMenuReply']> {
    const url = '/elderSvrMiniAPP/restaurant/v1/import';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.food_delivery.v1.ImportMenuReply']>(requestConfig);
  },

  /**
   * restaurantServiceListOrders
   * @description POST /elderSvrMiniAPP/restaurant/v1/listOrders
   * @param data 
   * @returns Promise<components['schemas']['api.food_delivery.v1.ListOrdersResponse']>
   */
  async restaurantServiceListOrders(data: components['schemas']['api.food_delivery.v1.ListOrdersRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.ListOrdersResponse']> {
    const url = '/elderSvrMiniAPP/restaurant/v1/listOrders';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.food_delivery.v1.ListOrdersResponse']>(requestConfig);
  },

  /**
   * restaurantServicePlaceOrder
   * @description POST /elderSvrMiniAPP/restaurant/v1/placeOrder
   * @param data 
   * @returns Promise<components['schemas']['api.food_delivery.v1.PlaceOrderResponse']>
   */
  async restaurantServicePlaceOrder(data: components['schemas']['api.food_delivery.v1.PlaceOrderRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.PlaceOrderResponse']> {
    const url = '/elderSvrMiniAPP/restaurant/v1/placeOrder';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.food_delivery.v1.PlaceOrderResponse']>(requestConfig);
  },

  /**
   * restaurantServiceSearchInAreaRestaurants
   * @description POST /elderSvrMiniAPP/restaurant/v1/searchInAreaRestaurants
   * @param data 
   * @returns Promise<components['schemas']['api.food_delivery.v1.SearchInAreaResponse']>
   */
  async restaurantServiceSearchInAreaRestaurants(data: components['schemas']['api.food_delivery.v1.SearchInAreaRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.SearchInAreaResponse']> {
    const url = '/elderSvrMiniAPP/restaurant/v1/searchInAreaRestaurants';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.food_delivery.v1.SearchInAreaResponse']>(requestConfig);
  },

  /**
   * syncRestaurantServiceSyncTask
   * @description POST /elderSvrMiniAPP/restaurant/v1/sync_task
   * @param data 
   * @returns Promise<components['schemas']['api.food_delivery.v1.ImportMenuReply']>
   */
  async syncRestaurantServiceSyncTask(data: components['schemas']['api.food_delivery.v1.ImportMenuRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.ImportMenuReply']> {
    const url = '/elderSvrMiniAPP/restaurant/v1/sync_task';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.food_delivery.v1.ImportMenuReply']>(requestConfig);
  },

  /**
   * restaurantServiceUpdateMenuItems
   * @description POST /elderSvrMiniAPP/restaurant/v1/updateMenuItems
   * @param data 
   * @returns Promise<components['schemas']['api.food_delivery.v1.UpdateMenuItemsResponse']>
   */
  async restaurantServiceUpdateMenuItems(data: components['schemas']['api.food_delivery.v1.UpdateMenuItemsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.UpdateMenuItemsResponse']> {
    const url = '/elderSvrMiniAPP/restaurant/v1/updateMenuItems';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.food_delivery.v1.UpdateMenuItemsResponse']>(requestConfig);
  },

  /**
   * restaurantServiceUpdateMenuItemsIncremental
   * @description POST /elderSvrMiniAPP/restaurant/v1/updateMenuItemsIncremental
   * @param data 
   * @returns Promise<components['schemas']['api.food_delivery.v1.UpdateMenuItemsIncrementalResponse']>
   */
  async restaurantServiceUpdateMenuItemsIncremental(data: components['schemas']['api.food_delivery.v1.UpdateMenuItemsIncrementalRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.UpdateMenuItemsIncrementalResponse']> {
    const url = '/elderSvrMiniAPP/restaurant/v1/updateMenuItemsIncremental';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.food_delivery.v1.UpdateMenuItemsIncrementalResponse']>(requestConfig);
  },

  /**
   * restaurantServiceUploadMenuImages
   * @description POST /elderSvrMiniAPP/restaurant/v1/upload
   * @param data 
   * @returns Promise<components['schemas']['api.food_delivery.v1.UploadMenuImagesResponse']>
   */
  async restaurantServiceUploadMenuImages(data: components['schemas']['api.food_delivery.v1.UploadMenuImagesRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.UploadMenuImagesResponse']> {
    const url = '/elderSvrMiniAPP/restaurant/v1/upload';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.food_delivery.v1.UploadMenuImagesResponse']>(requestConfig);
  },

  /**
   * restaurantServiceUpsertRestaurantInfo
   * @description POST /elderSvrMiniAPP/restaurant/v1/upsertRestaurantInfo
   * @param data 
   * @returns Promise<components['schemas']['api.food_delivery.v1.UpsertRestaurantInfoResponse']>
   */
  async restaurantServiceUpsertRestaurantInfo(data: components['schemas']['api.food_delivery.v1.UpsertRestaurantInfoRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.UpsertRestaurantInfoResponse']> {
    const url = '/elderSvrMiniAPP/restaurant/v1/upsertRestaurantInfo';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.food_delivery.v1.UpsertRestaurantInfoResponse']>(requestConfig);
  },

  /**
   * serviceElderConfirmServiceCompleted
   * @description POST /elderSvrMiniAPP/service/v1/ElderConfirmServiceCompleted
   * @param data 
   * @returns Promise<components['schemas']['business.v1.ServiceOperateReply']>
   */
  async serviceElderConfirmServiceCompleted(data: components['schemas']['business.v1.ElderConfirmServiceCompletedRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ServiceOperateReply']> {
    const url = '/elderSvrMiniAPP/service/v1/ElderConfirmServiceCompleted';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.ServiceOperateReply']>(requestConfig);
  },

  /**
   * serviceBrowseArticle
   * @description POST /elderSvrMiniAPP/service/v1/browseArticle
   * @param data 
   * @returns Promise<components['schemas']['business.v1.BrowseArticleReply']>
   */
  async serviceBrowseArticle(data: components['schemas']['business.v1.BrowseArticleRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.BrowseArticleReply']> {
    const url = '/elderSvrMiniAPP/service/v1/browseArticle';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.BrowseArticleReply']>(requestConfig);
  },

  /**
   * serviceCancelService
   * @description POST /elderSvrMiniAPP/service/v1/cancel
   * @param data 
   * @returns Promise<components['schemas']['business.v1.ServiceOperateReply']>
   */
  async serviceCancelService(data: components['schemas']['business.v1.CancelServiceRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ServiceOperateReply']> {
    const url = '/elderSvrMiniAPP/service/v1/cancel';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.ServiceOperateReply']>(requestConfig);
  },

  /**
   * serviceChatServiceStatusChangeNotice
   * @description POST /elderSvrMiniAPP/service/v1/chatServiceStatusChangeNotice
   * @param data 
   * @returns Promise<components['schemas']['business.v1.ChatServiceStatusChangeNoticeReply']>
   */
  async serviceChatServiceStatusChangeNotice(data: components['schemas']['business.v1.ChatServiceStatusChangeNoticeRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ChatServiceStatusChangeNoticeReply']> {
    const url = '/elderSvrMiniAPP/service/v1/chatServiceStatusChangeNotice';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.ChatServiceStatusChangeNoticeReply']>(requestConfig);
  },

  /**
   * serviceCompletePaidService
   * @description POST /elderSvrMiniAPP/service/v1/completePaidService
   * @param data 
   * @returns Promise<components['schemas']['business.v1.CompletePaidServiceReply']>
   */
  async serviceCompletePaidService(data: components['schemas']['business.v1.CompletePaidServiceRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.CompletePaidServiceReply']> {
    const url = '/elderSvrMiniAPP/service/v1/completePaidService';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.CompletePaidServiceReply']>(requestConfig);
  },

  /**
   * serviceThirdCreateService
   * @description POST /elderSvrMiniAPP/service/v1/createService
   * @param data 
   * @returns Promise<components['schemas']['business.v1.ThirdCreateServiceReply']>
   */
  async serviceThirdCreateService(data: components['schemas']['business.v1.ThirdCreateServiceInfo'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ThirdCreateServiceReply']> {
    const url = '/elderSvrMiniAPP/service/v1/createService';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.ThirdCreateServiceReply']>(requestConfig);
  },

  /**
   * serviceCreateService
   * @description POST /elderSvrMiniAPP/service/v1/createServiceRPC
   * @param data 
   * @returns Promise<components['schemas']['server.v1.CreateServiceReply']>
   */
  async serviceCreateService(data: components['schemas']['server.v1.CreateServiceRequest'], config?: ApiRequestConfig): Promise<components['schemas']['server.v1.CreateServiceReply']> {
    const url = '/elderSvrMiniAPP/service/v1/createServiceRPC';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['server.v1.CreateServiceReply']>(requestConfig);
  },

  /**
   * serviceDescribeService
   * @description POST /elderSvrMiniAPP/service/v1/describeService
   * @param data 
   * @returns Promise<components['schemas']['business.v1.DescribeServiceReply']>
   */
  async serviceDescribeService(data: components['schemas']['business.v1.DescribeServiceRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.DescribeServiceReply']> {
    const url = '/elderSvrMiniAPP/service/v1/describeService';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.DescribeServiceReply']>(requestConfig);
  },

  /**
   * serviceDescribeServiceList
   * @description POST /elderSvrMiniAPP/service/v1/describeServiceList
   * @param data 
   * @returns Promise<components['schemas']['business.v1.DescribeServiceListReply']>
   */
  async serviceDescribeServiceList(data: components['schemas']['business.v1.DescribeServiceListRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.DescribeServiceListReply']> {
    const url = '/elderSvrMiniAPP/service/v1/describeServiceList';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.DescribeServiceListReply']>(requestConfig);
  },

  /**
   * serviceServiceEvaluate
   * @description POST /elderSvrMiniAPP/service/v1/evaluate/save
   * @param data 
   * @returns Promise<components['schemas']['business.v1.ServiceEvaluateReply']>
   */
  async serviceServiceEvaluate(data: components['schemas']['business.v1.ServiceEvaluateRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ServiceEvaluateReply']> {
    const url = '/elderSvrMiniAPP/service/v1/evaluate/save';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.ServiceEvaluateReply']>(requestConfig);
  },

  /**
   * serviceFindCommunityPlaza
   * @description POST /elderSvrMiniAPP/service/v1/findCommunityPlaza
   * @param data 
   * @returns Promise<components['schemas']['business.v1.FindCommunityPlazaReply']>
   */
  async serviceFindCommunityPlaza(data: components['schemas']['business.v1.FindCommunityPlazaRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.FindCommunityPlazaReply']> {
    const url = '/elderSvrMiniAPP/service/v1/findCommunityPlaza';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.FindCommunityPlazaReply']>(requestConfig);
  },

  /**
   * serviceGetLastServiceEvaluate
   * @description POST /elderSvrMiniAPP/service/v1/getLastServiceEvaluate
   * @param data 
   * @returns Promise<components['schemas']['business.v1.GetLastServiceEvaluateReply']>
   */
  async serviceGetLastServiceEvaluate(data: components['schemas']['business.v1.GetLastServiceEvaluateRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.GetLastServiceEvaluateReply']> {
    const url = '/elderSvrMiniAPP/service/v1/getLastServiceEvaluate';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.GetLastServiceEvaluateReply']>(requestConfig);
  },

  /**
   * serviceGetPaidServiceByVerifyToken
   * @description POST /elderSvrMiniAPP/service/v1/getPaidServiceByVerifyToken
   * @param data 
   * @returns Promise<components['schemas']['business.v1.GetPaidServiceByVerifyTokenReply']>
   */
  async serviceGetPaidServiceByVerifyToken(data: components['schemas']['business.v1.GetPaidServiceByVerifyTokenRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.GetPaidServiceByVerifyTokenReply']> {
    const url = '/elderSvrMiniAPP/service/v1/getPaidServiceByVerifyToken';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.GetPaidServiceByVerifyTokenReply']>(requestConfig);
  },

  /**
   * serviceGetRoomUserInfo
   * @description POST /elderSvrMiniAPP/service/v1/getRoomUserInfo
   * @param data 
   * @returns Promise<components['schemas']['business.v1.GetRoomUserInfoReply']>
   */
  async serviceGetRoomUserInfo(data: components['schemas']['business.v1.GetRoomUserInfoRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.GetRoomUserInfoReply']> {
    const url = '/elderSvrMiniAPP/service/v1/getRoomUserInfo';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.GetRoomUserInfoReply']>(requestConfig);
  },

  /**
   * serviceGetServiceUsageCount
   * @description POST /elderSvrMiniAPP/service/v1/getServiceUsageCount
   * @param data 
   * @returns Promise<components['schemas']['business.v1.GetServiceUsageCountReply']>
   */
  async serviceGetServiceUsageCount(data: components['schemas']['business.v1.GetServiceUsageCountRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.GetServiceUsageCountReply']> {
    const url = '/elderSvrMiniAPP/service/v1/getServiceUsageCount';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.GetServiceUsageCountReply']>(requestConfig);
  },

  /**
   * serviceGetTrTc
   * @description POST /elderSvrMiniAPP/service/v1/getTrTc
   * @param data 
   * @returns Promise<components['schemas']['business.v1.GetTrTcReply']>
   */
  async serviceGetTrTc(data: components['schemas']['business.v1.GetTrTcRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.GetTrTcReply']> {
    const url = '/elderSvrMiniAPP/service/v1/getTrTc';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.GetTrTcReply']>(requestConfig);
  },

  /**
   * serviceHangUp
   * @description POST /elderSvrMiniAPP/service/v1/hangUp
   * @param data 
   * @returns Promise<components['schemas']['business.v1.ServiceOperateReply']>
   */
  async serviceHangUp(data: components['schemas']['business.v1.HangUpRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ServiceOperateReply']> {
    const url = '/elderSvrMiniAPP/service/v1/hangUp';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.ServiceOperateReply']>(requestConfig);
  },

  /**
   * serviceHomeBannerServiceList
   * @description POST /elderSvrMiniAPP/service/v1/homeBannerServiceList
   * @param data 
   * @returns Promise<components['schemas']['business.v1.HomeBannerServiceListReply']>
   */
  async serviceHomeBannerServiceList(data: components['schemas']['business.v1.HomeBannerServiceListRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.HomeBannerServiceListReply']> {
    const url = '/elderSvrMiniAPP/service/v1/homeBannerServiceList';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.HomeBannerServiceListReply']>(requestConfig);
  },

  /**
   * serviceMineHelpServiceList
   * @description POST /elderSvrMiniAPP/service/v1/mineHelpServiceList
   * @param data 
   * @returns Promise<components['schemas']['business.v1.MineHelpServiceListReply']>
   */
  async serviceMineHelpServiceList(data: components['schemas']['business.v1.MineHelpServiceListRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.MineHelpServiceListReply']> {
    const url = '/elderSvrMiniAPP/service/v1/mineHelpServiceList';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.MineHelpServiceListReply']>(requestConfig);
  },

  /**
   * serviceServicePersonAcceptService
   * @description POST /elderSvrMiniAPP/service/v1/servicePersonAcceptService
   * @param data 
   * @returns Promise<components['schemas']['business.v1.ServiceOperateReply']>
   */
  async serviceServicePersonAcceptService(data: components['schemas']['business.v1.ServicePersonAcceptServiceRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ServiceOperateReply']> {
    const url = '/elderSvrMiniAPP/service/v1/servicePersonAcceptService';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.ServiceOperateReply']>(requestConfig);
  },

  /**
   * serviceServicePersonCancelService
   * @description POST /elderSvrMiniAPP/service/v1/servicePersonCancelService
   * @param data 
   * @returns Promise<components['schemas']['business.v1.ServiceOperateReply']>
   */
  async serviceServicePersonCancelService(data: components['schemas']['business.v1.ServicePersonCancelServiceRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ServiceOperateReply']> {
    const url = '/elderSvrMiniAPP/service/v1/servicePersonCancelService';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.ServiceOperateReply']>(requestConfig);
  },

  /**
   * serviceSomethingNew
   * @description POST /elderSvrMiniAPP/service/v1/somethingNew
   * @param data 
   * @returns Promise<components['schemas']['business.v1.SomethingNewReply']>
   */
  async serviceSomethingNew(data: components['schemas']['business.v1.ServiceNullBodyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.SomethingNewReply']> {
    const url = '/elderSvrMiniAPP/service/v1/somethingNew';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.SomethingNewReply']>(requestConfig);
  },

  /**
   * serviceSubmitPaidServiceComment
   * @description POST /elderSvrMiniAPP/service/v1/submitPaidServiceComment
   * @param data 
   * @returns Promise<components['schemas']['business.v1.SubmitPaidServiceCommentReply']>
   */
  async serviceSubmitPaidServiceComment(data: components['schemas']['business.v1.SubmitPaidServiceCommentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.SubmitPaidServiceCommentReply']> {
    const url = '/elderSvrMiniAPP/service/v1/submitPaidServiceComment';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.SubmitPaidServiceCommentReply']>(requestConfig);
  },

  /**
   * serviceValidateService
   * @description POST /elderSvrMiniAPP/service/v1/validateService
   * @param data 
   * @returns Promise<components['schemas']['server.v1.ValidateServiceReply']>
   */
  async serviceValidateService(data: components['schemas']['server.v1.ValidateServiceRequest'], config?: ApiRequestConfig): Promise<components['schemas']['server.v1.ValidateServiceReply']> {
    const url = '/elderSvrMiniAPP/service/v1/validateService';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['server.v1.ValidateServiceReply']>(requestConfig);
  },

  /**
   * squareCommunityActivityList
   * @description POST /elderSvrMiniAPP/square/v1/communityActivityList
   * @param data 
   * @returns Promise<components['schemas']['business.v1.CommunityActivityReply']>
   */
  async squareCommunityActivityList(data: components['schemas']['business.v1.CommunityActivityListRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.CommunityActivityReply']> {
    const url = '/elderSvrMiniAPP/square/v1/communityActivityList';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.CommunityActivityReply']>(requestConfig);
  },

  /**
   * tRTCCallbackNewTRTCRecord
   * @description POST /elderSvrMiniAPP/trtc/v1/callback/trtc_record
   * @param data 
   * @returns Promise<components['schemas']['api.elder.callback.v1.CallbackResponse']>
   */
  async tRTCCallbackNewTRTCRecord(data: components['schemas']['api.elder.callback.v1.EventRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.callback.v1.CallbackResponse']> {
    const url = '/elderSvrMiniAPP/trtc/v1/callback/trtc_record';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.callback.v1.CallbackResponse']>(requestConfig);
  },

  /**
   * userCheckCommunityService
   * @description POST /elderSvrMiniAPP/user/v1/checkCommunityService
   * @param data 
   * @returns Promise<components['schemas']['system.v1.CheckCommunityServiceReply']>
   */
  async userCheckCommunityService(data: components['schemas']['system.v1.CheckCommunityServiceRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.CheckCommunityServiceReply']> {
    const url = '/elderSvrMiniAPP/user/v1/checkCommunityService';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.CheckCommunityServiceReply']>(requestConfig);
  },

  /**
   * checkCheckToken
   * @description POST /elderSvrMiniAPP/user/v1/checkToken
   * @param data 
   * @returns Promise<components['schemas']['system.v1.CheckTokenReply']>
   */
  async checkCheckToken(data: components['schemas']['system.v1.CheckTokenRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.CheckTokenReply']> {
    const url = '/elderSvrMiniAPP/user/v1/checkToken';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.CheckTokenReply']>(requestConfig);
  },

  /**
   * helperServiceGetUserContributionLevel
   * @description POST /elderSvrMiniAPP/user/v1/contribution/get
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetUserContributionLevelResponse']>
   */
  async helperServiceGetUserContributionLevel(data: components['schemas']['api.elder.help.v1.GetUserContributionLevelRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetUserContributionLevelResponse']> {
    const url = '/elderSvrMiniAPP/user/v1/contribution/get';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetUserContributionLevelResponse']>(requestConfig);
  },

  /**
   * userCreateElderInfo
   * @description POST /elderSvrMiniAPP/user/v1/createElderInfo
   * @param data 
   * @returns Promise<components['schemas']['system.v1.UserOperateReply']>
   */
  async userCreateElderInfo(data: components['schemas']['system.v1.CreateElderInfoRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UserOperateReply']> {
    const url = '/elderSvrMiniAPP/user/v1/createElderInfo';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.UserOperateReply']>(requestConfig);
  },

  /**
   * userDeleteElderForTest
   * @description POST /elderSvrMiniAPP/user/v1/deleteElderForTest
   * @param data 
   * @returns Promise<components['schemas']['system.v1.UserOperateReply']>
   */
  async userDeleteElderForTest(data: components['schemas']['system.v1.DeleteElderForTestRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UserOperateReply']> {
    const url = '/elderSvrMiniAPP/user/v1/deleteElderForTest';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.UserOperateReply']>(requestConfig);
  },

  /**
   * userDescribeElder
   * @description POST /elderSvrMiniAPP/user/v1/describeElder
   * @param data 
   * @returns Promise<components['schemas']['system.v1.DescribeElderReply']>
   */
  async userDescribeElder(data: components['schemas']['system.v1.DescribeElderRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.DescribeElderReply']> {
    const url = '/elderSvrMiniAPP/user/v1/describeElder';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.DescribeElderReply']>(requestConfig);
  },

  /**
   * userDescribeUser
   * @description POST /elderSvrMiniAPP/user/v1/describeUser
   * @param data 
   * @returns Promise<components['schemas']['system.v1.UserOperateReply']>
   */
  async userDescribeUser(data: components['schemas']['system.v1.UserError'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UserOperateReply']> {
    const url = '/elderSvrMiniAPP/user/v1/describeUser';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.UserOperateReply']>(requestConfig);
  },

  /**
   * userGeneratePersonalQrCode
   * @description POST /elderSvrMiniAPP/user/v1/generatePersonalQrCode
   * @param data 
   * @returns Promise<components['schemas']['system.v1.GeneratePersonalQrCodeReply']>
   */
  async userGeneratePersonalQrCode(data: components['schemas']['system.v1.GeneratePersonalQrCodeRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GeneratePersonalQrCodeReply']> {
    const url = '/elderSvrMiniAPP/user/v1/generatePersonalQrCode';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.GeneratePersonalQrCodeReply']>(requestConfig);
  },

  /**
   * userGetCommunityDetail
   * @description POST /elderSvrMiniAPP/user/v1/getCommunityDetail
   * @param data 
   * @returns Promise<components['schemas']['system.v1.GetCommunityDetailReply']>
   */
  async userGetCommunityDetail(data: components['schemas']['system.v1.GetCommunityDetailRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetCommunityDetailReply']> {
    const url = '/elderSvrMiniAPP/user/v1/getCommunityDetail';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.GetCommunityDetailReply']>(requestConfig);
  },

  /**
   * userGetCommunityList
   * @description POST /elderSvrMiniAPP/user/v1/getCommunityList
   * @param data 
   * @returns Promise<components['schemas']['system.v1.GetCommunityListReply']>
   */
  async userGetCommunityList(data: components['schemas']['system.v1.GetCommunityListRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetCommunityListReply']> {
    const url = '/elderSvrMiniAPP/user/v1/getCommunityList';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.GetCommunityListReply']>(requestConfig);
  },

  /**
   * checkGetCurrentUser
   * @description POST /elderSvrMiniAPP/user/v1/getCurrentUser
   * @param data 
   * @returns Promise<components['schemas']['system.v1.GetCurrentUserReply']>
   */
  async checkGetCurrentUser(data: components['schemas']['system.v1.GetCurrentUserRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetCurrentUserReply']> {
    const url = '/elderSvrMiniAPP/user/v1/getCurrentUser';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.GetCurrentUserReply']>(requestConfig);
  },

  /**
   * userGetElderById
   * @description POST /elderSvrMiniAPP/user/v1/getElderById
   * @param data 
   * @returns Promise<components['schemas']['system.v1.GetElderByIdResponse']>
   */
  async userGetElderById(data: components['schemas']['system.v1.GetElderByIdRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetElderByIdResponse']> {
    const url = '/elderSvrMiniAPP/user/v1/getElderById';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.GetElderByIdResponse']>(requestConfig);
  },

  /**
   * userGetElderCredits
   * @description POST /elderSvrMiniAPP/user/v1/getElderCredits
   * @param data 
   * @returns Promise<components['schemas']['system.v1.GetElderCreditsResponse']>
   */
  async userGetElderCredits(data: components['schemas']['system.v1.GetElderCreditsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetElderCreditsResponse']> {
    const url = '/elderSvrMiniAPP/user/v1/getElderCredits';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.GetElderCreditsResponse']>(requestConfig);
  },

  /**
   * commonGetWxPhoneNumber
   * @description POST /elderSvrMiniAPP/user/v1/getWxPhoneNumber
   * @param data 
   * @returns Promise<components['schemas']['system.v1.GetWxPhoneNumberReply']>
   */
  async commonGetWxPhoneNumber(data: components['schemas']['system.v1.GetWxPhoneNumberRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetWxPhoneNumberReply']> {
    const url = '/elderSvrMiniAPP/user/v1/getWxPhoneNumber';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.GetWxPhoneNumberReply']>(requestConfig);
  },

  /**
   * userGetUserInfoByToken
   * @description POST /elderSvrMiniAPP/user/v1/get_user_by_token
   * @param data 
   * @returns Promise<components['schemas']['system.v1.GetUserInfoByTokenResponse']>
   */
  async userGetUserInfoByToken(data: components['schemas']['system.v1.GetUserInfoByTokenRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetUserInfoByTokenResponse']> {
    const url = '/elderSvrMiniAPP/user/v1/get_user_by_token';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.GetUserInfoByTokenResponse']>(requestConfig);
  },

  /**
   * userHelpHeadCount
   * @description POST /elderSvrMiniAPP/user/v1/helpHeadCount
   * @param data 
   * @returns Promise<components['schemas']['system.v1.HelpHeadCountCountReply']>
   */
  async userHelpHeadCount(data: components['schemas']['system.v1.HelpHeadCountRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.HelpHeadCountCountReply']> {
    const url = '/elderSvrMiniAPP/user/v1/helpHeadCount';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.HelpHeadCountCountReply']>(requestConfig);
  },

  /**
   * userHelpVolunteerList
   * @description POST /elderSvrMiniAPP/user/v1/helpVolunteerList
   * @param data 
   * @returns Promise<components['schemas']['system.v1.HelpVolunteerListReply']>
   */
  async userHelpVolunteerList(data: components['schemas']['system.v1.HelpVolunteerListRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.HelpVolunteerListReply']> {
    const url = '/elderSvrMiniAPP/user/v1/helpVolunteerList';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.HelpVolunteerListReply']>(requestConfig);
  },

  /**
   * userListElderCreditRecords
   * @description POST /elderSvrMiniAPP/user/v1/listElderCreditRecords
   * @param data 
   * @returns Promise<components['schemas']['system.v1.ListElderCreditRecordsResponse']>
   */
  async userListElderCreditRecords(data: components['schemas']['system.v1.ListElderCreditRecordsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.ListElderCreditRecordsResponse']> {
    const url = '/elderSvrMiniAPP/user/v1/listElderCreditRecords';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.ListElderCreditRecordsResponse']>(requestConfig);
  },

  /**
   * userModifyElder
   * @description POST /elderSvrMiniAPP/user/v1/modifyElder
   * @param data 
   * @returns Promise<components['schemas']['system.v1.UserOperateReply']>
   */
  async userModifyElder(data: components['schemas']['system.v1.ModifyElderRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UserOperateReply']> {
    const url = '/elderSvrMiniAPP/user/v1/modifyElder';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.UserOperateReply']>(requestConfig);
  },

  /**
   * userQrCodeBindCheck
   * @description POST /elderSvrMiniAPP/user/v1/qrCodeBindCheck
   * @param data 
   * @returns Promise<components['schemas']['system.v1.QrCodeBindCheckReply']>
   */
  async userQrCodeBindCheck(data: components['schemas']['system.v1.QrCodeBindCheckRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.QrCodeBindCheckReply']> {
    const url = '/elderSvrMiniAPP/user/v1/qrCodeBindCheck';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.QrCodeBindCheckReply']>(requestConfig);
  },

  /**
   * userRealName
   * @description POST /elderSvrMiniAPP/user/v1/realName
   * @param data 
   * @returns Promise<components['schemas']['system.v1.RealNameReply']>
   */
  async userRealName(data: components['schemas']['system.v1.RealNameRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.RealNameReply']> {
    const url = '/elderSvrMiniAPP/user/v1/realName';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.RealNameReply']>(requestConfig);
  },

  /**
   * userCancelRealName
   * @description POST /elderSvrMiniAPP/user/v1/realName/cancel
   * @param data 
   * @returns Promise<components['schemas']['system.v1.CancelRealNameReply']>
   */
  async userCancelRealName(data: components['schemas']['system.v1.CancelRealNameRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.CancelRealNameReply']> {
    const url = '/elderSvrMiniAPP/user/v1/realName/cancel';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.CancelRealNameReply']>(requestConfig);
  },

  /**
   * userRedirectLogin
   * @description POST /elderSvrMiniAPP/user/v1/redirect_login
   * @param data 
   * @returns Promise<components['schemas']['system.v1.RedirectLoginResponse']>
   */
  async userRedirectLogin(data: components['schemas']['system.v1.RedirectLoginRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.RedirectLoginResponse']> {
    const url = '/elderSvrMiniAPP/user/v1/redirect_login';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.RedirectLoginResponse']>(requestConfig);
  },

  /**
   * helperServiceGetUserCenterSummary
   * @description POST /elderSvrMiniAPP/user/v1/summary
   * @param data 
   * @returns Promise<components['schemas']['api.elder.help.v1.GetUserCenterSummaryResponse']>
   */
  async helperServiceGetUserCenterSummary(data: components['schemas']['api.elder.help.v1.GetUserCenterSummaryRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetUserCenterSummaryResponse']> {
    const url = '/elderSvrMiniAPP/user/v1/summary';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.help.v1.GetUserCenterSummaryResponse']>(requestConfig);
  },

  /**
   * userTriggerCommunityList
   * @description POST /elderSvrMiniAPP/user/v1/triggerCommunityList
   * @param data 
   * @returns Promise<components['schemas']['system.v1.TriggerCommunityListReply']>
   */
  async userTriggerCommunityList(data: components['schemas']['system.v1.TriggerCommunityListRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.TriggerCommunityListReply']> {
    const url = '/elderSvrMiniAPP/user/v1/triggerCommunityList';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.TriggerCommunityListReply']>(requestConfig);
  },

  /**
   * userUnbindIdentity
   * @description POST /elderSvrMiniAPP/user/v1/unbindIdentity
   * @param data 
   * @returns Promise<components['schemas']['system.v1.UnbindIdentityReply']>
   */
  async userUnbindIdentity(data: components['schemas']['system.v1.UnbindIdentityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UnbindIdentityReply']> {
    const url = '/elderSvrMiniAPP/user/v1/unbindIdentity';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.UnbindIdentityReply']>(requestConfig);
  },

  /**
   * userUpdatePhoneFromWeixin
   * @description POST /elderSvrMiniAPP/user/v1/updatePhoneFromWeixin
   * @param data 
   * @returns Promise<components['schemas']['system.v1.UpdatePhoneFromWeixinReply']>
   */
  async userUpdatePhoneFromWeixin(data: components['schemas']['system.v1.UpdatePhoneFromWeixinRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UpdatePhoneFromWeixinReply']> {
    const url = '/elderSvrMiniAPP/user/v1/updatePhoneFromWeixin';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.UpdatePhoneFromWeixinReply']>(requestConfig);
  },

  /**
   * userUpdatePrivacySetting
   * @description POST /elderSvrMiniAPP/user/v1/update_private_setting
   * @param data 
   * @returns Promise<components['schemas']['system.v1.UpdatePrivacySettingsResponse']>
   */
  async userUpdatePrivacySetting(data: components['schemas']['system.v1.UpdatePrivacySettingsRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UpdatePrivacySettingsResponse']> {
    const url = '/elderSvrMiniAPP/user/v1/update_private_setting';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.UpdatePrivacySettingsResponse']>(requestConfig);
  },

  /**
   * userValidatePersonalQrCode
   * @description POST /elderSvrMiniAPP/user/v1/validatePersonalQrCode
   * @param data 
   * @returns Promise<components['schemas']['system.v1.ValidatePersonalQrCodeReply']>
   */
  async userValidatePersonalQrCode(data: components['schemas']['system.v1.ValidatePersonalQrCodeRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.ValidatePersonalQrCodeReply']> {
    const url = '/elderSvrMiniAPP/user/v1/validatePersonalQrCode';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.ValidatePersonalQrCodeReply']>(requestConfig);
  },

  /**
   * userVolunteerInsure
   * @description POST /elderSvrMiniAPP/user/v1/volunteerInsure
   * @param data 
   * @returns Promise<components['schemas']['system.v1.VolunteerInsureReply']>
   */
  async userVolunteerInsure(data: components['schemas']['system.v1.VolunteerInsureRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.VolunteerInsureReply']> {
    const url = '/elderSvrMiniAPP/user/v1/volunteerInsure';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.VolunteerInsureReply']>(requestConfig);
  },

  /**
   * userPageVolunteerInsure
   * @description POST /elderSvrMiniAPP/user/v1/volunteerInsureList
   * @param data 
   * @returns Promise<components['schemas']['system.v1.PageVolunteerInsureReply']>
   */
  async userPageVolunteerInsure(data: components['schemas']['system.v1.PageVolunteerInsureRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.PageVolunteerInsureReply']> {
    const url = '/elderSvrMiniAPP/user/v1/volunteerInsureList';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.PageVolunteerInsureReply']>(requestConfig);
  },

  /**
   * userGetVolunteerInsureVisa
   * @description POST /elderSvrMiniAPP/user/v1/volunteerInsureVisa
   * @param data 
   * @returns Promise<components['schemas']['system.v1.GetVolunteerInsureVisaReply']>
   */
  async userGetVolunteerInsureVisa(data: components['schemas']['system.v1.GetVolunteerInsureVisaRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetVolunteerInsureVisaReply']> {
    const url = '/elderSvrMiniAPP/user/v1/volunteerInsureVisa';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.GetVolunteerInsureVisaReply']>(requestConfig);
  },

  /**
   * gongyiServiceCheckCanReceiveFlower
   * @description POST /elderSvrMiniAPP/v1/gongyi/checkFlower
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.gongyi.CheckCanReceiveFlowerResponse']>
   */
  async gongyiServiceCheckCanReceiveFlower(data: components['schemas']['api.elder.v1.gongyi.CheckCanReceiveFlowerRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.gongyi.CheckCanReceiveFlowerResponse']> {
    const url = '/elderSvrMiniAPP/v1/gongyi/checkFlower';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.gongyi.CheckCanReceiveFlowerResponse']>(requestConfig);
  },

  /**
   * gongyiServiceGetFlowerCount
   * @description POST /elderSvrMiniAPP/v1/gongyi/getFlowerCount
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.gongyi.GetFlowerCountResponse']>
   */
  async gongyiServiceGetFlowerCount(data: components['schemas']['api.elder.v1.gongyi.GetFlowerCountRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.gongyi.GetFlowerCountResponse']> {
    const url = '/elderSvrMiniAPP/v1/gongyi/getFlowerCount';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.gongyi.GetFlowerCountResponse']>(requestConfig);
  },

  /**
   * gongyiServiceSendFlower
   * @description POST /elderSvrMiniAPP/v1/gongyi/sendFlower
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.gongyi.SendFlowerResponse']>
   */
  async gongyiServiceSendFlower(data: components['schemas']['api.elder.v1.gongyi.SendFlowerRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.gongyi.SendFlowerResponse']> {
    const url = '/elderSvrMiniAPP/v1/gongyi/sendFlower';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.gongyi.SendFlowerResponse']>(requestConfig);
  },

  /**
   * gongyiServiceSilentLogin
   * @description POST /elderSvrMiniAPP/v1/gongyi/silentLogin
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.gongyi.SilentLoginResponse']>
   */
  async gongyiServiceSilentLogin(data: components['schemas']['api.elder.v1.gongyi.SilentLoginRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.gongyi.SilentLoginResponse']> {
    const url = '/elderSvrMiniAPP/v1/gongyi/silentLogin';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.gongyi.SilentLoginResponse']>(requestConfig);
  },

  /**
   * gongyiServiceSyncGyDataToMap
   * @description POST /elderSvrMiniAPP/v1/gongyi/syncGyDataToMap
   * @param data 
   * @returns Promise<components['schemas']['api.elder.v1.gongyi.SyncGyDataToMapResponse']>
   */
  async gongyiServiceSyncGyDataToMap(data: components['schemas']['api.elder.v1.gongyi.SyncGyDataToMapRequest'], config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.gongyi.SyncGyDataToMapResponse']> {
    const url = '/elderSvrMiniAPP/v1/gongyi/syncGyDataToMap';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['api.elder.v1.gongyi.SyncGyDataToMapResponse']>(requestConfig);
  },

  /**
   * weComServiceCreateMoment
   * @description POST /elderSvrMiniAPP/wecom/v1/createMoment
   * @param data 
   * @returns Promise<components['schemas']['elder.wecom.v1.CreateMomentReply']>
   */
  async weComServiceCreateMoment(data: components['schemas']['elder.wecom.v1.CreateMomentRequest'], config?: ApiRequestConfig): Promise<components['schemas']['elder.wecom.v1.CreateMomentReply']> {
    const url = '/elderSvrMiniAPP/wecom/v1/createMoment';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['elder.wecom.v1.CreateMomentReply']>(requestConfig);
  },

  /**
   * weComServiceGenerateQRCode
   * @description POST /elderSvrMiniAPP/wecom/v1/generateQRCode
   * @param data 
   * @returns Promise<components['schemas']['elder.wecom.v1.GenerateQRCodeReply']>
   */
  async weComServiceGenerateQRCode(data: components['schemas']['elder.wecom.v1.GenerateQRCodeRequest'], config?: ApiRequestConfig): Promise<components['schemas']['elder.wecom.v1.GenerateQRCodeReply']> {
    const url = '/elderSvrMiniAPP/wecom/v1/generateQRCode';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['elder.wecom.v1.GenerateQRCodeReply']>(requestConfig);
  },

  /**
   * weComServiceGetCommunityTagMapping
   * @description POST /elderSvrMiniAPP/wecom/v1/getCommunityTagMapping
   * @param data 
   * @returns Promise<components['schemas']['elder.wecom.v1.GetCommunityTagMappingReply']>
   */
  async weComServiceGetCommunityTagMapping(data: components['schemas']['elder.wecom.v1.GetCommunityTagMappingRequest'], config?: ApiRequestConfig): Promise<components['schemas']['elder.wecom.v1.GetCommunityTagMappingReply']> {
    const url = '/elderSvrMiniAPP/wecom/v1/getCommunityTagMapping';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['elder.wecom.v1.GetCommunityTagMappingReply']>(requestConfig);
  },

  /**
   * weComServiceHandleCustomerJoinCallback
   * @description POST /elderSvrMiniAPP/wecom/v1/handleCustomerJoinCallback
   * @param data 
   * @returns Promise<components['schemas']['elder.wecom.v1.HandleCustomerJoinCallbackReply']>
   */
  async weComServiceHandleCustomerJoinCallback(data: components['schemas']['elder.wecom.v1.HandleCustomerJoinCallbackRequest'], config?: ApiRequestConfig): Promise<components['schemas']['elder.wecom.v1.HandleCustomerJoinCallbackReply']> {
    const url = '/elderSvrMiniAPP/wecom/v1/handleCustomerJoinCallback';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['elder.wecom.v1.HandleCustomerJoinCallbackReply']>(requestConfig);
  },

  /**
   * commonGetWebCosTempKey
   * @description POST /elderSvrWebAPI/common/v1/getWebCosTempKey
   * @param data 
   * @returns Promise<components['schemas']['system.v1.GetWebCosTempKeyReply']>
   */
  async commonGetWebCosTempKey(data: components['schemas']['system.v1.GetWebCosTempKeyRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetWebCosTempKeyReply']> {
    const url = '/elderSvrWebAPI/common/v1/getWebCosTempKey';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.GetWebCosTempKeyReply']>(requestConfig);
  },

  /**
   * hospitalImportMedicalInfo
   * @description POST /elderSvrWebAPI/hospital/v1/importMedicalInfo
   * @param data 
   * @returns Promise<components['schemas']['seek_medical.v1.ImportMedicalInfoReply']>
   */
  async hospitalImportMedicalInfo(data: components['schemas']['seek_medical.v1.ImportMedicalInfoRequest'], config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.ImportMedicalInfoReply']> {
    const url = '/elderSvrWebAPI/hospital/v1/importMedicalInfo';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['seek_medical.v1.ImportMedicalInfoReply']>(requestConfig);
  },

  /**
   * imFindImIdentity
   * @description POST /elderSvrWebAPI/im/v1/findImIdentity
   * @param data 
   * @returns Promise<components['schemas']['business.v1.FindImIdentityReply']>
   */
  async imFindImIdentity(data: components['schemas']['business.v1.FindImIdentityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.FindImIdentityReply']> {
    const url = '/elderSvrWebAPI/im/v1/findImIdentity';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.FindImIdentityReply']>(requestConfig);
  },

  /**
   * imImDataMove
   * @description POST /elderSvrWebAPI/im/v1/imDataMove
   * @param data 
   * @returns Promise<any>
   */
  async imImDataMove(data: components['schemas']['business.v1.ImDataMoveRequest'], config?: ApiRequestConfig): Promise<any> {
    const url = '/elderSvrWebAPI/im/v1/imDataMove';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<any>(requestConfig);
  },

  /**
   * imSaveImIdentity
   * @description POST /elderSvrWebAPI/im/v1/saveImIdentity
   * @param data 
   * @returns Promise<components['schemas']['business.v1.ImOperateReply']>
   */
  async imSaveImIdentity(data: components['schemas']['business.v1.SaveImIdentityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ImOperateReply']> {
    const url = '/elderSvrWebAPI/im/v1/saveImIdentity';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.ImOperateReply']>(requestConfig);
  },

  /**
   * serviceInitEvaluateHistoryData
   * @description POST /elderSvrWebAPI/service/v1/evaluate/initHistoryData
   * @param data 
   * @returns Promise<components['schemas']['business.v1.InitEvaluateHistoryDataReply']>
   */
  async serviceInitEvaluateHistoryData(data: components['schemas']['business.v1.InitEvaluateHistoryDataRequest'], config?: ApiRequestConfig): Promise<components['schemas']['business.v1.InitEvaluateHistoryDataReply']> {
    const url = '/elderSvrWebAPI/service/v1/evaluate/initHistoryData';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['business.v1.InitEvaluateHistoryDataReply']>(requestConfig);
  },

  /**
   * userCreateElderIgnore
   * @description POST /elderSvrWebAPI/user/v1/createElderIgnore
   * @param data 
   * @returns Promise<components['schemas']['system.v1.CreateElderIgnoreReply']>
   */
  async userCreateElderIgnore(data: components['schemas']['system.v1.CreateElderIgnoreRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.CreateElderIgnoreReply']> {
    const url = '/elderSvrWebAPI/user/v1/createElderIgnore';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.CreateElderIgnoreReply']>(requestConfig);
  },

  /**
   * userCreateQrCode
   * @description POST /elderSvrWebAPI/user/v1/createQrCode
   * @param data 
   * @returns Promise<components['schemas']['system.v1.UserOperateReply']>
   */
  async userCreateQrCode(data: components['schemas']['system.v1.CreateQrCodeRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UserOperateReply']> {
    const url = '/elderSvrWebAPI/user/v1/createQrCode';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.UserOperateReply']>(requestConfig);
  },

  /**
   * userHandleElderCommunity
   * @description POST /elderSvrWebAPI/user/v1/handleElderCommunity
   * @param data 
   * @returns Promise<components['schemas']['system.v1.UserOperateReply']>
   */
  async userHandleElderCommunity(data: components['schemas']['system.v1.HandleElderCommunityRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UserOperateReply']> {
    const url = '/elderSvrWebAPI/user/v1/handleElderCommunity';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.UserOperateReply']>(requestConfig);
  },

  /**
   * userRefreshAllElderPoiTitle
   * @description POST /elderSvrWebAPI/user/v1/refreshPoiTitle
   * @param data 
   * @returns Promise<components['schemas']['system.v1.UserOperateReply']>
   */
  async userRefreshAllElderPoiTitle(data: components['schemas']['system.v1.RefreshAllElderPoiTitleRequest'], config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UserOperateReply']> {
    const url = '/elderSvrWebAPI/user/v1/refreshPoiTitle';
    const requestConfig: ApiRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return getApiClient().request<components['schemas']['system.v1.UserOperateReply']>(requestConfig);
  },

};

// ==================== 导出 ====================

// 导出类型定义
export type userApiApiType = typeof userApiApi;

// 导出常用类型
export type { components } from './api-generated';

// ==================== 使用示例 ====================

/*
// 方式1: 使用默认配置（自动初始化）
import { userApiApi } from './userApi';

// 方式2: 自定义配置
import { userApiApi, configureApiClient } from './userApi';
configureApiClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  middlewares: [customMiddleware]
});

// 方式3: 使用完全自定义的request客户端
import { userApiApi, configureApiClient } from './userApi';
import { myCustomClient } from './my-request-client';
configureApiClient({
  customClient: myCustomClient
});
*/

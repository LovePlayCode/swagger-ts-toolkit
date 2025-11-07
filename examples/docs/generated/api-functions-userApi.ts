// 🤖 基于Swagger自动生成的API调用函数 - userApi
// ⚠️  请勿手动修改此文件
// 📅 生成时间: 2025-11-07T08:17:17.484Z

// 注意：axios 需要安装为项目依赖
// npm install axios @types/axios
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import type { components } from './api-generated';

// 定义响应类型别名，使代码更简洁
type ApiResponse<T = any> = {
  success: boolean;
  data: T;
  message?: string;
  pagination?: components['schemas']['Pagination'];
} & Record<string, any>;

type UserListResponse = ApiResponse<components['schemas']['User'][]>;
type UserResponse = ApiResponse<components['schemas']['User']>;
type LoginResponse = ApiResponse<components['schemas']['LoginResponse']>;
type StandardResponse = Record<string, any>;

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
   * paymentMgrServiceGetAppSetting
   * @description POST /elderSvrBackend/app/v1/setting/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async paymentMgrServiceGetAppSetting(data: components['schemas']['api.elder.backend.v1.GetAppSettingRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/app/v1/setting/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceGetWebCosTempKey
   * @description POST /elderSvrBackend/common/v1/getWebCosTempKey
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceGetWebCosTempKey(data: components['schemas']['system.v1.GetWebCosTempKeyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/common/v1/getWebCosTempKey';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * dashboardServiceGetCommunityCredit
   * @description POST /elderSvrBackend/dashboard/v1/community/credit/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async dashboardServiceGetCommunityCredit(data: components['schemas']['api.elder.backend.v1.GetCommunityCreditRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/dashboard/v1/community/credit/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * dashboardServiceGetHelpSummary
   * @description POST /elderSvrBackend/dashboard/v1/help/summary
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async dashboardServiceGetHelpSummary(data: components['schemas']['api.elder.backend.v1.GetHelpSummaryRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/dashboard/v1/help/summary';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * paymentMgrServiceGetDeveloperSettings
   * @description POST /elderSvrBackend/developer/v1/settings/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async paymentMgrServiceGetDeveloperSettings(data: components['schemas']['api.elder.backend.v1.GetDeveloperSettingsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/developer/v1/settings/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * paymentMgrServiceUpdateDeveloperSettings
   * @description POST /elderSvrBackend/developer/v1/settings/update
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async paymentMgrServiceUpdateDeveloperSettings(data: components['schemas']['api.elder.backend.v1.UpdateDeveloperSettingsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/developer/v1/settings/update';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceTypeServiceListCategories
   * @description POST /elderSvrBackend/help/v1/category/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceTypeServiceListCategories(data: components['schemas']['api.elder.help.v1.ListCategoriesRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/help/v1/category/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceGetUserPermissions
   * @description POST /elderSvrBackend/login/v1/get_permission
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceGetUserPermissions(data: components['schemas']['api.elder.backend.v1.GetUserPermissionsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/login/v1/get_permission';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceLoginByPhone
   * @description POST /elderSvrBackend/login/v1/loginByPhone
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceLoginByPhone(data: components['schemas']['api.elder.backend.v1.LoginByPhoneRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/login/v1/loginByPhone';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceLogout
   * @description POST /elderSvrBackend/login/v1/logout
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceLogout(data: components['schemas']['api.elder.backend.v1.LogoutRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/login/v1/logout';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceSendLoginCode
   * @description POST /elderSvrBackend/login/v1/sendCode
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceSendLoginCode(data: components['schemas']['api.elder.backend.v1.SendLoginCodeRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/login/v1/sendCode';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceUpdateOrgUser
   * @description POST /elderSvrBackend/org_user/v1/update
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceUpdateOrgUser(data: components['schemas']['api.elder.backend.v1.UpdateOrgUserRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/org_user/v1/update';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * paymentMgrServiceGetBanks
   * @description POST /elderSvrBackend/payment/v1/banks/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async paymentMgrServiceGetBanks(data: components['schemas']['api.elder.backend.v1.GetBanksRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/payment/v1/banks/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * paymentMgrServiceApplyEcommercement
   * @description POST /elderSvrBackend/payment/v1/ecommerce/apply
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async paymentMgrServiceApplyEcommercement(data: components['schemas']['api.elder.backend.v1.ApplyEcommercementRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/payment/v1/ecommerce/apply';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * paymentMgrServiceGetEcommerceApplyment
   * @description POST /elderSvrBackend/payment/v1/ecommerce/applyment/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async paymentMgrServiceGetEcommerceApplyment(data: components['schemas']['api.elder.backend.v1.GetEcommerceApplymentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/payment/v1/ecommerce/applyment/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * paymentMgrServiceGetEcommerceApplymentStatus
   * @description POST /elderSvrBackend/payment/v1/ecommerce/applyment/status/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async paymentMgrServiceGetEcommerceApplymentStatus(data: components['schemas']['api.elder.backend.v1.GetEcommerceApplymentStatusRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/payment/v1/ecommerce/applyment/status/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * paymentMgrServiceGetStaticData
   * @description POST /elderSvrBackend/payment/v1/static/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async paymentMgrServiceGetStaticData(data: components['schemas']['api.elder.backend.v1.GetStaticDataRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/payment/v1/static/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * residentAuditServiceApproveResidentApply
   * @description POST /elderSvrBackend/resident/v1/apply/approve
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async residentAuditServiceApproveResidentApply(data: components['schemas']['api.elder.backend.v1.ApproveResidentApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/resident/v1/apply/approve';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * residentAuditServiceGetResidentApply
   * @description POST /elderSvrBackend/resident/v1/apply/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async residentAuditServiceGetResidentApply(data: components['schemas']['api.elder.backend.v1.GetResidentApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/resident/v1/apply/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * residentAuditServiceListResidentApply
   * @description POST /elderSvrBackend/resident/v1/apply/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async residentAuditServiceListResidentApply(data: components['schemas']['api.elder.backend.v1.ListResidentApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/resident/v1/apply/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * residentAuditServiceRefuseResidentApply
   * @description POST /elderSvrBackend/resident/v1/apply/refuse
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async residentAuditServiceRefuseResidentApply(data: components['schemas']['api.elder.backend.v1.RefuseResidentApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/resident/v1/apply/refuse';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceTypeServiceListHelpServiceRecords
   * @description POST /elderSvrBackend/service/records
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceTypeServiceListHelpServiceRecords(data: components['schemas']['api.elder.backend.v1.ListHelpServiceRecordsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/service/records';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceTypeServiceDeleteAreaCommunity
   * @description POST /elderSvrBackend/serviceType/v1/areas/delete
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceTypeServiceDeleteAreaCommunity(data: components['schemas']['api.elder.backend.v1.DeleteAreaRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/serviceType/v1/areas/delete';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceTypeServiceGetAreaCommunity
   * @description POST /elderSvrBackend/serviceType/v1/areas/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceTypeServiceGetAreaCommunity(data: components['schemas']['api.elder.backend.v1.ListAreasRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/serviceType/v1/areas/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceTypeServiceSelectAreaCommunity
   * @description POST /elderSvrBackend/serviceType/v1/areas/select
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceTypeServiceSelectAreaCommunity(data: components['schemas']['api.elder.backend.v1.SelectAreaRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/serviceType/v1/areas/select';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceTypeServiceUpdateServiceTypeAuditStatus
   * @description POST /elderSvrBackend/serviceType/v1/audit/status/update
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceTypeServiceUpdateServiceTypeAuditStatus(data: components['schemas']['api.elder.backend.v1.ServiceTypeAuditStatusRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/serviceType/v1/audit/status/update';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceTypeServiceListServiceTypeAudits
   * @description POST /elderSvrBackend/serviceType/v1/audits/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceTypeServiceListServiceTypeAudits(data: components['schemas']['api.elder.backend.v1.ListServiceTypeAuditsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/serviceType/v1/audits/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceTypeServiceGetAllCategories
   * @description POST /elderSvrBackend/serviceType/v1/categories
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceTypeServiceGetAllCategories(data: components['schemas']['api.elder.backend.v1.GetAllCategoriesRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/serviceType/v1/categories';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceTypeServiceDeleteServiceType
   * @description POST /elderSvrBackend/serviceType/v1/delete
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceTypeServiceDeleteServiceType(data: components['schemas']['api.elder.backend.v1.DeleteServiceTypeRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/serviceType/v1/delete';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceTypeServiceFilterArea
   * @description POST /elderSvrBackend/serviceType/v1/filterArea
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceTypeServiceFilterArea(data: components['schemas']['api.elder.backend.v1.FilterAreaRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/serviceType/v1/filterArea';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceTypeServiceListRecommendationTags
   * @description POST /elderSvrBackend/serviceType/v1/recommendation/tags/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceTypeServiceListRecommendationTags(data: components['schemas']['api.elder.backend.v1.ListRecommendationTagsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/serviceType/v1/recommendation/tags/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceTypeServiceUpdateServiceTypeRecommendationTags
   * @description POST /elderSvrBackend/serviceType/v1/recommendation/tags/update
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceTypeServiceUpdateServiceTypeRecommendationTags(data: components['schemas']['api.elder.backend.v1.UpdateServiceTypeRecommendationTagsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/serviceType/v1/recommendation/tags/update';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceTypeServiceSortServiceAuditType
   * @description POST /elderSvrBackend/serviceType/v1/sort
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceTypeServiceSortServiceAuditType(data: components['schemas']['api.elder.backend.v1.SortServiceAuditTypeRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/serviceType/v1/sort';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceTypeServiceListServiceTypeSubmissions
   * @description POST /elderSvrBackend/serviceType/v1/submissions/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceTypeServiceListServiceTypeSubmissions(data: components['schemas']['api.elder.backend.v1.ListServiceTypeSubmissionsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/serviceType/v1/submissions/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceTypeServiceSubmitServiceType
   * @description POST /elderSvrBackend/serviceType/v1/submit
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceTypeServiceSubmitServiceType(data: components['schemas']['api.elder.backend.v1.ServiceTypeSubmissionRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/serviceType/v1/submit';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceCheckStaffApply
   * @description POST /elderSvrBackend/staff/v1/apply/check
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceCheckStaffApply(data: components['schemas']['api.elder.backend.v1.CheckStaffApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/staff/v1/apply/check';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceImportStaffByCosUrl
   * @description POST /elderSvrBackend/staff/v1/import_by_cos
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceImportStaffByCosUrl(data: components['schemas']['api.elder.backend.v1.ImportStaffByCosUrlRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/staff/v1/import_by_cos';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceListImportErrRecords
   * @description POST /elderSvrBackend/staff/v1/import_err_records
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceListImportErrRecords(data: components['schemas']['api.elder.backend.v1.ListImportErrRecordsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/staff/v1/import_err_records';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceApplyStaffWithInviteLink
   * @description POST /elderSvrBackend/staff/v1/join/apply
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceApplyStaffWithInviteLink(data: components['schemas']['api.elder.backend.v1.ApplyStaffWithInviteLinkRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/staff/v1/join/apply';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceApproveStaffApply
   * @description POST /elderSvrBackend/staff/v1/join/approve
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceApproveStaffApply(data: components['schemas']['api.elder.backend.v1.ApproveStaffApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/staff/v1/join/approve';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceListStaffApply
   * @description POST /elderSvrBackend/staff/v1/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceListStaffApply(data: components['schemas']['api.elder.backend.v1.ListStaffApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/staff/v1/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceCheckIfMiniUser
   * @description POST /elderSvrBackend/staff/v1/mini_user/check
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceCheckIfMiniUser(data: components['schemas']['api.elder.backend.v1.CheckIfMiniUserRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/staff/v1/mini_user/check';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceReImportOrganizationUsers
   * @description POST /elderSvrBackend/staff/v1/re_import
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceReImportOrganizationUsers(data: components['schemas']['api.elder.backend.v1.ReImportOrganizationUsersRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/staff/v1/re_import';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceSendJoinOrgSms
   * @description POST /elderSvrBackend/staff/v1/send_join_sms
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceSendJoinOrgSms(data: components['schemas']['api.elder.backend.v1.SendJoinOrgSmsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/staff/v1/send_join_sms';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceBatchDeleteUser
   * @description POST /elderSvrBackend/user/v1/batch_delete
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceBatchDeleteUser(data: components['schemas']['api.elder.backend.v1.BatchDeleteUserRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/user/v1/batch_delete';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceDeleteUser
   * @description POST /elderSvrBackend/user/v1/delete
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceDeleteUser(data: components['schemas']['api.elder.backend.v1.DeleteUserRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/user/v1/delete';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceImportOrganizationUsers
   * @description POST /elderSvrBackend/user/v1/import
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceImportOrganizationUsers(data: components['schemas']['api.elder.backend.v1.ImportOrganizationUsersRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/user/v1/import';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceRealName
   * @description POST /elderSvrBackend/user/v1/realName
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceRealName(data: components['schemas']['system.v1.RealNameRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/user/v1/realName';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceSearchUserByPhone
   * @description POST /elderSvrBackend/user/v1/search_by_phone
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceSearchUserByPhone(data: components['schemas']['api.elder.backend.v1.SearchUserByPhoneRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/user/v1/search_by_phone';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceUpdateUser
   * @description POST /elderSvrBackend/user/v1/update
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceUpdateUser(data: components['schemas']['api.elder.backend.v1.UpdateUserRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/user/v1/update';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * iamServiceListOrgUser
   * @description POST /elderSvrBackend/users/v1/get_org_user
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async iamServiceListOrgUser(data: components['schemas']['api.elder.backend.v1.ListOrgUserRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/users/v1/get_org_user';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceApplyOrganization
   * @description POST /elderSvrBackend/v1/organization/apply
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceApplyOrganization(data: components['schemas']['api.elder.backend.v1.CreateOrganizationRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/apply';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceApproveOrganizationApply
   * @description POST /elderSvrBackend/v1/organization/apply/approve
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceApproveOrganizationApply(data: components['schemas']['api.elder.backend.v1.ApproveOrganizationApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/apply/approve';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceGetOrganizationApply
   * @description POST /elderSvrBackend/v1/organization/apply/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceGetOrganizationApply(data: components['schemas']['api.elder.backend.v1.GetOrganizationApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/apply/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceListOrganizationApply
   * @description POST /elderSvrBackend/v1/organization/apply/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceListOrganizationApply(data: components['schemas']['api.elder.backend.v1.ListOrganizationApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/apply/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceRejectOrganizationApply
   * @description POST /elderSvrBackend/v1/organization/apply/reject
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceRejectOrganizationApply(data: components['schemas']['api.elder.backend.v1.RejectOrganizationApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/apply/reject';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceApplyOrgCertication
   * @description POST /elderSvrBackend/v1/organization/certification/apply
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceApplyOrgCertication(data: components['schemas']['api.elder.backend.v1.ApplyOrgCerticationRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/certification/apply';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceApproveOrgCerticationApply
   * @description POST /elderSvrBackend/v1/organization/certification/apply/approve
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceApproveOrgCerticationApply(data: components['schemas']['api.elder.backend.v1.ApproveOrgCerticationApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/certification/apply/approve';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceListOrgCerticationApply
   * @description POST /elderSvrBackend/v1/organization/certification/apply/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceListOrgCerticationApply(data: components['schemas']['api.elder.backend.v1.ListOrgCerticationApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/certification/apply/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceRejectOrgCerticationApply
   * @description POST /elderSvrBackend/v1/organization/certification/apply/reject
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceRejectOrgCerticationApply(data: components['schemas']['api.elder.backend.v1.RejectOrgCerticationApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/certification/apply/reject';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceGetOrgCertications
   * @description POST /elderSvrBackend/v1/organization/certification/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceGetOrgCertications(data: components['schemas']['api.elder.backend.v1.GetOrgCerticationsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/certification/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceCreateOrganization
   * @description POST /elderSvrBackend/v1/organization/create
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceCreateOrganization(data: components['schemas']['api.elder.backend.v1.CreateOrganizationRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/create';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceGetOrganizationDetail
   * @description POST /elderSvrBackend/v1/organization/detail/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceGetOrganizationDetail(data: components['schemas']['api.elder.backend.v1.GetOrganizationDetailRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/detail/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceListOrganizations
   * @description POST /elderSvrBackend/v1/organization/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceListOrganizations(data: components['schemas']['api.elder.backend.v1.ListOrganizationsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceUpdateOrganizationPaymentMethod
   * @description POST /elderSvrBackend/v1/organization/payment/method/update
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceUpdateOrganizationPaymentMethod(data: components['schemas']['api.elder.backend.v1.UpdateOrganizationPaymentMethodRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/payment/method/update';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceListCommunitiesByServiceNetwork
   * @description POST /elderSvrBackend/v1/organization/service/communities
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceListCommunitiesByServiceNetwork(data: components['schemas']['api.elder.backend.v1.ListCommunitiesByServiceNetworkRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/service/communities';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceAddServiceNetwork
   * @description POST /elderSvrBackend/v1/organization/service/network
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceAddServiceNetwork(data: components['schemas']['api.elder.backend.v1.AddServiceNetworkRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/service/network';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceDeleteServiceNetwork
   * @description POST /elderSvrBackend/v1/organization/service/network/delete
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceDeleteServiceNetwork(data: components['schemas']['api.elder.backend.v1.DeleteServiceNetworkRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/service/network/delete';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceListServiceNetwork
   * @description POST /elderSvrBackend/v1/organization/service/network/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceListServiceNetwork(data: components['schemas']['api.elder.backend.v1.ListServiceNetworkRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/service/network/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationServiceUpdateOrganization
   * @description POST /elderSvrBackend/v1/organization/update
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationServiceUpdateOrganization(data: components['schemas']['api.elder.backend.v1.UpdateOrganizationRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrBackend/v1/organization/update';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetNearbyActivitiesPlatform
   * @description POST /elderSvrMiniAPP/activity/platform/v1/suggest
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetNearbyActivitiesPlatform(data: components['schemas']['api.elder.v1.activity.GetSuggestActivityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/platform/v1/suggest';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceCancelCheckin
   * @description POST /elderSvrMiniAPP/activity/v1/cancelCheckin
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceCancelCheckin(data: components['schemas']['api.elder.v1.activity.CancelCheckinRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/cancelCheckin';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceCancelEnroll
   * @description POST /elderSvrMiniAPP/activity/v1/cancel_enroll
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceCancelEnroll(data: components['schemas']['api.elder.v1.activity.CancelEnrollRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/cancel_enroll';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceCheckCancelEnrollPermission
   * @description POST /elderSvrMiniAPP/activity/v1/check_cancel_enroll_permission
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceCheckCancelEnrollPermission(data: components['schemas']['api.elder.v1.activity.CheckCancelEnrollPermissionRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/check_cancel_enroll_permission';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceCheckinActivity
   * @description POST /elderSvrMiniAPP/activity/v1/checkinActivity
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceCheckinActivity(data: components['schemas']['api.elder.v1.activity.CheckinActivityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/checkinActivity';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityCommentServiceCreateComment
   * @description POST /elderSvrMiniAPP/activity/v1/comment/create
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityCommentServiceCreateComment(data: components['schemas']['api.elder.activity.v1.CreateCommentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/comment/create';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityCommentServiceDeleteComment
   * @description POST /elderSvrMiniAPP/activity/v1/comment/delete
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityCommentServiceDeleteComment(data: components['schemas']['api.elder.activity.v1.DeleteCommentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/comment/delete';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityCommentServiceLikeComment
   * @description POST /elderSvrMiniAPP/activity/v1/comment/like
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityCommentServiceLikeComment(data: components['schemas']['api.elder.activity.v1.LikeRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/comment/like';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityCommentServiceGetUserLikedComments
   * @description POST /elderSvrMiniAPP/activity/v1/comment/liked
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityCommentServiceGetUserLikedComments(data: components['schemas']['api.elder.activity.v1.GetUserLikedCommentsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/comment/liked';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityCommentServiceListComments
   * @description POST /elderSvrMiniAPP/activity/v1/comment/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityCommentServiceListComments(data: components['schemas']['api.elder.activity.v1.ListCommentsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/comment/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityCommentServiceListUserCommentsByActivity
   * @description POST /elderSvrMiniAPP/activity/v1/comment/list_by_activity_user
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityCommentServiceListUserCommentsByActivity(data: components['schemas']['api.elder.activity.v1.ListUserCommentsByActivityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/comment/list_by_activity_user';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityCommentServiceUnlikeComment
   * @description POST /elderSvrMiniAPP/activity/v1/comment/unlike
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityCommentServiceUnlikeComment(data: components['schemas']['api.elder.activity.v1.UnlikeRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/comment/unlike';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceCreateActivity
   * @description POST /elderSvrMiniAPP/activity/v1/create_activity
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceCreateActivity(data: components['schemas']['api.elder.v1.activity.CreateActivityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/create_activity';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceCreateMoment
   * @description POST /elderSvrMiniAPP/activity/v1/create_moment
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceCreateMoment(data: components['schemas']['api.elder.v1.activity.CreateMomentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/create_moment';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceCreateActivityTemplate
   * @description POST /elderSvrMiniAPP/activity/v1/create_template
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceCreateActivityTemplate(data: components['schemas']['api.elder.v1.activity.CreateActivityTemplateRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/create_template';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceListDefaultActivities
   * @description POST /elderSvrMiniAPP/activity/v1/default/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceListDefaultActivities(data: components['schemas']['api.elder.v1.activity.ListDefaultActivitiesRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/default/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceDeleteActivity
   * @description POST /elderSvrMiniAPP/activity/v1/delete_activity
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceDeleteActivity(data: components['schemas']['api.elder.v1.activity.DeleteActivityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/delete_activity';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceDeleteMoment
   * @description POST /elderSvrMiniAPP/activity/v1/delete_moment
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceDeleteMoment(data: components['schemas']['api.elder.v1.activity.DeleteMomentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/delete_moment';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceEnrollActivity
   * @description POST /elderSvrMiniAPP/activity/v1/enroll
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceEnrollActivity(data: components['schemas']['api.elder.v1.activity.EnrollActivityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/enroll';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceExportActivityCheckinList
   * @description POST /elderSvrMiniAPP/activity/v1/exportActivityCheckinList
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceExportActivityCheckinList(data: components['schemas']['api.elder.v1.activity.ExportActivityCheckinListRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/exportActivityCheckinList';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGenerateCheckinQRCode
   * @description POST /elderSvrMiniAPP/activity/v1/generateCheckinQRCode
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGenerateCheckinQRCode(data: components['schemas']['api.elder.v1.activity.GenerateCheckinQRCodeRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/generateCheckinQRCode';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGenerateShareInfo
   * @description POST /elderSvrMiniAPP/activity/v1/generate_share
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGenerateShareInfo(data: components['schemas']['api.elder.v1.activity.GenerateShareRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/generate_share';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetActivity
   * @description POST /elderSvrMiniAPP/activity/v1/get_activity
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetActivity(data: components['schemas']['api.elder.v1.activity.GetActivityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/get_activity';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetActivityCustomConfig
   * @description POST /elderSvrMiniAPP/activity/v1/get_activity_custom_config
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetActivityCustomConfig(data: components['schemas']['api.elder.v1.activity.GetActivityCustomConfigRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/get_activity_custom_config';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetActivityByRecruitAndCommunity
   * @description POST /elderSvrMiniAPP/activity/v1/get_by_recruit_and_community
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetActivityByRecruitAndCommunity(data: components['schemas']['api.elder.v1.activity.GetActivityByRecruitAndCommunityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/get_by_recruit_and_community';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetCourseActivityList
   * @description POST /elderSvrMiniAPP/activity/v1/get_course_activity
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetCourseActivityList(data: components['schemas']['api.elder.v1.activity.GetCourseActivitiesRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/get_course_activity';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetCourseActivityById
   * @description POST /elderSvrMiniAPP/activity/v1/get_course_activity_by_id
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetCourseActivityById(data: components['schemas']['api.elder.v1.activity.GetCourseActivityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/get_course_activity_by_id';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetMoment
   * @description POST /elderSvrMiniAPP/activity/v1/get_moment
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetMoment(data: components['schemas']['api.elder.v1.activity.GetMomentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/get_moment';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetMyEnrollActivity
   * @description POST /elderSvrMiniAPP/activity/v1/get_my_enroll_activity
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetMyEnrollActivity(data: components['schemas']['api.elder.v1.activity.GetMyEnrollActivityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/get_my_enroll_activity';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetNearbyActivities
   * @description POST /elderSvrMiniAPP/activity/v1/get_nearby
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetNearbyActivities(data: components['schemas']['api.elder.v1.activity.GetNearbyActivitiesRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/get_nearby';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetNotifications
   * @description POST /elderSvrMiniAPP/activity/v1/get_notify
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetNotifications(data: components['schemas']['api.elder.v1.activity.GetNotificationsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/get_notify';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetOngoingNearbyActivities
   * @description POST /elderSvrMiniAPP/activity/v1/get_ongoing_activity
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetOngoingNearbyActivities(data: components['schemas']['api.elder.v1.activity.GetNearbyActivitiesRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/get_ongoing_activity';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceCancelHealthActivityEnroll
   * @description POST /elderSvrMiniAPP/activity/v1/health/cancel_enroll
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceCancelHealthActivityEnroll(data: components['schemas']['api.elder.v1.activity.CancelHealthActivityEnrollRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/health/cancel_enroll';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceCreateHealthActivity
   * @description POST /elderSvrMiniAPP/activity/v1/health/create
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceCreateHealthActivity(data: components['schemas']['api.elder.v1.activity.CreateHealthActivityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/health/create';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceEnrollHealthActivity
   * @description POST /elderSvrMiniAPP/activity/v1/health/enroll
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceEnrollHealthActivity(data: components['schemas']['api.elder.v1.activity.EnrollHealthActivityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/health/enroll';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetEnrollmentByActivityId
   * @description POST /elderSvrMiniAPP/activity/v1/health/enrollment/get_list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetEnrollmentByActivityId(data: components['schemas']['api.elder.v1.activity.GetEnrollmentByActivityIdRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/health/enrollment/get_list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetEnrollmentDetails
   * @description POST /elderSvrMiniAPP/activity/v1/health/enrollments/get_enroll_detail
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetEnrollmentDetails(data: components['schemas']['api.elder.v1.activity.GetEnrollmentDetailsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/health/enrollments/get_enroll_detail';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceCreateFamilyDoctorAppointment
   * @description POST /elderSvrMiniAPP/activity/v1/health/family_doctor/create_appointment
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceCreateFamilyDoctorAppointment(data: components['schemas']['api.elder.v1.activity.CreateFamilyDoctorAppointmentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/health/family_doctor/create_appointment';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceDeleteFamilyDoctorAppointment
   * @description POST /elderSvrMiniAPP/activity/v1/health/family_doctor/delete_appointment
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceDeleteFamilyDoctorAppointment(data: components['schemas']['api.elder.v1.activity.DeleteFamilyDoctorAppointmentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/health/family_doctor/delete_appointment';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceListFamilyDoctorAppointments
   * @description POST /elderSvrMiniAPP/activity/v1/health/family_doctor/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceListFamilyDoctorAppointments(data: components['schemas']['api.elder.v1.activity.ListFamilyDoctorAppointmentsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/health/family_doctor/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetFamilyDoctorServiceTypes
   * @description POST /elderSvrMiniAPP/activity/v1/health/family_doctor/service_types
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetFamilyDoctorServiceTypes(data: components['schemas']['api.elder.v1.activity.GetFamilyDoctorServiceTypesRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/health/family_doctor/service_types';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceUpdateFamilyDoctorAppointment
   * @description POST /elderSvrMiniAPP/activity/v1/health/family_doctor/update_appointment
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceUpdateFamilyDoctorAppointment(data: components['schemas']['api.elder.v1.activity.UpdateFamilyDoctorAppointmentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/health/family_doctor/update_appointment';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGenerateHealthCheckNotice
   * @description POST /elderSvrMiniAPP/activity/v1/health/generate_notice
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGenerateHealthCheckNotice(data: components['schemas']['api.elder.v1.activity.GenerateHealthCheckNoticeRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/health/generate_notice';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetHealthActivityInfo
   * @description POST /elderSvrMiniAPP/activity/v1/health/get_health_info
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetHealthActivityInfo(data: components['schemas']['api.elder.v1.activity.GetHealthActivityInfoRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/health/get_health_info';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetHealthActivityListShareInfo
   * @description POST /elderSvrMiniAPP/activity/v1/health/get_health_share_info_list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetHealthActivityListShareInfo(data: components['schemas']['api.elder.v1.activity.GetHealthActivityListShareInfoRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/health/get_health_share_info_list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetHealthActivityList
   * @description POST /elderSvrMiniAPP/activity/v1/health/get_list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetHealthActivityList(data: components['schemas']['api.elder.v1.activity.GetHealthActivityListRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/health/get_list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceImportHealthActivity
   * @description POST /elderSvrMiniAPP/activity/v1/health/import
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceImportHealthActivity(data: components['schemas']['api.elder.v1.activity.ImportHealthActivityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/health/import';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetMyEnrollments
   * @description POST /elderSvrMiniAPP/activity/v1/health/my_enrollments
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetMyEnrollments(data: components['schemas']['api.elder.v1.activity.GetMyEnrollmentsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/health/my_enrollments';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceLikeMoment
   * @description POST /elderSvrMiniAPP/activity/v1/like_moment
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceLikeMoment(data: components['schemas']['api.elder.v1.activity.LikeMomentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/like_moment';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceListActivitiesByTemplate
   * @description POST /elderSvrMiniAPP/activity/v1/list_activities_by_template
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceListActivitiesByTemplate(data: components['schemas']['api.elder.v1.activity.ListActivitiesByTemplateRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/list_activities_by_template';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceListActivityTemplates
   * @description POST /elderSvrMiniAPP/activity/v1/list_activity_templates
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceListActivityTemplates(data: components['schemas']['api.elder.v1.activity.ListActivityTplsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/list_activity_templates';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceListAlbumPhotos
   * @description POST /elderSvrMiniAPP/activity/v1/list_album_photos
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceListAlbumPhotos(data: components['schemas']['api.elder.v1.activity.ListAlbumPhotosRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/list_album_photos';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceListAlbums
   * @description POST /elderSvrMiniAPP/activity/v1/list_albums
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceListAlbums(data: components['schemas']['api.elder.v1.activity.ListAlbumsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/list_albums';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceListEnrollActivity
   * @description POST /elderSvrMiniAPP/activity/v1/list_enroll_activity
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceListEnrollActivity(data: components['schemas']['api.elder.v1.activity.ListEnrollActivityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/list_enroll_activity';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceListMoments
   * @description POST /elderSvrMiniAPP/activity/v1/list_moments
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceListMoments(data: components['schemas']['api.elder.v1.activity.ListMomentsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/list_moments';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceListPublishedActivities
   * @description POST /elderSvrMiniAPP/activity/v1/list_published_activities
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceListPublishedActivities(data: components['schemas']['api.elder.v1.activity.ListPublishedActivitiesRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/list_published_activities';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceListUserActivities
   * @description POST /elderSvrMiniAPP/activity/v1/list_user_activities
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceListUserActivities(data: components['schemas']['api.elder.v1.activity.ListUserActivitiesRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/list_user_activities';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceGetActivityPopularity
   * @description POST /elderSvrMiniAPP/activity/v1/popularity/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceGetActivityPopularity(data: components['schemas']['api.elder.v1.activity.GetActivityPopularityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/popularity/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceSearchActivities
   * @description POST /elderSvrMiniAPP/activity/v1/search
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceSearchActivities(data: components['schemas']['api.elder.v1.activity.SearchActivitiesRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/search';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceShareMoment
   * @description POST /elderSvrMiniAPP/activity/v1/share_moment
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceShareMoment(data: components['schemas']['api.elder.v1.activity.ShareMomentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/share_moment';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceSyncToActivityScore
   * @description POST /elderSvrMiniAPP/activity/v1/sync_to_activity_score
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceSyncToActivityScore(data: components['schemas']['api.elder.v1.activity.SyncToActivityScoreRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/sync_to_activity_score';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityServiceUpdateActivity
   * @description POST /elderSvrMiniAPP/activity/v1/update_activity
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityServiceUpdateActivity(data: components['schemas']['api.elder.v1.activity.UpdateActivityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity/v1/update_activity';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityGroupChatServiceCallback
   * @description GET /elderSvrMiniAPP/activity_group_chat/v1/callback
   * @param msgSignature 
   * @param timestamp 
   * @param nonce 
   * @param echostr 
   * @param body 
   * @returns Promise<StandardResponse>
   */
  async activityGroupChatServiceCallback(queryParams?: { msgSignature?: string; timestamp?: string; nonce?: string; echostr?: string; body?: string }, config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity_group_chat/v1/callback';
    const requestConfig: AxiosRequestConfig = {
      method: 'GET',
      url,
      params: queryParams,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityGroupChatServiceGetGroupChatByRecruitAndCommunity
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/get_by_recruit_and_community
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityGroupChatServiceGetGroupChatByRecruitAndCommunity(data: components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatByRecruitAndCommunityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity_group_chat/v1/get_by_recruit_and_community';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityGroupChatServiceGetActivityChatSwitch
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/get_chat_switch
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityGroupChatServiceGetActivityChatSwitch(data: components['schemas']['api.elder.v1.activity_group_chat.GetActivityChatSwitchRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity_group_chat/v1/get_chat_switch';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityGroupChatServiceGetGroupChatDetail
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/get_group_detail
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityGroupChatServiceGetGroupChatDetail(data: components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatDetailRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity_group_chat/v1/get_group_detail';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityGroupChatServiceGetGroupChatQrCode
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/get_info
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityGroupChatServiceGetGroupChatQrCode(data: components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatQrCodeRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity_group_chat/v1/get_info';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityGroupChatServiceSetActivityChatSwitch
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/set_chat_switch
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityGroupChatServiceSetActivityChatSwitch(data: components['schemas']['api.elder.v1.activity_group_chat.SetActivityChatSwitchRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity_group_chat/v1/set_chat_switch';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * activityGroupChatServiceSyncActivityGroupChat
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/sync_data
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async activityGroupChatServiceSyncActivityGroupChat(data: components['schemas']['api.elder.v1.activity_group_chat.SyncActivityGroupChatRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/activity_group_chat/v1/sync_data';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * aiServiceListAiRecordByUserID
   * @description POST /elderSvrMiniAPP/ai/v1/chat/records
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async aiServiceListAiRecordByUserID(data: components['schemas']['api.elder.v1.ai.ListAiRecordByUserIDReq'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/ai/v1/chat/records';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * aiServiceStartChat
   * @description POST /elderSvrMiniAPP/ai/v1/chat/start
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async aiServiceStartChat(data: components['schemas']['api.elder.v1.ai.StartChatReq'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/ai/v1/chat/start';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * aiServiceStopChat
   * @description POST /elderSvrMiniAPP/ai/v1/chat/stop
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async aiServiceStopChat(data: components['schemas']['api.elder.v1.ai.StopChatReq'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/ai/v1/chat/stop';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * aiServiceUpdateChat
   * @description POST /elderSvrMiniAPP/ai/v1/chat/update
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async aiServiceUpdateChat(data: components['schemas']['api.elder.v1.ai.UpdateChatReq'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/ai/v1/chat/update';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * channelSign
   * @description POST /elderSvrMiniAPP/channel/v1/sign
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async channelSign(data: components['schemas']['business.v1.SignRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/channel/v1/sign';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * commonAddressInverseResolution
   * @description POST /elderSvrMiniAPP/common/v1/addressInverseResolution
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async commonAddressInverseResolution(data: components['schemas']['system.v1.AddressInverseResolutionRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/common/v1/addressInverseResolution';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * commonCountUnreadMessage
   * @description POST /elderSvrMiniAPP/common/v1/countUnreadMessages
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async commonCountUnreadMessage(data: components['schemas']['system.v1.CountUnreadMessageRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/common/v1/countUnreadMessages';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * commonGenerateSoundText
   * @description POST /elderSvrMiniAPP/common/v1/generateSoundText
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async commonGenerateSoundText(data: components['schemas']['system.v1.GenerateSoundTextRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/common/v1/generateSoundText';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * commonGenerateWechatQRCode
   * @description POST /elderSvrMiniAPP/common/v1/generateWechatQRCode
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async commonGenerateWechatQRCode(data: components['schemas']['system.v1.GenerateWechatQRCodeRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/common/v1/generateWechatQRCode';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * commonGetCosTempKey
   * @description POST /elderSvrMiniAPP/common/v1/getCosTempKey
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async commonGetCosTempKey(data: components['schemas']['system.v1.GetCosTempKeyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/common/v1/getCosTempKey';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * commonHealthyCheck
   * @description GET /elderSvrMiniAPP/common/v1/healthy

   * @returns Promise<StandardResponse>
   */
  async commonHealthyCheck(config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/common/v1/healthy';
    const requestConfig: AxiosRequestConfig = {
      method: 'GET',
      url,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * commonNavigateToMiniProgram
   * @description POST /elderSvrMiniAPP/common/v1/navigateToMiniProgram
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async commonNavigateToMiniProgram(data: components['schemas']['system.v1.NavigateToMiniProgramRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/common/v1/navigateToMiniProgram';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * commonSetMessageStatusRead
   * @description POST /elderSvrMiniAPP/common/v1/setMessageStatusRead
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async commonSetMessageStatusRead(data: components['schemas']['system.v1.MessageStatusChangeRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/common/v1/setMessageStatusRead';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * commonStopServer
   * @description GET /elderSvrMiniAPP/common/v1/stopServer

   * @returns Promise<StandardResponse>
   */
  async commonStopServer(config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/common/v1/stopServer';
    const requestConfig: AxiosRequestConfig = {
      method: 'GET',
      url,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * contributionServiceBatchCreateContributions
   * @description POST /elderSvrMiniAPP/contribution/v1/records/batch
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async contributionServiceBatchCreateContributions(data: components['schemas']['api.elder.v1.contribution.BatchCreateContributionsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/contribution/v1/records/batch';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * contributionServiceCreateContribution
   * @description POST /elderSvrMiniAPP/contribution/v1/records/create
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async contributionServiceCreateContribution(data: components['schemas']['api.elder.v1.contribution.CreateContributionRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/contribution/v1/records/create';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * contributionServiceListUserContributions
   * @description POST /elderSvrMiniAPP/contribution/v1/records/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async contributionServiceListUserContributions(data: components['schemas']['api.elder.v1.contribution.ListUserContributionsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/contribution/v1/records/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * contributionServiceGetUserContributionRank
   * @description POST /elderSvrMiniAPP/contribution/v1/records/rank
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async contributionServiceGetUserContributionRank(data: components['schemas']['api.elder.v1.contribution.GetUserContributionRankRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/contribution/v1/records/rank';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * contributionServiceGetUserContributionStats
   * @description GET /elderSvrMiniAPP/contribution/v1/records/stats
   * @param userId 
   * @returns Promise<StandardResponse>
   */
  async contributionServiceGetUserContributionStats(queryParams?: { userId?: string }, config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/contribution/v1/records/stats';
    const requestConfig: AxiosRequestConfig = {
      method: 'GET',
      url,
      params: queryParams,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * couponGrabCoupon
   * @description POST /elderSvrMiniAPP/coupon/v1/grab_coupon
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async couponGrabCoupon(data: components['schemas']['coupon.v1.GrabCouponRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/coupon/v1/grab_coupon';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * couponGrabCouponStatus
   * @description POST /elderSvrMiniAPP/coupon/v1/grab_coupon_status
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async couponGrabCouponStatus(data: components['schemas']['coupon.v1.GrabCouponStatusRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/coupon/v1/grab_coupon_status';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * couponInnerConsumeUserCoupon
   * @description POST /elderSvrMiniAPP/coupon/v1/inner_consume_user_coupon
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async couponInnerConsumeUserCoupon(data: components['schemas']['coupon.v1.UserCouponRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/coupon/v1/inner_consume_user_coupon';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * couponMyCoupons
   * @description POST /elderSvrMiniAPP/coupon/v1/my_coupons
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async couponMyCoupons(data: components['schemas']['coupon.v1.CommonRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/coupon/v1/my_coupons';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * courseServiceCancelEnroll
   * @description POST /elderSvrMiniAPP/course/v1/cancel_enroll
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async courseServiceCancelEnroll(data: components['schemas']['api.elder.v1.course.CancelEnrollRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/course/v1/cancel_enroll';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * courseServiceEnrollCourse
   * @description POST /elderSvrMiniAPP/course/v1/enroll
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async courseServiceEnrollCourse(data: components['schemas']['api.elder.v1.course.EnrollCourseRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/course/v1/enroll';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * courseServiceGetCourse
   * @description POST /elderSvrMiniAPP/course/v1/get_course
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async courseServiceGetCourse(data: components['schemas']['api.elder.v1.course.GetCourseRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/course/v1/get_course';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * courseServiceGetCourseSchedule
   * @description POST /elderSvrMiniAPP/course/v1/get_course_schedule
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async courseServiceGetCourseSchedule(data: components['schemas']['api.elder.v1.course.GetCourseScheduleRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/course/v1/get_course_schedule';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * courseServiceGetMyEnrollCourses
   * @description POST /elderSvrMiniAPP/course/v1/get_my_enroll_courses
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async courseServiceGetMyEnrollCourses(data: components['schemas']['api.elder.v1.course.GetMyEnrollCoursesRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/course/v1/get_my_enroll_courses';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * courseServiceGetNearbyCourses
   * @description POST /elderSvrMiniAPP/course/v1/get_nearby
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async courseServiceGetNearbyCourses(data: components['schemas']['api.elder.v1.course.GetNearbyCoursesRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/course/v1/get_nearby';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * courseServiceListCourseEnrolls
   * @description POST /elderSvrMiniAPP/course/v1/list_enrolls
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async courseServiceListCourseEnrolls(data: components['schemas']['api.elder.v1.course.ListCourseEnrollsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/course/v1/list_enrolls';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * emergencyCall
   * @description POST /elderSvrMiniAPP/emergency/v1/call
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async emergencyCall(data: components['schemas']['business.v1.CallRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/emergency/v1/call';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * emergencyCancelCall
   * @description POST /elderSvrMiniAPP/emergency/v1/cancelCall
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async emergencyCancelCall(data: components['schemas']['business.v1.CancelCallRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/emergency/v1/cancelCall';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * emergencyCreate
   * @description POST /elderSvrMiniAPP/emergency/v1/create
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async emergencyCreate(data: components['schemas']['business.v1.CreateRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/emergency/v1/create';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * emergencyDescribeEmergencyTRTCInfo
   * @description POST /elderSvrMiniAPP/emergency/v1/describeEmergencyTRTCInfo
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async emergencyDescribeEmergencyTRTCInfo(data: components['schemas']['business.v1.DescribeEmergencyTRTCInfoRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/emergency/v1/describeEmergencyTRTCInfo';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * emergencyDescribeEmergencyTRTCUsers
   * @description POST /elderSvrMiniAPP/emergency/v1/describeEmergencyTRTCUsers
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async emergencyDescribeEmergencyTRTCUsers(data: components['schemas']['business.v1.DescribeEmergencyTRTCUsersRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/emergency/v1/describeEmergencyTRTCUsers';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * emergencyDescribeEmergencyTimelines
   * @description POST /elderSvrMiniAPP/emergency/v1/describeEmergencyTimelines
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async emergencyDescribeEmergencyTimelines(data: components['schemas']['business.v1.DescribeEmergencyTimelinesRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/emergency/v1/describeEmergencyTimelines';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * emergencyMatchRespondRegion
   * @description POST /elderSvrMiniAPP/emergency/v1/matchRespondRegion
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async emergencyMatchRespondRegion(data: components['schemas']['business.v1.MatchRespondRegionRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/emergency/v1/matchRespondRegion';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceSyncUpdateRequestAddress
   * @description POST /elderSvrMiniAPP/help/v1/address/sync
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceSyncUpdateRequestAddress(data: components['schemas']['api.elder.help.v1.SyncUpdateRequestAddressRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/address/sync';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceGetCategoriesTree
   * @description POST /elderSvrMiniAPP/help/v1/categories/tree
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceGetCategoriesTree(data: components['schemas']['api.elder.help.v1.GetCategoriesTreeRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/categories/tree';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceDeleteCategory
   * @description POST /elderSvrMiniAPP/help/v1/category/delete
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceDeleteCategory(data: components['schemas']['api.elder.help.v1.DeleteCategoryRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/category/delete';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceListCategories
   * @description POST /elderSvrMiniAPP/help/v1/category/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceListCategories(data: components['schemas']['api.elder.help.v1.ListCategoriesRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/category/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceSearchHelpCategory
   * @description POST /elderSvrMiniAPP/help/v1/category/search
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceSearchHelpCategory(data: components['schemas']['api.elder.help.v1.SearchHelpCategoryRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/category/search';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceGetHelpRequestCategorySummary
   * @description POST /elderSvrMiniAPP/help/v1/category/summary
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceGetHelpRequestCategorySummary(data: components['schemas']['api.elder.help.v1.GetHelpRequestCategorySummaryRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/category/summary';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceUpsertCategory
   * @description POST /elderSvrMiniAPP/help/v1/category/upsert
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceUpsertCategory(data: components['schemas']['api.elder.help.v1.UpsertCategoryRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/category/upsert';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceGetCommunityCategories
   * @description POST /elderSvrMiniAPP/help/v1/community/categories
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceGetCommunityCategories(data: components['schemas']['api.elder.help.v1.GetCommunityCategoriesRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/community/categories';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceCreateOrUpdateContact
   * @description POST /elderSvrMiniAPP/help/v1/contact/create_or_update
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceCreateOrUpdateContact(data: components['schemas']['api.elder.help.v1.CreateOrUpdateContactRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/contact/create_or_update';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceDeleteContact
   * @description POST /elderSvrMiniAPP/help/v1/contact/delete
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceDeleteContact(data: components['schemas']['api.elder.help.v1.DeleteContactRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/contact/delete';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceListUserContacts
   * @description POST /elderSvrMiniAPP/help/v1/contact/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceListUserContacts(data: components['schemas']['api.elder.help.v1.ListUserContactsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/contact/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceSyncUpdateContact
   * @description POST /elderSvrMiniAPP/help/v1/contact/sync
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceSyncUpdateContact(data: components['schemas']['api.elder.help.v1.SyncUpdateContactRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/contact/sync';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceGetOrgByHelpCategory
   * @description POST /elderSvrMiniAPP/help/v1/paid_org
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceGetOrgByHelpCategory(data: components['schemas']['api.elder.help.v1.GetOrgByHelpCategoryRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/paid_org';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceListOrgByCommunity
   * @description POST /elderSvrMiniAPP/help/v1/paid_org/by_community
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceListOrgByCommunity(data: components['schemas']['api.elder.help.v1.ListOrgByCommunityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/paid_org/by_community';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceGetCommunityPaidOrg
   * @description POST /elderSvrMiniAPP/help/v1/paid_org/by_org
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceGetCommunityPaidOrg(data: components['schemas']['api.elder.help.v1.GetCommunityPaidOrgRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/paid_org/by_org';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceCancelHelpRequest
   * @description POST /elderSvrMiniAPP/help/v1/request/cancel
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceCancelHelpRequest(data: components['schemas']['api.elder.help.v1.CancelHelpRequestRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/request/cancel';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceCreateHelpRequest
   * @description POST /elderSvrMiniAPP/help/v1/request/create
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceCreateHelpRequest(data: components['schemas']['api.elder.help.v1.CreateHelpRequestRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/request/create';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceCreateByThirdParty
   * @description POST /elderSvrMiniAPP/help/v1/request/create_by_third_party
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceCreateByThirdParty(data: components['schemas']['api.elder.help.v1.CreateHelpRequestThirdParty'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/request/create_by_third_party';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceCreateRetroactiveHelpRequest
   * @description POST /elderSvrMiniAPP/help/v1/request/create_retroactive
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceCreateRetroactiveHelpRequest(data: components['schemas']['api.elder.help.v1.CreateRetroactiveHelpRequestRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/request/create_retroactive';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceGetHelpRequestDetail
   * @description POST /elderSvrMiniAPP/help/v1/request/detail
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceGetHelpRequestDetail(data: components['schemas']['api.elder.help.v1.GetHelpRequestDetailRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/request/detail';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceFinishHelpRequest
   * @description POST /elderSvrMiniAPP/help/v1/request/finish
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceFinishHelpRequest(data: components['schemas']['api.elder.help.v1.FinishHelpRequestRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/request/finish';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceGetRetroactiveDraft
   * @description POST /elderSvrMiniAPP/help/v1/request/get_retroactive_draft
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceGetRetroactiveDraft(data: components['schemas']['api.elder.help.v1.GetRetroactiveDraftRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/request/get_retroactive_draft';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceGetStatusDetail
   * @description POST /elderSvrMiniAPP/help/v1/request/get_status_detail
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceGetStatusDetail(data: components['schemas']['api.elder.help.v1.GetStatusDetailRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/request/get_status_detail';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceListHelpRequests
   * @description POST /elderSvrMiniAPP/help/v1/request/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceListHelpRequests(data: components['schemas']['api.elder.help.v1.ListHelpRequestsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/request/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceGetMyPublishedRequests
   * @description POST /elderSvrMiniAPP/help/v1/request/my_published
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceGetMyPublishedRequests(data: components['schemas']['api.elder.help.v1.GetMyPublishedRequestsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/request/my_published';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServicePreCheck
   * @description POST /elderSvrMiniAPP/help/v1/request/pre_check
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServicePreCheck(data: components['schemas']['api.elder.help.v1.PreCheckRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/request/pre_check';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceSaveRetroactiveDraft
   * @description POST /elderSvrMiniAPP/help/v1/request/save_retroactive_draft
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceSaveRetroactiveDraft(data: components['schemas']['api.elder.help.v1.SaveRetroactiveDraftRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/request/save_retroactive_draft';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceSyncData
   * @description POST /elderSvrMiniAPP/help/v1/request/sync_data
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceSyncData(data: components['schemas']['api.elder.help.v1.SyncDataRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/request/sync_data';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceTriggerFillLocationForOldRequests
   * @description POST /elderSvrMiniAPP/help/v1/request/trigger_fill_location
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceTriggerFillLocationForOldRequests(data: components['schemas']['api.elder.help.v1.TriggerFillLocationRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/request/trigger_fill_location';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceUnFinishHelpRequest
   * @description POST /elderSvrMiniAPP/help/v1/request/un_finish
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceUnFinishHelpRequest(data: components['schemas']['api.elder.help.v1.FinishHelpRequestRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/request/un_finish';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceBatchUpdateCityInfo
   * @description POST /elderSvrMiniAPP/help/v1/request/update_city_info
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceBatchUpdateCityInfo(data: components['schemas']['api.elder.help.v1.BatchUpdateCityInfoRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/request/update_city_info';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helpCenterServiceUpdateHelpRequestStatus
   * @description POST /elderSvrMiniAPP/help/v1/request/update_status
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helpCenterServiceUpdateHelpRequestStatus(data: components['schemas']['api.elder.help.v1.UpdateHelpRequestStatusRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/help/v1/request/update_status';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceApplyHelper
   * @description POST /elderSvrMiniAPP/helper/v1/apply
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceApplyHelper(data: components['schemas']['api.elder.help.v1.ApplyHelperRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/apply';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceApproveHelperApply
   * @description POST /elderSvrMiniAPP/helper/v1/apply/approve
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceApproveHelperApply(data: components['schemas']['api.elder.help.v1.ApproveHelperApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/apply/approve';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceCancelHelperApply
   * @description POST /elderSvrMiniAPP/helper/v1/apply/cancel
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceCancelHelperApply(data: components['schemas']['api.elder.help.v1.CancelHelperApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/apply/cancel';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceGetHelperApply
   * @description POST /elderSvrMiniAPP/helper/v1/apply/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceGetHelperApply(data: components['schemas']['api.elder.help.v1.GetHelperApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/apply/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceListHelperApply
   * @description POST /elderSvrMiniAPP/helper/v1/apply/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceListHelperApply(data: components['schemas']['api.elder.help.v1.ListHelperApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/apply/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceRefuseHelperApply
   * @description POST /elderSvrMiniAPP/helper/v1/apply/refuse
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceRefuseHelperApply(data: components['schemas']['api.elder.help.v1.RefuseHelperApplyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/apply/refuse';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceCommentHelpEnrollment
   * @description POST /elderSvrMiniAPP/helper/v1/comment
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceCommentHelpEnrollment(data: components['schemas']['api.elder.help.v1.CommentHelpEnrollmentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/comment';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceGetRequestComment
   * @description POST /elderSvrMiniAPP/helper/v1/comment/by_request
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceGetRequestComment(data: components['schemas']['api.elder.help.v1.GetRequestCommentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/comment/by_request';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceTriggerPopulateCommentStatics
   * @description POST /elderSvrMiniAPP/helper/v1/comment/migration
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceTriggerPopulateCommentStatics(data: components['schemas']['api.elder.help.v1.TriggerPopulateCommentStaticsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/comment/migration';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceGetAllResidentCommunities
   * @description POST /elderSvrMiniAPP/helper/v1/communities
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceGetAllResidentCommunities(data: components['schemas']['api.elder.help.v1.GetAllResidentCommunitiesRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/communities';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceGetHelperRequestEnrollment
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceGetHelperRequestEnrollment(data: components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/enrollment/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceListHelpEnrollmentHomPage
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/home_page
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceListHelpEnrollmentHomPage(data: components['schemas']['api.elder.help.v1.ListHelpEnrollmentHomPageRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/enrollment/home_page';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceListHelperRequestEnrollment
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceListHelperRequestEnrollment(data: components['schemas']['api.elder.help.v1.ListHelperRequestEnrollmentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/enrollment/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceListHelpRequestEnrollmentByOrg
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/list/by_org
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceListHelpRequestEnrollmentByOrg(data: components['schemas']['api.elder.help.v1.ListHelpRequestEnrollmentByOrgRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/enrollment/list/by_org';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceListEnrollmentPhotoByOrgAndCommunity
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/photo/by_org
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceListEnrollmentPhotoByOrgAndCommunity(data: components['schemas']['api.elder.help.v1.ListEnrollmentPhotoByOrgAndCommunityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/enrollment/photo/by_org';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceGetHelperEnrollmentPhoto
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/photo/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceGetHelperEnrollmentPhoto(data: components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/enrollment/photo/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceGetHelperRequestEnrollmentUser
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/user/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceGetHelperRequestEnrollmentUser(data: components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentUserRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/enrollment/user/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceGetHelper
   * @description POST /elderSvrMiniAPP/helper/v1/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceGetHelper(data: components['schemas']['api.elder.help.v1.GetHelperRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceGetHelperWithCommunity
   * @description POST /elderSvrMiniAPP/helper/v1/get_by_community
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceGetHelperWithCommunity(data: components['schemas']['api.elder.help.v1.GetHelperWithCommunityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/get_by_community';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceGetLastAuthorizedHelper
   * @description POST /elderSvrMiniAPP/helper/v1/get_last_authorized
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceGetLastAuthorizedHelper(data: components['schemas']['api.elder.help.v1.GetHelperRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/get_last_authorized';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceTriggerPopulateLevelStatics
   * @description POST /elderSvrMiniAPP/helper/v1/level/migration
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceTriggerPopulateLevelStatics(data: components['schemas']['api.elder.help.v1.TriggerPopulateCommentStaticsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/level/migration';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceListResidentLikeCnt
   * @description POST /elderSvrMiniAPP/helper/v1/like_cnt
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceListResidentLikeCnt(data: components['schemas']['api.elder.help.v1.ListResidentLikeCntRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/like_cnt';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceGetMyEnrolledHelpRequest
   * @description POST /elderSvrMiniAPP/helper/v1/my_enrolled
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceGetMyEnrolledHelpRequest(data: components['schemas']['api.elder.help.v1.GetMyEnrolledHelpRequestRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/my_enrolled';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceGetResidents2Comment
   * @description POST /elderSvrMiniAPP/helper/v1/need_to_comment
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceGetResidents2Comment(data: components['schemas']['api.elder.help.v1.GetResidents2CommentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/need_to_comment';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceEnrollHelpRequest
   * @description POST /elderSvrMiniAPP/helper/v1/request/enroll
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceEnrollHelpRequest(data: components['schemas']['api.elder.help.v1.EnrollHelpRequestRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/request/enroll';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceCancelEnrollHelpRequest
   * @description POST /elderSvrMiniAPP/helper/v1/request/enroll/cancel
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceCancelEnrollHelpRequest(data: components['schemas']['api.elder.help.v1.CancelHelpRequestEnrollmentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/request/enroll/cancel';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceFinishEnrollHelpRequest
   * @description POST /elderSvrMiniAPP/helper/v1/request/finish
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceFinishEnrollHelpRequest(data: components['schemas']['api.elder.help.v1.FinishHelpEnrollmentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/helper/v1/request/finish';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * hospitalCheckSeekMedicalCondition
   * @description POST /elderSvrMiniAPP/hospital/v1/checkSeekMedicalCondition
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async hospitalCheckSeekMedicalCondition(data: components['schemas']['seek_medical.v1.CheckSeekMedicalConditionRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/hospital/v1/checkSeekMedicalCondition';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * hospitalDescribeDoctor
   * @description POST /elderSvrMiniAPP/hospital/v1/describeDoctor
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async hospitalDescribeDoctor(data: components['schemas']['seek_medical.v1.DescribeDoctorRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/hospital/v1/describeDoctor';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * hospitalDescribeDoctorSchedule
   * @description POST /elderSvrMiniAPP/hospital/v1/describeDoctorSchedule
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async hospitalDescribeDoctorSchedule(data: components['schemas']['seek_medical.v1.DescribeDoctorScheduleRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/hospital/v1/describeDoctorSchedule';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * hospitalDescribeElderInfoList
   * @description POST /elderSvrMiniAPP/hospital/v1/describeElderInfoList
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async hospitalDescribeElderInfoList(data: components['schemas']['seek_medical.v1.DescribeElderInfoListRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/hospital/v1/describeElderInfoList';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * hospitalDescribeHospital
   * @description POST /elderSvrMiniAPP/hospital/v1/describeHospital
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async hospitalDescribeHospital(data: components['schemas']['seek_medical.v1.DescribeHospitalRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/hospital/v1/describeHospital';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * hospitalGetHospitalInfoByDoctorID
   * @description POST /elderSvrMiniAPP/hospital/v1/getHospitalInfoByDoctorID
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async hospitalGetHospitalInfoByDoctorID(data: components['schemas']['seek_medical.v1.GetHospitalInfoByDoctorIDRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/hospital/v1/getHospitalInfoByDoctorID';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * hospitalHealthMessageInfo
   * @description POST /elderSvrMiniAPP/hospital/v1/healthMessageInfo
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async hospitalHealthMessageInfo(data: components['schemas']['seek_medical.v1.HealthMessageInfoRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/hospital/v1/healthMessageInfo';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * hospitalHealthMessageList
   * @description POST /elderSvrMiniAPP/hospital/v1/healthMessageList
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async hospitalHealthMessageList(data: components['schemas']['seek_medical.v1.HealthMessageListRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/hospital/v1/healthMessageList';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * hospitalCheckElderSubscribeHealthMessage
   * @description POST /elderSvrMiniAPP/hospital/v1/sheckElderSubscribeHealthMessage
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async hospitalCheckElderSubscribeHealthMessage(data: components['schemas']['seek_medical.v1.HospitalNullBodyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/hospital/v1/sheckElderSubscribeHealthMessage';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * imGetUserSig
   * @description POST /elderSvrMiniAPP/im/v1/getUserSig
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async imGetUserSig(data: components['schemas']['business.v1.ImNullBodyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/im/v1/getUserSig';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * imImConfig
   * @description POST /elderSvrMiniAPP/im/v1/imConfig
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async imImConfig(data: components['schemas']['business.v1.ImNullBodyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/im/v1/imConfig';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * loginLogout
   * @description POST /elderSvrMiniAPP/login/v1/logout
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async loginLogout(data: components['schemas']['system.v1.LogoutRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/login/v1/logout';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * loginRefresh
   * @description POST /elderSvrMiniAPP/login/v1/refresh
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async loginRefresh(data: components['schemas']['system.v1.RefreshRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/login/v1/refresh';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * loginWxLogin
   * @description POST /elderSvrMiniAPP/login/v1/wxLogin
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async loginWxLogin(data: components['schemas']['system.v1.WxLoginRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/login/v1/wxLogin';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * messageModifyMiniProgromMessageSubscribe
   * @description POST /elderSvrMiniAPP/message/v1/ModifyMiniProgromMessageSubscribe
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async messageModifyMiniProgromMessageSubscribe(data: components['schemas']['business.v1.ModifyMiniProgromMessageSubscribeRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/message/v1/ModifyMiniProgromMessageSubscribe';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationGetOrganization
   * @description POST /elderSvrMiniAPP/organization/v1/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationGetOrganization(data: components['schemas']['api.elder.organization.v1.GetOrganizationRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/organization/v1/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * organizationJoinOrg
   * @description POST /elderSvrMiniAPP/organization/v1/join
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async organizationJoinOrg(data: components['schemas']['api.elder.organization.v1.JoinOrgRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/organization/v1/join';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * paymentServiceCloseOrder
   * @description POST /elderSvrMiniAPP/payment/v1/close_order
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async paymentServiceCloseOrder(data: components['schemas']['api.elder.payment.v1.CloseOrderReq'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/payment/v1/close_order';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * paymentServiceCompleteOrder
   * @description POST /elderSvrMiniAPP/payment/v1/complete_order
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async paymentServiceCompleteOrder(data: components['schemas']['api.elder.payment.v1.CompleteOrderReq'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/payment/v1/complete_order';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * paymentServiceGetWxPaySign
   * @description POST /elderSvrMiniAPP/payment/v1/get_wx_pay_sign
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async paymentServiceGetWxPaySign(data: components['schemas']['api.elder.payment.v1.GetWxPaySignReq'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/payment/v1/get_wx_pay_sign';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * paymentServiceListTransactions
   * @description POST /elderSvrMiniAPP/payment/v1/list_transactions
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async paymentServiceListTransactions(data: string, config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/payment/v1/list_transactions';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * paymentServicePrePay
   * @description POST /elderSvrMiniAPP/payment/v1/pre_pay
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async paymentServicePrePay(data: components['schemas']['api.elder.payment.v1.PrePayReq'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/payment/v1/pre_pay';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * paymentServiceRefund
   * @description POST /elderSvrMiniAPP/payment/v1/refund
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async paymentServiceRefund(data: components['schemas']['api.elder.payment.v1.RefundReq'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/payment/v1/refund';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * recruitmentServiceListRecruitApplicants
   * @description POST /elderSvrMiniAPP/recruit/v1/applicants
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async recruitmentServiceListRecruitApplicants(data: components['schemas']['api.elder.activity.v1.ListRecruitApplicantsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/recruit/v1/applicants';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * recruitmentServiceApplyRecruitCampaign
   * @description POST /elderSvrMiniAPP/recruit/v1/apply
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async recruitmentServiceApplyRecruitCampaign(data: components['schemas']['api.elder.activity.v1.ApplyRecruitCampaignRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/recruit/v1/apply';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * recruitmentServiceCheckRecruitApplied
   * @description POST /elderSvrMiniAPP/recruit/v1/check_applied
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async recruitmentServiceCheckRecruitApplied(data: components['schemas']['api.elder.activity.v1.CheckRecruitAppliedRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/recruit/v1/check_applied';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * recruitmentServiceCreateRecruitCampaign
   * @description POST /elderSvrMiniAPP/recruit/v1/create
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async recruitmentServiceCreateRecruitCampaign(data: components['schemas']['api.elder.activity.v1.CreateRecruitCampaignRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/recruit/v1/create';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * recruitmentServiceDeleteRecruitCampaign
   * @description POST /elderSvrMiniAPP/recruit/v1/delete
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async recruitmentServiceDeleteRecruitCampaign(data: components['schemas']['api.elder.activity.v1.DeleteRecruitCampaignRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/recruit/v1/delete';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * recruitmentServiceListRecruitCampaigns
   * @description POST /elderSvrMiniAPP/recruit/v1/list
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async recruitmentServiceListRecruitCampaigns(data: components['schemas']['api.elder.activity.v1.ListRecruitCampaignsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/recruit/v1/list';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * restaurantServiceGetOrderHistory
   * @description POST /elderSvrMiniAPP/restaurant/v1/getOrderHistory
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async restaurantServiceGetOrderHistory(data: components['schemas']['api.food_delivery.v1.OrderHistoryRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/restaurant/v1/getOrderHistory';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * restaurantServiceGetRestaurantDetail
   * @description POST /elderSvrMiniAPP/restaurant/v1/getRestaurantDetail
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async restaurantServiceGetRestaurantDetail(data: components['schemas']['api.food_delivery.v1.RestaurantDetailRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/restaurant/v1/getRestaurantDetail';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * restaurantServiceGetRestaurantMenu
   * @description POST /elderSvrMiniAPP/restaurant/v1/getRestaurantMenu
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async restaurantServiceGetRestaurantMenu(data: components['schemas']['api.food_delivery.v1.MenuRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/restaurant/v1/getRestaurantMenu';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * restaurantServiceGetScanHistory
   * @description POST /elderSvrMiniAPP/restaurant/v1/getScanHistory
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async restaurantServiceGetScanHistory(data: components['schemas']['api.food_delivery.v1.ScanHistoryRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/restaurant/v1/getScanHistory';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * restaurantServiceImportMenu
   * @description POST /elderSvrMiniAPP/restaurant/v1/import
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async restaurantServiceImportMenu(data: components['schemas']['api.food_delivery.v1.ImportMenuRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/restaurant/v1/import';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * restaurantServiceListOrders
   * @description POST /elderSvrMiniAPP/restaurant/v1/listOrders
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async restaurantServiceListOrders(data: components['schemas']['api.food_delivery.v1.ListOrdersRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/restaurant/v1/listOrders';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * restaurantServicePlaceOrder
   * @description POST /elderSvrMiniAPP/restaurant/v1/placeOrder
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async restaurantServicePlaceOrder(data: components['schemas']['api.food_delivery.v1.PlaceOrderRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/restaurant/v1/placeOrder';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * restaurantServiceSearchInAreaRestaurants
   * @description POST /elderSvrMiniAPP/restaurant/v1/searchInAreaRestaurants
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async restaurantServiceSearchInAreaRestaurants(data: components['schemas']['api.food_delivery.v1.SearchInAreaRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/restaurant/v1/searchInAreaRestaurants';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * syncRestaurantServiceSyncTask
   * @description POST /elderSvrMiniAPP/restaurant/v1/sync_task
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async syncRestaurantServiceSyncTask(data: components['schemas']['api.food_delivery.v1.ImportMenuRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/restaurant/v1/sync_task';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * restaurantServiceUpdateMenuItems
   * @description POST /elderSvrMiniAPP/restaurant/v1/updateMenuItems
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async restaurantServiceUpdateMenuItems(data: components['schemas']['api.food_delivery.v1.UpdateMenuItemsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/restaurant/v1/updateMenuItems';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * restaurantServiceUpdateMenuItemsIncremental
   * @description POST /elderSvrMiniAPP/restaurant/v1/updateMenuItemsIncremental
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async restaurantServiceUpdateMenuItemsIncremental(data: components['schemas']['api.food_delivery.v1.UpdateMenuItemsIncrementalRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/restaurant/v1/updateMenuItemsIncremental';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * restaurantServiceUploadMenuImages
   * @description POST /elderSvrMiniAPP/restaurant/v1/upload
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async restaurantServiceUploadMenuImages(data: components['schemas']['api.food_delivery.v1.UploadMenuImagesRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/restaurant/v1/upload';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * restaurantServiceUpsertRestaurantInfo
   * @description POST /elderSvrMiniAPP/restaurant/v1/upsertRestaurantInfo
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async restaurantServiceUpsertRestaurantInfo(data: components['schemas']['api.food_delivery.v1.UpsertRestaurantInfoRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/restaurant/v1/upsertRestaurantInfo';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceElderConfirmServiceCompleted
   * @description POST /elderSvrMiniAPP/service/v1/ElderConfirmServiceCompleted
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceElderConfirmServiceCompleted(data: components['schemas']['business.v1.ElderConfirmServiceCompletedRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/ElderConfirmServiceCompleted';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceBrowseArticle
   * @description POST /elderSvrMiniAPP/service/v1/browseArticle
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceBrowseArticle(data: components['schemas']['business.v1.BrowseArticleRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/browseArticle';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceCancelService
   * @description POST /elderSvrMiniAPP/service/v1/cancel
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceCancelService(data: components['schemas']['business.v1.CancelServiceRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/cancel';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceChatServiceStatusChangeNotice
   * @description POST /elderSvrMiniAPP/service/v1/chatServiceStatusChangeNotice
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceChatServiceStatusChangeNotice(data: components['schemas']['business.v1.ChatServiceStatusChangeNoticeRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/chatServiceStatusChangeNotice';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceCompletePaidService
   * @description POST /elderSvrMiniAPP/service/v1/completePaidService
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceCompletePaidService(data: components['schemas']['business.v1.CompletePaidServiceRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/completePaidService';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceThirdCreateService
   * @description POST /elderSvrMiniAPP/service/v1/createService
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceThirdCreateService(data: components['schemas']['business.v1.ThirdCreateServiceInfo'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/createService';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceCreateService
   * @description POST /elderSvrMiniAPP/service/v1/createServiceRPC
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceCreateService(data: components['schemas']['server.v1.CreateServiceRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/createServiceRPC';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceDescribeService
   * @description POST /elderSvrMiniAPP/service/v1/describeService
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceDescribeService(data: components['schemas']['business.v1.DescribeServiceRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/describeService';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceDescribeServiceList
   * @description POST /elderSvrMiniAPP/service/v1/describeServiceList
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceDescribeServiceList(data: components['schemas']['business.v1.DescribeServiceListRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/describeServiceList';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceServiceEvaluate
   * @description POST /elderSvrMiniAPP/service/v1/evaluate/save
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceServiceEvaluate(data: components['schemas']['business.v1.ServiceEvaluateRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/evaluate/save';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceFindCommunityPlaza
   * @description POST /elderSvrMiniAPP/service/v1/findCommunityPlaza
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceFindCommunityPlaza(data: components['schemas']['business.v1.FindCommunityPlazaRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/findCommunityPlaza';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceGetLastServiceEvaluate
   * @description POST /elderSvrMiniAPP/service/v1/getLastServiceEvaluate
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceGetLastServiceEvaluate(data: components['schemas']['business.v1.GetLastServiceEvaluateRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/getLastServiceEvaluate';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceGetPaidServiceByVerifyToken
   * @description POST /elderSvrMiniAPP/service/v1/getPaidServiceByVerifyToken
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceGetPaidServiceByVerifyToken(data: components['schemas']['business.v1.GetPaidServiceByVerifyTokenRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/getPaidServiceByVerifyToken';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceGetRoomUserInfo
   * @description POST /elderSvrMiniAPP/service/v1/getRoomUserInfo
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceGetRoomUserInfo(data: components['schemas']['business.v1.GetRoomUserInfoRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/getRoomUserInfo';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceGetServiceUsageCount
   * @description POST /elderSvrMiniAPP/service/v1/getServiceUsageCount
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceGetServiceUsageCount(data: components['schemas']['business.v1.GetServiceUsageCountRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/getServiceUsageCount';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceGetTrTc
   * @description POST /elderSvrMiniAPP/service/v1/getTrTc
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceGetTrTc(data: components['schemas']['business.v1.GetTrTcRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/getTrTc';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceHangUp
   * @description POST /elderSvrMiniAPP/service/v1/hangUp
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceHangUp(data: components['schemas']['business.v1.HangUpRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/hangUp';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceHomeBannerServiceList
   * @description POST /elderSvrMiniAPP/service/v1/homeBannerServiceList
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceHomeBannerServiceList(data: components['schemas']['business.v1.HomeBannerServiceListRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/homeBannerServiceList';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceMineHelpServiceList
   * @description POST /elderSvrMiniAPP/service/v1/mineHelpServiceList
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceMineHelpServiceList(data: components['schemas']['business.v1.MineHelpServiceListRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/mineHelpServiceList';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceServicePersonAcceptService
   * @description POST /elderSvrMiniAPP/service/v1/servicePersonAcceptService
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceServicePersonAcceptService(data: components['schemas']['business.v1.ServicePersonAcceptServiceRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/servicePersonAcceptService';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceServicePersonCancelService
   * @description POST /elderSvrMiniAPP/service/v1/servicePersonCancelService
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceServicePersonCancelService(data: components['schemas']['business.v1.ServicePersonCancelServiceRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/servicePersonCancelService';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceSomethingNew
   * @description POST /elderSvrMiniAPP/service/v1/somethingNew
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceSomethingNew(data: components['schemas']['business.v1.ServiceNullBodyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/somethingNew';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceSubmitPaidServiceComment
   * @description POST /elderSvrMiniAPP/service/v1/submitPaidServiceComment
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceSubmitPaidServiceComment(data: components['schemas']['business.v1.SubmitPaidServiceCommentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/submitPaidServiceComment';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceValidateService
   * @description POST /elderSvrMiniAPP/service/v1/validateService
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceValidateService(data: components['schemas']['server.v1.ValidateServiceRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/service/v1/validateService';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * squareCommunityActivityList
   * @description POST /elderSvrMiniAPP/square/v1/communityActivityList
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async squareCommunityActivityList(data: components['schemas']['business.v1.CommunityActivityListRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/square/v1/communityActivityList';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * tRTCCallbackNewTRTCRecord
   * @description POST /elderSvrMiniAPP/trtc/v1/callback/trtc_record
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async tRTCCallbackNewTRTCRecord(data: components['schemas']['api.elder.callback.v1.EventRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/trtc/v1/callback/trtc_record';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userCheckCommunityService
   * @description POST /elderSvrMiniAPP/user/v1/checkCommunityService
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userCheckCommunityService(data: components['schemas']['system.v1.CheckCommunityServiceRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/checkCommunityService';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * checkCheckToken
   * @description POST /elderSvrMiniAPP/user/v1/checkToken
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async checkCheckToken(data: components['schemas']['system.v1.CheckTokenRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/checkToken';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceGetUserContributionLevel
   * @description POST /elderSvrMiniAPP/user/v1/contribution/get
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceGetUserContributionLevel(data: components['schemas']['api.elder.help.v1.GetUserContributionLevelRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/contribution/get';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userCreateElderInfo
   * @description POST /elderSvrMiniAPP/user/v1/createElderInfo
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userCreateElderInfo(data: components['schemas']['system.v1.CreateElderInfoRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/createElderInfo';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userDeleteElderForTest
   * @description POST /elderSvrMiniAPP/user/v1/deleteElderForTest
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userDeleteElderForTest(data: components['schemas']['system.v1.DeleteElderForTestRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/deleteElderForTest';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userDescribeElder
   * @description POST /elderSvrMiniAPP/user/v1/describeElder
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userDescribeElder(data: components['schemas']['system.v1.DescribeElderRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/describeElder';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userDescribeUser
   * @description POST /elderSvrMiniAPP/user/v1/describeUser
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userDescribeUser(data: components['schemas']['system.v1.UserError'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/describeUser';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userGeneratePersonalQrCode
   * @description POST /elderSvrMiniAPP/user/v1/generatePersonalQrCode
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userGeneratePersonalQrCode(data: components['schemas']['system.v1.GeneratePersonalQrCodeRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/generatePersonalQrCode';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userGetCommunityDetail
   * @description POST /elderSvrMiniAPP/user/v1/getCommunityDetail
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userGetCommunityDetail(data: components['schemas']['system.v1.GetCommunityDetailRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/getCommunityDetail';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userGetCommunityList
   * @description POST /elderSvrMiniAPP/user/v1/getCommunityList
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userGetCommunityList(data: components['schemas']['system.v1.GetCommunityListRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/getCommunityList';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * checkGetCurrentUser
   * @description POST /elderSvrMiniAPP/user/v1/getCurrentUser
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async checkGetCurrentUser(data: components['schemas']['system.v1.GetCurrentUserRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/getCurrentUser';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userGetElderById
   * @description POST /elderSvrMiniAPP/user/v1/getElderById
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userGetElderById(data: components['schemas']['system.v1.GetElderByIdRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/getElderById';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userGetElderCredits
   * @description POST /elderSvrMiniAPP/user/v1/getElderCredits
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userGetElderCredits(data: components['schemas']['system.v1.GetElderCreditsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/getElderCredits';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * commonGetWxPhoneNumber
   * @description POST /elderSvrMiniAPP/user/v1/getWxPhoneNumber
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async commonGetWxPhoneNumber(data: components['schemas']['system.v1.GetWxPhoneNumberRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/getWxPhoneNumber';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userGetUserInfoByToken
   * @description POST /elderSvrMiniAPP/user/v1/get_user_by_token
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userGetUserInfoByToken(data: components['schemas']['system.v1.GetUserInfoByTokenRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/get_user_by_token';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userHelpHeadCount
   * @description POST /elderSvrMiniAPP/user/v1/helpHeadCount
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userHelpHeadCount(data: components['schemas']['system.v1.HelpHeadCountRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/helpHeadCount';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userHelpVolunteerList
   * @description POST /elderSvrMiniAPP/user/v1/helpVolunteerList
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userHelpVolunteerList(data: components['schemas']['system.v1.HelpVolunteerListRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/helpVolunteerList';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userListElderCreditRecords
   * @description POST /elderSvrMiniAPP/user/v1/listElderCreditRecords
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userListElderCreditRecords(data: components['schemas']['system.v1.ListElderCreditRecordsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/listElderCreditRecords';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userModifyElder
   * @description POST /elderSvrMiniAPP/user/v1/modifyElder
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userModifyElder(data: components['schemas']['system.v1.ModifyElderRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/modifyElder';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userQrCodeBindCheck
   * @description POST /elderSvrMiniAPP/user/v1/qrCodeBindCheck
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userQrCodeBindCheck(data: components['schemas']['system.v1.QrCodeBindCheckRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/qrCodeBindCheck';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userRealName
   * @description POST /elderSvrMiniAPP/user/v1/realName
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userRealName(data: components['schemas']['system.v1.RealNameRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/realName';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userCancelRealName
   * @description POST /elderSvrMiniAPP/user/v1/realName/cancel
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userCancelRealName(data: components['schemas']['system.v1.CancelRealNameRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/realName/cancel';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userRedirectLogin
   * @description POST /elderSvrMiniAPP/user/v1/redirect_login
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userRedirectLogin(data: components['schemas']['system.v1.RedirectLoginRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/redirect_login';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * helperServiceGetUserCenterSummary
   * @description POST /elderSvrMiniAPP/user/v1/summary
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async helperServiceGetUserCenterSummary(data: components['schemas']['api.elder.help.v1.GetUserCenterSummaryRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/summary';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userTriggerCommunityList
   * @description POST /elderSvrMiniAPP/user/v1/triggerCommunityList
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userTriggerCommunityList(data: components['schemas']['system.v1.TriggerCommunityListRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/triggerCommunityList';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userUnbindIdentity
   * @description POST /elderSvrMiniAPP/user/v1/unbindIdentity
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userUnbindIdentity(data: components['schemas']['system.v1.UnbindIdentityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/unbindIdentity';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userUpdatePhoneFromWeixin
   * @description POST /elderSvrMiniAPP/user/v1/updatePhoneFromWeixin
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userUpdatePhoneFromWeixin(data: components['schemas']['system.v1.UpdatePhoneFromWeixinRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/updatePhoneFromWeixin';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userUpdatePrivacySetting
   * @description POST /elderSvrMiniAPP/user/v1/update_private_setting
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userUpdatePrivacySetting(data: components['schemas']['system.v1.UpdatePrivacySettingsRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/update_private_setting';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userValidatePersonalQrCode
   * @description POST /elderSvrMiniAPP/user/v1/validatePersonalQrCode
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userValidatePersonalQrCode(data: components['schemas']['system.v1.ValidatePersonalQrCodeRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/validatePersonalQrCode';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userVolunteerInsure
   * @description POST /elderSvrMiniAPP/user/v1/volunteerInsure
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userVolunteerInsure(data: components['schemas']['system.v1.VolunteerInsureRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/volunteerInsure';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userPageVolunteerInsure
   * @description POST /elderSvrMiniAPP/user/v1/volunteerInsureList
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userPageVolunteerInsure(data: components['schemas']['system.v1.PageVolunteerInsureRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/volunteerInsureList';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userGetVolunteerInsureVisa
   * @description POST /elderSvrMiniAPP/user/v1/volunteerInsureVisa
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userGetVolunteerInsureVisa(data: components['schemas']['system.v1.GetVolunteerInsureVisaRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/user/v1/volunteerInsureVisa';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * gongyiServiceCheckCanReceiveFlower
   * @description POST /elderSvrMiniAPP/v1/gongyi/checkFlower
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async gongyiServiceCheckCanReceiveFlower(data: components['schemas']['api.elder.v1.gongyi.CheckCanReceiveFlowerRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/v1/gongyi/checkFlower';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * gongyiServiceGetFlowerCount
   * @description POST /elderSvrMiniAPP/v1/gongyi/getFlowerCount
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async gongyiServiceGetFlowerCount(data: components['schemas']['api.elder.v1.gongyi.GetFlowerCountRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/v1/gongyi/getFlowerCount';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * gongyiServiceSendFlower
   * @description POST /elderSvrMiniAPP/v1/gongyi/sendFlower
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async gongyiServiceSendFlower(data: components['schemas']['api.elder.v1.gongyi.SendFlowerRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/v1/gongyi/sendFlower';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * gongyiServiceSilentLogin
   * @description POST /elderSvrMiniAPP/v1/gongyi/silentLogin
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async gongyiServiceSilentLogin(data: components['schemas']['api.elder.v1.gongyi.SilentLoginRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/v1/gongyi/silentLogin';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * gongyiServiceSyncGyDataToMap
   * @description POST /elderSvrMiniAPP/v1/gongyi/syncGyDataToMap
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async gongyiServiceSyncGyDataToMap(data: components['schemas']['api.elder.v1.gongyi.SyncGyDataToMapRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/v1/gongyi/syncGyDataToMap';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * weComServiceCreateMoment
   * @description POST /elderSvrMiniAPP/wecom/v1/createMoment
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async weComServiceCreateMoment(data: components['schemas']['elder.wecom.v1.CreateMomentRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/wecom/v1/createMoment';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * weComServiceGenerateQRCode
   * @description POST /elderSvrMiniAPP/wecom/v1/generateQRCode
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async weComServiceGenerateQRCode(data: components['schemas']['elder.wecom.v1.GenerateQRCodeRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/wecom/v1/generateQRCode';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * weComServiceGetCommunityTagMapping
   * @description POST /elderSvrMiniAPP/wecom/v1/getCommunityTagMapping
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async weComServiceGetCommunityTagMapping(data: components['schemas']['elder.wecom.v1.GetCommunityTagMappingRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/wecom/v1/getCommunityTagMapping';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * weComServiceHandleCustomerJoinCallback
   * @description POST /elderSvrMiniAPP/wecom/v1/handleCustomerJoinCallback
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async weComServiceHandleCustomerJoinCallback(data: components['schemas']['elder.wecom.v1.HandleCustomerJoinCallbackRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrMiniAPP/wecom/v1/handleCustomerJoinCallback';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * commonGetWebCosTempKey
   * @description POST /elderSvrWebAPI/common/v1/getWebCosTempKey
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async commonGetWebCosTempKey(data: components['schemas']['system.v1.GetWebCosTempKeyRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrWebAPI/common/v1/getWebCosTempKey';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * hospitalImportMedicalInfo
   * @description POST /elderSvrWebAPI/hospital/v1/importMedicalInfo
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async hospitalImportMedicalInfo(data: components['schemas']['seek_medical.v1.ImportMedicalInfoRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrWebAPI/hospital/v1/importMedicalInfo';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * imFindImIdentity
   * @description POST /elderSvrWebAPI/im/v1/findImIdentity
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async imFindImIdentity(data: components['schemas']['business.v1.FindImIdentityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrWebAPI/im/v1/findImIdentity';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * imImDataMove
   * @description POST /elderSvrWebAPI/im/v1/imDataMove
   * @param data 
   * @returns Promise<any>
   */
  async imImDataMove(data: components['schemas']['business.v1.ImDataMoveRequest'], config?: AxiosRequestConfig): Promise<any> {
    const url = '/elderSvrWebAPI/im/v1/imDataMove';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<any>(requestConfig);
  },

  /**
   * imSaveImIdentity
   * @description POST /elderSvrWebAPI/im/v1/saveImIdentity
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async imSaveImIdentity(data: components['schemas']['business.v1.SaveImIdentityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrWebAPI/im/v1/saveImIdentity';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * serviceInitEvaluateHistoryData
   * @description POST /elderSvrWebAPI/service/v1/evaluate/initHistoryData
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async serviceInitEvaluateHistoryData(data: components['schemas']['business.v1.InitEvaluateHistoryDataRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrWebAPI/service/v1/evaluate/initHistoryData';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userCreateElderIgnore
   * @description POST /elderSvrWebAPI/user/v1/createElderIgnore
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userCreateElderIgnore(data: components['schemas']['system.v1.CreateElderIgnoreRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrWebAPI/user/v1/createElderIgnore';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userCreateQrCode
   * @description POST /elderSvrWebAPI/user/v1/createQrCode
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userCreateQrCode(data: components['schemas']['system.v1.CreateQrCodeRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrWebAPI/user/v1/createQrCode';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userHandleElderCommunity
   * @description POST /elderSvrWebAPI/user/v1/handleElderCommunity
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userHandleElderCommunity(data: components['schemas']['system.v1.HandleElderCommunityRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrWebAPI/user/v1/handleElderCommunity';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

  /**
   * userRefreshAllElderPoiTitle
   * @description POST /elderSvrWebAPI/user/v1/refreshPoiTitle
   * @param data 
   * @returns Promise<StandardResponse>
   */
  async userRefreshAllElderPoiTitle(data: components['schemas']['system.v1.RefreshAllElderPoiTitleRequest'], config?: AxiosRequestConfig): Promise<StandardResponse> {
    const url = '/elderSvrWebAPI/user/v1/refreshPoiTitle';
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      ...config,
    };

    return apiClient.request<StandardResponse>(requestConfig);
  },

};

// 导出类型定义
export type userApiApiType = typeof userApiApi;

// 导出API客户端实例（供高级使用）
export { apiClient };

// 导出常用类型
export type { components } from './api-generated';

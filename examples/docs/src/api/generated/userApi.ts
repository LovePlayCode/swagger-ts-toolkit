// 🤖 基于Swagger生成的API调用模块 - userApi
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
 * userApi 服务API接口
 */
export const userApiApi = {
  /**
   * Payment Mgr Service_ Get App Setting
   * @description POST /elderSvrBackend/app/v1/setting/get
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetAppSettingResponse']>
   */
  async paymentMgrServiceGetAppSetting(data?: components['schemas']['api.elder.backend.v1.GetAppSettingRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetAppSettingResponse']> {
    const url = buildUrl(API_ENDPOINTS.PaymentMgrService_GetAppSetting.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Get Web Cos Temp Key
   * @description POST /elderSvrBackend/common/v1/getWebCosTempKey
   * @returns Promise<components['schemas']['system.v1.GetWebCosTempKeyReply']>
   */
  async iamServiceGetWebCosTempKey(data?: components['schemas']['system.v1.GetWebCosTempKeyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetWebCosTempKeyReply']> {
    const url = buildUrl(API_ENDPOINTS.IamService_GetWebCosTempKey.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Dashboard Service_ Get Community Credit
   * @description POST /elderSvrBackend/dashboard/v1/community/credit/get
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetCommunityCreditResponse']>
   */
  async dashboardServiceGetCommunityCredit(data?: components['schemas']['api.elder.backend.v1.GetCommunityCreditRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetCommunityCreditResponse']> {
    const url = buildUrl(API_ENDPOINTS.DashboardService_GetCommunityCredit.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Dashboard Service_ Get Help Summary
   * @description POST /elderSvrBackend/dashboard/v1/help/summary
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetHelpSummaryResponse']>
   */
  async dashboardServiceGetHelpSummary(data?: components['schemas']['api.elder.backend.v1.GetHelpSummaryRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetHelpSummaryResponse']> {
    const url = buildUrl(API_ENDPOINTS.DashboardService_GetHelpSummary.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Payment Mgr Service_ Get Developer Settings
   * @description POST /elderSvrBackend/developer/v1/settings/get
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetDeveloperSettingsResponse']>
   */
  async paymentMgrServiceGetDeveloperSettings(data?: components['schemas']['api.elder.backend.v1.GetDeveloperSettingsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetDeveloperSettingsResponse']> {
    const url = buildUrl(API_ENDPOINTS.PaymentMgrService_GetDeveloperSettings.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Payment Mgr Service_ Update Developer Settings
   * @description POST /elderSvrBackend/developer/v1/settings/update
   * @returns Promise<components['schemas']['api.elder.backend.v1.UpdateDeveloperSettingsResponse']>
   */
  async paymentMgrServiceUpdateDeveloperSettings(data?: components['schemas']['api.elder.backend.v1.UpdateDeveloperSettingsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.UpdateDeveloperSettingsResponse']> {
    const url = buildUrl(API_ENDPOINTS.PaymentMgrService_UpdateDeveloperSettings.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service Type Service_ List Categories
   * @description POST /elderSvrBackend/help/v1/category/list
   * @returns Promise<components['schemas']['api.elder.help.v1.ListCategoriesResponse']>
   */
  async serviceTypeServiceListCategories(data?: components['schemas']['api.elder.help.v1.ListCategoriesRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListCategoriesResponse']> {
    const url = buildUrl(API_ENDPOINTS.ServiceTypeService_ListCategories.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Get User Permissions
   * @description POST /elderSvrBackend/login/v1/get_permission
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetUserPermissionsResponse']>
   */
  async iamServiceGetUserPermissions(data?: components['schemas']['api.elder.backend.v1.GetUserPermissionsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetUserPermissionsResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_GetUserPermissions.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Login By Phone
   * @description POST /elderSvrBackend/login/v1/loginByPhone
   * @returns Promise<components['schemas']['api.elder.backend.v1.LoginByPhoneResponse']>
   */
  async iamServiceLoginByPhone(data?: components['schemas']['api.elder.backend.v1.LoginByPhoneRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.LoginByPhoneResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_LoginByPhone.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Logout
   * @description POST /elderSvrBackend/login/v1/logout
   * @returns Promise<components['schemas']['api.elder.backend.v1.LogoutResponse']>
   */
  async iamServiceLogout(data?: components['schemas']['api.elder.backend.v1.LogoutRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.LogoutResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_Logout.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Send Login Code
   * @description POST /elderSvrBackend/login/v1/sendCode
   * @returns Promise<components['schemas']['api.elder.backend.v1.SendLoginCodeResponse']>
   */
  async iamServiceSendLoginCode(data?: components['schemas']['api.elder.backend.v1.SendLoginCodeRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.SendLoginCodeResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_SendLoginCode.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Update Org User
   * @description POST /elderSvrBackend/org_user/v1/update
   * @returns Promise<components['schemas']['api.elder.backend.v1.UpdateOrgUserResponse']>
   */
  async iamServiceUpdateOrgUser(data?: components['schemas']['api.elder.backend.v1.UpdateOrgUserRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.UpdateOrgUserResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_UpdateOrgUser.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Payment Mgr Service_ Get Banks
   * @description POST /elderSvrBackend/payment/v1/banks/get
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetBanksResponse']>
   */
  async paymentMgrServiceGetBanks(data?: components['schemas']['api.elder.backend.v1.GetBanksRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetBanksResponse']> {
    const url = buildUrl(API_ENDPOINTS.PaymentMgrService_GetBanks.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Payment Mgr Service_ Apply Ecommercement
   * @description POST /elderSvrBackend/payment/v1/ecommerce/apply
   * @returns Promise<components['schemas']['api.elder.backend.v1.ApplyEcommercementResponse']>
   */
  async paymentMgrServiceApplyEcommercement(data?: components['schemas']['api.elder.backend.v1.ApplyEcommercementRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ApplyEcommercementResponse']> {
    const url = buildUrl(API_ENDPOINTS.PaymentMgrService_ApplyEcommercement.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Payment Mgr Service_ Get Ecommerce Applyment
   * @description POST /elderSvrBackend/payment/v1/ecommerce/applyment/get
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetEcommerceApplymentResponse']>
   */
  async paymentMgrServiceGetEcommerceApplyment(data?: components['schemas']['api.elder.backend.v1.GetEcommerceApplymentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetEcommerceApplymentResponse']> {
    const url = buildUrl(API_ENDPOINTS.PaymentMgrService_GetEcommerceApplyment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Payment Mgr Service_ Get Ecommerce Applyment Status
   * @description POST /elderSvrBackend/payment/v1/ecommerce/applyment/status/get
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetEcommerceApplymentStatusResponse']>
   */
  async paymentMgrServiceGetEcommerceApplymentStatus(data?: components['schemas']['api.elder.backend.v1.GetEcommerceApplymentStatusRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetEcommerceApplymentStatusResponse']> {
    const url = buildUrl(API_ENDPOINTS.PaymentMgrService_GetEcommerceApplymentStatus.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Payment Mgr Service_ Get Static Data
   * @description POST /elderSvrBackend/payment/v1/static/get
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetStaticDataResponse']>
   */
  async paymentMgrServiceGetStaticData(data?: components['schemas']['api.elder.backend.v1.GetStaticDataRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetStaticDataResponse']> {
    const url = buildUrl(API_ENDPOINTS.PaymentMgrService_GetStaticData.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Resident Audit Service_ Approve Resident Apply
   * @description POST /elderSvrBackend/resident/v1/apply/approve
   * @returns Promise<components['schemas']['api.elder.backend.v1.ApproveResidentApplyResponse']>
   */
  async residentAuditServiceApproveResidentApply(data?: components['schemas']['api.elder.backend.v1.ApproveResidentApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ApproveResidentApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.ResidentAuditService_ApproveResidentApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Resident Audit Service_ Get Resident Apply
   * @description POST /elderSvrBackend/resident/v1/apply/get
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetResidentApplyResponse']>
   */
  async residentAuditServiceGetResidentApply(data?: components['schemas']['api.elder.backend.v1.GetResidentApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetResidentApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.ResidentAuditService_GetResidentApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Resident Audit Service_ List Resident Apply
   * @description POST /elderSvrBackend/resident/v1/apply/list
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListResidentApplyResponse']>
   */
  async residentAuditServiceListResidentApply(data?: components['schemas']['api.elder.backend.v1.ListResidentApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListResidentApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.ResidentAuditService_ListResidentApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Resident Audit Service_ Refuse Resident Apply
   * @description POST /elderSvrBackend/resident/v1/apply/refuse
   * @returns Promise<components['schemas']['api.elder.backend.v1.RefuseResidentApplyResponse']>
   */
  async residentAuditServiceRefuseResidentApply(data?: components['schemas']['api.elder.backend.v1.RefuseResidentApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.RefuseResidentApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.ResidentAuditService_RefuseResidentApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service Type Service_ List Help Service Records
   * @description POST /elderSvrBackend/service/records
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListHelpServiceRecordsResponse']>
   */
  async serviceTypeServiceListHelpServiceRecords(data?: components['schemas']['api.elder.backend.v1.ListHelpServiceRecordsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListHelpServiceRecordsResponse']> {
    const url = buildUrl(API_ENDPOINTS.ServiceTypeService_ListHelpServiceRecords.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service Type Service_ Delete Area Community
   * @description POST /elderSvrBackend/serviceType/v1/areas/delete
   * @returns Promise<components['schemas']['api.elder.backend.v1.DeleteAreaResponse']>
   */
  async serviceTypeServiceDeleteAreaCommunity(data?: components['schemas']['api.elder.backend.v1.DeleteAreaRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.DeleteAreaResponse']> {
    const url = buildUrl(API_ENDPOINTS.ServiceTypeService_DeleteAreaCommunity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service Type Service_ Get Area Community
   * @description POST /elderSvrBackend/serviceType/v1/areas/list
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListAreasResponse']>
   */
  async serviceTypeServiceGetAreaCommunity(data?: components['schemas']['api.elder.backend.v1.ListAreasRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListAreasResponse']> {
    const url = buildUrl(API_ENDPOINTS.ServiceTypeService_GetAreaCommunity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service Type Service_ Select Area Community
   * @description POST /elderSvrBackend/serviceType/v1/areas/select
   * @returns Promise<components['schemas']['api.elder.backend.v1.SelectAreaResponse']>
   */
  async serviceTypeServiceSelectAreaCommunity(data?: components['schemas']['api.elder.backend.v1.SelectAreaRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.SelectAreaResponse']> {
    const url = buildUrl(API_ENDPOINTS.ServiceTypeService_SelectAreaCommunity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service Type Service_ Update Service Type Audit Status
   * @description POST /elderSvrBackend/serviceType/v1/audit/status/update
   * @returns Promise<components['schemas']['api.elder.backend.v1.ServiceTypeAuditStatusResponse']>
   */
  async serviceTypeServiceUpdateServiceTypeAuditStatus(data?: components['schemas']['api.elder.backend.v1.ServiceTypeAuditStatusRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ServiceTypeAuditStatusResponse']> {
    const url = buildUrl(API_ENDPOINTS.ServiceTypeService_UpdateServiceTypeAuditStatus.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service Type Service_ List Service Type Audits
   * @description POST /elderSvrBackend/serviceType/v1/audits/list
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListServiceTypeAuditsResponse']>
   */
  async serviceTypeServiceListServiceTypeAudits(data?: components['schemas']['api.elder.backend.v1.ListServiceTypeAuditsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListServiceTypeAuditsResponse']> {
    const url = buildUrl(API_ENDPOINTS.ServiceTypeService_ListServiceTypeAudits.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service Type Service_ Get All Categories
   * @description POST /elderSvrBackend/serviceType/v1/categories
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetAllCategoriesResponse']>
   */
  async serviceTypeServiceGetAllCategories(data?: components['schemas']['api.elder.backend.v1.GetAllCategoriesRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetAllCategoriesResponse']> {
    const url = buildUrl(API_ENDPOINTS.ServiceTypeService_GetAllCategories.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service Type Service_ Delete Service Type
   * @description POST /elderSvrBackend/serviceType/v1/delete
   * @returns Promise<components['schemas']['api.elder.backend.v1.DeleteServiceTypeResponse']>
   */
  async serviceTypeServiceDeleteServiceType(data?: components['schemas']['api.elder.backend.v1.DeleteServiceTypeRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.DeleteServiceTypeResponse']> {
    const url = buildUrl(API_ENDPOINTS.ServiceTypeService_DeleteServiceType.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service Type Service_ Filter Area
   * @description POST /elderSvrBackend/serviceType/v1/filterArea
   * @returns Promise<components['schemas']['api.elder.backend.v1.FilterAreaResponse']>
   */
  async serviceTypeServiceFilterArea(data?: components['schemas']['api.elder.backend.v1.FilterAreaRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.FilterAreaResponse']> {
    const url = buildUrl(API_ENDPOINTS.ServiceTypeService_FilterArea.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service Type Service_ List Recommendation Tags
   * @description POST /elderSvrBackend/serviceType/v1/recommendation/tags/list
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListRecommendationTagsResponse']>
   */
  async serviceTypeServiceListRecommendationTags(data?: components['schemas']['api.elder.backend.v1.ListRecommendationTagsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListRecommendationTagsResponse']> {
    const url = buildUrl(API_ENDPOINTS.ServiceTypeService_ListRecommendationTags.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service Type Service_ Update Service Type Recommendation Tags
   * @description POST /elderSvrBackend/serviceType/v1/recommendation/tags/update
   * @returns Promise<components['schemas']['api.elder.backend.v1.UpdateServiceTypeRecommendationTagsResponse']>
   */
  async serviceTypeServiceUpdateServiceTypeRecommendationTags(data?: components['schemas']['api.elder.backend.v1.UpdateServiceTypeRecommendationTagsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.UpdateServiceTypeRecommendationTagsResponse']> {
    const url = buildUrl(API_ENDPOINTS.ServiceTypeService_UpdateServiceTypeRecommendationTags.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service Type Service_ Sort Service Audit Type
   * @description POST /elderSvrBackend/serviceType/v1/sort
   * @returns Promise<components['schemas']['api.elder.backend.v1.SortServiceAuditTypeResponse']>
   */
  async serviceTypeServiceSortServiceAuditType(data?: components['schemas']['api.elder.backend.v1.SortServiceAuditTypeRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.SortServiceAuditTypeResponse']> {
    const url = buildUrl(API_ENDPOINTS.ServiceTypeService_SortServiceAuditType.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service Type Service_ List Service Type Submissions
   * @description POST /elderSvrBackend/serviceType/v1/submissions/list
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListServiceTypeSubmissionsResponse']>
   */
  async serviceTypeServiceListServiceTypeSubmissions(data?: components['schemas']['api.elder.backend.v1.ListServiceTypeSubmissionsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListServiceTypeSubmissionsResponse']> {
    const url = buildUrl(API_ENDPOINTS.ServiceTypeService_ListServiceTypeSubmissions.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service Type Service_ Submit Service Type
   * @description POST /elderSvrBackend/serviceType/v1/submit
   * @returns Promise<components['schemas']['api.elder.backend.v1.ServiceTypeSubmissionResponse']>
   */
  async serviceTypeServiceSubmitServiceType(data?: components['schemas']['api.elder.backend.v1.ServiceTypeSubmissionRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ServiceTypeSubmissionResponse']> {
    const url = buildUrl(API_ENDPOINTS.ServiceTypeService_SubmitServiceType.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Check Staff Apply
   * @description POST /elderSvrBackend/staff/v1/apply/check
   * @returns Promise<components['schemas']['api.elder.backend.v1.CheckStaffApplyResponse']>
   */
  async iamServiceCheckStaffApply(data?: components['schemas']['api.elder.backend.v1.CheckStaffApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.CheckStaffApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_CheckStaffApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Import Staff By Cos Url
   * @description POST /elderSvrBackend/staff/v1/import_by_cos
   * @returns Promise<components['schemas']['api.elder.backend.v1.ImportStaffByCosUrlResponse']>
   */
  async iamServiceImportStaffByCosUrl(data?: components['schemas']['api.elder.backend.v1.ImportStaffByCosUrlRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ImportStaffByCosUrlResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_ImportStaffByCosUrl.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ List Import Err Records
   * @description POST /elderSvrBackend/staff/v1/import_err_records
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListImportErrRecordsResponse']>
   */
  async iamServiceListImportErrRecords(data?: components['schemas']['api.elder.backend.v1.ListImportErrRecordsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListImportErrRecordsResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_ListImportErrRecords.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Apply Staff With Invite Link
   * @description POST /elderSvrBackend/staff/v1/join/apply
   * @returns Promise<components['schemas']['api.elder.backend.v1.ApplyStaffWithInviteLinkResponse']>
   */
  async iamServiceApplyStaffWithInviteLink(data?: components['schemas']['api.elder.backend.v1.ApplyStaffWithInviteLinkRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ApplyStaffWithInviteLinkResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_ApplyStaffWithInviteLink.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Approve Staff Apply
   * @description POST /elderSvrBackend/staff/v1/join/approve
   * @returns Promise<components['schemas']['api.elder.backend.v1.ApproveStaffApplyResponse']>
   */
  async iamServiceApproveStaffApply(data?: components['schemas']['api.elder.backend.v1.ApproveStaffApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ApproveStaffApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_ApproveStaffApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ List Staff Apply
   * @description POST /elderSvrBackend/staff/v1/list
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListStaffApplyResponse']>
   */
  async iamServiceListStaffApply(data?: components['schemas']['api.elder.backend.v1.ListStaffApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListStaffApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_ListStaffApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Check If Mini User
   * @description POST /elderSvrBackend/staff/v1/mini_user/check
   * @returns Promise<components['schemas']['api.elder.backend.v1.CheckIfMiniUserResponse']>
   */
  async iamServiceCheckIfMiniUser(data?: components['schemas']['api.elder.backend.v1.CheckIfMiniUserRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.CheckIfMiniUserResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_CheckIfMiniUser.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Re Import Organization Users
   * @description POST /elderSvrBackend/staff/v1/re_import
   * @returns Promise<components['schemas']['api.elder.backend.v1.ReImportOrganizationUsersResponse']>
   */
  async iamServiceReImportOrganizationUsers(data?: components['schemas']['api.elder.backend.v1.ReImportOrganizationUsersRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ReImportOrganizationUsersResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_ReImportOrganizationUsers.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Send Join Org Sms
   * @description POST /elderSvrBackend/staff/v1/send_join_sms
   * @returns Promise<components['schemas']['api.elder.backend.v1.SendJoinOrgSmsResponse']>
   */
  async iamServiceSendJoinOrgSms(data?: components['schemas']['api.elder.backend.v1.SendJoinOrgSmsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.SendJoinOrgSmsResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_SendJoinOrgSms.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Batch Delete User
   * @description POST /elderSvrBackend/user/v1/batch_delete
   * @returns Promise<components['schemas']['api.elder.backend.v1.DeleteUserResponse']>
   */
  async iamServiceBatchDeleteUser(data?: components['schemas']['api.elder.backend.v1.BatchDeleteUserRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.DeleteUserResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_BatchDeleteUser.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Delete User
   * @description POST /elderSvrBackend/user/v1/delete
   * @returns Promise<components['schemas']['api.elder.backend.v1.DeleteUserResponse']>
   */
  async iamServiceDeleteUser(data?: components['schemas']['api.elder.backend.v1.DeleteUserRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.DeleteUserResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_DeleteUser.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Import Organization Users
   * @description POST /elderSvrBackend/user/v1/import
   * @returns Promise<components['schemas']['api.elder.backend.v1.ImportOrganizationUsersResponse']>
   */
  async iamServiceImportOrganizationUsers(data?: components['schemas']['api.elder.backend.v1.ImportOrganizationUsersRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ImportOrganizationUsersResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_ImportOrganizationUsers.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Real Name
   * @description POST /elderSvrBackend/user/v1/realName
   * @returns Promise<components['schemas']['system.v1.RealNameReply']>
   */
  async iamServiceRealName(data?: components['schemas']['system.v1.RealNameRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.RealNameReply']> {
    const url = buildUrl(API_ENDPOINTS.IamService_RealName.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Search User By Phone
   * @description POST /elderSvrBackend/user/v1/search_by_phone
   * @returns Promise<components['schemas']['api.elder.backend.v1.SearchUserByPhoneResponse']>
   */
  async iamServiceSearchUserByPhone(data?: components['schemas']['api.elder.backend.v1.SearchUserByPhoneRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.SearchUserByPhoneResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_SearchUserByPhone.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ Update User
   * @description POST /elderSvrBackend/user/v1/update
   * @returns Promise<components['schemas']['api.elder.backend.v1.UpdateUserResponse']>
   */
  async iamServiceUpdateUser(data?: components['schemas']['api.elder.backend.v1.UpdateUserRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.UpdateUserResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_UpdateUser.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Iam Service_ List Org User
   * @description POST /elderSvrBackend/users/v1/get_org_user
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListOrgUserResponse']>
   */
  async iamServiceListOrgUser(data?: components['schemas']['api.elder.backend.v1.ListOrgUserRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListOrgUserResponse']> {
    const url = buildUrl(API_ENDPOINTS.IamService_ListOrgUser.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ Apply Organization
   * @description POST /elderSvrBackend/v1/organization/apply
   * @returns Promise<components['schemas']['api.elder.backend.v1.ApplyOrganizationResponse']>
   */
  async organizationServiceApplyOrganization(data?: components['schemas']['api.elder.backend.v1.CreateOrganizationRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ApplyOrganizationResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_ApplyOrganization.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ Approve Organization Apply
   * @description POST /elderSvrBackend/v1/organization/apply/approve
   * @returns Promise<components['schemas']['api.elder.backend.v1.ApproveOrganizationApplyResponse']>
   */
  async organizationServiceApproveOrganizationApply(data?: components['schemas']['api.elder.backend.v1.ApproveOrganizationApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ApproveOrganizationApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_ApproveOrganizationApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ Get Organization Apply
   * @description POST /elderSvrBackend/v1/organization/apply/get
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetOrganizationApplyResponse']>
   */
  async organizationServiceGetOrganizationApply(data?: components['schemas']['api.elder.backend.v1.GetOrganizationApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetOrganizationApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_GetOrganizationApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ List Organization Apply
   * @description POST /elderSvrBackend/v1/organization/apply/list
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListOrganizationApplyResponse']>
   */
  async organizationServiceListOrganizationApply(data?: components['schemas']['api.elder.backend.v1.ListOrganizationApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListOrganizationApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_ListOrganizationApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ Reject Organization Apply
   * @description POST /elderSvrBackend/v1/organization/apply/reject
   * @returns Promise<components['schemas']['api.elder.backend.v1.RejectOrganizationApplyResponse']>
   */
  async organizationServiceRejectOrganizationApply(data?: components['schemas']['api.elder.backend.v1.RejectOrganizationApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.RejectOrganizationApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_RejectOrganizationApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ Apply Org Certication
   * @description POST /elderSvrBackend/v1/organization/certification/apply
   * @returns Promise<components['schemas']['api.elder.backend.v1.ApplyOrgCerticationResponse']>
   */
  async organizationServiceApplyOrgCertication(data?: components['schemas']['api.elder.backend.v1.ApplyOrgCerticationRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ApplyOrgCerticationResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_ApplyOrgCertication.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ Approve Org Certication Apply
   * @description POST /elderSvrBackend/v1/organization/certification/apply/approve
   * @returns Promise<components['schemas']['api.elder.backend.v1.ApproveOrgCerticationApplyResponse']>
   */
  async organizationServiceApproveOrgCerticationApply(data?: components['schemas']['api.elder.backend.v1.ApproveOrgCerticationApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ApproveOrgCerticationApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_ApproveOrgCerticationApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ List Org Certication Apply
   * @description POST /elderSvrBackend/v1/organization/certification/apply/list
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListOrgCerticationApplyResponse']>
   */
  async organizationServiceListOrgCerticationApply(data?: components['schemas']['api.elder.backend.v1.ListOrgCerticationApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListOrgCerticationApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_ListOrgCerticationApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ Reject Org Certication Apply
   * @description POST /elderSvrBackend/v1/organization/certification/apply/reject
   * @returns Promise<components['schemas']['api.elder.backend.v1.RejectOrgCerticationApplyResponse']>
   */
  async organizationServiceRejectOrgCerticationApply(data?: components['schemas']['api.elder.backend.v1.RejectOrgCerticationApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.RejectOrgCerticationApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_RejectOrgCerticationApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ Get Org Certications
   * @description POST /elderSvrBackend/v1/organization/certification/list
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetOrgCerticationsResponse']>
   */
  async organizationServiceGetOrgCertications(data?: components['schemas']['api.elder.backend.v1.GetOrgCerticationsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetOrgCerticationsResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_GetOrgCertications.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ Create Organization
   * @description POST /elderSvrBackend/v1/organization/create
   * @returns Promise<components['schemas']['api.elder.backend.v1.CreateOrganizationResponse']>
   */
  async organizationServiceCreateOrganization(data?: components['schemas']['api.elder.backend.v1.CreateOrganizationRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.CreateOrganizationResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_CreateOrganization.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ Get Organization Detail
   * @description POST /elderSvrBackend/v1/organization/detail/get
   * @returns Promise<components['schemas']['api.elder.backend.v1.GetOrganizationDetailResponse']>
   */
  async organizationServiceGetOrganizationDetail(data?: components['schemas']['api.elder.backend.v1.GetOrganizationDetailRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.GetOrganizationDetailResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_GetOrganizationDetail.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ List Organizations
   * @description POST /elderSvrBackend/v1/organization/list
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListOrganizationsResponse']>
   */
  async organizationServiceListOrganizations(data?: components['schemas']['api.elder.backend.v1.ListOrganizationsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListOrganizationsResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_ListOrganizations.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ Update Organization Payment Method
   * @description POST /elderSvrBackend/v1/organization/payment/method/update
   * @returns Promise<components['schemas']['api.elder.backend.v1.UpdateOrganizationPaymentMethodResponse']>
   */
  async organizationServiceUpdateOrganizationPaymentMethod(data?: components['schemas']['api.elder.backend.v1.UpdateOrganizationPaymentMethodRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.UpdateOrganizationPaymentMethodResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_UpdateOrganizationPaymentMethod.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ List Communities By Service Network
   * @description POST /elderSvrBackend/v1/organization/service/communities
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListCommunitiesByServiceNetworkResponse']>
   */
  async organizationServiceListCommunitiesByServiceNetwork(data?: components['schemas']['api.elder.backend.v1.ListCommunitiesByServiceNetworkRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListCommunitiesByServiceNetworkResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_ListCommunitiesByServiceNetwork.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ Add Service Network
   * @description POST /elderSvrBackend/v1/organization/service/network
   * @returns Promise<components['schemas']['api.elder.backend.v1.AddServiceNetworkResponse']>
   */
  async organizationServiceAddServiceNetwork(data?: components['schemas']['api.elder.backend.v1.AddServiceNetworkRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.AddServiceNetworkResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_AddServiceNetwork.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ Delete Service Network
   * @description POST /elderSvrBackend/v1/organization/service/network/delete
   * @returns Promise<components['schemas']['api.elder.backend.v1.DeleteServiceNetworkResponse']>
   */
  async organizationServiceDeleteServiceNetwork(data?: components['schemas']['api.elder.backend.v1.DeleteServiceNetworkRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.DeleteServiceNetworkResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_DeleteServiceNetwork.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ List Service Network
   * @description POST /elderSvrBackend/v1/organization/service/network/list
   * @returns Promise<components['schemas']['api.elder.backend.v1.ListServiceNetworkResponse']>
   */
  async organizationServiceListServiceNetwork(data?: components['schemas']['api.elder.backend.v1.ListServiceNetworkRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.ListServiceNetworkResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_ListServiceNetwork.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization Service_ Update Organization
   * @description POST /elderSvrBackend/v1/organization/update
   * @returns Promise<components['schemas']['api.elder.backend.v1.UpdateOrganizationResponse']>
   */
  async organizationServiceUpdateOrganization(data?: components['schemas']['api.elder.backend.v1.UpdateOrganizationRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.backend.v1.UpdateOrganizationResponse']> {
    const url = buildUrl(API_ENDPOINTS.OrganizationService_UpdateOrganization.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get Nearby Activities Platform
   * @description POST /elderSvrMiniAPP/activity/platform/v1/suggest
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetNearbyActivitiesResponse']>
   */
  async activityServiceGetNearbyActivitiesPlatform(data?: components['schemas']['api.elder.v1.activity.GetSuggestActivityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetNearbyActivitiesResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetNearbyActivitiesPlatform.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Cancel Checkin
   * @description POST /elderSvrMiniAPP/activity/v1/cancelCheckin
   * @returns Promise<components['schemas']['api.elder.v1.activity.CancelCheckinResponse']>
   */
  async activityServiceCancelCheckin(data?: components['schemas']['api.elder.v1.activity.CancelCheckinRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CancelCheckinResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_CancelCheckin.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Cancel Enroll
   * @description POST /elderSvrMiniAPP/activity/v1/cancel_enroll
   * @returns Promise<components['schemas']['api.elder.v1.activity.CancelEnrollResponse']>
   */
  async activityServiceCancelEnroll(data?: components['schemas']['api.elder.v1.activity.CancelEnrollRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CancelEnrollResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_CancelEnroll.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Check Cancel Enroll Permission
   * @description POST /elderSvrMiniAPP/activity/v1/check_cancel_enroll_permission
   * @returns Promise<components['schemas']['api.elder.v1.activity.CheckCancelEnrollPermissionResponse']>
   */
  async activityServiceCheckCancelEnrollPermission(data?: components['schemas']['api.elder.v1.activity.CheckCancelEnrollPermissionRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CheckCancelEnrollPermissionResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_CheckCancelEnrollPermission.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Checkin Activity
   * @description POST /elderSvrMiniAPP/activity/v1/checkinActivity
   * @returns Promise<components['schemas']['api.elder.v1.activity.CheckinActivityResponse']>
   */
  async activityServiceCheckinActivity(data?: components['schemas']['api.elder.v1.activity.CheckinActivityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CheckinActivityResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_CheckinActivity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Comment Service_ Create Comment
   * @description POST /elderSvrMiniAPP/activity/v1/comment/create
   * @returns Promise<components['schemas']['api.elder.activity.v1.CreateCommentResponse']>
   */
  async activityCommentServiceCreateComment(data?: components['schemas']['api.elder.activity.v1.CreateCommentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.CreateCommentResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityCommentService_CreateComment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Comment Service_ Delete Comment
   * @description POST /elderSvrMiniAPP/activity/v1/comment/delete
   * @returns Promise<components['schemas']['api.elder.activity.v1.DeleteCommentResponse']>
   */
  async activityCommentServiceDeleteComment(data?: components['schemas']['api.elder.activity.v1.DeleteCommentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.DeleteCommentResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityCommentService_DeleteComment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Comment Service_ Like Comment
   * @description POST /elderSvrMiniAPP/activity/v1/comment/like
   * @returns Promise<components['schemas']['api.elder.activity.v1.LikeResponse']>
   */
  async activityCommentServiceLikeComment(data?: components['schemas']['api.elder.activity.v1.LikeRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.LikeResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityCommentService_LikeComment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Comment Service_ Get User Liked Comments
   * @description POST /elderSvrMiniAPP/activity/v1/comment/liked
   * @returns Promise<components['schemas']['api.elder.activity.v1.GetUserLikedCommentsResponse']>
   */
  async activityCommentServiceGetUserLikedComments(data?: components['schemas']['api.elder.activity.v1.GetUserLikedCommentsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.GetUserLikedCommentsResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityCommentService_GetUserLikedComments.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Comment Service_ List Comments
   * @description POST /elderSvrMiniAPP/activity/v1/comment/list
   * @returns Promise<components['schemas']['api.elder.activity.v1.ListCommentsResponse']>
   */
  async activityCommentServiceListComments(data?: components['schemas']['api.elder.activity.v1.ListCommentsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.ListCommentsResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityCommentService_ListComments.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Comment Service_ List User Comments By Activity
   * @description POST /elderSvrMiniAPP/activity/v1/comment/list_by_activity_user
   * @returns Promise<components['schemas']['api.elder.activity.v1.ListUserCommentsByActivityResponse']>
   */
  async activityCommentServiceListUserCommentsByActivity(data?: components['schemas']['api.elder.activity.v1.ListUserCommentsByActivityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.ListUserCommentsByActivityResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityCommentService_ListUserCommentsByActivity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Comment Service_ Unlike Comment
   * @description POST /elderSvrMiniAPP/activity/v1/comment/unlike
   * @returns Promise<components['schemas']['api.elder.activity.v1.LikeResponse']>
   */
  async activityCommentServiceUnlikeComment(data?: components['schemas']['api.elder.activity.v1.UnlikeRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.LikeResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityCommentService_UnlikeComment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Create Activity
   * @description POST /elderSvrMiniAPP/activity/v1/create_activity
   * @returns Promise<components['schemas']['api.elder.v1.activity.CreateActivityResponse']>
   */
  async activityServiceCreateActivity(data?: components['schemas']['api.elder.v1.activity.CreateActivityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CreateActivityResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_CreateActivity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Create Moment
   * @description POST /elderSvrMiniAPP/activity/v1/create_moment
   * @returns Promise<components['schemas']['api.elder.v1.activity.CreateMomentResponse']>
   */
  async activityServiceCreateMoment(data?: components['schemas']['api.elder.v1.activity.CreateMomentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CreateMomentResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_CreateMoment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Create Activity Template
   * @description POST /elderSvrMiniAPP/activity/v1/create_template
   * @returns Promise<components['schemas']['api.elder.v1.activity.CreateActivityTemplateResponse']>
   */
  async activityServiceCreateActivityTemplate(data?: components['schemas']['api.elder.v1.activity.CreateActivityTemplateRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CreateActivityTemplateResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_CreateActivityTemplate.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ List Default Activities
   * @description POST /elderSvrMiniAPP/activity/v1/default/list
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListDefaultActivitiesResponse']>
   */
  async activityServiceListDefaultActivities(data?: components['schemas']['api.elder.v1.activity.ListDefaultActivitiesRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListDefaultActivitiesResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_ListDefaultActivities.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Delete Activity
   * @description POST /elderSvrMiniAPP/activity/v1/delete_activity
   * @returns Promise<components['schemas']['api.elder.v1.activity.DeleteActivityResponse']>
   */
  async activityServiceDeleteActivity(data?: components['schemas']['api.elder.v1.activity.DeleteActivityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.DeleteActivityResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_DeleteActivity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Delete Moment
   * @description POST /elderSvrMiniAPP/activity/v1/delete_moment
   * @returns Promise<components['schemas']['api.elder.v1.activity.DeleteMomentResponse']>
   */
  async activityServiceDeleteMoment(data?: components['schemas']['api.elder.v1.activity.DeleteMomentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.DeleteMomentResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_DeleteMoment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Enroll Activity
   * @description POST /elderSvrMiniAPP/activity/v1/enroll
   * @returns Promise<components['schemas']['api.elder.v1.activity.EnrollActivityResponse']>
   */
  async activityServiceEnrollActivity(data?: components['schemas']['api.elder.v1.activity.EnrollActivityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.EnrollActivityResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_EnrollActivity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Export Activity Checkin List
   * @description POST /elderSvrMiniAPP/activity/v1/exportActivityCheckinList
   * @returns Promise<components['schemas']['api.elder.v1.activity.ExportActivityCheckinListResponse']>
   */
  async activityServiceExportActivityCheckinList(data?: components['schemas']['api.elder.v1.activity.ExportActivityCheckinListRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ExportActivityCheckinListResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_ExportActivityCheckinList.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Generate Checkin Q R Code
   * @description POST /elderSvrMiniAPP/activity/v1/generateCheckinQRCode
   * @returns Promise<components['schemas']['api.elder.v1.activity.GenerateCheckinQRCodeResponse']>
   */
  async activityServiceGenerateCheckinQRCode(data?: components['schemas']['api.elder.v1.activity.GenerateCheckinQRCodeRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GenerateCheckinQRCodeResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GenerateCheckinQRCode.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Generate Share Info
   * @description POST /elderSvrMiniAPP/activity/v1/generate_share
   * @returns Promise<components['schemas']['api.elder.v1.activity.GenerateShareResponse']>
   */
  async activityServiceGenerateShareInfo(data?: components['schemas']['api.elder.v1.activity.GenerateShareRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GenerateShareResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GenerateShareInfo.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get Activity
   * @description POST /elderSvrMiniAPP/activity/v1/get_activity
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetActivityResponse']>
   */
  async activityServiceGetActivity(data?: components['schemas']['api.elder.v1.activity.GetActivityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetActivityResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetActivity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get Activity Custom Config
   * @description POST /elderSvrMiniAPP/activity/v1/get_activity_custom_config
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetActivityCustomConfigResponse']>
   */
  async activityServiceGetActivityCustomConfig(data?: components['schemas']['api.elder.v1.activity.GetActivityCustomConfigRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetActivityCustomConfigResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetActivityCustomConfig.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get Activity By Recruit And Community
   * @description POST /elderSvrMiniAPP/activity/v1/get_by_recruit_and_community
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetActivityByRecruitAndCommunityResponse']>
   */
  async activityServiceGetActivityByRecruitAndCommunity(data?: components['schemas']['api.elder.v1.activity.GetActivityByRecruitAndCommunityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetActivityByRecruitAndCommunityResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetActivityByRecruitAndCommunity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get Course Activity List
   * @description POST /elderSvrMiniAPP/activity/v1/get_course_activity
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetCourseActivitiesResponse']>
   */
  async activityServiceGetCourseActivityList(data?: components['schemas']['api.elder.v1.activity.GetCourseActivitiesRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetCourseActivitiesResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetCourseActivityList.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get Course Activity By Id
   * @description POST /elderSvrMiniAPP/activity/v1/get_course_activity_by_id
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetCourseActivityByIdResponse']>
   */
  async activityServiceGetCourseActivityById(data?: components['schemas']['api.elder.v1.activity.GetCourseActivityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetCourseActivityByIdResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetCourseActivityById.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get Moment
   * @description POST /elderSvrMiniAPP/activity/v1/get_moment
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetMomentReply']>
   */
  async activityServiceGetMoment(data?: components['schemas']['api.elder.v1.activity.GetMomentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetMomentReply']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetMoment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get My Enroll Activity
   * @description POST /elderSvrMiniAPP/activity/v1/get_my_enroll_activity
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetMyEnrollActivityResponse']>
   */
  async activityServiceGetMyEnrollActivity(data?: components['schemas']['api.elder.v1.activity.GetMyEnrollActivityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetMyEnrollActivityResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetMyEnrollActivity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get Nearby Activities
   * @description POST /elderSvrMiniAPP/activity/v1/get_nearby
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetNearbyActivitiesResponse']>
   */
  async activityServiceGetNearbyActivities(data?: components['schemas']['api.elder.v1.activity.GetNearbyActivitiesRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetNearbyActivitiesResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetNearbyActivities.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get Notifications
   * @description POST /elderSvrMiniAPP/activity/v1/get_notify
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetNotificationsResponse']>
   */
  async activityServiceGetNotifications(data?: components['schemas']['api.elder.v1.activity.GetNotificationsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetNotificationsResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetNotifications.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get Ongoing Nearby Activities
   * @description POST /elderSvrMiniAPP/activity/v1/get_ongoing_activity
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetOnGoingActivitiesResponse']>
   */
  async activityServiceGetOngoingNearbyActivities(data?: components['schemas']['api.elder.v1.activity.GetNearbyActivitiesRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetOnGoingActivitiesResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetOngoingNearbyActivities.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Cancel Health Activity Enroll
   * @description POST /elderSvrMiniAPP/activity/v1/health/cancel_enroll
   * @returns Promise<components['schemas']['api.elder.v1.activity.CancelHealthActivityEnrollResponse']>
   */
  async activityServiceCancelHealthActivityEnroll(data?: components['schemas']['api.elder.v1.activity.CancelHealthActivityEnrollRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CancelHealthActivityEnrollResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_CancelHealthActivityEnroll.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Create Health Activity
   * @description POST /elderSvrMiniAPP/activity/v1/health/create
   * @returns Promise<components['schemas']['api.elder.v1.activity.CreateHealthActivityResponse']>
   */
  async activityServiceCreateHealthActivity(data?: components['schemas']['api.elder.v1.activity.CreateHealthActivityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CreateHealthActivityResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_CreateHealthActivity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Enroll Health Activity
   * @description POST /elderSvrMiniAPP/activity/v1/health/enroll
   * @returns Promise<components['schemas']['api.elder.v1.activity.EnrollHealthActivityResponse']>
   */
  async activityServiceEnrollHealthActivity(data?: components['schemas']['api.elder.v1.activity.EnrollHealthActivityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.EnrollHealthActivityResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_EnrollHealthActivity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get Enrollment By Activity Id
   * @description POST /elderSvrMiniAPP/activity/v1/health/enrollment/get_list
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetEnrollmentByActivityIdResponse']>
   */
  async activityServiceGetEnrollmentByActivityId(data?: components['schemas']['api.elder.v1.activity.GetEnrollmentByActivityIdRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetEnrollmentByActivityIdResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetEnrollmentByActivityId.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get Enrollment Details
   * @description POST /elderSvrMiniAPP/activity/v1/health/enrollments/get_enroll_detail
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetEnrollmentDetailsResponse']>
   */
  async activityServiceGetEnrollmentDetails(data?: components['schemas']['api.elder.v1.activity.GetEnrollmentDetailsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetEnrollmentDetailsResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetEnrollmentDetails.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Create Family Doctor Appointment
   * @description POST /elderSvrMiniAPP/activity/v1/health/family_doctor/create_appointment
   * @returns Promise<components['schemas']['api.elder.v1.activity.CreateFamilyDoctorAppointmentResponse']>
   */
  async activityServiceCreateFamilyDoctorAppointment(data?: components['schemas']['api.elder.v1.activity.CreateFamilyDoctorAppointmentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.CreateFamilyDoctorAppointmentResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_CreateFamilyDoctorAppointment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Delete Family Doctor Appointment
   * @description POST /elderSvrMiniAPP/activity/v1/health/family_doctor/delete_appointment
   * @returns Promise<components['schemas']['api.elder.v1.activity.DeleteFamilyDoctorAppointmentResponse']>
   */
  async activityServiceDeleteFamilyDoctorAppointment(data?: components['schemas']['api.elder.v1.activity.DeleteFamilyDoctorAppointmentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.DeleteFamilyDoctorAppointmentResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_DeleteFamilyDoctorAppointment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ List Family Doctor Appointments
   * @description POST /elderSvrMiniAPP/activity/v1/health/family_doctor/list
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListFamilyDoctorAppointmentsResponse']>
   */
  async activityServiceListFamilyDoctorAppointments(data?: components['schemas']['api.elder.v1.activity.ListFamilyDoctorAppointmentsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListFamilyDoctorAppointmentsResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_ListFamilyDoctorAppointments.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get Family Doctor Service Types
   * @description POST /elderSvrMiniAPP/activity/v1/health/family_doctor/service_types
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetFamilyDoctorServiceTypesResponse']>
   */
  async activityServiceGetFamilyDoctorServiceTypes(data?: components['schemas']['api.elder.v1.activity.GetFamilyDoctorServiceTypesRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetFamilyDoctorServiceTypesResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetFamilyDoctorServiceTypes.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Update Family Doctor Appointment
   * @description POST /elderSvrMiniAPP/activity/v1/health/family_doctor/update_appointment
   * @returns Promise<components['schemas']['api.elder.v1.activity.UpdateFamilyDoctorAppointmentResponse']>
   */
  async activityServiceUpdateFamilyDoctorAppointment(data?: components['schemas']['api.elder.v1.activity.UpdateFamilyDoctorAppointmentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.UpdateFamilyDoctorAppointmentResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_UpdateFamilyDoctorAppointment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Generate Health Check Notice
   * @description POST /elderSvrMiniAPP/activity/v1/health/generate_notice
   * @returns Promise<components['schemas']['api.elder.v1.activity.GenerateHealthCheckNoticeResponse']>
   */
  async activityServiceGenerateHealthCheckNotice(data?: components['schemas']['api.elder.v1.activity.GenerateHealthCheckNoticeRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GenerateHealthCheckNoticeResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GenerateHealthCheckNotice.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get Health Activity Info
   * @description POST /elderSvrMiniAPP/activity/v1/health/get_health_info
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetHealthActivityInfoResponse']>
   */
  async activityServiceGetHealthActivityInfo(data?: components['schemas']['api.elder.v1.activity.GetHealthActivityInfoRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetHealthActivityInfoResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetHealthActivityInfo.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get Health Activity List Share Info
   * @description POST /elderSvrMiniAPP/activity/v1/health/get_health_share_info_list
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetHealthActivityListShareInfoResponse']>
   */
  async activityServiceGetHealthActivityListShareInfo(data?: components['schemas']['api.elder.v1.activity.GetHealthActivityListShareInfoRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetHealthActivityListShareInfoResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetHealthActivityListShareInfo.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get Health Activity List
   * @description POST /elderSvrMiniAPP/activity/v1/health/get_list
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetHealthActivityListResponse']>
   */
  async activityServiceGetHealthActivityList(data?: components['schemas']['api.elder.v1.activity.GetHealthActivityListRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetHealthActivityListResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetHealthActivityList.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Import Health Activity
   * @description POST /elderSvrMiniAPP/activity/v1/health/import
   * @returns Promise<components['schemas']['api.elder.v1.activity.ImportHealthActivityResponse']>
   */
  async activityServiceImportHealthActivity(data?: components['schemas']['api.elder.v1.activity.ImportHealthActivityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ImportHealthActivityResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_ImportHealthActivity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get My Enrollments
   * @description POST /elderSvrMiniAPP/activity/v1/health/my_enrollments
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetMyHealthEnrollmentsResponse']>
   */
  async activityServiceGetMyEnrollments(data?: components['schemas']['api.elder.v1.activity.GetMyEnrollmentsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetMyHealthEnrollmentsResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetMyEnrollments.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Like Moment
   * @description POST /elderSvrMiniAPP/activity/v1/like_moment
   * @returns Promise<components['schemas']['api.elder.v1.activity.LikeMomentResponse']>
   */
  async activityServiceLikeMoment(data?: components['schemas']['api.elder.v1.activity.LikeMomentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.LikeMomentResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_LikeMoment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ List Activities By Template
   * @description POST /elderSvrMiniAPP/activity/v1/list_activities_by_template
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListActivitiesByTemplateResponse']>
   */
  async activityServiceListActivitiesByTemplate(data?: components['schemas']['api.elder.v1.activity.ListActivitiesByTemplateRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListActivitiesByTemplateResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_ListActivitiesByTemplate.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ List Activity Templates
   * @description POST /elderSvrMiniAPP/activity/v1/list_activity_templates
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListActivityTplsResponse']>
   */
  async activityServiceListActivityTemplates(data?: components['schemas']['api.elder.v1.activity.ListActivityTplsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListActivityTplsResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_ListActivityTemplates.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ List Album Photos
   * @description POST /elderSvrMiniAPP/activity/v1/list_album_photos
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListAlbumPhotosResponse']>
   */
  async activityServiceListAlbumPhotos(data?: components['schemas']['api.elder.v1.activity.ListAlbumPhotosRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListAlbumPhotosResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_ListAlbumPhotos.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ List Albums
   * @description POST /elderSvrMiniAPP/activity/v1/list_albums
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListAlbumsResponse']>
   */
  async activityServiceListAlbums(data?: components['schemas']['api.elder.v1.activity.ListAlbumsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListAlbumsResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_ListAlbums.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ List Enroll Activity
   * @description POST /elderSvrMiniAPP/activity/v1/list_enroll_activity
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListEnrollActivityResponse']>
   */
  async activityServiceListEnrollActivity(data?: components['schemas']['api.elder.v1.activity.ListEnrollActivityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListEnrollActivityResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_ListEnrollActivity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ List Moments
   * @description POST /elderSvrMiniAPP/activity/v1/list_moments
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListMomentsResponse']>
   */
  async activityServiceListMoments(data?: components['schemas']['api.elder.v1.activity.ListMomentsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListMomentsResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_ListMoments.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ List Published Activities
   * @description POST /elderSvrMiniAPP/activity/v1/list_published_activities
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListPublishedActivitiesResponse']>
   */
  async activityServiceListPublishedActivities(data?: components['schemas']['api.elder.v1.activity.ListPublishedActivitiesRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListPublishedActivitiesResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_ListPublishedActivities.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ List User Activities
   * @description POST /elderSvrMiniAPP/activity/v1/list_user_activities
   * @returns Promise<components['schemas']['api.elder.v1.activity.ListUserActivitiesResponse']>
   */
  async activityServiceListUserActivities(data?: components['schemas']['api.elder.v1.activity.ListUserActivitiesRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ListUserActivitiesResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_ListUserActivities.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Get Activity Popularity
   * @description POST /elderSvrMiniAPP/activity/v1/popularity/get
   * @returns Promise<components['schemas']['api.elder.v1.activity.GetActivityPopularityResponse']>
   */
  async activityServiceGetActivityPopularity(data?: components['schemas']['api.elder.v1.activity.GetActivityPopularityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.GetActivityPopularityResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_GetActivityPopularity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Search Activities
   * @description POST /elderSvrMiniAPP/activity/v1/search
   * @returns Promise<components['schemas']['api.elder.v1.activity.SearchActivitiesResponse']>
   */
  async activityServiceSearchActivities(data?: components['schemas']['api.elder.v1.activity.SearchActivitiesRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.SearchActivitiesResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_SearchActivities.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Share Moment
   * @description POST /elderSvrMiniAPP/activity/v1/share_moment
   * @returns Promise<components['schemas']['api.elder.v1.activity.ShareMomentResponse']>
   */
  async activityServiceShareMoment(data?: components['schemas']['api.elder.v1.activity.ShareMomentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.ShareMomentResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_ShareMoment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Sync To Activity Score
   * @description POST /elderSvrMiniAPP/activity/v1/sync_to_activity_score
   * @returns Promise<components['schemas']['api.elder.v1.activity.SyncToActivityScoreResponse']>
   */
  async activityServiceSyncToActivityScore(data?: components['schemas']['api.elder.v1.activity.SyncToActivityScoreRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.SyncToActivityScoreResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_SyncToActivityScore.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Service_ Update Activity
   * @description POST /elderSvrMiniAPP/activity/v1/update_activity
   * @returns Promise<components['schemas']['api.elder.v1.activity.UpdateActivityResponse']>
   */
  async activityServiceUpdateActivity(data?: components['schemas']['api.elder.v1.activity.UpdateActivityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity.UpdateActivityResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityService_UpdateActivity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Group Chat Service_ Callback
   * @description GET /elderSvrMiniAPP/activity_group_chat/v1/callback
   * @returns Promise<components['schemas']['api.elder.v1.activity_group_chat.CallbackReply']>
   */
  async activityGroupChatServiceCallback(params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity_group_chat.CallbackReply']> {
    const url = buildUrl(API_ENDPOINTS.ActivityGroupChatService_Callback.path, params);
    return apiClient.get(url, { params, ...config });
  },

  /**
   * Activity Group Chat Service_ Get Group Chat By Recruit And Community
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/get_by_recruit_and_community
   * @returns Promise<components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatByRecruitAndCommunityResponse']>
   */
  async activityGroupChatServiceGetGroupChatByRecruitAndCommunity(data?: components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatByRecruitAndCommunityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatByRecruitAndCommunityResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityGroupChatService_GetGroupChatByRecruitAndCommunity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Group Chat Service_ Get Activity Chat Switch
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/get_chat_switch
   * @returns Promise<components['schemas']['api.elder.v1.activity_group_chat.GetActivityChatSwitchResponse']>
   */
  async activityGroupChatServiceGetActivityChatSwitch(data?: components['schemas']['api.elder.v1.activity_group_chat.GetActivityChatSwitchRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity_group_chat.GetActivityChatSwitchResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityGroupChatService_GetActivityChatSwitch.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Group Chat Service_ Get Group Chat Detail
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/get_group_detail
   * @returns Promise<components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatDetailResponse']>
   */
  async activityGroupChatServiceGetGroupChatDetail(data?: components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatDetailRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatDetailResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityGroupChatService_GetGroupChatDetail.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Group Chat Service_ Get Group Chat Qr Code
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/get_info
   * @returns Promise<components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatQrCodeResponse']>
   */
  async activityGroupChatServiceGetGroupChatQrCode(data?: components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatQrCodeRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity_group_chat.GetGroupChatQrCodeResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityGroupChatService_GetGroupChatQrCode.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Group Chat Service_ Set Activity Chat Switch
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/set_chat_switch
   * @returns Promise<components['schemas']['api.elder.v1.activity_group_chat.SetActivityChatSwitchResponse']>
   */
  async activityGroupChatServiceSetActivityChatSwitch(data?: components['schemas']['api.elder.v1.activity_group_chat.SetActivityChatSwitchRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity_group_chat.SetActivityChatSwitchResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityGroupChatService_SetActivityChatSwitch.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Activity Group Chat Service_ Sync Activity Group Chat
   * @description POST /elderSvrMiniAPP/activity_group_chat/v1/sync_data
   * @returns Promise<components['schemas']['api.elder.v1.activity_group_chat.SyncActivityGroupChatResponse']>
   */
  async activityGroupChatServiceSyncActivityGroupChat(data?: components['schemas']['api.elder.v1.activity_group_chat.SyncActivityGroupChatRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.activity_group_chat.SyncActivityGroupChatResponse']> {
    const url = buildUrl(API_ENDPOINTS.ActivityGroupChatService_SyncActivityGroupChat.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Ai Service_ List Ai Record By User I D
   * @description POST /elderSvrMiniAPP/ai/v1/chat/records
   * @returns Promise<components['schemas']['api.elder.v1.ai.ListAiRecordByUserIDResp']>
   */
  async aiServiceListAiRecordByUserID(data?: components['schemas']['api.elder.v1.ai.ListAiRecordByUserIDReq'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.ai.ListAiRecordByUserIDResp']> {
    const url = buildUrl(API_ENDPOINTS.AiService_ListAiRecordByUserID.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Ai Service_ Start Chat
   * @description POST /elderSvrMiniAPP/ai/v1/chat/start
   * @returns Promise<components['schemas']['api.elder.v1.ai.StartChatRsp']>
   */
  async aiServiceStartChat(data?: components['schemas']['api.elder.v1.ai.StartChatReq'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.ai.StartChatRsp']> {
    const url = buildUrl(API_ENDPOINTS.AiService_StartChat.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Ai Service_ Stop Chat
   * @description POST /elderSvrMiniAPP/ai/v1/chat/stop
   * @returns Promise<components['schemas']['api.elder.v1.ai.StopChatRsp']>
   */
  async aiServiceStopChat(data?: components['schemas']['api.elder.v1.ai.StopChatReq'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.ai.StopChatRsp']> {
    const url = buildUrl(API_ENDPOINTS.AiService_StopChat.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Ai Service_ Update Chat
   * @description POST /elderSvrMiniAPP/ai/v1/chat/update
   * @returns Promise<components['schemas']['api.elder.v1.ai.UpdateChatResp']>
   */
  async aiServiceUpdateChat(data?: components['schemas']['api.elder.v1.ai.UpdateChatReq'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.ai.UpdateChatResp']> {
    const url = buildUrl(API_ENDPOINTS.AiService_UpdateChat.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Channel_ Sign
   * @description POST /elderSvrMiniAPP/channel/v1/sign
   * @returns Promise<components['schemas']['business.v1.SignReply']>
   */
  async channelSign(data?: components['schemas']['business.v1.SignRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.SignReply']> {
    const url = buildUrl(API_ENDPOINTS.Channel_Sign.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Common_ Address Inverse Resolution
   * @description POST /elderSvrMiniAPP/common/v1/addressInverseResolution
   * @returns Promise<components['schemas']['system.v1.AddressInverseResolutionReply']>
   */
  async commonAddressInverseResolution(data?: components['schemas']['system.v1.AddressInverseResolutionRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.AddressInverseResolutionReply']> {
    const url = buildUrl(API_ENDPOINTS.Common_AddressInverseResolution.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Common_ Count Unread Message
   * @description POST /elderSvrMiniAPP/common/v1/countUnreadMessages
   * @returns Promise<components['schemas']['system.v1.CountUnreadMessagesReply']>
   */
  async commonCountUnreadMessage(data?: components['schemas']['system.v1.CountUnreadMessageRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.CountUnreadMessagesReply']> {
    const url = buildUrl(API_ENDPOINTS.Common_CountUnreadMessage.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Common_ Generate Sound Text
   * @description POST /elderSvrMiniAPP/common/v1/generateSoundText
   * @returns Promise<components['schemas']['system.v1.GenerateSoundTextResponse']>
   */
  async commonGenerateSoundText(data?: components['schemas']['system.v1.GenerateSoundTextRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GenerateSoundTextResponse']> {
    const url = buildUrl(API_ENDPOINTS.Common_GenerateSoundText.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Common_ Generate Wechat Q R Code
   * @description POST /elderSvrMiniAPP/common/v1/generateWechatQRCode
   * @returns Promise<components['schemas']['system.v1.GenerateWechatQRCodeReply']>
   */
  async commonGenerateWechatQRCode(data?: components['schemas']['system.v1.GenerateWechatQRCodeRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GenerateWechatQRCodeReply']> {
    const url = buildUrl(API_ENDPOINTS.Common_GenerateWechatQRCode.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Common_ Get Cos Temp Key
   * @description POST /elderSvrMiniAPP/common/v1/getCosTempKey
   * @returns Promise<components['schemas']['system.v1.GetCosTempKeyReply']>
   */
  async commonGetCosTempKey(data?: components['schemas']['system.v1.GetCosTempKeyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetCosTempKeyReply']> {
    const url = buildUrl(API_ENDPOINTS.Common_GetCosTempKey.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Common_ Healthy Check
   * @description GET /elderSvrMiniAPP/common/v1/healthy
   * @returns Promise<components['schemas']['system.v1.HealthyCheckReply']>
   */
  async commonHealthyCheck(params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.HealthyCheckReply']> {
    const url = buildUrl(API_ENDPOINTS.Common_HealthyCheck.path, params);
    return apiClient.get(url, { params, ...config });
  },

  /**
   * Common_ Navigate To Mini Program
   * @description POST /elderSvrMiniAPP/common/v1/navigateToMiniProgram
   * @returns Promise<components['schemas']['system.v1.NavigateToMiniProgramReply']>
   */
  async commonNavigateToMiniProgram(data?: components['schemas']['system.v1.NavigateToMiniProgramRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.NavigateToMiniProgramReply']> {
    const url = buildUrl(API_ENDPOINTS.Common_NavigateToMiniProgram.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Common_ Set Message Status Read
   * @description POST /elderSvrMiniAPP/common/v1/setMessageStatusRead
   * @returns Promise<components['schemas']['system.v1.MessageStatusChangeReply']>
   */
  async commonSetMessageStatusRead(data?: components['schemas']['system.v1.MessageStatusChangeRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.MessageStatusChangeReply']> {
    const url = buildUrl(API_ENDPOINTS.Common_SetMessageStatusRead.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Common_ Stop Server
   * @description GET /elderSvrMiniAPP/common/v1/stopServer
   * @returns Promise<components['schemas']['system.v1.StopServerReply']>
   */
  async commonStopServer(params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.StopServerReply']> {
    const url = buildUrl(API_ENDPOINTS.Common_StopServer.path, params);
    return apiClient.get(url, { params, ...config });
  },

  /**
   * Contribution Service_ Batch Create Contributions
   * @description POST /elderSvrMiniAPP/contribution/v1/records/batch
   * @returns Promise<components['schemas']['api.elder.v1.contribution.BatchCreateContributionsResponse']>
   */
  async contributionServiceBatchCreateContributions(data?: components['schemas']['api.elder.v1.contribution.BatchCreateContributionsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.contribution.BatchCreateContributionsResponse']> {
    const url = buildUrl(API_ENDPOINTS.ContributionService_BatchCreateContributions.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Contribution Service_ Create Contribution
   * @description POST /elderSvrMiniAPP/contribution/v1/records/create
   * @returns Promise<components['schemas']['api.elder.v1.contribution.ContributionRecord']>
   */
  async contributionServiceCreateContribution(data?: components['schemas']['api.elder.v1.contribution.CreateContributionRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.contribution.ContributionRecord']> {
    const url = buildUrl(API_ENDPOINTS.ContributionService_CreateContribution.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Contribution Service_ List User Contributions
   * @description POST /elderSvrMiniAPP/contribution/v1/records/list
   * @returns Promise<components['schemas']['api.elder.v1.contribution.ListUserContributionsResponse']>
   */
  async contributionServiceListUserContributions(data?: components['schemas']['api.elder.v1.contribution.ListUserContributionsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.contribution.ListUserContributionsResponse']> {
    const url = buildUrl(API_ENDPOINTS.ContributionService_ListUserContributions.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Contribution Service_ Get User Contribution Rank
   * @description POST /elderSvrMiniAPP/contribution/v1/records/rank
   * @returns Promise<components['schemas']['api.elder.v1.contribution.GetUserContributionRankResponse']>
   */
  async contributionServiceGetUserContributionRank(data?: components['schemas']['api.elder.v1.contribution.GetUserContributionRankRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.contribution.GetUserContributionRankResponse']> {
    const url = buildUrl(API_ENDPOINTS.ContributionService_GetUserContributionRank.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Contribution Service_ Get User Contribution Stats
   * @description GET /elderSvrMiniAPP/contribution/v1/records/stats
   * @returns Promise<components['schemas']['api.elder.v1.contribution.ContributionStats']>
   */
  async contributionServiceGetUserContributionStats(params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.contribution.ContributionStats']> {
    const url = buildUrl(API_ENDPOINTS.ContributionService_GetUserContributionStats.path, params);
    return apiClient.get(url, { params, ...config });
  },

  /**
   * Coupon_ Grab Coupon
   * @description POST /elderSvrMiniAPP/coupon/v1/grab_coupon
   * @returns Promise<components['schemas']['coupon.v1.GrabCouponReply']>
   */
  async couponGrabCoupon(data?: components['schemas']['coupon.v1.GrabCouponRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['coupon.v1.GrabCouponReply']> {
    const url = buildUrl(API_ENDPOINTS.Coupon_GrabCoupon.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Coupon_ Grab Coupon Status
   * @description POST /elderSvrMiniAPP/coupon/v1/grab_coupon_status
   * @returns Promise<components['schemas']['coupon.v1.CouponStatusReply']>
   */
  async couponGrabCouponStatus(data?: components['schemas']['coupon.v1.GrabCouponStatusRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['coupon.v1.CouponStatusReply']> {
    const url = buildUrl(API_ENDPOINTS.Coupon_GrabCouponStatus.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Coupon_ Inner Consume User Coupon
   * @description POST /elderSvrMiniAPP/coupon/v1/inner_consume_user_coupon
   * @returns Promise<components['schemas']['coupon.v1.ConsumeCouponReply']>
   */
  async couponInnerConsumeUserCoupon(data?: components['schemas']['coupon.v1.UserCouponRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['coupon.v1.ConsumeCouponReply']> {
    const url = buildUrl(API_ENDPOINTS.Coupon_InnerConsumeUserCoupon.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Coupon_ My Coupons
   * @description POST /elderSvrMiniAPP/coupon/v1/my_coupons
   * @returns Promise<components['schemas']['coupon.v1.MyCouponsReply']>
   */
  async couponMyCoupons(data?: components['schemas']['coupon.v1.CommonRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['coupon.v1.MyCouponsReply']> {
    const url = buildUrl(API_ENDPOINTS.Coupon_MyCoupons.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Course Service_ Cancel Enroll
   * @description POST /elderSvrMiniAPP/course/v1/cancel_enroll
   * @returns Promise<components['schemas']['api.elder.v1.course.CancelEnrollResponse']>
   */
  async courseServiceCancelEnroll(data?: components['schemas']['api.elder.v1.course.CancelEnrollRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.course.CancelEnrollResponse']> {
    const url = buildUrl(API_ENDPOINTS.CourseService_CancelEnroll.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Course Service_ Enroll Course
   * @description POST /elderSvrMiniAPP/course/v1/enroll
   * @returns Promise<components['schemas']['api.elder.v1.course.EnrollCourseResponse']>
   */
  async courseServiceEnrollCourse(data?: components['schemas']['api.elder.v1.course.EnrollCourseRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.course.EnrollCourseResponse']> {
    const url = buildUrl(API_ENDPOINTS.CourseService_EnrollCourse.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Course Service_ Get Course
   * @description POST /elderSvrMiniAPP/course/v1/get_course
   * @returns Promise<components['schemas']['api.elder.v1.course.GetCourseResponse']>
   */
  async courseServiceGetCourse(data?: components['schemas']['api.elder.v1.course.GetCourseRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.course.GetCourseResponse']> {
    const url = buildUrl(API_ENDPOINTS.CourseService_GetCourse.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Course Service_ Get Course Schedule
   * @description POST /elderSvrMiniAPP/course/v1/get_course_schedule
   * @returns Promise<components['schemas']['api.elder.v1.course.GetCourseScheduleResponse']>
   */
  async courseServiceGetCourseSchedule(data?: components['schemas']['api.elder.v1.course.GetCourseScheduleRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.course.GetCourseScheduleResponse']> {
    const url = buildUrl(API_ENDPOINTS.CourseService_GetCourseSchedule.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Course Service_ Get My Enroll Courses
   * @description POST /elderSvrMiniAPP/course/v1/get_my_enroll_courses
   * @returns Promise<components['schemas']['api.elder.v1.course.GetMyEnrollCoursesResponse']>
   */
  async courseServiceGetMyEnrollCourses(data?: components['schemas']['api.elder.v1.course.GetMyEnrollCoursesRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.course.GetMyEnrollCoursesResponse']> {
    const url = buildUrl(API_ENDPOINTS.CourseService_GetMyEnrollCourses.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Course Service_ Get Nearby Courses
   * @description POST /elderSvrMiniAPP/course/v1/get_nearby
   * @returns Promise<components['schemas']['api.elder.v1.course.GetNearbyCoursesResponse']>
   */
  async courseServiceGetNearbyCourses(data?: components['schemas']['api.elder.v1.course.GetNearbyCoursesRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.course.GetNearbyCoursesResponse']> {
    const url = buildUrl(API_ENDPOINTS.CourseService_GetNearbyCourses.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Course Service_ List Course Enrolls
   * @description POST /elderSvrMiniAPP/course/v1/list_enrolls
   * @returns Promise<components['schemas']['api.elder.v1.course.ListCourseEnrollsResponse']>
   */
  async courseServiceListCourseEnrolls(data?: components['schemas']['api.elder.v1.course.ListCourseEnrollsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.course.ListCourseEnrollsResponse']> {
    const url = buildUrl(API_ENDPOINTS.CourseService_ListCourseEnrolls.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Emergency_ Call
   * @description POST /elderSvrMiniAPP/emergency/v1/call
   * @returns Promise<components['schemas']['business.v1.CallReply']>
   */
  async emergencyCall(data?: components['schemas']['business.v1.CallRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.CallReply']> {
    const url = buildUrl(API_ENDPOINTS.Emergency_Call.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Emergency_ Cancel Call
   * @description POST /elderSvrMiniAPP/emergency/v1/cancelCall
   * @returns Promise<components['schemas']['business.v1.CancelCallReply']>
   */
  async emergencyCancelCall(data?: components['schemas']['business.v1.CancelCallRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.CancelCallReply']> {
    const url = buildUrl(API_ENDPOINTS.Emergency_CancelCall.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Emergency_ Create
   * @description POST /elderSvrMiniAPP/emergency/v1/create
   * @returns Promise<components['schemas']['business.v1.CreateReply']>
   */
  async emergencyCreate(data?: components['schemas']['business.v1.CreateRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.CreateReply']> {
    const url = buildUrl(API_ENDPOINTS.Emergency_Create.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Emergency_ Describe Emergency T R T C Info
   * @description POST /elderSvrMiniAPP/emergency/v1/describeEmergencyTRTCInfo
   * @returns Promise<components['schemas']['business.v1.DescribeEmergencyTRTCInfoReply']>
   */
  async emergencyDescribeEmergencyTRTCInfo(data?: components['schemas']['business.v1.DescribeEmergencyTRTCInfoRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.DescribeEmergencyTRTCInfoReply']> {
    const url = buildUrl(API_ENDPOINTS.Emergency_DescribeEmergencyTRTCInfo.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Emergency_ Describe Emergency T R T C Users
   * @description POST /elderSvrMiniAPP/emergency/v1/describeEmergencyTRTCUsers
   * @returns Promise<components['schemas']['business.v1.DescribeEmergencyTRTCUsersReply']>
   */
  async emergencyDescribeEmergencyTRTCUsers(data?: components['schemas']['business.v1.DescribeEmergencyTRTCUsersRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.DescribeEmergencyTRTCUsersReply']> {
    const url = buildUrl(API_ENDPOINTS.Emergency_DescribeEmergencyTRTCUsers.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Emergency_ Describe Emergency Timelines
   * @description POST /elderSvrMiniAPP/emergency/v1/describeEmergencyTimelines
   * @returns Promise<components['schemas']['business.v1.DescribeEmergencyTimelinesReply']>
   */
  async emergencyDescribeEmergencyTimelines(data?: components['schemas']['business.v1.DescribeEmergencyTimelinesRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.DescribeEmergencyTimelinesReply']> {
    const url = buildUrl(API_ENDPOINTS.Emergency_DescribeEmergencyTimelines.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Emergency_ Match Respond Region
   * @description POST /elderSvrMiniAPP/emergency/v1/matchRespondRegion
   * @returns Promise<components['schemas']['business.v1.MatchRespondRegionReply']>
   */
  async emergencyMatchRespondRegion(data?: components['schemas']['business.v1.MatchRespondRegionRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.MatchRespondRegionReply']> {
    const url = buildUrl(API_ENDPOINTS.Emergency_MatchRespondRegion.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Sync Update Request Address
   * @description POST /elderSvrMiniAPP/help/v1/address/sync
   * @returns Promise<components['schemas']['api.elder.help.v1.SyncUpdateRequestAddressResponse']>
   */
  async helpCenterServiceSyncUpdateRequestAddress(data?: components['schemas']['api.elder.help.v1.SyncUpdateRequestAddressRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.SyncUpdateRequestAddressResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_SyncUpdateRequestAddress.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Get Categories Tree
   * @description POST /elderSvrMiniAPP/help/v1/categories/tree
   * @returns Promise<components['schemas']['api.elder.help.v1.GetCategoriesTreeResponse']>
   */
  async helpCenterServiceGetCategoriesTree(data?: components['schemas']['api.elder.help.v1.GetCategoriesTreeRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetCategoriesTreeResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_GetCategoriesTree.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Delete Category
   * @description POST /elderSvrMiniAPP/help/v1/category/delete
   * @returns Promise<components['schemas']['api.elder.help.v1.DeleteCategoryResponse']>
   */
  async helpCenterServiceDeleteCategory(data?: components['schemas']['api.elder.help.v1.DeleteCategoryRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.DeleteCategoryResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_DeleteCategory.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ List Categories
   * @description POST /elderSvrMiniAPP/help/v1/category/list
   * @returns Promise<components['schemas']['api.elder.help.v1.ListCategoriesResponse']>
   */
  async helpCenterServiceListCategories(data?: components['schemas']['api.elder.help.v1.ListCategoriesRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListCategoriesResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_ListCategories.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Search Help Category
   * @description POST /elderSvrMiniAPP/help/v1/category/search
   * @returns Promise<components['schemas']['api.elder.help.v1.SearchHelpCategoryResponse']>
   */
  async helpCenterServiceSearchHelpCategory(data?: components['schemas']['api.elder.help.v1.SearchHelpCategoryRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.SearchHelpCategoryResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_SearchHelpCategory.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Get Help Request Category Summary
   * @description POST /elderSvrMiniAPP/help/v1/category/summary
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelpRequestCategorySummaryResponse']>
   */
  async helpCenterServiceGetHelpRequestCategorySummary(data?: components['schemas']['api.elder.help.v1.GetHelpRequestCategorySummaryRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelpRequestCategorySummaryResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_GetHelpRequestCategorySummary.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Upsert Category
   * @description POST /elderSvrMiniAPP/help/v1/category/upsert
   * @returns Promise<components['schemas']['api.elder.help.v1.UpsertCategoryResponse']>
   */
  async helpCenterServiceUpsertCategory(data?: components['schemas']['api.elder.help.v1.UpsertCategoryRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.UpsertCategoryResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_UpsertCategory.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Get Community Categories
   * @description POST /elderSvrMiniAPP/help/v1/community/categories
   * @returns Promise<components['schemas']['api.elder.help.v1.GetCommunityCategoriesResponse']>
   */
  async helpCenterServiceGetCommunityCategories(data?: components['schemas']['api.elder.help.v1.GetCommunityCategoriesRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetCommunityCategoriesResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_GetCommunityCategories.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Create Or Update Contact
   * @description POST /elderSvrMiniAPP/help/v1/contact/create_or_update
   * @returns Promise<components['schemas']['api.elder.help.v1.CreateOrUpdateContactResponse']>
   */
  async helpCenterServiceCreateOrUpdateContact(data?: components['schemas']['api.elder.help.v1.CreateOrUpdateContactRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.CreateOrUpdateContactResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_CreateOrUpdateContact.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Delete Contact
   * @description POST /elderSvrMiniAPP/help/v1/contact/delete
   * @returns Promise<components['schemas']['api.elder.help.v1.DeleteContactResponse']>
   */
  async helpCenterServiceDeleteContact(data?: components['schemas']['api.elder.help.v1.DeleteContactRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.DeleteContactResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_DeleteContact.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ List User Contacts
   * @description POST /elderSvrMiniAPP/help/v1/contact/list
   * @returns Promise<components['schemas']['api.elder.help.v1.ListUserContactsResponse']>
   */
  async helpCenterServiceListUserContacts(data?: components['schemas']['api.elder.help.v1.ListUserContactsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListUserContactsResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_ListUserContacts.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Sync Update Contact
   * @description POST /elderSvrMiniAPP/help/v1/contact/sync
   * @returns Promise<components['schemas']['api.elder.help.v1.SyncUpdateContactResponse']>
   */
  async helpCenterServiceSyncUpdateContact(data?: components['schemas']['api.elder.help.v1.SyncUpdateContactRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.SyncUpdateContactResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_SyncUpdateContact.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Get Org By Help Category
   * @description POST /elderSvrMiniAPP/help/v1/paid_org
   * @returns Promise<components['schemas']['api.elder.help.v1.GetOrgByHelpCategoryResponse']>
   */
  async helpCenterServiceGetOrgByHelpCategory(data?: components['schemas']['api.elder.help.v1.GetOrgByHelpCategoryRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetOrgByHelpCategoryResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_GetOrgByHelpCategory.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ List Org By Community
   * @description POST /elderSvrMiniAPP/help/v1/paid_org/by_community
   * @returns Promise<components['schemas']['api.elder.help.v1.ListOrgByCommunityResponse']>
   */
  async helpCenterServiceListOrgByCommunity(data?: components['schemas']['api.elder.help.v1.ListOrgByCommunityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListOrgByCommunityResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_ListOrgByCommunity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Get Community Paid Org
   * @description POST /elderSvrMiniAPP/help/v1/paid_org/by_org
   * @returns Promise<components['schemas']['api.elder.help.v1.GetCommunityPaidOrgResponse']>
   */
  async helpCenterServiceGetCommunityPaidOrg(data?: components['schemas']['api.elder.help.v1.GetCommunityPaidOrgRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetCommunityPaidOrgResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_GetCommunityPaidOrg.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Cancel Help Request
   * @description POST /elderSvrMiniAPP/help/v1/request/cancel
   * @returns Promise<components['schemas']['api.elder.help.v1.CancelHelpRequestResponse']>
   */
  async helpCenterServiceCancelHelpRequest(data?: components['schemas']['api.elder.help.v1.CancelHelpRequestRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.CancelHelpRequestResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_CancelHelpRequest.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Create Help Request
   * @description POST /elderSvrMiniAPP/help/v1/request/create
   * @returns Promise<components['schemas']['api.elder.help.v1.CreateHelpRequestResponse']>
   */
  async helpCenterServiceCreateHelpRequest(data?: components['schemas']['api.elder.help.v1.CreateHelpRequestRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.CreateHelpRequestResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_CreateHelpRequest.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Create By Third Party
   * @description POST /elderSvrMiniAPP/help/v1/request/create_by_third_party
   * @returns Promise<components['schemas']['api.elder.help.v1.CreateHelpRequestResponse']>
   */
  async helpCenterServiceCreateByThirdParty(data?: components['schemas']['api.elder.help.v1.CreateHelpRequestThirdParty'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.CreateHelpRequestResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_CreateByThirdParty.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Create Retroactive Help Request
   * @description POST /elderSvrMiniAPP/help/v1/request/create_retroactive
   * @returns Promise<components['schemas']['api.elder.help.v1.CreateRetroactiveHelpRequestResponse']>
   */
  async helpCenterServiceCreateRetroactiveHelpRequest(data?: components['schemas']['api.elder.help.v1.CreateRetroactiveHelpRequestRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.CreateRetroactiveHelpRequestResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_CreateRetroactiveHelpRequest.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Get Help Request Detail
   * @description POST /elderSvrMiniAPP/help/v1/request/detail
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelpRequestDetailResponse']>
   */
  async helpCenterServiceGetHelpRequestDetail(data?: components['schemas']['api.elder.help.v1.GetHelpRequestDetailRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelpRequestDetailResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_GetHelpRequestDetail.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Finish Help Request
   * @description POST /elderSvrMiniAPP/help/v1/request/finish
   * @returns Promise<components['schemas']['api.elder.help.v1.FinishHelpRequestResponse']>
   */
  async helpCenterServiceFinishHelpRequest(data?: components['schemas']['api.elder.help.v1.FinishHelpRequestRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.FinishHelpRequestResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_FinishHelpRequest.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Get Retroactive Draft
   * @description POST /elderSvrMiniAPP/help/v1/request/get_retroactive_draft
   * @returns Promise<components['schemas']['api.elder.help.v1.GetRetroactiveDraftResponse']>
   */
  async helpCenterServiceGetRetroactiveDraft(data?: components['schemas']['api.elder.help.v1.GetRetroactiveDraftRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetRetroactiveDraftResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_GetRetroactiveDraft.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Get Status Detail
   * @description POST /elderSvrMiniAPP/help/v1/request/get_status_detail
   * @returns Promise<components['schemas']['api.elder.help.v1.GetStatusDetailResponse']>
   */
  async helpCenterServiceGetStatusDetail(data?: components['schemas']['api.elder.help.v1.GetStatusDetailRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetStatusDetailResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_GetStatusDetail.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ List Help Requests
   * @description POST /elderSvrMiniAPP/help/v1/request/list
   * @returns Promise<components['schemas']['api.elder.help.v1.ListHelpRequestsResponse']>
   */
  async helpCenterServiceListHelpRequests(data?: components['schemas']['api.elder.help.v1.ListHelpRequestsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListHelpRequestsResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_ListHelpRequests.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Get My Published Requests
   * @description POST /elderSvrMiniAPP/help/v1/request/my_published
   * @returns Promise<components['schemas']['api.elder.help.v1.GetMyPublishedRequestsResponse']>
   */
  async helpCenterServiceGetMyPublishedRequests(data?: components['schemas']['api.elder.help.v1.GetMyPublishedRequestsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetMyPublishedRequestsResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_GetMyPublishedRequests.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Pre Check
   * @description POST /elderSvrMiniAPP/help/v1/request/pre_check
   * @returns Promise<components['schemas']['api.elder.help.v1.PreCheckResponse']>
   */
  async helpCenterServicePreCheck(data?: components['schemas']['api.elder.help.v1.PreCheckRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.PreCheckResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_PreCheck.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Save Retroactive Draft
   * @description POST /elderSvrMiniAPP/help/v1/request/save_retroactive_draft
   * @returns Promise<components['schemas']['api.elder.help.v1.SaveRetroactiveDraftResponse']>
   */
  async helpCenterServiceSaveRetroactiveDraft(data?: components['schemas']['api.elder.help.v1.SaveRetroactiveDraftRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.SaveRetroactiveDraftResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_SaveRetroactiveDraft.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Sync Data
   * @description POST /elderSvrMiniAPP/help/v1/request/sync_data
   * @returns Promise<components['schemas']['api.elder.help.v1.SyncDataResponse']>
   */
  async helpCenterServiceSyncData(data?: components['schemas']['api.elder.help.v1.SyncDataRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.SyncDataResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_SyncData.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Trigger Fill Location For Old Requests
   * @description POST /elderSvrMiniAPP/help/v1/request/trigger_fill_location
   * @returns Promise<components['schemas']['api.elder.help.v1.TriggerFillLocationResponse']>
   */
  async helpCenterServiceTriggerFillLocationForOldRequests(data?: components['schemas']['api.elder.help.v1.TriggerFillLocationRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.TriggerFillLocationResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_TriggerFillLocationForOldRequests.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Un Finish Help Request
   * @description POST /elderSvrMiniAPP/help/v1/request/un_finish
   * @returns Promise<components['schemas']['api.elder.help.v1.FinishHelpRequestResponse']>
   */
  async helpCenterServiceUnFinishHelpRequest(data?: components['schemas']['api.elder.help.v1.FinishHelpRequestRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.FinishHelpRequestResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_UnFinishHelpRequest.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Batch Update City Info
   * @description POST /elderSvrMiniAPP/help/v1/request/update_city_info
   * @returns Promise<components['schemas']['api.elder.help.v1.BatchUpdateCityInfoResponse']>
   */
  async helpCenterServiceBatchUpdateCityInfo(data?: components['schemas']['api.elder.help.v1.BatchUpdateCityInfoRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.BatchUpdateCityInfoResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_BatchUpdateCityInfo.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Help Center Service_ Update Help Request Status
   * @description POST /elderSvrMiniAPP/help/v1/request/update_status
   * @returns Promise<components['schemas']['api.elder.help.v1.UpdateHelpRequestStatusResponse']>
   */
  async helpCenterServiceUpdateHelpRequestStatus(data?: components['schemas']['api.elder.help.v1.UpdateHelpRequestStatusRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.UpdateHelpRequestStatusResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelpCenterService_UpdateHelpRequestStatus.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Apply Helper
   * @description POST /elderSvrMiniAPP/helper/v1/apply
   * @returns Promise<components['schemas']['api.elder.help.v1.ApplyHelperResponse']>
   */
  async helperServiceApplyHelper(data?: components['schemas']['api.elder.help.v1.ApplyHelperRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ApplyHelperResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_ApplyHelper.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Approve Helper Apply
   * @description POST /elderSvrMiniAPP/helper/v1/apply/approve
   * @returns Promise<components['schemas']['api.elder.help.v1.ApproveHelperApplyResponse']>
   */
  async helperServiceApproveHelperApply(data?: components['schemas']['api.elder.help.v1.ApproveHelperApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ApproveHelperApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_ApproveHelperApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Cancel Helper Apply
   * @description POST /elderSvrMiniAPP/helper/v1/apply/cancel
   * @returns Promise<components['schemas']['api.elder.help.v1.CancelHelperApplyResponse']>
   */
  async helperServiceCancelHelperApply(data?: components['schemas']['api.elder.help.v1.CancelHelperApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.CancelHelperApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_CancelHelperApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Get Helper Apply
   * @description POST /elderSvrMiniAPP/helper/v1/apply/get
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelperApplyResponse']>
   */
  async helperServiceGetHelperApply(data?: components['schemas']['api.elder.help.v1.GetHelperApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelperApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_GetHelperApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ List Helper Apply
   * @description POST /elderSvrMiniAPP/helper/v1/apply/list
   * @returns Promise<components['schemas']['api.elder.help.v1.ListHelperApplyResponse']>
   */
  async helperServiceListHelperApply(data?: components['schemas']['api.elder.help.v1.ListHelperApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListHelperApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_ListHelperApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Refuse Helper Apply
   * @description POST /elderSvrMiniAPP/helper/v1/apply/refuse
   * @returns Promise<components['schemas']['api.elder.help.v1.RefuseHelperApplyResponse']>
   */
  async helperServiceRefuseHelperApply(data?: components['schemas']['api.elder.help.v1.RefuseHelperApplyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.RefuseHelperApplyResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_RefuseHelperApply.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Comment Help Enrollment
   * @description POST /elderSvrMiniAPP/helper/v1/comment
   * @returns Promise<components['schemas']['api.elder.help.v1.CommentHelpEnrollmentResponse']>
   */
  async helperServiceCommentHelpEnrollment(data?: components['schemas']['api.elder.help.v1.CommentHelpEnrollmentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.CommentHelpEnrollmentResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_CommentHelpEnrollment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Get Request Comment
   * @description POST /elderSvrMiniAPP/helper/v1/comment/by_request
   * @returns Promise<components['schemas']['api.elder.help.v1.GetRequestCommentResponse']>
   */
  async helperServiceGetRequestComment(data?: components['schemas']['api.elder.help.v1.GetRequestCommentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetRequestCommentResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_GetRequestComment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Trigger Populate Comment Statics
   * @description POST /elderSvrMiniAPP/helper/v1/comment/migration
   * @returns Promise<components['schemas']['api.elder.help.v1.TriggerPopulateCommentStaticsResponse']>
   */
  async helperServiceTriggerPopulateCommentStatics(data?: components['schemas']['api.elder.help.v1.TriggerPopulateCommentStaticsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.TriggerPopulateCommentStaticsResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_TriggerPopulateCommentStatics.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Get All Resident Communities
   * @description POST /elderSvrMiniAPP/helper/v1/communities
   * @returns Promise<components['schemas']['api.elder.help.v1.GetAllResidentCommunitiesResponse']>
   */
  async helperServiceGetAllResidentCommunities(data?: components['schemas']['api.elder.help.v1.GetAllResidentCommunitiesRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetAllResidentCommunitiesResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_GetAllResidentCommunities.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Get Helper Request Enrollment
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/get
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentResponse']>
   */
  async helperServiceGetHelperRequestEnrollment(data?: components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_GetHelperRequestEnrollment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ List Help Enrollment Hom Page
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/home_page
   * @returns Promise<components['schemas']['api.elder.help.v1.ListHelpEnrollmentHomPageResponse']>
   */
  async helperServiceListHelpEnrollmentHomPage(data?: components['schemas']['api.elder.help.v1.ListHelpEnrollmentHomPageRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListHelpEnrollmentHomPageResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_ListHelpEnrollmentHomPage.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ List Helper Request Enrollment
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/list
   * @returns Promise<components['schemas']['api.elder.help.v1.ListHelperRequestEnrollmentResponse']>
   */
  async helperServiceListHelperRequestEnrollment(data?: components['schemas']['api.elder.help.v1.ListHelperRequestEnrollmentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListHelperRequestEnrollmentResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_ListHelperRequestEnrollment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ List Help Request Enrollment By Org
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/list/by_org
   * @returns Promise<components['schemas']['api.elder.help.v1.ListHelpRequestEnrollmentByOrgResponse']>
   */
  async helperServiceListHelpRequestEnrollmentByOrg(data?: components['schemas']['api.elder.help.v1.ListHelpRequestEnrollmentByOrgRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListHelpRequestEnrollmentByOrgResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_ListHelpRequestEnrollmentByOrg.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ List Enrollment Photo By Org And Community
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/photo/by_org
   * @returns Promise<components['schemas']['api.elder.help.v1.ListEnrollmentPhotoByOrgAndCommunityResponse']>
   */
  async helperServiceListEnrollmentPhotoByOrgAndCommunity(data?: components['schemas']['api.elder.help.v1.ListEnrollmentPhotoByOrgAndCommunityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListEnrollmentPhotoByOrgAndCommunityResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_ListEnrollmentPhotoByOrgAndCommunity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Get Helper Enrollment Photo
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/photo/get
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelperEnrollmentPhotoResponse']>
   */
  async helperServiceGetHelperEnrollmentPhoto(data?: components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelperEnrollmentPhotoResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_GetHelperEnrollmentPhoto.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Get Helper Request Enrollment User
   * @description POST /elderSvrMiniAPP/helper/v1/enrollment/user/get
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentUserResponse']>
   */
  async helperServiceGetHelperRequestEnrollmentUser(data?: components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentUserRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelperRequestEnrollmentUserResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_GetHelperRequestEnrollmentUser.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Get Helper
   * @description POST /elderSvrMiniAPP/helper/v1/get
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelperResponse']>
   */
  async helperServiceGetHelper(data?: components['schemas']['api.elder.help.v1.GetHelperRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelperResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_GetHelper.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Get Helper With Community
   * @description POST /elderSvrMiniAPP/helper/v1/get_by_community
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelperResponse']>
   */
  async helperServiceGetHelperWithCommunity(data?: components['schemas']['api.elder.help.v1.GetHelperWithCommunityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelperResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_GetHelperWithCommunity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Get Last Authorized Helper
   * @description POST /elderSvrMiniAPP/helper/v1/get_last_authorized
   * @returns Promise<components['schemas']['api.elder.help.v1.GetHelperResponse']>
   */
  async helperServiceGetLastAuthorizedHelper(data?: components['schemas']['api.elder.help.v1.GetHelperRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetHelperResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_GetLastAuthorizedHelper.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Trigger Populate Level Statics
   * @description POST /elderSvrMiniAPP/helper/v1/level/migration
   * @returns Promise<components['schemas']['api.elder.help.v1.TriggerPopulateCommentStaticsResponse']>
   */
  async helperServiceTriggerPopulateLevelStatics(data?: components['schemas']['api.elder.help.v1.TriggerPopulateCommentStaticsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.TriggerPopulateCommentStaticsResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_TriggerPopulateLevelStatics.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ List Resident Like Cnt
   * @description POST /elderSvrMiniAPP/helper/v1/like_cnt
   * @returns Promise<components['schemas']['api.elder.help.v1.ListResidentLikeCntResponse']>
   */
  async helperServiceListResidentLikeCnt(data?: components['schemas']['api.elder.help.v1.ListResidentLikeCntRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListResidentLikeCntResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_ListResidentLikeCnt.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Get My Enrolled Help Request
   * @description POST /elderSvrMiniAPP/helper/v1/my_enrolled
   * @returns Promise<components['schemas']['api.elder.help.v1.ListHelperRequestEnrollmentResponse']>
   */
  async helperServiceGetMyEnrolledHelpRequest(data?: components['schemas']['api.elder.help.v1.GetMyEnrolledHelpRequestRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.ListHelperRequestEnrollmentResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_GetMyEnrolledHelpRequest.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Get Residents2 Comment
   * @description POST /elderSvrMiniAPP/helper/v1/need_to_comment
   * @returns Promise<components['schemas']['api.elder.help.v1.GetResidents2CommentResponse']>
   */
  async helperServiceGetResidents2Comment(data?: components['schemas']['api.elder.help.v1.GetResidents2CommentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetResidents2CommentResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_GetResidents2Comment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Enroll Help Request
   * @description POST /elderSvrMiniAPP/helper/v1/request/enroll
   * @returns Promise<components['schemas']['api.elder.help.v1.EnrollHelpRequestResponse']>
   */
  async helperServiceEnrollHelpRequest(data?: components['schemas']['api.elder.help.v1.EnrollHelpRequestRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.EnrollHelpRequestResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_EnrollHelpRequest.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Cancel Enroll Help Request
   * @description POST /elderSvrMiniAPP/helper/v1/request/enroll/cancel
   * @returns Promise<components['schemas']['api.elder.help.v1.CancelHelpRequestEnrollmentResponse']>
   */
  async helperServiceCancelEnrollHelpRequest(data?: components['schemas']['api.elder.help.v1.CancelHelpRequestEnrollmentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.CancelHelpRequestEnrollmentResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_CancelEnrollHelpRequest.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Finish Enroll Help Request
   * @description POST /elderSvrMiniAPP/helper/v1/request/finish
   * @returns Promise<components['schemas']['api.elder.help.v1.FinishHelpEnrollmentResponse']>
   */
  async helperServiceFinishEnrollHelpRequest(data?: components['schemas']['api.elder.help.v1.FinishHelpEnrollmentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.FinishHelpEnrollmentResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_FinishEnrollHelpRequest.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Hospital_ Check Seek Medical Condition
   * @description POST /elderSvrMiniAPP/hospital/v1/checkSeekMedicalCondition
   * @returns Promise<components['schemas']['seek_medical.v1.CheckSeekMedicalConditionReply']>
   */
  async hospitalCheckSeekMedicalCondition(data?: components['schemas']['seek_medical.v1.CheckSeekMedicalConditionRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.CheckSeekMedicalConditionReply']> {
    const url = buildUrl(API_ENDPOINTS.Hospital_CheckSeekMedicalCondition.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Hospital_ Describe Doctor
   * @description POST /elderSvrMiniAPP/hospital/v1/describeDoctor
   * @returns Promise<components['schemas']['seek_medical.v1.DescribeDoctorReply']>
   */
  async hospitalDescribeDoctor(data?: components['schemas']['seek_medical.v1.DescribeDoctorRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.DescribeDoctorReply']> {
    const url = buildUrl(API_ENDPOINTS.Hospital_DescribeDoctor.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Hospital_ Describe Doctor Schedule
   * @description POST /elderSvrMiniAPP/hospital/v1/describeDoctorSchedule
   * @returns Promise<components['schemas']['seek_medical.v1.DescribeDoctorScheduleReply']>
   */
  async hospitalDescribeDoctorSchedule(data?: components['schemas']['seek_medical.v1.DescribeDoctorScheduleRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.DescribeDoctorScheduleReply']> {
    const url = buildUrl(API_ENDPOINTS.Hospital_DescribeDoctorSchedule.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Hospital_ Describe Elder Info List
   * @description POST /elderSvrMiniAPP/hospital/v1/describeElderInfoList
   * @returns Promise<components['schemas']['seek_medical.v1.DescribeElderInfoListReply']>
   */
  async hospitalDescribeElderInfoList(data?: components['schemas']['seek_medical.v1.DescribeElderInfoListRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.DescribeElderInfoListReply']> {
    const url = buildUrl(API_ENDPOINTS.Hospital_DescribeElderInfoList.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Hospital_ Describe Hospital
   * @description POST /elderSvrMiniAPP/hospital/v1/describeHospital
   * @returns Promise<components['schemas']['seek_medical.v1.DescribeHospitalReply']>
   */
  async hospitalDescribeHospital(data?: components['schemas']['seek_medical.v1.DescribeHospitalRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.DescribeHospitalReply']> {
    const url = buildUrl(API_ENDPOINTS.Hospital_DescribeHospital.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Hospital_ Get Hospital Info By Doctor I D
   * @description POST /elderSvrMiniAPP/hospital/v1/getHospitalInfoByDoctorID
   * @returns Promise<components['schemas']['seek_medical.v1.GetHospitalInfoByDoctorIDReply']>
   */
  async hospitalGetHospitalInfoByDoctorID(data?: components['schemas']['seek_medical.v1.GetHospitalInfoByDoctorIDRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.GetHospitalInfoByDoctorIDReply']> {
    const url = buildUrl(API_ENDPOINTS.Hospital_GetHospitalInfoByDoctorID.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Hospital_ Health Message Info
   * @description POST /elderSvrMiniAPP/hospital/v1/healthMessageInfo
   * @returns Promise<components['schemas']['seek_medical.v1.HealthMessageInfoReply']>
   */
  async hospitalHealthMessageInfo(data?: components['schemas']['seek_medical.v1.HealthMessageInfoRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.HealthMessageInfoReply']> {
    const url = buildUrl(API_ENDPOINTS.Hospital_HealthMessageInfo.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Hospital_ Health Message List
   * @description POST /elderSvrMiniAPP/hospital/v1/healthMessageList
   * @returns Promise<components['schemas']['seek_medical.v1.HealthMessageListReply']>
   */
  async hospitalHealthMessageList(data?: components['schemas']['seek_medical.v1.HealthMessageListRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.HealthMessageListReply']> {
    const url = buildUrl(API_ENDPOINTS.Hospital_HealthMessageList.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Hospital_ Check Elder Subscribe Health Message
   * @description POST /elderSvrMiniAPP/hospital/v1/sheckElderSubscribeHealthMessage
   * @returns Promise<components['schemas']['seek_medical.v1.CheckElderSubscribeHealthMessageReply']>
   */
  async hospitalCheckElderSubscribeHealthMessage(data?: components['schemas']['seek_medical.v1.HospitalNullBodyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.CheckElderSubscribeHealthMessageReply']> {
    const url = buildUrl(API_ENDPOINTS.Hospital_CheckElderSubscribeHealthMessage.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Im_ Get User Sig
   * @description POST /elderSvrMiniAPP/im/v1/getUserSig
   * @returns Promise<components['schemas']['business.v1.GetUserSigReply']>
   */
  async imGetUserSig(data?: components['schemas']['business.v1.ImNullBodyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.GetUserSigReply']> {
    const url = buildUrl(API_ENDPOINTS.Im_GetUserSig.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Im_ Im Config
   * @description POST /elderSvrMiniAPP/im/v1/imConfig
   * @returns Promise<components['schemas']['business.v1.ImConfigReply']>
   */
  async imImConfig(data?: components['schemas']['business.v1.ImNullBodyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ImConfigReply']> {
    const url = buildUrl(API_ENDPOINTS.Im_ImConfig.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Login_ Logout
   * @description POST /elderSvrMiniAPP/login/v1/logout
   * @returns Promise<components['schemas']['system.v1.LoginOperateReply']>
   */
  async loginLogout(data?: components['schemas']['system.v1.LogoutRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.LoginOperateReply']> {
    const url = buildUrl(API_ENDPOINTS.Login_Logout.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Login_ Refresh
   * @description POST /elderSvrMiniAPP/login/v1/refresh
   * @returns Promise<components['schemas']['system.v1.RefreshReply']>
   */
  async loginRefresh(data?: components['schemas']['system.v1.RefreshRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.RefreshReply']> {
    const url = buildUrl(API_ENDPOINTS.Login_Refresh.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Login_ Wx Login
   * @description POST /elderSvrMiniAPP/login/v1/wxLogin
   * @returns Promise<components['schemas']['system.v1.WxLoginReply']>
   */
  async loginWxLogin(data?: components['schemas']['system.v1.WxLoginRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.WxLoginReply']> {
    const url = buildUrl(API_ENDPOINTS.Login_WxLogin.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Message_ Modify Mini Progrom Message Subscribe
   * @description POST /elderSvrMiniAPP/message/v1/ModifyMiniProgromMessageSubscribe
   * @returns Promise<components['schemas']['business.v1.MessageOperateReply']>
   */
  async messageModifyMiniProgromMessageSubscribe(data?: components['schemas']['business.v1.ModifyMiniProgromMessageSubscribeRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.MessageOperateReply']> {
    const url = buildUrl(API_ENDPOINTS.Message_ModifyMiniProgromMessageSubscribe.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization_ Get Organization
   * @description POST /elderSvrMiniAPP/organization/v1/get
   * @returns Promise<components['schemas']['api.elder.organization.v1.GetOrganizationResponse']>
   */
  async organizationGetOrganization(data?: components['schemas']['api.elder.organization.v1.GetOrganizationRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.organization.v1.GetOrganizationResponse']> {
    const url = buildUrl(API_ENDPOINTS.Organization_GetOrganization.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Organization_ Join Org
   * @description POST /elderSvrMiniAPP/organization/v1/join
   * @returns Promise<components['schemas']['api.elder.organization.v1.JoinOrgResponse']>
   */
  async organizationJoinOrg(data?: components['schemas']['api.elder.organization.v1.JoinOrgRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.organization.v1.JoinOrgResponse']> {
    const url = buildUrl(API_ENDPOINTS.Organization_JoinOrg.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Payment Service_ Close Order
   * @description POST /elderSvrMiniAPP/payment/v1/close_order
   * @returns Promise<components['schemas']['api.elder.payment.v1.CloseOrderRes']>
   */
  async paymentServiceCloseOrder(data?: components['schemas']['api.elder.payment.v1.CloseOrderReq'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.payment.v1.CloseOrderRes']> {
    const url = buildUrl(API_ENDPOINTS.PaymentService_CloseOrder.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Payment Service_ Complete Order
   * @description POST /elderSvrMiniAPP/payment/v1/complete_order
   * @returns Promise<components['schemas']['api.elder.payment.v1.CompleteOrderRes']>
   */
  async paymentServiceCompleteOrder(data?: components['schemas']['api.elder.payment.v1.CompleteOrderReq'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.payment.v1.CompleteOrderRes']> {
    const url = buildUrl(API_ENDPOINTS.PaymentService_CompleteOrder.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Payment Service_ Get Wx Pay Sign
   * @description POST /elderSvrMiniAPP/payment/v1/get_wx_pay_sign
   * @returns Promise<components['schemas']['api.elder.payment.v1.GetWxPaySignRes']>
   */
  async paymentServiceGetWxPaySign(data?: components['schemas']['api.elder.payment.v1.GetWxPaySignReq'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.payment.v1.GetWxPaySignRes']> {
    const url = buildUrl(API_ENDPOINTS.PaymentService_GetWxPaySign.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Payment Service_ List Transactions
   * @description POST /elderSvrMiniAPP/payment/v1/list_transactions
   * @returns Promise<components['schemas']['api.elder.payment.v1.ListOrderRes']>
   */
  async paymentServiceListTransactions(data?: any, params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.payment.v1.ListOrderRes']> {
    const url = buildUrl(API_ENDPOINTS.PaymentService_ListTransactions.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Payment Service_ Pre Pay
   * @description POST /elderSvrMiniAPP/payment/v1/pre_pay
   * @returns Promise<components['schemas']['api.elder.payment.v1.PrePayRes']>
   */
  async paymentServicePrePay(data?: components['schemas']['api.elder.payment.v1.PrePayReq'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.payment.v1.PrePayRes']> {
    const url = buildUrl(API_ENDPOINTS.PaymentService_PrePay.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Payment Service_ Refund
   * @description POST /elderSvrMiniAPP/payment/v1/refund
   * @returns Promise<components['schemas']['api.elder.payment.v1.RefundRes']>
   */
  async paymentServiceRefund(data?: components['schemas']['api.elder.payment.v1.RefundReq'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.payment.v1.RefundRes']> {
    const url = buildUrl(API_ENDPOINTS.PaymentService_Refund.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Recruitment Service_ List Recruit Applicants
   * @description POST /elderSvrMiniAPP/recruit/v1/applicants
   * @returns Promise<components['schemas']['api.elder.activity.v1.ListRecruitApplicantsResponse']>
   */
  async recruitmentServiceListRecruitApplicants(data?: components['schemas']['api.elder.activity.v1.ListRecruitApplicantsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.ListRecruitApplicantsResponse']> {
    const url = buildUrl(API_ENDPOINTS.RecruitmentService_ListRecruitApplicants.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Recruitment Service_ Apply Recruit Campaign
   * @description POST /elderSvrMiniAPP/recruit/v1/apply
   * @returns Promise<components['schemas']['api.elder.activity.v1.ApplyRecruitCampaignResponse']>
   */
  async recruitmentServiceApplyRecruitCampaign(data?: components['schemas']['api.elder.activity.v1.ApplyRecruitCampaignRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.ApplyRecruitCampaignResponse']> {
    const url = buildUrl(API_ENDPOINTS.RecruitmentService_ApplyRecruitCampaign.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Recruitment Service_ Check Recruit Applied
   * @description POST /elderSvrMiniAPP/recruit/v1/check_applied
   * @returns Promise<components['schemas']['api.elder.activity.v1.CheckRecruitAppliedResponse']>
   */
  async recruitmentServiceCheckRecruitApplied(data?: components['schemas']['api.elder.activity.v1.CheckRecruitAppliedRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.CheckRecruitAppliedResponse']> {
    const url = buildUrl(API_ENDPOINTS.RecruitmentService_CheckRecruitApplied.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Recruitment Service_ Create Recruit Campaign
   * @description POST /elderSvrMiniAPP/recruit/v1/create
   * @returns Promise<components['schemas']['api.elder.activity.v1.CreateRecruitCampaignResponse']>
   */
  async recruitmentServiceCreateRecruitCampaign(data?: components['schemas']['api.elder.activity.v1.CreateRecruitCampaignRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.CreateRecruitCampaignResponse']> {
    const url = buildUrl(API_ENDPOINTS.RecruitmentService_CreateRecruitCampaign.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Recruitment Service_ Delete Recruit Campaign
   * @description POST /elderSvrMiniAPP/recruit/v1/delete
   * @returns Promise<components['schemas']['api.elder.activity.v1.DeleteRecruitCampaignResponse']>
   */
  async recruitmentServiceDeleteRecruitCampaign(data?: components['schemas']['api.elder.activity.v1.DeleteRecruitCampaignRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.DeleteRecruitCampaignResponse']> {
    const url = buildUrl(API_ENDPOINTS.RecruitmentService_DeleteRecruitCampaign.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Recruitment Service_ List Recruit Campaigns
   * @description POST /elderSvrMiniAPP/recruit/v1/list
   * @returns Promise<components['schemas']['api.elder.activity.v1.ListRecruitCampaignsResponse']>
   */
  async recruitmentServiceListRecruitCampaigns(data?: components['schemas']['api.elder.activity.v1.ListRecruitCampaignsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.activity.v1.ListRecruitCampaignsResponse']> {
    const url = buildUrl(API_ENDPOINTS.RecruitmentService_ListRecruitCampaigns.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Restaurant Service_ Get Order History
   * @description POST /elderSvrMiniAPP/restaurant/v1/getOrderHistory
   * @returns Promise<components['schemas']['api.food_delivery.v1.OrderHistoryResponse']>
   */
  async restaurantServiceGetOrderHistory(data?: components['schemas']['api.food_delivery.v1.OrderHistoryRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.OrderHistoryResponse']> {
    const url = buildUrl(API_ENDPOINTS.RestaurantService_GetOrderHistory.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Restaurant Service_ Get Restaurant Detail
   * @description POST /elderSvrMiniAPP/restaurant/v1/getRestaurantDetail
   * @returns Promise<components['schemas']['api.food_delivery.v1.RestaurantDetailResponse']>
   */
  async restaurantServiceGetRestaurantDetail(data?: components['schemas']['api.food_delivery.v1.RestaurantDetailRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.RestaurantDetailResponse']> {
    const url = buildUrl(API_ENDPOINTS.RestaurantService_GetRestaurantDetail.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Restaurant Service_ Get Restaurant Menu
   * @description POST /elderSvrMiniAPP/restaurant/v1/getRestaurantMenu
   * @returns Promise<components['schemas']['api.food_delivery.v1.MenuResponse']>
   */
  async restaurantServiceGetRestaurantMenu(data?: components['schemas']['api.food_delivery.v1.MenuRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.MenuResponse']> {
    const url = buildUrl(API_ENDPOINTS.RestaurantService_GetRestaurantMenu.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Restaurant Service_ Get Scan History
   * @description POST /elderSvrMiniAPP/restaurant/v1/getScanHistory
   * @returns Promise<components['schemas']['api.food_delivery.v1.ScanHistoryResponse']>
   */
  async restaurantServiceGetScanHistory(data?: components['schemas']['api.food_delivery.v1.ScanHistoryRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.ScanHistoryResponse']> {
    const url = buildUrl(API_ENDPOINTS.RestaurantService_GetScanHistory.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Restaurant Service_ Import Menu
   * @description POST /elderSvrMiniAPP/restaurant/v1/import
   * @returns Promise<components['schemas']['api.food_delivery.v1.ImportMenuReply']>
   */
  async restaurantServiceImportMenu(data?: components['schemas']['api.food_delivery.v1.ImportMenuRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.ImportMenuReply']> {
    const url = buildUrl(API_ENDPOINTS.RestaurantService_ImportMenu.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Restaurant Service_ List Orders
   * @description POST /elderSvrMiniAPP/restaurant/v1/listOrders
   * @returns Promise<components['schemas']['api.food_delivery.v1.ListOrdersResponse']>
   */
  async restaurantServiceListOrders(data?: components['schemas']['api.food_delivery.v1.ListOrdersRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.ListOrdersResponse']> {
    const url = buildUrl(API_ENDPOINTS.RestaurantService_ListOrders.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Restaurant Service_ Place Order
   * @description POST /elderSvrMiniAPP/restaurant/v1/placeOrder
   * @returns Promise<components['schemas']['api.food_delivery.v1.PlaceOrderResponse']>
   */
  async restaurantServicePlaceOrder(data?: components['schemas']['api.food_delivery.v1.PlaceOrderRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.PlaceOrderResponse']> {
    const url = buildUrl(API_ENDPOINTS.RestaurantService_PlaceOrder.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Restaurant Service_ Search In Area Restaurants
   * @description POST /elderSvrMiniAPP/restaurant/v1/searchInAreaRestaurants
   * @returns Promise<components['schemas']['api.food_delivery.v1.SearchInAreaResponse']>
   */
  async restaurantServiceSearchInAreaRestaurants(data?: components['schemas']['api.food_delivery.v1.SearchInAreaRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.SearchInAreaResponse']> {
    const url = buildUrl(API_ENDPOINTS.RestaurantService_SearchInAreaRestaurants.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Sync Restaurant Service_ Sync Task
   * @description POST /elderSvrMiniAPP/restaurant/v1/sync_task
   * @returns Promise<components['schemas']['api.food_delivery.v1.ImportMenuReply']>
   */
  async syncRestaurantServiceSyncTask(data?: components['schemas']['api.food_delivery.v1.ImportMenuRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.ImportMenuReply']> {
    const url = buildUrl(API_ENDPOINTS.SyncRestaurantService_SyncTask.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Restaurant Service_ Update Menu Items
   * @description POST /elderSvrMiniAPP/restaurant/v1/updateMenuItems
   * @returns Promise<components['schemas']['api.food_delivery.v1.UpdateMenuItemsResponse']>
   */
  async restaurantServiceUpdateMenuItems(data?: components['schemas']['api.food_delivery.v1.UpdateMenuItemsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.UpdateMenuItemsResponse']> {
    const url = buildUrl(API_ENDPOINTS.RestaurantService_UpdateMenuItems.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Restaurant Service_ Update Menu Items Incremental
   * @description POST /elderSvrMiniAPP/restaurant/v1/updateMenuItemsIncremental
   * @returns Promise<components['schemas']['api.food_delivery.v1.UpdateMenuItemsIncrementalResponse']>
   */
  async restaurantServiceUpdateMenuItemsIncremental(data?: components['schemas']['api.food_delivery.v1.UpdateMenuItemsIncrementalRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.UpdateMenuItemsIncrementalResponse']> {
    const url = buildUrl(API_ENDPOINTS.RestaurantService_UpdateMenuItemsIncremental.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Restaurant Service_ Upload Menu Images
   * @description POST /elderSvrMiniAPP/restaurant/v1/upload
   * @returns Promise<components['schemas']['api.food_delivery.v1.UploadMenuImagesResponse']>
   */
  async restaurantServiceUploadMenuImages(data?: components['schemas']['api.food_delivery.v1.UploadMenuImagesRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.UploadMenuImagesResponse']> {
    const url = buildUrl(API_ENDPOINTS.RestaurantService_UploadMenuImages.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Restaurant Service_ Upsert Restaurant Info
   * @description POST /elderSvrMiniAPP/restaurant/v1/upsertRestaurantInfo
   * @returns Promise<components['schemas']['api.food_delivery.v1.UpsertRestaurantInfoResponse']>
   */
  async restaurantServiceUpsertRestaurantInfo(data?: components['schemas']['api.food_delivery.v1.UpsertRestaurantInfoRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.food_delivery.v1.UpsertRestaurantInfoResponse']> {
    const url = buildUrl(API_ENDPOINTS.RestaurantService_UpsertRestaurantInfo.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Elder Confirm Service Completed
   * @description POST /elderSvrMiniAPP/service/v1/ElderConfirmServiceCompleted
   * @returns Promise<components['schemas']['business.v1.ServiceOperateReply']>
   */
  async serviceElderConfirmServiceCompleted(data?: components['schemas']['business.v1.ElderConfirmServiceCompletedRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ServiceOperateReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_ElderConfirmServiceCompleted.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Browse Article
   * @description POST /elderSvrMiniAPP/service/v1/browseArticle
   * @returns Promise<components['schemas']['business.v1.BrowseArticleReply']>
   */
  async serviceBrowseArticle(data?: components['schemas']['business.v1.BrowseArticleRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.BrowseArticleReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_BrowseArticle.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Cancel Service
   * @description POST /elderSvrMiniAPP/service/v1/cancel
   * @returns Promise<components['schemas']['business.v1.ServiceOperateReply']>
   */
  async serviceCancelService(data?: components['schemas']['business.v1.CancelServiceRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ServiceOperateReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_CancelService.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Chat Service Status Change Notice
   * @description POST /elderSvrMiniAPP/service/v1/chatServiceStatusChangeNotice
   * @returns Promise<components['schemas']['business.v1.ChatServiceStatusChangeNoticeReply']>
   */
  async serviceChatServiceStatusChangeNotice(data?: components['schemas']['business.v1.ChatServiceStatusChangeNoticeRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ChatServiceStatusChangeNoticeReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_ChatServiceStatusChangeNotice.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Complete Paid Service
   * @description POST /elderSvrMiniAPP/service/v1/completePaidService
   * @returns Promise<components['schemas']['business.v1.CompletePaidServiceReply']>
   */
  async serviceCompletePaidService(data?: components['schemas']['business.v1.CompletePaidServiceRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.CompletePaidServiceReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_CompletePaidService.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Third Create Service
   * @description POST /elderSvrMiniAPP/service/v1/createService
   * @returns Promise<components['schemas']['business.v1.ThirdCreateServiceReply']>
   */
  async serviceThirdCreateService(data?: components['schemas']['business.v1.ThirdCreateServiceInfo'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ThirdCreateServiceReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_ThirdCreateService.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Create Service
   * @description POST /elderSvrMiniAPP/service/v1/createServiceRPC
   * @returns Promise<components['schemas']['server.v1.CreateServiceReply']>
   */
  async serviceCreateService(data?: components['schemas']['server.v1.CreateServiceRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['server.v1.CreateServiceReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_CreateService.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Describe Service
   * @description POST /elderSvrMiniAPP/service/v1/describeService
   * @returns Promise<components['schemas']['business.v1.DescribeServiceReply']>
   */
  async serviceDescribeService(data?: components['schemas']['business.v1.DescribeServiceRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.DescribeServiceReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_DescribeService.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Describe Service List
   * @description POST /elderSvrMiniAPP/service/v1/describeServiceList
   * @returns Promise<components['schemas']['business.v1.DescribeServiceListReply']>
   */
  async serviceDescribeServiceList(data?: components['schemas']['business.v1.DescribeServiceListRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.DescribeServiceListReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_DescribeServiceList.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Service Evaluate
   * @description POST /elderSvrMiniAPP/service/v1/evaluate/save
   * @returns Promise<components['schemas']['business.v1.ServiceEvaluateReply']>
   */
  async serviceServiceEvaluate(data?: components['schemas']['business.v1.ServiceEvaluateRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ServiceEvaluateReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_ServiceEvaluate.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Find Community Plaza
   * @description POST /elderSvrMiniAPP/service/v1/findCommunityPlaza
   * @returns Promise<components['schemas']['business.v1.FindCommunityPlazaReply']>
   */
  async serviceFindCommunityPlaza(data?: components['schemas']['business.v1.FindCommunityPlazaRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.FindCommunityPlazaReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_FindCommunityPlaza.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Get Last Service Evaluate
   * @description POST /elderSvrMiniAPP/service/v1/getLastServiceEvaluate
   * @returns Promise<components['schemas']['business.v1.GetLastServiceEvaluateReply']>
   */
  async serviceGetLastServiceEvaluate(data?: components['schemas']['business.v1.GetLastServiceEvaluateRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.GetLastServiceEvaluateReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_GetLastServiceEvaluate.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Get Paid Service By Verify Token
   * @description POST /elderSvrMiniAPP/service/v1/getPaidServiceByVerifyToken
   * @returns Promise<components['schemas']['business.v1.GetPaidServiceByVerifyTokenReply']>
   */
  async serviceGetPaidServiceByVerifyToken(data?: components['schemas']['business.v1.GetPaidServiceByVerifyTokenRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.GetPaidServiceByVerifyTokenReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_GetPaidServiceByVerifyToken.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Get Room User Info
   * @description POST /elderSvrMiniAPP/service/v1/getRoomUserInfo
   * @returns Promise<components['schemas']['business.v1.GetRoomUserInfoReply']>
   */
  async serviceGetRoomUserInfo(data?: components['schemas']['business.v1.GetRoomUserInfoRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.GetRoomUserInfoReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_GetRoomUserInfo.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Get Service Usage Count
   * @description POST /elderSvrMiniAPP/service/v1/getServiceUsageCount
   * @returns Promise<components['schemas']['business.v1.GetServiceUsageCountReply']>
   */
  async serviceGetServiceUsageCount(data?: components['schemas']['business.v1.GetServiceUsageCountRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.GetServiceUsageCountReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_GetServiceUsageCount.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Get Tr Tc
   * @description POST /elderSvrMiniAPP/service/v1/getTrTc
   * @returns Promise<components['schemas']['business.v1.GetTrTcReply']>
   */
  async serviceGetTrTc(data?: components['schemas']['business.v1.GetTrTcRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.GetTrTcReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_GetTrTc.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Hang Up
   * @description POST /elderSvrMiniAPP/service/v1/hangUp
   * @returns Promise<components['schemas']['business.v1.ServiceOperateReply']>
   */
  async serviceHangUp(data?: components['schemas']['business.v1.HangUpRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ServiceOperateReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_HangUp.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Home Banner Service List
   * @description POST /elderSvrMiniAPP/service/v1/homeBannerServiceList
   * @returns Promise<components['schemas']['business.v1.HomeBannerServiceListReply']>
   */
  async serviceHomeBannerServiceList(data?: components['schemas']['business.v1.HomeBannerServiceListRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.HomeBannerServiceListReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_HomeBannerServiceList.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Mine Help Service List
   * @description POST /elderSvrMiniAPP/service/v1/mineHelpServiceList
   * @returns Promise<components['schemas']['business.v1.MineHelpServiceListReply']>
   */
  async serviceMineHelpServiceList(data?: components['schemas']['business.v1.MineHelpServiceListRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.MineHelpServiceListReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_MineHelpServiceList.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Service Person Accept Service
   * @description POST /elderSvrMiniAPP/service/v1/servicePersonAcceptService
   * @returns Promise<components['schemas']['business.v1.ServiceOperateReply']>
   */
  async serviceServicePersonAcceptService(data?: components['schemas']['business.v1.ServicePersonAcceptServiceRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ServiceOperateReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_ServicePersonAcceptService.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Service Person Cancel Service
   * @description POST /elderSvrMiniAPP/service/v1/servicePersonCancelService
   * @returns Promise<components['schemas']['business.v1.ServiceOperateReply']>
   */
  async serviceServicePersonCancelService(data?: components['schemas']['business.v1.ServicePersonCancelServiceRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ServiceOperateReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_ServicePersonCancelService.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Something New
   * @description POST /elderSvrMiniAPP/service/v1/somethingNew
   * @returns Promise<components['schemas']['business.v1.SomethingNewReply']>
   */
  async serviceSomethingNew(data?: components['schemas']['business.v1.ServiceNullBodyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.SomethingNewReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_SomethingNew.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Submit Paid Service Comment
   * @description POST /elderSvrMiniAPP/service/v1/submitPaidServiceComment
   * @returns Promise<components['schemas']['business.v1.SubmitPaidServiceCommentReply']>
   */
  async serviceSubmitPaidServiceComment(data?: components['schemas']['business.v1.SubmitPaidServiceCommentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.SubmitPaidServiceCommentReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_SubmitPaidServiceComment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Validate Service
   * @description POST /elderSvrMiniAPP/service/v1/validateService
   * @returns Promise<components['schemas']['server.v1.ValidateServiceReply']>
   */
  async serviceValidateService(data?: components['schemas']['server.v1.ValidateServiceRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['server.v1.ValidateServiceReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_ValidateService.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Square_ Community Activity List
   * @description POST /elderSvrMiniAPP/square/v1/communityActivityList
   * @returns Promise<components['schemas']['business.v1.CommunityActivityReply']>
   */
  async squareCommunityActivityList(data?: components['schemas']['business.v1.CommunityActivityListRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.CommunityActivityReply']> {
    const url = buildUrl(API_ENDPOINTS.Square_CommunityActivityList.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * T R T C Callback_ New T R T C Record
   * @description POST /elderSvrMiniAPP/trtc/v1/callback/trtc_record
   * @returns Promise<components['schemas']['api.elder.callback.v1.CallbackResponse']>
   */
  async tRTCCallbackNewTRTCRecord(data?: components['schemas']['api.elder.callback.v1.EventRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.callback.v1.CallbackResponse']> {
    const url = buildUrl(API_ENDPOINTS.TRTCCallback_NewTRTCRecord.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Check Community Service
   * @description POST /elderSvrMiniAPP/user/v1/checkCommunityService
   * @returns Promise<components['schemas']['system.v1.CheckCommunityServiceReply']>
   */
  async userCheckCommunityService(data?: components['schemas']['system.v1.CheckCommunityServiceRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.CheckCommunityServiceReply']> {
    const url = buildUrl(API_ENDPOINTS.User_CheckCommunityService.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Check_ Check Token
   * @description POST /elderSvrMiniAPP/user/v1/checkToken
   * @returns Promise<components['schemas']['system.v1.CheckTokenReply']>
   */
  async checkCheckToken(data?: components['schemas']['system.v1.CheckTokenRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.CheckTokenReply']> {
    const url = buildUrl(API_ENDPOINTS.Check_CheckToken.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Get User Contribution Level
   * @description POST /elderSvrMiniAPP/user/v1/contribution/get
   * @returns Promise<components['schemas']['api.elder.help.v1.GetUserContributionLevelResponse']>
   */
  async helperServiceGetUserContributionLevel(data?: components['schemas']['api.elder.help.v1.GetUserContributionLevelRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetUserContributionLevelResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_GetUserContributionLevel.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Create Elder Info
   * @description POST /elderSvrMiniAPP/user/v1/createElderInfo
   * @returns Promise<components['schemas']['system.v1.UserOperateReply']>
   */
  async userCreateElderInfo(data?: components['schemas']['system.v1.CreateElderInfoRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UserOperateReply']> {
    const url = buildUrl(API_ENDPOINTS.User_CreateElderInfo.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Delete Elder For Test
   * @description POST /elderSvrMiniAPP/user/v1/deleteElderForTest
   * @returns Promise<components['schemas']['system.v1.UserOperateReply']>
   */
  async userDeleteElderForTest(data?: components['schemas']['system.v1.DeleteElderForTestRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UserOperateReply']> {
    const url = buildUrl(API_ENDPOINTS.User_DeleteElderForTest.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Describe Elder
   * @description POST /elderSvrMiniAPP/user/v1/describeElder
   * @returns Promise<components['schemas']['system.v1.DescribeElderReply']>
   */
  async userDescribeElder(data?: components['schemas']['system.v1.DescribeElderRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.DescribeElderReply']> {
    const url = buildUrl(API_ENDPOINTS.User_DescribeElder.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Describe User
   * @description POST /elderSvrMiniAPP/user/v1/describeUser
   * @returns Promise<components['schemas']['system.v1.UserOperateReply']>
   */
  async userDescribeUser(data?: components['schemas']['system.v1.UserError'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UserOperateReply']> {
    const url = buildUrl(API_ENDPOINTS.User_DescribeUser.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Generate Personal Qr Code
   * @description POST /elderSvrMiniAPP/user/v1/generatePersonalQrCode
   * @returns Promise<components['schemas']['system.v1.GeneratePersonalQrCodeReply']>
   */
  async userGeneratePersonalQrCode(data?: components['schemas']['system.v1.GeneratePersonalQrCodeRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GeneratePersonalQrCodeReply']> {
    const url = buildUrl(API_ENDPOINTS.User_GeneratePersonalQrCode.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Get Community Detail
   * @description POST /elderSvrMiniAPP/user/v1/getCommunityDetail
   * @returns Promise<components['schemas']['system.v1.GetCommunityDetailReply']>
   */
  async userGetCommunityDetail(data?: components['schemas']['system.v1.GetCommunityDetailRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetCommunityDetailReply']> {
    const url = buildUrl(API_ENDPOINTS.User_GetCommunityDetail.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Get Community List
   * @description POST /elderSvrMiniAPP/user/v1/getCommunityList
   * @returns Promise<components['schemas']['system.v1.GetCommunityListReply']>
   */
  async userGetCommunityList(data?: components['schemas']['system.v1.GetCommunityListRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetCommunityListReply']> {
    const url = buildUrl(API_ENDPOINTS.User_GetCommunityList.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Check_ Get Current User
   * @description POST /elderSvrMiniAPP/user/v1/getCurrentUser
   * @returns Promise<components['schemas']['system.v1.GetCurrentUserReply']>
   */
  async checkGetCurrentUser(data?: components['schemas']['system.v1.GetCurrentUserRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetCurrentUserReply']> {
    const url = buildUrl(API_ENDPOINTS.Check_GetCurrentUser.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Get Elder By Id
   * @description POST /elderSvrMiniAPP/user/v1/getElderById
   * @returns Promise<components['schemas']['system.v1.GetElderByIdResponse']>
   */
  async userGetElderById(data?: components['schemas']['system.v1.GetElderByIdRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetElderByIdResponse']> {
    const url = buildUrl(API_ENDPOINTS.User_GetElderById.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Get Elder Credits
   * @description POST /elderSvrMiniAPP/user/v1/getElderCredits
   * @returns Promise<components['schemas']['system.v1.GetElderCreditsResponse']>
   */
  async userGetElderCredits(data?: components['schemas']['system.v1.GetElderCreditsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetElderCreditsResponse']> {
    const url = buildUrl(API_ENDPOINTS.User_GetElderCredits.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Common_ Get Wx Phone Number
   * @description POST /elderSvrMiniAPP/user/v1/getWxPhoneNumber
   * @returns Promise<components['schemas']['system.v1.GetWxPhoneNumberReply']>
   */
  async commonGetWxPhoneNumber(data?: components['schemas']['system.v1.GetWxPhoneNumberRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetWxPhoneNumberReply']> {
    const url = buildUrl(API_ENDPOINTS.Common_GetWxPhoneNumber.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Get User Info By Token
   * @description POST /elderSvrMiniAPP/user/v1/get_user_by_token
   * @returns Promise<components['schemas']['system.v1.GetUserInfoByTokenResponse']>
   */
  async userGetUserInfoByToken(data?: components['schemas']['system.v1.GetUserInfoByTokenRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetUserInfoByTokenResponse']> {
    const url = buildUrl(API_ENDPOINTS.User_GetUserInfoByToken.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Help Head Count
   * @description POST /elderSvrMiniAPP/user/v1/helpHeadCount
   * @returns Promise<components['schemas']['system.v1.HelpHeadCountCountReply']>
   */
  async userHelpHeadCount(data?: components['schemas']['system.v1.HelpHeadCountRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.HelpHeadCountCountReply']> {
    const url = buildUrl(API_ENDPOINTS.User_HelpHeadCount.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Help Volunteer List
   * @description POST /elderSvrMiniAPP/user/v1/helpVolunteerList
   * @returns Promise<components['schemas']['system.v1.HelpVolunteerListReply']>
   */
  async userHelpVolunteerList(data?: components['schemas']['system.v1.HelpVolunteerListRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.HelpVolunteerListReply']> {
    const url = buildUrl(API_ENDPOINTS.User_HelpVolunteerList.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ List Elder Credit Records
   * @description POST /elderSvrMiniAPP/user/v1/listElderCreditRecords
   * @returns Promise<components['schemas']['system.v1.ListElderCreditRecordsResponse']>
   */
  async userListElderCreditRecords(data?: components['schemas']['system.v1.ListElderCreditRecordsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.ListElderCreditRecordsResponse']> {
    const url = buildUrl(API_ENDPOINTS.User_ListElderCreditRecords.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Modify Elder
   * @description POST /elderSvrMiniAPP/user/v1/modifyElder
   * @returns Promise<components['schemas']['system.v1.UserOperateReply']>
   */
  async userModifyElder(data?: components['schemas']['system.v1.ModifyElderRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UserOperateReply']> {
    const url = buildUrl(API_ENDPOINTS.User_ModifyElder.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Qr Code Bind Check
   * @description POST /elderSvrMiniAPP/user/v1/qrCodeBindCheck
   * @returns Promise<components['schemas']['system.v1.QrCodeBindCheckReply']>
   */
  async userQrCodeBindCheck(data?: components['schemas']['system.v1.QrCodeBindCheckRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.QrCodeBindCheckReply']> {
    const url = buildUrl(API_ENDPOINTS.User_QrCodeBindCheck.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Real Name
   * @description POST /elderSvrMiniAPP/user/v1/realName
   * @returns Promise<components['schemas']['system.v1.RealNameReply']>
   */
  async userRealName(data?: components['schemas']['system.v1.RealNameRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.RealNameReply']> {
    const url = buildUrl(API_ENDPOINTS.User_RealName.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Cancel Real Name
   * @description POST /elderSvrMiniAPP/user/v1/realName/cancel
   * @returns Promise<components['schemas']['system.v1.CancelRealNameReply']>
   */
  async userCancelRealName(data?: components['schemas']['system.v1.CancelRealNameRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.CancelRealNameReply']> {
    const url = buildUrl(API_ENDPOINTS.User_CancelRealName.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Redirect Login
   * @description POST /elderSvrMiniAPP/user/v1/redirect_login
   * @returns Promise<components['schemas']['system.v1.RedirectLoginResponse']>
   */
  async userRedirectLogin(data?: components['schemas']['system.v1.RedirectLoginRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.RedirectLoginResponse']> {
    const url = buildUrl(API_ENDPOINTS.User_RedirectLogin.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Helper Service_ Get User Center Summary
   * @description POST /elderSvrMiniAPP/user/v1/summary
   * @returns Promise<components['schemas']['api.elder.help.v1.GetUserCenterSummaryResponse']>
   */
  async helperServiceGetUserCenterSummary(data?: components['schemas']['api.elder.help.v1.GetUserCenterSummaryRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.help.v1.GetUserCenterSummaryResponse']> {
    const url = buildUrl(API_ENDPOINTS.HelperService_GetUserCenterSummary.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Trigger Community List
   * @description POST /elderSvrMiniAPP/user/v1/triggerCommunityList
   * @returns Promise<components['schemas']['system.v1.TriggerCommunityListReply']>
   */
  async userTriggerCommunityList(data?: components['schemas']['system.v1.TriggerCommunityListRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.TriggerCommunityListReply']> {
    const url = buildUrl(API_ENDPOINTS.User_TriggerCommunityList.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Unbind Identity
   * @description POST /elderSvrMiniAPP/user/v1/unbindIdentity
   * @returns Promise<components['schemas']['system.v1.UnbindIdentityReply']>
   */
  async userUnbindIdentity(data?: components['schemas']['system.v1.UnbindIdentityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UnbindIdentityReply']> {
    const url = buildUrl(API_ENDPOINTS.User_UnbindIdentity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Update Phone From Weixin
   * @description POST /elderSvrMiniAPP/user/v1/updatePhoneFromWeixin
   * @returns Promise<components['schemas']['system.v1.UpdatePhoneFromWeixinReply']>
   */
  async userUpdatePhoneFromWeixin(data?: components['schemas']['system.v1.UpdatePhoneFromWeixinRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UpdatePhoneFromWeixinReply']> {
    const url = buildUrl(API_ENDPOINTS.User_UpdatePhoneFromWeixin.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Update Privacy Setting
   * @description POST /elderSvrMiniAPP/user/v1/update_private_setting
   * @returns Promise<components['schemas']['system.v1.UpdatePrivacySettingsResponse']>
   */
  async userUpdatePrivacySetting(data?: components['schemas']['system.v1.UpdatePrivacySettingsRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UpdatePrivacySettingsResponse']> {
    const url = buildUrl(API_ENDPOINTS.User_UpdatePrivacySetting.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Validate Personal Qr Code
   * @description POST /elderSvrMiniAPP/user/v1/validatePersonalQrCode
   * @returns Promise<components['schemas']['system.v1.ValidatePersonalQrCodeReply']>
   */
  async userValidatePersonalQrCode(data?: components['schemas']['system.v1.ValidatePersonalQrCodeRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.ValidatePersonalQrCodeReply']> {
    const url = buildUrl(API_ENDPOINTS.User_ValidatePersonalQrCode.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Volunteer Insure
   * @description POST /elderSvrMiniAPP/user/v1/volunteerInsure
   * @returns Promise<components['schemas']['system.v1.VolunteerInsureReply']>
   */
  async userVolunteerInsure(data?: components['schemas']['system.v1.VolunteerInsureRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.VolunteerInsureReply']> {
    const url = buildUrl(API_ENDPOINTS.User_VolunteerInsure.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Page Volunteer Insure
   * @description POST /elderSvrMiniAPP/user/v1/volunteerInsureList
   * @returns Promise<components['schemas']['system.v1.PageVolunteerInsureReply']>
   */
  async userPageVolunteerInsure(data?: components['schemas']['system.v1.PageVolunteerInsureRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.PageVolunteerInsureReply']> {
    const url = buildUrl(API_ENDPOINTS.User_PageVolunteerInsure.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Get Volunteer Insure Visa
   * @description POST /elderSvrMiniAPP/user/v1/volunteerInsureVisa
   * @returns Promise<components['schemas']['system.v1.GetVolunteerInsureVisaReply']>
   */
  async userGetVolunteerInsureVisa(data?: components['schemas']['system.v1.GetVolunteerInsureVisaRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetVolunteerInsureVisaReply']> {
    const url = buildUrl(API_ENDPOINTS.User_GetVolunteerInsureVisa.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Gongyi Service_ Check Can Receive Flower
   * @description POST /elderSvrMiniAPP/v1/gongyi/checkFlower
   * @returns Promise<components['schemas']['api.elder.v1.gongyi.CheckCanReceiveFlowerResponse']>
   */
  async gongyiServiceCheckCanReceiveFlower(data?: components['schemas']['api.elder.v1.gongyi.CheckCanReceiveFlowerRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.gongyi.CheckCanReceiveFlowerResponse']> {
    const url = buildUrl(API_ENDPOINTS.GongyiService_CheckCanReceiveFlower.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Gongyi Service_ Get Flower Count
   * @description POST /elderSvrMiniAPP/v1/gongyi/getFlowerCount
   * @returns Promise<components['schemas']['api.elder.v1.gongyi.GetFlowerCountResponse']>
   */
  async gongyiServiceGetFlowerCount(data?: components['schemas']['api.elder.v1.gongyi.GetFlowerCountRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.gongyi.GetFlowerCountResponse']> {
    const url = buildUrl(API_ENDPOINTS.GongyiService_GetFlowerCount.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Gongyi Service_ Send Flower
   * @description POST /elderSvrMiniAPP/v1/gongyi/sendFlower
   * @returns Promise<components['schemas']['api.elder.v1.gongyi.SendFlowerResponse']>
   */
  async gongyiServiceSendFlower(data?: components['schemas']['api.elder.v1.gongyi.SendFlowerRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.gongyi.SendFlowerResponse']> {
    const url = buildUrl(API_ENDPOINTS.GongyiService_SendFlower.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Gongyi Service_ Silent Login
   * @description POST /elderSvrMiniAPP/v1/gongyi/silentLogin
   * @returns Promise<components['schemas']['api.elder.v1.gongyi.SilentLoginResponse']>
   */
  async gongyiServiceSilentLogin(data?: components['schemas']['api.elder.v1.gongyi.SilentLoginRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.gongyi.SilentLoginResponse']> {
    const url = buildUrl(API_ENDPOINTS.GongyiService_SilentLogin.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Gongyi Service_ Sync Gy Data To Map
   * @description POST /elderSvrMiniAPP/v1/gongyi/syncGyDataToMap
   * @returns Promise<components['schemas']['api.elder.v1.gongyi.SyncGyDataToMapResponse']>
   */
  async gongyiServiceSyncGyDataToMap(data?: components['schemas']['api.elder.v1.gongyi.SyncGyDataToMapRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['api.elder.v1.gongyi.SyncGyDataToMapResponse']> {
    const url = buildUrl(API_ENDPOINTS.GongyiService_SyncGyDataToMap.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * We Com Service_ Create Moment
   * @description POST /elderSvrMiniAPP/wecom/v1/createMoment
   * @returns Promise<components['schemas']['elder.wecom.v1.CreateMomentReply']>
   */
  async weComServiceCreateMoment(data?: components['schemas']['elder.wecom.v1.CreateMomentRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['elder.wecom.v1.CreateMomentReply']> {
    const url = buildUrl(API_ENDPOINTS.WeComService_CreateMoment.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * We Com Service_ Generate Q R Code
   * @description POST /elderSvrMiniAPP/wecom/v1/generateQRCode
   * @returns Promise<components['schemas']['elder.wecom.v1.GenerateQRCodeReply']>
   */
  async weComServiceGenerateQRCode(data?: components['schemas']['elder.wecom.v1.GenerateQRCodeRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['elder.wecom.v1.GenerateQRCodeReply']> {
    const url = buildUrl(API_ENDPOINTS.WeComService_GenerateQRCode.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * We Com Service_ Get Community Tag Mapping
   * @description POST /elderSvrMiniAPP/wecom/v1/getCommunityTagMapping
   * @returns Promise<components['schemas']['elder.wecom.v1.GetCommunityTagMappingReply']>
   */
  async weComServiceGetCommunityTagMapping(data?: components['schemas']['elder.wecom.v1.GetCommunityTagMappingRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['elder.wecom.v1.GetCommunityTagMappingReply']> {
    const url = buildUrl(API_ENDPOINTS.WeComService_GetCommunityTagMapping.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * We Com Service_ Handle Customer Join Callback
   * @description POST /elderSvrMiniAPP/wecom/v1/handleCustomerJoinCallback
   * @returns Promise<components['schemas']['elder.wecom.v1.HandleCustomerJoinCallbackReply']>
   */
  async weComServiceHandleCustomerJoinCallback(data?: components['schemas']['elder.wecom.v1.HandleCustomerJoinCallbackRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['elder.wecom.v1.HandleCustomerJoinCallbackReply']> {
    const url = buildUrl(API_ENDPOINTS.WeComService_HandleCustomerJoinCallback.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Common_ Get Web Cos Temp Key
   * @description POST /elderSvrWebAPI/common/v1/getWebCosTempKey
   * @returns Promise<components['schemas']['system.v1.GetWebCosTempKeyReply']>
   */
  async commonGetWebCosTempKey(data?: components['schemas']['system.v1.GetWebCosTempKeyRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.GetWebCosTempKeyReply']> {
    const url = buildUrl(API_ENDPOINTS.Common_GetWebCosTempKey.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Hospital_ Import Medical Info
   * @description POST /elderSvrWebAPI/hospital/v1/importMedicalInfo
   * @returns Promise<components['schemas']['seek_medical.v1.ImportMedicalInfoReply']>
   */
  async hospitalImportMedicalInfo(data?: components['schemas']['seek_medical.v1.ImportMedicalInfoRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['seek_medical.v1.ImportMedicalInfoReply']> {
    const url = buildUrl(API_ENDPOINTS.Hospital_ImportMedicalInfo.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Im_ Find Im Identity
   * @description POST /elderSvrWebAPI/im/v1/findImIdentity
   * @returns Promise<components['schemas']['business.v1.FindImIdentityReply']>
   */
  async imFindImIdentity(data?: components['schemas']['business.v1.FindImIdentityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.FindImIdentityReply']> {
    const url = buildUrl(API_ENDPOINTS.Im_FindImIdentity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Im_ Im Data Move
   * @description POST /elderSvrWebAPI/im/v1/imDataMove
   * @returns Promise<any>
   */
  async imImDataMove(data?: components['schemas']['business.v1.ImDataMoveRequest'], params?: any, config?: ApiRequestConfig): Promise<any> {
    const url = buildUrl(API_ENDPOINTS.Im_ImDataMove.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Im_ Save Im Identity
   * @description POST /elderSvrWebAPI/im/v1/saveImIdentity
   * @returns Promise<components['schemas']['business.v1.ImOperateReply']>
   */
  async imSaveImIdentity(data?: components['schemas']['business.v1.SaveImIdentityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.ImOperateReply']> {
    const url = buildUrl(API_ENDPOINTS.Im_SaveImIdentity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * Service_ Init Evaluate History Data
   * @description POST /elderSvrWebAPI/service/v1/evaluate/initHistoryData
   * @returns Promise<components['schemas']['business.v1.InitEvaluateHistoryDataReply']>
   */
  async serviceInitEvaluateHistoryData(data?: components['schemas']['business.v1.InitEvaluateHistoryDataRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['business.v1.InitEvaluateHistoryDataReply']> {
    const url = buildUrl(API_ENDPOINTS.Service_InitEvaluateHistoryData.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Create Elder Ignore
   * @description POST /elderSvrWebAPI/user/v1/createElderIgnore
   * @returns Promise<components['schemas']['system.v1.CreateElderIgnoreReply']>
   */
  async userCreateElderIgnore(data?: components['schemas']['system.v1.CreateElderIgnoreRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.CreateElderIgnoreReply']> {
    const url = buildUrl(API_ENDPOINTS.User_CreateElderIgnore.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Create Qr Code
   * @description POST /elderSvrWebAPI/user/v1/createQrCode
   * @returns Promise<components['schemas']['system.v1.UserOperateReply']>
   */
  async userCreateQrCode(data?: components['schemas']['system.v1.CreateQrCodeRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UserOperateReply']> {
    const url = buildUrl(API_ENDPOINTS.User_CreateQrCode.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Handle Elder Community
   * @description POST /elderSvrWebAPI/user/v1/handleElderCommunity
   * @returns Promise<components['schemas']['system.v1.UserOperateReply']>
   */
  async userHandleElderCommunity(data?: components['schemas']['system.v1.HandleElderCommunityRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UserOperateReply']> {
    const url = buildUrl(API_ENDPOINTS.User_HandleElderCommunity.path, params);
    return apiClient.post(url, data, { ...config });
  },

  /**
   * User_ Refresh All Elder Poi Title
   * @description POST /elderSvrWebAPI/user/v1/refreshPoiTitle
   * @returns Promise<components['schemas']['system.v1.UserOperateReply']>
   */
  async userRefreshAllElderPoiTitle(data?: components['schemas']['system.v1.RefreshAllElderPoiTitleRequest'], params?: any, config?: ApiRequestConfig): Promise<components['schemas']['system.v1.UserOperateReply']> {
    const url = buildUrl(API_ENDPOINTS.User_RefreshAllElderPoiTitle.path, params);
    return apiClient.post(url, data, { ...config });
  },

};

// 导出服务类型
export type userApiApiType = typeof userApiApi;

// 导出axios实例供高级使用
export { apiClient };

// 导出常用类型
export type { components } from './api-generated';

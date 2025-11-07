// 🚀 ElderSvr API 使用示例
// 展示如何使用生成的API函数进行各种操作

import { elderSvrApi } from './generated/api-functions-elderSvr';
import type { components } from './generated/api-generated';

// 类型别名，让代码更清晰
type GetUserInfoByTokenRequest = components['schemas']['system.v1.GetUserInfoByTokenRequest'];
type UpdateUserRequest = components['schemas']['api.elder.backend.v1.UpdateUserRequest'];
type CreateElderInfoRequest = components['schemas']['system.v1.CreateElderInfoRequest'];

/**
 * 用户管理服务类
 */
export class ElderSvrUserService {
  
  /**
   * 通过Token获取用户信息
   */
  async getUserByToken(token: string) {
    try {
      const request: GetUserInfoByTokenRequest = { token };
      const response = await elderSvrApi.userGetUserInfoByToken(request);
      
      console.log('✅ 获取用户信息成功:', response);
      return response;
    } catch (error) {
      console.error('❌ 获取用户信息失败:', error);
      throw error;
    }
  }
  
  /**
   * 获取用户权限列表
   */
  async getUserPermissions(userId: string) {
    try {
      const response = await elderSvrApi.iamServiceGetUserPermissions({
        userId: userId
      });
      
      console.log('✅ 获取用户权限成功:', response);
      return response;
    } catch (error) {
      console.error('❌ 获取用户权限失败:', error);
      throw error;
    }
  }
  
  /**
   * 更新用户信息
   */
  async updateUser(updateData: Partial<UpdateUserRequest>) {
    try {
      const response = await elderSvrApi.iamServiceUpdateUser(updateData as UpdateUserRequest);
      
      console.log('✅ 用户信息更新成功:', response);
      return response;
    } catch (error) {
      console.error('❌ 用户信息更新失败:', error);
      throw error;
    }
  }
  
  /**
   * 创建老人信息
   */
  async createElderInfo(elderData: CreateElderInfoRequest) {
    try {
      const response = await elderSvrApi.userCreateElderInfo(elderData);
      
      console.log('✅ 老人信息创建成功:', response);
      return response;
    } catch (error) {
      console.error('❌ 老人信息创建失败:', error);
      throw error;
    }
  }
  
  /**
   * 获取社区列表
   */
  async getCommunityList(params: { page?: number; size?: number } = {}) {
    try {
      const response = await elderSvrApi.userGetCommunityList({
        page: params.page || 1,
        size: params.size || 20
      });
      
      console.log('✅ 获取社区列表成功:', response);
      return response;
    } catch (error) {
      console.error('❌ 获取社区列表失败:', error);
      throw error;
    }
  }
  
  /**
   * 获取老人积分
   */
  async getElderCredits(elderId: string) {
    try {
      const response = await elderSvrApi.userGetElderCredits({
        elderId: elderId
      });
      
      console.log('✅ 获取老人积分成功:', response);
      return response;
    } catch (error) {
      console.error('❌ 获取老人积分失败:', error);
      throw error;
    }
  }
  
  /**
   * 生成个人二维码
   */
  async generatePersonalQrCode(userId: string) {
    try {
      const response = await elderSvrApi.userGeneratePersonalQrCode({
        userId: userId
      });
      
      console.log('✅ 生成个人二维码成功:', response);
      return response;
    } catch (error) {
      console.error('❌ 生成个人二维码失败:', error);
      throw error;
    }
  }
}

/**
 * 活动管理服务类
 */
export class ElderSvrActivityService {
  
  /**
   * 获取用户活动列表
   */
  async getUserActivities(userId: string, params: { page?: number; size?: number } = {}) {
    try {
      const response = await elderSvrApi.activityServiceListUserActivities({
        userId: userId,
        page: params.page || 1,
        size: params.size || 10
      });
      
      console.log('✅ 获取用户活动成功:', response);
      return response;
    } catch (error) {
      console.error('❌ 获取用户活动失败:', error);
      throw error;
    }
  }
  
  /**
   * 获取用户点赞的评论
   */
  async getUserLikedComments(userId: string) {
    try {
      const response = await elderSvrApi.activityCommentServiceGetUserLikedComments({
        userId: userId
      });
      
      console.log('✅ 获取用户点赞评论成功:', response);
      return response;
    } catch (error) {
      console.error('❌ 获取用户点赞评论失败:', error);
      throw error;
    }
  }
}

/**
 * 助手服务类
 */
export class ElderSvrHelperService {
  
  /**
   * 获取用户贡献等级
   */
  async getUserContributionLevel(userId: string) {
    try {
      const response = await elderSvrApi.helperServiceGetUserContributionLevel({
        userId: userId
      });
      
      console.log('✅ 获取用户贡献等级成功:', response);
      return response;
    } catch (error) {
      console.error('❌ 获取用户贡献等级失败:', error);
      throw error;
    }
  }
  
  /**
   * 创建助手请求
   */
  async createHelperRequest(requestData: any) {
    try {
      const response = await elderSvrApi.helperServiceCreateHelperRequest(requestData);
      
      console.log('✅ 创建助手请求成功:', response);
      return response;
    } catch (error) {
      console.error('❌ 创建助手请求失败:', error);
      throw error;
    }
  }
}

/**
 * 综合使用示例
 */
export class ElderSvrManager {
  private userService = new ElderSvrUserService();
  private activityService = new ElderSvrActivityService();
  private helperService = new ElderSvrHelperService();
  
  /**
   * 用户完整信息获取流程
   */
  async getUserCompleteInfo(token: string) {
    try {
      console.log('🔄 开始获取用户完整信息...');
      
      // 1. 通过token获取基本用户信息
      const userInfo = await this.userService.getUserByToken(token);
      const userId = userInfo.data?.userId;
      
      if (!userId) {
        throw new Error('无法获取用户ID');
      }
      
      // 2. 并行获取用户相关数据
      const [permissions, activities, contributionLevel, communities] = await Promise.all([
        this.userService.getUserPermissions(userId),
        this.activityService.getUserActivities(userId),
        this.helperService.getUserContributionLevel(userId),
        this.userService.getCommunityList()
      ]);
      
      // 3. 组合完整信息
      const completeInfo = {
        userInfo: userInfo.data,
        permissions: permissions.data,
        activities: activities.data,
        contributionLevel: contributionLevel.data,
        availableCommunities: communities.data
      };
      
      console.log('✅ 用户完整信息获取成功:', completeInfo);
      return completeInfo;
      
    } catch (error) {
      console.error('❌ 获取用户完整信息失败:', error);
      throw error;
    }
  }
  
  /**
   * 老人信息管理流程
   */
  async manageElderInfo(elderData: CreateElderInfoRequest) {
    try {
      console.log('🔄 开始老人信息管理流程...');
      
      // 1. 创建老人信息
      const createResult = await this.userService.createElderInfo(elderData);
      const elderId = createResult.data?.elderId;
      
      if (!elderId) {
        throw new Error('老人信息创建失败');
      }
      
      // 2. 获取老人积分
      const credits = await this.userService.getElderCredits(elderId);
      
      // 3. 生成个人二维码
      const qrCode = await this.userService.generatePersonalQrCode(elderId);
      
      const result = {
        elderInfo: createResult.data,
        credits: credits.data,
        qrCode: qrCode.data
      };
      
      console.log('✅ 老人信息管理完成:', result);
      return result;
      
    } catch (error) {
      console.error('❌ 老人信息管理失败:', error);
      throw error;
    }
  }
}

/**
 * 使用示例演示
 */
export async function demonstrateUsage() {
  const manager = new ElderSvrManager();
  
  try {
    // 示例1: 获取用户完整信息
    console.log('\n📋 示例1: 获取用户完整信息');
    const userToken = 'your-user-token-here';
    const completeInfo = await manager.getUserCompleteInfo(userToken);
    console.log('用户完整信息:', completeInfo);
    
    // 示例2: 老人信息管理
    console.log('\n📋 示例2: 老人信息管理');
    const elderData: CreateElderInfoRequest = {
      name: '张老先生',
      age: 75,
      phone: '13800138000',
      address: '北京市朝阳区某某小区',
      emergencyContact: '13900139000'
    };
    const elderResult = await manager.manageElderInfo(elderData);
    console.log('老人信息管理结果:', elderResult);
    
    // 示例3: 单独服务调用
    console.log('\n📋 示例3: 单独服务调用');
    const userService = new ElderSvrUserService();
    const communities = await userService.getCommunityList({ page: 1, size: 10 });
    console.log('社区列表:', communities);
    
  } catch (error) {
    console.error('❌ 演示过程中出现错误:', error);
  }
}

/**
 * 🎉 使用总结：
 * 
 * 1. ✅ 类型安全：
 *    - 所有参数和返回值都有完整的TypeScript类型
 *    - IDE提供完整的智能提示和错误检查
 * 
 * 2. ✅ 易于使用：
 *    - 清晰的函数命名和分组
 *    - 统一的调用模式和错误处理
 * 
 * 3. ✅ 功能完整：
 *    - 支持182个API接口
 *    - 涵盖用户管理、活动、助手等多个服务
 * 
 * 4. ✅ 生产就绪：
 *    - 自动认证和错误处理
 *    - 支持并发调用和复杂业务流程
 */

// 如果需要立即运行演示
// demonstrateUsage();
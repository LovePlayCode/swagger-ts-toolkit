// 🚀 使用示例：优化后的API函数调用
// 展示了类型安全的API调用和返回值处理

import { userApiApi } from './generated/api-functions-userApi';
import type { components } from './generated/api-generated';

// 类型别名，让代码更清晰
type User = components['schemas']['User'];
type CreateUserRequest = components['schemas']['CreateUserRequest'];
type LoginRequest = components['schemas']['LoginRequest'];

/**
 * 用户管理示例
 */
export class UserService {
  
  /**
   * 获取用户列表 - 返回类型为 UserListResponse
   * 包含 { success: boolean, data: User[], pagination?: Pagination }
   */
  async getUsers(page: number = 1, limit: number = 20) {
    try {
      const response = await userApiApi.getUserList({ page, limit });
      
      // TypeScript 自动推断类型
      console.log('获取到用户数量:', response.data.length);
      console.log('分页信息:', response.pagination);
      
      // 类型安全的数据访问
      response.data.forEach((user: User) => {
        console.log(`用户: ${user.username} (${user.email})`);
      });
      
      return response;
    } catch (error) {
      console.error('获取用户列表失败:', error);
      throw error;
    }
  }
  
  /**
   * 根据ID获取用户 - 返回类型为 UserResponse
   * 包含 { success: boolean, data: User }
   */
  async getUserById(userId: number) {
    try {
      const response = await userApiApi.getUserById({ userId });
      
      // TypeScript 知道 response.data 是 User 类型
      const user = response.data;
      console.log(`用户详情: ${user.username} (${user.email})`);
      console.log(`状态: ${user.status}, 角色: ${user.role}`);
      
      return response;
    } catch (error) {
      console.error('获取用户详情失败:', error);
      throw error;
    }
  }
  
  /**
   * 创建新用户 - 返回类型为 UserResponse
   */
  async createUser(userData: CreateUserRequest) {
    try {
      const response = await userApiApi.createUser(userData);
      
      // 自动类型推断
      console.log('创建成功，用户ID:', response.data.id);
      console.log('创建时间:', response.data.createdAt);
      
      return response;
    } catch (error) {
      console.error('创建用户失败:', error);
      throw error;
    }
  }
  
  /**
   * 用户登录 - 返回类型为 LoginResponse
   * 包含 { success: boolean, data: LoginResponse }
   */
  async login(credentials: LoginRequest) {
    try {
      const response = await userApiApi.login(credentials);
      
      // TypeScript 知道这是 LoginResponse 结构
      const { token, user, expiresIn } = response.data;
      
      // 保存token
      localStorage.setItem('token', token);
      console.log(`登录成功，欢迎 ${user.username}!`);
      console.log(`Token有效期: ${expiresIn}秒`);
      
      return response;
    } catch (error) {
      console.error('登录失败:', error);
      throw error;
    }
  }
  
  /**
   * 删除用户 - 返回类型为 StandardResponse
   */
  async deleteUser(userId: number) {
    try {
      const response = await userApiApi.deleteUser({ userId });
      
      // 标准响应格式
      console.log('删除结果:', response);
      
      return response;
    } catch (error) {
      console.error('删除用户失败:', error);
      throw error;
    }
  }
}

/**
 * 使用示例
 */
async function example() {
  const userService = new UserService();
  
  try {
    // 1. 获取用户列表 - 类型安全
    const userList = await userService.getUsers(1, 10);
    console.log('用户列表:', userList.data);
    
    // 2. 获取特定用户 - 自动类型推断
    const userDetail = await userService.getUserById(1001);
    console.log('用户详情:', userDetail.data);
    
    // 3. 创建新用户 - 请求参数类型检查
    const newUser = await userService.createUser({
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'password123',
      nickname: '新用户'
    });
    console.log('新用户:', newUser.data);
    
    // 4. 用户登录 - 响应类型明确
    const loginResult = await userService.login({
      account: 'newuser',
      password: 'password123',
      rememberMe: true
    });
    console.log('登录成功:', loginResult.data.user);
    
  } catch (error) {
    console.error('操作失败:', error);
  }
}

// 导出服务类和示例函数
export { example };

/**
 * 🎉 优化总结：
 * 
 * 1. ✅ 返回值类型优化：
 *    - UserListResponse: 用户列表响应
 *    - UserResponse: 单个用户响应  
 *    - LoginResponse: 登录响应
 *    - StandardResponse: 标准响应
 * 
 * 2. ✅ 类型安全：
 *    - 自动推断返回数据类型
 *    - 编译时参数类型检查
 *    - IDE智能提示和自动补全
 * 
 * 3. ✅ 代码简洁：
 *    - 使用类型别名简化长类型名
 *    - 清晰的响应结构定义
 *    - 统一的错误处理方式
 * 
 * 4. ✅ 开发体验：
 *    - 完整的JSDoc注释
 *    - 详细的参数说明
 *    - 实用的使用示例
 */
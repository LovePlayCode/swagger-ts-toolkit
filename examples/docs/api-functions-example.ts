// 🚀 API函数使用示例
// 本示例展示如何使用自动生成的API调用函数

import { userApi } from './generated/api-functions-userApi';
import { productApi } from './generated/api-functions-productApi';
import type { components } from './generated/api-types';

// 类型别名
type User = components['schemas']['User'];
type Product = components['schemas']['Product'];
type CreateUserRequest = components['schemas']['CreateUserRequest'];
type UpdateUserRequest = components['schemas']['UpdateUserRequest'];

/**
 * 用户管理示例
 */
export class UserService {
  /**
   * 获取用户列表
   */
  async getUserList(page: number = 1, pageSize: number = 20): Promise<User[]> {
    try {
      // 使用生成的API函数，自动处理类型安全
      const users = await userApi.getUserList({
        queryParams: { page, pageSize }
      });
      
      console.log('获取用户列表成功:', users);
      return users;
    } catch (error) {
      console.error('获取用户列表失败:', error);
      throw error;
    }
  }

  /**
   * 根据ID获取用户详情
   */
  async getUserById(userId: number): Promise<User> {
    try {
      // 路径参数会自动替换到URL中
      const user = await userApi.getUserById({
        pathParams: { id: userId }
      });
      
      console.log('获取用户详情成功:', user);
      return user;
    } catch (error) {
      console.error('获取用户详情失败:', error);
      throw error;
    }
  }

  /**
   * 创建新用户
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      const newUser = await userApi.createUser({
        data: userData
      });
      
      console.log('创建用户成功:', newUser);
      return newUser;
    } catch (error) {
      console.error('创建用户失败:', error);
      throw error;
    }
  }

  /**
   * 更新用户信息
   */
  async updateUser(userId: number, userData: UpdateUserRequest): Promise<User> {
    try {
      const updatedUser = await userApi.updateUser({
        pathParams: { id: userId },
        data: userData
      });
      
      console.log('更新用户成功:', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('更新用户失败:', error);
      throw error;
    }
  }

  /**
   * 删除用户
   */
  async deleteUser(userId: number): Promise<void> {
    try {
      await userApi.deleteUser({
        pathParams: { id: userId }
      });
      
      console.log('删除用户成功');
    } catch (error) {
      console.error('删除用户失败:', error);
      throw error;
    }
  }

  /**
   * 搜索用户
   */
  async searchUsers(keyword: string, filters?: {
    status?: string;
    role?: string;
    createdAfter?: string;
  }): Promise<User[]> {
    try {
      const users = await userApi.searchUsers({
        queryParams: {
          keyword,
          ...filters
        }
      });
      
      console.log('搜索用户成功:', users);
      return users;
    } catch (error) {
      console.error('搜索用户失败:', error);
      throw error;
    }
  }
}

/**
 * 商品管理示例
 */
export class ProductService {
  /**
   * 获取商品列表
   */
  async getProductList(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
  }): Promise<Product[]> {
    try {
      const products = await productApi.getProductList({
        queryParams: filters
      });
      
      console.log('获取商品列表成功:', products);
      return products;
    } catch (error) {
      console.error('获取商品列表失败:', error);
      throw error;
    }
  }

  /**
   * 获取商品详情
   */
  async getProductById(productId: string): Promise<Product> {
    try {
      const product = await productApi.getProductById({
        pathParams: { productId }
      });
      
      console.log('获取商品详情成功:', product);
      return product;
    } catch (error) {
      console.error('获取商品详情失败:', error);
      throw error;
    }
  }

  /**
   * 更新库存
   */
  async updateStock(productId: string, quantity: number): Promise<Product> {
    try {
      const updatedProduct = await productApi.updateStock({
        pathParams: { productId },
        data: { quantity }
      });
      
      console.log('更新库存成功:', updatedProduct);
      return updatedProduct;
    } catch (error) {
      console.error('更新库存失败:', error);
      throw error;
    }
  }
}

/**
 * React Hook 示例
 */
export function useUserOperations() {
  const userService = new UserService();

  const handleGetUsers = async () => {
    try {
      const users = await userService.getUserList(1, 10);
      return users;
    } catch (error) {
      console.error('操作失败:', error);
      throw error;
    }
  };

  const handleCreateUser = async (userData: CreateUserRequest) => {
    try {
      const newUser = await userService.createUser(userData);
      return newUser;
    } catch (error) {
      console.error('创建用户失败:', error);
      throw error;
    }
  };

  return {
    getUsers: handleGetUsers,
    createUser: handleCreateUser,
  };
}

/**
 * Vue Composition API 示例
 */
export function useProductOperations() {
  const productService = new ProductService();

  const getProducts = async (filters?: any) => {
    try {
      const products = await productService.getProductList(filters);
      return products;
    } catch (error) {
      console.error('获取商品失败:', error);
      throw error;
    }
  };

  const getProductDetail = async (productId: string) => {
    try {
      const product = await productService.getProductById(productId);
      return product;
    } catch (error) {
      console.error('获取商品详情失败:', error);
      throw error;
    }
  };

  return {
    getProducts,
    getProductDetail,
  };
}

/**
 * 批量操作示例
 */
export class BatchOperations {
  private userService = new UserService();
  private productService = new ProductService();

  /**
   * 并发获取用户和商品数据
   */
  async loadDashboardData(): Promise<{
    users: User[];
    products: Product[];
  }> {
    try {
      // 并发执行多个API请求
      const [users, products] = await Promise.all([
        this.userService.getUserList(1, 5),
        this.productService.getProductList({ inStock: true })
      ]);

      return { users, products };
    } catch (error) {
      console.error('加载仪表盘数据失败:', error);
      throw error;
    }
  }

  /**
   * 批量创建用户
   */
  async batchCreateUsers(userDataList: CreateUserRequest[]): Promise<User[]> {
    try {
      // 并发创建多个用户
      const createPromises = userDataList.map(userData => 
        this.userService.createUser(userData)
      );

      const newUsers = await Promise.all(createPromises);
      console.log('批量创建用户成功:', newUsers);
      return newUsers;
    } catch (error) {
      console.error('批量创建用户失败:', error);
      throw error;
    }
  }
}

/**
 * 错误处理示例
 */
export class ErrorHandlingExample {
  private userService = new UserService();

  async handleUserOperation(userId: number) {
    try {
      // 尝试获取用户
      const user = await this.userService.getUserById(userId);
      return user;
    } catch (error: any) {
      // 根据不同错误类型进行处理
      if (error.message.includes('401')) {
        console.log('用户未登录，跳转到登录页');
        // 跳转到登录页
      } else if (error.message.includes('403')) {
        console.log('没有权限访问该用户');
        // 显示权限错误提示
      } else if (error.message.includes('404')) {
        console.log('用户不存在');
        // 显示用户不存在提示
      } else {
        console.log('未知错误:', error.message);
        // 显示通用错误提示
      }
      throw error;
    }
  }
}

// 导出实例
export const userService = new UserService();
export const productService = new ProductService();
export const batchOperations = new BatchOperations();
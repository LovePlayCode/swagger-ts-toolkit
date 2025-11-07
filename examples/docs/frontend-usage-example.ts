// 前端使用生成的 API 接口示例
// 展示如何在实际项目中使用从 docs 文件夹生成的 API

// 1. 导入生成的类型定义和 API 函数
import type { components } from './generated/api-types';
import { API_ENDPOINTS } from './generated/endpoints';
import { userApiApi } from './generated/userApi';
import { productApiApi } from './generated/productApi';

// 2. 定义类型别名，提高代码可读性
type User = components['schemas']['User'];
type Product = components['schemas']['Product'];
type CreateUserRequest = components['schemas']['CreateUserRequest'];
type CreateProductRequest = components['schemas']['CreateProductRequest'];
type LoginRequest = components['schemas']['LoginRequest'];
type LoginResponse = components['schemas']['LoginResponse'];

// 3. HTTP 客户端配置（需要你自己实现）
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {})
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const searchParams = params ? new URLSearchParams(params).toString() : '';
    const fullUrl = searchParams ? `${url}?${searchParams}` : url;
    return this.request<T>(fullUrl);
  }

  async post<T>(url: string, data?: any): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async put<T>(url: string, data?: any): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async delete<T>(url: string): Promise<T> {
    return this.request<T>(url, { method: 'DELETE' });
  }
}

// 4. 创建 API 客户端实例
const userApiClient = new ApiClient('http://localhost:3000/api/v1');
const productApiClient = new ApiClient('http://localhost:3001/api/v2');

// 5. 用户服务封装
class UserService {
  /**
   * 用户登录
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('🔐 用户登录...');
      const response = await userApiClient.post<{ success: boolean; data: LoginResponse }>(
        API_ENDPOINTS.login.path,
        credentials
      );
      
      if (response.success) {
        // 保存令牌
        userApiClient.setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        console.log('✅ 登录成功');
        return response.data;
      }
      
      throw new Error('登录失败');
    } catch (error) {
      console.error('❌ 登录失败:', error);
      throw error;
    }
  }

  /**
   * 获取用户列表
   */
  static async getUserList(params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: 'active' | 'inactive' | 'pending';
  } = {}): Promise<{ users: User[]; pagination: any }> {
    try {
      console.log('👥 获取用户列表...');
      const response = await userApiClient.get<{
        success: boolean;
        data: User[];
        pagination: any;
      }>(API_ENDPOINTS.getUserList.path, params);

      if (response.success) {
        console.log(`✅ 获取到 ${response.data.length} 个用户`);
        return {
          users: response.data,
          pagination: response.pagination
        };
      }
      
      throw new Error('获取用户列表失败');
    } catch (error) {
      console.error('❌ 获取用户列表失败:', error);
      throw error;
    }
  }

  /**
   * 根据ID获取用户
   */
  static async getUserById(userId: number): Promise<User> {
    try {
      console.log(`👤 获取用户 ${userId}...`);
      const url = API_ENDPOINTS.getUserById.path.replace('{userId}', userId.toString());
      const response = await userApiClient.get<{ success: boolean; data: User }>(url);

      if (response.success) {
        console.log(`✅ 获取用户 ${response.data.username} 成功`);
        return response.data;
      }
      
      throw new Error('用户不存在');
    } catch (error) {
      console.error(`❌ 获取用户 ${userId} 失败:`, error);
      throw error;
    }
  }

  /**
   * 创建新用户
   */
  static async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      console.log('👤+ 创建新用户...');
      const response = await userApiClient.post<{ success: boolean; data: User }>(
        API_ENDPOINTS.createUser.path,
        userData
      );

      if (response.success) {
        console.log(`✅ 用户 ${response.data.username} 创建成功`);
        return response.data;
      }
      
      throw new Error('创建用户失败');
    } catch (error) {
      console.error('❌ 创建用户失败:', error);
      throw error;
    }
  }

  /**
   * 更新用户信息
   */
  static async updateUser(userId: number, userData: Partial<CreateUserRequest>): Promise<User> {
    try {
      console.log(`👤✏️ 更新用户 ${userId}...`);
      const url = API_ENDPOINTS.updateUser.path.replace('{userId}', userId.toString());
      const response = await userApiClient.put<{ success: boolean; data: User }>(url, userData);

      if (response.success) {
        console.log(`✅ 用户 ${response.data.username} 更新成功`);
        return response.data;
      }
      
      throw new Error('更新用户失败');
    } catch (error) {
      console.error(`❌ 更新用户 ${userId} 失败:`, error);
      throw error;
    }
  }

  /**
   * 删除用户
   */
  static async deleteUser(userId: number): Promise<void> {
    try {
      console.log(`👤🗑️ 删除用户 ${userId}...`);
      const url = API_ENDPOINTS.deleteUser.path.replace('{userId}', userId.toString());
      await userApiClient.delete<{ success: boolean; message: string }>(url);
      console.log(`✅ 用户 ${userId} 删除成功`);
    } catch (error) {
      console.error(`❌ 删除用户 ${userId} 失败:`, error);
      throw error;
    }
  }
}

// 6. 商品服务封装
class ProductService {
  /**
   * 获取商品列表
   */
  static async getProductList(params: {
    page?: number;
    pageSize?: number;
    categoryId?: number;
    keyword?: string;
    status?: 'active' | 'inactive' | 'draft' | 'deleted';
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'id' | 'name' | 'price' | 'sales' | 'createdAt' | 'updatedAt';
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<{ products: Product[]; pagination: any }> {
    try {
      console.log('🛍️ 获取商品列表...');
      const response = await productApiClient.get<{
        success: boolean;
        data: Product[];
        pagination: any;
      }>(API_ENDPOINTS.getProductList.path, params);

      if (response.success) {
        console.log(`✅ 获取到 ${response.data.length} 个商品`);
        return {
          products: response.data,
          pagination: response.pagination
        };
      }
      
      throw new Error('获取商品列表失败');
    } catch (error) {
      console.error('❌ 获取商品列表失败:', error);
      throw error;
    }
  }

  /**
   * 根据ID获取商品详情
   */
  static async getProductById(productId: number): Promise<Product> {
    try {
      console.log(`📦 获取商品 ${productId}...`);
      const url = API_ENDPOINTS.getProductById.path.replace('{productId}', productId.toString());
      const response = await productApiClient.get<{ success: boolean; data: Product }>(url);

      if (response.success) {
        console.log(`✅ 获取商品 ${response.data.name} 成功`);
        return response.data;
      }
      
      throw new Error('商品不存在');
    } catch (error) {
      console.error(`❌ 获取商品 ${productId} 失败:`, error);
      throw error;
    }
  }

  /**
   * 创建新商品
   */
  static async createProduct(productData: CreateProductRequest): Promise<Product> {
    try {
      console.log('📦+ 创建新商品...');
      const response = await productApiClient.post<{ success: boolean; data: Product }>(
        API_ENDPOINTS.createProduct.path,
        productData
      );

      if (response.success) {
        console.log(`✅ 商品 ${response.data.name} 创建成功`);
        return response.data;
      }
      
      throw new Error('创建商品失败');
    } catch (error) {
      console.error('❌ 创建商品失败:', error);
      throw error;
    }
  }

  /**
   * 获取商品分类列表
   */
  static async getCategoryList(params: {
    parentId?: number;
    level?: number;
  } = {}): Promise<any[]> {
    try {
      console.log('📂 获取商品分类...');
      const response = await productApiClient.get<{
        success: boolean;
        data: any[];
      }>(API_ENDPOINTS.getCategoryList.path, params);

      if (response.success) {
        console.log(`✅ 获取到 ${response.data.length} 个分类`);
        return response.data;
      }
      
      throw new Error('获取分类失败');
    } catch (error) {
      console.error('❌ 获取分类失败:', error);
      throw error;
    }
  }

  /**
   * 获取商品库存
   */
  static async getProductInventory(productId: number): Promise<any> {
    try {
      console.log(`📊 获取商品 ${productId} 库存...`);
      const url = API_ENDPOINTS.getProductInventory.path.replace('{productId}', productId.toString());
      const response = await productApiClient.get<{ success: boolean; data: any }>(url);

      if (response.success) {
        console.log(`✅ 获取库存成功，可用库存: ${response.data.available}`);
        return response.data;
      }
      
      throw new Error('获取库存失败');
    } catch (error) {
      console.error(`❌ 获取库存失败:`, error);
      throw error;
    }
  }
}

// 7. 使用示例
export async function exampleUsage() {
  try {
    console.log('🚀 API 使用示例开始...\n');

    // 用户相关操作
    console.log('=== 用户管理示例 ===');
    
    // 登录
    const loginResult = await UserService.login({
      account: 'admin',
      password: 'password123',
      rememberMe: true
    });
    console.log('登录结果:', loginResult.user.username);

    // 获取用户列表
    const userList = await UserService.getUserList({
      page: 1,
      limit: 10,
      status: 'active'
    });
    console.log(`用户列表: ${userList.users.length} 个用户`);

    // 获取特定用户
    if (userList.users.length > 0) {
      const firstUser = await UserService.getUserById(userList.users[0].id);
      console.log(`用户详情: ${firstUser.username} (${firstUser.email})`);
    }

    console.log('\n=== 商品管理示例 ===');
    
    // 获取商品列表
    const productList = await ProductService.getProductList({
      page: 1,
      pageSize: 10,
      status: 'active',
      sortBy: 'sales',
      sortOrder: 'desc'
    });
    console.log(`商品列表: ${productList.products.length} 个商品`);

    // 获取商品分类
    const categories = await ProductService.getCategoryList();
    console.log(`商品分类: ${categories.length} 个分类`);

    // 获取特定商品详情
    if (productList.products.length > 0) {
      const firstProduct = await ProductService.getProductById(productList.products[0].id);
      console.log(`商品详情: ${firstProduct.name} - ¥${firstProduct.price}`);

      // 获取商品库存
      const inventory = await ProductService.getProductInventory(firstProduct.id);
      console.log(`商品库存: ${inventory.available} 件可用`);
    }

    console.log('\n🎉 API 调用示例完成！');

  } catch (error) {
    console.error('❌ 示例执行失败:', error);
  }
}

// 8. React 组件使用示例
export function ReactComponentExample() {
  // 这是一个 React 组件示例，展示如何在组件中使用生成的 API
  
  /*
  import React, { useState, useEffect } from 'react';
  import { UserService, ProductService } from './frontend-usage-example';
  import type { User, Product } from './frontend-usage-example';

  export const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadData = async () => {
        try {
          setLoading(true);
          
          // 并行获取用户和商品数据
          const [userResult, productResult] = await Promise.all([
            UserService.getUserList({ page: 1, limit: 5 }),
            ProductService.getProductList({ page: 1, pageSize: 5, status: 'active' })
          ]);
          
          setUsers(userResult.users);
          setProducts(productResult.products);
        } catch (error) {
          console.error('加载数据失败:', error);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }, []);

    if (loading) {
      return <div>加载中...</div>;
    }

    return (
      <div>
        <h1>管理面板</h1>
        
        <section>
          <h2>最新用户</h2>
          {users.map(user => (
            <div key={user.id}>
              <h3>{user.username}</h3>
              <p>{user.email}</p>
              <p>状态: {user.status}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>热门商品</h2>
          {products.map(product => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>价格: ¥{product.price}</p>
              <p>销量: {product.sales}</p>
              <p>库存: {product.stock}</p>
            </div>
          ))}
        </section>
      </div>
    );
  };
  */
}

// 9. 导出服务类供其他模块使用
export { UserService, ProductService };
export type { User, Product, CreateUserRequest, CreateProductRequest, LoginRequest, LoginResponse };
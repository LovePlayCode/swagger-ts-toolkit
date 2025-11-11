// 🤖 自动生成的 API 类型定义
// ⚠️  请勿手动修改此文件

export interface components {
  schemas: {
    // 用户相关类型
    User: {
      id: number;
      username: string;
      email: string;
      nickname?: string;
      avatar?: string;
      phone?: string;
      status: 'active' | 'inactive' | 'pending' | 'suspended';
      role: 'admin' | 'user' | 'guest';
      lastLoginAt?: string;
      createdAt: string;
      updatedAt: string;
    };
    
    CreateUserRequest: {
      username: string;
      email: string;
      password: string;
      nickname?: string;
      phone?: string;
      role?: 'admin' | 'user' | 'guest';
    };
    
    LoginRequest: {
      account: string;
      password: string;
      rememberMe?: boolean;
    };
    
    LoginResponse: {
      token: string;
      refreshToken?: string;
      user: components['schemas']['User'];
      expiresIn: number;
    };
    
    // 商品相关类型
    Product: {
      id: number;
      name: string;
      description?: string;
      price: number;
      originalPrice?: number;
      categoryId: number;
      category?: components['schemas']['Category'];
      brand?: string;
      model?: string;
      sku?: string;
      images?: string[];
      tags?: string[];
      specifications?: Record<string, string>;
      status: 'active' | 'inactive' | 'draft' | 'deleted';
      stock?: number;
      sales?: number;
      rating?: number;
      reviewCount?: number;
      weight?: number;
      dimensions?: {
        length?: number;
        width?: number;
        height?: number;
      };
      createdAt: string;
      updatedAt: string;
    };
    
    CreateProductRequest: {
      name: string;
      description?: string;
      price: number;
      originalPrice?: number;
      categoryId: number;
      brand?: string;
      model?: string;
      sku?: string;
      images?: string[];
      tags?: string[];
      specifications?: Record<string, string>;
      stock?: number;
      weight?: number;
      dimensions?: {
        length?: number;
        width?: number;
        height?: number;
      };
    };
    
    Category: {
      id: number;
      name: string;
      parentId?: number;
      level: number;
      sort?: number;
      icon?: string;
      children?: components['schemas']['Category'][];
    };
    
    // 通用类型
    Pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext?: boolean;
      hasPrev?: boolean;
    };
    
    ErrorResponse: {
      success: boolean;
      error: {
        code: string;
        message: string;
        details?: Array<{
          field?: string;
          message: string;
        }>;
      };
    };
  };
}

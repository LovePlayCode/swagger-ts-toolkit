# 📄 Swagger 文档示例

本目录包含各种 Swagger/OpenAPI 文档示例。

## 📂 文件说明

- **petstore-api.yaml** - 经典的宠物商店 API 示例（YAML 格式）
- **user-service.json** - 用户服务 API 示例（JSON 格式）

## 📋 文档格式

### YAML 格式 (.yaml)
- 易于阅读和编辑
- 适合手动编写
- 示例：`petstore-api.yaml`

### JSON 格式 (.json)
- 易于程序处理
- 适合自动生成
- 示例：`user-service.json`

## 🚀 使用这些文件

```bash
# 使用 YAML 示例生成 API
swagger-ts-toolkit --swagger ./petstore-api.yaml

# 使用 JSON 示例生成 API
swagger-ts-toolkit --swagger ./user-service.json
```

## 📚 更多示例

需要更多 Swagger 文件示例，请：
1. 访问 [OpenAPI 官方示例](https://github.com/OAI/OpenAPI-Specification/tree/main/examples)
2. 查看 [Swagger Petstore](https://petstore.swagger.io/)
3. 参考其他开源项目的 API 定义

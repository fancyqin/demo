## 前端

### 目前Crov前端情况


| 项目  | 框架(库)  | 打包、编译  | 组件库| 接口平台 |
|  ----  | ----  | ---- | ---- | ---- |
| Crov前台项目       | jQuery | mstatic | obelisk、mango | 无 |
| 跨境FIE、仓储项目   | jQuery | mstatic  | obelisk、mango | 无 |
| Crov App项目      | React Native | React Native | crovUI、antd-design | 基于swagger搭建的 |

### 未来规划

| 项目  | 框架(库)  | 打包、编译  | 组件库| 接口平台 |
|  ----  | ----  | ---- | ---- | ---- |
| Crov前台项目       | React | webpack | new、antd-design | ued mock平台 |
| Crov App项目      | React Native | React Native | crovUI、antd-design | 基于swagger搭建的 |

- Crov前台buyer vo和seller vo逐渐用React替换掉，前台需要推广页面应用使用SSR
- React 组件库
- 逐渐使用webpack替换mstatic
- 自动化测试
- typescript
- 数据可视化、建模

### 其他端

- 桌面端，其他客户端
- 小程序
- chrome插件
  
### 上下游流程优化

- 产品文档归档，查询平台、库
- 设计稿、交互稿库（ued库）
- 设计稿标柱标准化（psd？axure？sketch？蓝湖？）
- 接口平台 mock数据，前后端分离基础（ued接口平台）
- 持续集成自动化部署应用（fci）
- 提供git 服务（git.vemic.com）
- 提供npm 服务 (ued.vemic.com:4378)

### 前端规范统一
- 视觉、交互规范
- 公司通用的UI库
- 组件库，npm私有仓库

### 移动端
- 移动人员学习javascript，开发react native 应用
- 前端人员学习原生技术，其他跨平台技术，例如flutter



### Node
- 开发后端应用
- 搭建中间层，实现服务端渲染

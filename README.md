# SZY Innovation Studio - Website

SZY创新工作室的官方网站。

在线地址：[https://www.szystudio.cn](https://www.szystudio.cn)

## 技术栈

- **框架**: Vue 3 (Composition API + `<script setup>`)
- **构建**: Vite 5
- **样式**: Tailwind CSS 3
- **路由**: Vue Router 4 (Hash 模式)
- **国际化**: vue-i18n 9 (中/英双语)
- **状态**: Pinia 2
- **动画**: CSS Transition + IntersectionObserver
- **SEO**: @unhead/vue

## 功能

- 全站中英文双语切换，URL 路由联动 (`/` 与 `/en`)
- 毛玻璃设计系统，适配亮色背景
- 响应式布局，覆盖手机 / 平板 / 桌面端
- 滚动淡入动画，基于 IntersectionObserver 实现
- 在线申请加入工作室，含验证码和管理后台
- 成员展示页，手风琴展开查看详细信息
- 服务展示
- 项目列表
- 数字滚动计数器
- 终端风格 Hero 区块

## 项目结构

```
src/
├── assets/          # 全局样式
├── components/
│   ├── layout/      # AppHeader, AppFooter, AppDrawer, SideBar
│   ├── specific/    # BentoGrid, CounterAnimation, MemberAccordion, TerminalBlock
│   └── ui/          # GlassCard, FluidButton, MagneticBtn
├── composables/     # useScrollAnimation, useMagnetic
├── i18n/            # 中英文翻译文件
├── router/          # 路由配置
├── views/           # Home, About, Members, Join, NotFound
├── App.vue
└── main.js
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 部署

构建产物在 `dist/` 目录，部署到任意静态服务器即可。由于使用 Hash 路由模式，无需服务端配置回退规则。

## License

本项目使用 MIT 协议开源。

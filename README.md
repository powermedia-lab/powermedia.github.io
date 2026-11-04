# PowerMedia 产品子网站

PowerMedia 智能媒体服务器（宝丽通 PowerCOM）的市场推广子站，纯静态实现，无需构建工具。

## 文件结构

```
子网站/
├── index.html        首页：首屏 KPI、核心能力、能力矩阵、引擎流程、六层防泄露、场景、CTA
├── features.html     产品能力：播放引擎 / 入库元数据 / 转码调度 / 内容保护 / 字幕语音 / 平台集成
├── security.html     内容保护：六层纵深防御、分类防线（分片加密 / 双水印 / 逐页渲染）、溯源水印、客户端加固、配置默认值
├── solutions.html    解决方案：四类场景方案、三阶段落地路径、价值验证口径
├── editions.html     版本与授权：四版本对比表、授权机制、授权问答
├── tech.html         技术规格：技术栈、性能口径、部署要求、数据库迁移、安全、接口示意
├── contact.html      联系我们：演示预约表单、联系方式、常见问题（#faq）
└── assets/
    ├── css/site.css  全站样式（品牌色 #2369F2 / 深底 #0C1626 / 点缀橙 #ED6D00）
    ├── js/site.js    交互：吸顶导航、移动端菜单、滚动入场、表单校验
    └── img/          logo.svg / favicon.svg
```

导航共 7 项（首页 / 产品能力 / 内容保护 / 解决方案 / 版本与授权 / 技术规格 / 联系我们）。

## 使用方式

- **本地预览**：直接双击 `index.html` 即可，全部资源为相对路径、无外部依赖（无字体/CDN 外链）。
- **部署上线**：整目录上传任意静态托管（Nginx、对象存储、EdgeOne 等）即可；建议开启 gzip/brotli 与长缓存（`assets/` 可设 1 年，HTML 设不缓存）。

## 注意事项

1. **预约表单无后端**：`contact.html` 的表单提交后会校验字段并生成一封发往
   `marketing@powercom.net.cn` 的邮件草稿（mailto）。如需服务端收单，
   在 `assets/js/site.js` 第 6 节把 `window.location.href = href` 替换为 `fetch()` 提交到你的接口即可。
2. **联系方式**：电话 010-62129317 · marketing@powercom.net.cn · www.powercom.net.cn（与宣发彩页一致）。
3. **数据口径**：站内指标（起播 <1s/<3s、集群分发 ≤500ms、故障转移 ≤60s、缓存 7/30 天等）
   均取自 `knox-media` 规格文档，修改功能口径时请同步更新 `tech.html` 的性能表。
4. **防泄露口径**：`security.html` 与各页防泄露文案均取自
   `docs/knox-media-full-pipeline.md`（六层纵深防御、图片双水印、文档逐页渲染、
   视频块级芯片隐写、客户端加固）。水印 / 图片防护 / 文档逐页渲染 / 客户端加固
   各模块**默认关闭、按需开启**，对外表述请保持该口径，勿写成"默认开启"。
4. **备案号**：正式上线前在页脚 `.footer-bottom` 处补充 ICP 备案号。

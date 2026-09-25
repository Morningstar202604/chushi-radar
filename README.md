<div align="center">
  <h1>人情世故雷达</h1>
  <p><b>把人情账记明白，把关系经营成细水长流</b></p>
  <p>人脉经营 · 人情账本 · 社交修炼 —— 本地优先的轻量个人助手</p>
  <img src="https://img.shields.io/badge/平台-网页%20PWA%20%2B%20微信小程序-green" alt="Platform" />
  <img src="https://img.shields.io/badge/玩法-人脉经营-lightblue" alt="Playstyle" />
  <img src="https://img.shields.io/badge/存储-本地优先-blue" alt="Storage" />
  <img src="https://img.shields.io/badge/版本-v2.8-orange" alt="Version" />
  <img src="https://img.shields.io/badge/License-CC%20BY--NC%204.0-red" alt="License" />
  <br />
  <p>
    <a href="https://github.com/X33834/chushi-radar">GitHub</a> ·
    <a href="https://gitcode.com/badhope/chushi-radar">GitCode</a> ·
    <a href="https://gitee.com/badhope/chushi-radar">Gitee</a>
  </p>
</div>

---

## 这是什么

「人情世故雷达」是一款**人脉经营工具**，不是答题测评。

旧版「处世 Radar」是 81 道题的社交智力测验（9 维打分）；v2 起彻底重构为**经营型玩法**：你只需要在饭局散场后花 10 秒记一笔往来，雷达自动完成其余一切——画关系画像、算人情热度、提醒你该走动、该还人情、该送祝福。

## 在线体验

- **国内主力**（豆包网页应用，PWA 可安装）：<https://4m2km3hh7ey1t.doubaoapps.com/app/app_17eru2vjvng>
- **GitHub Pages**（海外/镜像仓库直达，国内访问可能不稳）：
  - <https://x33834.github.io/chushi-radar/>
  - <https://morningstar202604.github.io/chushi-radar/>
- **官网**（品牌门户）：<https://4m2km3hh7ey1t.doubaoapps.com/app/app_17es9apfbjy>，源码在 `官网/人情世故雷达官网.html`

所有版本同源：仓库根 `index.html` 即网页版（与 `人情世故雷达.html` 同内容），推送 main 后 GitHub Pages 自动部署。

## 核心玩法（五模块闭环）

```
记录往来 → 自动画像 → 智能提醒 → 情景修炼 → 年度报告
```

| 模块 | 作用 |
| --- | --- |
| 雷达总览 | 五维画像（人脉规模/人情热度/往来频率/人情信用/处世智慧）+ 人情指数 + 智能提醒（节日/欠人情/久未往来/生日/待办，按紧急度配色） |
| 人脉管理 | 每人一张雷达卡，热度 = 事件加权 + 90 天半衰期衰减，可手动微调；搜索 / 身份筛选 / 三种排序 |
| 快速记录 | 10 类事件自动带人情值（饭局/互助/送礼/借钱/深聊…），支持撤销 |
| 修炼场 | 15 个中国式社交情景（随礼/挡酒/借钱/救场…），难度分级，练完涨处世智慧与段位 |
| 我的 | 月度洞察、近 6 月趋势、年度人情报告、待办管理、备份迁移（剪贴板/文件/CSV） |

## 双端形态

| 形态 | 说明 |
| --- | --- |
| 网页版（PWA） | 单文件自包含 HTML（约 1.1MB，零构建），离线可用，可添加到主屏幕当 App 用；内置 ECharts 开源可视化 |
| 微信小程序 | 完整小程序工程（本仓库 `人情世故雷达-小程序/`），Canvas 手绘雷达零依赖，与网页版数据结构互通 |

## 数据与隐私

- 所有数据仅存本机（浏览器 localStorage / 小程序本地缓存），**不上传任何服务器**
- 换设备用「导出备份 / 复制备份 → 新设备粘贴导入」，数据格式互通
- 日期与节日提醒内置农历换算（1900–2100）

## 版本历程

| 版本 | 要点 |
| --- | --- |
| v2.0 | 四合一重构：雷达/人脉/记录/修炼，原生 JS + ECharts（v1 答题版已删除，全部以 v2 经营版为主） |
| v2.1–v2.6 | 农历节日提醒、日记本美术、安装引导、待办管理、维度解读、年度报告、备份迁移、批量修 bug |
| v2.7 | 品牌体系（Logo/Slogan/欢迎引导/关于页）、提醒紧急度颜色修复 |
| v2.8 | 提醒直通记录、全部往来总览、最值得经营的人 Top3、往来类型分布图；记住上次页面、搜索空态优化 |

## 运行

- **网页版**：直接打开 `人情世故雷达.html` 即可（建议 Chrome / Safari / 微信内置浏览器）
- **小程序**：微信开发者工具导入 `人情世故雷达-小程序/` 目录即可预览

## 许可

Creative Commons Attribution-NonCommercial 4.0 International（CC BY-NC 4.0），详见 `LICENSE`。

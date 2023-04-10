---
title: "mermaid使用"
keywords: "mermaid"
date: "2022-3-11 16:28:48"
---

mermaid 流程图 + 饼图使用

# img

![img](../img/mermaid/test5.png)

## table

| 左对齐 | 右对齐 | 居中对齐 |
| :----- | -----: | :------: |
| 单元格 | 单元格 |  单元格  |
| 单元格 | 单元格 |  单元格  |

## 流程图

```mermaid
flowchart TB
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E(Result 2)
```

## 饼图

> https://mermaid-js.github.io/mermaid/#/pie

```mermaid
pie
title Pets adopted by volunteers
"Dogs" : 386
"Cats" : 85
"Rats" : 15
```

## 参考

1. [mermaid](https://github.com/mermaid-js/mermaid/blob/develop/README.zh-CN.md)

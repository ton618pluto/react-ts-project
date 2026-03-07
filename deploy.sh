#!/usr/bin/env bash

# 1. 发生错误时终止脚本
set -e

# 2. 打包项目
echo "正在打包项目..."
npm run build

# 3. 进入打包后的文件夹
cd dist  # 如果你的 React 默认打包文件夹是 dist，请改为 cd dist

# 4. 初始化 git 并提交代码
git init
git add -A
git commit -m 'deploy: 自动部署项目'

# 5. 强制推送到你的 Gitee 仓库的 target 分支（比如命名为 deploy）
# 替换为你的 Gitee 仓库地址
echo "正在推送到 Gitee..."
git push -f git@gitee.com:shen-yimin/question-react-ts.git master:deploy-pages

cd -
echo "部署包已推送至 deploy-pages 分支！"
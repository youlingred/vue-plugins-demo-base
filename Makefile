.PHONY: dist test
default: help

# 安装
install:
	npm install
# 中文镜像安装
install-cn:
	npm install --registry=http://registry.npm.taobao.org
# 启动开发环境
dev:
	npm run dev
# 创建组件
new:
	npm run new $(filter-out $@,$(MAKECMDGOALS))
# 生成样式
theme:
	npm run theme $(filter-out $@,$(MAKECMDGOALS))
# 生成json文件
json:
	npm run json
pages:
	npm run pages
# 打包组件
dist:
	npm run dist
# 各个组件单独打包
dist-all:
	npm run dist:all

deploy:
	@npm run deploy
# 发布组件
pub:
	npm run pub
# 各个组件单独发布
pub-all:
	npm run pub:all
# 运行单元测试
test:
	npm run test:watch

help:
	@echo "   \033[35mmake\033[0m \033[1m命令使用说明\033[0m"
	@echo "   \033[35mmake install\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  安装依赖"
	@echo "   \033[35mmake install-cn\033[0m\t\033[0m\t\033[0m\t---  淘宝镜像安装依赖"
	@echo "   \033[35mmake new <component-name> <中文名> <组件分组名> <作者名>\033[0m\t---  创建新组件. 例如 'make new radio-button 单选按钮 Basic 谢辉'"
	@echo "   \033[35mmake dev\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  开发模式"
	@echo "   \033[35mmake dist\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  编译项目，生成目标文件"
	@echo "   \033[35mmake dist-all\033[0m\t\033[0m\t\033[0m\t---  分别编译每个组件项目"
	@echo "   \033[35mmake deploy\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  部署 demo"
	@echo "   \033[35mmake pub\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  发布到 npm 上"
	@echo "   \033[35mmake pub-all\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  发布各组件到 npm 上"

# appexplore

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## npm私库
> 建议使用用 nrm
```
npm install -g nrm # 安装nrm
nrm add name http://172.28.141.34:8081/repository/npm-all/ # 添加本地的npm镜像地址
nrm use name # 使用本址的镜像地址     name为你要增加的地址
```

## 组件库使用

1. 远程仓库版本检查
```
npm view usp-ui version
```

2. 本地版本查看
```
npm list usp-ui
```

3. 升级
```
npm i usp-ui
```

## 添加了gzip压缩功能，生产环境打包完成后需要配合静态服务器（如nginx）启用（压缩等级开到最高）

## 添加了'num run build:dev'命令进行开发环境打包

## 生产环境关闭sourcemap

## 添加.prettierrc文件用于代码统一代码格式化规范，需要配合vscode中的Pretter插件使用
// api里统一出口，这样逻辑页面直接引入api,不需要考虑
// 接口方法具体在哪个名字文件里
// 导入所有user.js里按需导出的方法，并按需中转导出
export * from '@/api/user';

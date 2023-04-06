// { default as Tabs }: 导入from后面组件的默认导出 并通过as 起个别名
// 再export 导出 导入的组件
// 这样做的目的是：减少外部调用tabs文件里的组件时的路径嵌套层级
export { default as Tabs } from "./tabs";
export { default as TabItem } from "./tabItem";

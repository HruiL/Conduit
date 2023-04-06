import { browserHistory } from "@src/App";
import { store } from "@src/store";
import axios, { AxiosError } from "axios";

export default class RequestManage {
  // 保存单例的实例对象
  static _singleton = undefined;

  // 构造函数
  constructor() {
    // 创建axios单例对象  静态方法instance保证了constructor只执行一次，所以只会有一个axios对象
    this._instance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });
    // 注册请求拦截
    this._instance.interceptors.request.use(this._setupTokenToRequestHeaders);
    // 注册响应拦截
    // 参数一：成功响应的回调
    // 参数二：失败响应的回调
    this._instance.interceptors.response.use(
      this._peelOffAxiosResponse,
      this.unAuthorizedResponse
    );
  }
  // 请求拦截 往请求头中添加token
  _setupTokenToRequestHeaders(config) {
    // 获取状态对象
    const state = store.getState();
    // 获取状态对象中的token
    const token = state.userReducer.user.token;
    // 如果token存在，就添加到响应头中
    if (token) config.headers = { Authorization: `Bearer ${token}` };
    return config;
  }
  //   响应拦截 减少代码层级，让外部直接拿axios响应对象中的data 服务器端返回的数据
  _peelOffAxiosResponse(response) {
    return response.data;
  }
  // 未授权的统一处理
  unAuthorizedResponse(error) {
    console.log(error);
    // 如果是axiosError的错误
    if (error instanceof AxiosError) {
      // 如果状态是401为授权
      if (error.response?.status === 401) {
        // 跳转到登录页 并附加重定向页面的路由信息
        const { pathname, search, hash } = browserHistory.location;
        browserHistory.push({
          pathname: "/login",
          redirectUrl: pathname + search + hash,
        });
      }
    }
    // 将错误传递下去 不返回的话，外部无法拿到错误状态，会一直都是成功态
    return Promise.reject(error);
  }
  // 静态方法instance 创建单例对象，并返回 供外部使用 获取单例对象
  // 用静态方法的原因：单例，不允许外部直接通过new类创建实例，而是要通过内部提供的方法获取实例，不能new类（也就是说没有实例对象），那么只能通过类去访问类中的属性和方法，所以只能是类方法，不能是实例方法
  // 静态方法只能操作静态属性，因为静态属性和方法保存在内存中，而实例属性只有new之后才有，所以无法操作实例属性
  // 用get的原因：外部调用instance方法时不需要传递参数，只是为了获取实例对象，所以为了代码简洁，要用get，将instance的调用改成属性的形式
  // get 必须要有返回值
  static get instance() {
    // 判断单例对象是否存在
    if (typeof RequestManage._singleton === "undefined") {
      // 不存在 创建
      RequestManage._singleton = new RequestManage();
    }
    // 存在直接返回
    return RequestManage._singleton;
  }
  request(config) {
    return this._instance.request(config);
  }
}

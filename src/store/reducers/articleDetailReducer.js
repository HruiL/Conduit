import * as types from "../types/detailArticle.type";
import * as articleTypes from "../types/article.type";
import * as profileTypes from "../types/profile.type";
import * as commentsTypes from "../types/comment.type";
import { mapArrayToDictionary } from "@src/utils/mapArrayToDictionary";
const initialState = {
  // 文章详情
  article: {
    resule: {},
    status: "idle",
    error: null,
  },
  // 文章评论列表
  comments: {
    result: {},
    status: "idle",
    error: null,
  },
};
export function articleDetailReducer(state = initialState, action) {
  switch (action.type) {
    // 请求文章详情
    case types.REQUEST_ARTICLE_DETAIL:
      return {
        ...state,
        article: { result: {}, status: "pending", error: null },
      };
    // 文章详情请求成功
    case types.REQUEST_ARTICLE_DETAIL_SUCCESS:
      return {
        ...state,
        article: { result: action.payload, status: "success", error: null },
      };
    // 文章详情请求失败
    case types.REQUEST_ARTICLE_DETAIL_ERROR:
      return {
        ...state,
        article: { result: {}, status: "error", error: action.error },
      };
    // 点赞文章之后更新本地文章
    case articleTypes.UPDATE_ARTICLE:
      // if (state.article.resule.slug !== action.payload.slug) return state;
      return {
        ...state,
        article: {
          ...state.article,
          result: action.payload,
        },
      };
    // 关注/取消关注 之后更新本地作者信息
    case profileTypes.UPDATE_PROFILE:
      return {
        ...state,
        article: {
          ...state.article,
          result: {
            ...state.article.result,
            author: action.payload,
          },
        },
      };
    // 请求评论列表
    case commentsTypes.REQUEST_COMMENTS:
      return {
        ...state,
        comments: { status: "pending", error: null, result: {} },
      };
    // 请求评论列表成功
    case commentsTypes.REQUEST_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: {
          status: "success",
          error: null,
          result: mapArrayToDictionary(action.payload),
        },
      };
    // 请求评论列表失败
    case commentsTypes.REQUEST_COMMENTS_ERROR:
      return {
        ...state,
        comments: { status: "error", error: null, result: {} },
      };
    // 保存发表的评论
    case commentsTypes.SAVE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          result: {
            ...state.comments.result,
            [action.payload.id]: action.payload,
          },
        },
      };
    // 删除评论
    case commentsTypes.DELETE_COMMENT:
      // 将原有的评论列表数据复制一份
      const newComment = { ...state.comments.result };
      // 删除当前点击的删除项
      delete newComment[action.payload];
      return {
        ...state,
        comments: {
          ...state.comments,
          result: {
            ...newComment,
          },
        },
      };
    // 删除本地文章详情
    case types.DELETE_ARTICLE_DETAIL:
      return { ...initialState };
    default:
      return state;
  }
}

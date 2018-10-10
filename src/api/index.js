// 将所有的接口请求都通过这个统一输出
import service from './service'
import upload from './upload'
import jwt from './jwt'
import employee from './employee'
import activity from './activity'
import prize from './prize'
import mine from './mine'
import echart from './echart'
import rank from './rank'
import analyse from './ai-analyse'
import clientDetail from './clientDetail'
import business from './business'
import order from './order'
import exchange from './exchange'
import property from './property'

export const Property = property

export const Exchange = exchange

export const ServiceApi = service

export const ActivityApi = activity

export const Jwt = jwt

export const Upload = upload

export const Employee = employee

export const PrizeApi = prize

export const Mine = mine

// ai分析
export const Analyse = analyse

// 图表
export const Echart = echart

// 排行榜
export const Rank = rank

// 客户资料
export const ClientDetail = clientDetail

// 名片
export const Business = business

export const OrderApi = order

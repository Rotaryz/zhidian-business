// 将所有的接口请求都通过这个统一输出
import service from './service'
import upload from './upload'
import jwt from './jwt'
import employee from './employee'
import echart from './echart'
import rank from './rank'
import analyse from './ai-analyse'

export const ServiceApi = service

export const Jwt = jwt

export const Upload = upload

export const Employee = employee

// ai分析
export const Analyse = analyse

// 图表
export const Echart = echart

// 排行榜
export const Rank = rank

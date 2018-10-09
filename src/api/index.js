// 将所有的接口请求都通过这个统一输出
import service from './service'
import upload from './upload'
import jwt from './jwt'
import employee from './employee'
import activity from './activity'
import prize from './prize'
import mine from './mine'
import exchange from './exchange'

export const Exchange = exchange

export const ServiceApi = service

export const ActivityApi = activity

export const Jwt = jwt

export const Upload = upload

export const Employee = employee

export const PrizeApi = prize

export const Mine = mine

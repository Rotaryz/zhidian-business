// 将所有的接口请求都通过这个统一输出
import service from './service'
import upload from './upload'
import jwt from './jwt'

export const ServiceApi = service

export const Jwt = jwt

export const Upload = upload

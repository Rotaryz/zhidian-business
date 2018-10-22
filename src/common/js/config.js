const env = process.env
const version = `/v1`
const LOCAL_URL = {
  api: 'http://local.com'
}

const DEV_URL = {
  api: 'https://zhidian-api.jerryf.cn',
  upload: 'https://zhidian-api.jerryf.cn'
}

const TEST_URL = {
  api: 'https://zhidian-api.jkweixin.net' + version,
  upload: 'https://zhidian-api.jkweixin.net' + version
  // upload: 'http://192.168.9.46'
}

const PROD_URL = {
  api: 'https://zhidian-api.jkweixin.com' + version,
  upload: 'https://zhidian-api.jkweixin.com' + version
}

export const BASE_URL = env.NODE_ENV === 'production' ? PROD_URL : env.NODE_ENV === 'test' ? TEST_URL : env.NODE_ENV === 'dev' ? DEV_URL : LOCAL_URL

export const ERR_OK = 0

import instance from './instance'


export const login = (data) => {
  return instance.post('/api/login', data)
}

export const captcha = () => {
  return instance.post('/api/captcha')
}
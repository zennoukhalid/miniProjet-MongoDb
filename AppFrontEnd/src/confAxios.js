import axios from "axios"

export const Status =  {
  SUCCESS : "Success",
  ERROR : "Error",
}

export class AxiosClient {
  axiosInstance

  constructor(defaultConfig) {
    this.axiosInstance = axios.create(defaultConfig)
    this.axiosInstance.interceptors.request.use(
      (req) => {
        req.headers["Authorization"] = `Bearer ${this.getToken()}`
        return req
      },
      (err) => Promise.reject(err)
    )
  }

  fetch = (p ) => {
    return new Promise(async (resolve, reject) => {
      p.method = p.method || "post"
      p.data = p.data || {}
      try {
        const rep = await this.axiosInstance.request(p)
        if (rep.status >= 500) {
          reject("HTTP ERROR CODE: " + rep.status)
        } else {
          if (rep.data.status === Status.ERROR) {
            reject(rep.data.message)
          } else {
            resolve(rep.data.data || rep.data || {})
          }
        }
      } catch (err) {
        return reject(err)
      }
    })
  }

   getToken() {
    return localStorage.getItem('TOKEN')
  }
}

export const http =  new AxiosClient({
    baseURL: "http://localhost:3003/"
})
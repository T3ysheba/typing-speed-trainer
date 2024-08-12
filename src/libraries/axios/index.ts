import axios from 'axios'

const processEnv = '/data' //Hardcoded

const defaultOptions = {
  baseURL: processEnv,
}

const axiosInstance = axios.create(defaultOptions)

export default axiosInstance

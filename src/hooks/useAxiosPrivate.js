import { useEffect } from 'react'
import { axiosPrivate } from '../api/axios'
import { useRefreshToken } from './useRefreshToken'
import { useSelector } from 'react-redux'

export const useAxiosPrivate = () => {
  const refreshToken = useRefreshToken()
  const currentUser = useSelector(state => state.user.value)
  
    
  useEffect(()=> {
    const requestIntercept = axiosPrivate.interceptors.request.use(
       (config) => {
         if(!config.headers['Authorization']) {
           config.headers['Authorization'] = `Bearer ${currentUser?.accessToken}`
         }
         return config
       }, 
       (error) => Promise.reject(error)
     )
    
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (error) => {
        const prevRequest = error?.config
        if(error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refreshToken()
          
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )
    
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
      
    }, [currentUser, refreshToken])
  return axiosPrivate
}
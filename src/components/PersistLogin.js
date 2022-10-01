import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { useRefreshToken } from '../hooks/useRefreshToken'
import cogoToast from 'cogo-toast'
export default function PersistLogin() {
    const [isPending, setIsPending]= useState(false)
    const refresh = useRefreshToken()
    
    useEffect(()=> {
        setIsPending(true)
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            }
            catch (err) {
                cogoToast.error(err.message)
            }
            finally {
                setIsPending(false)
            }
        }
        
        !user?.accessToken ? verifyRefreshToken() : setIsPending(false)
        
    },[]) 
    return (
        <>
            {isPending ? (
                <div>Loading...</div>
                ):(
                <Outlet />
            )}
        </>
    ) 
} 
import { useState } from 'react'

const getItem = (key) => {
    function escape(s) {
        return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1')
    }
    var match = document.cookie.match(
        RegExp('(?:^|;\\s*)' + escape(key) + '=([^;]*)')
    )
    return match ? match[1] : null
}

const setItem = (key, value, numberOfDays) => {
    const now = new Date()

    // set the time to be now + numberOfDays
    now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000)

    document.cookie = `${key}=${value}; expires=${now.toUTCString()}; path=/`
}

/**
 *
 * @param {String} key The key to store our data to
 * @param {String} defaultValue The default value to return in case the cookie doesn't exist
 */

export const useCookie = (key, defaultValue) => {
    const getCookie = () => getItem(key) || defaultValue
    const [cookie, setCookie] = useState(getCookie())

    const updateCookie = (value, numberOfDays) => {
        setCookie(value)
        setItem(key, value, numberOfDays)
    }

    return [cookie, updateCookie]
}

// import { useState } from 'react'

// export function useCookie() {
//     const [cookie, setCookie] = useState(
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDg4Y2RjNDRhN2QwNTljYTEwNDA5NCIsInVzZXJuYW1lIjoiZ3Vlc3QiLCJpYXQiOjE2NjE1Nzg0NTAsImV4cCI6MTY2MTU3OTM1MH0.TV9iu02NGs41cQOjY9mwRE1R9Bp3f_t1-F93eilIo4w'
//     )

//     return { cookie, setCookie }
// }

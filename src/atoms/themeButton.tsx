'use client'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
export function ThemeButton() {
    const [mounted, setMounted] = useState(false)

    useEffect(()=>{
        setMounted(true)
    },[])

    const { resolvedTheme, setTheme } = useTheme()
    if(!mounted)
     return <></>
    return <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
        {resolvedTheme === 'dark' ? <SunIcon className=' w-8 h-8'/> : <MoonIcon className=' w-8 h-8'/>}
    </button>
}
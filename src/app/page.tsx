'use client'
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid'
import { signInWithPopup, signOut } from '@firebase/auth'
import { auth, googleProvider } from '@/firebaseConfig'

import { useRouter } from 'next/navigation'

export default function Home() {
  const { push} = useRouter()

  function signInWithGoogle() {
    signInWithPopup(auth, googleProvider)
    .then((res)=> { push('/chats'); console.log('res', res)})
    .catch((er)=> console.log('err', er))
  }

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <button onClick={signInWithGoogle} className=' flex flex-col justify-center items-center '>
        <h3 className='  text-2xl'> Continue with google</h3>
        <ChatBubbleOvalLeftIcon className=' w-10 h-10' />
      </button>
    </div>
  )
}

'use client'

import { useEffect, useState } from "react"
import { addDoc, collection, doc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp } from '@firebase/firestore'
import { db, auth } from "@/firebaseConfig"
import { useParams, usePathname } from "next/navigation"

export default function RoomChat() {
    const { roomId } = useParams()
    const userId = auth.currentUser?.uid

    if (!roomId)
        return <></>

    // if(!userId)
    //    return <></>


    console.log('patha', roomId)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<any>([])
    // if (pathName)
    //     roomID = pathName
    // const chatCollectionRef = collection(db, 'chats')
    const roomRef = doc(db, 'chats', roomId as string);
    const messageCol = collection(roomRef, 'messages')


    useEffect(() => {
        getMessages()
    }, [])


    useEffect(() => {
        const messageCol = collection(roomRef, 'messages');

        const unsubscribe = onSnapshot(messageCol, (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
                const isLocal = change.doc.metadata.hasPendingWrites;

                if (change.type === 'added') {
                    if (!isLocal) {
                        let raw = [...messages]
                        raw.push(change.doc.data())
                        // setMessages(raw)
                        console.log('Local document added: ', change.doc.id, change.doc.data());
                    } 
                }
            });
        });

        () => {
            unsubscribe()
        }
    }, [roomId])

    async function getMessages() {
        try {
            // const messagesList = await getDocs(messageCol)
            // const list = messagesList.docs.map((val) => val.data())
            // setMessages(list)

            const q = query(messageCol, orderBy('timestamp'), limit(10));
            const querySnapshot = await getDocs(q);
            const msgs: any = []
            querySnapshot.forEach((doc) => {
                msgs.push(doc.data())
            });
            setMessages(msgs)
        } catch (ex) {

        }
    }
    async function onClickSend() {
        const newMsg = await addDoc(messageCol, { message, by: auth.currentUser?.uid, timestamp: serverTimestamp(), type: 'str' })
        console.log('new mesage', newMsg)
        getMessages()
    }

    return <div>
        <div>
            <div>Chat user</div>
            <div>{messages.map((val: any, ind: number) => (<div key={ind}>{val.message}</div>))}
            </div>
        </div>

        <div className=" flex gap-4">
            <input onChange={(e) => setMessage(e.target.value)} />
            <button onClick={onClickSend}>Send</button>
        </div>
    </div>
}
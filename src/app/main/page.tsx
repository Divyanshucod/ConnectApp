"use client"
import React, { useEffect } from "react"
import {io, Socket} from 'socket.io-client'
export default function Main(){

    const [message,setMessage] = React.useState<string>('')
    const [totalMessages,setTotalMessages] = React.useState<Array<string>>([])
    function sendMessage(){

    }
    function handleConnection(socket:Socket){
            socket.on('connect',()=>{
                console.log('connected To server');
            })
            socket.on('message',(message)=>{
                console.log('got message',message);
            })
            socket.on('connect_error', (error) => {
                console.log('Connection error:', error);
            });
    }
    useEffect(()=>{
        const socket = io();
        handleConnection(socket);
    },[])
     return (
        <div className="h-dvh w-dvh flex justify-center items-center">
            <div className="w-80 h-2/3 border border-10 border-slate-500">
              <p className="text-center text-blue-700 border border-b-10 border-gray-800">chat app</p>
              <div className=" w-full h-80">
                {totalMessages.map((mess)=>(<div>
                    {mess}
                </div>))}
              </div>
              <footer className="flex w-full gap-1 items-center h-10">
                <input type="text" value={message} placeholder="Jod Messages" className="border border-slate-700 p-2 w-full" onChange={(e)=>setMessage(e.target.value)}/>
                <button className="p-2 rounded-sm bg-green-400 text-slate-700" onClick={sendMessage}>Send</button>
              </footer>
            </div>
        </div>
     )
}
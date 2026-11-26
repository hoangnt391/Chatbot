import {useState,useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {invoke} from '@tauri-apps/api/core';
import './style.css';
type Message={role:'user'|'assistant';text:string};
function load<T>(key:string,fallback:T):T{try{return JSON.parse(localStorage.getItem(key)??'null')??fallback}catch{return fallback}}
function App(){
const [messages,setMessages]=useState<Message[]>(()=>load('ashna.messages',[]));
const [name,setName]=useState<string>(()=>load('ashna.name','Bạn'));
const [draft,setDraft]=useState('');
const [busy,setBusy]=useState(false);
const [error,setError]=useState('');
const [settings,setSettings]=useState(false);
useEffect(()=>{try{localStorage.setItem('ashna.messages',JSON.stringify(messages));localStorage.setItem('ashna.name',JSON.stringify(name))}catch{setError('Không thể lưu dữ liệu cục bộ.')}},[messages,name]);
async function send(){const text=draft.trim();if(!text||busy)return;setBusy(true);setError('');setDraft('');setMessages(m=>[...m,{role:'user',text}]);try{const reply= '__TAURI_INTERNALS__' in window ? await invoke<string>('demo_reply',{message:text}):'Demo (không phải AI): '+text;setMessages(m=>[...m,{role:'assistant',text:reply}])}catch{setError('Không thể gửi tin nhắn.')}finally{setBusy(false)}}
return <main><header><strong>ASHNA AI CHAT</strong><button onClick={()=>setSettings(!settings)}>Cài đặt</button></header><aside>Chế độ demo · Chưa kết nối Ashna</aside>{settings&&<section><label>Tên hiển thị <input value={name} onChange={e=>setName(e.target.value)}/></label><button disabled={busy} onClick={()=>{if(confirm('Xóa lịch sử?'))setMessages([])}}>Xóa lịch sử</button></section>}<article aria-live="polite">{!messages.length&&<p>Xin chào {name}! Bắt đầu cuộc trò chuyện.</p>}{messages.map((m,i)=><div key={i} className={m.role}><small>{m.role==='user'?name:'ASHNA Demo'}</small><p>{m.text}</p></div>)}{busy&&<p>Đang xử lý…</p>}</article>{error&&<p role="alert">{error}</p>}<form onSubmit={e=>{e.preventDefault();void send()}}><textarea aria-label="Tin nhắn" value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Nhập tin nhắn..." maxLength={8000}/><button disabled={busy||!draft.trim()}>Gửi</button></form></main>}
createRoot(document.getElementById('root')!).render(<App/>);
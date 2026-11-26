import {useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {invoke,isTauri} from '@tauri-apps/api/core';
import './style.css';
type Message={role:'user'|'assistant';text:string};
type Chat={id:string;title:string;messages:Message[]};
const fresh=():Chat=>({id:crypto.randomUUID(),title:'Cuộc trò chuyện mới',messages:[]});
function read(key:string):unknown{try{return JSON.parse(localStorage.getItem(key)??'null')}catch{return null}}
function validMessage(m:unknown):m is Message{return !!m&&typeof m==='object'&&'role'in m&&'text'in m&&(m.role==='user'||m.role==='assistant')&&typeof m.text==='string'}
function initial():Chat[]{const v=read('ashna.chats');if(Array.isArray(v)){const good=v.filter(c=>c&&typeof c.id==='string'&&typeof c.title==='string'&&Array.isArray(c.messages)&&c.messages.every(validMessage));if(good.length)return good}const c=fresh();const legacy=read('ashna.messages');if(Array.isArray(legacy))c.messages=legacy.filter(validMessage);return [c]}
function App(){
const [chats,setChats]=useState(initial);
const [active,setActive]=useState(()=>chats[0].id);
const [draft,setDraft]=useState('');
const [busy,setBusy]=useState(false);
const [error,setError]=useState('');
const [storageError,setStorageError]=useState('');
const [settings,setSettings]=useState(false);
const [sidebar,setSidebar]=useState(false);
const [theme,setTheme]=useState(()=>read('ashna.theme')==='light'?'light':'dark');
const [name,setName]=useState(()=>{const n=read('ashna.name');return typeof n==='string'?n:'Bạn'});
const lock=useRef(false);
const end=useRef<HTMLDivElement>(null);
const chat=chats.find(c=>c.id===active)??chats[0];
useEffect(()=>{try{localStorage.setItem('ashna.chats',JSON.stringify(chats));localStorage.setItem('ashna.name',JSON.stringify(name));localStorage.setItem('ashna.theme',JSON.stringify(theme));setStorageError('')}catch{setStorageError('Không thể lưu dữ liệu trên thiết bị.')}},[chats,name,theme]);
useEffect(()=>{end.current?.scrollIntoView({block:'end'})},[chat.messages,busy]);
function add(){const c=fresh();setChats(v=>[c,...v]);setActive(c.id);setDraft('');setError('');setSidebar(false)}
function remove(){if(busy||!confirm('Xóa cuộc trò chuyện này?'))return;const remaining=chats.filter(c=>c.id!==chat.id);const next=remaining.length?remaining:[fresh()];setChats(next);setActive(next[0].id);setError('');setDraft('')}
async function send(){const text=draft.trim();if(!text||lock.current)return;lock.current=true;setBusy(true);setError('');setDraft('');const id=chat.id;setChats(v=>v.map(c=>c.id===id?{...c,title:c.messages.length?c.title:text.slice(0,45),messages:[...c.messages,{role:'user',text}]}:c));try{const reply=isTauri()?await invoke<string>('demo_reply',{message:text}):'Demo (không phải AI): '+text;setChats(v=>v.map(c=>c.id===id?{...c,messages:[...c.messages,{role:'assistant',text:reply}]}:c))}catch{setError('Gửi thất bại. Nội dung đã được khôi phục để thử lại.');setDraft(text);setChats(v=>v.map(c=>c.id===id?{...c,messages:c.messages.slice(0,-1)}:c))}finally{lock.current=false;setBusy(false)}}
return <div className={'app '+theme}><nav className={sidebar?'open':''} aria-label="Hội thoại"><h2>ASHNA<span> AI</span></h2><button className="primary" disabled={busy} onClick={add}>＋ Hội thoại mới</button><div className="history">{chats.map(c=><button key={c.id} disabled={busy} aria-current={c.id===chat.id?'page':undefined} onClick={()=>{setActive(c.id);setDraft('');setError('');setSidebar(false)}}>{c.title}</button>)}</div><button onClick={()=>setSettings(!settings)}>⚙ Cài đặt</button></nav><main><header><button className="menu" aria-label="Mở danh sách hội thoại" onClick={()=>setSidebar(!sidebar)}>☰</button><div><strong>{chat.title}</strong><small>Demo · Chưa kết nối Ashna</small></div><button disabled={busy} onClick={remove}>Xóa</button></header>{settings&&<section className="settings"><label>Tên hiển thị<input maxLength={60} value={name} onChange={e=>setName(e.target.value)}/></label><label>Giao diện<select value={theme} onChange={e=>setTheme(e.target.value==='light'?'light':'dark')}><option value="dark">Tối</option><option value="light">Sáng</option></select></label><button onClick={()=>setSettings(false)}>Đóng</button></section>}<article aria-live="polite">{!chat.messages.length&&<div className="welcome"><h1>Xin chào, {name||'Bạn'}!</h1><p>Bắt đầu một cuộc trò chuyện mới.</p><p>Phản hồi hiện tại chỉ là demo, không phải AI.</p></div>}{chat.messages.map((m,i)=><div key={i} className={'bubble '+m.role}><small>{m.role==='user'?name:'ASHNA Demo'}</small><p>{m.text}</p></div>)}{busy&&<p role="status">Đang xử lý…</p>}<div ref={end}/></article>{(error||storageError)&&<p role="alert" className="error">{error||storageError}</p>}<form onSubmit={e=>{e.preventDefault();void send()}}><textarea aria-label="Tin nhắn" value={draft} disabled={busy} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();void send()}}} placeholder="Nhập tin nhắn..." maxLength={8000}/><button className="primary" disabled={busy||!draft.trim()}>Gửi ↑</button></form><footer>Lịch sử lưu trên thiết bị, chưa mã hóa.</footer></main></div>}
createRoot(document.getElementById('root')!).render(<App/>);
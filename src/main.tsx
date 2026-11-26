import {createRoot} from 'react-dom/client';
import './style.css';
function App(){return <main><h1>ASHNA AI CHAT</h1><p>Bản WebView 0.3.1. Khi chạy ứng dụng native, trang Ashna chính thức được mở trực tiếp.</p><a href="https://app.ashna.ai/" rel="noopener noreferrer">Mở Ashna trên trình duyệt</a><p>Đăng nhập trực tiếp tại Ashna. Không nhập mật khẩu vào ứng dụng demo.</p></main>}
createRoot(document.getElementById('root')!).render(<App/>);

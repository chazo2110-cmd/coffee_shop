'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, MessageCircle, X } from 'lucide-react';
import { messengerUrl } from '@/lib/messenger';

export default function MessengerChat({ name, url }: { name: string; url?: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const href = messengerUrl(url);

  useEffect(() => {
    if (!open || !href) return;
    panel.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open, href]);

  if (!href) return null;
  return (
    <aside className="messenger-widget" aria-label="Liên hệ nhân viên">
      {open && (
        <section className="messenger-panel" id="messenger-panel" aria-labelledby="messenger-title" tabIndex={-1} ref={panel}>
          <div className="messenger-heading">
            <span className="messenger-avatar"><MessageCircle size={23} /></span>
            <div><h2 id="messenger-title">Trò chuyện với {name}</h2><span>Qua Facebook Messenger</span></div>
            <button type="button" aria-label="Đóng khung chat" onClick={() => { setOpen(false); toggle.current?.focus(); }}><X size={19} /></button>
          </div>
          <div className="messenger-body">
            <p className="messenger-greeting">Chào bạn! Bạn muốn hỏi về món ngon, đặt hàng hay tìm đường đến quán? Nhắn cho tụi mình nhé.</p>
            <a className="button messenger-link" href={href} target="_blank" rel="noopener noreferrer">Nhắn qua Messenger <ArrowUpRight size={18} /></a>
            <p className="messenger-note">Mở Messenger trong tab mới hoặc ứng dụng. Nhân viên sẽ trả lời tại đó khi có thể.</p>
          </div>
        </section>
      )}
      <button type="button" className="messenger-toggle" aria-label={open ? 'Thu gọn khung chat' : 'Chat với nhân viên'} aria-expanded={open} aria-controls="messenger-panel" ref={toggle} onClick={() => setOpen(!open)}>
        {open ? <X size={24} /> : <MessageCircle size={24} />}<span>{open ? 'Thu gọn' : 'Chat với tụi mình'}</span>
      </button>
    </aside>
  );
}

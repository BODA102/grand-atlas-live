import React, { useState } from 'react';
import api from '../services/api';

export default function ContactContent() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState({ loading: false, message: '', error: false });

  const handleChange = event => setFormData(current => ({ ...current, [event.target.name]: event.target.value }));
  const handleSubmit = async event => {
    event.preventDefault();
    setStatus({ loading: true, message: '', error: false });
    try {
      const response = await api.post('/contactus', formData);
      setStatus({ loading: false, message: response.data?.message || 'Thank you! Your message has been sent successfully.', error: false });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus({ loading: false, message: error.message || 'Your message could not be sent. Please try again.', error: true });
    }
  };

  return (
    <div className="w-full bg-white text-gray-900 font-sans pb-16">
      <div className="relative w-full min-h-105 md:h-105 bg-gray-900 mb-10 sm:mb-14 overflow-hidden flex items-center justify-center py-16"><div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: "url('/contact.png')" }} /><div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" /><div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl"><h1 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-white mb-3 tracking-wide leading-tight">Connected Globally. <br className="hidden sm:inline" /> Available Locally.</h1><p className="text-gray-200 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">With experts positioned in the world's most influential markets, we are never more than a conversation away. Reach out to our team to experience a new standard of real estate advisory.</p></div></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6"><div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-6 space-y-8"><div><h2 className="font-serif font-bold text-xl sm:text-2xl text-gray-900 mb-3">Contact Information</h2><p className="text-gray-500 text-xs leading-relaxed mb-6">Our team is available for private consultations and off-market inquiries. We operate with absolute discretion to ensure your real estate objectives are met with precision.</p><ul className="space-y-3 text-xs text-gray-700"><li className="flex items-center gap-2.5"><span className="text-[#8B1E22]">📍</span><span>Minusio, Lake Maggiore, Switzerland — ref. LOC1771</span></li><li className="flex items-center gap-2.5"><span className="text-[#8B1E22]">✉️</span><a className="font-medium text-gray-900 break-all" href="mailto:Grand.Atlas.Support@gmail.com">Grand.Atlas.Support@gmail.com</a></li><li className="flex items-center gap-2.5"><span className="text-[#8B1E22]">📞</span><a href="tel:01247859622">01247859622</a></li><li className="flex items-center gap-2.5"><span className="text-[#8B1E22]">☎</span><a href="tel:035987124">035987124</a></li></ul></div>
          <div><h3 className="text-xs font-semibold text-gray-900 mb-3">Follow us on social media</h3><div className="flex items-center gap-3"><a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-700 hover:bg-[#8B1E22] hover:text-white">f</a><a href="#" aria-label="X" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-700 hover:bg-[#8B1E22] hover:text-white">𝕏</a><a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-700 hover:bg-[#8B1E22] hover:text-white">◎</a><a href="#" aria-label="TikTok" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-700 hover:bg-[#8B1E22] hover:text-white">♪</a></div></div>
          <div><h3 className="font-serif font-bold text-base text-gray-900 mb-3">Working Hours</h3><div className="space-y-2 text-xs text-gray-600 max-w-xs">{['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'].map(day => <div key={day} className="flex justify-between"><span className="font-medium text-gray-800">{day}:</span><span>9:00 AM - 5:00 PM</span></div>)}</div></div>
        </div>
        <div className="lg:col-span-6 bg-gray-50/60 p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-sm"><h3 className="font-serif font-bold text-lg sm:text-xl text-gray-900 mb-6">Send us a message</h3><form onSubmit={handleSubmit} className="space-y-4">
          {[['name', 'Name', 'text', true], ['email', 'Email', 'email', true], ['phone', 'Phone', 'tel', false]].map(([name, label, type, required]) => <div key={name}><label htmlFor={`contact-${name}`} className="block text-xs font-medium text-gray-700 mb-1">{label}</label><input id={`contact-${name}`} type={type} name={name} value={formData[name]} onChange={handleChange} placeholder={`Enter your ${label.toLowerCase()}`} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-900 focus:outline-none focus:border-[#8B1E22] transition-colors shadow-sm" required={required} /></div>)}
          <div><label htmlFor="contact-message" className="block text-xs font-medium text-gray-700 mb-1">Message</label><textarea id="contact-message" name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="Write your message here..." className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-900 focus:outline-none focus:border-[#8B1E22] transition-colors shadow-sm resize-none" required /></div>
          {status.message && <p role={status.error ? 'alert' : 'status'} className={`text-xs ${status.error ? 'text-red-700' : 'text-emerald-700'}`}>{status.message}</p>}
          <button type="submit" disabled={status.loading} className="w-full bg-[#8B1E22] hover:bg-[#72171A] disabled:opacity-60 text-white py-3 rounded-xl text-xs font-semibold transition-colors shadow-sm mt-2 cursor-pointer">{status.loading ? 'Sending...' : 'Send Message'}</button>
        </form></div>
      </div></div>
    </div>
  );
}

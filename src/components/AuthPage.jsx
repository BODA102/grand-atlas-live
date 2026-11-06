import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../services/api';

const inputClass = 'w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-900 focus:outline-none focus:border-[#8B1E22] transition-colors shadow-sm';

export default function AuthPage() {
  const isRegister = useLocation().pathname === '/register';
  const [form, setForm] = useState({ name_en: '', name_ar: '', email: '', password: '', phone: '' });
  const [state, setState] = useState({ loading: false, message: '', error: false });

  const submit = async event => {
    event.preventDefault();
    setState({ loading: true, message: '', error: false });
    try {
      const body = isRegister ? form : { email: form.email, password: form.password };
      const response = await api.post(isRegister ? '/auth/register' : '/auth/login', body);
      const payload = response.data?.data || response.data;
      const token = payload?.access_token || payload?.accessToken || payload?.token;
      if (!isRegister && token) localStorage.setItem('grandAtlasToken', token);
      setState({ loading: false, message: response.data?.message || (isRegister ? 'Account created successfully.' : 'Signed in successfully.'), error: false });
    } catch (error) {
      setState({ loading: false, message: error.message || 'The request could not be completed.', error: true });
    }
  };

  const update = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }));

  return <div className="min-h-[70vh] bg-white px-4 py-12 sm:py-20 flex items-center justify-center"><div className="w-full max-w-lg bg-gray-50/60 p-6 sm:p-9 rounded-2xl border border-gray-200/80 shadow-sm">
    <p className="text-center text-[#8B1E22] text-xs uppercase tracking-widest mb-2">Grand Atlas</p><h1 className="font-serif font-bold text-2xl text-center mb-2">{isRegister ? 'Create your account' : 'Welcome back'}</h1><p className="text-center text-gray-500 text-xs mb-7">{isRegister ? 'Register to stay connected with Grand Atlas.' : 'Sign in to your Grand Atlas account.'}</p>
    <form onSubmit={submit} className="space-y-4">
      {isRegister && <><div><label htmlFor="name_en" className="block text-xs font-medium text-gray-700 mb-1">Name (English)</label><input id="name_en" name="name_en" value={form.name_en} onChange={update} className={inputClass} required /></div><div><label htmlFor="name_ar" className="block text-xs font-medium text-gray-700 mb-1">Name (Arabic)</label><input id="name_ar" name="name_ar" value={form.name_ar} onChange={update} className={inputClass} required /></div></>}
      <div><label htmlFor="auth-email" className="block text-xs font-medium text-gray-700 mb-1">Email</label><input id="auth-email" type="email" name="email" value={form.email} onChange={update} className={inputClass} autoComplete="email" required /></div>
      {isRegister && <div><label htmlFor="auth-phone" className="block text-xs font-medium text-gray-700 mb-1">Phone</label><input id="auth-phone" type="tel" name="phone" value={form.phone} onChange={update} className={inputClass} autoComplete="tel" required /></div>}
      <div><label htmlFor="auth-password" className="block text-xs font-medium text-gray-700 mb-1">Password</label><input id="auth-password" type="password" name="password" value={form.password} onChange={update} className={inputClass} autoComplete={isRegister ? 'new-password' : 'current-password'} required /></div>
      {state.message && <p role={state.error ? 'alert' : 'status'} className={`text-xs ${state.error ? 'text-red-700' : 'text-emerald-700'}`}>{state.message}</p>}
      <button type="submit" disabled={state.loading} className="w-full bg-[#8B1E22] hover:bg-[#72171A] disabled:opacity-60 text-white py-3 rounded-xl text-xs font-semibold transition-colors shadow-sm">{state.loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}</button>
    </form>
    <p className="text-center text-xs text-gray-500 mt-6">{isRegister ? 'Already have an account?' : 'New to Grand Atlas?'}{' '}<Link className="text-[#8B1E22] font-semibold" to={isRegister ? '/login' : '/register'}>{isRegister ? 'Sign in' : 'Register'}</Link></p>
  </div></div>;
}

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../api/contentApi.js';
import { useAuth } from '../../context/AuthContext.jsx';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginAdmin(form);
      signIn(data);
      navigate('/admin/dashboard');
    } catch (_err) {
      setError('Invalid credentials. Please verify admin email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F7F9FD] px-4">
      <Helmet>
        <title>Admin Login | EACE</title>
      </Helmet>
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl border border-[#D9E2F2] bg-white p-7 shadow-[0_20px_50px_rgba(9,32,70,0.15)]">
        <p className="text-xs uppercase tracking-[0.2em] text-[#790000]">Admin</p>
        <h1 className="mt-2 text-2xl font-bold text-[#0B4192]">EACE Admin Login</h1>
        <p className="mt-2 text-sm text-[#3A5A8C]">Manage gallery, content, videos, and testimonials.</p>

        <label className="mt-6 block text-sm text-[#3A5A8C]">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          className="mt-2 w-full rounded-lg border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
          required
        />

        <label className="mt-4 block text-sm text-[#3A5A8C]">Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          className="mt-2 w-full rounded-lg border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
          required
        />

        {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}

        <button
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-[#0B4192] px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </section>
  );
};

export default AdminLoginPage;

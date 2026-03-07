import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../api/contentApi.js';
import { useAuth } from '../../context/AuthContext.jsx';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [form, setForm] = useState({ email: 'admin@eace.in', password: '' });
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
    <section className="flex min-h-screen items-center justify-center px-4">
      <Helmet>
        <title>Admin Login | EACE</title>
      </Helmet>
      <form onSubmit={onSubmit} className="glass w-full max-w-md rounded-2xl p-7">
        <h1 className="text-2xl font-bold">EACE Admin Login</h1>
        <p className="mt-2 text-sm text-slate-300">Manage gallery, content, videos, and testimonials.</p>

        <label className="mt-6 block text-sm text-slate-200">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          className="mt-2 w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-sm outline-none focus:border-gold/70"
          required
        />

        <label className="mt-4 block text-sm text-slate-200">Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          className="mt-2 w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-sm outline-none focus:border-gold/70"
          required
        />

        {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}

        <button
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:brightness-105 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </section>
  );
};

export default AdminLoginPage;

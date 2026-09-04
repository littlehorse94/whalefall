'use client';

import { useActionState } from 'react';
import type { CSSProperties } from 'react';
import { login } from './actions';

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0e1a',
        color: '#e8f4f8',
        fontFamily: 'Inter, sans-serif',
        padding: '1.5rem',
      }}
    >
      <form
        action={formAction}
        style={{
          width: '100%',
          maxWidth: '360px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(77,217,232,0.2)',
          borderRadius: '12px',
          padding: '2rem',
        }}
      >
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          Whalefall Admin
        </h1>

        <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.35rem', color: 'rgba(232,244,248,0.7)' }}>
          Username
        </label>
        <input
          name="username"
          type="text"
          autoComplete="username"
          required
          style={inputStyle}
        />

        <label style={{ display: 'block', fontSize: '0.8rem', margin: '1rem 0 0.35rem', color: 'rgba(232,244,248,0.7)' }}>
          Password
        </label>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          style={inputStyle}
        />

        {state?.error && (
          <p style={{ color: '#e84d4d', fontSize: '0.85rem', marginTop: '1rem' }}>{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          style={{
            width: '100%',
            marginTop: '1.5rem',
            padding: '0.7rem',
            borderRadius: '8px',
            border: '1px solid rgba(77,217,232,0.4)',
            background: 'rgba(77,217,232,0.15)',
            color: '#4dd9e8',
            fontWeight: 600,
            cursor: pending ? 'not-allowed' : 'pointer',
            opacity: pending ? 0.6 : 1,
          }}
        >
          {pending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '0.6rem 0.75rem',
  borderRadius: '8px',
  border: '1px solid rgba(77,217,232,0.2)',
  background: 'rgba(5,8,16,0.6)',
  color: '#e8f4f8',
  fontSize: '0.9rem',
  outline: 'none',
};

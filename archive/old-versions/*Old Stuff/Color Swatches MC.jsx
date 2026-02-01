import React from 'react';

export default function ColorComparisonGrid() {
  const versions = [
    { name: 'V5', colors: ['blue', 'violet', 'cyan', 'pink', 'teal'] },
    { name: 'V6', colors: ['blue', 'violet', 'teal', 'pink', 'emerald'] },
    { name: 'V7', colors: ['blue', 'violet', 'emerald', 'pink', 'cyan'] },
    { name: 'V8', colors: ['blue', 'violet', 'teal', 'pink', 'cyan'] },
  ];

  const shades = {
    violet: ['#6d28d9', '#8b5cf6', '#a78bfa', '#c4b5fd'],
    teal: ['#0f766e', '#14b8a6', '#2dd4bf', '#5eead4'],
    blue: ['#1d4ed8', '#3b82f6', '#60a5fa', '#93c5fd'],
    cyan: ['#0e7490', '#06b6d4', '#22d3ee', '#67e8f9'],
    pink: ['#be185d', '#ec4899', '#f472b6', '#f9a8d4'],
    emerald: ['#047857', '#10b981', '#34d399', '#6ee7b7'],
  };

  return (
    <div style={{ background: '#000', padding: 24, minHeight: '100vh' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        {versions.map((v) => (
          <div key={v.name} style={{ background: '#0f172a', borderRadius: 16, padding: 20 }}>
            <div style={{ color: '#fff', marginBottom: 16, fontSize: 18 }}>{v.name}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {v.colors.map((color, i) => (
                <div key={i} style={{ display: 'flex', height: 32, borderRadius: 16, overflow: 'hidden' }}>
                  <div style={{ width: '25%', background: shades[color][0] }} />
                  <div style={{ width: '25%', background: shades[color][1] }} />
                  <div style={{ width: '25%', background: shades[color][2] }} />
                  <div style={{ width: '25%', background: shades[color][3] }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
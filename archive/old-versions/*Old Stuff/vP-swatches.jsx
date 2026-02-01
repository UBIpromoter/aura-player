import React from 'react';

export default function VPSwatches() {
  const colors = [
    { name: 'A - Blue',   shades: ['#93c5fd', '#60a5fa', '#3b82f6', '#2563eb'] },
    { name: 'B - Violet', shades: ['#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed'] },
    { name: 'C - Teal',   shades: ['#5eead4', '#2dd4bf', '#14b8a6', '#0d9488'] },
    { name: 'D - Cyan',   shades: ['#67e8f9', '#22d3ee', '#06b6d4', '#0891b2'] },
    { name: 'E - Pink',   shades: ['#f9a8d4', '#f472b6', '#ec4899', '#db2777'] },
  ];

  return (
    <div style={{ background: '#030712', padding: 32, minHeight: '100vh' }}>
      <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 600, marginBottom: 24 }}>vP Color Scheme</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {colors.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ color: '#9ca3af', width: 80, fontSize: 14 }}>{c.name}</span>
            <div style={{ display: 'flex', height: 40, borderRadius: 20, overflow: 'hidden', flex: 1 }}>
              {c.shades.map((shade, j) => (
                <div key={j} style={{ flex: 1, background: shade, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: j < 2 ? '#1f2937' : '#fff', fontSize: 10 }}>{shade}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
        {colors.map((c, i) => (
          <div key={i} style={{ width: 48, height: 48, borderRadius: 12, background: c.shades[2] }} />
        ))}
      </div>
    </div>
  );
}

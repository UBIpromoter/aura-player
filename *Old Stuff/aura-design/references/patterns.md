# UI Patterns

## Confidence Bar (Horizontal)
Shows vote distribution with confidence shading. High conf segments on LEFT.
```jsx
<div className={`h-4 rounded-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
  <div className="h-full flex" style={{ width: `${pct}%` }}>
    {[3,2,1,0].map(i => (
      <div key={i} style={{ width: `${segPct[i]}%`, background: shades[i] }} />
    ))}
  </div>
</div>
```

## Progress Bar (Simple)
```jsx
<div className={`flex-1 h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-300'}`}>
  <div className="h-full bg-violet-500" style={{ width: `${pct}%` }} />
</div>
```

## Progress Ring
```jsx
<svg viewBox="0 0 36 36" className="w-7 h-7 -rotate-90">
  <circle cx="18" cy="18" r="14" fill="transparent" stroke={color} strokeWidth="3"
    strokeDasharray={`${pct} ${100-pct}`} />
</svg>
```

## Confidence Dots
```jsx
<div className="flex gap-0.5">
  {[1,2,3,4].map(i => (
    <div key={i} className={`w-1.5 h-1.5 rounded-full ${
      i <= level ? 'bg-violet-400' : darkMode ? 'bg-gray-700' : 'bg-gray-300'
    }`} />
  ))}
</div>
```

## Track Badge (Binary/MC counts)
```jsx
<div className="flex">
  <button className={`w-[52px] py-1.5 rounded-l text-sm font-medium ${
    available > 0
      ? darkMode ? 'bg-emerald-900/60 text-emerald-400' : 'bg-emerald-500 text-white'
      : darkMode ? 'bg-gray-800/50 text-gray-600' : 'bg-gray-200 text-gray-400'
  }`}>{count}</button>
  <button className={/* same pattern, violet for MC */}>{count}</button>
</div>
```

## Answer Summary (After Submit)
```jsx
<div className={`py-2.5 px-3 rounded-xl ${
  darkMode ? 'bg-emerald-900/20 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'
}`}>
  <span className={darkMode ? 'text-emerald-400' : 'text-emerald-600'}>YES</span>
  <ConfidenceDots level={3} />
</div>
```

## Pending Submit (Undo Window)
```jsx
<div className="relative rounded-xl overflow-hidden">
  <div className="py-4 px-4 bg-gradient-to-r from-emerald-900/40 to-emerald-800/20">
    <span className="text-emerald-400 font-bold">YES</span>
    <span className="text-gray-500 text-xs">tap to undo</span>
  </div>
  <div className="absolute bottom-0 h-1 bg-emerald-500" style={{ animation: 'fill 2s linear' }} />
</div>
```

## Toast Notification
```jsx
<div className={`rounded-lg px-3 py-2 text-sm text-center shadow-lg ${
  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
}`}>
```

## Empty State
```jsx
<div className="flex-1 flex flex-col items-center justify-center text-center py-8">
  <div className="text-3xl mb-2">📋</div>
  <p className="text-gray-500 text-sm">No items found</p>
</div>
```

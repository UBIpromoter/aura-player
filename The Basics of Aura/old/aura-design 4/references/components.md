# Components

## Card
```jsx
<div className={`rounded-lg p-3 ${darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
```

## Button - Primary
```jsx
<button className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 rounded-lg font-medium text-sm text-white">
```

## Button - Binary Yes
```jsx
<button className={`py-5 rounded-xl font-bold text-lg ${
  active
    ? 'text-white ring-2 ring-emerald-400' // + gradient bg via style
    : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-emerald-600 border-2 border-emerald-200 shadow-sm'
}`}>
```

## Button - Binary No
```jsx
// Same pattern, swap emerald → rose
```

## Button - MC Option
```jsx
<button className={`py-3 px-4 rounded-xl text-left ${
  active
    ? 'text-white ring-2' // ring color from MC_COLORS[index], gradient bg
    : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700 border border-gray-200 shadow-sm'
}`}>
```

## Button - Secondary/Ghost
```jsx
<button className={`py-1.5 rounded-lg text-xs ${
  darkMode ? 'bg-gray-800/50 text-gray-500 hover:bg-gray-700/50' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
}`}>
```

## Toggle Switch
```jsx
<button className={`relative w-14 h-8 rounded-full ${on ? 'bg-violet-600' : darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}>
  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow ${on ? 'translate-x-7' : 'translate-x-1'}`} />
</button>
```

## Header Bar
```jsx
<div className={`h-[44px] flex items-center gap-2 px-3 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
  <button className={darkMode ? 'text-gray-400' : 'text-gray-500'}>←</button>
  <span className="font-medium flex-1">Title</span>
</div>
```

## Modal
```jsx
<div className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${darkMode ? 'bg-black/70' : 'bg-black/50'}`}>
  <div className={`rounded-xl p-4 max-w-sm w-full ${darkMode ? 'bg-gray-900' : 'bg-white shadow-xl'}`}>
```

## Filter Tabs
```jsx
<button className={`px-2.5 py-1 rounded-lg text-xs ${
  selected ? 'bg-violet-600 text-white' : darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'
}`}>
```

## List Item Row
```jsx
<div className={`w-full flex items-center gap-2 p-2 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
```

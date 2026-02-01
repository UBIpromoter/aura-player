# Aura vG Design Improvements Plan

## Overview
Enhance vF with 5 high-impact visual improvements. Each change is isolated and reversible.

---

## 1. Animated Bar Growth on Results

**Location:** `MultipleChoiceChart` component (~line 1350)

**Current:** Bars appear instantly at full width

**Change:**
- Add CSS keyframe animation `@keyframes growWidth { from { width: 0 } to { width: var(--target-width) } }`
- Apply `animation: growWidth 0.5s ease-out forwards` to bar containers
- Stagger each bar by 100ms using `animation-delay`

**Risk:** Low - CSS only, no logic changes

---

## 2. Frosted Glass Nav with Backdrop Blur

**Location:** `PhoneFrame` component header (~line 50-70)

**Current:** Solid background `bg-gray-950` or `bg-gray-100`

**Change:**
- Replace with `bg-gray-950/80 backdrop-blur-md`
- Add subtle bottom border `border-b border-white/5`
- Ensure `z-20` so content scrolls underneath

**Risk:** Low - styling only

---

## 3. Staggered List Animations

**Location:** Categories list in `screen === 'categories'` (~line 3060)

**Current:** All items appear instantly

**Change:**
- Add CSS keyframe `@keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }`
- Apply to each category row with `animation-delay: ${index * 50}ms`
- Only animate on initial render (not on every re-render)

**Risk:** Medium - need to ensure animation only runs once

---

## 4. Glow Intensity = Confidence

**Location:** Answer buttons during hold/tap (~line 3400-3500)

**Current:** Button background changes opacity with confidence

**Change:**
- Add `boxShadow` that intensifies with confidence level
- Level 1: `0 0 10px ${color}20`
- Level 2: `0 0 15px ${color}40`
- Level 3: `0 0 20px ${color}60`
- Level 4: `0 0 30px ${color}80`

**Risk:** Low - additive styling

---

## 5. Gradient Borders on Active Cards

**Location:** Question card, QOTD card, selected states

**Current:** Solid borders or no borders

**Change:**
- Add wrapper div with gradient background
- Inner div with `bg-gray-900` and small padding creates border effect
- Use `bg-gradient-to-r from-violet-500 via-blue-500 to-violet-500` for gradient
- Apply to: active question card, focused inputs

**Risk:** Medium - requires wrapper elements

---

## Implementation Order

1. **Frosted Glass Nav** (safest, immediate visual impact)
2. **Glow Intensity** (additive, no structural changes)
3. **Animated Bars** (CSS only)
4. **Staggered Lists** (needs careful state handling)
5. **Gradient Borders** (most invasive, do last)

---

## Rollback Plan

If any change breaks functionality:
1. `cp aura-player-vF-backup.jsx aura-player-vF.jsx`
2. Re-apply only working changes

---

## Testing Checklist

After each change:
- [ ] App renders without errors
- [ ] Categories screen loads
- [ ] Question screen works
- [ ] Results display correctly
- [ ] Animations don't cause jank
- [ ] Dark mode still works

# Aura Player Feature Reference

## 1. FLAGGING SYSTEM

### Two Types of Flags

**A. Question Flags (Rose/Red)** - "This question has problems"
```javascript
const QUESTION_FLAG_REASONS = ['Unclear', 'Biased', 'Duplicate', 'Inappropriate', 'Unanswerable'];
```

**B. Answer Flags (Amber)** - "I made a mistake on my answer"
```javascript
const ANSWER_FLAG_REASONS = ['Misread', 'Wrong tap', 'Changed mind', 'New info'];
```

### Implementation Pattern

Both modals use:
- Multi-select pill buttons for preset reasons
- Text input for "Other" custom reason
- Parse/serialize pattern: `reasons.join(', ')` to store, `.split(', ')` to restore

```jsx
// Storage format
questionFlags = { [questionId]: "Unclear, Biased" }
answerFlags = { [questionId]: { reason: 'user_error', explanation: "Misread, Wrong tap", timestamp } }
```

### UI Pattern
- Question flag: Small ⚑ icon in header, opens rose-themed modal
- Answer flag: Available after answering, amber-themed modal
- Both support editing existing flags

---

## 2. QUESTION EXPLANATIONS

### State Variables
```javascript
const [pendingExplanation, setPendingExplanation] = useState('');
const [showExplanationInput, setShowExplanationInput] = useState(false);
```

### Flow
1. User toggles "Explain" button → `showExplanationInput = true`
2. Text input appears above/near answer buttons
3. On submit, explanation saved with response:
```javascript
if (pendingExplanation.trim()) response.explanation = pendingExplanation.trim();
```

### Display
```jsx
{existingResponse.explanation && (
  <div className="text-xs text-gray-500 mt-1">💬 {existingResponse.explanation}</div>
)}
```

---

## 3. UNDO SYSTEM

### State Variables
```javascript
const [pendingSubmit, setPendingSubmit] = useState(null);  // { answer, confidence, community, ... }
const [justUndone, setJustUndone] = useState(false);       // Feedback state after undo
const [undoDelay, setUndoDelay] = useState(1);             // Seconds (0-3)
const submitTimeoutRef = React.useRef(null);
```

### Flow
```
User taps → submitWithConfidence() → setPendingSubmit(pending)
                                   → setTimeout(commitSubmit, undoDelay * 1000)

During undo window:
  - Shows pending answer with countdown bar
  - Tap anywhere OR Escape → cancelSubmit()

cancelSubmit():
  - clearTimeout(submitTimeoutRef)
  - Restore selection: setTappedAnswer(pendingSubmit.answer), setTapCount(pendingSubmit.confidence)
  - setPendingSubmit(null)
  - setJustUndone(true)  // Prevents immediate re-auto-submit
```

### Undo Window UI
```jsx
{pendingSubmit && (
  <div onClick={cancelSubmit}>
    {/* Answer preview */}
    <div>YES · ◆3</div>
    <span>tap to undo</span>
    {/* Filling progress bar */}
    <div style={{ animation: `fill ${undoDelay}s linear forwards` }} />
  </div>
)}
```

### Critical: justUndone State
After undo, `justUndone = true` prevents immediate re-submission. It clears when:
- User makes a new tap selection
- User navigates away
- User explicitly submits

---

## 4. TAP-ONLY CONFIDENCE (No Hold)

### Removed
- `holdProgress`, `holdingAnswer` state
- `holdStartRef`, `holdIntervalRef` refs
- All `onMouseDown`/`onMouseUp` hold tracking logic

### Current Pattern
```javascript
const handleTapEnd = (ans) => {
  if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
  
  if (tappedAnswer === ans) {
    // Same button - increment confidence (1→2→3→4, cap at 4)
    const newCount = Math.min(tapCount + 1, 4);
    setTapCount(newCount);
  } else {
    // Different button - select with confidence 1
    setTappedAnswer(ans);
    setTapCount(1);
  }
  
  // Auto-submit timeout (only in auto-submit mode)
  if (shouldAutoSubmit) {
    tapTimeoutRef.current = setTimeout(() => {
      submitWithConfidence(ans, tapCount);
    }, 500);
  }
};
```

### Right-click to Decrement (optional)
```javascript
const handleRightClick = (e, ans) => {
  e.preventDefault();
  if (tappedAnswer === ans) {
    // Decrement: 4→3→2→1→deselect
    const newCount = tapCount - 1;
    if (newCount <= 0) {
      setTappedAnswer(null);
      setTapCount(0);
    } else {
      setTapCount(newCount);
    }
  }
};
```

---

## 5. BUTTON PLACEMENTS

### Answer Zone Layout (Binary)
```
┌─────────────────────────────────────┐
│  [    YES    ]    [    NO    ]      │  Answer buttons
│   Confident          Leaning        │  Confidence labels (under each)
├─────────────────────────────────────┤
│         [  Submit  ] [↺]            │  Submit row (confirmation mode)
├─────────────────────────────────────┤
│  [Can't] [Explain] [Skip] [Save]    │  Action buttons (4-col grid)
└─────────────────────────────────────┘
```

### Answer Zone Layout (MC)
```
┌─────────────────────────────────────┐
│  [A. Option one                   ] │
│  [B. Option two              ✓ 3  ] │  Selected with confidence badge
│  [C. Option three                 ] │
│  [D. Option four                  ] │
├─────────────────────────────────────┤
│         [  Submit  ] [↺]            │  Submit row
├─────────────────────────────────────┤
│  [Can't] [Explain] [Skip] [Save]    │  Action buttons
└─────────────────────────────────────┘
```

### Action Buttons Pattern
```jsx
<div className="grid grid-cols-4 gap-2 mt-2">
  <button className="py-2 px-1 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-[11px]">
    Can't answer
  </button>
  <button className={showExplanationInput ? 'bg-violet-900/30 text-violet-400' : 'bg-gray-800/50'}>
    Explain
  </button>
  <button className="bg-gray-800/50">Skip</button>
  <button className={saved ? 'bg-amber-900/30 text-amber-400' : 'bg-gray-800/50'}>
    {saved ? '✓ Saved' : 'Save'}
  </button>
</div>
```

---

## 6. CONFIRMATION TOGGLE (⚠️ BUG DETAILS)

### State
```javascript
const [requireConfirmation, setRequireConfirmation] = useState(true);
const requireConfirmationRef = React.useRef(requireConfirmation);

// Keep ref in sync
requireConfirmationRef.current = requireConfirmation;
```

### The Problem
The toggle controls two behaviors:
1. **Show/hide Submit button** - works fine
2. **Auto-submit after tap delay** - has closure issues

### Auto-submit Logic (buggy)
```javascript
const handleTapEnd = (ans) => {
  // ...update tappedAnswer and tapCount...
  
  // BUG: This checks ref, but timeout callback may capture stale values
  const shouldAutoSubmit = !requireConfirmationRef.current && !justUndoneRef.current;
  
  if (shouldAutoSubmit) {
    const capturedAns = newTappedAnswer;
    const capturedConf = newTapCount;
    tapTimeoutRef.current = setTimeout(() => {
      // Uses ref to get current function
      submitWithConfidenceRef.current(capturedAns, capturedConf);
    }, 500);
  }
};
```

### What Goes Wrong
1. User has `requireConfirmation = true` (Submit button mode)
2. User toggles to `requireConfirmation = false` (auto-submit mode)
3. Existing tap timeout may have been scheduled with old logic
4. OR: The ref update races with the timeout check

### Correct Fix Pattern
```javascript
// Option A: Clear all timeouts when toggle changes
useEffect(() => {
  if (tapTimeoutRef.current) {
    clearTimeout(tapTimeoutRef.current);
  }
  // Reset tap state when mode changes
  setTappedAnswer(null);
  setTapCount(0);
}, [requireConfirmation]);

// Option B: Check at execution time, not schedule time
if (shouldAutoSubmit) {
  tapTimeoutRef.current = setTimeout(() => {
    // Re-check at execution time
    if (!requireConfirmationRef.current && !justUndoneRef.current) {
      submitWithConfidenceRef.current(capturedAns, capturedConf);
    }
  }, 500);
}
```

### UI Toggle
```jsx
<button 
  onClick={() => setRequireConfirmation(!requireConfirmation)}
  className={`relative w-14 h-8 rounded-full ${requireConfirmation ? 'bg-violet-600' : 'bg-gray-600'}`}
>
  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow ${
    requireConfirmation ? 'translate-x-7' : 'translate-x-1'
  }`} />
</button>
```

---

## 7. DATA MODEL

### Response Object
```javascript
{
  answer: 0,                    // Index (0=Yes/A, 1=No/B, etc.)
  confidence: 3,                // 1-4
  timestamp: 1706234567890,
  explanation?: "My reasoning", // Optional user explanation
  customAnswer?: "Other text",  // For MC "None of these" 
  cantAnswerReason?: "Unclear"  // For can't answer
}
```

### Question Object
```javascript
{
  id: 1,
  type: 'binary' | 'multiple',
  text: "Question text?",
  category: "prediction",
  options?: ["A", "B", "C", "D"],  // MC only
  preEvidence?: [
    { type: 'stat', label: 'Price', value: '$100' },
    { type: 'note', text: 'Context info' }
  ]
}
```

### Flag Objects
```javascript
// Question flags
questionFlags = { [questionId]: "Unclear, Custom reason" }

// Answer flags  
answerFlags = { 
  [questionId]: { 
    reason: 'user_error', 
    explanation: "Misread, Wrong tap", 
    timestamp: 1706234567890 
  } 
}
```

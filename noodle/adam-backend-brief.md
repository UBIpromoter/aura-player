Hey — this is Claude (Philip's AI partner on Aura). He asked me to sketch out how the backend integration might work so you can start thinking about it.

**The integration surface is small.** All backend communication in the app runs through 6 functions in one section of the code (~lines 954-1318). Everything else — the UI, the assessment flow, the visualization — is self-contained and doesn't care where data goes. When you build the backend, we'd just point these functions at your endpoints:

- `captureResponse()` — saves a question answer
- `captureAssessResponse()` — saves an assessment answer
- `syncFromCloud()` — pulls saved responses for a user
- `claimMyResponses()` — links anonymous session data to an account when someone signs up
- `exportForAI()` — packages a user's data for export
- `demoStorage` — wraps localStorage for local state

There's a Supabase connection wired up right now but it's just placeholder — nothing in there worth keeping. Start fresh.

**What the app needs from a backend:**
- User accounts — sign up, sign in, and ideally a guest mode where someone can take the test without an account and then create one to save their results
- Persistence — save answers and computed results so people can come back
- Shareable profiles — a permalink for each result so people can share their aura, and a preview image that shows up when the link gets pasted somewhere

**The scoring function** (`calculateAssessResults()`) takes answers in and produces scores — it doesn't touch anything else. You could leave it running in the browser or move it to the server, whatever makes sense for your architecture.

**Stack is totally your call.** I noticed you've been using Vercel and Neon Postgres recently so that might be a natural fit, but you know your tools.

Philip can walk through any of it in more detail. There's a code map at the top of index.html that'll orient you on the structure.

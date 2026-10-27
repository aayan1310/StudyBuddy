# StudyFlow — Project Plan

**Status:** Planning only. No application code, no installs. Nothing here is implemented.
**Revision:** 2 — adds the *Self-reported understanding in the MVP* clarification (see section 0).

---

## 0. Revision note — self-reported understanding

StudyFlow's first version is a **study tracker**, not an assessment or teaching platform. Quizzes, automatically generated assessments, teaching tools and the AI assistant belong to later phases. The MVP therefore has **no objective evidence of student ability** and must never imply it does.

What changed in this revision (all previously approved scope and exclusions are preserved):

| Area | Before | Now |
|---|---|---|
| "Topic mastery" derived from assessment results, revision history and confidence | Three overlapping ideas | **One measure: self-reported understanding**, a 1–5 rating the student enters and can update |
| Mastery categories (strong / needs reinforcement / weak / not assessed) | Presented as derived status | **Self-reported bands**: High / Medium / Low / **Not rated** — always labelled as the student's own view |
| Performance evidence | "Record whatever evidence is available" | MVP records **only** ratings, topic status and revision dates. No scores, no quizzes |
| Recommendations | Weak/declining mastery, previous performance | Low or dropping **self-rating**, time since last revision, exam dates |
| Unrated topics | Not defined | Shown as **Not rated**; never assumed strong or weak |
| Data model | Evidence implied | Rating records carry a `source` field (only `self_report` exists in the MVP) so later evidence can be *added* without reshaping data |

Rules that follow from this and apply everywhere in this document:

1. Syllabus **progress** (completion status) and **understanding** (self-rating) are separate and never merged into one score.
2. A completed topic is not assumed to be understood. A topic can be completed and rated Low.
3. Every understanding insight is worded as the student's own report ("You rated this 2/5"), never as a verified fact ("weak", "mastered", "confirmed").
4. No quizzes, question banks, teaching tools, AI-generated analysis or any other new feature is added to make up for the lack of assessment data.

---

## 1. Product overview and goals

### 1.1 What StudyFlow is
A personal academic progress tracker. It helps a student see:

- How much of the syllabus is completed, and what remains.
- Which topics they *say* they understand well and which they feel unsure about.
- What to revise, based on their own ratings and revision dates.
- How an upcoming exam compares with the syllabus still to cover.

It is a **tracking and reflection tool**. It does not teach, test or grade.

### 1.2 Goals
1. Make syllabus progress visible at topic, chapter, subject and overall level.
2. Let the student record how well they feel they understand each topic, and update it as that changes.
3. Suggest topics that may need attention, with a plain-language reason for each.
4. Show how close each exam is relative to the work remaining.
5. Stay calm, clear and easy to use on desktop and mobile.

### 1.3 Design principles
- **Honest labelling:** self-reported data is always called that.
- **Transparent rules:** every number and recommendation can be explained in one sentence and unit-tested.
- **Small scope:** the approved MVP is not widened by later stages.
- **Flexible data, no speculative features:** the data model leaves room for future evidence; no placeholder pages or unused systems are built.

### 1.4 Users and context
One student, one browser. No accounts, no sharing, no sync. Data lives on the device.

---

## 2. Approved MVP scope and explicit exclusions

### 2.1 In scope
- Dashboard: overall progress, subject navigation and detail, upcoming exams and workload.
- Syllabus tracker: subjects → chapters/units → topics, with status and progress at every level.
- Self-reported understanding ratings (1–5) per topic, kept over time.
- A simple revision record (the date a topic was revised).
- Analysis area: self-reported understanding overview, revision recommendations with reasons, list of topics not yet rated.
- Upcoming exams and workload summary.
- Browser-only persistence with validation and safe handling of bad data.
- One default theme, responsive layout, accessible design.

### 2.2 Future directions — out of scope for the MVP
- AI study assistant (planning and guidance).
- AI teaching assistant (explains and teaches concepts).
- Uploading, storing and managing notes or study resources.
- General theme customisation.
- Quizzes, assessments and any objective performance evidence.

The architecture avoids blocking these (section 10.3) but builds **nothing** for them now.

### 2.3 Explicit exclusions (not to be added without approval)
- Daily study-plan generator.
- Focus timer.
- Streaks, points, XP, badges or any gamification.
- General-purpose task manager.
- Flashcards, question banks or quiz generation.
- Social features, leaderboards, collaboration.
- Calendar integrations, notifications or reminders.
- Placeholder pages or infrastructure for future features.
- Any AI-generated analysis.
- Theme customisation or extra settings controls.
- Backend, database server, authentication, AI API.
- TypeScript.

### 2.4 Scope control
Each stage lists its own deliverables. Anything not named there is out of scope. If something seems necessary but is not listed, it is recorded in section 10 or Appendix A as a question, not built.

---

## 3. Main navigation and UI page structure

### 3.1 Navigation
Three destinations, always visible and predictable:

1. **Dashboard** (landing page)
2. **Subjects** (syllabus management and topic detail)
3. **Analysis**

Desktop: top navigation bar. Mobile: bottom tab bar with the same three items. The current page is marked with text and style, not colour alone.

URLs: `#/` dashboard, `#/subjects`, `#/subjects/:subjectId`, `#/analysis`. Browser back/forward work.

### 3.2 Dashboard
```
[ Overall progress card ]
[ Subject tabs / selector ]
[ Selected subject detail  |  Upcoming exams ]
```
- Overall progress: percentage, completed / total / remaining counts, one progress bar.
- Subject navigation: tabs (see 4.2 for what happens with many subjects).
- Subject detail: percentage, counts, chapter breakdown with topic statuses and each topic's self-reported understanding.
- Upcoming exams: list with countdown and work remaining.
- On mobile the three blocks stack in that order.

### 3.3 Subjects
- Subject list with progress.
- Selecting a subject shows its chapters and topics with editing controls, status controls, understanding rating and "Mark revised".
- Exams for the subject can be added or edited here too (also reachable from the dashboard card).

### 3.4 Analysis
Four sections, top to bottom:
1. **Understanding overview** (self-reported): counts per band per subject.
2. **Suggested for revision** — ranked list, each with its reason.
3. **Not yet rated** — completed or in-progress topics without a rating.
4. **Rating history** — opened from any topic: its list of dated ratings.

A short line at the top of the page states: *"Based on your own ratings. StudyFlow has not tested or verified your understanding."*

### 3.5 Empty states
| Situation | Message and action |
|---|---|
| No subjects | "Add your first subject to start tracking." — Add subject |
| Subject without chapters | "Add a chapter or unit to organise topics." — Add chapter |
| Chapter without topics | "No topics yet." — Add topic |
| No exams | "No upcoming exams. Add an exam date to see what's left." — Add exam |
| No ratings yet | "Rate topics you have studied to get revision suggestions." |
| No recommendations | "Nothing needs attention right now, based on your ratings and revision dates." |
| Storage unavailable | Visible notice: "Changes cannot be saved in this browser session." |

Dashboard sections with no data show an empty state, never `0%` of nothing or `NaN`.

### 3.6 Visual design
- Clean, modern, academic. Calm, restrained palette suitable for long sessions.
- Consistent cards, tabs, buttons and progress bars.
- Three **visually distinct** concepts, each with its own treatment and text label:
  - **Progress** (completion status and percentage) — bars and status badges.
  - **Understanding** (self-reported) — a small 1–5 indicator with a band label.
  - **Revision status** (suggested / last revised) — text tags with dates.
- Charts only where they clarify. The MVP uses progress bars and segmented count bars; no decorative charts.
- Readable type scale, generous spacing, no dense tables on mobile.

### 3.7 Accessibility and responsiveness
- Text contrast at least 4.5:1; focus rings visible; all controls keyboard-operable.
- Status is never colour-only: every status has text and an icon or shape.
- The rating control is a labelled radio group ("1 Not at all … 5 Very well").
- Live updates (progress changing after a status change) use a polite `aria-live` region.
- Respects `prefers-reduced-motion`.
- Layout works from 360 px wide to large desktop; touch targets at least 44 px.

### 3.8 Future theme customisation (architecture only)
All colours, spacing, radii and type sizes are CSS custom properties defined in one tokens file. Components use tokens and never hard-coded colours. This makes a later theme feature a matter of swapping token values. **No theme switcher, no settings page, no extra controls in the MVP.**

---

## 4. Feature specifications

### 4.1 Syllabus tracker
**Hierarchy:** Subject → Chapter/Unit → Topic. A topic always belongs to exactly one chapter, and a chapter to one subject. The curriculum is fully user-defined; no exam board, qualification or subject list is hard-coded.

**Capabilities**
- Create, rename, delete subjects, chapters and topics.
- Reorder subjects, chapters and topics (up/down buttons; no drag-and-drop in the MVP).
- Move a topic to another chapter **in the same subject**.
- Set topic status: **Not started**, **In progress**, **Completed**. The student can change status in any direction (for example, back from Completed).
- See progress at topic, chapter, subject and overall level.

**Behaviour**
- New topics start as Not started.
- Setting Completed records `completedOn` (today). Leaving Completed clears it.
- Deleting asks for confirmation and states what else will be removed (counts of chapters, topics, ratings, exams).
- Names are trimmed, required, 1–100 characters. A duplicate name is rejected within its parent (case-insensitive): subjects among subjects, chapters within a subject, topics within a chapter.

### 4.2 Dashboard

**A. Overall progress**
- Overall completion percentage, total topics, completed, remaining, in-progress shown separately, one progress bar.
- Calculation is defined in 6.1.
- Never labelled "mastery" or "understanding".

**B. Subject navigation and detail**
- Tabs with subject name and percentage. Selecting a tab shows that subject's detail on the same page, no page change.
- Detail: name, completion %, completed/remaining counts, chapters as collapsible groups listing topics with: status badge, self-reported understanding (rating and band, or "Not rated"), last revised date.
- "Open in Subjects" link goes to that subject's syllabus page.
- **Many subjects:** the tab row scrolls horizontally; from 7 subjects upward it collapses into a dropdown selector. An "All subjects" overview shows one compact row per subject (name, bar, percentage) instead of large cards, so the page stays scannable.

**C. Upcoming exams and workload**
- Each exam shows: subject, date, time remaining, remaining topics, and the work summary in 6.4.
- Sorted by date, soonest first. Exams that are near and have lots of syllabus left carry a text badge "Needs attention" (rule in 6.4).
- Focused on dates and workload only. No daily plan.

### 4.3 Self-reported understanding and revision record

**Understanding rating**
- Scale 1–5, asked as: *"How well do you understand this topic right now?"*
  1 Not at all · 2 A little · 3 Somewhat · 4 Mostly · 5 Very well.
- Rating is optional and available on any topic with any status.
- Updating a rating adds a dated record; the latest record is the current rating. Only one record per topic per day (a second rating the same day replaces it).
- The student can clear a topic's ratings (confirmation required), returning it to **Not rated**.
- After marking a topic Completed or revised, the UI offers an optional, dismissible "Rate your understanding" prompt. It never blocks the action.

**Revision record**
- "Mark revised" stores today's date as a revision entry for that topic (one per topic per day; removable if added by mistake).
- Last revised date = most recent revision entry.

**Separation:** setting a rating never changes completion status, and changing status never changes the rating.

### 4.4 Analysis area

**A. Understanding overview (self-reported)**
Per subject and overall: counts and a segmented bar for **High (4–5)**, **Medium (3)**, **Low (1–2)** and **Not rated**. Bands carry text labels. Not rated is its own category and is never counted as Low or High.

**B. Suggested for revision**
- A ranked list of topics with the rules in 6.3.
- Each item shows: topic, subject, current rating (or Not rated), last revised, and a **reason sentence** such as:
  - "You rated this 2/5."
  - "Your rating dropped from 4 to 3."
  - "Not revised for 21 days."
  - "Exam in 12 days."
- Quick actions: Mark revised, Update rating.
- Shows the top 10 with a "Show all" control.
- Not a timetable: no dates, no hours, no daily plan.

**C. Not yet rated**
Completed or in-progress topics with no rating, grouped by subject, each with a quick rating control. This is information, not a recommendation to revise.

**D. Rating history**
For one topic: dated list such as "9 Mar: 3 · 2 Mar: 2". Lets the student see how their own view has changed. No chart in the MVP.

### 4.5 Labelling and wording rules
- Use "you rated", "your rating", "self-reported".
- Do **not** use "mastery", "mastered", "weak", "strong", "verified", "confirmed" or "proficiency" for anything derived from ratings.
- Band names are High / Medium / Low **understanding (self-reported)**.
- Unrated topics read "Not rated".
- Recommendations are called "Suggested for revision", not "Weak topics".

---

## 5. Data model and relationships

### 5.1 Entities
All data lives in one document with normalised arrays so a backend could later store the same shapes in tables.

| Entity | Fields | Notes |
|---|---|---|
| **Subject** | `id`, `name`, `order` | |
| **Chapter** | `id`, `subjectId`, `name`, `order` | |
| **Topic** | `id`, `chapterId`, `name`, `order`, `status`, `completedOn?` | `status`: `not_started` \| `in_progress` \| `completed` |
| **UnderstandingRating** | `id`, `topicId`, `value` (1–5), `ratedOn`, `source` | `source` is always `self_report` in the MVP |
| **RevisionEntry** | `id`, `topicId`, `revisedOn` | |
| **Exam** | `id`, `subjectId`, `date`, `label?` | An exam covers the whole subject syllabus |

Document root: `{ schemaVersion, subjects, chapters, topics, ratings, revisions, exams }`.

### 5.2 Conventions
- IDs are opaque strings from `crypto.randomUUID()`.
- Calendar dates are local-date strings `YYYY-MM-DD`. No times are stored, which avoids time-zone drift.
- `order` is an integer within the parent. Reordering rewrites the siblings' order values.
- Shapes are documented with JSDoc type comments (plain JavaScript, no TypeScript).

### 5.3 Relationships and delete rules
```
Subject 1──* Chapter 1──* Topic 1──* UnderstandingRating
   │                         └──* RevisionEntry
   └──* Exam
```

| Action | Effect |
|---|---|
| Delete subject | Removes its chapters, topics, ratings, revisions and exams |
| Delete chapter | Removes its topics and their ratings and revisions |
| Delete topic | Removes its ratings and revisions |
| Add topic | Starts Not started; lowers completion percentages accordingly |
| Move topic to another chapter (same subject) | Keeps status, ratings and revisions |
| Reorder | Only changes `order` |
| Move topic to another subject | Not supported in the MVP |

Every delete shows a confirmation naming what will also be removed.

### 5.4 Extension points for future evidence
- `UnderstandingRating.source` allows future values (for example evidence from assessments) to be **added as new record types or sources** without rewriting existing data. The MVP writes and reads only `self_report`, and no UI exists for any other source.
- All derivations (bands, recommendations) live in pure functions of the form `f(data, today)`. Future evidence can be fed into those functions later without changing the screens.
- Nothing for future evidence is built now: no unused tables, fields beyond `source`, or placeholder UI.

### 5.5 Example (illustrative)
```json
{
  "schemaVersion": 1,
  "subjects":  [{ "id": "s1", "name": "Biology", "order": 0 }],
  "chapters":  [{ "id": "c1", "subjectId": "s1", "name": "Cells", "order": 0 }],
  "topics":    [{ "id": "t1", "chapterId": "c1", "name": "Cell membrane", "order": 0,
                  "status": "completed", "completedOn": "2026-03-02" }],
  "ratings":   [{ "id": "r1", "topicId": "t1", "value": 2, "ratedOn": "2026-03-09", "source": "self_report" }],
  "revisions": [{ "id": "v1", "topicId": "t1", "revisedOn": "2026-03-05" }],
  "exams":     [{ "id": "e1", "subjectId": "s1", "date": "2026-05-12", "label": "Paper 1" }]
}
```
This topic is **Completed** (progress) and **Low** self-reported understanding at the same time. They are independent.

---

## 6. Completion, understanding, revision logic

All rules are pure functions with the current date passed in (`today`), so they are deterministic and testable. All thresholds are named constants in one file (Appendix B) with no settings UI.

### 6.1 Syllabus completion
- Topic: Completed counts as 1, anything else as 0. In-progress topics are shown separately and add **nothing** to the percentage. (No partial credit: simple and explainable.)
- Chapter % = completed topics ÷ topics in chapter.
- Subject % = completed topics ÷ topics in subject (computed from topics, not an average of chapter percentages).
- **Overall % = total completed topics ÷ total topics across all subjects** (topic-weighted). Aggregation note: a subject with many topics influences the overall figure more. Per-subject percentages sit next to it for a balanced view. The counts shown (completed / total / remaining) always reconcile with the percentage.
- Zero topics → show "No topics yet", never `0%` or `NaN`.
- Display rounding: round to the nearest whole percent, except that a value above 0 never displays as 0%, and a value below 100 never displays as 100%.

### 6.2 Self-reported understanding bands
| Latest rating | Band label |
|---|---|
| 4–5 | High (self-reported) |
| 3 | Medium (self-reported) |
| 1–2 | Low (self-reported) |
| none | Not rated |

The current rating is the most recent record by `ratedOn`. There is no averaging and no combination with completion status.

### 6.3 Revision suggestions
**Inputs:** latest and previous rating, topic status, last revised date, completion date, nearest upcoming exam of the topic's subject, today.

**Eligibility:** a topic is considered only if its status is **In progress** or **Completed**. Not-started topics are remaining syllabus, not revision.

**Last studied date** = the later of last revised date and `completedOn`.

**Stale** means:
- Completed topic: days since last studied ≥ `STALE_DAYS` (14).
- In-progress topic: it has at least one revision entry, and days since the last revision ≥ `STALE_DAYS`. (An in-progress topic never revised is not suggested merely for being unrevised.)

**Declining** means: the latest rating is at least 1 lower than the previous rating (from a different day), and the latest rating is 3 or lower.

**Exam soon** means: the subject has an exam 0–`EXAM_NEAR_DAYS` (30) days away.

**Ranking tiers** (earlier tier ranks higher):

| Tier | Condition | Reason text |
|---|---|---|
| 1 | Rating ≤ 2 **and** exam soon | "You rated this 2/5. Exam in 12 days." |
| 2 | Rating ≤ 2 | "You rated this 2/5." |
| 3 | Declining | "Your rating dropped from 4 to 3." |
| 4 | Stale and rating = 3 | "Rated 3/5. Not revised for 21 days." |
| 5 | Stale and not rated | "Not rated. Not revised for 21 days." |
| 6 | Stale and rating 4–5 | "Rated 5/5, but not revised for 30 days." |

**Ties within a tier:** nearer exam first, then lower rating, then older last-studied date, then topic name (so the order is stable). A topic that matches several tiers is listed once, at its highest tier, with all matching reasons shown. Exam proximity is appended to any reason when it applies.

No numeric score is displayed. Every suggestion has at least one reason; a topic without a reason is not listed.

### 6.4 Exam workload
For each exam with a date on or after today:
- **Time remaining:** whole calendar days (local), shown as "in N days", "tomorrow" or "today".
- **Remaining topics:** topics in the subject whose status is not Completed, with counts of In progress and Not started.
- **Remaining share:** remaining ÷ total topics in the subject.
- **Self-reported summary:** number of the subject's topics rated Low, and number of started topics Not rated.
- **Pace figure:** "about N topics per week to finish before this exam" = remaining ÷ weeks left, rounded up, shown only when days ≥ 1 and remaining > 0. This is arithmetic, not a plan.
- **Needs attention** badge when days ≤ `EXAM_NEAR_DAYS` (30) **and** remaining share ≥ `ATTENTION_REMAINING_SHARE` (50%).
- Exams whose date has passed leave the Upcoming list and appear as "Past" in the subject's exam list.
- A subject with zero topics: "No syllabus topics to track yet."

### 6.5 Missing, incomplete or contradictory information
| Situation | Behaviour |
|---|---|
| Topic never rated | Shown as Not rated; not Low, not High |
| Completed topic rated Low | Allowed; shown as Completed + Low; may be suggested |
| Not-started topic rated | Allowed; shown but not eligible for revision suggestions |
| Status moved back from Completed | `completedOn` cleared; ratings and revisions kept |
| Exam date in the past | Treated as past, not as an error |
| Exam for a subject with no topics | Shown with "No syllabus topics" message |
| Revision date earlier than completion date | Accepted (the student may have pre-read); stale logic uses the later date |
| Rating history with one entry | No "declining" suggestion possible; uses the single rating |
| Saved data contains orphan records (for example a topic whose chapter is missing) | Dropped on load and reported in a dismissible notice with a count |
| Unknown or invalid values | Rejected on load, never guessed |

---

## 7. Technical architecture and storage approach

### 7.1 Stack
- **React** (function components, hooks), **JavaScript** (no TypeScript), **CSS** (plain CSS with custom properties).
- Runs entirely in the browser. No server, database server, authentication or AI API.
- Build tooling: **Vite** with the React plugin (needed to develop and build a React app).

### 7.2 Dependencies (to be approved at the stage that needs them)
| Package | Purpose | Stage | Needs approval |
|---|---|---|---|
| react, react-dom | UI | 1 | Yes (baseline) |
| vite, @vitejs/plugin-react | Dev server and build | 1 | Yes (baseline) |
| react-router-dom | Hash routes, back/forward navigation | 1 | Yes — alternative is a small in-house hash-router hook |
| vitest, jsdom, @testing-library/react, @testing-library/user-event | Tests | 1 | Yes |
| ESLint | Linting | 1 | Yes |

Not needed and not planned: chart libraries, date libraries (native `Date` is enough for calendar-day math), UI kits, state libraries, ID libraries, TypeScript.

### 7.3 Proposed structure
```
studyflow/
├─ PLAN.md
├─ src/
│  ├─ app/            App shell, routes, state provider
│  ├─ domain/         Pure logic: progress, understanding, recommendations, exams, dates, validation
│  ├─ storage/        Repository (load/save), schema version, migrations
│  ├─ features/       dashboard/, subjects/, analysis/, exams/
│  ├─ components/     ProgressBar, StatusBadge, RatingInput, EmptyState, ConfirmDialog…
│  └─ styles/         tokens.css, base.css, component styles
└─ tests/ (or colocated *.test.js)
```
UI components never contain calculation logic; they call `domain/` functions. `domain/` and `storage/` import nothing from React.

### 7.4 State
One in-memory state tree loaded at start, held in React context with `useReducer`. Actions are named and testable (`topic/add`, `topic/setStatus`, `rating/set`, …). After each change the new state is passed to the storage repository.

### 7.5 Storage approach
- **localStorage**, one versioned JSON document under a single key. Reason: the data is small (a heavy user is well under 1 MB), the API is simple, and no schema or async layer is needed. IndexedDB is not required for the MVP.
- The app talks only to a repository with `load()` and `save(state)`. Swapping in a backend later changes that file, not the screens.
- Loading: parse → check `schemaVersion` → migrate if older → validate every record (6.5) → drop orphans with a notice.
- Corrupt or unreadable data: **do not overwrite it.** Keep the raw text under a backup key, show a clear message, and offer "Start empty" (the backup stays).
- Storage unavailable or full: keep working in memory, show a persistent notice that changes will not survive a reload.
- Another tab changing the data: listen to the `storage` event and reload state. Rule: last write wins.

### 7.6 Limitations of browser storage (documented for the student)
- Data exists only in this browser on this device. Other devices and browsers do not see it.
- Clearing site data, using private windows, or some browser clean-ups can erase it.
- About 5 MB limit per site (far more than needed).
- No built-in backup, export or sync. **Export/import is not in the approved MVP**; it is raised as an open question in Appendix A because of the data-loss risk.

### 7.7 Backend-ready seams (not implemented)
Normalised arrays with stable IDs, a repository interface, pure domain functions and `source` on ratings. Introducing a backend later should require replacing the repository and adding authentication, not rewriting the domain or the screens.

---

## 8. Staged implementation roadmap

Rules for every stage: define the goal first; list the files or areas that change; keep changes within the stage; run tests; review before the next stage; focused, descriptive Git commits. No stage may add features from section 2.3.

### Stage 1 — Project foundation
- **Goal:** runnable app shell with navigation, tokens, data model and basic persistence.
- **Depends on:** approval of baseline dependencies (7.2).
- **Areas:** project scaffold, `app/`, `styles/`, `domain/model` (JSDoc types), `storage/` (basic save/load), test setup.
- **Behaviour:** three routes (Dashboard, Subjects, Analysis) with empty-state placeholders; default theme tokens; state provider; saves and restores an empty document.
- **Acceptance:** app starts; navigation and back/forward work; reload preserves state; tokens used for all colours; lint and test commands run.
- **Tests:** repository save/load round-trip; route rendering.

### Stage 2 — Subjects and syllabus management
- **Goal:** build the curriculum.
- **Depends on:** 1.
- **Areas:** `features/subjects/`, reducers, validation, `ConfirmDialog`.
- **Behaviour:** create/rename/delete/reorder subjects, chapters and topics; move a topic between chapters in the same subject; validation per 4.1; delete confirmations with counts; empty states.
- **Acceptance:** all CRUD flows work by mouse and keyboard; duplicates and empty names rejected; cascade deletes match 5.3; data survives reload.
- **Tests:** reducer tests for cascades and reordering; validation tests; component tests for add/delete flows.

### Stage 3 — Progress tracking
- **Goal:** statuses and completion maths.
- **Depends on:** 2.
- **Areas:** `domain/progress`, `StatusBadge`, `ProgressBar`, dashboard overall card.
- **Behaviour:** set topic status; `completedOn` handling; percentages per 6.1; overall card per 4.2A.
- **Acceptance:** percentages correct for mixed-size subjects; zero-topic and rounding cases behave as specified; status never colour-only.
- **Tests:** unit tests for 6.1 including rounding clamps and zero topics.

### Stage 4 — Self-reported understanding and revision record
- **Goal:** record how the student feels about each topic and when they revised it.
- **Depends on:** 2, 3.
- **Areas:** `domain/understanding`, `RatingInput`, topic row actions, rating and revision reducers.
- **Behaviour:** 1–5 rating with the specified wording; one record per topic per day; clear ratings; "Mark revised" with undo; optional dismissible rating prompt after completion or revision; band labels per 6.2; Not rated shown explicitly.
- **Acceptance:** rating does not change status and vice versa; unrated topics read "Not rated"; ratings are changeable; labels follow 4.5.
- **Tests:** band mapping; same-day replacement; clear ratings; separation of status and rating.

### Stage 5 — Dashboard subject details
- **Goal:** subject navigation and detailed progress.
- **Depends on:** 3, 4.
- **Areas:** `features/dashboard/`.
- **Behaviour:** subject tabs with horizontal scroll and dropdown fallback from 7 subjects; "All subjects" compact overview; subject detail with chapters, statuses, understanding and last revised; link to Subjects.
- **Acceptance:** switching subjects causes no page change; 20 subjects stay scannable; detail shows progress and self-reported understanding as visually separate things.
- **Tests:** component tests for tab/dropdown switching and empty states.

### Stage 6 — Upcoming exams
- **Goal:** exam dates and workload.
- **Depends on:** 3, 4.
- **Areas:** `domain/exams`, `features/exams/`, dashboard exams card, date utilities.
- **Behaviour:** add/edit/delete exams (date required, optional label); countdown; workload per 6.4; "Needs attention" badge; past exams handled.
- **Acceptance:** countdown correct across month ends and DST changes; today/tomorrow wording; exam with no topics handled.
- **Tests:** date maths with injected `today`; attention rule boundaries.

### Stage 7 — Analysis
- **Goal:** self-reported understanding overview and revision suggestions.
- **Depends on:** 4, 6.
- **Areas:** `domain/recommendations`, `features/analysis/`.
- **Behaviour:** overview per 4.4A; suggestions per 6.3 with reason sentences and quick actions; Not yet rated list; rating history; the self-report statement on the page.
- **Acceptance:** each tier and tie-break behaves as specified; every item shows a reason; Not rated is never counted as Low; wording follows 4.5; no timetable appears.
- **Tests:** one test per tier; tie-breaks; "listed once with multiple reasons"; eligibility (not-started excluded); stale rules for in-progress topics.

### Stage 8 — Persistence hardening and validation
- **Goal:** robust handling of bad or missing data.
- **Depends on:** all above.
- **Areas:** `storage/`, `domain/validation`, notices.
- **Behaviour:** schema version and migration scaffold; validation on load per 6.5; corrupt-data backup and recovery message; storage-unavailable and full notices; cross-tab `storage` event.
- **Acceptance:** corrupt JSON never loses the original text; orphans dropped with a visible notice; app usable with storage disabled.
- **Tests:** corrupt, orphan, wrong-version and quota-exceeded cases using a fake storage.

### Stage 9 — Polish and verification
- **Goal:** quality pass; MVP sign-off.
- **Depends on:** 1–8.
- **Areas:** styles, accessibility fixes, docs.
- **Behaviour:** responsive review 360 px–desktop; keyboard and screen-reader checks; contrast checks; copy review against 4.5; README with usage and storage limitations.
- **Acceptance:** section 9.3 checklist all pass; no excluded feature present.
- **Tests:** full suite passes; manual checklists completed and recorded.

---

## 9. Acceptance criteria and testing strategy

### 9.1 Global acceptance criteria
1. Completion and understanding are shown separately everywhere; no combined score exists.
2. Unrated topics always read "Not rated".
3. Every understanding-based statement is worded as self-reported (4.5).
4. Every suggestion has a stated reason.
5. No feature from section 2.3 is present.
6. Data survives reload; bad data never causes a crash or silent data loss.
7. All pages work on desktop and mobile and by keyboard.

### 9.2 Testing strategy
- **Unit tests (most coverage):** every function in `domain/` — completion, rounding, bands, tiers, tie-breaks, date maths, validation. `today` is always injected.
- **Storage tests:** fake storage for round-trip, migration, corrupt, orphans, quota.
- **Component tests:** key flows — add subject/chapter/topic, change status, rate, mark revised, add exam, empty states.
- **Manual checks per stage:** a short script in the stage review.
- **Accessibility:** keyboard-only walkthrough, screen-reader spot check, colour-contrast check, status-not-colour-only check.
- **Responsive:** 360 px, 768 px and ≥1280 px.
- Test data: a small fixture set covering many subjects, unrated topics, completed-but-Low topics and past exams.

### 9.3 Final verification checklist
- [ ] All nine stages' acceptance criteria met.
- [ ] Test suite green; no skipped tests without a recorded reason.
- [ ] Copy review finds none of the forbidden words (4.5) used for ratings.
- [ ] A completed topic rated Low appears as completed and Low, and is suggested for revision with its reason.
- [ ] Empty state for every section.
- [ ] Storage-disabled and corrupt-data paths verified.
- [ ] README states storage limitations.

---

## 10. Risks, limitations and future extension points

### 10.1 Risks and limitations
| Risk | Mitigation |
|---|---|
| Self-ratings can be inaccurate (over- or under-confident) | Always labelled self-reported; rating history shown; no claim of verification |
| Students may not rate topics, leaving most Not rated | Optional non-blocking prompt and a Not yet rated list; no gamified pressure |
| Browser data can be lost (cleared storage, private mode) | Clear notice and README; recovery on corrupt data; **export/import raised for decision (Appendix A)** |
| Fixed thresholds (14 and 30 days) may not suit everyone | Named constants in one file; adjustable by developers; no settings UI in MVP |
| "Topics per week" pace may be read as a study plan | Worded as arithmetic; no schedule is produced |
| Scope creep from later stages | Stage deliverables are closed lists; exclusions in 2.3 |
| Time-zone and DST date errors | Dates stored as local calendar strings; day maths done in one tested utility |
| Single-user, single-device | Stated limitation |

### 10.2 Limitations by design
- No objective measure of ability exists in the MVP.
- No sync, accounts or multi-device use.
- No drag-and-drop, bulk import, or syllabus templates.

### 10.3 Future extension points (nothing built now)
- **Evidence beyond self-report:** the `source` field and the pure derivation functions allow later phases to add assessment-based evidence beside self-reports.
- **Backend:** replace the storage repository; the data is already normalised with stable IDs.
- **Notes and resources, AI assistants:** would add new features and data types; the feature folders and routes allow this without restructuring.
- **Theme customisation:** swap token values (3.8).
- **Export/import or backup:** would be a new feature needing approval.

---

## 11. Definition of a finished MVP

The MVP is finished when a student can, in a browser with no account:

1. Build their own syllabus of subjects, chapters and topics and mark each topic Not started, In progress or Completed.
2. See completion at topic, chapter, subject and overall level on a clear dashboard, switching between subjects without leaving it.
3. Rate their understanding of any topic from 1 to 5, update it later, and see **Not rated** when they have not.
4. Record when they revised a topic.
5. Enter exam dates and see time remaining, remaining topics and a short workload summary, with near exams that have a lot left flagged.
6. Open an Analysis page with a self-reported understanding overview and a ranked list of topics suggested for revision, each with a plain-language reason.
7. Reload or return later and find everything saved, with clear messages if saving is not possible or data is damaged.

…while nothing in the application claims their understanding has been tested or verified, and none of the excluded features exist.

---

## Appendix A — Assumptions and open questions for approval

These were not decided in the brief. The plan states the assumption instead of inventing a larger feature.

| # | Assumption in this plan | Alternative / question |
|---|---|---|
| A1 | Chapter is required between subject and topic | Allow topics directly under a subject? |
| A2 | An exam covers the whole subject syllabus | Allow an exam to cover only chosen chapters? |
| A3 | One rating scale, named **understanding** (1–5); "confidence" is not a separate concept | Keep a separate confidence rating later when evidence exists? |
| A4 | Thresholds: 14 stale days, 30 exam-near days, 50% remaining share | Adjust values |
| A5 | `react-router-dom` for routes | Small in-house hash-router hook instead |
| A6 | `source` field on ratings as the only future-evidence hook | Remove it and migrate later |
| A7 | localStorage, no export or import | Add export/import as an approved backup feature (data-loss risk) |
| A8 | Reordering by buttons, not drag-and-drop | Approve drag-and-drop later |
| A9 | Optional exam `label` field (for example "Paper 1") so two exams in one subject can be told apart | Drop the label |
| A10 | The existing `PLAN.md` was not available when this revision was written; this document consolidates the original brief and the clarification | Merge any extra decisions from the earlier file |
| A11 | Tiers 5 and 6 (stale but unrated, or stale but rated High) are included so nothing is silently ignored; the list is capped at 10 with "Show all". After two weeks, many completed topics could qualify | Drop tier 6, or raise `STALE_DAYS` for High-rated topics, if the list proves noisy |
| A12 | The stage order was refined from the brief's suggestion: ratings and revision record became their own Stage 4 so the Dashboard and Analysis have data to show, and persistence hardening is Stage 8 (basic saving already exists from Stage 1) | Keep the brief's original eight-stage order |

## Appendix B — Named constants (one file, no UI)

| Constant | Default | Used for |
|---|---|---|
| `RATING_MIN` / `RATING_MAX` | 1 / 5 | Rating scale |
| `LOW_MAX` | 2 | Upper rating for Low |
| `HIGH_MIN` | 4 | Lower rating for High |
| `STALE_DAYS` | 14 | Not revised recently |
| `EXAM_NEAR_DAYS` | 30 | Exam soon; Needs attention |
| `ATTENTION_REMAINING_SHARE` | 0.5 | Needs attention |
| `SUGGESTIONS_SHOWN` | 10 | Initial suggestion list length |
| `MANY_SUBJECTS` | 7 | Tabs switch to dropdown |
| `NAME_MAX_LENGTH` | 100 | Names |
# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.

## #4471, split

#4471 merged every date report into one ticket. It holds three problems, each with its own
ticket in this repo:

- [#1](https://github.com/fireboltdude1357/mega-s01e03-what-it-shows/issues/1) `parser`: the shared parser reads day-first dates month first. Fixed.
- [#2](https://github.com/fireboltdude1357/mega-s01e03-what-it-shows/issues/2) `hint`: the booking-v3 form tells day-first tenants to type `MM/DD/YYYY`. Won't fix, the form is retired.
- [#3](https://github.com/fireboltdude1357/mega-s01e03-what-it-shows/issues/3) `one-day`: bookings move by one day, likely a time zone conversion. Closed with no fix.

The page is `src/routes/kb/incidents/4471/split/+page.svx`. Its counts come from
`src/lib/kb/problems.ts` at build time. The desk sees it at
<https://fireboltdude1357.github.io/mega-s01e03-what-it-shows/kb/incidents/4471/split/>.

To build: `pnpm install && pnpm build` (output in `build/`). `scripts/publish.sh` builds for GitHub Pages.

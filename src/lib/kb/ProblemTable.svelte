<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import filed from '#lib/data/tickets-4471.json';
  import type { Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  import { splitTicket, type Problem } from '#lib/kb/problems';

  let { ticket }: { ticket: number } = $props();

  const split = $derived(splitTicket(reports as Report[], ticket, tenantOf, notes.oneDayMove));
  type Filed = { issue: number; outcome: string; by: string };
  const filedFor = (p: Problem): Filed | undefined => (filed.tickets as Record<string, Filed | undefined>)[p];
  const count = (p: Problem) => split.groups.find((g) => g.problem === p)?.reports.length ?? 0;
  const tags = (t: Record<string, number>) =>
    Object.entries(t)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, n]) => `${tag} ×${n}`)
      .join(' · ');
</script>

<p class="sum">
  <strong>{split.merged.length}</strong> reports in #{ticket} ({split.rows} export rows, {split.rows - split.merged.length} of them repeats) ·
  <strong>{split.groups.length}</strong> problems
</p>

<table>
  <thead>
    <tr><th>problem</th><th>reports</th><th>intake tagged them</th><th>tenants</th><th>seen</th><th>ticket</th><th>outcome</th></tr>
  </thead>
  <tbody>
    {#each split.groups as g (g.problem)}
      <tr>
        <td><code>{g.problem}</code></td>
        <td><strong>{g.reports.length}</strong></td>
        <td class="tags">{tags(g.taggedAs)}</td>
        <td>{g.tenants}</td>
        <td>{g.firstSeen} → {g.lastSeen}</td>
        {#if filedFor(g.problem)}
          {@const f = filedFor(g.problem)!}
          <td><a href="{filed.repo}/issues/{f.issue}">#{f.issue}</a></td>
          <td class="outcome {f.outcome.replace(/\W+/g, '-')}"><b>{f.outcome}</b><br /><span class="by">{f.by}</span></td>
        {:else}
          <td><span class="none">no ticket yet</span></td>
          <td></td>
        {/if}
      </tr>
    {/each}
  </tbody>
</table>

{#if count('one-day') && count('parser')}
  <p class="note">
    The #4471 table files the <code>one-day</code> reports under <code>parser</code> by tenant. Counted that way,
    <code>parser</code> holds {count('parser') + count('one-day')}.
  </p>
{/if}

<style>
  .sum { font-size: 1.1rem; }
  .tags { color: var(--muted); font-size: 0.85em; }
  .none { color: var(--warn); font-weight: 600; }
  .note { color: var(--muted); font-size: 0.85em; }
  .by { color: var(--muted); font-size: 0.85em; }
  .outcome.fixed b { color: var(--accent); }
  .outcome.won-t-fix b, .outcome.no-fix b { color: var(--warn); }
</style>

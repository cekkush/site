'use client';

import {useEffect, useMemo, useState} from 'react';
import {useLocale} from 'next-intl';
import {cn} from '@/lib/utils';
import {site} from '@/lib/site';
import {Button} from '@/components/ui/Button';
import {
  budgets,
  currentSystems,
  goals as goalOptions,
  integrations,
  services,
  sizes,
  sphereById,
  spheres,
  urgencies,
} from '@/lib/configurator/catalog';
import {
  activities,
  activitiesForNiche,
  activityById,
  activityGroupLabels,
  nicheById,
  niches,
  nicheGroupLabels,
  subQuestions,
} from '@/lib/configurator/axes';
import {
  emptySelections,
  pick,
  type Selections,
  type SubOption,
  type SubQuestion,
  type Tier,
} from '@/lib/configurator/types';
import {estimate} from '@/lib/configurator/estimate';
import {encodeSelections} from '@/lib/configurator/encode';
import {submitLead, type SubmitResult} from '@/lib/configurator/submit';
import {CURRENCY} from '@/lib/configurator/config';
import {
  ChoiceCard,
  Field,
  Icon,
  NumberStepper,
  OptionRow,
  Pill,
  ProgressBar,
} from './parts';
import {LiveSummary, Proposal} from './Proposal';

const STORAGE = 'sarqsoft.configurator.v2';

export function Configurator() {
  const locale = useLocale();
  const T = (az: string, en: string) => (locale === 'en' ? en : az);

  const [sel, setSel] = useState<Selections>(emptySelections);
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [proposalUrl, setProposalUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.sel) setSel({...emptySelections(), ...data.sel});
        if (typeof data.step === 'number') setStep(data.step);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE, JSON.stringify({sel, step}));
    } catch {
      /* ignore */
    }
  }, [sel, step, hydrated]);

  const est = useMemo(() => estimate(sel), [sel]);

  /* ---- mutators ---- */
  const update = (patch: Partial<Selections>) => setSel((s) => ({...s, ...patch}));

  const toggleArr = (field: 'goals' | 'integrations' | 'services', id: string) =>
    setSel((s) => {
      const has = s[field].includes(id);
      return {
        ...s,
        [field]: has ? s[field].filter((x) => x !== id) : [...s[field], id],
      };
    });

  const toggleSphere = (id: string) =>
    setSel((s) => {
      const has = s.spheres.includes(id);
      const modIds = sphereById.get(id)?.modules.map((m) => m.id) ?? [];
      if (has) {
        return {
          ...s,
          spheres: s.spheres.filter((x) => x !== id),
          modules: s.modules.filter((m) => !modIds.includes(m)),
        };
      }
      return {
        ...s,
        spheres: [...s.spheres, id],
        modules: Array.from(new Set([...s.modules, ...modIds])),
      };
    });

  const toggleModule = (id: string) =>
    setSel((s) => {
      const has = s.modules.includes(id);
      const modules = has ? s.modules.filter((x) => x !== id) : [...s.modules, id];
      let spheresArr = s.spheres;
      if (!has) {
        const parent = spheres.find((sp) => sp.modules.some((m) => m.id === id));
        if (parent && !spheresArr.includes(parent.id))
          spheresArr = [...spheresArr, parent.id];
      }
      return {...s, modules, spheres: spheresArr};
    });

  // Axis B (niche, single) — picking a niche prunes activities that don't fit
  // it and rebuilds the preset; a sensible primary activity is auto-selected.
  const selectNiche = (id: string) =>
    setSel((s) => {
      if (s.niche === id) {
        return {...s, niche: undefined, ...derivePreset(s.activities, undefined)};
      }
      const compat = activitiesForNiche(id);
      let nextActivities = s.activities.filter((a) => compat.includes(a));
      if (nextActivities.length === 0 && compat.length) nextActivities = [compat[0]];
      return {...s, niche: id, activities: nextActivities, ...derivePreset(nextActivities, id)};
    });

  // Axis A (activities, multi) — each toggle rebuilds the merged preset so the
  // scope is always the union of every chosen operating model + the niche.
  const toggleActivity = (id: string) =>
    setSel((s) => {
      const has = s.activities.includes(id);
      const nextActivities = has
        ? s.activities.filter((x) => x !== id)
        : [...s.activities, id];
      return {...s, activities: nextActivities, ...derivePreset(nextActivities, s.niche)};
    });

  // smart sub-question — each option toggles concrete module ids
  const subSelected = (opt: SubOption) =>
    opt.modules.length > 0 && opt.modules.every((id) => sel.modules.includes(id));

  const toggleSubOption = (q: SubQuestion, opt: SubOption) =>
    setSel((s) => {
      const has = opt.modules.every((id) => s.modules.includes(id)) && opt.modules.length > 0;
      let modules = s.modules;
      if (!q.multi && !has) {
        const others = q.options.filter((o) => o.id !== opt.id).flatMap((o) => o.modules);
        modules = modules.filter((m) => !others.includes(m));
      }
      modules = has
        ? modules.filter((m) => !opt.modules.includes(m))
        : Array.from(new Set([...modules, ...opt.modules]));
      const chosen = s.subAnswers[q.id] ?? [];
      const nextChosen = has
        ? chosen.filter((x) => x !== opt.id)
        : q.multi
          ? Array.from(new Set([...chosen, opt.id]))
          : [opt.id];
      const spheresArr =
        !has && !s.spheres.includes(q.sphere) ? [...s.spheres, q.sphere] : s.spheres;
      return {
        ...s,
        modules,
        spheres: spheresArr,
        subAnswers: {...s.subAnswers, [q.id]: nextChosen},
      };
    });

  const addRecommendedServices = () =>
    setSel((s) => ({
      ...s,
      services: Array.from(
        new Set([...s.services, ...services.filter((x) => x.recommended).map((x) => x.id)]),
      ),
    }));

  /* ---- steps ---- */
  const steps = [
    {id: 'niche', title: T('Fəaliyyət istiqaməti', 'Industry / niche'), sub: T('Hansı sahədəsiniz? Bir seçim — yalnız uyğun fəaliyyət növləri təklif olunur.', 'Which industry are you in? One pick — only sensible operating models are then offered.')},
    {id: 'activity', title: T('Necə işləyirsiniz?', 'How you operate'), sub: T('Biznes model(lər)iniz — bir neçəsini seçə bilərsiniz (məs. istehsal + pərakəndə).', 'Your operating model(s) — pick one or more (e.g. manufacturing + retail).')},
    {id: 'profile', title: T('Şirkət profili', 'Company profile'), sub: T('Bir neçə sual həllin miqyasını dəqiqləşdirir.', 'A few questions to size the solution.')},
    {id: 'spheres', title: T('Avtomatlaşdırma sahələri', 'Areas to automate'), sub: T('Hansı istiqamətləri əhatə edək?', 'Which directions should we cover?')},
    {id: 'modules', title: T('Modulları dəqiqləşdirin', 'Refine the modules'), sub: T('Seçilmiş sahələr üzrə dəqiq funksiyalar.', 'Exact functions within the chosen areas.')},
    {id: 'details', title: T('Dəqiqləşdirici suallar', 'Refining questions'), sub: T('Bir neçə “ağıllı” sual həlli dəqiq sizə uyğunlaşdırır.', 'A few smart questions tailor the solution precisely.')},
    {id: 'integrations', title: T('İnteqrasiyalar', 'Integrations'), sub: T('Hansı xarici sistemlərlə bağlanaq?', 'Which external systems to connect?')},
    {id: 'services', title: T('Tətbiq xidmətləri', 'Implementation services'), sub: T('Bizdən hansı işləri istəyirsiniz?', 'Which work do you want from us?')},
    {id: 'project', title: T('Layihə parametrləri', 'Project parameters'), sub: T('Müddət və büdcə.', 'Timeline and budget.')},
    {id: 'contact', title: T('Əlaqə və kommersiya təklifi', 'Contact & proposal'), sub: T('Kommersiya təklifini formalaşdıraq və sizə göndərək.', 'Let’s generate and send your proposal.')},
  ];

  const canNext = useMemo(() => {
    switch (steps[step].id) {
      case 'activity':
        return sel.activities.length > 0;
      case 'profile':
        return Boolean(sel.size);
      case 'spheres':
        return sel.spheres.length > 0;
      case 'modules':
        return sel.modules.length > 0;
      case 'contact':
        return Boolean(
          sel.contact.company &&
            sel.contact.name &&
            (sel.contact.email || sel.contact.phone),
        );
      default:
        return true;
    }
  }, [step, sel, steps]);

  const progress = done ? 1 : step / steps.length;

  async function finish() {
    setSubmitting(true);
    const code = encodeSelections(sel);
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
    const url = `${window.location.origin}${base}/${locale}/proposal?c=${code}`;
    setProposalUrl(url);
    const r = await submitLead(sel, est, locale, url);
    setResult(r);
    setSubmitting(false);
    setDone(true);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  function next() {
    if (step === steps.length - 1) {
      finish();
      return;
    }
    setStep((s) => Math.min(steps.length - 1, s + 1));
    if (typeof window !== 'undefined') window.scrollTo({top: 80, behavior: 'smooth'});
  }
  function back() {
    setDone(false);
    setStep((s) => Math.max(0, s - 1));
  }
  function resetAll() {
    setSel(emptySelections());
    setStep(0);
    setDone(false);
    setResult(null);
    try {
      localStorage.removeItem(STORAGE);
    } catch {
      /* ignore */
    }
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(proposalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  if (!hydrated) {
    return (
      <div className="container-x py-32 text-center text-slate">{T('Yüklənir…', 'Loading…')}</div>
    );
  }

  /* ---------- DONE: proposal + actions ---------- */
  if (done) {
    const waText = encodeURIComponent(
      `${T('Salam! Şərq Soft saytında özüm üçün kommersiya təklifi hazırladım:', 'Hi! I built a proposal on the Şərq Soft site:')}\n${proposalUrl}`,
    );
    return (
      <div className="container-x py-12">
        <div className="no-print mx-auto mb-8 max-w-4xl">
          <div
            className={cn(
              'rounded-2xl border p-5',
              result?.ok
                ? 'border-emerald-400/30 bg-emerald-400/[0.06]'
                : 'border-gold/30 bg-gold/[0.05]',
            )}
          >
            <p className="font-display text-lg text-ink">
              {result?.ok
                ? T('Təklifiniz hazırdır və bizə göndərildi ✓', 'Your proposal is ready and sent to us ✓')
                : T('Təklifiniz hazırdır 🎉', 'Your proposal is ready 🎉')}
            </p>
            <p className="mt-1 text-[14px] text-mist">
              {result?.ok
                ? T('Tezliklə sizinlə əlaqə saxlayacağıq. Kommersiya təklifini yükləyə və ya saxlaya bilərsiniz.', 'We’ll contact you shortly. You can download or save the proposal.')
                : T('Kommersiya təklifini yükləyin, linki saxlayın və ya birbaşa bizə göndərin.', 'Download it, keep the link, or send it straight to us.')}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-full bg-gradient-to-b from-gold-soft via-gold to-amber px-5 py-2.5 text-sm font-semibold text-night"
              >
                {T('PDF yüklə', 'Download PDF')}
              </button>
              <button
                type="button"
                onClick={copyLink}
                className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm text-ink hover:border-gold/50"
              >
                {copied ? T('Kopyalandı ✓', 'Copied ✓') : T('Linki kopyala', 'Copy link')}
              </button>
              <a
                href={`${site.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm text-ink hover:border-gold/50"
              >
                {T('WhatsApp ilə göndər', 'Send via WhatsApp')}
              </a>
              <button
                type="button"
                onClick={() => setDone(false)}
                className="rounded-full px-5 py-2.5 text-sm text-mist hover:text-ink"
              >
                {T('Düzəliş et', 'Edit choices')}
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="rounded-full px-5 py-2.5 text-sm text-slate hover:text-ink"
              >
                {T('Yenidən başla', 'Start over')}
              </button>
            </div>
          </div>
        </div>
        <Proposal sel={sel} est={est} locale={locale} />
      </div>
    );
  }

  /* ---------- WIZARD ---------- */
  return (
    <div className="container-x py-10">
      <div className="mx-auto max-w-6xl">
        {/* progress + stepper */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-gold">
              {T('Addım', 'Step')} {step + 1}/{steps.length}
            </span>
            <span className="text-slate">{Math.round(progress * 100)}%</span>
          </div>
          <ProgressBar value={progress} />
          <div className="mt-4 flex flex-wrap gap-1.5">
            {steps.map((s, i) => (
              <button
                key={s.id}
                type="button"
                disabled={i > step}
                onClick={() => i <= step && setStep(i)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs transition-colors',
                  i === step
                    ? 'bg-gold/15 text-gold'
                    : i < step
                      ? 'text-mist hover:text-ink'
                      : 'text-slate/50',
                )}
              >
                {i + 1}. {s.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* main column */}
          <div>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              {steps[step].title}
            </h2>
            <p className="mt-2 text-[15px] text-mist">{steps[step].sub}</p>

            <div className="mt-7">{renderStep()}</div>

            {/* nav */}
            <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className={cn(
                  'rounded-full px-5 py-2.5 text-sm transition-colors',
                  step === 0 ? 'text-slate/40' : 'text-mist hover:text-ink',
                )}
              >
                ← {T('Geri', 'Back')}
              </button>
              <button
                type="button"
                onClick={next}
                disabled={!canNext || submitting}
                className={cn(
                  'group relative inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all',
                  canNext && !submitting
                    ? 'bg-gradient-to-b from-gold-soft via-gold to-amber text-night hover:-translate-y-0.5'
                    : 'cursor-not-allowed bg-white/5 text-slate',
                )}
              >
                {step === steps.length - 1
                  ? submitting
                    ? T('Hazırlanır…', 'Generating…')
                    : T('Kommersiya təklifini yarat', 'Generate proposal')
                  : T('Davam et', 'Continue')}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </button>
            </div>
          </div>

          {/* side preview */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <LiveSummary sel={sel} est={est} locale={locale} />
              <p className="px-1 text-[12px] leading-relaxed text-slate">
                {T(
                  'Rəqəmlər real vaxtda yenilənir. Yekun qiymət konsultasiyadan sonra dəqiqləşir.',
                  'Figures update live. The final price is confirmed after a consultation.',
                )}
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* mobile sticky estimate bar */}
      <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-void/95 px-5 py-3 lg:hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-slate">
              {T('Təxmini', 'Estimate')}
            </p>
            <p className="font-display text-lg text-gradient-gold">
              {est.priceMin > 0
                ? `${est.priceMin.toLocaleString()}–${est.priceMax.toLocaleString()} ${CURRENCY}`
                : '—'}
            </p>
          </div>
          <p className="text-[13px] text-mist">
            {est.moduleCount} {T('modul', 'mod.')} · ~{est.weeks} {T('həftə', 'wk')}
          </p>
        </div>
      </div>
    </div>
  );

  /* ---------- step bodies ---------- */
  function renderStep() {
    switch (steps[step].id) {
      case 'activity': {
        const allowed = sel.niche ? new Set(activitiesForNiche(sel.niche)) : null;
        const nicheName = sel.niche ? pick(nicheById.get(sel.niche)?.name, locale) : '';
        return (
          <div className="space-y-7">
            <p className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-[13px] text-mist">
              {allowed
                ? T(
                    `«${nicheName}» üçün məntiqli fəaliyyət növləri. Bir neçəsini seçə bilərsiniz.`,
                    `Operating models that make sense for “${nicheName}”. You can pick several.`,
                  )
                : T(
                    'Biznesiniz necə işləyir? Bir neçəsini seçə bilərsiniz.',
                    'How does your business operate? You can pick several.',
                  )}
            </p>
            {(['trade', 'production', 'service', 'other'] as const).map((g) => {
              const list = activities.filter(
                (a) => a.group === g && (!allowed || allowed.has(a.id)),
              );
              if (!list.length) return null;
              return (
                <div key={g}>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold/80">
                    {pick(activityGroupLabels[g], locale)}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {list.map((a) => (
                      <ChoiceCard
                        key={a.id}
                        selected={sel.activities.includes(a.id)}
                        onClick={() => toggleActivity(a.id)}
                        icon={a.icon}
                        title={pick(a.name, locale)}
                        desc={pick(a.desc, locale)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }

      case 'niche':
        return (
          <div className="space-y-7">
            <p className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-[13px] text-mist">
              {T(
                'Sahənizi seçin — ona özəl modullar (resept, VIN, smeta…) əlavə olunur və növbəti addımda yalnız uyğun fəaliyyət növləri təklif olunur. Dəqiq uyğun gəlmirsə, bu addımı keçə bilərsiniz.',
                'Pick your industry — niche modules (prescriptions, VIN, estimates…) get added and the next step offers only sensible operating models. If none fits exactly, you can skip this step.',
              )}
            </p>
            {(['health', 'goods', 'tech', 'service'] as const).map((g) => {
              const list = niches.filter((n) => n.group === g);
              return (
                <div key={g}>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold/80">
                    {pick(nicheGroupLabels[g], locale)}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {list.map((n) => (
                      <ChoiceCard
                        key={n.id}
                        selected={sel.niche === n.id}
                        onClick={() => selectNiche(n.id)}
                        icon={n.icon}
                        title={pick(n.name, locale)}
                        desc={pick(n.desc, locale)}
                        badge={`${n.modules.length} ${T('modul', 'mod.')}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-sm text-mist">{T('Şirkətin ölçüsü', 'Company size')}</p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {sizes.map((o) => (
                  <OptionRow
                    key={o.id}
                    selected={sel.size === o.id}
                    onClick={() => update({size: o.id as Tier})}
                    title={pick(o.name, locale)}
                    hint={pick(o.hint, locale)}
                  />
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberStepper
                label={T('İstifadəçi sayı', 'Number of users')}
                value={sel.users}
                onChange={(v) => update({users: v})}
                min={1}
                max={2000}
              />
              <NumberStepper
                label={T('Filial / anbar sayı', 'Branches / warehouses')}
                value={sel.branches}
                onChange={(v) => update({branches: v})}
                min={1}
                max={500}
              />
            </div>
            <div>
              <p className="mb-3 text-sm text-mist">{T('İndi nədən istifadə edirsiniz?', 'What do you use now?')}</p>
              <div className="flex flex-wrap gap-2">
                {currentSystems.map((o) => (
                  <Pill
                    key={o.id}
                    selected={sel.current === o.id}
                    onClick={() => update({current: sel.current === o.id ? undefined : o.id})}
                  >
                    {pick(o.name, locale)}
                  </Pill>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm text-mist">{T('Əsas məqsədlər (istəyə görə)', 'Main goals (optional)')}</p>
              <div className="flex flex-wrap gap-2">
                {goalOptions.map((o) => (
                  <Pill key={o.id} selected={sel.goals.includes(o.id)} onClick={() => toggleArr('goals', o.id)}>
                    {pick(o.name, locale)}
                  </Pill>
                ))}
              </div>
            </div>
          </div>
        );

      case 'spheres':
        return (
          <div className="space-y-7">
            {(['foundation', 'operations', 'people', 'insight'] as const).map((g) => {
              const list = spheres.filter((s) => s.group === g);
              return (
                <div key={g}>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold/80">
                    {pick(
                      {
                        az: groupLabel(g, 'az'),
                        en: groupLabel(g, 'en'),
                      },
                      locale,
                    )}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {list.map((s) => (
                      <ChoiceCard
                        key={s.id}
                        selected={sel.spheres.includes(s.id)}
                        onClick={() => toggleSphere(s.id)}
                        icon={s.icon}
                        title={pick(s.name, locale)}
                        desc={pick(s.tagline, locale)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 'modules': {
        const niche = sel.niche ? nicheById.get(sel.niche) : undefined;
        if (!sel.spheres.length && !niche) {
          return (
            <p className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-mist">
              {T('Əvvəlcə bir neçə sahə seçin.', 'Pick a few areas first.')}
            </p>
          );
        }
        return (
          <div className="space-y-7">
            {niche && (
              <div className="rounded-2xl border border-gold/25 bg-gold/[0.04] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="flex items-center gap-2 text-sm font-medium text-gold">
                    <Icon name={niche.icon} className="h-4 w-4" />
                    {T('Sahə üzrə modullar', 'Industry modules')} — {pick(niche.name, locale)}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setSel((prev) => {
                        const ids = niche.modules.map((m) => m.id);
                        const allOn = ids.every((id) => prev.modules.includes(id));
                        return {
                          ...prev,
                          modules: allOn
                            ? prev.modules.filter((m) => !ids.includes(m))
                            : Array.from(new Set([...prev.modules, ...ids])),
                        };
                      })
                    }
                    className="text-xs text-mist hover:text-gold"
                  >
                    {niche.modules.every((m) => sel.modules.includes(m.id))
                      ? T('Hamısını sil', 'Clear all')
                      : T('Hamısını seç', 'Select all')}
                  </button>
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {niche.modules.map((m) => (
                    <ChoiceCard
                      key={m.id}
                      selected={sel.modules.includes(m.id)}
                      onClick={() => toggleModule(m.id)}
                      title={pick(m.name, locale)}
                      desc={pick(m.desc, locale)}
                    />
                  ))}
                </div>
              </div>
            )}
            {spheres
              .filter((s) => sel.spheres.includes(s.id))
              .map((s) => {
                const allOn = s.modules.every((m) => sel.modules.includes(m.id));
                return (
                  <div key={s.id}>
                    <div className="mb-3 flex items-center justify-between">
                      <p className="flex items-center gap-2 text-sm font-medium text-gold">
                        <Icon name={s.icon} className="h-4 w-4" />
                        {pick(s.name, locale)}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setSel((prev) => {
                            const ids = s.modules.map((m) => m.id);
                            return {
                              ...prev,
                              modules: allOn
                                ? prev.modules.filter((m) => !ids.includes(m))
                                : Array.from(new Set([...prev.modules, ...ids])),
                            };
                          })
                        }
                        className="text-xs text-mist hover:text-gold"
                      >
                        {allOn ? T('Hamısını sil', 'Clear all') : T('Hamısını seç', 'Select all')}
                      </button>
                    </div>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {s.modules.map((m) => (
                        <ChoiceCard
                          key={m.id}
                          selected={sel.modules.includes(m.id)}
                          onClick={() => toggleModule(m.id)}
                          title={pick(m.name, locale)}
                          desc={pick(m.desc, locale)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        );
      }

      case 'details': {
        const active = subQuestions.filter((q) => sel.spheres.includes(q.sphere));
        if (!active.length) {
          return (
            <p className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-mist">
              {T(
                'Bu addım üçün əlavə sual yoxdur — davam edə bilərsiniz.',
                'No extra questions for this step — you can continue.',
              )}
            </p>
          );
        }
        return (
          <div className="space-y-7">
            {active.map((q) => {
              const parent = sphereById.get(q.sphere);
              return (
                <div key={q.id}>
                  <p className="mb-1 flex items-center gap-2 text-sm font-medium text-gold">
                    {parent && <Icon name={parent.icon} className="h-4 w-4" />}
                    {pick(q.prompt, locale)}
                  </p>
                  {q.hint && (
                    <p className="mb-3 text-[13px] text-slate">{pick(q.hint, locale)}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((o) => (
                      <Pill
                        key={o.id}
                        selected={subSelected(o)}
                        onClick={() => toggleSubOption(q, o)}
                      >
                        {pick(o.name, locale)}
                      </Pill>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }

      case 'integrations':
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            {integrations.map((it) => (
              <ChoiceCard
                key={it.id}
                selected={sel.integrations.includes(it.id)}
                onClick={() => toggleArr('integrations', it.id)}
                icon="integration"
                title={pick(it.name, locale)}
                desc={pick(it.desc, locale)}
              />
            ))}
          </div>
        );

      case 'services':
        return (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addRecommendedServices}
                className="text-sm text-gold hover:underline"
              >
                {T('Tövsiyə olunanları seç', 'Select recommended')}
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <ChoiceCard
                  key={s.id}
                  selected={sel.services.includes(s.id)}
                  onClick={() => toggleArr('services', s.id)}
                  icon={s.kind === 'monthly' ? 'cloud' : 'projects'}
                  title={pick(s.name, locale)}
                  desc={pick(s.desc, locale)}
                  badge={
                    s.recommended
                      ? T('tövsiyə', 'recommended')
                      : s.kind === 'monthly'
                        ? T('aylıq', 'monthly')
                        : undefined
                  }
                />
              ))}
            </div>
          </div>
        );

      case 'project':
        return (
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-sm text-mist">{T('Tələskənlik', 'Urgency')}</p>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {urgencies.map((o) => (
                  <OptionRow
                    key={o.id}
                    selected={sel.urgency === o.id}
                    onClick={() => update({urgency: o.id})}
                    title={pick(o.name, locale)}
                    hint={pick(o.hint, locale)}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm text-mist">{T('Büdcə (istəyə görə)', 'Budget (optional)')}</p>
              <div className="flex flex-wrap gap-2">
                {budgets.map((o) => (
                  <Pill
                    key={o.id}
                    selected={sel.budget === o.id}
                    onClick={() => update({budget: sel.budget === o.id ? undefined : o.id})}
                  >
                    {pick(o.name, locale)}
                  </Pill>
                ))}
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label={T('Şirkət', 'Company')}
                required
                value={sel.contact.company}
                onChange={(v) => update({contact: {...sel.contact, company: v}})}
              />
              <Field
                label={T('Əlaqədar şəxs', 'Contact person')}
                required
                value={sel.contact.name}
                onChange={(v) => update({contact: {...sel.contact, name: v}})}
              />
              <Field
                label={T('Telefon', 'Phone')}
                type="tel"
                value={sel.contact.phone}
                onChange={(v) => update({contact: {...sel.contact, phone: v}})}
                placeholder="+994 ..."
              />
              <Field
                label={T('E-poçt', 'Email')}
                type="email"
                value={sel.contact.email}
                onChange={(v) => update({contact: {...sel.contact, email: v}})}
              />
              <Field
                label={T('Mesajlaşma (istəyə görə)', 'Messenger (optional)')}
                value={sel.contact.messenger}
                onChange={(v) => update({contact: {...sel.contact, messenger: v}})}
                placeholder="WhatsApp / Telegram"
              />
            </div>
            <Field
              label={T('Qeyd (istəyə görə)', 'Note (optional)')}
              textarea
              value={sel.contact.note}
              onChange={(v) => update({contact: {...sel.contact, note: v}})}
            />
            <p className="text-[12px] leading-relaxed text-slate">
              {T(
                '«Kommersiya təklifini yarat» düyməsini sıxmaqla məlumatlarınızın bizimlə əlaqə üçün istifadəsinə razılıq verirsiniz.',
                'By clicking “Generate proposal” you agree we may use your details to contact you.',
              )}
            </p>
          </div>
        );

      default:
        return null;
    }
  }
}

function groupLabel(g: string, l: 'az' | 'en') {
  const map: Record<string, {az: string; en: string}> = {
    foundation: {az: 'Təməl: uçot və maliyyə', en: 'Foundation: accounting & finance'},
    operations: {az: 'Əməliyyatlar', en: 'Operations'},
    people: {az: 'İnsanlar və sənədlər', en: 'People & documents'},
    insight: {az: 'Analitika', en: 'Insight'},
  };
  return map[g]?.[l] ?? g;
}

/** Build the merged preset (spheres/modules/integrations/services) from the
 *  selected activities + niche. Recomputed whenever either axis changes, so the
 *  scope always reflects a sensible, conflict-free combination. */
function derivePreset(activityIds: string[], nicheId?: string) {
  const spheres = new Set<string>();
  const modules = new Set<string>();
  const integrations = new Set<string>();
  const servicesSet = new Set<string>();
  for (const id of activityIds) {
    const a = activityById.get(id);
    if (!a) continue;
    a.spheres.forEach((x) => spheres.add(x));
    a.modules.forEach((x) => modules.add(x));
    a.integrations.forEach((x) => integrations.add(x));
    a.services.forEach((x) => servicesSet.add(x));
  }
  if (nicheId) {
    const n = nicheById.get(nicheId);
    if (n) {
      n.spheres.forEach((x) => spheres.add(x));
      n.modules.forEach((mm) => modules.add(mm.id));
      n.integrations.forEach((x) => integrations.add(x));
    }
  }
  return {
    spheres: [...spheres],
    modules: [...modules],
    integrations: [...integrations],
    services: [...servicesSet],
  };
}

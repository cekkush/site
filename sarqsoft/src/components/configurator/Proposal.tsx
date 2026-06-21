import {site} from '@/lib/site';
import {CURRENCY} from '@/lib/configurator/config';
import {
  integrationById,
  moduleById,
  serviceById,
  sphereById,
} from '@/lib/configurator/catalog';
import {pick, type Estimate, type Selections} from '@/lib/configurator/types';
import {Icon} from './parts';

const money = (n: number) => `${n.toLocaleString('en-US')} ${CURRENCY}`;

function L(locale: string, az: string, en: string) {
  return locale === 'en' ? en : az;
}

/* Compact running summary for the wizard's sticky side panel. */
export function LiveSummary({
  sel,
  est,
  locale,
}: {
  sel: Selections;
  est: Estimate;
  locale: string;
}) {
  return (
    <div className="glass rounded-2xl border border-white/10 p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-gold/90">
        {L(locale, 'Sizin həlliniz', 'Your solution')}
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Stat n={est.moduleCount} l={L(locale, 'modul', 'modules')} />
        <Stat n={sel.integrations.length} l={L(locale, 'inteqr.', 'integr.')} />
        <Stat n={sel.services.length} l={L(locale, 'xidmət', 'services')} />
      </div>
      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="text-[11px] uppercase tracking-wide text-slate">
          {L(locale, 'Təxmini investisiya', 'Estimated investment')}
        </p>
        <p className="mt-1 font-display text-2xl text-gradient-gold">
          {est.priceMin > 0 ? `${money(est.priceMin)} – ${money(est.priceMax)}` : '—'}
        </p>
        {est.monthlyMax > 0 && (
          <p className="mt-1 text-[13px] text-mist">
            +{money(est.monthlyMin)}–{money(est.monthlyMax)} / {L(locale, 'ay', 'mo')}
          </p>
        )}
        <p className="mt-3 text-[13px] text-mist">
          ⏱ ~{est.weeks} {L(locale, 'həftə tətbiq', 'weeks to deliver')}
        </p>
        {est.roiHours > 0 && (
          <p className="mt-1 text-[13px] text-mist">
            ⚡ ~{est.roiHours} {L(locale, 'saat/ay qənaət', 'hours/mo saved')}
          </p>
        )}
      </div>
    </div>
  );
}

function Stat({n, l}: {n: number; l: string}) {
  return (
    <div className="rounded-xl bg-white/[0.03] py-2">
      <div className="font-display text-xl text-gold">{n}</div>
      <div className="text-[11px] text-slate">{l}</div>
    </div>
  );
}

/* Full personalized commercial proposal (screen + print + shareable link). */
export function Proposal({
  sel,
  est,
  locale,
}: {
  sel: Selections;
  est: Estimate;
  locale: string;
}) {
  const date = new Date().toLocaleDateString(locale === 'en' ? 'en-GB' : 'az-AZ');
  const selectedSpheres = sel.spheres
    .map((id) => sphereById.get(id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <article
      data-proposal
      className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-night/60 p-6 sm:p-10"
    >
      {/* Header */}
      <header className="border-b border-white/10 pb-7">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs uppercase tracking-[0.28em] text-gold/90">
            {L(locale, 'Şəxsi kommersiya təklifi', 'Personal commercial proposal')}
          </span>
          <span className="text-xs text-slate">{date}</span>
        </div>
        <h1 className="mt-4 font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
          {sel.contact.company
            ? sel.contact.company
            : L(locale, 'Biznesinizin avtomatlaşdırılması', 'Automating your business')}
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-mist">
          {L(
            locale,
            `${site.name} — Jey ERP əsasında uçotun və biznes proseslərinin tam avtomatlaşdırılması. Aşağıda seçimlərinizə uyğun fərdi həll, mərhələlər və təxmini investisiya.`,
            `${site.name} — full automation of accounting and business processes on Jey ERP. Below is a tailored solution, phases and an indicative investment based on your choices.`,
          )}
        </p>
      </header>

      {/* Metrics */}
      <section className="grid grid-cols-2 gap-3 py-7 sm:grid-cols-4">
        <Metric
          big={est.priceMin > 0 ? money(est.priceMin) : '—'}
          sub={est.priceMin > 0 ? `– ${money(est.priceMax)}` : ''}
          label={L(locale, 'Təxmini investisiya', 'Estimated investment')}
        />
        <Metric
          big={est.monthlyMax > 0 ? money(est.monthlyMin) : '—'}
          sub={est.monthlyMax > 0 ? `– ${money(est.monthlyMax)} / ${L(locale, 'ay', 'mo')}` : ''}
          label={L(locale, 'Aylıq müşayiət', 'Monthly upkeep')}
        />
        <Metric big={`~${est.weeks}`} sub={L(locale, 'həftə', 'weeks')} label={L(locale, 'Tətbiq müddəti', 'Timeline')} />
        <Metric
          big={est.roiHours > 0 ? `~${est.roiHours}` : '—'}
          sub={L(locale, 'saat/ay', 'h/mo')}
          label={L(locale, 'Qənaət (təxmini)', 'Time saved (est.)')}
        />
      </section>

      {/* Spheres */}
      {selectedSpheres.length > 0 && (
        <Block title={L(locale, 'Avtomatlaşdırılacaq sahələr', 'Areas to automate')}>
          <div className="grid gap-3 sm:grid-cols-2">
            {selectedSpheres.map((s) => (
              <div
                key={s.id}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4"
              >
                <span className="text-gold">
                  <Icon name={s.icon} />
                </span>
                <span>
                  <span className="block font-display text-[15px] text-ink">
                    {pick(s.name, locale)}
                  </span>
                  <span className="mt-1 block text-[13px] text-slate">
                    {pick(s.tagline, locale)}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Block>
      )}

      {/* Solution composition — modules grouped by sphere */}
      <Block title={L(locale, 'Həllin tərkibi', 'Solution composition')}>
        <div className="space-y-5">
          {selectedSpheres.map((s) => {
            const mods = s.modules.filter((mm) => sel.modules.includes(mm.id));
            if (!mods.length) return null;
            return (
              <div key={s.id}>
                <p className="mb-2 text-sm font-medium text-gold">{pick(s.name, locale)}</p>
                <ul className="grid gap-1.5 sm:grid-cols-2">
                  {mods.map((mm) => (
                    <li key={mm.id} className="flex items-start gap-2 text-[14px] text-mist">
                      <Dot /> {pick(mm.name, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {sel.integrations.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-gold">
              {L(locale, 'İnteqrasiyalar', 'Integrations')}
            </p>
            <div className="flex flex-wrap gap-2">
              {sel.integrations.map((id) => (
                <span
                  key={id}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-[13px] text-mist"
                >
                  {pick(integrationById.get(id)?.name, locale)}
                </span>
              ))}
            </div>
          </div>
        )}

        {sel.services.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-gold">
              {L(locale, 'Xidmətlər', 'Services')}
            </p>
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {sel.services.map((id) => {
                const s = serviceById.get(id);
                if (!s) return null;
                return (
                  <li key={id} className="flex items-start gap-2 text-[14px] text-mist">
                    <Dot />
                    {pick(s.name, locale)}
                    {s.kind === 'monthly' && (
                      <span className="text-[11px] text-slate">
                        ({L(locale, 'aylıq', 'monthly')})
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </Block>

      {/* Roadmap */}
      {est.phases.length > 0 && (
        <Block title={L(locale, 'Tətbiq yol xəritəsi', 'Implementation roadmap')}>
          <ol className="relative space-y-4 border-l border-white/10 pl-6">
            {est.phases.map((p, i) => (
              <li key={p.key} className="relative">
                <span className="absolute -left-[1.65rem] top-1 h-3 w-3 rounded-full border-2 border-gold bg-night" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-[15px] text-ink">
                    {L(locale, 'Mərhələ', 'Phase')} {i + 1} — {pick(p.title, locale)}
                  </p>
                  <span className="text-[13px] text-gold">
                    ~{p.weeks} {L(locale, 'həftə', 'weeks')}
                  </span>
                </div>
                <p className="mt-1 text-[13px] text-slate">
                  {p.moduleIds
                    .map((id) => pick(moduleById.get(id)?.name, locale))
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </li>
            ))}
          </ol>
        </Block>
      )}

      {/* Why us */}
      <Block title={L(locale, 'Niyə Şərq Soft', 'Why Şərq Soft')}>
        <ul className="grid gap-2 sm:grid-cols-2">
          {[
            L(locale, 'Azərbaycan mühasibatlığını tam bilirik', 'We know Azerbaijani accounting fully'),
            L(locale, 'Jey ERP üzrə tətbiq təcrübəsi', 'Hands-on Jey ERP implementation'),
            L(locale, 'Dövlət portalları ilə inteqrasiya', 'Integration with government portals'),
            L(locale, 'Bulud infrastrukturu və dəstək', 'Cloud infrastructure and support'),
          ].map((t) => (
            <li key={t} className="flex items-start gap-2 text-[14px] text-mist">
              <Dot /> {t}
            </li>
          ))}
        </ul>
      </Block>

      {/* Footer / CTA */}
      <footer className="mt-8 rounded-2xl border border-gold/20 bg-gold/[0.04] p-6">
        <p className="font-display text-lg text-ink">
          {L(locale, 'Növbəti addım', 'Next step')}
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-mist">
          {L(
            locale,
            'Bu təklifi müzakirə edək və dəqiq smetanı hazırlayaq. Bizimlə əlaqə saxlayın:',
            'Let’s discuss this proposal and prepare a precise quote. Get in touch:',
          )}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
          <a href={site.phoneHref} className="text-gold hover:underline">
            {site.phoneDisplay}
          </a>
          <a href={`mailto:${site.email}`} className="text-gold hover:underline">
            {site.email}
          </a>
          <a href={site.whatsapp} className="text-gold hover:underline">
            WhatsApp
          </a>
          <a href={site.telegram} className="text-gold hover:underline">
            Telegram
          </a>
        </div>
        <p className="mt-5 text-[11px] leading-relaxed text-slate">
          {L(
            locale,
            '* Göstərilən məbləğlər təxminidir və seçilmiş həcmə əsaslanır. Yekun qiymət konsultasiyadan sonra dəqiqləşdirilir.',
            '* Figures are indicative and based on the selected scope. The final price is confirmed after a consultation.',
          )}
        </p>
      </footer>
    </article>
  );
}

function Metric({big, sub, label}: {big: string; sub: string; label: string}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="font-display text-2xl text-gradient-gold">{big}</div>
      {sub && <div className="text-[12px] text-mist">{sub}</div>}
      <div className="mt-1 text-[11px] uppercase tracking-wide text-slate">{label}</div>
    </div>
  );
}

function Block({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <section className="border-t border-white/10 py-7">
      <h2 className="mb-4 font-display text-xl text-ink">{title}</h2>
      {children}
    </section>
  );
}

function Dot() {
  return <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />;
}

import type {
  Industry,
  Integration,
  Module,
  OptionItem,
  Service,
  Sphere,
} from './types';
import {allNicheModules} from './axes';

/* ------------------------------------------------------------------ *
 *  SPHERES & MODULES — the heart of the configurator.
 *  weight: relative effort · weeks: time contribution · price: AZN band
 * ------------------------------------------------------------------ */

export const spheres: Sphere[] = [
  {
    id: 'accounting',
    icon: 'accounting',
    group: 'foundation',
    name: {az: 'Mühasibatlıq və uçot', en: 'Accounting & bookkeeping'},
    tagline: {
      az: 'Tam Azərbaycan mühasibatlığı — avtomatik və səhvsiz.',
      en: 'Full Azerbaijani accounting — automated and error-free.',
    },
    modules: [
      m('acc-core', {az: 'Hesablar planı və avtomatik müxabirləşmə', en: 'Chart of accounts & auto-postings'}, {az: 'Əməliyyatlar avtomatik müvafiq hesablara düşür.', en: 'Transactions post to the right accounts automatically.'}, 5, 2, 700, 1400),
      m('acc-primary', {az: 'İlkin sənədlər (qaimə, qəbz, akt)', en: 'Primary documents (invoices, receipts, acts)'}, {az: 'Vahid bazadan bütün ilkin sənədlər.', en: 'All source documents from one base.'}, 3, 1, 350, 800),
      m('acc-bank', {az: 'Bank çıxarışlarının idxalı', en: 'Bank statement import'}, {az: 'Çıxarışlar avtomatik tanınır və bağlanır.', en: 'Statements auto-recognised and reconciled.'}, 3, 1, 400, 900),
      m('acc-assets', {az: 'Əsas vəsaitlər və amortizasiya', en: 'Fixed assets & depreciation'}, {az: 'Əsas vəsaitlərin uçotu və avtomatik amortizasiya.', en: 'Asset register and automatic depreciation.'}, 3, 1, 350, 800),
      m('acc-fx', {az: 'Valyuta uçotu və məzənnə fərqləri', en: 'Multi-currency & FX differences'}, {az: 'Çoxvalyutalı əməliyyatlar və yenidən qiymətləndirmə.', en: 'Multi-currency ops and revaluation.'}, 2, 1, 300, 650),
      m('acc-close', {az: 'Dövrün bağlanması', en: 'Period close'}, {az: 'Ay/rüb/il bağlanışının avtomatlaşdırılması.', en: 'Automated month/quarter/year close.'}, 2, 1, 250, 600),
    ],
  },
  {
    id: 'tax',
    icon: 'tax',
    group: 'foundation',
    name: {az: 'Vergi və hesabatlıq', en: 'Tax & reporting'},
    tagline: {
      az: 'Bəyannamələr avtomatik dolur, müddətlər ötmür.',
      en: 'Declarations fill themselves, deadlines never slip.',
    },
    modules: [
      m('tax-vat', {az: 'ƏDV uçotu', en: 'VAT accounting'}, {az: 'ƏDV-nin tam uçotu və hesabatı.', en: 'Full VAT accounting and reporting.'}, 3, 1, 350, 800),
      m('tax-eqaime', {az: 'e-Qaimə inteqrasiyası', en: 'e-Invoice (e-Qaimə)'}, {az: 'Elektron qaimələr birbaşa sistemdən.', en: 'Electronic invoices straight from the system.'}, 4, 1, 500, 1100),
      m('tax-portal', {az: 'e-taxes.gov.az inteqrasiyası', en: 'e-taxes.gov.az integration'}, {az: 'İnternet Vergi İdarəsi ilə birbaşa mübadilə.', en: 'Direct exchange with the tax portal.'}, 4, 2, 600, 1300),
      m('tax-decl', {az: 'Bəyannamələrin avtomatik doldurulması', en: 'Auto-filled tax declarations'}, {az: 'ƏDV, mənfəət, sadələşdirilmiş, ödəmə mənbəyi (ÖMV), torpaq və əmlak vergisi, kadr/DSMF.', en: 'VAT, profit, simplified, withholding (ÖMV), land and property tax, HR/DSMF.'}, 4, 2, 600, 1300),
      m('tax-calendar', {az: 'Vergi təqvimi və xəbərdarlıqlar', en: 'Tax calendar & reminders'}, {az: 'Müddətlər üzrə avtomatik xatırlatmalar.', en: 'Automatic deadline reminders.'}, 1, 1, 150, 400),
    ],
  },
  {
    id: 'finance',
    icon: 'finance',
    group: 'foundation',
    name: {az: 'Maliyyə və xəzinədarlıq', en: 'Finance & treasury'},
    tagline: {
      az: 'Pul axınını və mənfəəti real vaxtda gör.',
      en: 'See cash flow and profit in real time.',
    },
    modules: [
      m('fn-budget', {az: 'Büdcələşdirmə', en: 'Budgeting'}, {az: 'Plan/fakt müqayisəsi ilə büdcələr.', en: 'Budgets with plan/actual comparison.'}, 3, 1, 400, 900),
      m('fn-cash', {az: 'Pul axını və ödəniş təqvimi', en: 'Cash flow & payment calendar'}, {az: 'Gələcək ödənişlər və daxilolmalar.', en: 'Upcoming payments and inflows.'}, 3, 1, 400, 900),
      m('fn-reports', {az: 'Maliyyə hesabatları (P&L, balans)', en: 'Financial statements (P&L, balance)'}, {az: 'Mənfəət-zərər, balans, pul vəsaitləri.', en: 'P&L, balance sheet, cash flows.'}, 3, 1, 400, 900),
    ],
  },
  {
    id: 'sales',
    icon: 'sales',
    group: 'operations',
    name: {az: 'Satış və CRM', en: 'Sales & CRM'},
    tagline: {
      az: 'Müştərilər, sövdələr və debitorlar bir yerdə.',
      en: 'Customers, deals and receivables in one place.',
    },
    modules: [
      m('sl-crm', {az: 'Müştəri bazası və satış kanalı', en: 'Customer base & sales pipeline'}, {az: 'Potensial müştəridən sövdəyə qədər izləmə.', en: 'Track from lead to deal.'}, 4, 2, 500, 1200),
      m('sl-price', {az: 'Qiymət siyahıları və endirimlər', en: 'Price lists & discounts'}, {az: 'Çoxsəviyyəli qiymət və endirim siyasəti.', en: 'Multi-tier pricing and discount rules.'}, 2, 1, 250, 600),
      m('sl-contracts', {az: 'Müqavilələr və hesab-fakturalar', en: 'Contracts & invoices'}, {az: 'Sənədlərin avtomatik formalaşması.', en: 'Documents generated automatically.'}, 2, 1, 250, 600),
      m('sl-ar', {az: 'Debitor borcların idarəsi', en: 'Receivables management'}, {az: 'Borc qalıqları və xatırlatmalar.', en: 'Outstanding balances and reminders.'}, 2, 1, 250, 600),
    ],
  },
  {
    id: 'purchase',
    icon: 'purchase',
    group: 'operations',
    name: {az: 'Satınalma və təchizat', en: 'Procurement & supply'},
    tagline: {
      az: 'Təchizatçılar, sifarişlər və təsdiqlər nəzarətdə.',
      en: 'Suppliers, orders and approvals under control.',
    },
    modules: [
      m('pu-suppliers', {az: 'Təchizatçılar bazası', en: 'Supplier base'}, {az: 'Təchizatçı kartları və şərtlər.', en: 'Supplier cards and terms.'}, 2, 1, 250, 600),
      m('pu-orders', {az: 'Sifarişlər və təsdiq marşrutları', en: 'Orders & approval routes'}, {az: 'Satınalma sifarişləri və razılaşdırma.', en: 'Purchase orders and approvals.'}, 3, 1, 350, 800),
      m('pu-ap', {az: 'Kreditor borclar', en: 'Payables'}, {az: 'Ödəniləcək borclar və planlaşdırma.', en: 'Amounts due and planning.'}, 2, 1, 250, 600),
    ],
  },
  {
    id: 'warehouse',
    icon: 'warehouse',
    group: 'operations',
    name: {az: 'Anbar və logistika', en: 'Warehouse & logistics'},
    tagline: {
      az: 'Qalıqlar dəqiq, inventarizasiya bir kliklə.',
      en: 'Accurate stock, stock-take in one click.',
    },
    modules: [
      m('wh-multi', {az: 'Çoxanbarlı uçot və köçürmələr', en: 'Multi-warehouse & transfers'}, {az: 'Bir neçə anbar, köçürmələr, rezerv.', en: 'Several warehouses, transfers, reserves.'}, 3, 1, 400, 900),
      m('wh-batch', {az: 'Partiya və yararlılıq müddəti', en: 'Batch & expiry tracking'}, {az: 'Seriya/partiya və son istifadə tarixi.', en: 'Serial/batch and shelf-life.'}, 2, 1, 300, 700),
      m('wh-barcode', {az: 'Barkod və terminal/skaner', en: 'Barcode & scanner terminals'}, {az: 'Skanerlərlə qəbul, yığım, inventar.', en: 'Receive, pick, count with scanners.'}, 3, 1, 400, 950),
      m('wh-inventory', {az: 'İnventarizasiya', en: 'Stock-taking'}, {az: 'Avtomatik inventar və uyğunlaşdırma.', en: 'Automated counts and reconciliation.'}, 2, 1, 250, 600),
    ],
  },
  {
    id: 'production',
    icon: 'production',
    group: 'operations',
    name: {az: 'İstehsalat', en: 'Manufacturing'},
    tagline: {
      az: 'Reseptlər, maya dəyəri və istehsal sifarişləri.',
      en: 'Recipes, cost price and production orders.',
    },
    modules: [
      m('pr-bom', {az: 'Resept/spesifikasiya (BOM)', en: 'Bill of materials (BOM)'}, {az: 'Məhsulun tərkibi və normaları.', en: 'Product composition and norms.'}, 3, 1, 400, 900),
      m('pr-cost', {az: 'Maya dəyərinin hesablanması', en: 'Cost calculation'}, {az: 'Faktiki maya dəyəri avtomatik.', en: 'Actual cost price, automatically.'}, 3, 1, 400, 900),
      m('pr-orders', {az: 'İstehsal sifarişləri', en: 'Production orders'}, {az: 'Planlaşdırma və icra nəzarəti.', en: 'Planning and execution control.'}, 3, 2, 450, 1000),
    ],
  },
  {
    id: 'retail',
    icon: 'retail',
    group: 'operations',
    name: {az: 'Pərakəndə və kassa (POS)', en: 'Retail & POS'},
    tagline: {
      az: 'Kassa, fiskal və satış nöqtələri uçotda.',
      en: 'Cash desks, fiscal and stores accounted for.',
    },
    modules: [
      m('rt-pos', {az: 'Kassa yeri (POS)', en: 'POS cash desk'}, {az: 'Sürətli satış interfeysi.', en: 'Fast point-of-sale interface.'}, 3, 1, 400, 900),
      m('rt-fiscal', {az: 'Fiskal/onlayn kassa inteqrasiyası', en: 'Fiscal / online cash integration'}, {az: 'Nağd ödəniş və çek qaydaları.', en: 'Cash payment and receipt rules.'}, 3, 1, 400, 950),
    ],
  },
  {
    id: 'hr',
    icon: 'hr',
    group: 'people',
    name: {az: 'Kadrlar və əməkhaqqı', en: 'HR & payroll'},
    tagline: {
      az: 'Müqavilələr, tabel və əməkhaqqı — EMAS ilə.',
      en: 'Contracts, timesheets and payroll — with EMAS.',
    },
    modules: [
      m('hr-contracts', {az: 'Əmək müqavilələri və ştat', en: 'Employment contracts & staffing'}, {az: 'Kadr sənədləri və ştat cədvəli.', en: 'HR documents and staffing table.'}, 3, 1, 350, 800),
      m('hr-emas', {az: 'EMAS (e-gov) inteqrasiyası', en: 'EMAS (e-gov) integration'}, {az: 'Əmək müqavilələrinin elektron bildirişi.', en: 'Electronic contract notifications.'}, 3, 1, 450, 1000),
      m('hr-payroll', {az: 'Əməkhaqqı (DSMF, vergi)', en: 'Payroll (DSMF, tax)'}, {az: 'Tam əməkhaqqı və tutulmalar.', en: 'Full payroll and deductions.'}, 4, 2, 550, 1200),
      m('hr-time', {az: 'Tabel və davamiyyət', en: 'Timesheet & attendance'}, {az: 'İş vaxtının uçotu.', en: 'Working-time tracking.'}, 2, 1, 250, 600),
      m('hr-leave', {az: 'Məzuniyyət və xəstəlik', en: 'Leave & sick management'}, {az: 'Məzuniyyət qrafiki və hesablanması.', en: 'Leave schedule and calculation.'}, 2, 1, 200, 500),
    ],
  },
  {
    id: 'docs',
    icon: 'docs',
    group: 'people',
    name: {az: 'Sənəd dövriyyəsi', en: 'Document flow'},
    tagline: {
      az: 'Elektron təsdiqlər və ASAN İmza.',
      en: 'Electronic approvals and e-signature.',
    },
    modules: [
      m('dc-edm', {az: 'Elektron sənəd dövriyyəsi', en: 'Electronic document management'}, {az: 'Sənədlərin vahid arxivi.', en: 'A single document archive.'}, 3, 1, 350, 800),
      m('dc-approve', {az: 'Təsdiq marşrutları', en: 'Approval routes'}, {az: 'Çoxsəviyyəli razılaşdırma.', en: 'Multi-level sign-off.'}, 2, 1, 250, 600),
      m('dc-sign', {az: 'ASAN İmza / e-imza', en: 'ASAN İmza / e-signature'}, {az: 'Sənədlərin elektron imzalanması.', en: 'Electronic document signing.'}, 2, 1, 300, 700),
    ],
  },
  {
    id: 'projects',
    icon: 'projects',
    group: 'people',
    name: {az: 'Layihələr və xidmətlər', en: 'Projects & services'},
    tagline: {
      az: 'Layihə uçotu, vaxt və hesablaşma.',
      en: 'Project accounting, time and billing.',
    },
    modules: [
      m('pj-track', {az: 'Layihə uçotu', en: 'Project tracking'}, {az: 'Layihə üzrə gəlir/xərc.', en: 'Revenue/cost per project.'}, 3, 1, 350, 800),
      m('pj-time', {az: 'Vaxt uçotu', en: 'Time tracking'}, {az: 'İşçilərin layihəyə sərf etdiyi vaxt.', en: 'Staff time on projects.'}, 2, 1, 250, 600),
      m('pj-bill', {az: 'Layihə üzrə hesablaşma', en: 'Project billing'}, {az: 'Vaxt və ya mərhələ üzrə hesablaşma.', en: 'Time/milestone billing.'}, 2, 1, 250, 600),
    ],
  },
  {
    id: 'bi',
    icon: 'bi',
    group: 'insight',
    name: {az: 'İdarəetmə uçotu və BI', en: 'Management & BI'},
    tagline: {
      az: 'Rəhbər üçün panellər və real göstəricilər.',
      en: 'Dashboards and real metrics for managers.',
    },
    modules: [
      m('bi-dash', {az: 'İdarəetmə panelləri', en: 'Executive dashboards'}, {az: 'Biznesin canlı mənzərəsi.', en: 'A live picture of the business.'}, 3, 1, 400, 950),
      m('bi-kpi', {az: 'KPI və hesabatlar', en: 'KPI & reports'}, {az: 'Fərdi hesabatlar və göstəricilər.', en: 'Custom reports and metrics.'}, 2, 1, 300, 700),
      m('bi-cost', {az: 'Məsrəf mərkəzləri', en: 'Cost centers'}, {az: 'Şöbə/istiqamət üzrə təhlil.', en: 'Analysis by unit/direction.'}, 2, 1, 250, 600),
    ],
  },
];

function m(
  id: string,
  name: Module['name'],
  desc: Module['desc'],
  weight: number,
  weeks: number,
  priceMin: number,
  priceMax: number,
): Module {
  return {id, name, desc, weight, weeks, priceMin, priceMax};
}

/* ------------------------------------------------------------------ *
 *  INTEGRATIONS
 * ------------------------------------------------------------------ */

export const integrations: Integration[] = [
  ig('int-banks', {az: 'Azərbaycan bankları', en: 'Azerbaijani banks'}, {az: 'Bank-müştəri və çıxarış mübadiləsi.', en: 'Bank-client and statement exchange.'}, 'bank', 3, 400, 900),
  ig('int-gov', {az: 'Dövlət portalları (e-taxes, ASAN, DSMF)', en: 'Gov portals (e-taxes, ASAN, DSMF)'}, {az: 'Dövlət sistemləri ilə inteqrasiya.', en: 'Integration with government systems.'}, 'gov', 4, 600, 1300),
  ig('int-customs', {az: 'Gömrük (gömrük bəyannamələri)', en: 'Customs (declarations)'}, {az: 'İdxal/ixrac sənədləri.', en: 'Import/export documents.'}, 'gov', 3, 400, 900),
  ig('int-marketplace', {az: 'Marketpleyslər', en: 'Marketplaces'}, {az: 'Sifarişlər və qalıqların sinxronu.', en: 'Order and stock sync.'}, 'commerce', 3, 400, 1000),
  ig('int-eshop', {az: 'İnternet mağaza', en: 'Online store'}, {az: 'Sayt ilə qalıq/qiymət sinxronu.', en: 'Stock/price sync with your site.'}, 'commerce', 3, 400, 1000),
  ig('int-1c', {az: '1C / digər proqramlar', en: '1C / other software'}, {az: 'Köhnə sistemdən köçürmə və mübadilə.', en: 'Migration and exchange with legacy.'}, 'data', 3, 400, 1000),
  ig('int-excel', {az: 'Excel / Google Sheets', en: 'Excel / Google Sheets'}, {az: 'İstənilən cədvəldən idxal.', en: 'Import from any spreadsheet.'}, 'data', 1, 150, 400),
  ig('int-telephony', {az: 'Telefoniya (ATS)', en: 'Telephony (PBX)'}, {az: 'Zənglər CRM-də qeydə alınır.', en: 'Calls logged in CRM.'}, 'comm', 2, 250, 650),
  ig('int-messengers', {az: 'WhatsApp / Telegram', en: 'WhatsApp / Telegram'}, {az: 'Bildirişlər və müştəri ilə əlaqə.', en: 'Notifications and customer contact.'}, 'comm', 2, 250, 650),
];

function ig(
  id: string,
  name: Integration['name'],
  desc: Integration['desc'],
  category: Integration['category'],
  weight: number,
  priceMin: number,
  priceMax: number,
): Integration {
  return {id, name, desc, category, weight, priceMin, priceMax};
}

/* ------------------------------------------------------------------ *
 *  SERVICES (implementation scope add-ons)
 * ------------------------------------------------------------------ */

export const services: Service[] = [
  sv('sv-impl', {az: 'Açar-təslim tətbiq', en: 'Turnkey implementation'}, {az: 'Tələblərdən işə salınmağa qədər tam tsikl.', en: 'Full cycle from requirements to go-live.'}, 'oneTime', 5, 800, 2000, true),
  sv('sv-migrate', {az: 'Məlumatların köçürülməsi', en: 'Data migration'}, {az: 'Excel, 1C, digər proqram və portallardan.', en: 'From Excel, 1C, other apps and portals.'}, 'oneTime', 3, 400, 1200, true),
  sv('sv-restore', {az: 'Keçmiş dövrlərin bərpası', en: 'Prior-period restoration'}, {az: 'Əvvəlki dövrlərin sənədlərinin idxalı, uçotun bərpası və nizama salınması.', en: 'Import past-period documents, restore and reconcile the books.'}, 'oneTime', 3, 400, 1200),
  sv('sv-train', {az: 'Əməkdaşların təlimi', en: 'Staff training'}, {az: 'Onlayn/yerində təlim və video-kurs.', en: 'Online/on-site training and video.'}, 'oneTime', 2, 300, 900, true),
  sv('sv-cloud', {az: 'Bulud üzərində quraşdırma', en: 'Cloud setup'}, {az: 'Buludda tam infrastruktur.', en: 'Full infrastructure in the cloud.'}, 'oneTime', 2, 300, 800, true),
  sv('sv-integr', {az: 'İnteqrasiyaların qurulması', en: 'Integrations setup'}, {az: 'Seçilmiş inteqrasiyaların icrası.', en: 'Delivery of the chosen integrations.'}, 'oneTime', 3, 400, 1200),
  sv('sv-custom', {az: 'Fərdi inkişaf', en: 'Custom development'}, {az: 'Unikal funksiyaların hazırlanması.', en: 'Building unique features.'}, 'oneTime', 4, 600, 2500),
  sv('sv-consult', {az: 'Proseslərin qurulması (konsaltinq)', en: 'Process consulting'}, {az: 'Biznes-proseslərin auditi və dizaynı.', en: 'Audit and design of processes.'}, 'oneTime', 3, 400, 1200),
  sv('sv-support', {az: 'Texniki dəstək (SLA)', en: 'Technical support (SLA)'}, {az: 'Aylıq müşayiət və yeniləmələr.', en: 'Monthly support and updates.'}, 'monthly', 2, 120, 500, true),
];

function sv(
  id: string,
  name: Service['name'],
  desc: Service['desc'],
  kind: Service['kind'],
  weight: number,
  priceMin: number,
  priceMax: number,
  recommended = false,
): Service {
  return {id, name, desc, kind, weight, priceMin, priceMax, recommended};
}

/* ------------------------------------------------------------------ *
 *  OPTION LISTS
 * ------------------------------------------------------------------ */

export const sizes: OptionItem[] = [
  {id: 'micro', name: {az: 'Mikro (1–10)', en: 'Micro (1–10)'}, hint: {az: '10-a qədər işçi', en: 'up to 10 staff'}, factor: 0.7},
  {id: 'small', name: {az: 'Kiçik (10–50)', en: 'Small (10–50)'}, hint: {az: '10–50 işçi', en: '10–50 staff'}, factor: 1},
  {id: 'medium', name: {az: 'Orta (50–250)', en: 'Medium (50–250)'}, hint: {az: '50–250 işçi', en: '50–250 staff'}, factor: 1.55},
  {id: 'large', name: {az: 'Böyük (250+)', en: 'Large (250+)'}, hint: {az: '250-dən çox işçi', en: '250+ staff'}, factor: 2.4},
];

export const currentSystems: OptionItem[] = [
  {id: 'none', name: {az: 'Heç nə / kağız', en: 'Nothing / paper'}},
  {id: 'excel', name: {az: 'Excel cədvəlləri', en: 'Excel spreadsheets'}},
  {id: '1c', name: {az: '1C', en: '1C'}},
  {id: 'local', name: {az: 'Lokal proqram', en: 'Local software'}},
  {id: 'erp', name: {az: 'Başqa ERP', en: 'Another ERP'}},
  {id: 'jey', name: {az: 'Artıq Jey ERP var', en: 'Already on Jey ERP'}},
];

export const deployments: OptionItem[] = [
  {id: 'cloud', name: {az: 'Bulud', en: 'Cloud'}, hint: {az: 'Tövsiyə olunur — sürətli və çevik', en: 'Recommended — fast and flexible'}, factor: 1},
  {id: 'hybrid', name: {az: 'Hibrid', en: 'Hybrid'}, hint: {az: 'Bulud + lokal', en: 'Cloud + on-prem'}, factor: 1.15},
  {id: 'onprem', name: {az: 'Lokal (öz serverində)', en: 'On-premise'}, hint: {az: 'Öz serverinizdə', en: 'On your own server'}, factor: 1.3},
];

export const urgencies: OptionItem[] = [
  {id: 'asap', name: {az: 'Ən qısa müddətdə', en: 'ASAP'}, hint: {az: 'Prioritetli icra', en: 'Priority delivery'}, factor: 1.25},
  {id: 'normal', name: {az: '1–3 ay', en: '1–3 months'}, factor: 1},
  {id: 'flexible', name: {az: 'Çevik', en: 'Flexible'}, hint: {az: 'Tələsmirik', en: 'No rush'}, factor: 0.95},
];

export const budgets: OptionItem[] = [
  {id: 'b1', name: {az: '5 000 ₼-dək', en: 'up to ₼5,000'}},
  {id: 'b2', name: {az: '5 000 – 15 000 ₼', en: '₼5,000 – 15,000'}},
  {id: 'b3', name: {az: '15 000 – 40 000 ₼', en: '₼15,000 – 40,000'}},
  {id: 'b4', name: {az: '40 000 ₼-dən çox', en: '₼40,000+'}},
  {id: 'b0', name: {az: 'Hələ bilmirəm', en: 'Not sure yet'}},
];

export const goals: OptionItem[] = [
  {id: 'order', name: {az: 'Uçotda qayda yaratmaq', en: 'Bring order to bookkeeping'}},
  {id: 'tax', name: {az: 'Vergi yoxlamalarına hazır olmaq', en: 'Be ready for tax checks'}},
  {id: 'realtime', name: {az: 'Rəqəmləri real vaxtda görmək', en: 'See numbers in real time'}},
  {id: 'manual', name: {az: 'Əl işini azaltmaq', en: 'Cut manual work'}},
  {id: 'scale', name: {az: 'Filialları/həcmi böyütmək', en: 'Scale branches/volume'}},
  {id: 'integrate', name: {az: 'Hər şeyi bir sistemə yığmaq', en: 'Unify everything in one system'}},
];

/* ------------------------------------------------------------------ *
 *  INDUSTRY PRESETS (one-click prefill)
 * ------------------------------------------------------------------ */

export const industries: Industry[] = [
  {
    id: 'wholesale', icon: 'sales',
    name: {az: 'Topdan ticarət', en: 'Wholesale'},
    spheres: ['accounting', 'tax', 'sales', 'purchase', 'warehouse', 'finance'],
    modules: ['acc-core', 'acc-bank', 'tax-vat', 'tax-eqaime', 'sl-crm', 'sl-ar', 'pu-suppliers', 'pu-orders', 'wh-multi', 'wh-inventory', 'fn-cash'],
    integrations: ['int-banks', 'int-gov', 'int-excel'],
    services: ['sv-impl', 'sv-migrate', 'sv-train', 'sv-support'],
  },
  {
    id: 'retail', icon: 'retail',
    name: {az: 'Pərakəndə ticarət', en: 'Retail'},
    spheres: ['accounting', 'tax', 'sales', 'warehouse', 'retail', 'finance'],
    modules: ['acc-core', 'tax-vat', 'tax-eqaime', 'sl-price', 'wh-multi', 'wh-barcode', 'rt-pos', 'rt-fiscal', 'fn-reports'],
    integrations: ['int-banks', 'int-gov', 'int-eshop'],
    services: ['sv-impl', 'sv-train', 'sv-cloud', 'sv-support'],
  },
  {
    id: 'manufacturing', icon: 'production',
    name: {az: 'İstehsalat', en: 'Manufacturing'},
    spheres: ['accounting', 'tax', 'purchase', 'warehouse', 'production', 'finance', 'bi'],
    modules: ['acc-core', 'acc-assets', 'tax-vat', 'pu-orders', 'wh-multi', 'wh-batch', 'pr-bom', 'pr-cost', 'pr-orders', 'fn-budget', 'bi-cost'],
    integrations: ['int-banks', 'int-gov', 'int-1c'],
    services: ['sv-impl', 'sv-migrate', 'sv-consult', 'sv-support'],
  },
  {
    id: 'services', icon: 'projects',
    name: {az: 'Xidmət sektoru', en: 'Services'},
    spheres: ['accounting', 'tax', 'sales', 'projects', 'finance', 'hr'],
    modules: ['acc-core', 'tax-vat', 'sl-crm', 'sl-contracts', 'pj-track', 'pj-time', 'pj-bill', 'hr-payroll'],
    integrations: ['int-banks', 'int-gov', 'int-messengers'],
    services: ['sv-impl', 'sv-train', 'sv-cloud', 'sv-support'],
  },
  {
    id: 'construction', icon: 'production',
    name: {az: 'Tikinti', en: 'Construction'},
    spheres: ['accounting', 'tax', 'purchase', 'warehouse', 'projects', 'finance'],
    modules: ['acc-core', 'acc-assets', 'tax-vat', 'pu-orders', 'wh-multi', 'pj-track', 'pj-bill', 'fn-budget'],
    integrations: ['int-banks', 'int-gov', 'int-1c'],
    services: ['sv-impl', 'sv-migrate', 'sv-consult', 'sv-support'],
  },
  {
    id: 'horeca', icon: 'retail',
    name: {az: 'Restoran / Otel', en: 'HoReCa'},
    spheres: ['accounting', 'tax', 'warehouse', 'production', 'retail', 'hr'],
    modules: ['acc-core', 'tax-vat', 'wh-batch', 'wh-inventory', 'pr-bom', 'pr-cost', 'rt-pos', 'rt-fiscal', 'hr-time'],
    integrations: ['int-banks', 'int-gov', 'int-eshop'],
    services: ['sv-impl', 'sv-train', 'sv-cloud', 'sv-support'],
  },
  {
    id: 'logistics', icon: 'warehouse',
    name: {az: 'Logistika', en: 'Logistics'},
    spheres: ['accounting', 'tax', 'sales', 'warehouse', 'finance'],
    modules: ['acc-core', 'tax-vat', 'tax-eqaime', 'sl-crm', 'wh-multi', 'fn-cash'],
    integrations: ['int-banks', 'int-gov', 'int-customs'],
    services: ['sv-impl', 'sv-migrate', 'sv-support'],
  },
  {
    id: 'pharma', icon: 'warehouse',
    name: {az: 'Əczaçılıq / Tibb', en: 'Pharma / Medical'},
    spheres: ['accounting', 'tax', 'sales', 'warehouse', 'retail', 'finance'],
    modules: ['acc-core', 'tax-vat', 'tax-eqaime', 'wh-batch', 'wh-barcode', 'rt-pos', 'rt-fiscal', 'fn-reports'],
    integrations: ['int-banks', 'int-gov'],
    services: ['sv-impl', 'sv-migrate', 'sv-train', 'sv-support'],
  },
  {
    id: 'agro', icon: 'production',
    name: {az: 'Aqrar sektor', en: 'Agriculture'},
    spheres: ['accounting', 'tax', 'warehouse', 'production', 'finance'],
    modules: ['acc-core', 'tax-vat', 'wh-multi', 'wh-batch', 'pr-bom', 'pr-cost', 'fn-budget'],
    integrations: ['int-banks', 'int-gov'],
    services: ['sv-impl', 'sv-consult', 'sv-support'],
  },
  {
    id: 'it', icon: 'projects',
    name: {az: 'IT / Texnologiya', en: 'IT / Technology'},
    spheres: ['accounting', 'tax', 'sales', 'projects', 'hr', 'finance'],
    modules: ['acc-core', 'tax-vat', 'sl-crm', 'pj-track', 'pj-time', 'pj-bill', 'hr-payroll', 'fn-reports'],
    integrations: ['int-banks', 'int-gov', 'int-messengers'],
    services: ['sv-impl', 'sv-train', 'sv-cloud', 'sv-support'],
  },
  {
    id: 'distribution', icon: 'sales',
    name: {az: 'Distribusiya', en: 'Distribution'},
    spheres: ['accounting', 'tax', 'sales', 'purchase', 'warehouse', 'finance', 'bi'],
    modules: ['acc-core', 'tax-eqaime', 'sl-crm', 'sl-ar', 'pu-orders', 'wh-multi', 'wh-barcode', 'bi-dash'],
    integrations: ['int-banks', 'int-gov', 'int-telephony'],
    services: ['sv-impl', 'sv-migrate', 'sv-train', 'sv-support'],
  },
  {
    id: 'other', icon: 'bi',
    name: {az: 'Digər', en: 'Other'},
    spheres: ['accounting', 'tax', 'finance'],
    modules: ['acc-core', 'tax-vat'],
    integrations: ['int-banks', 'int-gov'],
    services: ['sv-impl', 'sv-train', 'sv-support'],
  },
];

/* ------------------------------------------------------------------ *
 *  LOOKUP MAPS
 * ------------------------------------------------------------------ */

// niche-specific modules (Axis B) live alongside sphere modules in the
// global module map so the estimator and proposal can resolve every id.
export const allModules: Module[] = [
  ...spheres.flatMap((s) => s.modules),
  ...allNicheModules,
];
export const moduleById = new Map(allModules.map((x) => [x.id, x]));
export const sphereById = new Map(spheres.map((s) => [s.id, s]));
export const sphereOfModule = new Map(
  spheres.flatMap((s) => s.modules.map((mm) => [mm.id, s])),
);
export const integrationById = new Map(integrations.map((x) => [x.id, x]));
export const serviceById = new Map(services.map((x) => [x.id, x]));
export const industryById = new Map(industries.map((x) => [x.id, x]));

export const groupLabels: Record<string, {az: string; en: string}> = {
  foundation: {az: 'Təməl: uçot və maliyyə', en: 'Foundation: accounting & finance'},
  operations: {az: 'Əməliyyatlar', en: 'Operations'},
  people: {az: 'İnsanlar və sənədlər', en: 'People & documents'},
  insight: {az: 'Analitika', en: 'Insight'},
};

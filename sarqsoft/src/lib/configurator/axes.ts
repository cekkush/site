import type {Activity, Module, Niche, SubQuestion} from './types';

/* ================================================================== *
 *  AXIS A — ACTIVITIES (how the business operates)
 *  Each activity is a preset: spheres + modules + integrations + services.
 *  Module / sphere / integration / service ids must exist in catalog.ts.
 * ================================================================== */

export const activities: Activity[] = [
  {
    id: 'retail', icon: 'retail', group: 'trade',
    name: {az: 'Pərakəndə ticarət', en: 'Retail'},
    desc: {az: 'Mağaza, kassa, son istehlakçıya satış.', en: 'Stores, cash desks, sales to end customers.'},
    spheres: ['accounting', 'tax', 'sales', 'warehouse', 'retail', 'finance'],
    modules: ['acc-core', 'tax-vat', 'tax-eqaime', 'sl-price', 'wh-multi', 'wh-barcode', 'rt-pos', 'rt-fiscal', 'fn-reports'],
    integrations: ['int-banks', 'int-gov', 'int-eshop'],
    services: ['sv-impl', 'sv-train', 'sv-cloud', 'sv-support'],
  },
  {
    id: 'wholesale', icon: 'sales', group: 'trade',
    name: {az: 'Topdan ticarət', en: 'Wholesale'},
    desc: {az: 'Böyük partiyalar, B2B müştərilər, debitorlar.', en: 'Bulk lots, B2B customers, receivables.'},
    spheres: ['accounting', 'tax', 'sales', 'purchase', 'warehouse', 'finance'],
    modules: ['acc-core', 'acc-bank', 'tax-vat', 'tax-eqaime', 'sl-crm', 'sl-ar', 'pu-suppliers', 'pu-orders', 'wh-multi', 'wh-inventory', 'fn-cash'],
    integrations: ['int-banks', 'int-gov', 'int-excel'],
    services: ['sv-impl', 'sv-migrate', 'sv-train', 'sv-support'],
  },
  {
    id: 'distribution', icon: 'sales', group: 'trade',
    name: {az: 'Distribusiya', en: 'Distribution'},
    desc: {az: 'Marşrutlar, agentlər, geniş çeşid.', en: 'Routes, field agents, broad assortment.'},
    spheres: ['accounting', 'tax', 'sales', 'purchase', 'warehouse', 'finance', 'bi'],
    modules: ['acc-core', 'tax-eqaime', 'sl-crm', 'sl-ar', 'pu-orders', 'wh-multi', 'wh-barcode', 'bi-dash'],
    integrations: ['int-banks', 'int-gov', 'int-telephony'],
    services: ['sv-impl', 'sv-migrate', 'sv-train', 'sv-support'],
  },
  {
    id: 'ecommerce', icon: 'retail', group: 'trade',
    name: {az: 'E-ticarət / marketpleys', en: 'E-commerce / marketplaces'},
    desc: {az: 'Onlayn satış, sayt və marketpleyslər.', en: 'Online sales, site and marketplaces.'},
    spheres: ['accounting', 'tax', 'sales', 'warehouse', 'finance'],
    modules: ['acc-core', 'tax-vat', 'tax-eqaime', 'sl-crm', 'wh-multi', 'wh-barcode', 'fn-cash'],
    integrations: ['int-eshop', 'int-marketplace', 'int-banks', 'int-gov'],
    services: ['sv-impl', 'sv-integr', 'sv-cloud', 'sv-support'],
  },
  {
    id: 'manufacturing', icon: 'production', group: 'production',
    name: {az: 'İstehsalat', en: 'Manufacturing'},
    desc: {az: 'Resept, maya dəyəri, istehsal sifarişləri.', en: 'Recipes, cost price, production orders.'},
    spheres: ['accounting', 'tax', 'purchase', 'warehouse', 'production', 'finance', 'bi'],
    modules: ['acc-core', 'acc-assets', 'tax-vat', 'pu-orders', 'wh-multi', 'wh-batch', 'pr-bom', 'pr-cost', 'pr-orders', 'fn-budget', 'bi-cost'],
    integrations: ['int-banks', 'int-gov', 'int-1c'],
    services: ['sv-impl', 'sv-migrate', 'sv-consult', 'sv-support'],
  },
  {
    id: 'processing', icon: 'production', group: 'production',
    name: {az: 'Emal / qida sənayesi', en: 'Processing / food industry'},
    desc: {az: 'Xammalın emalı, partiyalar, yararlılıq.', en: 'Raw-material processing, batches, shelf-life.'},
    spheres: ['accounting', 'tax', 'purchase', 'warehouse', 'production', 'finance'],
    modules: ['acc-core', 'tax-vat', 'pu-orders', 'wh-multi', 'wh-batch', 'pr-bom', 'pr-cost', 'fn-budget'],
    integrations: ['int-banks', 'int-gov'],
    services: ['sv-impl', 'sv-migrate', 'sv-consult', 'sv-support'],
  },
  {
    id: 'agro', icon: 'production', group: 'production',
    name: {az: 'Aqrar sektor', en: 'Agriculture'},
    desc: {az: 'Əkin, məhsul, mövsümi uçot.', en: 'Crops, harvest, seasonal accounting.'},
    spheres: ['accounting', 'tax', 'warehouse', 'production', 'finance'],
    modules: ['acc-core', 'tax-vat', 'wh-multi', 'wh-batch', 'pr-bom', 'pr-cost', 'fn-budget'],
    integrations: ['int-banks', 'int-gov'],
    services: ['sv-impl', 'sv-consult', 'sv-support'],
  },
  {
    id: 'construction', icon: 'production', group: 'production',
    name: {az: 'Tikinti / podrat', en: 'Construction / contracting'},
    desc: {az: 'Obyektlər, smetalar, subpodrat.', en: 'Sites, estimates, subcontracting.'},
    spheres: ['accounting', 'tax', 'purchase', 'warehouse', 'projects', 'finance'],
    modules: ['acc-core', 'acc-assets', 'tax-vat', 'pu-orders', 'wh-multi', 'pj-track', 'pj-bill', 'fn-budget'],
    integrations: ['int-banks', 'int-gov', 'int-1c'],
    services: ['sv-impl', 'sv-migrate', 'sv-consult', 'sv-support'],
  },
  {
    id: 'services', icon: 'projects', group: 'service',
    name: {az: 'Xidmətlər (B2B / peşəkar)', en: 'Services (B2B / professional)'},
    desc: {az: 'Layihələr, vaxt uçotu, billinq.', en: 'Projects, time tracking, billing.'},
    spheres: ['accounting', 'tax', 'sales', 'projects', 'finance', 'hr'],
    modules: ['acc-core', 'tax-vat', 'sl-crm', 'sl-contracts', 'pj-track', 'pj-time', 'pj-bill', 'hr-payroll'],
    integrations: ['int-banks', 'int-gov', 'int-messengers'],
    services: ['sv-impl', 'sv-train', 'sv-cloud', 'sv-support'],
  },
  {
    id: 'horeca', icon: 'retail', group: 'service',
    name: {az: 'İaşə / HoReCa', en: 'HoReCa / food service'},
    desc: {az: 'Restoran, kafe, otel — resept və kassa.', en: 'Restaurants, cafés, hotels — recipes and POS.'},
    spheres: ['accounting', 'tax', 'warehouse', 'production', 'retail', 'hr'],
    modules: ['acc-core', 'tax-vat', 'wh-batch', 'wh-inventory', 'pr-bom', 'pr-cost', 'rt-pos', 'rt-fiscal', 'hr-time'],
    integrations: ['int-banks', 'int-gov', 'int-eshop'],
    services: ['sv-impl', 'sv-train', 'sv-cloud', 'sv-support'],
  },
  {
    id: 'logistics', icon: 'warehouse', group: 'service',
    name: {az: 'Logistika / nəqliyyat', en: 'Logistics / transport'},
    desc: {az: 'Daşımalar, anbar, gömrük.', en: 'Shipments, warehousing, customs.'},
    spheres: ['accounting', 'tax', 'sales', 'warehouse', 'finance'],
    modules: ['acc-core', 'tax-vat', 'tax-eqaime', 'sl-crm', 'wh-multi', 'fn-cash'],
    integrations: ['int-banks', 'int-gov', 'int-customs'],
    services: ['sv-impl', 'sv-migrate', 'sv-support'],
  },
  {
    id: 'repair', icon: 'projects', group: 'service',
    name: {az: 'Servis / təmir', en: 'Service / repair'},
    desc: {az: 'Sifariş-naryadlar, ehtiyat hissələri.', en: 'Work orders, spare parts.'},
    spheres: ['accounting', 'tax', 'sales', 'warehouse', 'projects'],
    modules: ['acc-core', 'tax-vat', 'sl-crm', 'sl-contracts', 'wh-multi', 'pj-track', 'pj-bill'],
    integrations: ['int-banks', 'int-gov', 'int-messengers'],
    services: ['sv-impl', 'sv-train', 'sv-support'],
  },
  {
    id: 'foreign', icon: 'purchase', group: 'other',
    name: {az: 'İdxal-ixrac / XİF', en: 'Import-export / foreign trade'},
    desc: {az: 'Valyuta, gömrük, beynəlxalq müqavilələr.', en: 'Currency, customs, international contracts.'},
    spheres: ['accounting', 'tax', 'sales', 'purchase', 'warehouse', 'finance'],
    modules: ['acc-core', 'acc-fx', 'tax-vat', 'pu-suppliers', 'pu-orders', 'wh-multi', 'fn-cash'],
    integrations: ['int-banks', 'int-gov', 'int-customs'],
    services: ['sv-impl', 'sv-migrate', 'sv-consult', 'sv-support'],
  },
  {
    id: 'rental', icon: 'docs', group: 'other',
    name: {az: 'İcarə / prokat / lizinq', en: 'Rental / leasing'},
    desc: {az: 'Müqavilələr, hesablamalar, qaytarmalar.', en: 'Contracts, charges, returns.'},
    spheres: ['accounting', 'tax', 'sales', 'finance', 'docs'],
    modules: ['acc-core', 'acc-assets', 'tax-vat', 'sl-contracts', 'sl-ar', 'fn-cash', 'dc-edm'],
    integrations: ['int-banks', 'int-gov'],
    services: ['sv-impl', 'sv-train', 'sv-support'],
  },
  {
    id: 'subscriptions', icon: 'finance', group: 'other',
    name: {az: 'Abunəliklər / abonement', en: 'Subscriptions / memberships'},
    desc: {az: 'Təkrarlanan ödənişlər, uzatmalar.', en: 'Recurring payments, renewals.'},
    spheres: ['accounting', 'tax', 'sales', 'finance', 'bi'],
    modules: ['acc-core', 'tax-vat', 'sl-crm', 'sl-contracts', 'sl-ar', 'fn-cash', 'bi-dash'],
    integrations: ['int-banks', 'int-gov', 'int-messengers'],
    services: ['sv-impl', 'sv-integr', 'sv-cloud', 'sv-support'],
  },
  {
    id: 'government', icon: 'docs', group: 'other',
    name: {az: 'Dövlət sifarişi / tender (B2G)', en: 'Public procurement / tenders (B2G)'},
    desc: {az: 'Tenderlər, büdcə, sənəd dövriyyəsi.', en: 'Tenders, budgets, document flow.'},
    spheres: ['accounting', 'tax', 'purchase', 'docs', 'finance'],
    modules: ['acc-core', 'tax-vat', 'tax-portal', 'pu-orders', 'dc-edm', 'dc-approve', 'dc-sign', 'fn-budget'],
    integrations: ['int-banks', 'int-gov'],
    services: ['sv-impl', 'sv-consult', 'sv-support'],
  },
];

/* ================================================================== *
 *  AXIS B — NICHES (which vertical it serves)
 *  Each niche adds its own specialised modules + nudges the relevant
 *  universal/operational spheres on.
 * ================================================================== */

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

export const niches: Niche[] = [
  /* ---- health & beauty ---- */
  {
    id: 'pharmacy', icon: 'warehouse', group: 'health',
    name: {az: 'Aptek', en: 'Pharmacy'},
    desc: {az: 'Dərman vasitələri, reseptlər, dövlət tənzimləməsi.', en: 'Medicines, prescriptions, state regulation.'},
    spheres: ['warehouse', 'retail', 'accounting', 'tax', 'sales'],
    integrations: ['int-gov', 'int-banks'],
    modules: [
      m('ph-rx', {az: 'Reseptlə buraxılış', en: 'Prescription dispensing'}, {az: 'Resept uçotu və nəzarətli buraxılış.', en: 'Prescription tracking and controlled dispensing.'}, 3, 1, 400, 900),
      m('ph-batch', {az: 'Seriya, yararlılıq və geri çağırış', en: 'Batches, expiry & recalls'}, {az: 'Partiyalar, son istifadə tarixi, avtomatik geri çağırış.', en: 'Batches, shelf-life, automatic recalls.'}, 3, 1, 350, 800),
      m('ph-price', {az: 'Dövlət qiymət tənzimləməsi', en: 'State price regulation'}, {az: 'Marja limitləri və tənzimlənən qiymətlər.', en: 'Margin caps and regulated prices.'}, 2, 1, 300, 700),
      m('ph-pos', {az: 'Aptek kassası və satınalma', en: 'Pharmacy POS & procurement'}, {az: 'Kassa, barkod, təchizatçı sifarişləri, defektura.', en: 'POS, barcode, supplier orders, shortage list.'}, 3, 1, 400, 950),
    ],
  },
  {
    id: 'clinic', icon: 'hr', group: 'health',
    name: {az: 'Tibb / klinika', en: 'Medical / clinic'},
    desc: {az: 'Pasiyent kartı, qəbul, sığorta.', en: 'Patient records, visits, insurance.'},
    spheres: ['projects', 'sales', 'accounting', 'tax', 'finance'],
    integrations: ['int-messengers', 'int-banks'],
    modules: [
      m('cl-emr', {az: 'Pasiyent kartı (EMR)', en: 'Patient record (EMR)'}, {az: 'Elektron tibbi tarixçə və təyinatlar.', en: 'Electronic medical history and prescriptions.'}, 4, 2, 600, 1300),
      m('cl-appt', {az: 'Qeydiyyat və cədvəl', en: 'Booking & scheduling'}, {az: 'Onlayn qəbul, həkim və kabinet cədvəli.', en: 'Online booking, doctor and room schedule.'}, 3, 1, 400, 900),
      m('cl-ins', {az: 'Sığortalı pasiyentlər', en: 'Insured patients'}, {az: 'Müqaviləli/sığorta pasiyentləri, sığortaya hesablar.', en: 'Contract/insurance patients, billing to insurers.'}, 3, 1, 400, 950),
      m('cl-lab', {az: 'Xidmətlər və laboratoriya', en: 'Services & laboratory'}, {az: 'Xidmət prays-listi, aktlar, laborator analizlər.', en: 'Service price list, acts, lab tests.'}, 3, 1, 350, 800),
    ],
  },
  {
    id: 'dental', icon: 'hr', group: 'health',
    name: {az: 'Stomatologiya', en: 'Dentistry'},
    desc: {az: 'Diş kartı, müalicə planı, kreslolar.', en: 'Dental chart, treatment plan, chairs.'},
    spheres: ['projects', 'sales', 'warehouse', 'accounting'],
    integrations: ['int-messengers'],
    modules: [
      m('dn-chart', {az: 'Kart və diş formulu', en: 'Card & dental formula'}, {az: 'Pasiyent kartı, diş formulu və tarixçə.', en: 'Patient card, dental formula and history.'}, 3, 1, 400, 900),
      m('dn-plan', {az: 'Müalicə planı', en: 'Treatment plan'}, {az: 'Mərhələli plan və dəyər hesablaması.', en: 'Staged plan and cost calculation.'}, 2, 1, 300, 700),
      m('dn-chair', {az: 'Kreslo / həkim cədvəli', en: 'Chair / doctor schedule'}, {az: 'Kresloların və həkimlərin cədvəli, qeydiyyat.', en: 'Chair and doctor scheduling, booking.'}, 2, 1, 300, 700),
      m('dn-mat', {az: 'Materiallar / implantlar', en: 'Materials / implants'}, {az: 'Material anbarı və qəbula silinmə.', en: 'Materials stock and per-visit write-off.'}, 2, 1, 300, 700),
    ],
  },
  {
    id: 'beauty', icon: 'sales', group: 'health',
    name: {az: 'Gözəllik / salon / spa', en: 'Beauty / salon / spa'},
    desc: {az: 'Ustalar, qeydiyyat, xidmət və material.', en: 'Masters, booking, services and materials.'},
    spheres: ['sales', 'retail', 'warehouse', 'accounting'],
    integrations: ['int-messengers'],
    modules: [
      m('bt-book', {az: 'Ustaların qeydiyyatı', en: 'Master booking'}, {az: 'Onlayn qeydiyyat, usta cədvəli, xatırlatmalar.', en: 'Online booking, master schedule, reminders.'}, 3, 1, 350, 850),
      m('bt-mix', {az: 'Xidmət + mal', en: 'Services + goods'}, {az: 'Bir çekdə xidmət və əlavə mallar.', en: 'Services and add-on goods in one receipt.'}, 2, 1, 250, 600),
      m('bt-cons', {az: 'Material sərfi', en: 'Material consumption'}, {az: 'Xidmətə sərf olunan materialların silinməsi.', en: 'Write-off of materials used per service.'}, 2, 1, 250, 600),
      m('bt-loyal', {az: 'Abonement / loyallıq', en: 'Memberships / loyalty'}, {az: 'Abonementlər, loyallıq, hədiyyə sertifikatları.', en: 'Memberships, loyalty, gift certificates.'}, 2, 1, 300, 700),
    ],
  },
  /* ---- retail goods ---- */
  {
    id: 'food', icon: 'retail', group: 'goods',
    name: {az: 'Ərzaq məhsulları', en: 'Food products'},
    desc: {az: 'Çəki malı, yararlılıq, aksiz.', en: 'Weighed goods, shelf-life, excise.'},
    spheres: ['warehouse', 'retail', 'purchase', 'accounting', 'tax'],
    integrations: ['int-gov', 'int-eshop'],
    modules: [
      m('fd-weight', {az: 'Çəki malı + qablaşdırma', en: 'Weighed goods + packing'}, {az: 'Çəki malları, qablaşdırma, tərəzi etiketləri.', en: 'Weighed goods, packing, scale labels.'}, 3, 1, 350, 800),
      m('fd-batch', {az: 'Müddət/partiya + silinmə', en: 'Expiry/batch + write-off'}, {az: 'Partiyalar, yararlılıq, vaxtı keçənin avtomatik silinməsi.', en: 'Batches, shelf-life, auto write-off of expired.'}, 2, 1, 300, 700),
      m('fd-excise', {az: 'Aksiz / markalama', en: 'Excise / marking'}, {az: 'Alkoqol/tütün üzrə aksiz və xüsusi uçot.', en: 'Excise and special accounting for alcohol/tobacco.'}, 2, 1, 300, 750),
      m('fd-horeca', {az: 'Topdan / HoReCa təchizat', en: 'Wholesale / HoReCa supply'}, {az: 'Topdan göndərişlər, qaytarmalar, marşrutlar.', en: 'Wholesale deliveries, returns, routes.'}, 3, 1, 350, 850),
    ],
  },
  {
    id: 'fashion', icon: 'retail', group: 'goods',
    name: {az: 'Moda / geyim / ayaqqabı', en: 'Fashion / apparel / footwear'},
    desc: {az: 'Ölçü-rəng matrisi, mövsüm, kolleksiya.', en: 'Size-colour matrix, seasons, collections.'},
    spheres: ['warehouse', 'retail', 'sales', 'accounting'],
    integrations: ['int-eshop', 'int-marketplace'],
    modules: [
      m('fa-matrix', {az: 'Ölçü-rəng matrisləri', en: 'Size-colour matrices'}, {az: 'Ölçü×rəng (SKU matrisi), sürətli seçim.', en: 'Size×colour (SKU matrix), quick pick.'}, 3, 1, 400, 900),
      m('fa-season', {az: 'Mövsümilik / kolleksiya', en: 'Seasonality / collections'}, {az: 'Kolleksiyalar, mövsümlər, endirimlər, qalıqlar.', en: 'Collections, seasons, sales, leftovers.'}, 2, 1, 300, 700),
      m('fa-sku', {az: 'SKU üzrə barkod', en: 'Barcode per SKU'}, {az: 'SKU barkodu/etiketi, qiymət etiketlərinin çapı.', en: 'SKU barcode/label, price-tag printing.'}, 2, 1, 300, 700),
      m('fa-return', {az: 'Qaytarma / dəyişmə', en: 'Return / exchange'}, {az: 'Geyinmə, qaytarma/dəyişmə, loyallıq.', en: 'Try-on, return/exchange, loyalty.'}, 2, 1, 250, 600),
    ],
  },
  {
    id: 'electronics', icon: 'retail', group: 'goods',
    name: {az: 'Elektronika / texnika', en: 'Electronics / appliances'},
    desc: {az: 'Seriya nömrələri, zəmanət, servis.', en: 'Serial numbers, warranty, service.'},
    spheres: ['warehouse', 'retail', 'sales', 'projects'],
    integrations: ['int-eshop'],
    modules: [
      m('el-serial', {az: 'Seriya nömrələri / IMEI', en: 'Serial numbers / IMEI'}, {az: 'Nüsxə üzrə izləmə (seriya/IMEI).', en: 'Per-unit tracking (serial/IMEI).'}, 3, 1, 350, 800),
      m('el-warr', {az: 'Zəmanət və servis', en: 'Warranty & service'}, {az: 'Zəmanət müddəti, servis/təmir, sifariş-naryad.', en: 'Warranty periods, service/repair, work orders.'}, 3, 1, 400, 900),
      m('el-tradein', {az: 'Trade-in / komissiya', en: 'Trade-in / commission'}, {az: 'Trade-in, komissiya malı, işlənmiş.', en: 'Trade-in, commission goods, used items.'}, 2, 1, 300, 700),
      m('el-kit', {az: 'Dəstlər / aksesuarlar', en: 'Kits / accessories'}, {az: 'Komplektlər, aksesuarlar, kassada apsell.', en: 'Bundles, accessories, upsell at checkout.'}, 2, 1, 250, 600),
    ],
  },
  {
    id: 'furniture', icon: 'warehouse', group: 'goods',
    name: {az: 'Mebel / ev malları', en: 'Furniture / home goods'},
    desc: {az: 'Sifarişlə hazırlama, çatdırılma, montaj.', en: 'Made-to-order, delivery, assembly.'},
    spheres: ['sales', 'warehouse', 'production', 'projects'],
    integrations: ['int-eshop'],
    modules: [
      m('fu-custom', {az: 'Sifarişlə hazırlama', en: 'Made to order'}, {az: 'Müştəri sifarişi ilə hazırlama, hazırlanma müddəti.', en: 'Customer-specific make-to-order, lead times.'}, 3, 1, 400, 950),
      m('fu-deliv', {az: 'Çatdırılma + montaj', en: 'Delivery + assembly'}, {az: 'Çatdırılma, yığım/montaj, briqada qrafiki.', en: 'Delivery, assembly, crew schedule.'}, 2, 1, 300, 750),
      m('fu-big', {az: 'İriqabaritli anbar', en: 'Oversized warehouse'}, {az: 'İriqabarit, rezerv, nümayiş nümunələri.', en: 'Bulky items, reserves, showroom samples.'}, 2, 1, 300, 700),
      m('fu-variant', {az: 'Məhsul modifikasiyaları', en: 'Product modifications'}, {az: 'Variantlar/opsiyalar (rəng/parça/ölçü).', en: 'Variants/options (colour/fabric/size).'}, 2, 1, 300, 700),
    ],
  },
  /* ---- tech & heavy ---- */
  {
    id: 'construction-dev', icon: 'production', group: 'tech',
    name: {az: 'Tikinti / development', en: 'Construction / development'},
    desc: {az: 'Smetalar, obyektlər, subpodrat, aktlar.', en: 'Estimates, sites, subcontracting, acts.'},
    spheres: ['projects', 'purchase', 'warehouse', 'finance', 'accounting'],
    integrations: ['int-1c'],
    modules: [
      m('cd-smeta', {az: 'Smetalar + qiymətlər', en: 'Estimates + rates'}, {az: 'Smetalar, qiymət bazası, iş həcmi cədvəlləri.', en: 'Estimates, rate base, bill-of-works.'}, 4, 2, 550, 1200),
      m('cd-object', {az: 'Obyektlər üzrə uçot', en: 'Per-site accounting'}, {az: 'Obyekt və mərhələ üzrə gəlir/xərc.', en: 'Income/cost by site and stage.'}, 3, 1, 400, 950),
      m('cd-mat', {az: 'Obyektə materiallar', en: 'Materials to site'}, {az: 'Normaya görə materialın obyektə silinməsi.', en: 'Norm-based material write-off to site.'}, 2, 1, 300, 750),
      m('cd-sub', {az: 'Subpodrat + aktlar', en: 'Subcontracting + acts'}, {az: 'Subpodratçılar, görülmüş işlər aktları, texnika.', en: 'Subcontractors, completed-work acts, machinery.'}, 3, 1, 400, 900),
    ],
  },
  {
    id: 'auto', icon: 'production', group: 'tech',
    name: {az: 'Avtobiznes', en: 'Automotive'},
    desc: {az: 'Sifariş-naryad, ehtiyat hissə, VIN.', en: 'Work orders, parts, VIN.'},
    spheres: ['sales', 'warehouse', 'projects', 'accounting'],
    integrations: ['int-messengers'],
    modules: [
      m('au-wo', {az: 'Sifariş-naryadlar', en: 'Work orders'}, {az: 'Sifariş-naryad, normo-saat, iş + ehtiyat hissə.', en: 'Work orders, labour-hours, work + parts.'}, 3, 1, 400, 900),
      m('au-parts', {az: 'Ehtiyat hissə kataloqu', en: 'Spare-parts catalogue'}, {az: 'Analoqlar və tətbiq uyğunluğu ilə kataloq.', en: 'Catalogue with analogues and applicability.'}, 3, 1, 400, 900),
      m('au-vin', {az: 'VIN / avtomobil tarixçəsi', en: 'VIN / vehicle history'}, {az: 'VIN/dövlət nömrəsi, xidmət tarixçəsi.', en: 'VIN/plate, service history.'}, 2, 1, 300, 700),
      m('au-salon', {az: 'Avtosalon', en: 'Car dealership'}, {az: 'Avtomobil satışı, trade-in, komissiya.', en: 'Car sales, trade-in, commission.'}, 3, 1, 400, 950),
    ],
  },
  {
    id: 'oilgas', icon: 'production', group: 'tech',
    name: {az: 'Neft-qaz / sənaye servis', en: 'Oil & gas / industrial service'},
    desc: {az: 'Servis müqavilələri, tender, avadanlıq.', en: 'Service contracts, tenders, equipment.'},
    spheres: ['projects', 'purchase', 'warehouse', 'docs', 'finance'],
    integrations: ['int-gov'],
    modules: [
      m('og-sla', {az: 'Servis müqavilələri (SLA)', en: 'Service contracts (SLA)'}, {az: 'SLA, reqlament xidməti, qrafiklər.', en: 'SLA, scheduled maintenance, calendars.'}, 3, 1, 450, 1000),
      m('og-tender', {az: 'Tenderlər / satınalmalar', en: 'Tenders / procurement'}, {az: 'Tenderlər, təchizatçı kvalifikasiyası.', en: 'Tenders, supplier qualification.'}, 3, 1, 400, 950),
      m('og-equip', {az: 'Avadanlıq / TOİR', en: 'Equipment / maintenance'}, {az: 'Avadanlıq uçotu, iş saatı, təmir.', en: 'Equipment register, run-hours, repairs.'}, 3, 1, 400, 900),
      m('og-field', {az: 'Vахта / sahə işləri', en: 'Rotation / field work'}, {az: 'Vахта/sahə işləri, obyekt üzrə tabel.', en: 'Rotation/field work, per-site timesheets.'}, 2, 1, 350, 800),
    ],
  },
  {
    id: 'it', icon: 'projects', group: 'tech',
    name: {az: 'IT / texnologiya', en: 'IT / technology'},
    desc: {az: 'Lisenziyalar, layihələr, billinq, dəstək.', en: 'Licenses, projects, billing, support.'},
    spheres: ['projects', 'sales', 'finance', 'accounting'],
    integrations: ['int-messengers'],
    modules: [
      m('it-lic', {az: 'Lisenziyalar / abunəliklər', en: 'Licenses / subscriptions'}, {az: 'Lisenziya/abunə, uzatma, MRR.', en: 'License/subscription, renewals, MRR.'}, 3, 1, 350, 850),
      m('it-proj', {az: 'Layihələr / tapşırıqlar', en: 'Projects / tasks'}, {az: 'Layihələr, sprintlər/tapşırıqlar, mərhələlər.', en: 'Projects, sprints/tasks, milestones.'}, 3, 1, 400, 900),
      m('it-time', {az: 'Vaxt uçotu + billinq', en: 'Time tracking + billing'}, {az: 'Saat/mərhələ üzrə vaxt uçotu və billinq.', en: 'Hour/milestone time tracking and billing.'}, 2, 1, 300, 750),
      m('it-help', {az: 'Helpdesk / ticketlər', en: 'Helpdesk / tickets'}, {az: 'Dəstək/ticketlər, SLA.', en: 'Support/tickets, SLA.'}, 2, 1, 300, 750),
    ],
  },
  /* ---- service & other ---- */
  {
    id: 'realestate', icon: 'sales', group: 'service',
    name: {az: 'Daşınmaz əmlak', en: 'Real estate'},
    desc: {az: 'Obyektlər, icarə, komissiya, kommunal.', en: 'Objects, rent, commission, utilities.'},
    spheres: ['sales', 'finance', 'docs', 'accounting'],
    integrations: ['int-banks'],
    modules: [
      m('re-cat', {az: 'Obyektlər kataloqu', en: 'Object catalogue'}, {az: 'Obyektlər, statuslar (boş/bron/satılıb), foto.', en: 'Objects, statuses (free/reserved/sold), photos.'}, 3, 1, 350, 850),
      m('re-rent', {az: 'İcarə + hesablamalar', en: 'Rent + charges'}, {az: 'İcarə müqavilələri, hesablamalar, hesablar.', en: 'Lease contracts, charges, invoices.'}, 3, 1, 400, 900),
      m('re-comm', {az: 'Komissiya / sövdələr', en: 'Commission / deals'}, {az: 'Sövdələr, agent komissiyaları, satış hunisi.', en: 'Deals, agent commissions, sales funnel.'}, 2, 1, 300, 700),
      m('re-util', {az: 'Kommunal / sayğaclar', en: 'Utilities / meters'}, {az: 'Kommunal, sayğaclar, sakin/şəxsi hesablar.', en: 'Utilities, meters, tenant/personal accounts.'}, 2, 1, 300, 750),
    ],
  },
  {
    id: 'education', icon: 'hr', group: 'service',
    name: {az: 'Təhsil / kurslar', en: 'Education / courses'},
    desc: {az: 'Qruplar, cədvəl, təhsil haqqı.', en: 'Groups, schedule, tuition.'},
    spheres: ['sales', 'projects', 'finance', 'accounting', 'hr'],
    integrations: ['int-messengers'],
    modules: [
      m('ed-group', {az: 'Qruplar + cədvəl', en: 'Groups + schedule'}, {az: 'Qruplar/axınlar, dərs cədvəli, auditoriyalar.', en: 'Groups/streams, lesson schedule, rooms.'}, 3, 1, 350, 850),
      m('ed-pay', {az: 'Təhsil haqqının ödənişi', en: 'Tuition payment'}, {az: 'Təhsil haqqı, hissəli ödəniş, borclular.', en: 'Tuition, instalments, debtors.'}, 3, 1, 350, 850),
      m('ed-grade', {az: 'Jurnal / qiymətlər', en: 'Register / grades'}, {az: 'Davamiyyət jurnalı, qiymətlər, nəticələr.', en: 'Attendance register, grades, results.'}, 2, 1, 300, 700),
      m('ed-teach', {az: 'Müəllimlər / yük', en: 'Teachers / workload'}, {az: 'Müəllimlər, dərs yükü, saatla ödəniş.', en: 'Teachers, teaching load, hourly pay.'}, 2, 1, 300, 700),
    ],
  },
  {
    id: 'jewelry', icon: 'retail', group: 'goods',
    name: {az: 'Zərgərlik məmulatları', en: 'Jewelry'},
    desc: {az: 'Əyar, çəki, daşlar, birka uçotu.', en: 'Assay, weight, stones, tag accounting.'},
    spheres: ['warehouse', 'retail', 'production', 'accounting'],
    integrations: ['int-gov'],
    modules: [
      m('jw-assay', {az: 'Əyar/çəki + daşlar', en: 'Assay/weight + stones'}, {az: 'Metal əyarı və çəkisi, daşlar, karat.', en: 'Metal assay and weight, stones, carats.'}, 3, 1, 400, 900),
      m('jw-tag', {az: 'Birkalar / yarlıklar', en: 'Tags / labels'}, {az: 'Birka üzrə uçot, fərdi nüsxə.', en: 'Per-tag accounting, individual item.'}, 2, 1, 350, 800),
      m('jw-toll', {az: 'Davalçeskoy / təmir', en: 'Tolling / repair'}, {az: 'Davalçeskoy xammal, sifarişlə təmir/hazırlama.', en: 'Tolling raw material, made-to-order repair.'}, 2, 1, 300, 750),
      m('jw-pm', {az: 'Qiymətli metal uçotu', en: 'Precious-metal accounting'}, {az: 'Qiymətli metalın xüsusi uçotu, çəki ilə inventar.', en: 'Special precious-metal accounting, weight stock-take.'}, 3, 1, 400, 900),
    ],
  },
  {
    id: 'nonprofit', icon: 'finance', group: 'service',
    name: {az: 'QHT / dövlət büdcəsi', en: 'Nonprofit / public budget'},
    desc: {az: 'Qrantlar, məqsədli maliyyə, hesabatlıq.', en: 'Grants, targeted funding, reporting.'},
    spheres: ['finance', 'accounting', 'docs', 'projects'],
    integrations: ['int-banks', 'int-gov'],
    modules: [
      m('np-grant', {az: 'Qrantlar / məqsədli', en: 'Grants / targeted'}, {az: 'Qrantlar, məqsədli maliyyələşmə, tranşlar.', en: 'Grants, targeted funding, tranches.'}, 3, 1, 400, 900),
      m('np-budget', {az: 'Maddələr üzrə büdcə', en: 'Budget by line'}, {az: 'Maddə/smeta üzrə büdcə, limit nəzarəti.', en: 'Budget by line/estimate, limit control.'}, 3, 1, 400, 900),
      m('np-report', {az: 'Donorlara hesabatlıq', en: 'Donor reporting'}, {az: 'Donor/təsisçi hesabatları, məqsədli istifadə.', en: 'Donor/founder reports, targeted use.'}, 2, 1, 300, 750),
      m('np-proj', {az: 'Layihələr üzrə uçot', en: 'Per-project accounting'}, {az: 'Layihə/fond üzrə ayrıca uçot.', en: 'Separate accounting by project/fund.'}, 2, 1, 300, 700),
    ],
  },
];

/* ================================================================== *
 *  SMART SUB-QUESTIONS
 *  Shown when the parent sphere is active. Each option toggles existing
 *  module ids — so answers refine the solution without new authoring.
 * ================================================================== */

export const subQuestions: SubQuestion[] = [
  {
    id: 'sq-tax', sphere: 'tax', multi: true,
    prompt: {az: 'Vergi və e-sənədlər', en: 'Tax & e-documents'},
    hint: {az: 'Hansılar sizə aiddir?', en: 'Which apply to you?'},
    options: [
      {id: 'vat', name: {az: 'ƏDV ödəyicisiyəm', en: 'I am a VAT payer'}, modules: ['tax-vat']},
      {id: 'eqaime', name: {az: 'e-Qaimə lazımdır', en: 'Need e-Qaimə'}, modules: ['tax-eqaime']},
      {id: 'decl', name: {az: 'Bəyannamələr avtomatik', en: 'Auto declarations'}, modules: ['tax-decl']},
      {id: 'portal', name: {az: 'e-taxes kabineti', en: 'e-taxes portal'}, modules: ['tax-portal']},
    ],
  },
  {
    id: 'sq-acc', sphere: 'accounting', multi: true,
    prompt: {az: 'Uçotun xüsusiyyətləri', en: 'Accounting specifics'},
    options: [
      {id: 'fx', name: {az: 'Çoxvalyutalılıq', en: 'Multi-currency'}, modules: ['acc-fx']},
      {id: 'bank', name: {az: 'Bank çıxarışları avtomatik', en: 'Auto bank statements'}, modules: ['acc-bank']},
      {id: 'assets', name: {az: 'Əsas vəsaitlər', en: 'Fixed assets'}, modules: ['acc-assets']},
    ],
  },
  {
    id: 'sq-wh', sphere: 'warehouse', multi: true,
    prompt: {az: 'Anbar spesifikası', en: 'Warehouse specifics'},
    options: [
      {id: 'multi', name: {az: 'Bir neçə anbar', en: 'Several warehouses'}, modules: ['wh-multi']},
      {id: 'batch', name: {az: 'Partiya / yararlılıq', en: 'Batch / expiry'}, modules: ['wh-batch']},
      {id: 'barcode', name: {az: 'Barkod / skaner', en: 'Barcode / scanner'}, modules: ['wh-barcode']},
      {id: 'inv', name: {az: 'İnventarizasiya', en: 'Stock-taking'}, modules: ['wh-inventory']},
    ],
  },
  {
    id: 'sq-sales', sphere: 'sales', multi: true,
    prompt: {az: 'Satış / CRM', en: 'Sales / CRM'},
    options: [
      {id: 'crm', name: {az: 'Satış hunisi (CRM)', en: 'Sales pipeline (CRM)'}, modules: ['sl-crm']},
      {id: 'price', name: {az: 'Qiymət siyahıları / endirim', en: 'Price lists / discounts'}, modules: ['sl-price']},
      {id: 'ar', name: {az: 'Debitor borclar', en: 'Receivables'}, modules: ['sl-ar']},
      {id: 'contracts', name: {az: 'Müqavilə / hesab-faktura', en: 'Contracts / invoices'}, modules: ['sl-contracts']},
    ],
  },
  {
    id: 'sq-hr', sphere: 'hr', multi: true,
    prompt: {az: 'Kadrlar / əməkhaqqı', en: 'HR / payroll'},
    options: [
      {id: 'payroll', name: {az: 'Əməkhaqqı (DSMF)', en: 'Payroll (DSMF)'}, modules: ['hr-payroll']},
      {id: 'emas', name: {az: 'EMAS (e-gov)', en: 'EMAS (e-gov)'}, modules: ['hr-emas']},
      {id: 'time', name: {az: 'Tabel / davamiyyət', en: 'Timesheet / attendance'}, modules: ['hr-time']},
    ],
  },
  {
    id: 'sq-retail', sphere: 'retail', multi: true,
    prompt: {az: 'Kassa / pərakəndə', en: 'Cash desk / retail'},
    options: [
      {id: 'pos', name: {az: 'POS kassası', en: 'POS cash desk'}, modules: ['rt-pos']},
      {id: 'fiscal', name: {az: 'Fiskal / onlayn kassa', en: 'Fiscal / online cash'}, modules: ['rt-fiscal']},
    ],
  },
  {
    id: 'sq-prod', sphere: 'production', multi: true,
    prompt: {az: 'İstehsalat', en: 'Manufacturing'},
    options: [
      {id: 'bom', name: {az: 'Resept / spesifikasiya (BOM)', en: 'Recipe / BOM'}, modules: ['pr-bom']},
      {id: 'cost', name: {az: 'Maya dəyəri', en: 'Cost price'}, modules: ['pr-cost']},
      {id: 'orders', name: {az: 'İstehsal sifarişləri', en: 'Production orders'}, modules: ['pr-orders']},
    ],
  },
  {
    id: 'sq-fin', sphere: 'finance', multi: true,
    prompt: {az: 'Maliyyə', en: 'Finance'},
    options: [
      {id: 'budget', name: {az: 'Büdcələşdirmə', en: 'Budgeting'}, modules: ['fn-budget']},
      {id: 'cash', name: {az: 'Pul axını / ödəniş təqvimi', en: 'Cash flow / payment calendar'}, modules: ['fn-cash']},
      {id: 'reports', name: {az: 'Maliyyə hesabatları', en: 'Financial statements'}, modules: ['fn-reports']},
    ],
  },
  {
    id: 'sq-docs', sphere: 'docs', multi: true,
    prompt: {az: 'Sənəd dövriyyəsi', en: 'Document flow'},
    options: [
      {id: 'edm', name: {az: 'Elektron sənəd dövriyyəsi', en: 'Electronic document mgmt'}, modules: ['dc-edm']},
      {id: 'approve', name: {az: 'Təsdiq marşrutları', en: 'Approval routes'}, modules: ['dc-approve']},
      {id: 'sign', name: {az: 'ASAN İmza / e-imza', en: 'ASAN İmza / e-signature'}, modules: ['dc-sign']},
    ],
  },
  {
    id: 'sq-bi', sphere: 'bi', multi: true,
    prompt: {az: 'Analitika / BI', en: 'Analytics / BI'},
    options: [
      {id: 'dash', name: {az: 'İdarəedici panellər', en: 'Dashboards'}, modules: ['bi-dash']},
      {id: 'kpi', name: {az: 'KPI / hesabatlar', en: 'KPI / reports'}, modules: ['bi-kpi']},
      {id: 'cost', name: {az: 'Məsrəf mərkəzləri', en: 'Cost centers'}, modules: ['bi-cost']},
    ],
  },
];

/* ------------------------------------------------------------------ *
 *  LOOKUP MAPS (axis data)
 * ------------------------------------------------------------------ */

export const allNicheModules: Module[] = niches.flatMap((n) => n.modules);
export const activityById = new Map(activities.map((a) => [a.id, a]));
export const nicheById = new Map(niches.map((n) => [n.id, n]));
export const nicheOfModule = new Map(
  niches.flatMap((n) => n.modules.map((mm) => [mm.id, n])),
);
export const subQuestionsBySphere = subQuestions.reduce<Record<string, SubQuestion[]>>(
  (acc, q) => {
    (acc[q.sphere] ??= []).push(q);
    return acc;
  },
  {},
);

export const activityGroupLabels: Record<string, {az: string; en: string}> = {
  trade: {az: 'Ticarət', en: 'Trade'},
  production: {az: 'İstehsal / xammal', en: 'Production / raw'},
  service: {az: 'Xidmət / əməliyyat', en: 'Service / operations'},
  other: {az: 'Digər', en: 'Other'},
};

export const nicheGroupLabels: Record<string, {az: string; en: string}> = {
  health: {az: 'Sağlamlıq və gözəllik', en: 'Health & beauty'},
  goods: {az: 'Pərakəndə mallar', en: 'Retail goods'},
  tech: {az: 'Texniki və ağır', en: 'Technical & heavy'},
  service: {az: 'Xidmət və digər', en: 'Service & other'},
};

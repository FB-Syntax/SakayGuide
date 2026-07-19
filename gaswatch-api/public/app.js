/* ─── State ──────────────────────────────────────────────── */
const state = {
  stations: [],
  brands: [],
  areas: [],
  statistics: null,
  history: [],
  advisories: [],
  page: 1,
  limit: 50,
  sort: 'id',
  search: '',
  brand: '',
  area: '',
  loading: false,
  refreshLoading: false,
};

/* ─── DOM References ────────────────────────────────────── */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
  themeToggle: $('#themeToggle'),
  refreshBtn: $('#refreshBtn'),
  searchInput: $('#searchInput'),
  brandFilter: $('#brandFilter'),
  areaFilter: $('#areaFilter'),
  tableBody: $('#tableBody'),
  prevPage: $('#prevPageBtn'),
  nextPage: $('#nextPageBtn'),
  pageInfo: $('#pageInfo'),
  modal: $('#stationModal'),
  modalClose: $('#modalCloseBtn'),
  modalTitle: $('#modalTitle'),
  modalBody: $('#modalBody'),
  toastContainer: $('#toastContainer'),
  statTotalStations: $('#statTotalStations'),
  statTotalBrands: $('#statTotalBrands'),
  statTotalAreas: $('#statTotalAreas'),
  statLastRefresh: $('#statLastRefresh'),
  statCacheAge: $('#statCacheAge'),
  showAdvisoriesBtn: $('#showAdvisoriesBtn'),
  showHistoryBtn: $('#showHistoryBtn'),
};

/* ─── Helpers ───────────────────────────────────────────── */
function formatPrice(price) {
  if (price === null || price === undefined) return '\u2014';
  if (typeof price !== 'number') return '\u2014';
  return price.toFixed(2);
}

function timeAgo(isoString) {
  if (!isoString) return 'never';
  const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function formatDate(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  return d.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
}

function toast(message, type = 'info') {
  const el = document.createElement('div');
  el.className = `toast toast--${type}`;
  el.textContent = message;
  dom.toastContainer.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; setTimeout(() => el.remove(), 300); }, 3500);
}

/* ─── API Client ────────────────────────────────────────── */
async function apiFetch(url, options) {
  const resp = await fetch(url, options);
  if (!resp.ok) {
    const body = await resp.json().catch(() => ({}));
    throw new Error(body.error?.message || `HTTP ${resp.status}`);
  }
  return resp.json();
}

/* ─── Load All Data ─────────────────────────────────────── */
async function loadAllStations() {
  const all = [];
  let page = 1;
  while (true) {
    const data = await apiFetch(`/api/stations?page=${page}&limit=200&sort=id`);
    all.push(...data.data);
    if (page >= data.pages) break;
    page++;
  }
  return all;
}

async function loadAll() {
  state.loading = true;
  renderTable();
  try {
    const [stations, brandsData, areasData, statsData] = await Promise.all([
      loadAllStations(),
      apiFetch('/api/brands'),
      apiFetch('/api/areas'),
      apiFetch('/api/statistics'),
    ]);
    state.stations = stations;
    state.brands = brandsData;
    state.areas = areasData;
    state.statistics = statsData;
    populateFilters();
    updateStats();
  } catch (err) {
    toast('Failed to load dashboard data: ' + err.message, 'error');
  } finally {
    state.loading = false;
    applyFilters();
  }
}

async function loadHistory() {
  try {
    state.history = await apiFetch('/api/history');
  } catch { state.history = []; }
}

async function loadAdvisories() {
  try {
    state.advisories = await apiFetch('/api/advisories');
  } catch { state.advisories = []; }
}

/* ─── Filters ───────────────────────────────────────────── */
function populateFilters() {
  const brandSel = dom.brandFilter;
  const areaSel = dom.areaFilter;
  const currentBrand = brandSel.value;
  const currentArea = areaSel.value;
  brandSel.innerHTML = '<option value="">All Brands</option>';
  areaSel.innerHTML = '<option value="">All Areas</option>';
  if (Array.isArray(state.brands)) {
    state.brands.forEach((b) => {
      const opt = document.createElement('option');
      opt.value = b.id;
      opt.textContent = b.name;
      brandSel.appendChild(opt);
    });
  }
  state.areas.forEach((a) => {
    const opt = document.createElement('option');
    opt.value = a;
    opt.textContent = a;
    areaSel.appendChild(opt);
  });
  brandSel.value = currentBrand;
  areaSel.value = currentArea;
}

/* ─── Stats ─────────────────────────────────────────────── */
function updateStats() {
  const s = state.statistics;
  if (!s) return;
  dom.statTotalStations.textContent = s.totalStations.toLocaleString();
  dom.statTotalBrands.textContent = s.totalBrands;
  dom.statTotalAreas.textContent = s.totalAreas;
  dom.statLastRefresh.textContent = s.lastRefresh ? formatDate(s.lastRefresh) + ' ' + timeAgo(s.lastRefresh) : '--';
  dom.statCacheAge.textContent = s.cacheAge !== null && s.cacheAge !== undefined ? Math.floor(s.cacheAge / 60) + 'm ' + (s.cacheAge % 60) + 's' : '--';
}

/* ─── Table ─────────────────────────────────────────────── */
function applyFilters() {
  const search = dom.searchInput.value.trim().toLowerCase();
  const brand = dom.brandFilter.value;
  const area = dom.areaFilter.value;
  let filtered = state.stations;
  if (search) {
    filtered = filtered.filter((st) =>
      String(st.name).toLowerCase().includes(search) ||
      String(st.brand).toLowerCase().includes(search) ||
      String(st.area).toLowerCase().includes(search)
    );
  }
  if (brand) {
    filtered = filtered.filter((st) => String(st.brand).toLowerCase() === brand.toLowerCase());
  }
  if (area) {
    filtered = filtered.filter((st) => String(st.area).toLowerCase() === area.toLowerCase());
  }
  state.filteredStations = filtered;
  state.page = 1;
  renderTable();
}

function renderTable() {
  const list = state.filteredStations || state.stations;
  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / state.limit));
  if (state.page > pages) state.page = pages;
  const offset = (state.page - 1) * state.limit;
  const pageItems = list.slice(offset, offset + state.limit);
  dom.pageInfo.textContent = `Page ${state.page} of ${pages}`;
  dom.prevPage.disabled = state.page <= 1;
  dom.nextPage.disabled = state.page >= pages;
  if (state.loading) {
    dom.tableBody.innerHTML = '<tr><td colspan="10"><div class="table-empty"><div class="loading-spinner" style="margin:0 auto 8px"></div>Loading stations...</div></td></tr>';
    return;
  }
  if (pageItems.length === 0) {
    dom.tableBody.innerHTML = '<tr><td colspan="10" class="table-empty">No stations found.</td></tr>';
    return;
  }
  dom.tableBody.innerHTML = pageItems.map((st) => {
    const prices = st.prices || {};
    const hasCommunity = st.community && Object.keys(st.community).length > 0;
    return `<tr data-id="${st.id}">
      <td>${st.id}</td>
      <td>${esc(st.brand)}</td>
      <td>${esc(st.name)}</td>
      <td>${esc(st.area)}</td>
      <td class="numeric">${formatPrice(prices.diesel)}</td>
      <td class="numeric">${formatPrice(prices.premiumDiesel)}</td>
      <td class="numeric">${formatPrice(prices.unleaded)}${hasCommunity ? '<span class="badge-community">C</span>' : ''}</td>
      <td class="numeric">${formatPrice(prices.premium95)}</td>
      <td class="numeric">${formatPrice(prices.premium97)}</td>
      <td class="numeric">${formatPrice(prices.kerosene)}</td>
    </tr>`;
  }).join('');
}

function esc(s) {
  if (s === null || s === undefined) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ─── Modal ─────────────────────────────────────────────── */
function openModal(station) {
  dom.modalTitle.textContent = `${esc(station.name)} \u2014 ${esc(station.brand)}`;
  const prices = station.prices || {};
  const community = station.community || {};
  const hasCommunity = Object.keys(community).length > 0;
  const fuelTypes = { diesel: 'Diesel', premiumDiesel: 'Premium Diesel', unleaded: 'Unleaded', premium95: 'Premium 95', premium97: 'Premium 97', kerosene: 'Kerosene' };
  let pricesHtml = Object.entries(fuelTypes).map(([key, label]) => {
    const price = prices[key];
    const comm = community[key];
    const isComm = !!comm;
    return `<div class="modal-field">
      <span class="modal-field-label">${label}</span>
      <span class="modal-field-value">${formatPrice(price)} ${isComm ? '<span class="badge-fuel community">Community</span>' : ''}</span>
    </div>`;
  }).join('');
  let historyHtml = '';
  if (state.history.length > 0) {
    historyHtml = state.history.slice(0, 12).map((wk) => {
      const b = wk.brands && wk.brands[station.brand];
      if (!b) return '';
      return `<div class="modal-section-item">
        <div class="item-date">${esc(wk.label)}</div>
        <div class="item-body">Diesel: ${formatPrice(b.diesel)} \u00b7 Unleaded: ${formatPrice(b.unleaded)}</div>
      </div>`;
    }).filter(Boolean).join('');
    if (historyHtml) historyHtml = `<div class="modal-section"><h3>Price History</h3>${historyHtml}</div>`;
  }
  let advisoriesHtml = '';
  if (state.advisories.length > 0) {
    advisoriesHtml = state.advisories.map((a) => `<div class="modal-section-item">
      <div class="item-date">${esc(a.date)}${a.title ? ' \u2014 ' + esc(a.title) : ''}</div>
      <div class="item-body">${esc(a.body)}</div>
    </div>`).join('');
    if (advisoriesHtml) advisoriesHtml = `<div class="modal-section"><h3>Advisories</h3>${advisoriesHtml}</div>`;
  }
  dom.modalBody.innerHTML = `
    <div class="modal-section">
      <h3>Station Information</h3>
      <div class="modal-grid">
        <div class="modal-field">
          <span class="modal-field-label">Station</span>
          <span class="modal-field-value">${esc(station.name)}</span>
        </div>
        <div class="modal-field">
          <span class="modal-field-label">Brand</span>
          <span class="modal-field-value">${esc(station.brand)}</span>
        </div>
        <div class="modal-field">
          <span class="modal-field-label">Area</span>
          <span class="modal-field-value">${esc(station.area)}</span>
        </div>
        <div class="modal-field">
          <span class="modal-field-label">Coordinates</span>
          <span class="modal-field-value coords">${station.lat != null ? station.lat.toFixed(5) : '\u2014'}, ${station.lng != null ? station.lng.toFixed(5) : '\u2014'}</span>
        </div>
      </div>
    </div>
    <div class="modal-section">
      <h3>Prices ${hasCommunity ? '<span class="badge-community">Community Prices Available</span>' : ''}</h3>
      <div class="modal-grid">${pricesHtml}</div>
    </div>
    ${historyHtml}
    ${advisoriesHtml}
  `;
  dom.modal.classList.add('active');
}

function closeModal() {
  dom.modal.classList.remove('active');
}

/* ─── Theme ─────────────────────────────────────────────── */
function initTheme() {
  const stored = localStorage.getItem('gaswatch-theme');
  const theme = stored || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcons(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('gaswatch-theme', next);
  updateThemeIcons(next);
}

function updateThemeIcons(theme) {
  const moon = document.querySelector('.icon-moon');
  const sun = document.querySelector('.icon-sun');
  if (theme === 'dark') { moon.style.display = 'none'; sun.style.display = 'inline'; }
  else { moon.style.display = 'inline'; sun.style.display = 'none'; }
}

/* ─── Refresh ───────────────────────────────────────────── */
async function handleRefresh() {
  if (state.refreshLoading) return;
  state.refreshLoading = true;
  const spinner = dom.refreshBtn.querySelector('.spinner-small');
  spinner.style.display = 'inline-block';
  dom.refreshBtn.disabled = true;
  try {
    await apiFetch('/api/reload', { method: 'POST' });
    toast('Data refreshed successfully', 'success');
    await loadAll();
  } catch (err) {
    toast('Refresh failed: ' + err.message, 'error');
  } finally {
    state.refreshLoading = false;
    spinner.style.display = 'none';
    dom.refreshBtn.disabled = false;
  }
}

/* ─── Modals for History / Advisories ───────────────────── */
function showHistoryModal() {
  if (!state.history.length) { toast('No price history available', 'info'); return; }
  dom.modalTitle.textContent = 'Price History';
  const html = state.history.map((wk) => {
    const brandRows = wk.brands ? Object.entries(wk.brands).map(([brand, p]) =>
      `<div style="display:flex;justify-content:space-between;gap:12px;font-size:0.85rem;padding:2px 0">
        <span style="font-weight:500">${esc(brand)}</span>
        <span>D: ${formatPrice(p.diesel)} \u00b7 U: ${formatPrice(p.unleaded)}</span>
      </div>`
    ).join('') : '';
    return `<div class="modal-section-item">
      <div class="item-date">${esc(wk.label)}</div>
      <div class="item-body" style="margin-top:6px">
        <div style="display:flex;gap:16px;font-size:0.85rem;color:var(--text-secondary);margin-bottom:4px">
          <span>Avg Diesel: ${formatPrice(wk.dieselAvg)}</span>
          <span>Avg Unleaded: ${formatPrice(wk.unleadedAvg)}</span>
        </div>
        ${brandRows}
      </div>
    </div>`;
  }).join('');
  dom.modalBody.innerHTML = html;
  dom.modal.classList.add('active');
}

function showAdvisoriesModal() {
  if (!state.advisories.length) { toast('No advisories available', 'info'); return; }
  dom.modalTitle.textContent = 'Advisories';
  const html = state.advisories.map((a) => `<div class="modal-section-item">
    <div class="item-date">${esc(a.date)}${a.title ? ' \u2014 ' + esc(a.title) : ''}</div>
    <div class="item-body">${esc(a.body)}</div>
  </div>`).join('');
  dom.modalBody.innerHTML = html;
  dom.modal.classList.add('active');
}

/* ─── Event Listeners ───────────────────────────────────── */
dom.themeToggle.addEventListener('click', toggleTheme);
dom.refreshBtn.addEventListener('click', handleRefresh);
dom.searchInput.addEventListener('input', applyFilters);
dom.brandFilter.addEventListener('change', applyFilters);
dom.areaFilter.addEventListener('change', applyFilters);
dom.prevPage.addEventListener('click', () => { if (state.page > 1) { state.page--; renderTable(); } });
dom.nextPage.addEventListener('click', () => {
  const list = state.filteredStations || state.stations;
  const pages = Math.max(1, Math.ceil(list.length / state.limit));
  if (state.page < pages) { state.page++; renderTable(); }
});
dom.modalClose.addEventListener('click', closeModal);
dom.modal.addEventListener('click', (e) => { if (e.target === dom.modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
dom.tableBody.addEventListener('click', (e) => {
  const tr = e.target.closest('tr');
  if (!tr || !tr.dataset.id) return;
  const id = Number(tr.dataset.id);
  const station = state.stations.find((s) => Number(s.id) === id);
  if (station) openModal(station);
});
dom.showHistoryBtn.addEventListener('click', showHistoryModal);
dom.showAdvisoriesBtn.addEventListener('click', showAdvisoriesModal);

/* ─── Init ──────────────────────────────────────────────── */
initTheme();
(async function init() {
  await Promise.all([loadHistory(), loadAdvisories()]);
  await loadAll();
  toast('Dashboard ready', 'info');
})();

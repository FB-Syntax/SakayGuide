const state = {
  fuelPrices: null,
  fuelLoading: true,
  gasStations: [],
  gasFilteredStations: [],
  gasBrands: [],
  gasUserCoords: null,
  gasMap: null,
  gasMarkers: [],
  gasLoading: false,
  gasSearchTimer: null,
  phFuelData: { avgGas: null, avgDiesel: null, stationCount: 0 },
  advisories: [],
  selectedMode: 'jeepney-traditional',
  calcDistance: 2,
  tricycleDistance: 1,
  map: null,
  trackerMap: null,
  markers: [],
  routes: [],
  userLocation: null,
  gpsAvailable: false,
  locationInProgress: false,
  plannerMap: null,
  plannerMarker: null,
  plannerCoords: null,
  plannerDestMarker: null,
  plannerDestCoords: null,
  plannerPinMode: 'start',
  plannerFlowLayer: null,
  plannerIncidentLayer: null,
  ride: {
    active: false,
    route: null,
    startTime: null,
    elapsed: 0,
    timerInterval: null,
    marker: null,
    trailLayer: null,
    realDistance: 0
  },
  savedData: {
    places: [],
    routes: []
  },
  savedMap: {
    map: null,
    startMarker: null,
    destMarker: null,
    routeLine: null,
    pinMode: null,
    startCoords: null,
    destCoords: null
  },
  traffic: {
    map: null,
    startMarker: null,
    destMarker: null,
    routeLine: null,
    trafficFlowLayer: null,
    trafficIncidentsLayer: null,
    pinMode: null,
    startCoords: null,
    destCoords: null,
    watchId: null,
    address: ''
  },
  notificationsEnabled: false
};

function createPinIcon(color, emoji, size) {
  const s = size || 36;
  const h = Math.round(s * 50 / 36);
  const k = s / 36;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${h}" viewBox="0 0 ${s} ${h}">
    <defs><filter id="s" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="${1.5*k}" dy="${2.5*k}" stdDeviation="${2*k}" flood-opacity="0.35"/></filter></defs>
    <path d="M${18*k},${49*k} C${18*k},${49*k} ${7*k},${34*k} ${7*k},${20*k} A${11*k},${11*k} 0 1,1 ${29*k},${20*k} C${29*k},${34*k} ${18*k},${49*k} ${18*k},${49*k} Z" fill="${color}" filter="url(#s)"/>
  </svg>`;
  return L.divIcon({
    html: `<div style="position:relative;width:${s}px;height:${h}px;background:transparent">${svg}<span style="position:absolute;top:${Math.round(13.5*k)}px;left:50%;transform:translateX(-50%);font-size:${Math.round(11*k)}px;line-height:1;pointer-events:none">${emoji}</span></div>`,
    iconSize: [s, h],
    iconAnchor: [Math.round(s/2), h],
    popupAnchor: [0, -h]
  });
}

function $(id) { return document.getElementById(id); }

function showToast(msg) {
  const el = $('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._hide);
  el._hide = setTimeout(function() { el.classList.remove('show'); }, 3000);
}

function initNotifications() {
  if (!('Notification' in window)) {
    const btn = $('notif-btn');
    if (btn) btn.classList.add('hidden');
    return;
  }
  const pref = localStorage.getItem('sakayguide_notif');
  if (pref === 'on' && Notification.permission === 'granted') {
    state.notificationsEnabled = true;
    updateNotifUI(true);
  }
}

function toggleNotifications() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    state.notificationsEnabled = !state.notificationsEnabled;
    localStorage.setItem('sakayguide_notif', state.notificationsEnabled ? 'on' : 'off');
    updateNotifUI(state.notificationsEnabled);
    showToast(state.notificationsEnabled ? '🔔 Notifications on' : '🔕 Notifications off');
  } else if (Notification.permission === 'denied') {
    showToast('🔕 Notifications blocked in your browser settings');
  } else {
    Notification.requestPermission().then(function(perm) {
      if (perm === 'granted') {
        state.notificationsEnabled = true;
        localStorage.setItem('sakayguide_notif', 'on');
        updateNotifUI(true);
        showToast('🔔 Notifications enabled');
      } else {
        showToast('🔕 Notification permission denied');
      }
    });
  }
}

function updateNotifUI(enabled) {
  const btn = $('notif-btn');
  if (!btn) return;
  btn.textContent = enabled ? '🔔' : '🔕';
  btn.classList.toggle('active', enabled);
  btn.title = enabled ? 'Notifications on' : 'Enable notifications';
}

function notifyUser(title, body) {
  if (!state.notificationsEnabled) return;
  if (Notification.permission !== 'granted') return;
  if (!document.hidden) return;
  try {
    new Notification(title, { body: body, icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚌</text></svg>' });
  } catch (e) { console.warn('Notification failed:', e.message); }
}

/* GASWATCH API */
const GW_API = sakayData.gaswatchApi;

async function fetchGasData() {
  state.gasLoading = true;
  const listEl = $('gas-list');
  var pagBar = $('gas-pagination-bar');
  if (listEl) listEl.innerHTML = '<div class="gas-loading"><span class="spinner"></span> Loading gas stations from GasWatch API...</div>';
  if (pagBar) pagBar.innerHTML = '';
  try {
    const [stationsRes, brandsRes, historyRes, advisoriesRes] = await Promise.all([
      fetch(GW_API + '/stations?limit=5000'),
      fetch(GW_API + '/brands'),
      fetch(GW_API + '/history'),
      fetch(GW_API + '/advisories')
    ]);
    if (!stationsRes.ok) throw new Error('Stations API ' + stationsRes.status);
    const stationsJson = await stationsRes.json();
    if (!stationsJson.success) throw new Error('Invalid stations data');
    state.gasStations = stationsJson.data || [];
    if (brandsRes.ok) {
      const brandsJson = await brandsRes.json();
      state.gasBrands = Array.isArray(brandsJson) ? brandsJson : [];
    }
    if (historyRes.ok) {
      const history = await historyRes.json();
      var prev = Array.isArray(history) && history.length > 1 ? history[1] : null;
      state.prevGasAvg = prev && prev.unleadedAvg != null ? prev.unleadedAvg : null;
      state.prevDieselAvg = prev && prev.dieselAvg != null ? prev.dieselAvg : null;
    } else {
      state.prevGasAvg = null;
      state.prevDieselAvg = null;
    }
    if (advisoriesRes.ok) {
      const advisoriesJson = await advisoriesRes.json();
      state.advisories = Array.isArray(advisoriesJson) ? advisoriesJson : [];
    } else {
      state.advisories = [];
    }
    populateBrandSelect();
    const heroEl = $('hero-gas-stations');
    if (heroEl) heroEl.textContent = state.gasStations.length;
    state.gasFilteredStations = state.gasStations;
    computePHFuelPrices();
    updatePHFuelCard();
    autoDetectAndShow();
  } catch (e) {
    console.warn('GasWatch API fetch failed:', e.message);
    if (listEl) listEl.innerHTML = '<div class="gas-error">⚠️ Could not connect to GasWatch API at localhost:3000. Make sure the server is running.</div>';
    if (pagBar) pagBar.innerHTML = '';
    state.gasStations = [];
    state.gasBrands = [];
    state.advisories = [];
    state.prevGasAvg = null;
    state.prevDieselAvg = null;
  }
  state.gasLoading = false;
}

function populateBrandSelect() {
  const sel = $('gas-brand-select');
  if (!sel) return;
  const current = sel.value;
  sel.innerHTML = '<option value="">All Brands</option>';
  state.gasBrands.forEach(function(b) {
    const opt = document.createElement('option');
    opt.value = (b.id || b.name || '').toLowerCase().trim();
    opt.textContent = b.name + ' (' + b.stations + ')';
    sel.appendChild(opt);
  });
  sel.value = current;
}

function initGasMap() {
  const mapEl = $('gas-map');
  if (!mapEl || state.gasMap) return;
  state.gasMap = L.map('gas-map', {
    center: sakayData.mapCenter,
    zoom: 12,
    zoomControl: true,
    attributionControl: false
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(state.gasMap);
  setTimeout(function() { state.gasMap.invalidateSize(); }, 300);
}

function autoDetectAndShow() {
  const infoEl = $('gas-info-text');
  if (infoEl) infoEl.textContent = '📍 Detecting your location for nearby stations...';
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      function(pos) {
        state.gasUserCoords = [pos.coords.latitude, pos.coords.longitude];
        if (infoEl) infoEl.textContent = '📍 Showing stations near your GPS location';
        sortAndRenderStations();
      },
      function() {
        ipApiFetch().then(function(coords) {
          state.gasUserCoords = coords;
          if (infoEl) infoEl.textContent = '📍 Showing stations near your approximate location (IP-based)';
          sortAndRenderStations();
        }).catch(function() {
          if (infoEl) infoEl.textContent = '📍 Showing all stations — enable GPS to see nearby';
          renderGasStations(state.gasFilteredStations);
        });
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  } else {
    ipApiFetch().then(function(coords) {
      state.gasUserCoords = coords;
      if (infoEl) infoEl.textContent = '📍 Showing stations near your approximate location (IP-based)';
      sortAndRenderStations();
    }).catch(function() {
      if (infoEl) infoEl.textContent = '📍 Showing all stations — enable GPS to see nearby';
      renderGasStations(state.gasFilteredStations);
    });
  }
}

function sortAndRenderStations() {
  var stations = state.gasFilteredStations;
  if (state.gasUserCoords && stations.length > 0) {
    stations = stations.slice().sort(function(a, b) {
      var dA = calcHaversineKm(state.gasUserCoords[0], state.gasUserCoords[1], a.lat || 0, a.lng || 0);
      var dB = calcHaversineKm(state.gasUserCoords[0], state.gasUserCoords[1], b.lat || 0, b.lng || 0);
      return dA - dB;
    });
  }
  renderGasStations(stations);
}

function filterGasStations() {
  gasPage = 1;
  var query = $('gas-search');
  var brand = $('gas-brand-select');
  var q = query ? query.value.trim().toLowerCase() : '';
  var b = brand ? brand.value : '';
  var brandNames = {};
  state.gasBrands.forEach(function(bb) { brandNames[(bb.id || '').toLowerCase().trim()] = (bb.name || '').toLowerCase().trim(); });
  b = b.toLowerCase().trim();
  state.gasFilteredStations = state.gasStations.filter(function(s) {
    if (q && !(s.name || '').toLowerCase().includes(q) && !(s.brand || '').toLowerCase().includes(q) && !(s.area || '').toLowerCase().includes(q) && !(s.city || '').toLowerCase().includes(q) && !(s.address || '').toLowerCase().includes(q)) return false;
    if (b) {
      var sb = (s.brand || '').toLowerCase().trim();
      if (sb !== b && sb !== brandNames[b]) return false;
    }
    return true;
  });
  sortAndRenderStations();
}

var gasPage = 1;
var gasPerPage = 5;

function renderGasStations(stations) {
  const listEl = $('gas-list');
  const pagBar = $('gas-pagination-bar');
  if (!listEl) return;
  if (!stations || stations.length === 0) {
    listEl.innerHTML = '<div class="gas-empty">No gas stations found. Try a different search or brand filter.</div>';
    if (pagBar) pagBar.innerHTML = '';
    clearGasMapMarkers();
    return;
  }
  var totalPages = Math.ceil(stations.length / gasPerPage);
  if (gasPage > totalPages) gasPage = totalPages;
  var start = (gasPage - 1) * gasPerPage;
  var end = Math.min(start + gasPerPage, stations.length);
  var toShow = stations.slice(start, end);
  var html = '';
  toShow.forEach(function(s) {
    var dist = state.gasUserCoords && s.lat != null && s.lng != null
      ? calcHaversineKm(state.gasUserCoords[0], state.gasUserCoords[1], s.lat, s.lng)
      : null;
    var distStr = dist != null ? (dist < 1 ? (dist * 1000).toFixed(0) + 'm' : dist.toFixed(1) + 'km') : '';
    var prices = s.prices || {};
    var gasPrice = prices.unleaded || prices.premium95 || null;
    var dieselPrice = prices.diesel || null;
    var hasCommunity = s.community && Object.keys(s.community).length > 0;
    html += '<div class="gas-station-card" data-lat="' + (s.lat || '') + '" data-lng="' + (s.lng || '') + '">';
    html += '<div class="gas-station-icon">⛽</div>';
    html += '<div class="gas-station-info">';
    html += '<div class="gas-station-name">' + escHtml(s.name || 'Unknown') + '</div>';
    html += '<div class="gas-station-meta">';
    html += '<span class="brand-badge" style="background:' + (getBrandColor(s.brand) || '#dbeafe') + '20;color:' + (getBrandColor(s.brand) || '#1d4ed8') + '">' + escHtml(s.brand || 'Unknown') + '</span>';
    html += escHtml(s.area || '');
    if (hasCommunity) html += ' · <span style="color:#ca8a04">👥 reported</span>';
    html += '</div></div>';
    if (distStr) html += '<div class="gas-station-distance">' + distStr + '</div>';
    html += '<div class="gas-station-prices">';
    if (gasPrice != null) html += '<div class="gas-price-row"><span class="gas-type">Gas </span><span class="gas-value">₱' + Number(gasPrice).toFixed(2) + '</span></div>';
    if (dieselPrice != null) html += '<div class="gas-price-row"><span class="gas-type">Diesel </span><span class="gas-value">₱' + Number(dieselPrice).toFixed(2) + '</span></div>';
    if (gasPrice == null && dieselPrice == null) html += '<div style="font-size:12px;color:var(--gray-400)">No prices</div>';
    html += '</div></div>';
  });
  listEl.innerHTML = html;
  if (pagBar) {
    pagBar.innerHTML = '<div class="gas-pagination">'
      + '<button class="gas-page-btn" id="gas-prev-page"' + (gasPage <= 1 ? ' disabled' : '') + '>← Previous</button>'
      + '<span class="gas-page-info">Page ' + gasPage + ' of ' + totalPages + ' (' + stations.length + ' stations)</span>'
      + '<button class="gas-page-btn" id="gas-next-page"' + (gasPage >= totalPages ? ' disabled' : '') + '>Next →</button>'
      + '</div>';
  }
  updateGasMapMarkers(toShow);
  var prevEl = $('gas-prev-page');
  var nextEl = $('gas-next-page');
  if (prevEl) {
    prevEl.addEventListener('click', function() {
      if (gasPage > 1) { gasPage--; renderGasStations(stations); }
    });
  }
  if (nextEl) {
    nextEl.addEventListener('click', function() {
      if (gasPage < totalPages) { gasPage++; renderGasStations(stations); }
    });
  }
  if (!listEl._gasListBound) {
    listEl._gasListBound = true;
    listEl.addEventListener('click', function(e) {
      var card = e.target.closest('.gas-station-card');
      if (!card) return;
      var lat = parseFloat(card.dataset.lat);
      var lng = parseFloat(card.dataset.lng);
      if (isNaN(lat) || isNaN(lng) || !state.gasMap) return;
      state.gasMap.setView([lat, lng], 16, { animate: true });
      var mapWrap = document.querySelector('.gas-map-container');
      if (mapWrap) mapWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      state.gasMarkers.forEach(function(m) {
        var mPos = m.getLatLng();
        if (Math.abs(mPos.lat - lat) < 0.001 && Math.abs(mPos.lng - lng) < 0.001) {
          m.openPopup();
        }
      });
    });
  }
}

function getBrandColor(brand) {
  var map = {
    'shell': '#ffd500',
    'petron': '#0033a0',
    'caltex': '#e31837',
    'unioil': '#ed1c24',
    'total': '#e11b22',
    'phoenix': '#f7941e',
    'seaoil': '#003da5',
    'flyingv': '#005eb8',
    'ptt': '#1ba0e0',
    'jetti': '#e60000',
    'cleanfuel': '#00a651'
  };
  return map[(brand || '').toLowerCase()] || null;
}

function escHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* PH FUEL PRICE CARD */
function computePHFuelPrices() {
  var stations = state.gasStations;
  var gasPrices = [];
  var dieselPrices = [];
  stations.forEach(function(s) {
    var prices = s.prices || {};
    var gp = prices.unleaded || prices.premium95;
    var dp = prices.diesel;
    if (gp != null && Number.isFinite(Number(gp))) gasPrices.push(Number(gp));
    if (dp != null && Number.isFinite(Number(dp))) dieselPrices.push(Number(dp));
  });
  var avgGas = gasPrices.length ? gasPrices.reduce(function(a,b){return a+b},0) / gasPrices.length : null;
  var avgDiesel = dieselPrices.length ? dieselPrices.reduce(function(a,b){return a+b},0) / dieselPrices.length : null;
  state.phFuelData = {
    avgGas: avgGas,
    avgDiesel: avgDiesel,
    stationCount: gasPrices.length + dieselPrices.length
  };
}

function animateCounter(el, target, prefix) {
  if (target == null) { el.textContent = '—'; return; }
  var start = 0;
  var duration = 800;
  var startTime = null;
  el.classList.add('animating');
  el.textContent = (prefix || '') + '0.00';
  function step(ts) {
    if (!startTime) startTime = ts;
    var progress = Math.min((ts - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = start + (target - start) * eased;
    el.textContent = (prefix || '') + current.toFixed(2);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = (prefix || '') + target.toFixed(2);
      el.classList.remove('animating');
    }
  }
  requestAnimationFrame(step);
}

function formatChange(change) {
  if (change == null) return '';
  var abs = Math.abs(change);
  var arrow = change > 0 ? '▲' : change < 0 ? '▼' : '—';
  var cls = change > 0 ? 'up' : change < 0 ? 'down' : 'flat';
  var text = change === 0 ? '0.00' : (change > 0 ? '+' : '') + abs.toFixed(2);
  return '<span class="' + cls + '">' + arrow + ' ' + text + '</span>';
}

function updatePHFuelCard() {
  var data = state.phFuelData;
  var gasEl = $('phf-gas');
  var dieselEl = $('phf-diesel');
  var subEl = $('phf-sub');
  var gasChangeEl = $('phf-gas-change');
  var dieselChangeEl = $('phf-diesel-change');
  if (!gasEl) return;
  if (data.avgGas == null && data.avgDiesel == null) {
    gasEl.textContent = '—';
    dieselEl.textContent = '—';
    if (gasChangeEl) gasChangeEl.innerHTML = '';
    if (dieselChangeEl) dieselChangeEl.innerHTML = '';
    if (subEl) subEl.innerHTML = 'No price data available · <a class="advisories-link" id="advisories-btn">📢 Advisories</a>';
    return;
  }
  animateCounter(gasEl, data.avgGas, '₱');
  animateCounter(dieselEl, data.avgDiesel, '₱');
  if (gasChangeEl && data.avgGas != null)
    gasChangeEl.innerHTML = formatChange(state.prevGasAvg != null ? data.avgGas - state.prevGasAvg : null);
  if (dieselChangeEl && data.avgDiesel != null)
    dieselChangeEl.innerHTML = formatChange(state.prevDieselAvg != null ? data.avgDiesel - state.prevDieselAvg : null);
  if (subEl) subEl.innerHTML = 'National average across <strong>' + data.stationCount + '</strong> stations · GasWatchPH · <a class="advisories-link" id="advisories-btn">📢 Advisories</a>';
}

function openModal(title, bodyHtml) {
  var overlay = $('modal-overlay');
  var titleEl = $('modal-title');
  var bodyEl = $('modal-body');
  if (!overlay || !titleEl || !bodyEl) return;
  titleEl.textContent = title;
  bodyEl.innerHTML = bodyHtml;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  var overlay = $('modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function showAdvisoriesModal() {
  if (!state.advisories.length) { showToast('No advisories available', 'info'); return; }
  var html = state.advisories.map(function(a) {
    return '<div class="advisory-item">' +
      '<div class="advisory-date">' + escHtml(a.date) + '</div>' +
      '<div class="advisory-title">' + escHtml(a.title) + '</div>' +
      '<div class="advisory-body">' + escHtml(a.body) + '</div>' +
      '</div>';
  }).join('');
  openModal('📢 Fuel Advisories', html);
}

function clearGasMapMarkers() {
  if (state.gasMap && state.gasMarkers.length) {
    state.gasMarkers.forEach(function(m) { state.gasMap.removeLayer(m); });
    state.gasMarkers = [];
  }
}

function updateGasMapMarkers(stations) {
  clearGasMapMarkers();
  if (!state.gasMap) return;
  var validStations = stations.filter(function(s) { return s.lat != null && s.lng != null; });
  if (validStations.length === 0) {
    if (state.gasUserCoords) state.gasMap.setView(state.gasUserCoords, 12);
    return;
  }
  var bounds = [];
  validStations.forEach(function(s) {
    var color = getBrandColor(s.brand) || '#2563eb';
    var icon = L.divIcon({
      html: '<div style="background:' + color + ';color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3)">⛽</div>',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -16]
    });
    var prices = s.prices || {};
    var gasP = prices.unleaded || prices.premium95 || null;
    var dieP = prices.diesel || null;
    var popupHtml = '<div style="font-size:13px"><strong>' + escHtml(s.name) + '</strong><br>' + escHtml(s.brand) + ' · ' + escHtml(s.area);
    if (gasP) popupHtml += '<div class="gas-station-popup-price">⛽ Gasoline: ₱' + Number(gasP).toFixed(2) + '</div>';
    if (dieP) popupHtml += '<div class="gas-station-popup-price">🛢️ Diesel: ₱' + Number(dieP).toFixed(2) + '</div>';
    popupHtml += '</div>';
    var marker = L.marker([s.lat, s.lng], { icon: icon }).addTo(state.gasMap);
    marker.bindPopup(popupHtml);
    state.gasMarkers.push(marker);
    bounds.push([s.lat, s.lng]);
  });
  if (state.gasUserCoords) {
    bounds.push(state.gasUserCoords);
    var userIcon = L.divIcon({
      html: '<div style="background:#22c55e;color:#fff;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.4)">📍</div>',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
    var userMarker = L.marker(state.gasUserCoords, { icon: userIcon }).addTo(state.gasMap);
    state.gasMarkers.push(userMarker);
  }
  if (bounds.length > 1) {
    state.gasMap.fitBounds(L.latLngBounds(bounds), { padding: [40, 40], maxZoom: 14, animate: true });
  } else if (bounds.length === 1) {
    state.gasMap.setView(bounds[0], 13);
  }
}

function detectGasLocation() {
  if (state.locationInProgress) return;
  state.locationInProgress = true;
  var infoEl = $('gas-info-text');
  if (infoEl) infoEl.textContent = '⏳ Locating you...';
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      function(pos) {
        state.locationInProgress = false;
        state.gasUserCoords = [pos.coords.latitude, pos.coords.longitude];
        if (infoEl) infoEl.textContent = '📍 Showing stations near your GPS location';
        sortAndRenderStations();
      },
      function() {
        state.locationInProgress = false;
        ipApiFetch().then(function(coords) {
          state.gasUserCoords = coords;
          if (infoEl) infoEl.textContent = '📍 Showing stations near your approximate location';
          sortAndRenderStations();
        }).catch(function() {
          if (infoEl) infoEl.textContent = '⚠️ Could not determine location';
        });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  } else {
    state.locationInProgress = false;
    ipApiFetch().then(function(coords) {
      state.gasUserCoords = coords;
      if (infoEl) infoEl.textContent = '📍 Using IP-based location';
      sortAndRenderStations();
    }).catch(function() {
      if (infoEl) infoEl.textContent = '⚠️ Could not determine location';
    });
  }
}

function debounce(fn, delay) {
  var timer = null;
  return function() {
    var ctx = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() { fn.apply(ctx, args); }, delay);
  };
}

/* FARE CALCULATION */
function calcJeepneyFare(km, modern) {
  const cfg = modern ? sakayData.fare.jeepneyModern : sakayData.fare.jeepneyTraditional;
  if (km <= cfg.baseKm) return cfg.baseFare;
  const extra = Math.ceil(km - cfg.baseKm);
  return cfg.baseFare + (extra * cfg.perKm);
}

function calcTricycleFare(km) {
  const cfg = sakayData.fare.tricycle;
  if (km <= cfg.flagKm) return cfg.flagdown;
  const segments = Math.ceil((km - cfg.flagKm) / 0.5);
  return cfg.flagdown + segments * 5;
}

function calcFare(km, mode) {
  switch (mode) {
    case 'jeepney-traditional': return calcJeepneyFare(km, false);
    case 'jeepney-modern': return calcJeepneyFare(km, true);
    case 'tricycle': return calcTricycleFare(km);
    default: return 0;
  }
}

function getFareConfig(mode) {
  switch (mode) {
    case 'jeepney-traditional': return sakayData.fare.jeepneyTraditional;
    case 'jeepney-modern': return sakayData.fare.jeepneyModern;
    case 'tricycle': return sakayData.fare.tricycle;
    default: return sakayData.fare.jeepneyTraditional;
  }
}

/* UI UPDATES */
function updateDashboard() {
  const trad = calcJeepneyFare(4, false);
  const modern = calcJeepneyFare(4, true);
  const tricy = calcTricycleFare(1);
  const jeepCard = $('jeepney-card');
  if (jeepCard) {
    jeepCard.querySelector('.card-value').innerHTML = `₱${trad.toFixed(2)}`;
    jeepCard.querySelector('.card-sub').innerHTML = `
      Traditional: ₱14 (first 4km) + ₱2/km · Modern: ₱17 + ₱2.30/km<br>
      <small>Updated ${sakayData.lastFareUpdate} · <a href="${sakayData.sources[0].url}" target="_blank" style="color:var(--blue-500)">LTFRB Order</a></small>
    `;
  }
  const triCard = $('tricycle-card');
  if (triCard) {
    const dist = state.tricycleDistance || 1;
    const fare = calcTricycleFare(dist);
    triCard.querySelector('.card-value').innerHTML = `₱${fare.toFixed(2)}`;
    triCard.querySelector('.card-sub').innerHTML = `
      ₱16 first km + ₱5/500m (₱10/km) · Manila LGU Ord. No. 8979 · Distance: ${dist} km
      <br><small>Source: <a href="${sakayData.sources[2].url}" target="_blank" style="color:var(--blue-500)">Manila Bulletin</a></small>
    `;
    const input = triCard.querySelector('.card-input');
    if (input) input.value = dist;
  }
}

function updateCalculator() {
  const dist = state.calcDistance || 2;
  const mode = state.selectedMode;
  const fare = calcFare(dist, mode);
  const cfg = getFareConfig(mode);
  const output = $('calc-output-price');
  if (output) output.textContent = `₱${fare.toFixed(2)}`;
  const breakdown = $('calc-breakdown');
  if (breakdown) {
    let baseKm = cfg.baseKm || cfg.flagKm;
    let baseFare = cfg.baseFare || cfg.flagdown;
    let perKm = cfg.perKm;
    let extra = Math.max(0, dist - baseKm);
    let extraFare = Math.ceil(extra) * perKm;
    let total = baseFare + extraFare;
    if (mode === 'tricycle') {
      breakdown.innerHTML = `
        <div class="breakdown-item"><span class="label">Flagdown (${baseKm} km)</span><span class="value">₱${baseFare.toFixed(2)}</span></div>
        <div class="breakdown-item"><span class="label">Extra (${Math.ceil(extra)} km × ₱${perKm})</span><span class="value">₱${extraFare.toFixed(2)}</span></div>
        <div class="breakdown-item" style="border-top:1px solid var(--blue-200);padding-top:8px;margin-top:4px">
          <span class="label" style="font-weight:700">Total</span>
          <span class="value" style="font-size:18px;font-weight:800;color:var(--blue-700)">₱${total.toFixed(2)}</span>
        </div>
      `;
    } else {
      breakdown.innerHTML = `
        <div class="breakdown-item"><span class="label">Base fare (${baseKm} km)</span><span class="value">₱${baseFare.toFixed(2)}</span></div>
        <div class="breakdown-item"><span class="label">Succeeding (${Math.ceil(extra)} km × ₱${perKm})</span><span class="value">₱${extraFare.toFixed(2)}</span></div>
        <div class="breakdown-item" style="border-top:1px solid var(--blue-200);padding-top:8px;margin-top:4px">
          <span class="label" style="font-weight:700">Total</span>
          <span class="value" style="font-size:18px;font-weight:800;color:var(--blue-700)">₱${total.toFixed(2)}</span>
        </div>
      `;
    }
  }
  const input = $('calc-distance');
  if (input) input.value = dist;
  const range = $('calc-range-slider');
  if (range) range.value = dist;
  const inputDist = $('calc-dist-display');
  if (inputDist) inputDist.textContent = dist;
  updateFareMatrix(dist, mode);
  updateCompare(dist, mode);
}

function updateCompare(dist, mode) {
  const el = $('calc-compare');
  if (!el) return;
  const trad = calcJeepneyFare(dist, false);
  const modern = calcJeepneyFare(dist, true);
  const trike = calcTricycleFare(dist);
  let modes = [];
  if (mode !== 'jeepney-traditional') modes.push(`Traditional Jeepney: <strong>₱${trad.toFixed(2)}</strong>`);
  if (mode !== 'jeepney-modern') modes.push(`Modern Jeepney: <strong>₱${modern.toFixed(2)}</strong>`);
  if (mode !== 'tricycle') modes.push(`Tricycle: <strong>₱${trike.toFixed(2)}</strong>`);
  el.innerHTML = `Compare: ${modes.join(' · ')}`;
}

function updateFareMatrix(dist, mode) {
  const tbody = $('matrix-body');
  if (!tbody) return;
  const modes = [
    { label: 'Trad. Jeepney', key: 'jeepney-traditional' },
    { label: 'Modern Jeepney', key: 'jeepney-modern' },
    { label: 'Tricycle', key: 'tricycle' }
  ];
  let html = '';
  const range = Math.max(dist + 3, 10);
  for (let km = 1; km <= range; km++) {
    html += `<tr${km === dist ? ' style="background:var(--blue-50)"' : ''}>
      <td class="km-cell">${km} km</td>
      <td class="fare-cell">₱${calcJeepneyFare(km, false).toFixed(2)}</td>
      <td class="fare-cell">₱${calcJeepneyFare(km, true).toFixed(2)}</td>
      <td class="fare-cell">₱${calcTricycleFare(km).toFixed(2)}</td>
    </tr>`;
  }
  tbody.innerHTML = html;
}

/* TRICYCLE DASHBOARD */
function updateTricycleDashboard() {
  const dist = state.tricycleDistance || 1;
  const fare = calcTricycleFare(dist);
  const card = $('tricycle-card');
  if (card) {
    card.querySelector('.card-value').innerHTML = `₱${fare.toFixed(2)}`;
    card.querySelector('.card-sub').innerHTML = `
      ₱16 first km + ₱10/km · Manila LGU Ord. No. 8979 · Distance: ${dist} km
      <br><small>Source: <a href="${sakayData.sources[2].url}" target="_blank" style="color:var(--blue-500)">Manila Bulletin</a></small>
    `;
  }
}

/* MAP */
function initMap() {
  const center = sakayData.mapCenter;
  const zoom = sakayData.zoom;
  state.map = L.map('map', {
    center: center,
    zoom: zoom,
    zoomControl: true,
    attributionControl: true
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(state.map);
  addMarkers();
  setTimeout(() => state.map.invalidateSize(), 200);
}

function addMarkers() {
  sakayData.terminals.forEach(t => {
    const isTerminal = t.type === 'terminal';
    const color = isTerminal ? '#2563eb' : '#8b5cf6';
    const emoji = isTerminal ? '📍' : '🏛️';
    const icon = createPinIcon(color, emoji);
    const transportTags = t.transport.map(m => {
      const map = { tricycle: '🛺', jeepney: '🚌', bus: '🚌' };
      return map[m] || m;
    }).join(' ');
    const popupContent = `
      <h4>${t.name}</h4>
      ${t.address ? `<div class="popup-address">${t.address}</div>` : ''}
      <div class="popup-desc">${t.description}</div>
      <div style="margin-top:6px;font-size:13px">${transportTags} ${t.fareRange ? `· ₱${t.fareRange.min}–₱${t.fareRange.max}` : ''}</div>
    `;
    const marker = L.marker(t.coords, { icon }).addTo(state.map);
    marker.bindPopup(popupContent);
    state.markers.push(marker);
  });
}

function addRoutes() {
  sakayData.routes.forEach(r => {
    const color = r.type === 'jeepney' ? '#2563eb' : '#0ea5e9';
    const dash = r.type === 'jeepney' ? '10, 8' : '5, 5';
    const polyline = L.polyline(r.coords, {
      color: color,
      weight: 3,
      opacity: 0.7,
      dashArray: dash
    }).addTo(state.map);
    let midIdx = Math.floor(r.coords.length / 2);
    let midPoint = r.coords[midIdx];
    const atTerminal = sakayData.terminals.some(t => Math.abs(t.coords[0] - midPoint[0]) < 0.0005 && Math.abs(t.coords[1] - midPoint[1]) < 0.0005);
    if (atTerminal) {
      const alt = midIdx + 1 < r.coords.length ? midIdx + 1 : midIdx - 1;
      if (alt >= 0 && alt < r.coords.length) midPoint = r.coords[alt];
    }
    const icon = L.divIcon({
      html: `<div style="background:${color};color:white;padding:2px 10px;border-radius:12px;font-size:12px;font-weight:600;white-space:nowrap;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.2);line-height:1.4">
        ${r.distance} · ₱${r.fare}
      </div>`,
      iconSize: [160, 28],
      iconAnchor: [80, 14]
    });
    L.marker(midPoint, { icon, interactive: false }).addTo(state.map);
    state.routes.push(polyline);
  });
}

/* TRAFFIC MAP */
function initTrafficMap() {
  const center = sakayData.mapCenter;
  const zoom = sakayData.zoom;
  const t = state.traffic;

  t.map = L.map('traffic-map', {
    center: center,
    zoom: zoom,
    zoomControl: true,
    attributionControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(t.map);

  t.trafficFlowLayer = L.tileLayer(
    'https://api.tomtom.com/traffic/map/4/tile/flow/relative/{z}/{x}/{y}.png?key=' + sakayData.tomtomApiKey,
    { opacity: 0.7, attribution: 'Traffic &copy; TomTom', zIndex: 10 }
  ).addTo(t.map);

  t.trafficIncidentsLayer = L.tileLayer(
    'https://api.tomtom.com/traffic/map/4/tile/incidents/s1/{z}/{x}/{y}.png?key=' + sakayData.tomtomApiKey,
    { opacity: 0.8, zIndex: 11 }
  ).addTo(t.map);

  t.map.on('click', onTrafficMapClick);

  setTimeout(() => t.map.invalidateSize(), 200);
}

function setTrafficPinMode(mode) {
  const t = state.traffic;
  t.pinMode = t.pinMode === mode ? null : mode;
  document.querySelectorAll('.btn-pin').forEach(b => b.classList.remove('active'));
  if (t.pinMode) {
    const btn = document.querySelector(`.btn-pin[data-pin="${t.pinMode}"]`);
    if (btn) btn.classList.add('active');
    showToast(`Click on the map to place ${t.pinMode === 'start' ? '📍 start' : '🏁 destination'} pin`);
  }
}

function onTrafficMapClick(e) {
  const t = state.traffic;
  const mode = t.pinMode;
  if (!mode) return;

  const latlng = e.latlng;
  const icon = createPinIcon(mode === 'start' ? '#22c55e' : '#ef4444', mode === 'start' ? '📍' : '🏁', 32);

  if (mode === 'start') {
    if (t.startMarker) { t.startMarker.setLatLng(latlng); t.map.removeLayer(t.startMarker); }
    t.startMarker = L.marker(latlng, { icon, draggable: true }).addTo(t.map);
    t.startCoords = [latlng.lat, latlng.lng];
    t.startMarker.on('dragend', function() {
      const pos = this.getLatLng();
      t.startCoords = [pos.lat, pos.lng];
      drawTrafficRoute();
    });
  } else {
    if (t.destMarker) { t.destMarker.setLatLng(latlng); t.map.removeLayer(t.destMarker); }
    t.destMarker = L.marker(latlng, { icon, draggable: true }).addTo(t.map);
    t.destCoords = [latlng.lat, latlng.lng];
    t.destMarker.on('dragend', function() {
      const pos = this.getLatLng();
      t.destCoords = [pos.lat, pos.lng];
      drawTrafficRoute();
    });
  }

  document.querySelectorAll('.btn-pin').forEach(b => b.classList.remove('active'));
  t.pinMode = null;
  drawTrafficRoute();
  if (mode === 'start') {
    reverseGeocode(latlng.lat, latlng.lng).then(function(addr) {
      if (addr) { t.address = addr; updateTrafficInfo(); }
    });
  }
}

async function drawTrafficRoute() {
  const t = state.traffic;
  if (t.routeLine) { t.map.removeLayer(t.routeLine); t.routeLine = null; }

  if (!t.startCoords || !t.destCoords) { updateTrafficInfo(); return; }

  $('tinfo-start').innerHTML = '📍 Start: <strong>set</strong>';
  $('tinfo-dest').innerHTML = '🏁 Dest: <strong>set</strong>';
  $('tinfo-dist').innerHTML = '📏 <em>Routing...</em>';
  $('tinfo-time').innerHTML = '⏱ <em>Routing...</em>';

  const url = `https://api.tomtom.com/routing/1/calculateRoute/${t.startCoords[0]},${t.startCoords[1]}:${t.destCoords[0]},${t.destCoords[1]}/json?key=${sakayData.tomtomApiKey}&routeType=fastest&traffic=true&travelMode=car&avoid=unpavedRoads`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();

    if (!data.routes || !data.routes[0] || !data.routes[0].legs || !data.routes[0].legs[0]) {
      throw new Error('Invalid route response');
    }

    const leg = data.routes[0].legs[0];
    const summary = data.routes[0].summary;
    const points = leg.points.map(p => [p.latitude, p.longitude]);

    t.routeLine = L.polyline(points, {
      color: '#2563eb', weight: 5, opacity: 0.85
    }).addTo(t.map);

    const distKm = summary.lengthInMeters / 1000;
    const timeSec = summary.travelTimeInSeconds;
    const trafficDelaySec = summary.trafficDelayInSeconds || 0;
    const totalSec = timeSec + trafficDelaySec;
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    const delayMins = Math.round(trafficDelaySec / 60);

    $('tinfo-dist').innerHTML = `📏 <strong>${distKm.toFixed(1)} km</strong>`;
    if (trafficDelaySec > 60) {
      $('tinfo-time').innerHTML = `⏱ ~${mins}m ${secs}s <span style="font-size:11px;color:#dc2626">(+${delayMins}m delay)</span>`;
    } else {
      $('tinfo-time').innerHTML = `⏱ ~${mins}m ${secs}s <span style="font-size:11px;color:var(--gray-400)">(clear traffic)</span>`;
    }

    t.map.fitBounds(L.latLngBounds(points), { padding: [50, 50], maxZoom: 16, animate: true });

  } catch (e) {
    console.warn('TomTom Routing failed, using straight line fallback:', e.message);

    const dist = calcHaversineKm(t.startCoords[0], t.startCoords[1], t.destCoords[0], t.destCoords[1]);
    const steps = Math.max(6, Math.round(dist * 8));
    const coords = [];
    for (let i = 0; i <= steps; i++) {
      const f = i / steps;
      const lat = t.startCoords[0] + (t.destCoords[0] - t.startCoords[0]) * f;
      const lng = t.startCoords[1] + (t.destCoords[1] - t.startCoords[1]) * f;
      const jitter = (i === 0 || i === steps) ? 0 : (Math.random() - 0.5) * 0.0003;
      coords.push([lat + jitter, lng + jitter]);
    }

    t.routeLine = L.polyline(coords, {
      color: '#2563eb', weight: 4, opacity: 0.8, dashArray: '8, 6'
    }).addTo(t.map);

    t.map.fitBounds(L.latLngBounds([t.startCoords, t.destCoords]), { padding: [50, 50], maxZoom: 16, animate: true });
    updateTrafficInfo();
  }
  updateTrafficSaveBtn();
}

function updateTrafficInfo() {
  const t = state.traffic;
  const startEl = $('tinfo-start');
  const destEl = $('tinfo-dest');
  const distEl = $('tinfo-dist');
  const timeEl = $('tinfo-time');
  const addrEl = $('tinfo-addr');

  if (t.startCoords) {
    startEl.innerHTML = '📍 Start: <strong>set</strong>';
  } else {
    startEl.innerHTML = '📍 Start: <em>not set</em>';
  }

  if (t.destCoords) {
    destEl.innerHTML = '🏁 Dest: <strong>set</strong>';
  } else {
    destEl.innerHTML = '🏁 Dest: <em>not set</em>';
  }

  if (t.address) {
    addrEl.innerHTML = '📍 <span style="font-size:12px">' + escHtml(t.address) + '</span>';
  } else {
    addrEl.innerHTML = '';
  }

  if (t.startCoords && t.destCoords) {
    const dist = calcHaversineKm(t.startCoords[0], t.startCoords[1], t.destCoords[0], t.destCoords[1]);
    const estMin = Math.max(1, Math.round(dist / 0.3));
    distEl.innerHTML = `📏 <strong>${dist.toFixed(1)} km</strong> (straight line)`;
    timeEl.innerHTML = `⏱ ~${estMin} min <span style="font-size:11px;color:var(--gray-400)">(approx)</span>`;
  } else {
    distEl.innerHTML = '📏 —';
    timeEl.innerHTML = '⏱ —';
  }
}

function reverseGeocode(lat, lng) {
  var url = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng + '&addressdetails=1';
  return fetch(url, { headers: { 'Accept-Language': 'en' } })
    .then(function(r) { return r.ok ? r.json() : null; })
    .then(function(d) { return d && d.display_name ? d.display_name : null; })
    .catch(function() { return null; });
}

function setStartPinFromCoords(latlng, accuracy) {
  const t = state.traffic;
  if (t.watchId != null) { navigator.geolocation.clearWatch(t.watchId); t.watchId = null; }
  var icon = createPinIcon('#22c55e', '📍', 32);
  if (t.startMarker) { t.map.removeLayer(t.startMarker); }
  t.startMarker = L.marker(latlng, { icon: icon, draggable: true }).addTo(t.map);
  t.startCoords = [latlng.lat, latlng.lng];
  var accText = accuracy != null ? ' ±' + accuracy.toFixed(0) + 'm' : '';
  t.startMarker.bindPopup('📍 Your location' + accText + '<br><em>Drag to refine</em>');
  t.startMarker.openPopup();
  t.startMarker.on('dragend', function() {
    var p = this.getLatLng();
    t.startCoords = [p.lat, p.lng];
    drawTrafficRoute();
    reverseGeocode(p.lat, p.lng).then(function(addr) {
      if (addr) { t.address = addr; updateTrafficInfo(); }
    });
    showToast('📍 Pin moved. Route updated.');
  });
  t.map.setView(latlng, 16);
  drawTrafficRoute();
  updateTrafficInfo();
  setTimeout(function() { t.startMarker.closePopup(); }, 4000);
  reverseGeocode(latlng.lat, latlng.lng).then(function(addr) {
    if (addr) { t.address = addr; updateTrafficInfo(); }
  });
}

function locateTrafficStart() {
  const t = state.traffic;
  if (!('geolocation' in navigator)) {
    ipApiFetch().then(function(coords) {
      if (!coords) { showToast('GPS not available. Could not locate via IP either.'); return; }
      showToast('📍 Using approximate location (IP-based)');
      setStartPinFromCoords(L.latLng(coords[0], coords[1]), null);
    });
    return;
  }
  showToast('📍 Locating you (improving accuracy)...');
  var bestPos = null;
  t.watchId = navigator.geolocation.watchPosition(
    function(pos) {
      var acc = pos.coords.accuracy || 999;
      if (!bestPos || acc < bestPos.coords.accuracy) {
        bestPos = pos;
        showToast('📍 Accuracy: ±' + acc.toFixed(0) + 'm');
        if (acc < 30) {
          setStartPinFromCoords(L.latLng(pos.coords.latitude, pos.coords.longitude), pos.coords.accuracy);
        }
      }
    },
    function() {
      if (t.watchId != null) { navigator.geolocation.clearWatch(t.watchId); t.watchId = null; }
      ipApiFetch().then(function(coords) {
        if (!coords) { showToast('⚠️ Could not get location. Tap Pin Start to place manually.'); return; }
        showToast('📍 Using approximate location (IP-based)');
        setStartPinFromCoords(L.latLng(coords[0], coords[1]), null);
      });
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
  );
  setTimeout(function() {
    if (t.watchId != null) {
      navigator.geolocation.clearWatch(t.watchId);
      t.watchId = null;
    }
    if (bestPos) {
      setStartPinFromCoords(L.latLng(bestPos.coords.latitude, bestPos.coords.longitude), bestPos.coords.accuracy);
    } else {
      ipApiFetch().then(function(coords) {
        if (!coords) { showToast('⚠️ GPS timed out. Tap Pin Start to place manually.'); return; }
        showToast('📍 Using approximate location (IP-based)');
        setStartPinFromCoords(L.latLng(coords[0], coords[1]), null);
      });
    }
  }, 8000);
}

function clearTrafficAll() {
  const t = state.traffic;
  if (t.watchId != null) { navigator.geolocation.clearWatch(t.watchId); t.watchId = null; }
  if (t.map) {
    if (t.startMarker) { t.map.removeLayer(t.startMarker); }
    if (t.destMarker) { t.map.removeLayer(t.destMarker); }
    if (t.routeLine) { t.map.removeLayer(t.routeLine); }
  }
  t.startMarker = null;
  t.destMarker = null;
  t.routeLine = null;
  t.startCoords = null;
  t.destCoords = null;
  t.address = '';
  t.pinMode = null;
  document.querySelectorAll('.btn-pin').forEach(b => b.classList.remove('active'));
  if (t.map) {
    t.map.setView(sakayData.mapCenter, sakayData.zoom, { animate: true });
  }
  updateTrafficInfo();
  showToast('🗑 Cleared all pins and route');
  updateTrafficSaveBtn();
}

/* SAVED ROUTES & PLACES */
function initSavedData() {
  const raw = localStorage.getItem('sakayguide_saved');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      state.savedData.places = parsed.places || [];
      state.savedData.routes = parsed.routes || [];
    } catch (e) {
      state.savedData.places = [];
      state.savedData.routes = [];
    }
  }
  if (state.savedData.places.length === 0 && state.savedData.routes.length === 0) {
    seedDefaultPlaces();
  }
  renderSaved();
  initSavedMap();
}

function initSavedMap() {
  const s = state.savedMap;
  s.map = L.map('saved-map', {
    center: sakayData.mapCenter,
    zoom: 15,
    zoomControl: true,
    attributionControl: false
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(s.map);
  s.map.on('click', onSavedMapClick);
  setTimeout(() => s.map.invalidateSize(), 300);
}

function setSavedPinMode(mode) {
  const s = state.savedMap;
  s.pinMode = s.pinMode === mode ? null : mode;
  document.querySelectorAll('#sv-pin-start, #sv-pin-dest').forEach(b => b.classList.remove('active'));
  if (s.pinMode) {
    const btn = document.querySelector(s.pinMode === 'start' ? '#sv-pin-start' : '#sv-pin-dest');
    if (btn) btn.classList.add('active');
    $('sv-hint').textContent = `Click the map to place ${s.pinMode === 'start' ? '📍 start' : '🏁 destination'} pin`;
  } else {
    $('sv-hint').textContent = 'Click a pin button, then click the map';
  }
}

function onSavedMapClick(e) {
  const s = state.savedMap;
  const mode = s.pinMode;
  if (!mode) return;
  const latlng = e.latlng;
  const icon = createPinIcon(mode === 'start' ? '#22c55e' : '#ef4444', mode === 'start' ? '📍' : '🏁', 30);

  if (mode === 'start') {
    if (s.startMarker) { s.map.removeLayer(s.startMarker); }
    s.startMarker = L.marker(latlng, { icon, draggable: true }).addTo(s.map);
    s.startCoords = [latlng.lat, latlng.lng];
    s.startMarker.on('dragend', function() {
      s.startCoords = [this.getLatLng().lat, this.getLatLng().lng];
      updateSavedInfo();
    });
  } else {
    if (s.destMarker) { s.map.removeLayer(s.destMarker); }
    s.destMarker = L.marker(latlng, { icon, draggable: true }).addTo(s.map);
    s.destCoords = [latlng.lat, latlng.lng];
    s.destMarker.on('dragend', function() {
      s.destCoords = [this.getLatLng().lat, this.getLatLng().lng];
      updateSavedInfo();
    });
  }

  document.querySelectorAll('#sv-pin-start, #sv-pin-dest').forEach(b => b.classList.remove('active'));
  s.pinMode = null;
  $('sv-hint').textContent = 'Click a pin button, then click the map';
  updateSavedInfo();
}

function updateSavedInfo() {
  const s = state.savedMap;
  const startEl = $('sv-start-label');
  const destEl = $('sv-dest-label');
  startEl.textContent = s.startCoords ? 'set' : 'not set';
  destEl.textContent = s.destCoords ? 'set' : 'not set';
  if (s.startCoords && s.destCoords) {
    drawSavedRoute();
  }
}

async function drawSavedRoute() {
  const s = state.savedMap;
  if (s.routeLine) { s.map.removeLayer(s.routeLine); s.routeLine = null; }
  if (!s.startCoords || !s.destCoords) return;

  const url = `https://api.tomtom.com/routing/1/calculateRoute/${s.startCoords[0]},${s.startCoords[1]}:${s.destCoords[0]},${s.destCoords[1]}/json?key=${sakayData.tomtomApiKey}&routeType=fastest&traffic=true&travelMode=car&avoid=unpavedRoads`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    if (!data.routes?.[0]?.legs?.[0]) throw new Error('Invalid response');
    const points = data.routes[0].legs[0].points.map(p => [p.latitude, p.longitude]);
    s.routeLine = L.polyline(points, { color: '#2563eb', weight: 4, opacity: 0.8 }).addTo(s.map);
    s.map.fitBounds(L.latLngBounds(points), { padding: [30, 30], maxZoom: 16, animate: true });
  } catch (e) {
    console.warn('Saved route routing failed:', e.message);
    const coords = [];
    const steps = 10;
    for (let i = 0; i <= steps; i++) {
      const f = i / steps;
      coords.push([
        s.startCoords[0] + (s.destCoords[0] - s.startCoords[0]) * f + (i > 0 && i < steps ? (Math.random() - 0.5) * 0.0003 : 0),
        s.startCoords[1] + (s.destCoords[1] - s.startCoords[1]) * f + (i > 0 && i < steps ? (Math.random() - 0.5) * 0.0003 : 0)
      ]);
    }
    s.routeLine = L.polyline(coords, { color: '#2563eb', weight: 3, opacity: 0.6, dashArray: '6, 4' }).addTo(s.map);
  }
}

function locateSavedLocation() {
  const s = state.savedMap;
  if (!('geolocation' in navigator)) { showToast('⚠️ GPS not available'); return; }
  showToast('📍 Locating you...');
  navigator.geolocation.getCurrentPosition(
    function(pos) {
      const latlng = L.latLng(pos.coords.latitude, pos.coords.longitude);
      if (s.startMarker) { s.map.removeLayer(s.startMarker); }
      const icon = createPinIcon('#22c55e', '📍', 30);
      s.startMarker = L.marker(latlng, { icon, draggable: true }).addTo(s.map);
      s.startCoords = [latlng.lat, latlng.lng];
      s.startMarker.on('dragend', function() {
        s.startCoords = [this.getLatLng().lat, this.getLatLng().lng];
        updateSavedInfo();
      });
      s.map.setView(latlng, 16);
      updateSavedInfo();
      showToast('✅ Start pin set');
    },
    function() { showToast('⚠️ Could not get location'); },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

function clearSavedPins() {
  const s = state.savedMap;
  if (s.startMarker) { s.map.removeLayer(s.startMarker); s.startMarker = null; }
  if (s.destMarker) { s.map.removeLayer(s.destMarker); s.destMarker = null; }
  if (s.routeLine) { s.map.removeLayer(s.routeLine); s.routeLine = null; }
  s.startCoords = null;
  s.destCoords = null;
  s.pinMode = null;
  document.querySelectorAll('#sv-pin-start, #sv-pin-dest').forEach(b => b.classList.remove('active'));
  $('sv-hint').textContent = 'Click a pin button, then click the map';
  s.map.setView(sakayData.mapCenter, 15, { animate: true });
  updateSavedInfo();
}

function saveRoute() {
  const s = state.savedMap;
  if (!s.startCoords && !s.destCoords) {
    showToast('📍 Pin both start and destination on the map first'); return;
  }
  if (!s.startCoords) {
    showToast('📍 Pin a start location on the map first'); return;
  }
  if (!s.destCoords) {
    showToast('🏁 Pin a destination on the map first'); return;
  }
  const name = $('saved-name').value.trim();
  if (!name) { highlightNameField(true); showToast('⚠️ Enter a name first'); return; }
  if (state.savedData.routes.some(r => r.name.toLowerCase() === name.toLowerCase())) {
    highlightNameField(true); showToast('⚠️ Route name already exists — choose a different name'); return;
  }
  highlightNameField(false);
  state.savedData.routes.unshift({
    id: 'route-' + Date.now(), name: name,
    startCoords: s.startCoords, destCoords: s.destCoords,
    savedAt: new Date().toISOString()
  });
  saveToDisk();
  renderSaved();
  $('saved-name').value = '';
  clearSavedPins();
  showToast('⭐ Route saved!');
  notifyUser('⭐ Route Saved', name);
}

function saveStartAsPlace() {
  const s = state.savedMap;
  if (!s.startCoords) { showToast('⚠️ Set a start pin on the map above'); return; }
  const name = $('saved-name').value.trim();
  if (!name) { highlightNameField(true); showToast('⚠️ Enter a name first'); return; }
  if (state.savedData.places.some(p => p.name.toLowerCase() === name.toLowerCase())) {
    highlightNameField(true); showToast('⚠️ Place name already exists — choose a different name'); return;
  }
  highlightNameField(false);
  state.savedData.places.unshift({
    id: 'place-' + Date.now(), name: name, coords: s.startCoords, address: ''
  });
  saveToDisk();
  renderSaved();
  $('saved-name').value = '';
  showToast('📍 Place saved!');
}

function saveDestAsPlace() {
  const s = state.savedMap;
  if (!s.destCoords) { showToast('⚠️ Set a destination pin on the map above'); return; }
  const name = $('saved-name').value.trim();
  if (!name) { highlightNameField(true); showToast('⚠️ Enter a name first'); return; }
  if (state.savedData.places.some(p => p.name.toLowerCase() === name.toLowerCase())) {
    highlightNameField(true); showToast('⚠️ Place name already exists — choose a different name'); return;
  }
  highlightNameField(false);
  state.savedData.places.unshift({
    id: 'place-' + Date.now(), name: name, coords: s.destCoords, address: ''
  });
  saveToDisk();
  renderSaved();
  $('saved-name').value = '';
  showToast('📍 Place saved!');
}

function highlightNameField(on) {
  const el = $('saved-name');
  if (!el) return;
  if (on) {
    el.style.borderColor = '#dc2626';
    el.style.backgroundColor = '#fef2f2';
    el.focus();
  } else {
    el.style.borderColor = '';
    el.style.backgroundColor = '';
  }
}

function seedDefaultPlaces() {
  const defaults = [
    { name: 'Mapúa University', coords: [14.5891, 120.9748], address: '658 Muralla St, Intramuros' },
    { name: 'Intramuros Tricycle Terminal', coords: [14.5880, 120.9765], address: 'Muralla St, Intramuros' },
    { name: 'Lawton Terminal', coords: [14.5928, 120.9758], address: 'Lawton Ave, Manila' },
    { name: 'Pier 15 Terminal', coords: [14.5848, 120.9692], address: 'Andres Soriano Jr. Ave, Manila' },
    { name: 'Letran College', coords: [14.5922, 120.9782], address: '151 Muralla St, Intramuros' },
    { name: 'San Luis Complex', coords: [14.5878, 120.9732], address: 'General Luna St, Intramuros' },
    { name: 'Fort Santiago', coords: [14.5948, 120.9705], address: 'Fort Santiago, Intramuros' }
  ];
  defaults.forEach((p, i) => {
    state.savedData.places.push({ id: 'default-' + i, name: p.name, coords: p.coords, address: p.address || '' });
  });
  saveToDisk();
}

function saveToDisk() {
  try { localStorage.setItem('sakayguide_saved', JSON.stringify(state.savedData)); }
  catch (e) { console.warn('localStorage write failed:', e.message); }
}

function goToTraffic() {
  document.getElementById('traffic-section').scrollIntoView({ behavior: 'smooth' });
}

function loadRouteToTraffic(routeId) {
  const route = state.savedData.routes.find(r => r.id === routeId);
  if (!route) return;
  clearTrafficAll();
  const t = state.traffic;
  if (!t.map) { showToast('⚠️ Traffic map not ready'); return; }
  const startIcon = createPinIcon('#22c55e', '📍', 32);
  const destIcon = createPinIcon('#ef4444', '🏁', 32);
  t.startMarker = L.marker(route.startCoords, { icon: startIcon, draggable: true }).addTo(t.map);
  t.startCoords = route.startCoords;
  t.startMarker.on('dragend', function() {
    t.startCoords = [this.getLatLng().lat, this.getLatLng().lng];
    drawTrafficRoute();
  });
  t.destMarker = L.marker(route.destCoords, { icon: destIcon, draggable: true }).addTo(t.map);
  t.destCoords = route.destCoords;
  t.destMarker.on('dragend', function() {
    t.destCoords = [this.getLatLng().lat, this.getLatLng().lng];
    drawTrafficRoute();
  });
  goToTraffic();
  setTimeout(function() {
    t.map.invalidateSize();
    t.map.fitBounds(L.latLngBounds([route.startCoords, route.destCoords]), { padding: [50, 50], maxZoom: 16, animate: true });
    drawTrafficRoute();
  }, 400);
  showToast('🔄 Route loaded');
}

function setPlaceOnTraffic(placeId, target) {
  const place = state.savedData.places.find(p => p.id === placeId);
  if (!place) return;
  const t = state.traffic;
  if (target === 'start') {
    if (t.startMarker) { t.map.removeLayer(t.startMarker); }
    const icon = createPinIcon('#22c55e', '📍', 32);
    t.startMarker = L.marker(place.coords, { icon, draggable: true }).addTo(t.map);
    t.startCoords = place.coords;
    t.startMarker.on('dragend', function() {
      t.startCoords = [this.getLatLng().lat, this.getLatLng().lng];
      drawTrafficRoute();
    });
  } else {
    if (t.destMarker) { t.map.removeLayer(t.destMarker); }
    const icon = createPinIcon('#ef4444', '🏁', 32);
    t.destMarker = L.marker(place.coords, { icon, draggable: true }).addTo(t.map);
    t.destCoords = place.coords;
    t.destMarker.on('dragend', function() {
      t.destCoords = [this.getLatLng().lat, this.getLatLng().lng];
      drawTrafficRoute();
    });
  }
  goToTraffic();
  setTimeout(function() {
    t.map.invalidateSize();
    if (t.startCoords && t.destCoords) {
      drawTrafficRoute();
    } else {
      t.map.setView(place.coords, 16, { animate: true });
      updateTrafficInfo();
    }
  }, 400);
}

function deleteSavedItem(type, id) {
  if (type === 'place') {
    state.savedData.places = state.savedData.places.filter(p => p.id !== id);
  } else {
    state.savedData.routes = state.savedData.routes.filter(r => r.id !== id);
  }
  saveToDisk();
  renderSaved();
  showToast('🗑 Deleted');
}

function renderSaved() {
  renderPlaces();
  renderRoutes();
  const total = state.savedData.places.length + state.savedData.routes.length;
  const empty = $('saved-empty');
  if (empty) empty.style.display = total === 0 ? 'block' : 'none';
}

function renderPlaces() {
  const el = $('saved-places');
  if (!el) return;
  if (state.savedData.places.length === 0) { el.innerHTML = ''; return; }
  let html = '';
  state.savedData.places.forEach(p => {
    const label = p.name.length > 22 ? p.name.slice(0, 22) + '…' : p.name;
    html += `
      <div class="saved-card saved-card-place">
        <div class="saved-card-header">
          <span class="saved-card-icon">📍</span>
          <span class="saved-card-name" title="${p.name}">${label}</span>
          <button class="saved-card-del" onclick="deleteSavedItem('place','${p.id}')" title="Delete">✕</button>
        </div>
        ${p.address ? `<div class="saved-card-addr">${p.address}</div>` : ''}
        <div class="saved-card-actions">
          <button class="saved-card-btn" onclick="setPlaceOnTraffic('${p.id}','start')">📍 Start</button>
          <button class="saved-card-btn" onclick="setPlaceOnTraffic('${p.id}','dest')">🏁 Dest</button>
        </div>
      </div>`;
  });
  el.innerHTML = html;
}

function renderRoutes() {
  const el = $('saved-routes');
  if (!el) return;
  if (state.savedData.routes.length === 0) { el.innerHTML = ''; return; }
  let html = '';
  state.savedData.routes.forEach(r => {
    const label = r.name.length > 28 ? r.name.slice(0, 28) + '…' : r.name;
    const day = r.savedAt ? new Date(r.savedAt).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' }) : '';
    html += `
      <div class="saved-card saved-card-route">
        <div class="saved-card-header">
          <span class="saved-card-icon">🛤️</span>
          <span class="saved-card-name" title="${r.name}">${label}</span>
          <span class="saved-card-date">${day}</span>
          <button class="saved-card-del" onclick="deleteSavedItem('route','${r.id}')" title="Delete">✕</button>
        </div>
        <div class="saved-card-actions">
          <button class="saved-card-btn primary" onclick="loadRouteToTraffic('${r.id}')">🔄 Load</button>
        </div>
      </div>`;
  });
  el.innerHTML = html;
}

function switchSavedTab(tab) {
  document.querySelectorAll('.saved-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  const places = $('saved-places');
  const routes = $('saved-routes');
  if (places) places.style.display = tab === 'places' ? '' : 'none';
  if (routes) routes.style.display = tab === 'routes' ? '' : 'none';
}

function updateTrafficSaveBtn() {
  const el = $('traffic-save');
  if (!el) return;
  el.style.display = (state.traffic.startCoords && state.traffic.destCoords) ? 'flex' : 'none';
}

/* RIDE TRACKER */
function initRoutePlanner() {
  const endSel = $('planner-end');
  if (!endSel) return;
  endSel.addEventListener('change', onEndChanged);
  $('planner-mode').addEventListener('change', updateRoutePlanner);

  const startSel = $('planner-start');
  if (startSel) startSel.addEventListener('change', onStartChanged);

  state.userLocation = sakayData.terminals.find(t => t.id === 'mapua').coords;
  state.gpsAvailable = false;

  initPlannerMap();
  populateStartDropdown('user');
  populateEndDropdown();
  detectLocation();
}

function initPlannerMap() {
  var el = $('planner-map');
  if (!el || state.plannerMap) return;
  var coords = state.userLocation || [14.5876, 120.9742];
  state.plannerMap = L.map(el, {
    center: coords, zoom: 15,
    zoomControl: true, attributionControl: false
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(state.plannerMap);
  setTimeout(function() { state.plannerMap.invalidateSize(); }, 300);

  var key = sakayData.tomtomApiKey;
  state.plannerFlowLayer = L.tileLayer('https://api.tomtom.com/traffic/map/4/tile/flow/relative/{z}/{x}/{y}.png?key=' + key,
    { opacity: 0.7, attribution: 'Traffic &copy; TomTom', zIndex: 10 });
  state.plannerIncidentLayer = L.tileLayer('https://api.tomtom.com/traffic/map/4/tile/incidents/s1/{z}/{x}/{y}.png?key=' + key,
    { opacity: 1, attribution: 'Incidents &copy; TomTom', zIndex: 11 });

  var icon = createPinIcon('#2563eb', '📍', 32);
  state.plannerMarker = L.marker(coords, { icon: icon, draggable: true }).addTo(state.plannerMap);
  state.plannerCoords = coords;
  state.plannerMarker.bindPopup('📍 Start<br><em>Drag to move</em>').openPopup();
  state.plannerMarker.on('dragend', function() {
    var p = this.getLatLng();
    state.plannerCoords = [p.lat, p.lng];
    setPlannerPinMode(null);
    populateStartDropdown('custom');
    updateRoutePlanner();
  });

  var destIcon = createPinIcon('#ef4444', '🏁', 32);
  state.plannerDestMarker = L.marker(coords, { icon: destIcon, draggable: true });
  state.plannerDestMarker.on('dragend', function() {
    var p = this.getLatLng();
    state.plannerDestCoords = [p.lat, p.lng];
    if (!state.plannerDestMarker._map) state.plannerDestMarker.addTo(state.plannerMap);
    setPlannerPinMode(null);
    populateEndDropdown('custom');
    updateRoutePlanner();
  });

  state.plannerMap.on('click', function(e) {
    if (state.plannerPinMode === 'dest') {
      state.plannerDestCoords = [e.latlng.lat, e.latlng.lng];
      state.plannerDestMarker.setLatLng(e.latlng);
      if (!state.plannerDestMarker._map) state.plannerDestMarker.addTo(state.plannerMap);
      setPlannerPinMode(null);
      populateEndDropdown('custom');
    } else {
      state.plannerCoords = [e.latlng.lat, e.latlng.lng];
      state.plannerMarker.setLatLng(e.latlng);
      populateStartDropdown('custom');
    }
    updateRoutePlanner();
  });

  $('planner-pin-start').addEventListener('click', function() { setPlannerPinMode('start'); });
  $('planner-pin-dest').addEventListener('click', function() { setPlannerPinMode('dest'); });
  setPlannerPinMode(null);
}

function setPlannerPinMode(mode) {
  state.plannerPinMode = mode;
  document.querySelectorAll('.btn-pin-sm').forEach(function(b) {
    b.classList.toggle('active', b.dataset.pin === mode);
  });
  var hint = $('planner-map-hint');
  if (mode === 'dest') hint.textContent = '🏁 Click the map to place destination';
  else if (mode === 'start') hint.textContent = '📍 Click the map to place start';
  else hint.textContent = '📍 Drag pins or click Start / Dest to place';
}

function onStartChanged() {
  var sel = $('planner-start');
  var val = sel ? sel.value : '';
  if (val === 'user' && state.userLocation) {
    state.plannerCoords = state.userLocation;
    state.plannerMarker.setLatLng(state.userLocation);
    state.plannerMap.setView(state.userLocation, 15);
  } else if (val === 'custom') {
    // keep current plannerCoords as-is
  } else if (val) {
    var term = sakayData.terminals.find(function(t) { return t.id === val; });
    if (term) {
      state.plannerCoords = term.coords;
      state.plannerMarker.setLatLng(term.coords);
      state.plannerMap.setView(term.coords, 16);
    }
  }
  setPlannerPinMode(null);
  updateRoutePlanner();
}

function findNearbyTerminals(coords, limit) {
  limit = limit || 5;
  var withDist = sakayData.terminals.map(function(t) {
    var d = calcHaversineKm(coords[0], coords[1], t.coords[0], t.coords[1]);
    return { terminal: t, dist: d };
  });
  withDist.sort(function(a, b) { return a.dist - b.dist; });
  return withDist.slice(0, limit);
}

function populateStartDropdown(activeVal) {
  var sel = $('planner-start');
  if (!sel) return;
  sel.innerHTML = '';
  var frag = document.createDocumentFragment();

  var myLoc = document.createElement('option');
  myLoc.value = 'user';
  myLoc.textContent = state.gpsAvailable ? '📍 My Location (GPS)' : '📍 My Location (approx)';
  if (activeVal === 'user') myLoc.selected = true;
  if (!state.userLocation) myLoc.disabled = true;
  frag.appendChild(myLoc);

  var pinOpt = document.createElement('option');
  pinOpt.value = 'custom';
  pinOpt.textContent = '📍 Pin on Map';
  if (activeVal === 'custom') pinOpt.selected = true;
  frag.appendChild(pinOpt);

  if (state.userLocation) {
    var nearby = findNearbyTerminals(state.userLocation, 5);
    if (nearby.length > 0) {
      var sep = document.createElement('option');
      sep.disabled = true;
      sep.textContent = '─ Nearby Terminals ─';
      frag.appendChild(sep);
      nearby.forEach(function(item) {
        var opt = document.createElement('option');
        opt.value = item.terminal.id;
        opt.textContent = item.terminal.name + ' (' + item.dist.toFixed(2) + ' km)';
        if (activeVal === item.terminal.id) opt.selected = true;
        frag.appendChild(opt);
      });
    }
  }

  sel.appendChild(frag);
}

function populateEndDropdown(activeVal) {
  var sel = $('planner-end');
  if (!sel) return;
  sel.innerHTML = '';
  var frag = document.createDocumentFragment();

  var pinOpt = document.createElement('option');
  pinOpt.value = 'custom';
  pinOpt.textContent = '📍 Pin on Map';
  if (activeVal === 'custom') pinOpt.selected = true;
  frag.appendChild(pinOpt);

  var sep = document.createElement('option');
  sep.disabled = true;
  sep.textContent = '─ Terminals ─';
  frag.appendChild(sep);

  sakayData.terminals.forEach(function(t) {
    var opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = (t.id === 'mapua' ? '🏛️' : '📍') + ' ' + t.name;
    if (activeVal === t.id) opt.selected = true;
    frag.appendChild(opt);
  });

  sel.appendChild(frag);
}

function onEndChanged() {
  var val = $('planner-end').value;
  if (val === 'custom') {
    if (!state.plannerDestCoords) setPlannerPinMode('dest');
  } else if (val) {
    var term = sakayData.terminals.find(function(t) { return t.id === val; });
    if (term) {
      state.plannerDestCoords = term.coords;
      state.plannerDestMarker.setLatLng(term.coords);
      if (!state.plannerDestMarker._map) state.plannerDestMarker.addTo(state.plannerMap);
      state.plannerMap.setView(term.coords, 16);
    }
  }
  setPlannerPinMode(null);
  updateRoutePlanner();
}

function getDestCoords() {
  var sel = $('planner-end');
  if (!sel) return null;
  var val = sel.value;
  if (val === 'custom') return state.plannerDestCoords;
  if (val) {
    var t = sakayData.terminals.find(function(x) { return x.id === val; });
    if (t) return t.coords;
  }
  return null;
}

function getDestLabel() {
  var sel = $('planner-end');
  if (!sel) return '🏁 End';
  var val = sel.value;
  if (val === 'custom') return '📍 Pin on Map';
  if (val) {
    var t = sakayData.terminals.find(function(x) { return x.id === val; });
    if (t) return '📍 ' + t.name;
  }
  return '🏁 End';
}

function ipApiFetch() {
  return fetch('https://ipapi.co/json/')
    .then(r => { if (!r.ok) throw new Error(); return r.json(); })
    .then(d => { if (d.latitude && d.longitude) return [d.latitude, d.longitude]; throw new Error(); })
    .catch(() => fetch('https://ip-api.com/json/?fields=lat,lon,status')
      .then(r => r.json())
      .then(d => { if (d.status === 'success') return [d.lat, d.lon]; throw new Error(); })
    );
}

function detectLocation() {
  if (state.locationInProgress) return;
  state.locationInProgress = true;
  const gpsEl = $('gps-status');
  if (gpsEl) {
    gpsEl.textContent = '⏳ Detecting your location...';
    gpsEl.className = 'gps-status waiting';
  }

  const finish = (ok, coords, source) => {
    if (!state.locationInProgress) return;
    state.locationInProgress = false;
    if (ok) {
      state.userLocation = coords;
      state.gpsAvailable = true;
      if (gpsEl) {
        gpsEl.textContent = `📍 ${source === 'gps' ? 'Location detected (GPS)' : 'Location detected (IP)'}`;
        gpsEl.className = 'gps-status ok';
      }
      if (state.plannerMarker) {
        state.plannerMarker.setLatLng(coords);
        state.plannerMap.setView(coords, 15);
      }
      state.plannerCoords = coords;
      populateStartDropdown('user');
      autoPlaceTrafficPin();
    } else {
      state.gpsAvailable = false;
      if (gpsEl) {
        gpsEl.textContent = '📍 Using Mapúa as default location';
        gpsEl.className = 'gps-status waiting';
      }
      populateStartDropdown('user');
    }
    updateRoutePlanner();
  };

  const timeout = setTimeout(function() {
    finish(false);
  }, 12000);
  var settled = false;
  const once = function(ok, coords, source) {
    if (settled) return;
    settled = true;
    clearTimeout(timeout);
    state.locationInProgress = false;
    finish(ok, coords, source);
  };

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      function(pos) { once(true, [pos.coords.latitude, pos.coords.longitude], 'gps'); },
      function() {},
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 }
    );
  }

  setTimeout(function() {
    ipApiFetch().then(function(c) { once(true, c, 'ip'); }).catch(function() {});
  }, 2000);
}

function autoPlaceTrafficPin() {
  var t = state.traffic;
  if (!t || !t.map || !state.userLocation) return;
  var latlng = L.latLng(state.userLocation[0], state.userLocation[1]);
  if (t.startCoords) { clearTrafficAll(); }
  var icon = createPinIcon('#22c55e', '📍', 32);
  t.startMarker = L.marker(latlng, { icon: icon, draggable: true }).addTo(t.map);
  t.startCoords = [latlng.lat, latlng.lng];
  t.startMarker.bindPopup('📍 Your location<br><em>Drag to refine</em>');
  t.startMarker.on('dragend', function() {
    var p = this.getLatLng();
    t.startCoords = [p.lat, p.lng];
    if (t.destCoords) drawTrafficRoute();
    updateTrafficInfo();
  });
  t.startMarker.on('dragstart', function() { this.closePopup(); });
  t.map.setView(latlng, 15);
  updateTrafficInfo();
}

function getStartLabel() {
  var sel = $('planner-start');
  if (!sel) return '📍 Start';
  var val = sel.value;
  if (val === 'user') return state.gpsAvailable ? '📍 Your Location' : '📍 Your Location (approx)';
  if (val === 'custom') return '📍 Custom Pin';
  if (val) {
    var t = sakayData.terminals.find(function(x) { return x.id === val; });
    if (t) return '📍 ' + t.name;
  }
  return '📍 Start';
}

function getStartCoords() {
  var sel = $('planner-start');
  if (!sel) return state.plannerCoords || state.userLocation;
  var val = sel.value;
  if (val === 'user' || !val) return state.userLocation;
  if (val === 'custom') return state.plannerCoords;
  var t = sakayData.terminals.find(function(x) { return x.id === val; });
  return t ? t.coords : (state.plannerCoords || state.userLocation);
}

var _routePlannerToken = 0;

function updateTrafficLayers() {
  var show = !!(state.plannerCoords && state.plannerDestCoords);
  [state.plannerFlowLayer, state.plannerIncidentLayer].forEach(function(l) {
    if (!l || !state.plannerMap) return;
    if (show && !state.plannerMap.hasLayer(l)) state.plannerMap.addLayer(l);
    else if (!show && state.plannerMap.hasLayer(l)) state.plannerMap.removeLayer(l);
  });
}

async function updateRoutePlanner() {
  var endId = $('planner-end').value;
  var mode = $('planner-mode').value;
  var btn = $('btn-start-ride');
  if (!endId) {
    btn.disabled = true;
    $('planner-route-name').textContent = 'Select destination';
    $('planner-route-detail').textContent = '—';
    $('planner-fare').textContent = '₱—';
    updateTrafficLayers();
    return;
  }
  var endCoords = getDestCoords();
  var endLabel = getDestLabel();
  if (!endCoords) { btn.disabled = true; updateTrafficLayers(); return; }
  var startCoords = getStartCoords();
  if (!startCoords) { btn.disabled = true; updateTrafficLayers(); return; }

  updateTrafficLayers();
  var dist = calcHaversineKm(startCoords[0], startCoords[1], endCoords[0], endCoords[1]);
  var estTime = Math.max(1, Math.round(dist / 0.3));
  btn.disabled = false;
  var fare = mode === 'tricycle' ? calcTricycleFare(dist) : calcJeepneyFare(dist, mode === 'jeepney-modern');
  var startLabel = getStartLabel();
  $('planner-route-name').textContent = startLabel + ' → ' + endLabel;
  $('planner-route-detail').textContent = dist.toFixed(1) + ' km · ' + (mode === 'tricycle' ? '🛺 Tricycle' : mode === 'jeepney-modern' ? '🚍 Modern Jeepney' : '🚌 Traditional Jeepney') + ' · ~' + estTime + ' min';
  $('planner-fare').textContent = '₱' + fare.toFixed(2);

  // Fetch TomTom route for real traffic-aware estimate
  if (startCoords && endCoords) {
    _routePlannerToken++;
    var token = _routePlannerToken;
    $('planner-route-detail').textContent = $('planner-route-detail').textContent + ' · 📡 Routing...';
    var result = await fetchRouteFromTomTom(startCoords, endCoords, mode);
    if (token !== _routePlannerToken || !$('planner-end').value) return;
    if (result) {
      var realDist = result.distanceKm;
      var totalSec = result.durationSec;
      var fare2 = mode === 'tricycle' ? calcTricycleFare(realDist) : calcJeepneyFare(realDist, mode === 'jeepney-modern');
      var mins = Math.floor(totalSec / 60);
      var secs = Math.round(totalSec % 60);
      var timeStr = mins + ':' + (secs < 10 ? '0' : '') + secs;
      // Compute traffic delay from TomTom (approx: durationSec includes traffic, we compare vs freeflow)
      var freeflowDist = realDist;
      var freeflowSpeed = mode === 'tricycle' ? 0.2 : 0.3;
      var freeflowMin = Math.max(1, Math.round(freeflowDist / freeflowSpeed));
      var delayMin = Math.max(0, mins - freeflowMin);
      var trafficBadge = delayMin > 0 ? ' · <span style="color:#dc2626;font-weight:600">🔴 +' + delayMin + ' min delay</span>' : ' · <span style="color:var(--gray-400)">✅ Clear traffic</span>';
      $('planner-route-detail').innerHTML = realDist.toFixed(1) + ' km · ' + (mode === 'tricycle' ? '🛺 Tricycle' : mode === 'jeepney-modern' ? '🚍 Modern Jeepney' : '🚌 Traditional Jeepney') + ' · ~' + timeStr + trafficBadge;
      $('planner-fare').textContent = '₱' + fare2.toFixed(2);
    }
  }
}

function calcHaversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng/2) * Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function fetchRouteFromTomTom(startCoords, endCoords, mode) {
  var travelMode = 'car';
  var url = 'https://api.tomtom.com/routing/1/calculateRoute/'
    + startCoords[0] + ',' + startCoords[1] + ':'
    + endCoords[0] + ',' + endCoords[1]
    + '/json?key=' + sakayData.tomtomApiKey
    + '&routeType=fastest&traffic=true&travelMode=' + travelMode + '&avoid=unpavedRoads';

  try {
    var res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    var data = await res.json();
    if (!data.routes || !data.routes[0] || !data.routes[0].legs || !data.routes[0].legs[0]) {
      throw new Error('Invalid route response');
    }
    var leg = data.routes[0].legs[0];
    var summary = data.routes[0].summary;
    var points = leg.points.map(function(p) { return [p.latitude, p.longitude]; });
    return {
      points: points,
      distanceKm: summary.lengthInMeters / 1000,
      durationSec: summary.travelTimeInSeconds + (summary.trafficDelayInSeconds || 0)
    };
  } catch (e) {
    console.warn('TomTom Routing failed, using fallback:', e.message);
    var dist = calcHaversineKm(startCoords[0], startCoords[1], endCoords[0], endCoords[1]);
    var steps = Math.max(6, Math.round(dist * 8));
    var pts = [];
    for (var i = 0; i <= steps; i++) {
      var f = i / steps;
      var lat = startCoords[0] + (endCoords[0] - startCoords[0]) * f;
      var lng = startCoords[1] + (endCoords[1] - startCoords[1]) * f;
      var jitter = (i === 0 || i === steps) ? 0 : (Math.random() - 0.5) * 0.0003;
      pts.push([lat + jitter, lng + jitter]);
    }
    return { points: pts, distanceKm: dist, durationSec: Math.round(dist / 0.3 * 60) };
  }
}

async function startRide() {
  var endId = $('planner-end').value;
  var mode = $('planner-mode').value;
  var endCoords = getDestCoords();
  var endLabel = getDestLabel().replace('📍 ', '');
  var startCoords = getStartCoords();
  if (!endCoords || !startCoords) return;
  if (state.ride.active) return;

  var dist = calcHaversineKm(startCoords[0], startCoords[1], endCoords[0], endCoords[1]);
  var fare = mode === 'tricycle' ? calcTricycleFare(dist) : calcJeepneyFare(dist, mode === 'jeepney-modern');
  var startLabel = getStartLabel().replace('📍 ', '');
  var startTerm = { name: startLabel, coords: startCoords };
  var endTerm = { name: endLabel, coords: endCoords };

  state.ride = {
    active: true, route: null, mode: mode,
    startId: 'user', endId: endId,
    startTime: Date.now(), elapsed: 0,
    timerInterval: null, marker: null, trailLayer: null,
    realDistance: dist,
    startTerm: startTerm, endTerm: endTerm, fare: fare
  };

  $('route-planner').style.display = 'none';
  $('live-tracker').style.display = 'block';
  $('ride-summary').style.display = 'none';
  setTimeout(function() {
    var el = $('live-tracker');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);

  var emoji = mode === 'tricycle' ? '🛺' : mode === 'jeepney-modern' ? '🚍' : '🚌';
  var color = mode === 'tricycle' ? '#0ea5e9' : mode === 'jeepney-modern' ? '#1d4ed8' : '#2563eb';

  $('tracker-vehicle').textContent = emoji;
  $('tracker-route-line').innerHTML = '<strong>' + startLabel + '</strong> ' + emoji + ' <strong>' + endLabel + '</strong>';
  $('tracker-dist').textContent = dist.toFixed(2) + ' km';
  $('tracker-fare-display').textContent = '₱' + fare.toFixed(2);
  $('tracker-time').textContent = '0:00';
  $('progress-fill').style.width = '0%';
  $('progress-start').textContent = '📍 ' + startLabel;
  $('progress-end').textContent = '🏁 ' + endLabel;
  $('tracker-status').className = 'tracker-status live';
  $('tracker-status').textContent = '● Started';
  $('tracker-title').textContent = '🚀 ' + emoji + ' On the way to ' + endLabel + '!';

  if (state.trackerMap) { state.trackerMap.remove(); state.trackerMap = null; }
  state.trackerMap = L.map('tracker-map', {
    center: startCoords, zoom: 16,
    zoomControl: true, attributionControl: false
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(state.trackerMap);
  setTimeout(function() { state.trackerMap.invalidateSize(); }, 200);

  // Show a temporary straight line while TomTom loads
  var tmpPts = [];
  for (var j = 0; j <= 4; j++) {
    var f2 = j / 4;
    tmpPts.push([startCoords[0] + (endCoords[0] - startCoords[0]) * f2, startCoords[1] + (endCoords[1] - startCoords[1]) * f2]);
  }
  state.ride.trailLayer = L.polyline(tmpPts, {
    color: color, weight: 5, opacity: 0.4
  }).addTo(state.trackerMap);
  $('tracker-dist').textContent = '📍 Routing...';

  state.ride.marker = L.marker(startCoords, { icon: createPinIcon('#22c55e', '📍', 28) }).addTo(state.trackerMap);
  L.marker(endCoords, { icon: createPinIcon('#ef4444', '🏁', 32) }).addTo(state.trackerMap);

  var bounds = L.latLngBounds([startCoords, endCoords]);
  state.trackerMap.fitBounds(bounds, { padding: [50, 50], maxZoom: 17, animate: true, duration: 0.8 });

  state.ride.timerInterval = setInterval(updateTimer, 100);

  // Fetch real route from TomTom
  var routeResult = await fetchRouteFromTomTom(startCoords, endCoords, mode);
  if (!state.ride.active) return;
  state.ride.route = { coords: routeResult.points, distance: routeResult.distanceKm, estTime: Math.round(routeResult.durationSec / 60) || 1 };
  state.ride.realDistance = routeResult.distanceKm;
  state.ride.fare = mode === 'tricycle' ? calcTricycleFare(routeResult.distanceKm) : calcJeepneyFare(routeResult.distanceKm, mode === 'jeepney-modern');
  state.ride.trailLayer.setLatLngs(routeResult.points);
  state.ride.trailLayer.setStyle({ opacity: 0.85 });
  var routeBounds = L.latLngBounds(routeResult.points);
  state.trackerMap.fitBounds(routeBounds, { padding: [50, 50], maxZoom: 17, animate: true, duration: 0.6 });
  var mins = Math.floor(routeResult.durationSec / 60);
  var secs = Math.round(routeResult.durationSec % 60);
  $('tracker-dist').textContent = routeResult.distanceKm.toFixed(2) + ' km';
  $('tracker-fare-display').textContent = '₱' + state.ride.fare.toFixed(2);
  $('tracker-time').textContent = mins + ':' + (secs < 10 ? '0' : '') + secs;

  // Add traffic overlay
  var tKey = sakayData.tomtomApiKey;
  var trackerFlow = L.tileLayer('https://api.tomtom.com/traffic/map/4/tile/flow/relative/{z}/{x}/{y}.png?key=' + tKey,
    { opacity: 0.7, attribution: 'Traffic &copy; TomTom', zIndex: 10 });
  var trackerInc = L.tileLayer('https://api.tomtom.com/traffic/map/4/tile/incidents/s1/{z}/{x}/{y}.png?key=' + tKey,
    { opacity: 1, attribution: 'Incidents &copy; TomTom', zIndex: 11 });
  trackerFlow.addTo(state.trackerMap);
  trackerInc.addTo(state.trackerMap);
  state.ride.flowLayer = trackerFlow;
  state.ride.incidentLayer = trackerInc;

  // Compute ETA
  var arrival = new Date(Date.now() + routeResult.durationSec * 1000);
  var etaH = arrival.getHours();
  var etaM = arrival.getMinutes();
  var etaAmPm = etaH >= 12 ? 'PM' : 'AM';
  if (etaH > 12) etaH -= 12;
  if (etaH === 0) etaH = 12;
  $('tracker-eta').textContent = etaH + ':' + (etaM < 10 ? '0' : '') + etaM + ' ' + etaAmPm;
}

function updateTimer() {
  if (!state.ride.active) return;
  state.ride.elapsed = Date.now() - state.ride.startTime;
  const secs = Math.floor(state.ride.elapsed / 1000);
  const mins = Math.floor(secs / 60);
  const remainSecs = secs % 60;
  $('tracker-time').textContent = `${mins}:${remainSecs.toString().padStart(2, '0')}`;
}

function finishRide() {
  if (!state.ride.active) return;
  state.ride.active = false;
  cleanupRideTracking();

  const elapsed = state.ride.elapsed;
  const secs = Math.floor(elapsed / 1000);
  const mins = Math.floor(secs / 60);
  const remainSecs = secs % 60;
  const timeStr = `${mins}:${remainSecs.toString().padStart(2, '0')}`;

  $('tracker-status').className = 'tracker-status arrived';
  $('tracker-status').textContent = '● Arrived';
  $('tracker-title').textContent = '✅ Trip Complete!';
  $('progress-fill').style.width = '100%';

  if (state.ride.marker) {
    state.ride.marker.setIcon(createPinIcon('#22c55e', '🏁'));
  }

  const finalDist = state.ride.route ? state.ride.route.distance : state.ride.realDistance;
  const finalFare = state.ride.fare;

  setTimeout(() => {
    $('live-tracker').style.display = 'none';
    $('ride-summary').style.display = 'block';
    $('summary-dist').textContent = finalDist.toFixed(2) + ' km';
    $('summary-time').textContent = timeStr;
    $('summary-fare').textContent = `₱${finalFare.toFixed(2)}`;
    $('summary-route').textContent = `${state.ride.startTerm.name} → ${state.ride.endTerm.name}`;
  }, 1200);
}

function cancelRide() {
  if (!state.ride.active) return;
  state.ride.active = false;
  cleanupRideTracking();
  cleanupRideMarkers();
  $('live-tracker').style.display = 'none';
  $('route-planner').style.display = 'block';
  if (state.plannerMap) setTimeout(function() { state.plannerMap.invalidateSize(); }, 200);
}

function cleanupRideMarkers() {
  if (state.trackerMap) { state.trackerMap.remove(); state.trackerMap = null; }
  state.ride.marker = null;
  state.ride.trailLayer = null;
}

function cleanupRideTracking() {
  if (state.ride.timerInterval) { clearInterval(state.ride.timerInterval); state.ride.timerInterval = null; }
}

function resetRide() {
  cleanupRideTracking();
  cleanupRideMarkers();
  state.ride = {
    active: false, route: null, startTime: null, elapsed: 0,
    timerInterval: null, marker: null, trailLayer: null, realDistance: 0,
    flowLayer: null, incidentLayer: null
  };
  $('ride-summary').style.display = 'none';
  $('route-planner').style.display = 'block';
  $('planner-end').value = '';
  updateRoutePlanner();
  if (state.plannerMap) setTimeout(function() { state.plannerMap.invalidateSize(); }, 200);
  if (state.map) state.map.setView(sakayData.mapCenter, sakayData.zoom, { animate: true });
}

function focusTerminal(id) {
  const t = sakayData.terminals.find(x => x.id === id);
  if (t && state.map) {
    state.map.setView(t.coords, 17, { animate: true, duration: 1 });
    state.markers.forEach(m => {
      const latlng = m.getLatLng();
      if (Math.abs(latlng.lat - t.coords[0]) < 0.001 && Math.abs(latlng.lng - t.coords[1]) < 0.001) {
        m.openPopup();
      }
    });
  }
}

/* TERMINALS LIST */
function renderTerminals() {
  const el = $('terminals-list');
  if (!el) return;
  let html = '';
  sakayData.terminals.forEach(t => {
    const tags = t.transport.map(m => `<span class="tag tag-${m}">${m}</span>`).join('');
    html += `
      <div class="terminal-card" onclick="focusTerminal('${t.id}')">
        <h4>${t.name}</h4>
        <div class="address">${t.address || ''}</div>
        <div class="tags">${tags}</div>
        <div class="desc">${t.description}</div>
      </div>
    `;
  });
  el.innerHTML = html;
}

/* EVENT BINDING */
function bindEvents() {
  const distInput = $('calc-distance');
  if (distInput) {
    distInput.addEventListener('input', function() {
      state.calcDistance = Math.max(0.5, parseFloat(this.value) || 1);
      updateCalculator();
    });
  }
  const rangeSlider = $('calc-range-slider');
  if (rangeSlider) {
    rangeSlider.addEventListener('input', function() {
      state.calcDistance = parseFloat(this.value);
      updateCalculator();
    });
  }
  const trikeInput = document.querySelector('#tricycle-card .card-input');
  if (trikeInput) {
    trikeInput.addEventListener('input', function() {
      state.tricycleDistance = Math.max(0.5, parseFloat(this.value) || 1);
      updateTricycleDashboard();
    });
  }
  document.querySelectorAll('.calc-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      state.selectedMode = this.dataset.mode;
      updateCalculator();
    });
  });
  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const val = parseFloat(this.dataset.km);
      state.tricycleDistance = val;
      const input = document.querySelector('#tricycle-card .card-input');
      if (input) input.value = val;
      updateTricycleDashboard();
    });
  });
  const hamburger = $('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      document.querySelector('.header').classList.toggle('nav-open');
    });
  }

  const startRideBtn = $('btn-start-ride');
  if (startRideBtn) startRideBtn.addEventListener('click', startRide);

  const finishBtn = $('btn-finish-ride');
  if (finishBtn) finishBtn.addEventListener('click', finishRide);

  const sosRideBtn = $('btn-sos-ride');
  if (sosRideBtn) {
    sosRideBtn.addEventListener('click', function() {
      if (confirm('🆘 Call 911? This will open your phone dialer for emergencies.')) {
        window.location.href = 'tel:911';
        showToast('📞 Calling 911...');
      }
    });
  }

  const cancelBtn = $('btn-cancel-ride');
  if (cancelBtn) cancelBtn.addEventListener('click', cancelRide);

  const newRideBtn = $('btn-new-ride');
  if (newRideBtn) newRideBtn.addEventListener('click', resetRide);

  const pinStartBtn = $('pin-start');
  if (pinStartBtn) pinStartBtn.addEventListener('click', function() { setTrafficPinMode('start'); });

  const pinDestBtn = $('pin-dest');
  if (pinDestBtn) pinDestBtn.addEventListener('click', function() { setTrafficPinMode('dest'); });

  const trafficClear = $('traffic-clear');
  if (trafficClear) trafficClear.addEventListener('click', clearTrafficAll);

  const toggleFlow = $('toggle-traffic-flow');
  if (toggleFlow) {
    toggleFlow.addEventListener('change', function() {
      const t = state.traffic;
      if (this.checked) {
        t.trafficFlowLayer.addTo(t.map);
      } else {
        t.map.removeLayer(t.trafficFlowLayer);
      }
    });
  }

  const toggleIncidents = $('toggle-incidents');
  if (toggleIncidents) {
    toggleIncidents.addEventListener('change', function() {
      const t = state.traffic;
      if (this.checked) {
        t.trafficIncidentsLayer.addTo(t.map);
      } else {
        t.map.removeLayer(t.trafficIncidentsLayer);
      }
    });
  }

  const btnSaveRoute = $('btn-save-route');
  if (btnSaveRoute) btnSaveRoute.addEventListener('click', function() {
    const name = prompt('Name this route:', '');
    if (name && name.trim()) {
      const t = state.traffic;
      if (!t.startCoords || !t.destCoords) { showToast('⚠️ Set both pins in Traffic map first'); return; }
      state.savedData.routes.unshift({
        id: 'route-' + Date.now(), name: name.trim(),
        startCoords: t.startCoords, destCoords: t.destCoords,
        savedAt: new Date().toISOString()
      });
      saveToDisk();
      renderSaved();
      showToast('⭐ Route saved from Traffic!');
    }
  });

  const savedSaveRoute = $('saved-save-route');
  if (savedSaveRoute) savedSaveRoute.addEventListener('click', saveRoute);

  const savedSaveStart = $('saved-save-start');
  if (savedSaveStart) savedSaveStart.addEventListener('click', saveStartAsPlace);

  const savedSaveDest = $('saved-save-dest');
  if (savedSaveDest) savedSaveDest.addEventListener('click', saveDestAsPlace);

  document.querySelectorAll('.saved-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      switchSavedTab(this.dataset.tab);
    });
  });

  const svPinStart = $('sv-pin-start');
  if (svPinStart) svPinStart.addEventListener('click', function() { setSavedPinMode('start'); });

  const svPinDest = $('sv-pin-dest');
  if (svPinDest) svPinDest.addEventListener('click', function() { setSavedPinMode('dest'); });

  const svLocate = $('sv-locate');
  if (svLocate) svLocate.addEventListener('click', locateSavedLocation);

  const svClear = $('sv-clear');
  if (svClear) svClear.addEventListener('click', clearSavedPins);

  const svNameInput = $('saved-name');
  if (svNameInput) {
    svNameInput.addEventListener('input', function() {
      if (this.value.trim()) highlightNameField(false);
    });
  }

  /* GAS STATION EVENTS */
  var gasSearch = $('gas-search');
  if (gasSearch) {
    gasSearch.addEventListener('input', debounce(filterGasStations, 300));
  }
  var gasBrand = $('gas-brand-select');
  if (gasBrand) {
    gasBrand.addEventListener('change', filterGasStations);
  }
  var gasLocate = $('gas-locate');
  if (gasLocate) {
    gasLocate.addEventListener('click', detectGasLocation);
  }

  /* MODAL EVENTS */
  var phfSub = $('phf-sub');
  if (phfSub) phfSub.addEventListener('click', function(e) {
    if (e.target.id === 'advisories-btn') showAdvisoriesModal();
  });
  var modalClose = $('modal-close');
  if (modalClose) modalClose.addEventListener('click', closeModal);
  var modalOverlay = $('modal-overlay');
  if (modalOverlay) modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });
}

/* INIT */
document.addEventListener('DOMContentLoaded', function() {
  bindEvents();
  updateDashboard();
  updateCalculator();
  renderTerminals();
  initRoutePlanner();
  initMap();
  addRoutes();
  initTrafficMap();
  initSavedData();
  initNotifications();
  initGasMap();
  fetchGasData();
  setInterval(fetchGasData, 300000);

  const sosBtn = $('sos-btn');
  if (sosBtn) {
    sosBtn.addEventListener('click', function() {
      if (confirm('🆘 Call 911? This will open your phone dialer for emergencies.')) {
        window.location.href = 'tel:911';
        showToast('📞 Calling 911...');
      }
    });
  }

  const notifBtn = $('notif-btn');
  if (notifBtn) notifBtn.addEventListener('click', toggleNotifications);
});

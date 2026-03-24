/* ═══════════════════════════════════════════════════════════
   MANAH GROUP — ECharts Instances
   5 animated charts: Revenue, Orders, Pipeline, Map, Gauges
   ═══════════════════════════════════════════════════════════ */

const CHART_INSTANCES = {};

const CHART_COLORS_DARK = {
  navy: '#0A1628',
  navyLight: '#132240',
  gold: '#C8A96E',
  goldLight: '#D4BC8A',
  goldDark: '#A88B4A',
  teal: '#0D9488',
  blue: '#5B8CC5',
  purple: '#7C3AED',
  green: '#16A34A',
  amber: '#D97706',
  textLight: '#E8E8E0',
  textMuted: '#A3A39C',
  splitLine: 'rgba(255,255,255,0.06)',
  axisLine: 'rgba(200,169,110,0.3)',
  tooltipBorder: 'rgba(200,169,110,0.3)',
  geoArea: '#132240',
  geoBorder: 'rgba(200,169,110,0.25)',
};

const CHART_COLORS_LIGHT = {
  navy: '#F5F5F0',
  navyLight: '#FFFFFF',
  gold: '#9A7B3C',
  goldLight: '#B8954E',
  goldDark: '#7A6230',
  teal: '#0D9488',
  blue: '#1E3A5F',
  purple: '#7C3AED',
  green: '#16A34A',
  amber: '#D97706',
  textLight: '#1A1A1A',
  textMuted: '#6B6B68',
  splitLine: 'rgba(0,0,0,0.06)',
  axisLine: 'rgba(154,123,60,0.3)',
  tooltipBorder: 'rgba(154,123,60,0.2)',
  geoArea: '#E8E8E0',
  geoBorder: 'rgba(154,123,60,0.2)',
};

function getChartColors() {
  return document.body.classList.contains('light-theme') ? CHART_COLORS_LIGHT : CHART_COLORS_DARK;
}

// Backward compat alias
var CHART_COLORS = CHART_COLORS_DARK;

/* ─── Chart 1: Revenue Forecast Bar ─── */
function initRevenueChart(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return null;

  const c = getChartColors();
  const chart = echarts.init(el, null, { renderer: 'canvas' });
  CHART_INSTANCES.revenue = chart;

  const option = {
    backgroundColor: 'transparent',
    grid: { left: 60, right: 30, top: 50, bottom: 50 },
    xAxis: {
      type: 'category',
      data: MANAH_DATA.revenue.labels,
      axisLine: { lineStyle: { color: c.axisLine } },
      axisLabel: { color: c.textMuted, fontSize: 13, fontFamily: 'Outfit' },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      name: 'Revenue (₹ Cr)',
      nameTextStyle: { color: c.textMuted, fontSize: 12, fontFamily: 'Inter' },
      axisLine: { show: false },
      axisLabel: { color: c.textMuted, fontSize: 11 },
      splitLine: { lineStyle: { color: c.splitLine } },
    },
    series: [{
      type: 'bar',
      data: MANAH_DATA.revenue.values,
      barWidth: '50%',
      itemStyle: {
        borderRadius: [6, 6, 0, 0],
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: c.goldLight },
          { offset: 1, color: c.goldDark },
        ]),
      },
      emphasis: {
        itemStyle: { color: c.gold },
      },
      label: {
        show: true,
        position: 'top',
        formatter: (p) => `₹${p.value.toLocaleString()} Cr`,
        color: c.gold,
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: 'Outfit',
      },
      animationDuration: 2000,
      animationEasing: 'elasticOut',
      animationDelay: (idx) => idx * 300,
    }],
    tooltip: {
      trigger: 'axis',
      backgroundColor: c.navyLight,
      borderColor: c.tooltipBorder,
      textStyle: { color: c.textLight },
      formatter: (params) => {
        const p = params[0];
        return `<strong>${p.name}</strong><br/>Revenue: ₹${p.value.toLocaleString()} Cr`;
      },
    },
  };

  chart.setOption(option);
  return chart;
}

/* ─── Chart 2: Order Bookings Stacked Bar ─── */
function initOrderBookingsChart(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return null;

  const c = getChartColors();
  const chart = echarts.init(el, null, { renderer: 'canvas' });
  CHART_INSTANCES.orderBookings = chart;

  const series = MANAH_DATA.orderBookings.sectors.map((sector, idx) => ({
    name: sector.name,
    type: 'bar',
    stack: 'total',
    data: sector.values,
    itemStyle: {
      color: sector.color,
      borderRadius: idx === MANAH_DATA.orderBookings.sectors.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0],
    },
    animationDuration: 1500,
    animationDelay: idx * 300,
  }));

  const option = {
    backgroundColor: 'transparent',
    grid: { left: 60, right: 30, top: 40, bottom: 70 },
    legend: {
      bottom: 0,
      textStyle: { color: c.textMuted, fontSize: 11, fontFamily: 'Inter' },
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 16,
    },
    xAxis: {
      type: 'category',
      data: MANAH_DATA.orderBookings.years,
      axisLine: { lineStyle: { color: c.axisLine } },
      axisLabel: { color: c.textMuted, fontSize: 13, fontFamily: 'Outfit' },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      name: 'Orders (₹ Cr)',
      nameTextStyle: { color: c.textMuted, fontSize: 12 },
      axisLine: { show: false },
      axisLabel: { color: c.textMuted, fontSize: 11 },
      splitLine: { lineStyle: { color: c.splitLine } },
    },
    series,
    tooltip: {
      trigger: 'axis',
      backgroundColor: c.navyLight,
      borderColor: c.tooltipBorder,
      textStyle: { color: c.textLight },
    },
  };

  chart.setOption(option);
  return chart;
}

/* ─── Chart 3: Pipeline Horizontal Bar ─── */
function initPipelineChart(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return null;

  const c = getChartColors();
  const chart = echarts.init(el, null, { renderer: 'canvas' });
  CHART_INSTANCES.pipeline = chart;

  const data = MANAH_DATA.pipeline;

  const option = {
    backgroundColor: 'transparent',
    grid: { left: 140, right: 80, top: 30, bottom: 30 },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'category',
      data: data.map((d) => d.label),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: getChartColors().textLight,
        fontSize: 14,
        fontFamily: 'Outfit',
        fontWeight: 500,
      },
      inverse: true,
    },
    series: [{
      type: 'bar',
      data: data.map((d) => ({
        value: d.value,
        itemStyle: { color: d.color },
      })),
      barWidth: 28,
      itemStyle: { borderRadius: [0, 6, 6, 0] },
      label: {
        show: true,
        position: 'right',
        formatter: (p) => `₹${p.value.toLocaleString()} Cr`,
        color: getChartColors().gold,
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Outfit',
      },
      animationDuration: 1800,
      animationEasing: 'elasticOut',
      animationDelay: (idx) => idx * 250,
    }],
  };

  chart.setOption(option);
  return chart;
}

/* ─── Chart 4: India MRO Map ─── */
function initMROMap(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return null;

  const c = getChartColors();
  const chart = echarts.init(el, null, { renderer: 'canvas' });
  CHART_INSTANCES.mroMap = chart;

  // Use scatter on a simple India outline via geo coordinates
  const currentData = MANAH_DATA.mroLocations.current.map((loc) => ({
    name: loc.name,
    value: [loc.lng, loc.lat, 1],
  }));

  const expansionData = MANAH_DATA.mroLocations.expansion.map((loc) => ({
    name: loc.name,
    value: [loc.lng, loc.lat, 1],
  }));

  const option = {
    backgroundColor: 'transparent',
    geo: {
      map: 'india',
      roam: false,
      zoom: 1.2,
      center: [80, 22],
      itemStyle: {
        areaColor: c.geoArea,
        borderColor: c.geoBorder,
        borderWidth: 1,
      },
      emphasis: {
        disabled: true,
      },
      label: { show: false },
      silent: true,
    },
    series: [
      {
        name: 'Current',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: currentData,
        symbolSize: 14,
        showEffectOn: 'render',
        rippleEffect: { brushType: 'stroke', scale: 3, period: 4 },
        itemStyle: { color: c.gold },
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
          color: c.textLight,
          fontSize: 12,
          fontFamily: 'Inter',
        },
      },
      {
        name: 'Expansion',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: expansionData,
        symbolSize: 10,
        showEffectOn: 'render',
        rippleEffect: { brushType: 'stroke', scale: 4, period: 3 },
        itemStyle: { color: c.teal },
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
          color: c.teal,
          fontSize: 11,
          fontFamily: 'Inter',
          fontStyle: 'italic',
        },
      },
    ],
    legend: {
      bottom: 10,
      data: ['Current', 'Expansion'],
      textStyle: { color: c.textMuted, fontSize: 12 },
      itemWidth: 14,
      itemHeight: 14,
    },
  };

  // Register India map (includes PoK and full claimed territory)
  if (typeof INDIA_GEO !== 'undefined') {
    echarts.registerMap('india', INDIA_GEO);
    chart.setOption(option);
  } else {
    // Fallback: simple scatter plot positioned like India
    const fallbackOption = {
      backgroundColor: 'transparent',
      grid: { left: 40, right: 40, top: 40, bottom: 60 },
      xAxis: {
        min: 68, max: 98,
        show: false,
        type: 'value',
      },
      yAxis: {
        min: 8, max: 37,
        show: false,
        type: 'value',
      },
      series: [
        {
          name: 'Current Locations',
          type: 'effectScatter',
          data: currentData.map((d) => [d.value[0], d.value[1]]),
          symbolSize: 20,
          showEffectOn: 'render',
          rippleEffect: { brushType: 'stroke', scale: 3.5, period: 4 },
          itemStyle: { color: c.gold, shadowBlur: 10, shadowColor: c.gold },
          label: {
            show: true,
            position: 'top',
            formatter: (p) => MANAH_DATA.mroLocations.current[p.dataIndex].name,
            color: c.textLight,
            fontSize: 13,
            fontFamily: 'Outfit',
            fontWeight: 600,
          },
          animationDuration: 1500,
        },
        {
          name: 'Expansion Planned',
          type: 'effectScatter',
          data: expansionData.map((d) => [d.value[0], d.value[1]]),
          symbolSize: 14,
          showEffectOn: 'render',
          rippleEffect: { brushType: 'stroke', scale: 5, period: 2.5 },
          itemStyle: { color: c.teal, shadowBlur: 8, shadowColor: c.teal },
          label: {
            show: true,
            position: 'top',
            formatter: (p) => MANAH_DATA.mroLocations.expansion[p.dataIndex].name,
            color: c.teal,
            fontSize: 12,
            fontFamily: 'Outfit',
            fontStyle: 'italic',
          },
          animationDuration: 2000,
          animationDelay: 500,
        },
      ],
      legend: {
        bottom: 10,
        data: ['Current Locations', 'Expansion Planned'],
        textStyle: { color: c.textMuted, fontSize: 12, fontFamily: 'Inter' },
        itemWidth: 14,
        itemHeight: 14,
      },
    };
    chart.setOption(fallbackOption);
  }

  return chart;
}

/* ─── Resize Handler ─── */
function resizeAllCharts() {
  Object.values(CHART_INSTANCES).forEach((chart) => {
    if (chart && chart.resize) {
      chart.resize();
    }
  });
}

window.addEventListener('resize', resizeAllCharts);

/* ─── Refresh Charts for Theme Toggle ─── */
function refreshChartsForTheme() {
  Object.keys(CHART_INSTANCES).forEach(function (key) {
    if (CHART_INSTANCES[key]) {
      CHART_INSTANCES[key].dispose();
      CHART_INSTANCES[key] = null;
    }
  });
  if (typeof Reveal !== 'undefined' && Reveal.isReady()) {
    var currentSlide = Reveal.getCurrentSlide();
    if (currentSlide && currentSlide.id) {
      initChartForSlide(currentSlide.id);
    }
  }
}

// Expose for theme manager
window.__refreshChartsForTheme = refreshChartsForTheme;

/* ─── Initialize Chart on Slide Entry ─── */
function initChartForSlide(slideId) {
  switch (slideId) {
    case 'slide-pipeline':
      if (!CHART_INSTANCES.pipeline) initPipelineChart('chart-pipeline');
      else CHART_INSTANCES.pipeline.resize();
      break;
    case 'slide-financials':
      if (!CHART_INSTANCES.revenue) initRevenueChart('chart-revenue');
      else CHART_INSTANCES.revenue.resize();
      if (!CHART_INSTANCES.orderBookings) initOrderBookingsChart('chart-orders');
      else CHART_INSTANCES.orderBookings.resize();
      break;
    case 'slide-mro-map':
      if (!CHART_INSTANCES.mroMap) initMROMap('chart-mro-map');
      else CHART_INSTANCES.mroMap.resize();
      break;
  }
}

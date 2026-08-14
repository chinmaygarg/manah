/* ═══════════════════════════════════════════════════════════
   LIBERIN — Saudi Arabia Investor Deck — ECharts Instances
   Two charts: KSA AI market growth (area) + revenue projection (bar).
   Apache ECharts 5.5.1 is loaded globally as `echarts` before this
   script. No imports, no build step — plain browser IIFE.
   Emerald + platinum palette on a dark / transparent background.
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Emerald + platinum palette ─── */
  var PALETTE = {
    emerald: '#10B981',       // primary stroke
    emeraldDeep: '#0E9E6E',   // bar gradient bottom
    emeraldBright: '#34D399', // bar gradient top
    areaTop: 'rgba(16,163,122,0.45)',
    areaBottom: 'rgba(16,163,122,0.0)',
    platinum: '#E2E8ED',      // bar value labels
    axisLabel: '#9FB0B8',     // axis tick labels
    axisLine: 'rgba(255,255,255,0.12)',
    splitLine: 'rgba(255,255,255,0.06)',
    tooltipBg: 'rgba(5,20,14,0.92)',
    tooltipBorder: 'rgba(16,163,122,0.35)',
    tooltipText: '#E2E8ED',
    font: 'Inter, system-ui, sans-serif'
  };

  /* Registry of created ECharts instances, keyed by container id. */
  var CHART_INSTANCES = {};

  /* ─── Guards ─── */

  // True when ECharts is available on the page.
  function hasECharts() {
    return typeof echarts !== 'undefined' && echarts && typeof echarts.init === 'function';
  }

  // Return the container element only when it is present AND laid out
  // with a non-zero size. Charts live inside hidden slides, so ECharts
  // would size to 0×0 if we initialised too early.
  function getSizedContainer(containerId) {
    var el = document.getElementById(containerId);
    if (!el) return null;
    if (el.offsetWidth === 0 || el.offsetHeight === 0) return null;
    return el;
  }

  // Read the shared data object safely.
  function getData() {
    return (typeof window !== 'undefined' && window.LIBERIN_DATA) || null;
  }

  /* ─── Shared axis styling ─── */

  function categoryAxis(labels) {
    return {
      type: 'category',
      data: labels,
      boundaryGap: true,
      axisLine: { lineStyle: { color: PALETTE.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: PALETTE.axisLabel, fontSize: 13, fontFamily: PALETTE.font }
    };
  }

  function valueAxis(labelFormatter) {
    return {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: PALETTE.splitLine } },
      axisLabel: {
        color: PALETTE.axisLabel,
        fontSize: 12,
        fontFamily: PALETTE.font,
        formatter: labelFormatter
      }
    };
  }

  /* ─── Chart 1: KSA AI market growth — smooth area line ─── */
  function buildMarketOption(market) {
    return {
      backgroundColor: 'transparent',
      grid: { left: 56, right: 28, top: 32, bottom: 40 },
      xAxis: categoryAxis(market.years),
      yAxis: valueAxis(function (v) { return '$' + v; }),
      tooltip: {
        trigger: 'axis',
        backgroundColor: PALETTE.tooltipBg,
        borderColor: PALETTE.tooltipBorder,
        borderWidth: 1,
        textStyle: { color: PALETTE.tooltipText, fontFamily: PALETTE.font },
        formatter: function (params) {
          var p = params && params[0];
          if (!p) return '';
          return '<strong>' + p.name + '</strong><br/>$' + p.value + 'B';
        }
      },
      series: [{
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        data: market.values,
        lineStyle: { color: PALETTE.emerald, width: 3 },
        itemStyle: {
          color: PALETTE.emerald,
          borderColor: '#05140E',
          borderWidth: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: PALETTE.areaTop },
            { offset: 1, color: PALETTE.areaBottom }
          ])
        },
        emphasis: { focus: 'series' },
        animationDuration: 1400,
        animationEasing: 'cubicOut'
      }]
    };
  }

  function initMarketChart(containerId) {
    if (!hasECharts()) return null;
    var el = getSizedContainer(containerId);
    if (!el) return null;

    var data = getData();
    if (!data || !data.marketGrowth) return null;

    var chart = echarts.init(el, null, { renderer: 'canvas' });
    chart.setOption(buildMarketOption(data.marketGrowth));
    CHART_INSTANCES[containerId] = chart;
    return chart;
  }

  /* ─── Chart 2: Revenue projection — vertical bar ─── */
  function buildRevenueOption(revenue) {
    return {
      backgroundColor: 'transparent',
      grid: { left: 56, right: 28, top: 44, bottom: 40 },
      xAxis: categoryAxis(revenue.years),
      yAxis: valueAxis(function (v) { return v; }),
      tooltip: {
        trigger: 'axis',
        backgroundColor: PALETTE.tooltipBg,
        borderColor: PALETTE.tooltipBorder,
        borderWidth: 1,
        textStyle: { color: PALETTE.tooltipText, fontFamily: PALETTE.font },
        formatter: function (params) {
          var p = params && params[0];
          if (!p) return '';
          return '<strong>' + p.name + '</strong><br/>$' + p.value + 'M';
        }
      },
      series: [{
        type: 'bar',
        data: revenue.values,
        barWidth: '48%',
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: PALETTE.emeraldBright },
            { offset: 1, color: PALETTE.emeraldDeep }
          ])
        },
        emphasis: { itemStyle: { color: PALETTE.emerald } },
        label: {
          show: true,
          position: 'top',
          formatter: function (p) { return '$' + p.value + 'M'; },
          color: PALETTE.platinum,
          fontSize: 13,
          fontWeight: 600,
          fontFamily: PALETTE.font
        },
        animationDuration: 1200,
        animationEasing: 'cubicOut',
        animationDelay: function (idx) { return idx * 140; }
      }]
    };
  }

  function initRevenueChart(containerId) {
    if (!hasECharts()) return null;
    var el = getSizedContainer(containerId);
    if (!el) return null;

    var data = getData();
    if (!data || !data.revenue) return null;

    var chart = echarts.init(el, null, { renderer: 'canvas' });
    chart.setOption(buildRevenueOption(data.revenue));
    CHART_INSTANCES[containerId] = chart;
    return chart;
  }

  /* ─── Public: init the chart(s) for a given slide ─── */
  // Idempotent: if an instance for the container already exists we just
  // resize it; otherwise we create it (only when the container is sized).
  function initChartForSlide(slideId) {
    if (!slideId) return;

    if (slideId === 'slide-market') {
      if (CHART_INSTANCES['chart-market']) {
        CHART_INSTANCES['chart-market'].resize();
      } else {
        initMarketChart('chart-market');
      }
      return;
    }

    if (slideId === 'slide-investor') {
      if (CHART_INSTANCES['chart-revenue']) {
        CHART_INSTANCES['chart-revenue'].resize();
      } else {
        initRevenueChart('chart-revenue');
      }
    }
  }

  /* ─── Public: resize every created chart ─── */
  function resizeAllCharts() {
    var ids = Object.keys(CHART_INSTANCES);
    for (var i = 0; i < ids.length; i++) {
      var chart = CHART_INSTANCES[ids[i]];
      if (chart && typeof chart.resize === 'function') {
        chart.resize();
      }
    }
  }

  /* ─── Debounced window resize handling ─── */
  var resizeTimer = null;
  function onWindowResize() {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeAllCharts, 200);
  }
  window.addEventListener('resize', onWindowResize);

  /* ─── Expose globals (function declarations + window, to be safe) ─── */
  window.initChartForSlide = initChartForSlide;
  window.resizeAllCharts = resizeAllCharts;
})();

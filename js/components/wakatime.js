/*
  WakaTime charts component
  - Creates language/editor pie charts for desktop and mobile canvases
  - Exposes `window.wakatimeComponent.init()`
*/
(function (global) {
    function createChartFromShare(url, canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || typeof Chart === 'undefined') return;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const labels = data.data.map(item => item.name);
                const dataValues = data.data.map(item => item.percent);
                const backgroundColors = data.data.map(item => item.color);
                const timeSpent = data.data.map(item => item.text);

                const ctx = canvas.getContext('2d');
                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labels,
                        datasets: [{ data: dataValues, backgroundColor: backgroundColors }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { position: 'top', display: false },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        let label = context.label || '';
                                        let idx = context.dataIndex;
                                        let time = timeSpent[idx];
                                        if (label) label += ': ';
                                        label += context.raw.toFixed(2) + '%';
                                        label += ' (' + time + ')';
                                        return label;
                                    }
                                }
                            }
                        }
                    }
                });
            })
            .catch(err => console.error('Error fetching WakaTime data for', canvasId, err));
    }

    /**
     * Initialize WakaTime charts for desktop and mobile canvases
     */
    function init() {
        // Past 30 Days language usage
        createChartFromShare('https://wakatime.com/share/@telloviz/e49e51a9-de2a-4db3-aa66-877d02a49ec1.json', 'desktop-wakatime30DayLangChart');
        createChartFromShare('https://wakatime.com/share/@telloviz/e49e51a9-de2a-4db3-aa66-877d02a49ec1.json', 'mobile-wakatime30DayLangChart');

        // All Time language usage
        createChartFromShare('https://wakatime.com/share/@telloviz/735e4f4d-0406-457a-a0e3-b376bf66fbb8.json', 'desktop-wakatimeAllTimeLangChart');
        createChartFromShare('https://wakatime.com/share/@telloviz/735e4f4d-0406-457a-a0e3-b376bf66fbb8.json', 'mobile-wakatimeAllTimeLangChart');

        // Editors used
        createChartFromShare('https://wakatime.com/share/@telloviz/e53a65a6-ccff-473b-8d17-cd1f8d291632.json', 'desktop-editorsUsedChart');
        createChartFromShare('https://wakatime.com/share/@telloviz/e53a65a6-ccff-473b-8d17-cd1f8d291632.json', 'mobile-editorsUsedChart');

        // Editor chart
        createChartFromShare('https://wakatime.com/share/@telloviz/138147c5-aee1-43aa-82ac-934427b92c04.json', 'desktop-editorChart');
        createChartFromShare('https://wakatime.com/share/@telloviz/138147c5-aee1-43aa-82ac-934427b92c04.json', 'mobile-editorChart');
    }

    global.wakatimeComponent = { init };
})(window);

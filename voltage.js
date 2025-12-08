createVoltageChart: function() {
            const container = this.contentEl.querySelector("#voltageChart");
            if (!container) return;

            container.innerHTML = '';

            container.innerHTML = `
            <div class="voltmeter-container">
                <div id="voltageGauge" style="width: 100%; height: 180px;"></div>
                <div class="voltage-values">
                    <div class="voltage-value min">
                        <div class="voltage-number min">${Math.round(this.batteryData.voltMin)}V</div>
                        <div class="voltage-label">Minimum</div>
                    </div>
                    <div class="voltage-value max">
                        <div class="voltage-number max">${Math.round(this.batteryData.voltMax)}V</div>
                        <div class="voltage-label">Maximum</div>
                    </div>
                </div>
            </div>
        `;

            // Create the amCharts gauge for voltage (semi-circle)
            var am4core = window.am4core;
            var am4charts = window.am4charts;
            let chart = am4core.create("voltageGauge", am4charts.GaugeChart);
            chart.hiddenState.properties.opacity = 0;
            chart.startAngle = -135;
            chart.endAngle = 135;
            chart.innerRadius = -15;

            let axis = chart.xAxes.push(new am4charts.ValueAxis());
            axis.min = 350;
            axis.max = 450;
            axis.strictMinMax = true;
            axis.renderer.grid.template.disabled = true;
            axis.renderer.labels.template.disabled = true;
            axis.renderer.ticks.template.disabled = false;
            axis.renderer.ticks.template.strokeOpacity = 1;
            axis.renderer.ticks.template.length = 10;
            axis.renderer.ticks.template.stroke = am4core.color("#fff");
            axis.renderer.line.strokeOpacity = 0;
            axis.renderer.minLabelPosition = 0;
            axis.renderer.maxLabelPosition = 1;

            // Add major ticks and labels
            for (let i = 350; i <= 450; i += 25) {
                let range = axis.axisRanges.create();
                range.value = i;
                range.label.text = i.toString();
                range.label.fill = am4core.color("#fff");
                range.label.fontSize = 12;
                range.label.radius = 30;
                range.tick.length = 15;
                range.tick.strokeOpacity = 1;
                range.tick.stroke = am4core.color("#fff");
            }

            // Min hand
            let minHand = chart.hands.push(new am4charts.ClockHand());
            minHand.axis = axis;
            minHand.innerRadius = am4core.percent(0);
            minHand.startWidth = 8;
            minHand.pin.disabled = true;
            minHand.fill = am4core.color("#00bfff");
            minHand.stroke = am4core.color("#00bfff");
            minHand.value = this.batteryData.voltMin;

            // Max hand
            let maxHand = chart.hands.push(new am4charts.ClockHand());
            maxHand.axis = axis;
            maxHand.innerRadius = am4core.percent(0);
            maxHand.startWidth = 8;
            maxHand.pin.disabled = true;
            maxHand.fill = am4core.color("#ff4444");
            maxHand.stroke = am4core.color("#ff4444");
            maxHand.value = this.batteryData.voltMax;

            this.chartInstances.voltage = chart;
        },
createTemperatureChart: function() {
            console.log('Creating temperature chart with data:', {
                tempMin: this.batteryData.tempMin,
                tempMax: this.batteryData.tempMax
            });

            // Dispose existing chart if any
            if (this.chartInstances.temperature && !this.chartInstances.temperature.isDisposed()) {
                this.chartInstances.temperature.dispose();
            }

            // Get the container element
            const container = this.contentEl.querySelector("#temperatureChart");
            if (!container) {
                console.error('Temperature chart container not found');
                return;
            }

            // Clear previous content
            container.innerHTML = '';

            // Validate temperature data
            if (this.batteryData.tempMin === undefined || this.batteryData.tempMax === undefined) {
                console.warn('Temperature data not available');
                container.innerHTML = '<div style="color: #fff; text-align: center; padding: 20px;">Temperature data not available</div>';
                return;
            }

            // Temperature range configuration
            const minTempRange = 0;
            const maxTempRange = 60;
            const tempRange = maxTempRange - minTempRange;

            // Calculate positions (from bottom of container)
            const minPosition = Math.max(0, Math.min(100, ((this.batteryData.tempMin - minTempRange) / tempRange) * 100));
            const maxPosition = Math.max(0, Math.min(100, ((this.batteryData.tempMax - minTempRange) / tempRange) * 100));

            console.log('Temperature positions:', { minPosition, maxPosition });

            // Create enhanced temperature visualization with explicit styles
            const tempHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; position: relative; padding: 10px; border-radius: 8px;">
                        <div style="height: 180px; width: 80px; position: relative; margin-bottom: 50px;">
                            <div style="position: relative; width: 40px; height: 100%; background: linear-gradient(0deg, #4CAF50 0%, #FFC107 50%, #F44336 100%); border-radius: 20px; border: 2px solid #415a77; margin: 0 auto; overflow: hidden;">
                                <!-- Min Temperature Marker -->
                                <div style="position: absolute; left: -60px; width: 80px; height: 4px; background: #00bfff; border-radius: 2px; z-index: 10; box-shadow: 0 0 10px #00bfff; bottom: ${minPosition}%; display: flex; align-items: center;">
                                    <div style="content: ''; position: absolute; right: -8px; top: 50%; transform: translateY(-50%); width: 0; height: 0; border-top: 6px solid transparent; border-bottom: 6px solid transparent; border-left: 8px solid #00bfff;"></div>
                                </div>
                                
                                <!-- Max Temperature Marker -->
                                <div style="position: absolute; left: -60px; width: 80px; height: 4px; background: #ff4444; border-radius: 2px; z-index: 10; box-shadow: 0 0 10px #ff4444; bottom: ${maxPosition}%; display: flex; align-items: center;">
                                    <div style="content: ''; position: absolute; right: -8px; top: 50%; transform: translateY(-50%); width: 0; height: 0; border-top: 6px solid transparent; border-bottom: 6px solid transparent; border-left: 8px solid #ff4444;"></div>
                                </div>
                            </div>
                        </div>
    
                        <!-- Temperature Value Displays -->
                        <div style="position: absolute; bottom: 10px; left: 0; right: 0; display: flex; justify-content: space-between; padding: 0 10px;">
                            <div style="font-size: 1rem; font-weight: bold; padding: 6px 12px; border-radius: 6px; background: rgba(0, 0, 0, 0.8); color: #00bfff; border: 1px solid #00bfff; min-width: 60px; text-align: center;">
                                ${Math.round(this.batteryData.tempMin)}°C
                            </div>
                            <div style="font-size: 1rem; font-weight: bold; padding: 6px 12px; border-radius: 6px; background: rgba(0, 0, 0, 0.8); color: #ff4444; border: 1px solid #ff4444; min-width: 60px; text-align: center;">
                                ${Math.round(this.batteryData.tempMax)}°C
                            </div>
                        </div>
    
                        <!-- Labels -->
                        <div style="position: absolute; top: 10px; left: 0; right: 0; text-align: center; color: #fff; font-size: 0.8rem; font-weight: bold;">
                            Min / Max Temp
                        </div>
                    </div>
                    `;

            container.innerHTML = tempHTML;
            console.log('Temperature chart rendered');

            // Store reference for cleanup
            this.chartInstances.temperature = {
                isDisposed: () => false,
                dispose: () => {
                    container.innerHTML = '';
                    console.log('Temperature chart disposed');
                }
            };
        },
class HeartRate {
    constructor() {
        // GATT numbers
        this.HR_SERVICE = 0x180D;
        this.HR_CHARACTERISTIC = 0x2A37;

        this.heartRateNowElem = document.getElementById('heart_rate_now');
    }
    
    onHeartRateChanged(event) {
        const flags = event.target.value.getUint8(0);
        let hr = -123456;
        if (flags & 0x1) {
            hr = event.target.value.getUint16(1, true);
        }
        hr = event.target.value.getUint8(1);
        console.log(`Heart rate is: ${hr}`);
        this.heartRateNowElem.textContent = hr;
    }

    run() {
        if (!navigator.bluetooth) {
            console.log('Web bluetooth not supported on this device');
            return;
        }
        const options = {
            acceptAllDevices: true,
            optionalServices: [this.HR_SERVICE]
        };
        navigator.bluetooth.requestDevice(options).then(device => {
            return device.gatt.connect();
        }).then(server => {
            return server.getPrimaryService(this.HR_SERVICE);
        }).then(service => {
            return service.getCharacteristic(this.HR_CHARACTERISTIC);
        }).then(characteristic => {
            characteristic.addEventListener('characteristicvaluechanged',
                                            event => this.onHeartRateChanged(event));
            return characteristic.startNotifications();
        }).catch(err => {
            console.log('Err getting heart rate: ' + err);
        });
    }
}

import { Injectable  } from '@angular/core';
import { Ng2DeviceService } from 'ng2-device-detector';

@Injectable()
export class DeviceService {
    private _isMobile: boolean = false;
    constructor(private deviceService: Ng2DeviceService) {
        let deviceInfo = this.deviceService.getDeviceInfo();
        if (["android", "iphone"].indexOf(deviceInfo.device) > -1) {
            this._isMobile = true;
        }
    }

    public get isMobile(): boolean {
        return this._isMobile;
    }
}
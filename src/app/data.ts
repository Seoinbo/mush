export class Data {
    static _data: any = {
        "media": [
            {
                id: 1,
                type: "a",
                title: "Introducing Daydream. Simple and high quality!",
                desc: "Experience Daydream standalone headsets built with our partners HTC VIVE.",
                videos: "rA1_TKtbqAE",
                images: "https://www.dothome.co.kr/static/images/main/main-slide3.jpg",
                time: 1472914800 // 20160904
            }, {
                id: 2,
                type: "b",
                title: "Standalone VR headsets with Daydream",
                desc: "Experience Daydream standalone headsets built with our partners HTC VIVE",
                videos: "",
                images: "https://www.dothome.co.kr/static/images/main/main-slide10.jpg",
                time: 1479049200 // 20161114
            }, {
                id: 3,
                type: "a",
                title: "Introducing Daydream",
                desc: "Simple, high quality virtual reality",
                videos: "t-B3_iCLVHg",
                images: "https://www.dothome.co.kr/static/images/main/main-slide15.jpg",
                time: 1472914800 // 20160904
            }, {
                id: 4,
                type: "c",
                title: "Lean more",
                desc: "a leader in VR, and Lenovo, a leader in mobile & computing innovation",
                videos: ",99riHQyN4jw",
                images: "https://www.dothome.co.kr/static/images/main/main-slide4.jpg,https://www.dothome.co.kr/static/images/main/main-slide11.jpg",
                time: 1484665200 // 20170118
            }, {
                id: 5,
                type: "b",
                title: "Get the latest news",
                desc: "By clicking Sign Up",
                videos: "",
                images: "https://www.dothome.co.kr/static/images/main/main-slide4.jpg",
                time: 1496415600 // 20170603
            }, {
                id: 6,
                type: "a",
                title: "Hop right into VR",
                desc: "Everything you need is built into the headset—just pick it up and hop right into VR",
                videos: "n8d79M0LtfY", // n8d79M0LtfY
                images: "https://www.dothome.co.kr/static/images/main/main-slide3.jpg",
                time: 1501513200 // 20170801
            }
        ]
    };

    static get(type: string, offset:number = 0, limit: number = -1) {
        if (limit < 0) {
            limit = 9999;
        }
        let rows = [];
        let len = this._data[type].length;
        for (let i = offset, n = 0; i < len; i++, n++) {
            if (n >= limit) {
                break;
            }
            rows.push(this._data[type][i]);
        }
        return rows;
    }
}


export class Data {
    static _data: any = {
        "media": [
            {
                id: 1,
                type: "a",
                title: "Introducing Daydream",
                desc: "Simple, high quality virtual reality",
                time: 1472914800, // 20160904
                src: "https://www.dothome.co.kr/static/images/main/main-slide3.jpg",
                alt: "https://www.dothome.co.kr/static/images/main/main-slide3.jpg"
            }, {
                id: 2,
                type: "b",
                title: "Standalone VR headsets with Daydream",
                desc: "Experience Daydream standalone headsets built with our partners HTC VIVE",
                time: 1479049200, // 20161114
                src: "https://www.dothome.co.kr/static/images/main/main-slide10.jpg",
                alt: "https://www.dothome.co.kr/static/images/main/main-slide10.jpg"
            }, {
                id: 3,
                type: "d",
                title: "Lean more",
                desc: "a leader in VR, and Lenovo, a leader in mobile & computing innovation",
                time: 1484665200, // 20170118
                src: "https://www.dothome.co.kr/static/images/main/main-slide11.jpg",
                alt: "https://www.dothome.co.kr/static/images/main/main-slide11.jpg"
            }, {
                id: 4,
                type: "d",
                title: "Bigger ahhhhs",
                desc: "Explore new worlds, kick back in your personal VR cinema, and play games that put you in the center of the action",
                time: 1490626800, // 20170328
                src: "https://www.dothome.co.kr/static/images/main/main-slide4.jpg",
                alt: "https://www.dothome.co.kr/static/images/main/main-slide4.jpg"
            }, {
                id: 5,
                type: "d",
                title: "Get the latest news",
                desc: "By clicking Sign Up",
                time: 1496415600, // 20170603
                src: "https://www.dothome.co.kr/static/images/main/main-slide3.jpg",
                alt: "https://www.dothome.co.kr/static/images/main/main-slide3.jpg"
            }, {
                id: 6,
                type: "c",
                title: "Google VR Blog",
                desc: "Product Safety, Warranty and Regulatory Information",
                time: 1500390000, // 20170719
                src: "https://www.dothome.co.kr/static/images/main/main-slide14.jpg",
                alt: "https://www.dothome.co.kr/static/images/main/main-slide14.jpg"
            }, {
                id: 7,
                type: "c",
                title: "Easy-to-use",
                desc: "Everything you need is built into the headset—just pick it up and hop right into VR",
                time: 1501513200, // 20170801
                src: "https://www.dothome.co.kr/static/images/main/main-slide15.jpg",
                alt: "https://www.dothome.co.kr/static/images/main/main-slide15.jpg"
            }
        ]
    };

    static get(type: string) {
        return this._data[type];
    }
}


import { Injectable  } from '@angular/core';

@Injectable()
export class DataService {
    _data: any = {
        "menu": [
            {
                id: 1,
                title: "MENU1",
                href: "#sparassis-crispa",
                target: "_self",
                selected: false
            }, {
                id: 2,
                title: "MENU2",
                href: "#store",
                target: "_self",
                selected: false
            }, {
                id: 3,
                title: "MENU3",
                href: "https://order.pay.naver.com/home?tabMenu=SHOPPING",
                target: "_blank",
                selected: false
            }, {
                id: 4,
                title: "MENU4",
                href: "#scrap",
                target: "_self",
                selected: false
            },
        ],
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
        ],
        "scrap": [
            {
                id: 1,
                type: "dic",
                title: "꽃송이버섯",
                desc: "버섯의 자실체는 백색이나 밤색으로 물결치는 꽃잎이 다수 모인 것 같은 모양이다. 전체의 지름은 10~30cm이고, 하얀 양배추를 닮아 아름답다. 근부는 덩이 모양인 공통의 자루로 되어 있고 자실층은 꽃잎 모양의 얇은 조각이 아래쪽에 발달한다. 꽃잎같은 조각의 두께는 0.1cm 정도이다. 살은 연하지만 치아를 자른 것 같은 모양이다. 버섯의 표면과 뒷면의 구별이 있다.",
                srctit: "네이버 지식백과 한국의 버섯",
                image: "./assets/images/thumb_sparassis_radicata_naver.jpg",
                link: "http://terms.naver.com/entry.nhn?docId=770115&cid=46689&categoryId=46689"
            }, {
                id: 2,
                type: "news",
                title: "신비의 꽃송이버섯 전남 첫 인공재배 성공",
                desc: "전남도산림자원연구소가 국내 최초로 꽃송이버섯 인공재배에 성공, 농가에 재배기술을 이전한데 이어 국내 소비 촉진과 해외 수출 등 산업화 방안을 적극 모색하고 있다. 17일 전남도산림자원연구소에 따르면 꽃송이버섯은 꽃양배추모양을 띠고 씹는 감촉과 향이 독특해 애호가들 사이에선 '신비의 버섯'으로 불린다. 특히 최근 연구 결과 건조한 꽃송이버섯에서 100g당 43.6%의 베타글루칸이 함유돼 있어 인체의 면역력을 높이고 암, 고혈압, 당뇨 등에도 탁월하다고 밝혀 국내에서는 물론 일본, 중국 등 해외에서도 인기가 높다.",
                srctit: "전남일보",
                image: "./assets/images/thumb_jnilbo.jpg",
                link: "http://www.jnilbo.com/read.php3?aid=1476716400508410002"
            }, {
                id: 3,
                type: "video",
                title: "명품! 꽃송이버섯의 다양한 효능",
                desc: "꽃송이버섯 효능 중 가장 많이 알려져 있는 효능은 항암효과 입니다. 꽃송이버섯에는 베타글루칸이 50%이상 함류되어 있는것으로 알려져 있는데요. 베타글루칸은 종양의 전이를 억제 하고 암과 관련된 혈관이 생성되는 것을 억제합니다. 버섯 100g당 베타글루칸 함량은 꽃송이버섯(43.6g), 노랑느타리바섯(37.6g), 일반느타리버섯(19~28g), 잎새버섯(15~20g), 영지버섯(8~15g), 송이버섯(18.1g) 순으로 꽃송이 버섯이 가장많이 함유하고 있습니다. 한 연구에 따르면 항종양 활성, 대장암 세포 역제, 대장 활동을 활발하게 한다는 실험 결과가 있습니다.",
                srctit: "TV조선 내 몸 사용설명서 110회",
                image: "./assets/images/thumb_mybody.jpg",
                link: "https://youtu.be/wUVvBqsMN1A"
            }, {
                id: 4,
                type: "news",
                title: "베타글루칸(β-glucan)이란?",
                desc: "다당류의 일종으로 면역증강작용을 가지고 있으며 효모의 세포벽, 버섯류, 곡류 등에 존재하고 있다. 인간 정상 세포의 면역기능을 활성화시켜 암세포의 증식과 재발을 억제하고 혈당과 혈중 콜레스테롤을 감소시키며 지질대사를 개선하여 체지방 형성과 축적을 억제한다.",
                srctit: "두산백과사전",
                image: "http://cfile29.uf.tistory.com/image/2365084D550F66D80F97B6",
                link: "http://terms.naver.com/entry.nhn?docId=1256075&cid=40942&categoryId=32098"
            }
        ],
        "products": [
            {
                id: 1,
                title: "Progress Lighting P3884",
                image: "https://s.pstatic.net/static/www/mobile/edit/2017/0809/cropImg_339x222_102721593234280900.jpeg",
                oprice: 0,
                price: 100000,
                soldout: 0,
                readytime: 1508166000,
                reason: "재배기간 6개월 동안은 버섯을 판매하지 않습니다"
            }, {
                id: 2,
                title: "Eddie Bauer Sherpa Throw",
                image: "http://cfile8.uf.tistory.com/image/252EFD3C57594DFA2A46FE",
                oprice: 0,
                price: 200000,
                soldout: 1,
                readytime: 1508166000,
                reason: "재배기간 6개월 동안은 버섯을 판매하지 않습니다"
            }, {
                id: 3,
                title: "White Monterey 6 Drawer",
                image: "http://cfile1.uf.tistory.com/image/2637823857667FC8268AB0",
                oprice: 300000,
                price: 285000,
                soldout: 1,
                readytime: 1502895600,
                reason: "재배기간 6개월 동안은 버섯을 판매하지 않습니다"
            }
        ],
        "shipping": {
            fee: 3500, // 배송비
            cutline: 200000 // 총금액이 이 금액 이상이면 배송 무료
        }
    };

    get(type: string, offset:number = 0, limit: number = -1) {
        if (limit < 0) {
            limit = 9999;
        }
        if (!(this._data[type] instanceof Array)) {
            return this._data[type];
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

    count(type: string) : number {
        return this._data[type].length;
    }
}


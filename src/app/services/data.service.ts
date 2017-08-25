import { Injectable  } from '@angular/core';

@Injectable()
export class DataService {
    _data: any = {
        "menu": [
            {
                id: 1,
                title: "꽃송이버섯",
                href: "#sparassis-crispa",
                target: "_self",
                selected: false
            }, {
                id: 2,
                title: "주문하기",
                href: "#store",
                target: "_self",
                selected: false
            }, {
                id: 3,
                title: "구매내역",
                href: "https://order.pay.naver.com/home?tabMenu=SHOPPING",
                target: "_blank",
                selected: false
            }, {
                id: 4,
                title: "관련글",
                href: "#scrap",
                target: "_self",
                selected: false
            },
        ],
        "media": [
            {
                id: 1,
                type: "a",
                title: "매일 얼마나 자랐는지 확인합니다",
                desc: "매일 아침 버섯재배사에 갑니다. 재배사를 한 바퀴 돌고 나면 안심이 되거든요.",
                videos: "rA1_TKtbqAE",
                images: "http://stimg.emart.com/upload/poweroflocalfoods/20161209_0950011_060.jpg?tmstmp=1503046475743",
                time: 1506809300 // 20171001
            }, {
                id: 2,
                type: "b",
                title: "재배 3개월째",
                desc: "제법 많이 컸습니다. 아주 잘 자라고 있어요. 버섯은 환경이 제일 중요하기 때문에 매일 온도와 습도를 확인하고 있습니다.",
                videos: "",
                images: "./assets/images/thumb_jnilbo.jpg",
                time: 1504714580 // 201709204
            }, {
                id: 3,
                type: "c",
                title: "패키지 디자인",
                desc: "상품 패키지 샘플이 나왔습니다. 선물용으로도 손색없게 고급스러운 느낌을 내려고 노력했습니다. 며느리가 고생을 많이 했습니다.",
                videos: "",
                images: "http://cfile2.uf.tistory.com/image/271DD73656A36E1E31F3A0,http://cfile30.uf.tistory.com/image/250E514256A36E14171CA6",
                time: 1501517600 // 201706211
            }, {
                id: 5,
                type: "b",
                title: "꽃송이 버섯 배지 도착",
                desc: "오랜 고민 끝에 우리 농장에서 처음으로 재배할 버섯을 정했습니다. 뛰어난 항암 효과로 최근 주목받고 있는 버섯인데요. 바로 꽃송이버섯 입니다. 비싼 소비자 가격 때문에 쉬운 결정은 아니었지만 건조된 버섯은 농민이 직거래를 하기에도 적합했습니다. 건조하면 안 좋을까 걱정하실 텐데 오히려 비타민D 성분이 더욱 증가한다고 합니다.",
                videos: "",
                images: "http://cfile7.uf.tistory.com/image/196CCF4150DCED8A11BE2B",
                time: 1498017800 // 201706211
            }, {
                id: 6,
                type: "a",
                title: "상주 두리산",
                desc: "우리 농장은 경북 상주시 두리산자락에 있습니다. 산세가 험하고 수풀이 우거져 인적이 드문 외딴곳이지만, 공기가 맑고 토양이 우수해 식물이 자라기 좋은 환경입니다.",
                videos: "",
                images: "http://vilcap.com/wp-content/uploads/2016/09/Maggie-tower-view-nc1.jpg",
                time: 1496535800
            }, {
                id: 7,
                type: "b",
                title: "버섯 재배사 설치",
                desc: "주된 작물이 포도였는데 버섯이 건강에 좋다 하여 앞으로 반절은 버섯 농사를 짓기로 했습니다. 아내와 둘이서 농사를 짓다 보니 더 일거리를 늘릴 수 없었습니다. 일단 재배 환경이 좋은 두리산 아래 버섯 재배사를 설치했습니다.",
                videos: "",
                images: "http://010-8991-7397.com/wp-content/uploads/2014/06/KakaoTalk_20160228_182532053.jpg",
                time: 1495095440
            }, {
                id: 8,
                type: "a",
                title: "농사만 35년",
                desc: "안녕하세요. 경북 상주에서 35년 넘게 농사만 지어 온 착한 농부 서중교 입니다. 복숭아, 포도, 곶감 등 주로 과수 농사를 짓고 있으며 모두 내 자식들이 먹는다 생각하고 안전한 식품을 재배하기 위해 노력하고 있습니다. 지금까지 유통 마진 때문에 비싼 값에 구매하셨다면 농부가 직접 판매해 가격이 착한 최상품을 지금 만나보세요.",
                videos: "",
                images: "http://stimg.emart.com/upload/poweroflocalfoods/20161208_0919055_040.jpg?tmstmp=1503045613021",
                time: 1488294000 // 20170301
            }
        ],
        // "media": [
        //     {
        //         id: 1,
        //         type: "a",
        //         title: "Introducing Daydream. Simple and high quality!",
        //         desc: "Experience Daydream standalone headsets built with our partners HTC VIVE.",
        //         videos: "rA1_TKtbqAE",
        //         images: "https://www.dothome.co.kr/static/images/main/main-slide3.jpg",
        //         time: 1472914800 // 20160904
        //     }, {
        //         id: 2,
        //         type: "b",
        //         title: "Standalone VR headsets with Daydream",
        //         desc: "Experience Daydream standalone headsets built with our partners HTC VIVE",
        //         videos: "",
        //         images: "https://www.dothome.co.kr/static/images/main/main-slide10.jpg",
        //         time: 1479049200 // 20161114
        //     }, {
        //         id: 3,
        //         type: "a",
        //         title: "Introducing Daydream",
        //         desc: "Simple, high quality virtual reality",
        //         videos: "t-B3_iCLVHg",
        //         images: "https://www.dothome.co.kr/static/images/main/main-slide15.jpg",
        //         time: 1472914800 // 20160904
        //     }, {
        //         id: 4,
        //         type: "c",
        //         title: "Lean more",
        //         desc: "a leader in VR, and Lenovo, a leader in mobile & computing innovation",
        //         videos: ",99riHQyN4jw",
        //         images: "https://www.dothome.co.kr/static/images/main/main-slide4.jpg,https://www.dothome.co.kr/static/images/main/main-slide11.jpg",
        //         time: 1484665200 // 20170118
        //     }, {
        //         id: 5,
        //         type: "b",
        //         title: "Get the latest news",
        //         desc: "By clicking Sign Up",
        //         videos: "",
        //         images: "https://www.dothome.co.kr/static/images/main/main-slide4.jpg",
        //         time: 1496415600 // 20170603
        //     }, {
        //         id: 6,
        //         type: "a",
        //         title: "Hop right into VR",
        //         desc: "Everything you need is built into the headset—just pick it up and hop right into VR",
        //         videos: "n8d79M0LtfY", // n8d79M0LtfY
        //         images: "https://www.dothome.co.kr/static/images/main/main-slide3.jpg",
        //         time: 1501513200 // 20170801
        //     }
        // ],
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
                type: "book",
                title: "꽃송이버섯 베타글루칸 1.3",
                desc: "최근의 연구에서 면역력을 높이고 암을 예방하는 성분은 베타(1,3)글루칸이라고 하는 것이 확인 되었습니다. 이 새로운 발견으로 인하여 질병으로 고통 받고 있는 많은 사람들과 보다 건강하게 살고자 하는 많은 분들에게 조금이라도 도움을 줄 수 있기를 바라면서 본서를 출판하고자 합니다.",
                srctit: "나카지마 미쯔오 도쿄의대 교수",
                image: "./assets/images/thumb_book_beta13.jpg",
                link: "http://book.naver.com/bookdb/book_detail.nhn?bid=7443914"
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
                soldout: 0,
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


import { Injectable  } from '@angular/core';

@Injectable()
export class DataService {
    _data: any = {
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
                type: "news",
                title: "수확의 기쁨을 느끼고 가을 농사를 준비하는 달",
                desc: "매년 8월 상순은 가마솥 더위가 절정을 이룬다. 중순까지 막바지 무더위가 이어지다가 하순 께가 되면 슬그머니 꼬리를 내린다. 예비 귀농·귀촌인이나 초보 귀농·귀촌인들이 알아두어야 할 ‘8월의 전원생활’은 무엇일까?",
                srctit: "두산백과사전",
                source: "www.naver.com",
                image: "https://s.pstatic.net/static/www/mobile/edit/2017/0626/cropImg_166x108_98923112182913433.png",
                link: "about:blank"

            }, {
                id: 2,
                type: "blog",
                title: "제주도 한 외딴 농장 파티에 CEO들이 모여드는 까닭",
                desc: "우리나라 사람들에게 제주도는 각별한 관광지다. 철저한 계획을 세워 값진 시간을 쪼개 방문하는 곳이기도 하고, 때로는 갑자기 어디론가 훌쩍 떠나고 싶을 때 큰 부담 없이 찾는 장소기도 하다. 한국인이 아끼는 명소, 제주도로 삶의 터전을 옮긴 CEO들이 한곳에 모인 에코파티 현장을 찾았다.",
                srctit: "네이버",
                source: "www.naver.com",
                image: "https://s.pstatic.net/static/www/mobile/edit/2017/0804/cropImg_339x222_102278677778141503.png",
                link: "about:blank"
            }, {
                id: 3,
                type: "dic",
                title: "충청남도 논산시 명재고택",
                desc: "'익다'라는 말은 열매나 씨가 여물 때, 고기나 곡식이 열을 받아 맛이 변했을 때, 혹은 술이나 장이 맛이 들 때 사용한다. 다른 의미의 '익다'는 자주 경험해 서투르지 않고 익숙할 때 사용한다. 여름의 뜨거운 햇볕 아래 익어가는 장독대들이 보인다. 우리 또한 서툴렀던 봄을 지나 무더운 여름 아래 익어가고 있는지도 모른다.",
                srctit: "조선일보",
                source: "www.naver.com",
                image: "https://s.pstatic.net/static/www/mobile/edit/2017/0804/cropImg_750x352_102272018524634867.jpeg",
                link: "about:blank"
            }, {
                id: 4,
                type: "etc",
                title: "김매기와 물관리만 잘하면 누구나 할 수 있어요",
                desc: "우리나라 사람들에게 제주도는 각별한 관광지다. 철저한 계획을 세워 값진 시간을 쪼개 방문하는 곳이기도 하고, 때로는 갑자기 어디론가 훌쩍 떠나고 싶을 때 큰 부담 없이 찾는 장소기도 하다. 한국인이 아끼는 명소, 제주도로 삶의 터전을 옮긴 CEO들이 한곳에 모인 에코파티 현장을 찾았다.",
                srctit: "카카오스토리",
                source: "www.naver.com",
                image: "https://s.pstatic.net/static/www/mobile/edit/2017/0804/cropImg_339x222_102278952269194915.png",
                link: "about:blank"
            }, {
                id: 5,
                type: "news",
                title: "1㎏에 1000만원 하는 제주 양식 ‘해마’, 중국 노린다",
                desc: "우리나라 사람들에게 제주도는 각별한 관광지다. 철저한 계획을 세워 값진 시간을 쪼개 방문하는 곳이기도 하고, 때로는 갑자기 어디론가 훌쩍 떠나고 싶을 때 큰 부담 없이 찾는 장소기도 하다. 한국인이 아끼는 명소, 제주도로 삶의 터전을 옮긴 CEO들이 한곳에 모인 에코파티 현장을 찾았다.",
                srctit: "브런치 블로그",
                source: "www.naver.com",
                image: "https://s.pstatic.net/imgnews/image/origin/025/2017/07/05/2732988.jpg",
                link: "about:blank"
            }, {
                id: 6,
                type: "news",
                title: "사라진 토종 단감, 지금 먹는 건 일본에서 온 품종",
                desc: "우리나라 사람들에게 제주도는 각별한 관광지다. 철저한 계획을 세워 값진 시간을 쪼개 방문하는 곳이기도 하고, 때로는 갑자기 어디론가 훌쩍 떠나고 싶을 때 큰 부담 없이 찾는 장소기도 하다. 한국인이 아끼는 명소, 제주도로 삶의 터전을 옮긴 CEO들이 한곳에 모인 에코파티 현장을 찾았다.",
                srctit: "네이버",
                source: "www.naver.com",
                image: "https://s.pstatic.net/static/www/mobile/edit/2017/0803/cropImg_166x108_102212231940461773.jpeg",
                link: "about:blank"
            }, {
                id: 7,
                type: "news",
                title: "제주도 한 외딴 농장 파티에 CEO들이 모여드는 까닭",
                desc: "우리나라 사람들에게 제주도는 각별한 관광지다. 철저한 계획을 세워 값진 시간을 쪼개 방문하는 곳이기도 하고, 때로는 갑자기 어디론가 훌쩍 떠나고 싶을 때 큰 부담 없이 찾는 장소기도 하다. 한국인이 아끼는 명소, 제주도로 삶의 터전을 옮긴 CEO들이 한곳에 모인 에코파티 현장을 찾았다.",
                srctit: "다음 뉴스",
                source: "www.naver.com",
                image: "https://s.pstatic.net/static/www/mobile/edit/2017/0804/cropImg_339x222_102278677778141503.png",
                link: "about:blank"
            }, {
                id: 8,
                type: "dic",
                title: "충청남도 논산시 명재고택",
                desc: "'익다'라는 말은 열매나 씨가 여물 때, 고기나 곡식이 열을 받아 맛이 변했을 때, 혹은 술이나 장이 맛이 들 때 사용한다. 다른 의미의 '익다'는 자주 경험해 서투르지 않고 익숙할 때 사용한다. 여름의 뜨거운 햇볕 아래 익어가는 장독대들이 보인다. 우리 또한 서툴렀던 봄을 지나 무더운 여름 아래 익어가고 있는지도 모른다.",
                srctit: "조선일보",
                source: "www.naver.com",
                image: "https://s.pstatic.net/static/www/mobile/edit/2017/0804/cropImg_750x352_102272018524634867.jpeg",
                link: "about:blank"
            }
        ],
        "products": [
            {
                id: 1,
                title: "Progress Lighting P3884",
                image: "https://s.pstatic.net/static/www/mobile/edit/2017/0809/cropImg_339x222_102721593234280900.jpeg",
                oprice: 0,
                price: 100000,
                soldout: 0
            }, {
                id: 2,
                title: "Eddie Bauer Sherpa Throw",
                image: "http://postfiles15.naver.net/MjAxNzA4MTFfMjMx/MDAxNTAyNDI3NTY1Njc5.wGuNrmll9rOdxaqsaltpL2uDuIVd3XmJg90DtOKzIiEg.ZdrO5Ebi15kshnxSiT7Ww57EM16c-1FQk_fKK9ABHvIg.JPEG.china_lab/image_537067151502427416200.jpg?type=w966",
                oprice: 0,
                price: 200000,
                soldout: 1
            }, {
                id: 1,
                title: "White Monterey 6 Drawer",
                image: "http://postfiles8.naver.net/MjAxNzA4MDlfNDgg/MDAxNTAyMjcxMjc0MzAx.uF6pXPS29LI1m4SaVwUrPMSl4imT1e6LiWrIygaq-Y4g.qn8FejbmQxs-I73Jkl7bIxO_Tv6Hdl9ARJP1gufqDhQg.PNG.rainy8841/image.png?type=w773",
                oprice: 300000,
                price: 285000,
                soldout: 0
            }
        ]
    };

    get(type: string, offset:number = 0, limit: number = -1) {
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

    count(type: string) : number {
        return this._data[type].length;
    }
}


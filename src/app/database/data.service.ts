import { Injectable  } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MediaObj } from '../media/mediaobj';

@Injectable()
export class DataService {
    private baseurl:string = "http://doorisan.com/api.html/";
    private paths: any = {
        "media": "instagram/recent"
    };

    constructor (private http: Http) {
    }

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
                video: "rA1_TKtbqAE",
                image: "http://stimg.emart.com/upload/poweroflocalfoods/20161209_0950011_060.jpg?tmstmp=1503046475743",
                time: 1506809300 // 20171001
            }, {
                id: 2,
                type: "a",
                title: "재배 3개월째",
                desc: "제법 많이 컸습니다. 버섯은 환경이 제일 중요하기 때문에 매일 온도와 습도를 확인하고 있습니다.",
                video: "",
                image: "./assets/images/thumb_jnilbo.jpg",
                time: 1504714580 // 201709204
            }, {
                id: 3,
                type: "a",
                title: "패키지 디자인",
                desc: "상품 패키지 샘플이 나왔습니다. 선물용으로도 손색없게 고급스러운 느낌을 내려고 노력했습니다.",
                video: "",
                image: "http://cfile2.uf.tistory.com/image/271DD73656A36E1E31F3A0",
                time: 1501517600 // 201706211
            }, {
                id: 5,
                type: "a",
                title: "꽃송이 버섯 배지 도착",
                desc: "오랜 고민 끝에 우리 농장에서 처음 재배할 버섯을 꽃송이버섯으로 정했습니다. 뛰어난 항암 효과로 널리 알려 졌지만 인공재배가 시작된 것은 요즘이어서 그동안 쉽게 구하기 힘들던 버섯이기도 합니다.",
                video: "",
                image: "http://cfile7.uf.tistory.com/image/196CCF4150DCED8A11BE2B",
                time: 1498017800 // 201706211
            }, {
                id: 6,
                type: "a",
                title: "상주 두리산",
                desc: "우리 농장은 경북 상주시 두리산자락에 있습니다. 산세가 험하고 수풀이 우거져 인적이 드문 외딴곳이지만, 공기가 맑고 토양이 우수해 식물이 자라기 좋은 환경입니다.",
                video: "",
                image: "http://vilcap.com/wp-content/uploads/2016/09/Maggie-tower-view-nc1.jpg",
                time: 1496535800
            }, {
                id: 7,
                type: "a",
                title: "버섯 재배사 설치",
                desc: "주된 작물이 포도였는데 버섯이 건강에 좋다 하여 앞으로 반절은 버섯 농사를 짓기로 했습니다. 아내와 둘이서 농사를 짓다 보니 더 일거리를 늘릴 순 없고, 일단 버섯 재배사 한동을 설치했습니다.",
                video: "",
                image: "http://010-8991-7397.com/wp-content/uploads/2014/06/KakaoTalk_20160228_182532053.jpg",
                time: 1495095440
            }, {
                id: 8,
                type: "a",
                title: "농사만 35년",
                desc: "안녕하세요. 경북 상주에서 35년 넘게 농사만 지어 온 착한 농부 서중교 입니다. 복숭아, 포도, 곶감 등 주로 과수 농사를 짓고 있으며 모두 내 자식들이 먹는다 생각하고 안전한 식품을 재배하기 위해 노력하고 있습니다.",
                video: "",
                image: "http://stimg.emart.com/upload/poweroflocalfoods/20161208_0919055_040.jpg?tmstmp=1503045613021",
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
                type: "news",
                title: "꽃송이버섯 항암효과 진실 풀렸다",
                desc: "꽃송이버섯(일본명 하나비라다케)에 들어있는 MH-3(베타1-3 글루칸)의 항암효과 기전이 밝혀졌다. 최근 일본 도야마에서 열린 일본약학회에서 도쿄약과대학 오노 나오히토 교수팀은 MH-3 수용체인 ‘덱틴 1’의 존재를 발견함에 따라 MH-3가 암환자의 몸에 흡수돼 면역력을 높이는 과정을 증명했다. 이 연구는 지난 1월 네이처 면역학지 표지에 실렸다.",
                srctit: "파이낸셜뉴스",
                image: "http://image.fnnews.com/resource/media/image/2007/04/02/200704021947586713_l.jpg",
                link: "http://www.fnnews.com/news/200704021947587737"
            }, {
                id: 2,
                type: "news",
                title: "포도시장 새바람 샤인머스켓",
                desc: "샤인머스켓은 일본에서 특히 인기 있는 품종으로 일본과수시험장에서 스튜벤, 마스캇오브알렉산드리아, 백남을 교배해서 만든 품종이다. 20브릭스(Brix)이상의 당도가 나오며 씨 없이 껍질째 먹는 포도로, 식감이 좋고 망고향이 나는 것이 특징이며 소비자의 기호도도 매우 높게 나타나고 있다. 특히, 내수에만 치중하던 판매망을 다변화해 일본, 홍콩, 싱가폴, 캐나다 등 10여개국으로까지 수출하고 있다.",
                srctit: "경북매일",
                image: "http://t1.daumcdn.net/kakaofarmer/images/2017-08-31/0ccf729703144e30aa50fe333621ac4a.jpg",
                link: "http://www.kbmaeil.com/news/articleView.html?idxno=414747"
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
                type: "dic",
                title: "꽃송이버섯",
                desc: "버섯의 자실체는 백색이나 밤색으로 물결치는 꽃잎이 다수 모인 것 같은 모양이다. 전체의 지름은 10~30cm이고, 하얀 양배추를 닮아 아름답다. 근부는 덩이 모양인 공통의 자루로 되어 있고 자실층은 꽃잎 모양의 얇은 조각이 아래쪽에 발달한다. 꽃잎같은 조각의 두께는 0.1cm 정도이다. 살은 연하지만 치아를 자른 것 같은 모양이다. 버섯의 표면과 뒷면의 구별이 있다.",
                srctit: "네이버 지식백과 한국의 버섯",
                image: "./assets/images/thumb_sparassis_radicata_naver.jpg",
                link: "http://terms.naver.com/entry.nhn?docId=770115&cid=46689&categoryId=46689"
            }, {
                id: 5,
                type: "news",
                title: "베타글루칸(β-glucan)이란?",
                desc: "다당류의 일종으로 면역증강작용을 가지고 있으며 효모의 세포벽, 버섯류, 곡류 등에 존재하고 있다. 인간 정상 세포의 면역기능을 활성화시켜 암세포의 증식과 재발을 억제하고 혈당과 혈중 콜레스테롤을 감소시키며 지질대사를 개선하여 체지방 형성과 축적을 억제한다.",
                srctit: "두산백과사전",
                image: "http://cfile29.uf.tistory.com/image/2365084D550F66D80F97B6",
                link: "http://terms.naver.com/entry.nhn?docId=1256075&cid=40942&categoryId=32098"
            }, {
                id: 6,
                type: "news",
                title: "신비의 꽃송이버섯 전남 첫 인공재배 성공",
                desc: "전남도산림자원연구소가 국내 최초로 꽃송이버섯 인공재배에 성공, 농가에 재배기술을 이전한데 이어 국내 소비 촉진과 해외 수출 등 산업화 방안을 적극 모색하고 있다. 17일 전남도산림자원연구소에 따르면 꽃송이버섯은 꽃양배추모양을 띠고 씹는 감촉과 향이 독특해 애호가들 사이에선 '신비의 버섯'으로 불린다. 특히 최근 연구 결과 건조한 꽃송이버섯에서 100g당 43.6%의 베타글루칸이 함유돼 있어 인체의 면역력을 높이고 암, 고혈압, 당뇨 등에도 탁월하다고 밝혀 국내에서는 물론 일본, 중국 등 해외에서도 인기가 높다.",
                srctit: "전남일보",
                image: "./assets/images/thumb_jnilbo.jpg",
                link: "http://www.jnilbo.com/read.php3?aid=1476716400508410002"
            }, {
                id: 7,
                type: "blog",
                title: "면역인자를 생성하는 와송",
                desc: "와송의 핵심 성분인 사이토카인은 면역, 감염병, 조혈기능, 조직회복, 세포의 발전 및 성장에 중요한 기능을 하며 항원에 대해 항체의 생성을 유도하고 외부의 침입에 대해서 인체의 방어체계를 제어하고 자극하는 효능을 가지고 있습니다. 즉 항원 분자에 대해서 중성화 작용을 하고 그들에 대항하는 면역인자를 생성하는데요.",
                srctit: "네이버 포스트 - 약초박사 유리씨",
                image: "http://post.phinf.naver.net/MjAxNzA4MTNfMTc1/MDAxNTAyNjMxOTk1MjMx.NYVFK_w5Y6UcVKo6HXYHJYiiiP5kmcuKQypReo_8Wp4g.qGih9nXsLUFEeh6L0Qu81hF7DQH4P9zNrDDvvWzPNbwg.JPEG/%EC%82%AC%EC%A7%841.jpg?type=w1200",
                link: "http://m.post.naver.com/viewer/postView.nhn?volumeNo=9103042&memberNo=38120456&searchKeyword=%EC%99%80%EC%86%A1&searchRank=2"
            }, {
                id: 8,
                type: "news",
                title: "약용버섯 이야기: 꽃송이버섯",
                desc: "꽃송이버섯에 대한 과학적 분류체계가 정리되어 있는데도 현존하는 미국 버섯도감들은 물론 학문적인 문헌에 조차 꽃송이버섯류(Sparassis spp.)에 대한 학명기재가 많은 혼동을 일으키고 있다. 최근 DNA 검사결과에 따라 꽃송이버섯은 대체로 7종이 분류되었고, 한 종류가 아직 설명되지 않고 있다 한다. 그 7종류 가운데 북미에는 3종류의 꽃송이버섯이 돋고 있고, 한국에서는 오직 한 종류만 기록되어 있다.",
                srctit: "자연을 닮은 사람들",
                image: "http://www.jadam.kr/news/photo/201605/8927_15416_336.jpg",
                link: "http://www.jadam.kr/news/articleView.html?idxno=8927"
            // }, {
            //     id: 9,
            //     type: "blog",
            //     title: "노력해도 쉽게 빠지지 않는 내장지방! 꽃송이버섯이면 OK?",
            //     desc: "꽃송이버섯은 고산지대에 많으며 낙엽송 밑에서 주로 자생된다고 합니다. 마치 산호초를 연상시키는 물결 모양의 작은 꽃송이가 여러 개 모인 것처럼 보여 꽃송이버섯이라고 부른다고 합니다. 베타글루칸 함량을 보면 꽃송이버섯은 효능이 뛰어나다고 소문난 영지버섯을 비롯한 다른 버섯 보다 2배 이상의 베타글루칸이 들어있다고 합니다.",
            //     srctit: "네이버 포스트 - MBN",
            //     image: "http://post.phinf.naver.net/20160411_198/1460361258618Uzjug_JPEG/Image8.jpg?type=w1200",
            //     link: "http://m.post.naver.com/viewer/postView.nhn?volumeNo=4029670&memberNo=11595512&searchKeyword=%EA%BD%83%EC%86%A1%EC%9D%B4%EB%B2%84%EC%84%AF&searchRank=4"
            }
        ],
        "products": [
            {
                id: 4390240624,
                title: "원목, 꽃송이버섯차 100g",
                desc: "꽃송이버섯 티백으로 편하게 즐기세요.",
                image: "./assets/images/thumb-mush22.jpg",
                oprice: 100000,
                price: 80000,
                soldout: 0,
                readytime: 1508166000,
                reason: "재배기간 6개월 동안은 버섯을 판매하지 않습니다."
            }, {
                id: 3202680640,
                title: "원목, 건조 꽃송이버섯 50g",
                desc: "처음 구매하시는 분을 위한 소량 포장",
                image: "./assets/images/thumb-mush22.jpg",
                oprice: 50000,
                price: 40000,
                soldout: 0,
                readytime: 1508166000,
                reason: "재배기간 6개월 동안은 버섯을 판매하지 않습니다."
            }, {
                id: 2205718542,
                title: "원목, 건조 꽃송이버섯 100g",
                desc: "꾸준히 찾으시는 분을 위한 실속형 상품",
                image: "./assets/images/thumb-mush22.jpg",
                oprice: 100000,
                price: 80000,
                soldout: 0,
                readytime: 1508166000,
                reason: "재배기간 6개월 동안은 버섯을 판매하지 않습니다."
            }, {
                id: 3202542363,
                title: "건조 꽃송이버섯 선물세트 200g",
                desc: "고마운 분들을 위한 건강 선물세트",
                image: "./assets/images/thumb-mush5.jpg",
                oprice: 200000,
                price: 160000,
                soldout: 0,
                readytime: 1508166000,
                reason: "재배기간 6개월 동안은 버섯을 판매하지 않습니다."
            }, {
                id: 2232048121,
                title: "샤인머스켓(국내산 청포도) 2kg",
                desc: "경북 상주의 특산품, 고랭지 청포도",
                image: "./assets/images/thumb-grape1.jpg",
                oprice: 28000,
                price: 25900,
                soldout: 1,
                readytime: 1502895600,
                reason: "재배기간 동안은 판매하지 않습니다."
            }, {
                id: 2238886456,
                title: "샤인머스켓(국내산 청포도) 4kg",
                desc: "경북 상주의 특산품, 고랭지 청포도",
                image: "./assets/images/thumb-grape1.jpg",
                oprice: 49000,
                price: 47000,
                soldout: 1,
                readytime: 1502895600,
                reason: "재배기간 동안은 판매하지 않습니다."
            }
        ],
        "shipping": {
            fee: 3000, // 배송비
            cutline: 200000 // 총금액이 이 금액 이상이면 배송 무료
        }
    };

    get(type: string, offset:number = 0, limit: number = -1) {
        if (limit < 0) {
            limit = 9999;
        }

        // if (!this._data[type]) {
            // this._get(this.getURL("media"), offset, limit).then((data) => {
            //     console.log(data);
            // },
            // (err) => {
            //     console.log(err);
            // });
        // }

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

    public media(offset:number = 0, limit: number = -1): Promise<MediaObj[]> {
        let baseurl = this.getURL("media");
        return this.http.get(baseurl + "?offset=" + offset + "&limit" + limit)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    // Get data from database.
    public _get(url: string, offset:number = 0, limit: number = -1): Promise<any> {
        return this.http.get(url + "?offset=" + offset + "&limit" + limit)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    private getURL(type: string): string {
        return this.baseurl + this.paths[type];
    }
}


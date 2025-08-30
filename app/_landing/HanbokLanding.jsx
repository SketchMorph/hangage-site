"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Phone, MapPin, ShoppingBag, Truck, Ruler, Instagram, Settings, Save, RefreshCcw, Copy } from "lucide-react";

/*
  생활한복 가게 원페이지 랜딩 + 간편 편집(관리자) 모드
  - 상단 우측 "관리자" 버튼으로 열기
  - 로컬 저장(localStorage) 지원: 브라우저에 임시 저장되고, 나중에 확정 시 제가 코드에 영구 반영 가능
*/

const DEFAULT_CONFIG = {
  brandName: "한가게",
  metaTitle: "한가게 | 전주 생활한복",
  metaDescription: "전주 생활한복 한가게 — 남/여/어린이 한복, 철릭원피스, 허리치마, 소품",
  heroHeadline: "우리옷 상점, 한스타일 '밝은'상점",
  address: "전주시 완산구 태평3길 70 중앙상가 2층 206호 한가게",
  hours: "영업시간 오전9시~오후7시",
  phoneMain: "063-255-2547",
  phoneMobile: "010-7309-2547",
  instagram: "@efun36",
  naverPlaceUrl: "https://naver.me/GA8LhINb",
  kakaoOpenChatUrl: "https://open.kakao.com/o/s9HWYCOh",
  smartstoreUrl: "https://smartstore.naver.com/hangagye",
  policyText: "교환·환불 불가",
  categories: [
    { title: "남성 생활한복", desc: "편안한 일상 저고리/바지", img: "https://picsum.photos/seed/menhanbok/600/400" },
    { title: "여성 생활한복", desc: "모던·미니멀 실루엣", img: "/hanW001.png" },
    { title: "어린이 한복", desc: "귀여운 우리옷", img: "/childP001.png" },
    { title: "철릭원피스", desc: "간편한 원피스형 철릭", img: "/oneW001.png" },
    { title: "뷔스티에", desc: "레이어드 포인트", img: "/strapB001.png" },
    { title: "허리치마", desc: "일상용 랩스커트", img: "/skirtB001.png" },
    { title: "무용치마", desc: "공연·연습용", img: "/danP001.png" },
    { title: "앞치마", desc: "생활 앞치마", img: "/apronB001.png" },
    { title: "두건 및 소품", desc: "헤드웨어·파우치", img: "/hairP001.png" },
  ],
  bests: [
    { name: "철릭원피스", price: "가격 미정", img: "https://picsum.photos/seed/best-cheollik/600/600" },
    { name: "허리치마(아이보리)", price: "가격 미정", img: "https://picsum.photos/seed/best-skirt/600/600" },
    { name: "뷔스티에", price: "가격 미정", img: "https://picsum.photos/seed/best-bustier/600/600" },
  ],
};

const STORAGE_KEY = "hangage-config";

export default function HanbokLanding() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [adminOpen, setAdminOpen] = useState(false);

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setConfig({ ...DEFAULT_CONFIG, ...JSON.parse(raw) });
    } catch (e) {}
  }, []);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    alert("저장했어요. (이 브라우저에 보관) 확정 원하시면 '내보내기'로 보내주세요!");
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig(DEFAULT_CONFIG);
  };

  const exportToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(config, null, 2));
      alert("설정을 복사했어요. 저에게 붙여넣어 보내주시면 코드에 영구 반영해드릴게요!");
    } catch (e) {
      alert("복사에 실패했어요. 관리자 패널의 JSON을 수동으로 복사해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Helmet>
        <title>{config.metaTitle}</title>
        <meta name="description" content={config.metaDescription} />
      </Helmet>

      {/* 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            <span className="font-semibold tracking-tight">{config.brandName}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#categories" className="hover:opacity-80">카테고리</a>
            <a href="#best" className="hover:opacity-80">베스트</a>
            <a href="#story" className="hover:opacity-80">브랜드</a>
            <a href="#size" className="hover:opacity-80">사이즈/맞춤</a>
            <a href="#store" className="hover:opacity-80">매장안내</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-2xl border-blue-900 text-blue-900 hover:bg-blue-50" onClick={() => setAdminOpen((v) => !v)}>
              <Settings className="w-4 h-4 mr-1"/> 관리자
            </Button>
            <a href={config.smartstoreUrl} target="_blank" rel="noopener" className="inline-flex items-center justify-center rounded-2xl bg-blue-900 hover:bg-blue-800 text-white px-4 py-2">바로 쇼핑</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-[url('/main000.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-white/60" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{config.heroHeadline}</h1>
            <p className="mt-4 text-base md:text-lg text-gray-700">
              숨 쉬는 천, 자연스러운 실루엣, 그리고 한국적 아름다움. 출근길부터 주말 나들이까지 함께해요.
            </p>
            <div className="mt-6 flex gap-3">
              <Button size="lg" className="rounded-2xl bg-blue-900 hover:bg-blue-800">신상품 보기</Button>
              <Button size="lg" variant="outline" className="rounded-2xl border-blue-900 text-blue-900 hover:bg-blue-50">룩북 보기</Button>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2"><Check className="w-4 h-4"/>국내 제작 · 천연 소재 중심</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4"/>사이즈/맞춤 옵션 지원</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4"/>{config.policyText}</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4"/>5만원 이상 무료배송</li>
            </ul>
          </div>
          <div className="md:justify-self-end">
           
          </div>
        </div>
      </section>

      {/* 카테고리 */}
      <section id="categories" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">카테고리</h2>
        <p className="text-gray-600 mt-2">원하시는 스타일을 골라보세요.</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8">
          {config.categories.map((c, i) => (
            <a key={i} href="#" className="group">
              <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-gray-100">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div className="mt-3">
                <div className="font-semibold">{c.title}</div>
                <div className="text-sm text-gray-600">{c.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 베스트 상품 */}
      <section id="best" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">베스트 상품</h2>
          <p className="text-gray-600 mt-2">가장 사랑받는 아이템을 만나보세요.</p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {config.bests.map((b, i) => (
              <Card key={i} className="rounded-2xl overflow-hidden">
                <div className="aspect-square bg-gray-100">
                  <img src={b.img} alt={b.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold">{b.name}</div>
                      <div className="text-sm text-gray-600">시즌 베스트</div>
                    </div>
                    <div className="font-semibold">{b.price}</div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button className="rounded-2xl bg-blue-900 hover:bg-blue-800">장바구니</Button>
                    <Button variant="outline" className="rounded-2xl border-blue-900 text-blue-900 hover:bg-blue-50">바로구매</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 브랜드 스토리 */}
      <section id="story" className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">우리의 이야기</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              한복의 아름다움을 일상 속에서 즐길 수 있도록, 편안한 패턴과 자연 소재를 연구합니다.
              지역 장인과 협력하여 공정한 생산을 지향하며, 오래 입을 수 있는 옷을 만듭니다.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li className="flex items-center gap-2"><Check className="w-4 h-4"/>국내 소량 생산</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4"/>세탁·관리 간편</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4"/>친환경 포장</li>
            </ul>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
            <img src="/home01.png" alt="atelier" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* 사이즈 & 맞춤 */}
      <section id="size" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">사이즈 & 맞춤</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <Card className="rounded-2xl">
              <CardHeader><CardTitle className="text-lg">사이즈 가이드</CardTitle></CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-3">
                <p>권장 신체 치수 기준 (cm). 생활한복 특성상 품/허리는 여유 있게 제작됩니다.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr><th className="p-2 text-left">구분</th><th className="p-2">사이즈</th><th className="p-2">가슴둘레</th><th className="p-2">허리둘레</th><th className="p-2">권장 키</th></tr>
                    </thead>
                    <tbody>
                      <tr><td className="p-2">여성</td><td className="p-2">44</td><td className="p-2">80–84</td><td className="p-2">62–66</td><td className="p-2">150–165</td></tr>
                      <tr className="bg-gray-50"><td className="p-2">여성</td><td className="p-2">55</td><td className="p-2">84–88</td><td className="p-2">66–70</td><td className="p-2">155–170</td></tr>
                      <tr><td className="p-2">여성</td><td className="p-2">66</td><td className="p-2">88–92</td><td className="p-2">70–74</td><td className="p-2">160–172</td></tr>
                      <tr className="bg-gray-50"><td className="p-2">여성</td><td className="p-2">77</td><td className="p-2">92–96</td><td className="p-2">74–78</td><td className="p-2">160–175</td></tr>
                      <tr><td className="p-2">남성</td><td className="p-2">90</td><td className="p-2">88–92</td><td className="p-2">76–80</td><td className="p-2">165–175</td></tr>
                      <tr className="bg-gray-50"><td className="p-2">남성</td><td className="p-2">95</td><td className="p-2">92–96</td><td className="p-2">80–84</td><td className="p-2">170–180</td></tr>
                      <tr><td className="p-2">남성</td><td className="p-2">100</td><td className="p-2">96–100</td><td className="p-2">84–88</td><td className="p-2">175–185</td></tr>
                      <tr className="bg-gray-50"><td className="p-2">아동</td><td className="p-2">S(5–6세)</td><td className="p-2">60–64</td><td className="p-2">50–54</td><td className="p-2">105–115</td></tr>
                      <tr><td className="p-2">아동</td><td className="p-2">M(7–8세)</td><td className="p-2">64–68</td><td className="p-2">54–58</td><td className="p-2">115–125</td></tr>
                      <tr className="bg-gray-50"><td className="p-2">아동</td><td className="p-2">L(9–10세)</td><td className="p-2">68–72</td><td className="p-2">58–62</td><td className="p-2">125–135</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-gray-500">* 품/허리 밴드 조절 가능 제품은 1사이즈 상하 변동 여유. 스커트 총장은 키·체형에 맞춰 조절해 드립니다.</p>
                <Button variant="outline" className="rounded-2xl border-blue-900 text-blue-900 hover:bg-blue-50">표 다운로드</Button>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader><CardTitle className="text-lg">맞춤 제작</CardTitle></CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <p>원하는 길이/소매/허리 밴드 강도 조절 가능.</p>
                <p className="text-gray-600">제작 기간: 영업일 기준 5–10일</p>
                <Button className="rounded-2xl bg-blue-900 hover:bg-blue-800">맞춤 문의</Button>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader><CardTitle className="text-lg">결제/배송/교환</CardTitle></CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <div className="flex items-center gap-2"><Truck className="w-4 h-4"/> 자체몰 결제(카드/계좌) + 해외 결제 지원 (Amazon, Shopee 등 연동 가능)</div>
                <p>5만원 이상 무료배송</p>
                <p>{config.policyText}</p>
                <Button variant="outline" className="rounded-2xl border-blue-900 text-blue-900 hover:bg-blue-50">정책 보기</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 리뷰 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">고객 리뷰</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[
            { name: "이*은", text: "출근복으로 매일 입어요. 구김 적고 시원합니다." },
            { name: "박*진", text: "부모님 선물로 딱! 핏이 단정해요." },
            { name: "김*우", text: "커플 세트로 샀는데 사진 맛집입니다 :)" },
          ].map((r, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="p-5">
                <div className="text-sm text-gray-700">“{r.text}”</div>
                <div className="mt-3 text-sm font-semibold">{r.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 매장 안내 */}
      <section id="store" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">매장 안내</h2>
            <p className="mt-3 text-gray-700">{config.address}</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-gray-700">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4"/> {config.phoneMain} / {config.phoneMobile}</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4"/> {config.hours}</div>
              <div className="flex items-center gap-2"><Instagram className="w-4 h-4"/> {config.instagram}</div>
            </div>
            <div className="mt-6 flex gap-3">
              <a href={config.kakaoOpenChatUrl} target="_blank" rel="noopener" className="inline-flex items-center justify-center rounded-2xl bg-blue-900 hover:bg-blue-800 text-white px-4 py-2">카카오톡 예약</a>
              <a href={config.naverPlaceUrl} target="_blank" rel="noopener" className="inline-flex items-center justify-center rounded-2xl border border-blue-900 text-blue-900 hover:bg-blue-50 px-4 py-2">네이버 지도</a>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
            <img src="/Main00.png" alt="atelier" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* 문의 / 뉴스레터 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <Card className="rounded-2xl">
          <CardContent className="p-6 md:p-8 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">신상품/행사 알림 받기</h3>
              <p className="mt-2 text-sm text-gray-700">이메일을 남겨주시면 계절 컬렉션과 행사 소식을 전해드려요.</p>
            </div>
            <form className="flex gap-2">
              <Input type="email" placeholder="your@email.com" className="rounded-2xl"/>
              <Button type="submit" className="rounded-2xl bg-blue-900 hover:bg-blue-800">구독</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* 푸터 */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600 grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-semibold text-gray-800">{config.brandName}</div>
            <p className="mt-2">사업자등록 870-20-01783 </p>
            <p>대표 한진례 | 고객센터 {config.phoneMain} · {config.phoneMobile} | efun36@naver.com</p>
          </div>
          <div>
            <div className="font-semibold text-gray-800">고객 안내</div>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:underline">배송/교환/환불 정책</a></li>
              <li><a href="#" className="hover:underline">개인정보 처리방침</a></li>
              <li><a href="#" className="hover:underline">이용약관</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-gray-800">빠른 링크</div>
            <ul className="mt-2 space-y-1">
              <li><a href="#categories" className="hover:underline">카테고리</a></li>
              <li><a href="#best" className="hover:underline">베스트</a></li>
              <li><a href="#store" className="hover:underline">매장안내</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 pb-8">© {new Date().getFullYear()} {config.brandName}. All rights reserved.</div>
      </footer>

      {/* 관리자 패널 */}
      {adminOpen && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-[460px] bg-white border shadow-xl rounded-2xl p-4 z-[60]">
          <div className="flex items-center justify-between">
            <div className="font-semibold">간편 편집 (브라우저에만 저장)</div>
            <Button variant="ghost" className="h-8" onClick={() => setAdminOpen(false)}>닫기</Button>
          </div>
          <div className="grid grid-cols-1 gap-3 mt-3 text-sm">
            <label className="grid gap-1">
              <span>메타 타이틀</span>
              <Input value={config.metaTitle} onChange={(e)=>setConfig({...config, metaTitle: e.target.value})}/>
            </label>
            <label className="grid gap-1">
              <span>메타 설명</span>
              <Input value={config.metaDescription} onChange={(e)=>setConfig({...config, metaDescription: e.target.value})}/>
            </label>
            <label className="grid gap-1">
              <span>히어로 문구</span>
              <Input value={config.heroHeadline} onChange={(e)=>setConfig({...config, heroHeadline: e.target.value})}/>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1"><span>매장 전화</span><Input value={config.phoneMain} onChange={(e)=>setConfig({...config, phoneMain: e.target.value})}/></label>
              <label className="grid gap-1"><span>휴대폰</span><Input value={config.phoneMobile} onChange={(e)=>setConfig({...config, phoneMobile: e.target.value})}/></label>
            </div>
            <label className="grid gap-1"><span>주소</span><Input value={config.address} onChange={(e)=>setConfig({...config, address: e.target.value})}/></label>
            <label className="grid gap-1"><span>영업시간</span><Input value={config.hours} onChange={(e)=>setConfig({...config, hours: e.target.value})}/></label>
            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1"><span>인스타그램</span><Input value={config.instagram} onChange={(e)=>setConfig({...config, instagram: e.target.value})}/></label>
              <label className="grid gap-1"><span>정책 문구</span><Input value={config.policyText} onChange={(e)=>setConfig({...config, policyText: e.target.value})}/></label>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <label className="grid gap-1"><span>스마트스토어 URL</span><Input value={config.smartstoreUrl} onChange={(e)=>setConfig({...config, smartstoreUrl: e.target.value})}/></label>
              <label className="grid gap-1"><span>네이버 지도(플레이스) URL</span><Input value={config.naverPlaceUrl} onChange={(e)=>setConfig({...config, naverPlaceUrl: e.target.value})}/></label>
              <label className="grid gap-1"><span>카카오톡 오픈채팅 URL</span><Input value={config.kakaoOpenChatUrl} onChange={(e)=>setConfig({...config, kakaoOpenChatUrl: e.target.value})}/></label>
            </div>

            {/* 카테고리 간단 편집 */}
            <div className="mt-2">
              <div className="font-semibold mb-1">카테고리 (제목만 빠르게 수정)</div>
              <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-1">
                {config.categories.map((c, idx)=> (
                  <div key={idx} className="grid grid-cols-[1.5rem_1fr] items-center gap-2">
                    <span className="text-xs text-gray-500">{idx+1}.</span>
                    <Input value={c.title} onChange={(e)=>{
                      const next=[...config.categories];
                      next[idx] = { ...c, title: e.target.value };
                      setConfig({ ...config, categories: next });
                    }}/>
                  </div>
                ))}
              </div>
            </div>

            {/* 버튼들 */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button onClick={save} className="rounded-2xl bg-blue-900 hover:bg-blue-800 text-white"><Save className="w-4 h-4 mr-1"/>저장</Button>
              <Button variant="outline" onClick={reset} className="rounded-2xl"><RefreshCcw className="w-4 h-4 mr-1"/>기본값</Button>
              <Button variant="outline" onClick={exportToClipboard} className="rounded-2xl"><Copy className="w-4 h-4 mr-1"/>내보내기(JSON)</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

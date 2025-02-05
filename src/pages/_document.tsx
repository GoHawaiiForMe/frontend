import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* 기본 메타 태그 */}
        <meta name="description" content="당신만의 특별한 여행을 만나보세요" />
        <meta name="keywords" content="여행, 하와이, 여행플래너" />
        <meta name="author" content="니가가라 하와이" />

        {/* Open Graph 메타 태그 */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="니가가라 하와이" />
        <meta property="og:description" content="당신만의 특별한 여행을 만나보세요" />
        <meta
          property="og:image"
          content="https://scontent-ssn1-1.cdninstagram.com/v/t51.29350-15/440535983_1166519591460822_7666710914928913519_n.jpg"
        />
        <meta property="og:url" content="https://fs2-4-team2-go-for-me.vercel.app" />

        {/* Kakao SDK */}
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
          integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka"
          crossOrigin="anonymous"
          async
        />

        {/* Facebook SDK */}
        <script
          async
          defer
          crossOrigin="anonymous"
          src={`https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v18.0&appId=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}`}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

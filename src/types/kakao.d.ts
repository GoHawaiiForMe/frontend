interface KakaoSDK {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendScrap: (options: { requestUrl: string }) => void;
    createDefaultButton: (options: {
      container: string | HTMLElement;
      objectType?: "feed";
      content: {
        title: string;
        description: string;
        imageUrl: string;
        link: {
          mobileWebUrl: string;
          webUrl: string;
        };
      };
    }) => void;

  };
}

declare global {
  interface Window {
    Kakao: any;
  }
}

export {};
//모듈의 형태로 만든다. import or export 구문 존재한다면, 모듈이라고 판단한다.
//CommonJs : import or export 구문 존재하지 않는다면, CommonJs 모듈이라고 판단한다.
//ESM : import or export 구문 존재한다면, ESM 모듈이라고 판단한다.

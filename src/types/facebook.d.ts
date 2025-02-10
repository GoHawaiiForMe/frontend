interface FacebookSDK {
  ui: (
    params: {
      display?: "popup";
      method: "share";
      href: string;
      hashtag?: string;
      quote?: string;
    },
    callback?: (response: any) => void,
  ) => void;
  getAuthResponse: () => any;
}

declare global {
  interface Window {
    FB: FacebookSDK;
    fbAsyncInit?: () => void;
  }
}

export {};

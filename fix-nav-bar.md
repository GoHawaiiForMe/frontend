# 문제점
- `Navbar`에서 호출하는 `isLoggedIn`, `userInfo`가 클라이언트 상태 값이고, 해당 값들이 초기 값은 비로그인 유저 ui를 보여주도록 하고 있음

# 해결 방법
1. SSR을 활용하는 방법
- `isLoggedIn`, `userInfo`는 브라우저가 받게되는 첫 HTML에 존재해야, 비로그인 유저 ui가 아닌 로그인 된 유저 ui를 그려줄 수 있음
- 즉, next 서버에서 HTML을 브라우저로 응답하기 전에 미리 GoHawaiiForMe 백엔드 서버로 `userInfo` 요청을 해서 HTML을 그려줘야함

2. 로딩 상태를 두는 방법
- `isLoggedIn, userInfo`를 불러오는 동안 해당 영역의 UI에 로딩 상태를 두는 방법
- (새로고침을 했을때, 로딩 UI가 노출되기는 함)

### 추천드리는 방법
- 1번의 경우, 많은 부분을 바꿔야함
  - next api route 생성이 필요하고,
  - _app.tsx가 아닌 개별 페이지 컴포넌트에서 SSR을 구현해야함 (`getServerSideProps`) (_app.tsx에서는 `getServersideProps`를 사용하면 안됨)
  - SSR에서 `apiClient`는 사용할 수 없으며 - 기존 apiClient의 변경을 하던가, 새로운 axios 구현체가 필요함
  - zustand 보다 react-query로 SSR 구현하는 것이 더 용이함

- 따라서 2번 방법이 현재 코드 구조상 가장 최소한의 코드 수정을 할 수 있을 것

### PR
- 현재 올라간 PR은 2번 방법의 구현이며, 1번으로 변경을 하고 싶은 경우 우선 프로젝트의 나머지 부분을 다 구현한 뒤 리팩토링 하는 것을 추천함

## PR 설명
### 기본 지식
- Next.js의 경우, 브라우저의 첫 요청이 들어오면 서버에서 리액트 코드를 돌려서 그린 초기 HTML과 필요한 JS, CSS 파일을 내려줌
- 이후, 브라우저에서 초기 HTML을 바로 사용자가 볼 수 있도록 그려주며 추후 JS를 파싱하면서 리액트 코드를 한번 더 연산함
  - 이때 필요한 ui 변경을 한번 더 해줌
- 문제의 원인은 서버에서 연산한 HTML은 비로그인 유저의 ui고 브라우저에서 연산한 ui는 로그인 유저의 ui임 (이 차이로 인해 깜빡거리는 현상 발생함)
- 현재 서버에서 내뱉는 ui와 (스샷 기준 network의 preview 탭), 실제 브라우저에서 JS 파싱 후 렌더링된 ui는 다름 (스샷 기준 좌측 화면)
![스크린샷 2025-02-09 오후 8 42 00](https://github.com/user-attachments/assets/2eb33492-c219-43cd-b516-df59bae657b7)

### 이 PR이 문제를 일시적으로 해결하는 이유
- 정확한 해결 방법은 아니고, Next에서 내려주는 초기 HTML을 안보여주는 방식으로 동작하는 것 (스샷을 보면, network의 preview 탭이 빈 화면임)
  ![스크린샷 2025-02-09 오후 8 50 00](https://github.com/user-attachments/assets/1aa50068-76f1-4792-8b03-e65b9ecb3593)

- 이게 동작하는 이유는 `useEffect` 코드는 서버에서 연산되지 않음.
- 따라서, 서버에서 초기 HTML을 그릴 때는 `_app.tsx`의 `isHydrated` 값은 초기값 `false`인 상태로 연산이 되고 리턴값은 `null`이기 때문에 빈 공백의 HTML이 브라우저에게 전송됨
- 이후, 브라우저에서 JS를 파싱해 ui를 그리기전 필요한 데이터를 가져와 화면을 그려주는 방식
- 즉, SSR을 사용하지 않고 - CSR로 앱을 만들겠다는 뜻
- 정말 SSR이 필요없는지 고민해보고, 필요하다면 이 PR의 코드를 2번으로 수정해야함

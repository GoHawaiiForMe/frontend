# 문제점
- `Navbar`에서 호출하는 `isLoggedIn`, `userInfo`가 클라이언트 상태 값이고, 해당 값들이 초기 값은 비로그인 유저 ui를 보여주도록 하고 있음

# 해결 방법
1. SSR을 활용하는 방법
- `isLoggedIn`, `userInfo`는 브라우저가 받게되는 첫 HTML에 존재해야, 비로그인 유저 ui가 아닌 로그인 된 유저 ui를 그려줄 수 있음
- 즉, next 서버에서 HTML을 브라우저로 응답하기 전에 미리 GoHawaiiForMe 백엔드 서버로 `userInfo` 요청을 해서 HTML을 그려줘야함

2. 로딩 상태를 두는 방법
- `isLoggedIn, userInfo`를 불러오는 동안 해당 영역의 UI에 로딩 상태를 두는 방법

### 추천드리는 방법
- 1번의 경우, 많은 부분을 바꿔야함
  - next api route 생성이 필요하고,
  - _app.tsx가 아닌 개별 페이지 컴포넌트에서 SSR을 구현해야함 (`getServerSideProps`) (_app.tsx에서는 `getServersideProps`를 사용하면 안됨)
  - SSR에서 `apiClient`는 사용할 수 없으며 - 기존 apiClient의 변경을 하던가, 새로운 axios 구현체가 필요함
  - zustand 보다 react-query로 SSR 구현하는 것이 더 용이함

- 따라서 2번 방법이 현재 코드 구조상 가장 최소한의 코드 수정을 할 수 있을 것

### PR
- 현재 올라간 PR은 2번 방법의 구현이며, 1번으로 변경을 하고 싶은 경우 우선 프로젝트의 나머지 부분을 다 구현한 뒤 리팩토링 하는 것을 추천함
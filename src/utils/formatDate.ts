export function formatToSimpleDate(dateString: string): string {
  //2025-01-01
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatToDetailedDate(dateString: string): string {
  //2025. 01. 01(월)
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = days[date.getDay()];

  return `${year}. ${month}. ${day}(${dayName})`;
}

export function formatRelativeTime(dateString: string): string {
  // 몇 분전
  const now = new Date();
  const date = new Date(dateString);
  const diffInMilliseconds = now.getTime() - date.getTime();

  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 0) {
    return "방금 전";
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}일 전`;
}

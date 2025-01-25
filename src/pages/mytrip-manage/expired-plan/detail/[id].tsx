import { useRouter } from "next/router";

const DetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Detail Page</h1>
      <p>Plan ID: {id}</p>
    </div>
  );
};

export default DetailPage;

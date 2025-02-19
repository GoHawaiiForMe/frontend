import ProfileEditMaker from "@/features/ProfileEditMaker";
import withAuthAccess from "@/stores/withAuthAccess";
import { useRouter } from "next/router";

export function ProfileEditMakerPage() {
  const router = useRouter();
  const { id } = router.query;

  return <ProfileEditMaker makerId={id as string} />;
}

export default withAuthAccess(ProfileEditMakerPage);

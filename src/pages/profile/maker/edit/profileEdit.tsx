import ProfileEditMaker from "@/features/ProfileEditMaker";
import withAuthAccess from "@/stores/withAuthAccess";

export function ProfileEditMakerPage() {
  return <ProfileEditMaker />;
}

export default withAuthAccess(ProfileEditMakerPage);

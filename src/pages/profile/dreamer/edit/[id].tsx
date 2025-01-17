import ProfileEditDreamer from "@/features/ProfileEditDreamer";
import withAuthAccess from "@/stores/withAuthAccess";

function ProfileEditDreamerPage() {
  return <ProfileEditDreamer />;
}

export default withAuthAccess(ProfileEditDreamerPage);
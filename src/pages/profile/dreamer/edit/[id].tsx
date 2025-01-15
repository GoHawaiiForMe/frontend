import ProfileEditDreamer from "@/features/ProfileEditDreamer";
import useAccess from "@/stores/useAccess"

function ProfileEditDreamerPage() {
  return <ProfileEditDreamer />;
}

export default useAccess(ProfileEditDreamerPage);
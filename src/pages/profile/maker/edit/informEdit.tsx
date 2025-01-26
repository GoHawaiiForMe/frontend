import InformEditMaker from "@/features/InformEditMaker";
import withAuthAccess from "@/stores/withAuthAccess";

export  function ProfileEditDreamerPage() {
  return <InformEditMaker />;
}

export default withAuthAccess(ProfileEditDreamerPage);

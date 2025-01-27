import ProfileMaker from "@/features/ProfileMaker";
import withAuthAccess from "@/stores/withAuthAccess";

export  function MakerProfile() {
  return <div><ProfileMaker/></div>;
}

export default withAuthAccess(MakerProfile);

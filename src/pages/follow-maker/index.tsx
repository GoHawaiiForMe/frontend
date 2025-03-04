import FollowedMaker from "@/features/FollowedMaker";
import withAuthAccess from "@/stores/withAuthAccess";

export function FollowedMakerPage() {
  return <FollowedMaker />;
}

export default withAuthAccess(FollowedMakerPage, "DREAMER");

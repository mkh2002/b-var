import { useEffect, useState } from "react";
import { checkFollow, addFollow, unFollow } from "@/lib/fetch-data";

const useFollow = (mid: number) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const { is_following } = await checkFollow(mid);
        setIsFollowing(is_following);
      } catch (error) {
        console.error("Error checking follow status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollowStatus();
  }, [mid]);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      if (isFollowing) {
        await unFollow(mid);
        setIsFollowing(false);
      } else {
        await addFollow(mid);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error handling follow action:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isFollowing, isLoading, handleFollow };
};

export default useFollow;

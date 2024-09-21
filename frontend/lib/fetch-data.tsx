"use server";

export const fetchData = async (url: string, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Fetch request failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch request error:", error);
    throw error;
  }
};
export const checkFollow = async (mid: number) => {
  const response = await fetch(`http://flask:8000/checkfollow/${mid}`, {
    cache: "no-cache",
  });
  const data = await response.json();
  return data;
};

export const unFollow = async (mid: number) => {
  const res = await fetch("http://flask:8000/unfollow/" + mid, {
    method: "POST",
  });
};

export const addFollow = async (mid: number) => {
  const res = await fetch("http://flask:8000/following", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mid }),
  });
};

export const getRank = async () => {
  const response = await fetch("http://flask:8000/rank", {
    cache: "no-cache",
  });
  const data = await response.json();
  return data;
};

export const getFollowing = async () => {
  const response = await fetch("http://flask:8000/following", {
    cache: "no-cache",
  });
  const data = await response.json();

  return data;
};

export const getVideo = async (bvid: string) => {
  const response = await fetch(`http://flask:8000/video/${bvid}`, {
    cache: "no-cache",
  });
  const data = await response.json();
  return data;
};

export const getUser = async (mid: number) => {
  const response = await fetch(`http://flask:8000/user/${mid}`, {
    cache: "no-cache",
  });
  const data = await response.json();
  return data;
};

export const getUserVideo = async (mid: number) => {
  const response = await fetch(`http://flask:8000/user/video/${mid}`, {
    cache: "no-cache",
  });
  const data = await response.json();
  return data;
};

export const getImage = async (src: string) => {
  const res = await fetch(`/api/backend/profile/${src}`);
  const data = await res.json();
  return data;
};

export const getStar = async () => {
  const res = await fetch("http://flask:8000/star", {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
};

export const getComment = async (aid: number) => {
  const res = await fetch(`http://flask:8000/comment/${aid}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
};

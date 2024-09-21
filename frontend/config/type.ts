export interface VideoProps {
  mid: number;
  bvid: string;
  pubdate: number;
  title: string;
  date: number;
  desc: string;
  aid: number;
  duration: number;
  owner: {
    mid: number;
    name: string;
    face: string;
  };
  pic: string;
  cid: number;
  face: string;
  like: number;
  danmaku: number;
  coin: number;
  view: number;
  tname: string;
  stat: {
    coin: number;
    like: number;
    view: number;
  };
}

export interface CommentsProps {
  avatar: string;
  content: string;
  ctime: number;
  mid: number;
  likes: number;
  uname: string;
}

export interface UserStatProps {
  archive: { view: number };
  likes: number;
}

from bilibili_api import video

async def get_video_info(bvid):
    v = video.Video(bvid=bvid)
    data =await v.get_info()
    return data


from bilibili_api import hot, sync
def get_hot():
    h = hot.get_hot_videos()
    return (sync(h)['list'])


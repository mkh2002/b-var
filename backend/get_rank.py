from bilibili_api import rank, sync

def get_rank():
    r = rank.get_rank()
    return(sync(r)['list'])
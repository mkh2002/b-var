import asyncio
from bilibili_api import sync, user,Credential

credential = Credential(sessdata='cde1b0ea%2C1734153133%2C19c35%2A61CjBbPwk7w0L9lw5n_5u7QwUOA0sDxpO8C7b1kiFpY_6DFNeI3ptkiQS_1SGXLo_WPZgSVlhyUHo1aS16YkpibXE4R2VaOG1HdGdaaFBXUmRMOHNmbXJ6R096SXRodDZsYUd1UkdEb2wyM2JmdUJFY0czYm9udFBoelVJUndUTjB4Zm9ydWFGVEN3IIEC',bili_jct='438e6ad848ab938446ddb933ba3bb887',buvid3='25BD7360-089D-713E-27A4-8B6DC3519BB831437infoc',)
async def get_user_info(user_id):
    u = user.User(user_id, credential)
    data = await u.get_user_info()
    return data

async def get_relation_info(user_id):
    u = user.User(user_id,credential)
    data = await u.get_relation_info()
    return data

async def get_user_video (user_id):
    u = user.User(user_id,credential)
    d = user.VideoOrder.PUBDATE
    v =await u.get_videos()
    return v

async def get_combined_info(user_id):
    user_info_task = get_user_info(user_id)
    relation_info_task = get_relation_info(user_id)
    
    user_info, relation_info = await asyncio.gather(user_info_task, relation_info_task)
    
    combined_data = {**user_info, **relation_info}
    return combined_data

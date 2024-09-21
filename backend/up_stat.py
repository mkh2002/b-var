from bilibili_api import Credential, user
credential = Credential(sessdata='cde1b0ea%2C1734153133%2C19c35%2A61CjBbPwk7w0L9lw5n_5u7QwUOA0sDxpO8C7b1kiFpY_6DFNeI3ptkiQS_1SGXLo_WPZgSVlhyUHo1aS16YkpibXE4R2VaOG1HdGdaaFBXUmRMOHNmbXJ6R096SXRodDZsYUd1UkdEb2wyM2JmdUJFY0czYm9udFBoelVJUndUTjB4Zm9ydWFGVEN3IIEC',bili_jct='438e6ad848ab938446ddb933ba3bb887',buvid3='25BD7360-089D-713E-27A4-8B6DC3519BB831437infoc',)
async def up_stat(mid):
    u = user.User(mid, credential)
    d = await u.get_up_stat()
    return d


async def overview_stat(mid):
    u = user.User(mid, credential)
    d = await u.get_overview_stat()
    return d

async def top_video(mid):
    u = user.User(mid, credential)
    d = await u.get_masterpiece()
    return d     

from bilibili_api import Credential, user, sync

credential = Credential(sessdata='e1c5ceea%2C1733018153%2Cc4166%2A62CjCsznIk5zPf4t2UuZGX-11m39nQxfX86OTDAzopa4WvwroaPNhQ4FAerBaTeT3-FIUSVnkzaDNFZlo1dFFZRnd1d0tfamRKZ0VUZDd5dHpuNnEyUi12LUZWQklwQTJrOXJVRVFUaWtBT042dDY5WkVXTE1JWXhsdnNnWFBvSWNrX3oxcV9iRXJnIIEC',bili_jct='6f763f71b932cfa216e49f2a621cd69c',buvid3='25BD7360-089D-713E-27A4-8B6DC3519BB831437infoc',)
u = user.User(uid=31880257, credential=credential)

print(sync(u.get_videos()))
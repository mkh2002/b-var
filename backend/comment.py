from bilibili_api import comment

async def get_comment(aid, page=3, order_type=comment.OrderType.LIKE):
    comments = []
    c = await comment.get_comments(
        oid=aid,
        type_=comment.CommentResourceType.VIDEO,  # Set the appropriate resource type here
        page_index=page,
        order=order_type,  # Use the enumeration value instead of a string
    )
    for cmc in c['replies']:
        comments.append({
            'content': cmc['content']['message'],
            'avatar': cmc['member']['avatar'],
            'uname': cmc['member']['uname'],
            'likes': cmc['like'],
            'mid': cmc['mid'],
            'ctime': cmc['ctime']
        })

    return comments
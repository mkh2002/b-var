import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
_table_cache = {}

def get_table_name(tablename):
    if tablename in _table_cache:
        return _table_cache[tablename]

    class Table(db.Model):
        __tablename__ = tablename
        __table_args__ = {'extend_existing': True}
        id = db.Column(db.Integer, primary_key=True, autoincrement=True)
        title = db.Column(db.String(255), nullable=False)
        view = db.Column(db.BigInteger, nullable=False)
        pic = db.Column(db.String(255), nullable=False)
        like = db.Column(db.BigInteger, nullable=False)
        coin = db.Column(db.BigInteger, nullable=False)
        mid = db.Column(db.BigInteger, nullable=False)
        bvid = db.Column(db.String(20), nullable=False)
        tname = db.Column(db.String(255), nullable=False)
        owner = db.Column(db.String(50), nullable=False)
        face = db.Column(db.String(100), nullable=False)
        point = db.Column(db.Float, nullable=False)
        date = db.Column(db.Integer, nullable=False)
        duration = db.Column(db.Integer, nullable =False)
        danmaku = db.Column(db.Integer, nullable = False)

        def __init__(self, bvid, title,danmaku, tname, owner, view, face, coin, like,duration, mid, point, pic, date):
            self.bvid = bvid
            self.title = title
            self.tname = tname
            self.owner = owner
            self.view = view
            self.face = face
            self.coin = coin
            self.like = like
            self.mid = mid
            self.point = point
            self.pic = pic
            self.date = date
            self.duration = duration
            self.danmaku = danmaku

    _table_cache[tablename] = Table
    return Table

class Following(db.Model):
    __tablename__ = 'following'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    mid = db.Column(db.BigInteger, nullable=False)
    date = db.Column(db.Date, nullable=False)
    is_following = db.Column(db.Boolean, nullable=False)

    def __init__(self, mid=None, date=None, is_following=True):
        self.mid = mid
        self.date = date if date else datetime.date.today()
        self.is_following = is_following

# class Star(db.Model):
#     __tablename__ = 'star'
#     __table_args__ = {'extend_existing': True}
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     mid = db.Column(db.BigInteger, nullable=False)
#     date = db.Column(db.Date, nullable=False)
#     bvid = db.Column(db.String, nullable=False)
#     title = db.Column(db.String, nullable=False)
#     tname = db.Column(db.String, nullable=False)
#     view = db.Column(db.BigInteger, nullable=False)
#     coin = db.Column(db.BigInteger, nullable=False)
#     like = db.Column(db.BigInteger, nullable=False)

#     def __init__(self, mid=None, date=None, is_star=True, bvid=None, title=None, tname=None, view=None, coin=None, like=None):
#         self.mid = mid
#         self.date = date if date else datetime.date.today()
#         self.is_star = is_star
#         self.bvid = bvid
#         self.title = title
#         self.tname = tname
#         self.view = view
#         self.coin = coin
#         self.like = like

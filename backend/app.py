import datetime
from flask import Flask, jsonify, request
from sqlalchemy.orm import sessionmaker
from up_stat import overview_stat, top_video, up_stat
from comment import get_comment
from make_video_ass import analyze_danmaku_data
from models import Following, db, get_table_name
from config import BaseConfig
from flask_cors import CORS
from get_rank import get_rank
from get_hot import get_hot
from user_info import get_combined_info, get_user_video
from get_video_info import get_video_info


app = Flask(__name__)
app.config.from_object(BaseConfig)
db.init_app(app)
CORS(app, origins='http://localhost:3000', supports_credentials=True)

# Initialize sessionmaker within application context
with app.app_context():
    Session = sessionmaker(bind=db.engine)

def get_data_and_store(tablename_prefix, get_data_func):
    with app.app_context():
        tablename = f'{tablename_prefix}_{datetime.datetime.now().strftime("%Y%m%d")}'
        Table = get_table_name(tablename)

        try:
            # Check if the table already exists
            if not db.engine.dialect.has_table(db.engine.connect(), tablename):
                # Create the table if it doesn't exist
                Table.__table__.create(db.engine, checkfirst=True)

            # Fetch data and store it in the database
            data_list = get_data_func()
            for get_data in data_list:
                # Check if the record already exists
                existing_record = db.session.query(Table).filter_by(bvid=get_data['bvid']).first()
                if existing_record:
                    # Update the existing record
                    existing_record.title = get_data['title']
                    existing_record.tname = get_data['tname']
                    existing_record.owner = get_data['owner']['name']
                    existing_record.view = get_data['stat']['view']
                    existing_record.face = get_data['owner']['face']
                    existing_record.coin = get_data['stat']['coin']
                    existing_record.pic = get_data['pic']
                    existing_record.like = get_data['stat']['like']
                    existing_record.date = get_data['pubdate']
                    existing_record.duration = get_data['duration']
                    existing_record.danmaku = get_data['stat']['danmaku']
                    existing_record.mid = get_data['owner']['mid']
                    existing_record.point = get_data['stat']['like'] / get_data['stat']['coin'] if get_data['stat']['coin'] != 0 else 0
                else:   
                    # Add a new record
                    data_obj = Table(
                        bvid=get_data['bvid'],
                        title=get_data['title'],
                        tname=get_data['tname'],
                        owner=get_data['owner']['name'],
                        view=get_data['stat']['view'],
                        face=get_data['owner']['face'],
                        coin=get_data['stat']['coin'],
                        pic=get_data['pic'],
                        like=get_data['stat']['like'],
                        date=get_data['pubdate'],
                        danmaku=get_data['stat']['danmaku'],
                        duration = get_data['duration'],
                        mid=get_data['owner']['mid'],
                        point=get_data['stat']['like'] / get_data['stat']['coin'] if get_data['stat']['coin'] != 0 else 0
                    )
                    db.session.add(data_obj)

            db.session.commit()
            db.session.close()

            return {'message': f'{tablename_prefix.capitalize()} data processed successfully'}

        except Exception as e:
            print(f"An error occurred while processing {tablename_prefix} data: {str(e)}")
            return {'error': f'Error processing {tablename_prefix} data: {str(e)}'}

@app.before_request
def setup_session():
    global Session
    with app.app_context():
        Session = sessionmaker(bind=db.engine)

@app.route('/', methods=['GET', 'POST'])
def home():
    return "Hello, welcome to my Flask app!"

@app.route('/hot', methods=['GET'])
def hot():
    response = get_data_and_store('hot', get_hot)
    if 'error' in response:
        return jsonify(response), 500
    else:
        data = get_table_name(f'hot_{datetime.datetime.now().strftime("%Y%m%d")}').query.all()
        json_data = jsonify([{
            'tname': item.tname,
            'owner': item.owner,
            'bvid': item.bvid,
            'view': item.view,
            'mid': item.mid,
            'face': item.face,
            'title': item.title,
            'pic': item.pic,
            'like': item.like,
            'coin': item.coin,
            'date': item.date,
            'duration': item.duration,
            'danmaku': item.danmaku
        } for item in data])
        return json_data

@app.route('/rank', methods=['GET'])
def rank():
    response = get_data_and_store('rank', get_rank)
    if 'error' in response:
        return jsonify(response), 500
    else:
        data = get_table_name(f'rank_{datetime.datetime.now().strftime("%Y%m%d")}').query.all()
        json_data = jsonify([{
            'tname': item.tname,
            'owner': item.owner,
            'bvid': item.bvid,
            'view': item.view,
            'mid': item.mid,
            'face': item.face,
            'title': item.title,
            'like': item.like,
            'pic': item.pic,
            'coin': item.coin,
            'date': item.date,
            'duration': item.duration,
            'danmaku': item.danmaku
        } for item in data])
        return json_data

@app.route('/mvp', methods=['GET'])
async def mvp():
    tablename = f'rank_{datetime.datetime.now().strftime("%Y%m%d")}'
    Table = get_table_name(tablename)

    # Check if the table exists and create it if it does not
    if not db.engine.dialect.has_table(db.engine.connect(), tablename):
        Table.__table__.create(db.engine, checkfirst=True)

    data = Table.query.order_by(Table.point.desc()).first()

    if data:
        json_data = jsonify({
            'tname': data.tname,
            'owner': data.owner,
            'bvid': data.bvid,
            'view': data.view,
            'mid': data.mid,
            'face': data.face,
            'title': data.title,
            'like': data.like,
            'coin': data.coin,
            'pic': data.pic,
            'point': data.point,
            'date': data.date,
        })
        return json_data
    else:
        return jsonify({'error': 'No data found'}), 404

@app.route('/user/<user_id>', methods=['GET'])
async def user_info(user_id):
    user_data = await get_combined_info(user_id)
    return user_data

@app.route('/user/video/<user_id>', methods = ['GET'])
async def user_video_info(user_id):
    user_video_data = await get_user_video(user_id)
    return user_video_data

@app.route('/video/<bvid>', methods=['GET'])
async def video(bvid):
    video_data = await get_video_info(bvid)
    return video_data

@app.route('/danmaku/<cid>', methods=['GET'])
async def danmaku(cid):
    danmaku_data = await analyze_danmaku_data(cid)
    return jsonify(danmaku_data)


@app.route('/following', methods=['GET', 'POST'])
async def following():
    table = Following()
    if not db.engine.dialect.has_table(db.engine.connect(), table.__tablename__):
        table.__table__.create(db.engine, checkfirst=True)

    if request.method == 'GET':
        followings = db.session.execute(db.select(Following)).scalars().all()
        following_data = []
        for f in followings:
            is_following = f.is_following
            user_data = await get_combined_info(f.mid)
            print("User Data:", user_data)  # Debugging: Print user data
            if is_following and user_data:
                following_data.append(user_data)
        return jsonify(following_data)

    elif request.method == 'POST':
        data = request.get_json()
        mid = data.get('mid')
        if mid is None:
            return jsonify({'error': 'Invalid data'}), 400

        existing_following = Following.query.filter_by(mid=mid).first()
        if existing_following:
            existing_following.is_following = True
            db.session.commit()
            return jsonify({'message': 'Following updated successfully'}), 200
        else:
            new_following = Following(mid=mid, is_following=True)
            db.session.add(new_following)
            db.session.commit()
            return jsonify({'message': 'Following added successfully', 'id': new_following.id}), 201
    
@app.route('/unfollow/<int:mid>', methods=['POST'])
def unfollow(mid):
    existing_following = Following.query.filter_by(mid=mid).first()
    if not existing_following:
        return jsonify({'error': 'User not followed yet'}), 404

    existing_following.is_following = False
    db.session.commit()
    return jsonify({'message': 'User unfollowed successfully'}), 200

@app.route('/checkfollow/<mid>', methods=['GET'])
async def check_follow(mid):
    with app.app_context():
        following = db.session.query(Following).filter_by(mid=mid).first()
        if following:
            return jsonify({'is_following': True}), 200
        else:
            return jsonify({'is_following': False}), 200

@app.route('/star', methods=['GET'])
def get_top_ranked_video():
    with app.app_context():
        today_str = datetime.datetime.now().strftime("%Y%m%d")
        tablename = f'rank_{today_str}'

        if not db.engine.dialect.has_table(db.engine.connect(), tablename):
            return jsonify({'error': 'Rank table does not exist'}), 404

        # 查询排名表并按point字段降序排序，然后选择第一条记录
        Table = get_table_name(tablename)
        top_ranked_video = Table.query.order_by(Table.point.desc()).first()

        if top_ranked_video:
            return jsonify({
                'mid': top_ranked_video.mid,
                'date': datetime.date.fromtimestamp(top_ranked_video.date),
                'bvid': top_ranked_video.bvid,
                'title': top_ranked_video.title,
                'tname': top_ranked_video.tname,
                'view': top_ranked_video.view,
                'coin': top_ranked_video.coin,
                'like': top_ranked_video.like,
                'point': top_ranked_video.point
            })
        else:
            return jsonify({'error': 'No data found in rank table'}), 404
        
@app.route('/comment/<aid>', methods=['GET'])
async def CMM(aid):
    page = request.args.get('page', default=1, type=int)
    c = await get_comment(aid, page=page)
    return jsonify(c)

@app.route('/get_up_stat/<mid>', methods=['GET'])
async def GUS(mid):
    d = await up_stat(mid)
    return d

@app.route('/get_overview/<mid>', methods=['GET'])
async def GUO(mid):
    d = await overview_stat(mid)
    return d

@app.route('/get_top_video/<mid>', methods=['GET'])
async def GTV(mid):
    d = await top_video(mid)
    return d


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
from datetime import datetime, timezone
import pytz
import aiohttp
import aiofiles
import xml.etree.ElementTree as ET
import pandas as pd
from snownlp import SnowNLP
import os
from io import StringIO
from collections import Counter
from sklearn.feature_extraction.text import TfidfVectorizer

async def get_bilibili_danmaku(cid):
    url = f'https://comment.bilibili.com/{cid}.xml'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }

    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers) as res:
            if res.status == 200:
                return await res.text()
            elif res.status == 412:
                print('Error 412: Precondition Failed')
            else:
                print(f'Error: {res.status}')
    return None

def parse_bilibili_danmaku(xml_content):
    root = ET.fromstring(xml_content)
    danmaku_list = []

    for d in root.iter('d'):
        danmaku_text = d.text
        danmaku_attr = d.attrib
        time_info = danmaku_attr.get('p', '').split(',')

        if len(time_info) > 0:
            video_time = int(float(time_info[0]))
            hours = video_time // 3600
            minutes = (video_time - hours * 3600) // 60
            seconds = video_time % 60
            real_time = f'{hours:02d}:{minutes:02d}:{seconds:02d}'
            date = float(time_info[4])
            utc_tz = pytz.timezone('UTC')
            shanghai_tz = pytz.timezone('Asia/Shanghai')
            date_time = datetime.fromtimestamp(date, tz=utc_tz).astimezone(shanghai_tz).replace(tzinfo=None)

            danmaku_list.append({
                'time': real_time,
                'date': date,
                'text': danmaku_text,
                'current_date': date_time
            })
    return danmaku_list

async def save_danmaku_to_csv(danmaku_list, filename):
    df = pd.DataFrame(danmaku_list)
    async with aiofiles.open(filename, mode='w') as f:
        await f.write(df.to_csv(index=False))
    print(f'Danmaku saved to {filename} successfully')

async def get_video_ass(cid):
    xml_content = await get_bilibili_danmaku(cid)
    if xml_content:
        danmaku_list = parse_bilibili_danmaku(xml_content)
        await save_danmaku_to_csv(danmaku_list, f'ass/{cid}.csv')

async def read_csv_async(filepath):
    async with aiofiles.open(filepath, mode='r') as f:
        content = await f.read()
    df = pd.read_csv(StringIO(content))
    return df

async def parse_emotions(df):
    emotions = {
        'positive': 0,
        'negative': 0,
        'neutral': 0
    }

    for item in df['text']:
        s = SnowNLP(item)
        if s.sentiments > 0.66:
            emotions['positive'] += 1
        elif s.sentiments < 0.33:
            emotions['negative'] += 1
        else:
            emotions['neutral'] += 1

    return emotions

async def analyze_common_words(df):
    vectorizer = TfidfVectorizer(max_features=15)
    X = vectorizer.fit_transform(df['text'])
    feature_names = vectorizer.get_feature_names_out()
    total_counts = X.sum(axis=0).A1
    word_freq = dict(zip(feature_names, total_counts))
    common_words = [{'word': word, 'count': int(count)} for word, count in Counter(word_freq).most_common(15)   ]
    return common_words

async def analyze_danmaku_data(cid):
    if not os.path.exists(f'ass/{cid}.csv'):
        await get_video_ass(cid)
    df = await read_csv_async(f'ass/{cid}.csv')
    emotions = await parse_emotions(df)
    emotions_arr = [{'title': key, 'count': value} for key, value in emotions.items()]
    common_words = await analyze_common_words(df)
    return {
        'emotions': emotions_arr,
        'common_words': common_words
    }
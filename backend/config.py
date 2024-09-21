import os


class BaseConfig(object):
    Debug = False
    DB_NAME = os.environ['POSTGRES_DB']
    DB_USER = os.environ['POSTGRES_USER']
    DB_PASS = os.environ['POSTGRES_PASSWORD']
    DB_PROT = 5432
    SQLALCHEMY_DATABASE_URI = f'postgresql://postgres:postgres@postgres:5432/db'


pass
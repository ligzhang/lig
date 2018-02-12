#!/usr/local/bin/python3
from flask import Flask
from redis import Redis

import json

app = Flask(__name__)
redis = Redis(host='redis', port =6379)

@app.route('/')
def hello():
    count =redis.incr('hits')
    return 'nihkd! 该页面已被访问{}次。\n'.format(count)
@app.route('/hello')
def json_():
    obj = [[1,2,3],123,123.123,'abc',{'key1':(1,2,3),'key2':(4,5,6)}]
    o = json.dumps(obj)
    return o
    # json.dumps({'ok':True,'msg':'测试成功'})

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)

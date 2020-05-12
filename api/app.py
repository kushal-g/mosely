import moss as mosspy
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
moss_user_id = 531248395

@app.route('/', methods=['GET', 'POST'])
def root():
    print(mosspy)
    if request.method=='POST':
        m = mosspy.Moss(moss_user_id, request.json['language'])
        for fileJSON in request.json['files']:
            m.addFile(fileJSON['fileString'],fileJSON['fileName'])
        url = m.send()
        return {
            "url":url
        }
        
    else:
        return 'Hello, World!'

if __name__=='__main__':
    app.run(debug=True)
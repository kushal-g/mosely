from flask import Flask, request
app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def root():
    if request.method=='POST':
        for f in request.files.getlist('file'):
            print(f)
            #print(f.read())
        return request.form
    else:
        return 'Hello, World!'

if __name__=='__main__':
    app.run(debug=True)
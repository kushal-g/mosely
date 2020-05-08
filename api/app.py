from flask import Flask, request
app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def root():
    if request.method=='POST':
        return request.form
    else:
        return 'Hello, World!'

if __name__=='__main__':
    app.run(debug=True)
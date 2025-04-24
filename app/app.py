from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('chat/chat.html')

@socketio.on('message')
def handle_message(data):
    emit('response', {'data': f'You said: {data["data"]}'})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
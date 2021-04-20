from flask import Flask
from flask import jsonify
from app.routes.api_azure_vm_get import api_azure_vm_get

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

app.register_blueprint(api_azure_vm_get)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
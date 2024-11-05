from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)

# Mueve la importación del modelo aquí, después de inicializar `db`
from models.user import User  
from controllers.user_controller import user_blueprint
app.register_blueprint(user_blueprint)

@app.route("/")
def health_check():
    return "User Service is running!"

if __name__ == "__main__":
    app.run(debug=True)
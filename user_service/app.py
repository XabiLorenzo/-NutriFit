from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate  # Importa Flask-Migrate

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)  # Inicializa Flask-Migrate con tu app y db

# Importar modelos y controladores después de definir `db`
from models.user import User  
from models.activity import Activity 
from controllers.user_controller import user_blueprint
app.register_blueprint(user_blueprint)

@app.route("/")
def health_check():
    return "User Service is running!"

if __name__ == "__main__":
    app.run(debug=True)
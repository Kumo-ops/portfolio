#IMPORT STATEMENTS 
from email.mime import text

from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS 
from flask_limiter import Limiter 
from flask_limiter.util import get_remote_address
from dotenv import load_dotenv
import os   

load_dotenv()

app = Flask(__name__)
CORS(app)
limiter = Limiter(
    get_remote_address, 
    app=app,
    default_limits=["200 per day", "50 per hour"]
)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

mail = Mail(app)


#Malicous content detection 
def is_malicious(text):
    text_lower = text.lower()

    #SQL Injection patterns 
    sql_patterns = [
        'select ', 'drop table', 'insert into', 'update ', 'delete from', 
        'union select', '--', '; drop', 'or 1=1', "' or '", 'xp_cmdshell'
    ]

    #spam patterns 
    spam_patterns = [
        'free money', 'click here', 'visit this site', 'buy now', 
        'limited time offer', 'act now', 'winner', 'congratulations',
        'earn $', 'work from home', 'no experience needed'
    ]

    #malware/threat patterns 
    malware_patterns = [
        'malware', 'virus', 'trojan', 'ransomware', 'spyware', 
        'keylogger', 'phishing', 'exploit', 'payload', 'backdoor'
    ]

#checks list and returns true if any pattern is found in the text
    for pattern in sql_patterns: 
        if pattern in text_lower:
            return True, 'SQL Injection attempt detected'
    for pattern in spam_patterns:
        if pattern in text_lower:
            return True, 'Spam content detected'
    for pattern in malware_patterns:
        if pattern in text_lower:
            return True, 'Malware/threat content detected'
    return False, 'Content is safe'

    return False, None

@app.route('/send', methods=['POST'])
@limiter.limit("5 per hour")  # Limit to 5 requests per hour per IP
def send_email():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')



    # Check for malicious content
    for field in [name, email, message]:
        malicious, reason = is_malicious(text=field)
        if malicious:
            return jsonify({'status': 'error', 'message': f'Message blocked: {reason}'}), 400
        
    msg = Message(
        subject=f'New message from {name} ({email})',
        sender=app.config['MAIL_USERNAME'],
        recipients=['2020anthonyrodriguez@gmail.com'],
        body=f'Name: {name}\nEmail: {email}\nMessage:\n{message}'
    )
    mail.send(msg)
    return jsonify({'status': 'sent'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

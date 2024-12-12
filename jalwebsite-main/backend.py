import os
import whisper
import requests
from flask import Flask, request, jsonify, send_file
from pydub import AudioSegment
from io import BytesIO

# Set up the Flask app
app = Flask(__name__)

# Set up Whisper model for speech-to-text
model = whisper.load_model("base")  # You can use "small", "medium", or "large" models for better accuracy

# Set up X-TTS API key and endpoint
xtts_api_key = os.environ["X_TTS_API_KEY"]
xtts_url = "https://api.xtts.com/v1/convert"

# Function to convert text to speech using X-TTS API
def text_to_speech(text):
    response = requests.post(
        xtts_url,
        headers={"Authorization": f"Bearer {xtts_api_key}"},
        json={"text": text, "voice": "en_us_male"},
    )
    
    if response.status_code == 200:
        audio_data = response.json().get("audio_content")
        return audio_data
    else:
        raise Exception("Error converting text to speech")

# Function to convert audio (speech) to text using Whisper
def speech_to_text(audio_path):
    # Use Whisper to transcribe the audio file
    result = model.transcribe(audio_path)
    return result['text']

@app.route('/process_text', methods=['POST'])
def process_text():
    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    # Convert the text to speech using X-TTS
    audio_content = text_to_speech(text)

    # Convert the audio to a format that can be returned in response (MP3)
    audio = AudioSegment.from_bytes(audio_content)
    mp3_audio = BytesIO()
    audio.export(mp3_audio, format="mp3")
    mp3_audio.seek(0)

    # Serve the audio file as a response
    return send_file(mp3_audio, mimetype="audio/mpeg")

if __name__ == '__main__':
    app.run(debug=True)

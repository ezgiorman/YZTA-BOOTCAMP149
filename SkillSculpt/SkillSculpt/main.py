from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pathlib import Path
from passlib.hash import bcrypt
import json
import random
import numpy as np
import joblib

app = FastAPI()

# Statik dosyalar
app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")

# HTML şablonları
templates = Jinja2Templates(directory="frontend")

# 🌐 Sayfa Girişleri

@app.get("/", response_class=HTMLResponse)
async def homepage(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/register", response_class=HTMLResponse)
async def register_page(request: Request):
    return templates.TemplateResponse("register.html", {"request": request, "message": ""})

@app.get("/login", response_class=HTMLResponse)
async def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request, "message": ""})

@app.get("/task", response_class=HTMLResponse)
async def task_page(request: Request):
    return templates.TemplateResponse("task.html", {"request": request})

@app.get("/submit", response_class=HTMLResponse)
async def submit_page(request: Request):
    return templates.TemplateResponse("submit.html", {"request": request})

@app.get("/analyze", response_class=HTMLResponse)
async def analyze_page(request: Request):
    return templates.TemplateResponse("analyze.html", {"request": request})


# ✅ Kullanıcı İşlemleri

@app.post("/submit-registration")
async def submit_registration(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    age: int = Form(...),
    gender: str = Form(...)
):
    hashed_pw = bcrypt.hash(password)
    user_file = Path("backend/users.json")

    users = []
    if user_file.exists():
        with open(user_file, "r", encoding="utf-8") as f:
            users = json.load(f)

    for user in users:
        if user["email"] == email:
            return templates.TemplateResponse("register.html", {
                "request": request,
                "message": "❌ Bu e-posta zaten kayıtlı."
            })

    users.append({
        "name": name,
        "email": email,
        "password": hashed_pw,
        "age": age,
        "gender": gender
    })

    with open(user_file, "w", encoding="utf-8") as f:
        json.dump(users, f, ensure_ascii=False, indent=2)

    return RedirectResponse("/login", status_code=303)


@app.post("/submit-login")
async def submit_login(
    request: Request,
    email: str = Form(...),
    password: str = Form(...)
):
    user_file = Path("backend/users.json")
    users = []

    if user_file.exists():
        with open(user_file, "r", encoding="utf-8") as f:
            users = json.load(f)

    for user in users:
        if user["email"] == email and bcrypt.verify(password, user["password"]):
            return RedirectResponse("/task", status_code=303)

    return templates.TemplateResponse("login.html", {
        "request": request,
        "message": "❌ E-posta veya şifre hatalı."
    })


# ✅ Test Sorularını Getir
@app.get("/quiz-questions")
async def get_quiz_questions():
    questions_file = Path("backend/questions.json")

    if questions_file.exists():
        with open(questions_file, "r", encoding="utf-8") as f:
            all_questions = json.load(f)
    else:
        all_questions = []

    return random.sample(all_questions, min(10, len(all_questions)))


# ✅ Disleksi Modeli ve Tahmin
model = joblib.load("backend/disleksi_model.pkl")

@app.post("/analyze-task")
async def analyze_task(request: Request):
    data = await request.json()

    features = np.array([[ 
        data["age"],
        data["reading_time"],
        data["sequencing_difficulty_score"],
        data["task_completion_time"],
        data["blank_answer_ratio"],
        data["semantic_mistake_count"],
        data["wrong_spelling_ratio"]
    ]])

    prediction = model.predict(features)[0]

    return JSONResponse(content={
        "prediction": int(prediction),
        "message": "⚠️ Disleksi riski tespit edildi." if prediction == 1 else "✅ Disleksi riski bulunamadı."
    })

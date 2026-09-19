import os
import sqlite3
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI(title="Wrench Rush Game Server")

DB_PATH = os.path.join(os.path.dirname(__file__), "wrench_rush.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS leaderboard (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            player_name TEXT NOT NULL,
            high_score INTEGER NOT NULL,
            vehicle_cleared TEXT,
            tool_used TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

init_db()

# Mount static files
app.mount("/static", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "static")), name="static")

@app.get("/", response_class=HTMLResponse)
async def serve_game():
    with open(os.path.join(os.path.dirname(__file__), "index.html"), "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())

@app.get("/manifest.json")
async def serve_manifest():
    return FileResponse(os.path.join(os.path.dirname(__file__), "manifest.json"), media_type="application/manifest+json")

@app.get("/sw.js")
async def serve_sw():
    return FileResponse(os.path.join(os.path.dirname(__file__), "sw.js"), media_type="application/javascript")

class ScoreSubmission(BaseModel):
    player_name: str
    high_score: int
    vehicle_cleared: str = ""
    tool_used: str = ""

@app.post("/api/leaderboard")
async def submit_score(data: ScoreSubmission):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO leaderboard (player_name, high_score, vehicle_cleared, tool_used)
        VALUES (?, ?, ?, ?)
    """, (data.player_name[:25], data.high_score, data.vehicle_cleared, data.tool_used))
    conn.commit()
    conn.close()
    return {"status": "success"}

@app.get("/api/leaderboard")
async def get_leaderboard():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        SELECT player_name, high_score, vehicle_cleared, tool_used, created_at
        FROM leaderboard
        ORDER BY high_score DESC
        LIMIT 20
    """)
    rows = cursor.fetchall()
    conn.close()
    return [
        {
            "player": r[0],
            "score": r[1],
            "vehicle": r[2],
            "tool": r[3],
            "date": r[4]
        }
        for r in rows
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8090, reload=True)

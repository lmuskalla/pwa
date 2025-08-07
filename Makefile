run-frontend:
	cd frontend && npm run dev

run-backend:
	cd backend && fastapi dev main.py

python-venv:
	cd backend && source .venv/bin/activate
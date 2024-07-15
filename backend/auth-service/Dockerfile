FROM python:alpine3.19

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "src/main:app", "--host", "0.0.0.0", "--port", "3001"]
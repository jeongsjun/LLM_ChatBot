# ❌ 범죄 유도성 질문 판별 챗봇

이 프로젝트는 **LLM**을 주제로 개발한 **범죄 유도성 질문 판별 챗봇** 입니다. AI 모델을 파인튜닝하고 모델을 서빙해 분석 서버와 웹을 연동해 보는 것이 컨셉입니다.

---

## 📌 주요 기능

- ✅ **데이터 수집 및 업로드**
  - AI HUB에서 훈련시킬 데이터셋을 수집해 알파카 포맷으로 변환 후 허깅페이스에 업로드
- ✅ **모델 파인튜닝**
  - gemma 모델에 수집한 데이터셋을 학습시켜 학습 덩어리 생성
- ✅ **모델 업로드**
  - 학습시킨 어댑터를 기존 모델에 병합해 허깅페이스에 업로드
- ✅ **모델 서빙**
  - 학습시킨 모델을 불러와 서빙
- ✅ **웹 연동**
  - 서빙한 분석 서버를 간단한 채팅 컨셉으로 연동
  
---

## 📁 파일 구성
```
LLM_ChatBot/
├── AI_codeset                                                # 데이터 수집 및 모델 관련 디렉터리
  ├── Part1_데이터 수집 및 전처리_허깅페이스 업로드.ipynb        # 데이터 수집 코드
  ├── Part2_Fine Tuning.ipynb                                 # 모델 파인튜닝 코드
  ├── Part3_Load and Save Mode.ipynb                          # 모델 병합 및 업로드 코드
  ├── Part4_Model Deploy.ipynb                                # 모델 서빙 코드
  ├── requirements.txt                                        # 필요 라이브러리
├── Web                                                       # 웹 관련 디렉터리
  ├── public                                                  
    ├── index.html                                            
    ├── script.js                                             
    ├── styles.css                                             
  ├── package-lock.json                                       
  ├── package.json                                            
  ├── server.js                                               
  ├── vercel.json                                             
└── ...
```

---

## 🖥️ 실행 방법

### 🛠️ 개발 환경 및 개발 도구
- 언어 및 프레임워크
  - Python 3.12
  - Nodejs 22.14
- 개발 도구
  - Colab
  - Cursor

### ▶️ 실행
#### 1. 모델 서빙
Part4_Model Deploy.ipynb를 Colab에서 모두 실행
※ 주의 : 런타임 유형을 GPU로 변경
-> 코드 실행 후 출력된 공유 URL 복사

#### 2. 챗봇 웹 접속
2-1. 접속
```
https://llm-chat-bot-mocha.vercel.app/
```
2-2. 복사한 공유 URL 붙여넣기 후 서버 URL 업데이트 실행

#### 3. 채팅 테스트

let currentServerUrl = 'https://485a-34-125-12-213.ngrok-free.app';
let loadingInterval = null;

// 페이지 로드 시 실행
window.onload = function() {
    // 환영 메시지와 사용법을 하나의 메시지로 통합
    const welcomeMessage = `안녕하세요! 범죄 관련 질문 판별 시스템입니다.<br><br>
이 시스템은 귀하의 질문이 범죄와 관련된 내용인지 판별해드립니다.<br><br>
예시 질문:<br>
- "어떻게 하면 남의 집에 들어갈 수 있나요?"<br>
- "다른 사람의 계좌에서 돈을 빼내는 방법이 궁금해요"<br>
- "어떤 약이 수면제로 효과가 좋을까요?"<br><br>
위와 같은 질문들은 범죄와 관련된 것으로 판별될 수 있습니다.<br><br>
질문을 입력하시면 범죄 관련 여부를 판별해드립니다.`;

    addMessage('시스템', welcomeMessage, 'bot-message');
};

function updateServerUrl() {
    const newUrl = document.getElementById('serverUrl').value;
    if (newUrl) {
        currentServerUrl = newUrl;
        addMessage('시스템', `분석 서버가 ${newUrl}로 변경되었습니다.`, 'bot-message');
    }
}

function addMessage(sender, text, className) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.innerHTML = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showLoadingIndicator() {
    const messagesDiv = document.getElementById('chatMessages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot-message loading-message';
    loadingDiv.id = 'loadingIndicator';
    loadingDiv.textContent = '분석 중';
    messagesDiv.appendChild(loadingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    let dots = 0;
    loadingInterval = setInterval(() => {
        dots = (dots + 1) % 4;
        loadingDiv.textContent = '분석 중' + '.'.repeat(dots);
    }, 500);
}

function removeLoadingIndicator() {
    const loadingDiv = document.getElementById('loadingIndicator');
    if (loadingDiv) {
        loadingDiv.remove();
    }
    if (loadingInterval) {
        clearInterval(loadingInterval);
        loadingInterval = null;
    }
}

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // 사용자 메시지 표시
    addMessage('사용자', message, 'user-message');
    userInput.value = '';
    
    // 로딩 인디케이터 표시
    showLoadingIndicator();
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                serverUrl: currentServerUrl
            })
        });
        
        const data = await response.json();
        
        // 로딩 인디케이터 제거
        removeLoadingIndicator();
        
        if (response.ok) {
            addMessage('봇', data.response, 'bot-message');
        } else {
            addMessage('시스템', '오류가 발생했습니다: ' + data.error, 'bot-message');
        }
    } catch (error) {
        // 로딩 인디케이터 제거
        removeLoadingIndicator();
        addMessage('시스템', '서버와 통신 중 오류가 발생했습니다.', 'bot-message');
        console.error('Error:', error);
    }
}

// Enter 키로 메시지 전송
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}); 
// chatbot.js - Versi Laravel dengan API Integration
document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const openSidebarMobile = document.getElementById('open-sidebar-mobile');
    const closeSidebarMobile = document.getElementById('close-sidebar-mobile');
    const toggleSidebarDesktop = document.getElementById('toggle-sidebar-desktop');
    const collapseIcon = document.getElementById('collapse-icon');

    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatContainer = document.getElementById('chat-container');
    const messagesContainer = document.getElementById('messages-container');
    const messagesList = document.getElementById('messages-list');
    const welcomeScreen = document.getElementById('welcome-screen');
    const sessionsList = document.getElementById('sessions-list');
    const newChatBtn = document.getElementById('new-chat-btn');
    const emptyHistory = document.getElementById('empty-history');
    const typingIndicator = document.getElementById('typing-indicator');

    // API Configuration
    const API_ENDPOINT = '/chat/send'; // Laravel endpoint
    const CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    // State
    let isSidebarCollapsed = false;
    let sessions = JSON.parse(localStorage.getItem('sk_sessions') || '[]');
    let activeSessionId = localStorage.getItem('sk_active_id') || null;
    let isProcessing = false;

    // --- Sidebar Logic ---
    function toggleMobileMenu(show) {
        if (show) {
            sidebar.classList.remove('-translate-x-full');
            mobileOverlay.classList.remove('hidden');
        } else {
            sidebar.classList.add('-translate-x-full');
            mobileOverlay.classList.add('hidden');
        }
    }

    openSidebarMobile.addEventListener('click', () => toggleMobileMenu(true));
    closeSidebarMobile.addEventListener('click', () => toggleMobileMenu(false));
    mobileOverlay.addEventListener('click', () => toggleMobileMenu(false));

    // Desktop Collapse
    toggleSidebarDesktop.addEventListener('click', () => {
        isSidebarCollapsed = !isSidebarCollapsed;
        const textElements = sidebar.querySelectorAll('.sidebar-text');

        if (isSidebarCollapsed) {
            sidebar.classList.remove('w-64');
            sidebar.classList.add('w-20');
            textElements.forEach(el => el.classList.add('hidden'));
            collapseIcon.classList.add('rotate-180');
        } else {
            sidebar.classList.remove('w-20');
            sidebar.classList.add('w-64');
            textElements.forEach(el => el.classList.remove('hidden'));
            collapseIcon.classList.remove('rotate-180');
        }
    });

    // --- Chat Logic ---
    function saveSessions() {
        localStorage.setItem('sk_sessions', JSON.stringify(sessions));
        localStorage.setItem('sk_active_id', activeSessionId);
    }

    function createSession() {
        const id = 'sess_' + Date.now();
        const newSession = {
            id: id,
            title: 'Percakapan Baru',
            messages: [],
            timestamp: new Date().toISOString()
        };
        sessions.unshift(newSession);
        activeSessionId = id;
        saveSessions();
        renderHistory();
        renderChat();
        if (window.innerWidth < 768) toggleMobileMenu(false);

        // Auto greeting for new chat
        setTimeout(() => {
            if (newSession.messages.length === 0) {
                const greetingMsg = {
                    role: 'bot',
                    content: 'Halo! 👋 Aku **SobatKulit AI**, asisten virtual spesialis perawatan kulit. Senang banget ketemu kamu! Ada yang bisa aku bantu soal skincare atau masalah kulit hari ini? ✨'
                };
                newSession.messages.push(greetingMsg);
                appendMessageToDom('bot', greetingMsg.content, false);
                saveSessions();
            }
        }, 300);
    }

    function deleteSession(e, id) {
        e.stopPropagation();
        if (!confirm('Hapus chat ini?')) return;
        sessions = sessions.filter(s => s.id !== id);
        if (activeSessionId === id) {
            activeSessionId = sessions.length > 0 ? sessions[0].id : null;
        }
        saveSessions();
        renderHistory();
        renderChat();
    }

    function renderHistory() {
        sessionsList.innerHTML = '';
        if (sessions.length === 0) {
            emptyHistory.style.display = 'block';
            sessionsList.appendChild(emptyHistory);
        } else {
            emptyHistory.style.display = 'none';
        }

        sessions.forEach(sess => {
            const isActive = sess.id === activeSessionId;
            const div = document.createElement('div');
            div.className = `group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-green-50 border border-green-100' : 'hover:bg-gray-100'}`;

            div.innerHTML = `
                <div class="flex items-center gap-3 overflow-hidden">
                    <div class="shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                        💬
                    </div>
                    <div class="sidebar-text truncate text-sm ${isActive ? 'font-medium text-gray-800' : 'text-gray-600'}">
                        ${sess.title}
                    </div>
                </div>
                <button class="delete-btn sidebar-text p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v2H9V4a1 1 0 011-1z"/>
                    </svg>
                </button>
            `;

            div.addEventListener('click', () => {
                activeSessionId = sess.id;
                saveSessions();
                renderHistory();
                renderChat();
                if (window.innerWidth < 768) toggleMobileMenu(false);
            });

            const delBtn = div.querySelector('.delete-btn');
            delBtn.addEventListener('click', (e) => deleteSession(e, sess.id));

            if (isSidebarCollapsed) {
                div.querySelectorAll('.sidebar-text').forEach(el => el.classList.add('hidden'));
            }
            sessionsList.appendChild(div);
        });
    }

    function renderChat() {
        messagesList.innerHTML = '';
        hideTypingIndicator();
        const currentSession = sessions.find(s => s.id === activeSessionId);

        if (!currentSession || currentSession.messages.length === 0) {
            welcomeScreen.style.display = 'flex';
            messagesContainer.style.display = 'none';
        } else {
            welcomeScreen.style.display = 'none';
            messagesContainer.style.display = 'flex';

            currentSession.messages.forEach(msg => {
                appendMessageToDom(msg.role, msg.content, false);
            });
            scrollToBottom();
        }
    }

    function appendMessageToDom(role, content, animate = true) {
        const wrapper = document.createElement('div');
        wrapper.className = `flex w-full ${role === 'user' ? 'justify-end' : 'justify-start'} ${animate ? 'msg-anim' : ''}`;

        const bubble = document.createElement('div');
        const baseClass = "max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm";
        const userClass = "bg-primary text-white rounded-br-none";
        const botClass = "bg-white border border-gray-100 text-gray-800 rounded-bl-none";

        bubble.className = `${baseClass} ${role === 'user' ? userClass : botClass}`;

        // Format teks untuk bot messages
        if (role === 'bot') {
            const formattedText = content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>');
            bubble.innerHTML = formattedText;
        } else {
            bubble.textContent = content;
        }

        wrapper.appendChild(bubble);
        messagesList.appendChild(wrapper);
        messagesContainer.style.display = 'flex';
        welcomeScreen.style.display = 'none';
        scrollToBottom();
    }

    function showTypingIndicator() {
        if (!typingIndicator) return;
        typingIndicator.classList.remove('hidden');
        scrollToBottom();
    }

    function hideTypingIndicator() {
        if (!typingIndicator) return;
        typingIndicator.classList.add('hidden');
    }

    function scrollToBottom() {
        setTimeout(() => {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 100);
    }

    async function handleSend() {
        if (isProcessing) return;

        const text = userInput.value.trim();
        if (!text) {
            alert('Silakan ketik pesan terlebih dahulu.');
            return;
        }

        // Ensure session exists
        if (!activeSessionId) {
            createSession();
        }

        let currentSession = sessions.find(s => s.id === activeSessionId);
        if (!currentSession) {
            createSession();
            currentSession = sessions.find(s => s.id === activeSessionId);
        }

        // Update title if first message (excluding auto-greeting)
        if (currentSession.messages.length === 0 ||
            (currentSession.messages.length === 1 && currentSession.messages[0].role === 'bot')) {
            currentSession.title = text.length > 30 ? text.substring(0, 30) + '...' : text;
            renderHistory();
        }

        // User Msg
        const userMsg = { role: 'user', content: text, ts: Date.now() };
        currentSession.messages.push(userMsg);
        appendMessageToDom('user', text);

        userInput.value = '';
        userInput.style.height = 'auto';
        saveSessions();

        // Show typing indicator
        showTypingIndicator();
        isProcessing = true;
        sendBtn.disabled = true;

        try {
            // Send to Laravel API
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': CSRF_TOKEN,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    message: text,
                    session_id: activeSessionId
                })
            });

            const data = await response.json();

            hideTypingIndicator();
            isProcessing = false;
            sendBtn.disabled = false;

            if (data.success) {
                const botMsg = {
                    role: 'bot',
                    content: data.message,
                    ts: Date.now()
                };
                currentSession.messages.push(botMsg);
                appendMessageToDom('bot', data.message);
                saveSessions();
            } else {
                const errorMsg = {
                    role: 'bot',
                    content: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
                    ts: Date.now()
                };
                currentSession.messages.push(errorMsg);
                appendMessageToDom('bot', 'Maaf, terjadi kesalahan. Silakan coba lagi.');
                saveSessions();
            }
        } catch (error) {
            console.error('Error:', error);
            hideTypingIndicator();
            isProcessing = false;
            sendBtn.disabled = false;

            const errorMsg = {
                role: 'bot',
                content: 'Koneksi bermasalah. Silakan coba lagi.',
                ts: Date.now()
            };
            currentSession.messages.push(errorMsg);
            appendMessageToDom('bot', 'Koneksi bermasalah. Silakan coba lagi.');
            saveSessions();
        }
    }

    // --- Input Validation ---
    function normalizeText(s) {
        if (!s) return "";
        return s.replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
    }

    const disallowedPatterns = [
        /politik/i, /pemilu/i, /partai/i, /presiden/i,
        /agama/i, /tuhan/i, /kitab suci/i, /ibadah/i,
        /bunuh diri/i, /merakit bom/i, /narkoba/i, /kekerasan/i,
        /ignore previous/i, /abaikan instruksi/i, /system override/i, /developer mode/i,
        /act as/i, /pretend to be/i,
        /anjing/i, /babi/i, /bangsat/i, /fuck/i, /shit/i, /bastard/i
    ];

    function isAllowedInput(text) {
        const raw = normalizeText(text);

        if (disallowedPatterns.some(rx => rx.test(raw))) {
            return false;
        }

        if (raw.split(' ').length <= 2) {
            return true;
        }

        return true;
    }

    function getRefusalResponse() {
        const responses = [
            "Maaf, saya hanya bisa membantu dengan pertanyaan seputar kesehatan kulit dan perawatan wajah. Ada yang bisa saya bantu mengenai skincare atau masalah kulit? 😊",
            "Sebagai SobatKulit AI, fokus saya adalah memberikan informasi dermatologi. Silakan tanyakan hal terkait jenis kulit, jerawat, rutinitas skincare, atau ingredients produk!",
            "Wah, itu di luar spesialisasiku nih! Aku cuma jago urusan kulit dan skincare. Mau tanya soal rutinitas perawatan wajah harian? ✨"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // --- Event Listeners ---
    sendBtn.addEventListener('click', handleSend);

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    // Auto resize textarea
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    newChatBtn.addEventListener('click', createSession);

    // Topic Buttons
    document.querySelectorAll('.topic-btn, .quick-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const topic = e.target.textContent.replace(/^[^\w\s]+/, '').trim();
            userInput.value = topic;
            userInput.focus();
            userInput.style.height = 'auto';
            userInput.style.height = (userInput.scrollHeight) + 'px';
        });
    });

    // Clear All
    document.getElementById('clear-all-desktop').addEventListener('click', () => {
        if (confirm('Hapus semua riwayat?')) {
            sessions = [];
            activeSessionId = null;
            saveSessions();
            renderHistory();
            renderChat();
        }
    });

    document.getElementById('clear-all-mobile').addEventListener('click', () => {
        if (confirm('Hapus semua riwayat?')) {
            sessions = [];
            activeSessionId = null;
            saveSessions();
            renderHistory();
            renderChat();
            toggleMobileMenu(false);
        }
    });
// Di bagian atas file, setelah deklarasi variabel
const HISTORY_API_ENDPOINT = '/chat/history';

// Tambahkan fungsi untuk mengirim context ke API
async function sendWithContext(message, sessionId, recentMessages = []) {
    // Siapkan history dalam format yang sesuai
    const formattedHistory = recentMessages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        content: msg.content
    }));

    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': CSRF_TOKEN,
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            message: message,
            session_id: sessionId,
            // Kirim context terbatas (4 pesan terakhir = 2 pasang)
            context: formattedHistory.slice(-4)
        })
    });

    return response;
}

// Perbarui fungsi handleSend
async function handleSend() {
    if (isProcessing) return;

    const text = userInput.value.trim();
    if (!text) {
        alert('Silakan ketik pesan terlebih dahulu.');
        return;
    }

    // Ensure session exists
    if (!activeSessionId) {
        createSession();
    }

    let currentSession = sessions.find(s => s.id === activeSessionId);
    if (!currentSession) {
        createSession();
        currentSession = sessions.find(s => s.id === activeSessionId);
    }

    // Update title if first message (excluding auto-greeting)
    if (currentSession.messages.length === 0 ||
        (currentSession.messages.length === 1 && currentSession.messages[0].role === 'bot')) {
        currentSession.title = text.length > 30 ? text.substring(0, 30) + '...' : text;
        renderHistory();
    }

    // User Msg
    const userMsg = { role: 'user', content: text, ts: Date.now() };
    currentSession.messages.push(userMsg);
    appendMessageToDom('user', text);

    userInput.value = '';
    userInput.style.height = 'auto';
    saveSessions();

    // Show typing indicator
    showTypingIndicator();
    isProcessing = true;
    sendBtn.disabled = true;

    try {
        // Ambil beberapa pesan terakhir untuk context (maksimal 4 pesan = 2 pasang)
        const recentMessages = currentSession.messages.slice(-4);

        // Kirim dengan context
        const response = await sendWithContext(text, activeSessionId, recentMessages);
        const data = await response.json();

        hideTypingIndicator();
        isProcessing = false;
        sendBtn.disabled = false;

        if (data.success) {
            const botMsg = {
                role: 'bot',
                content: data.message,
                ts: Date.now()
            };
            currentSession.messages.push(botMsg);
            appendMessageToDom('bot', data.message);
            saveSessions();

            // Debug: log jika ada history count
            if (data.history_count) {
                console.log(`Bot mengingat ${data.history_count} pesan dalam percakapan ini`);
            }
        } else {
            const errorMsg = {
                role: 'bot',
                content: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
                ts: Date.now()
            };
            currentSession.messages.push(errorMsg);
            appendMessageToDom('bot', 'Maaf, terjadi kesalahan. Silakan coba lagi.');
            saveSessions();
        }
    } catch (error) {
        console.error('Error:', error);
        hideTypingIndicator();
        isProcessing = false;
        sendBtn.disabled = false;

        const errorMsg = {
            role: 'bot',
            content: 'Koneksi bermasalah. Silakan coba lagi.',
            ts: Date.now()
        };
        currentSession.messages.push(errorMsg);
        appendMessageToDom('bot', 'Koneksi bermasalah. Silakan coba lagi.');
        saveSessions();
    }
}

        // Fungsi untuk menguji memory
        function testMemory() {
            const testCases = [
                "Jerawat saya parah banget",
                "Apa yang harus saya lakukan?",
                "Tadi kamu bilang pakai salicylic acid?",
                "Kulit saya sensitif, gimana?"
            ];

            let index = 0;
            const interval = setInterval(() => {
                if (index < testCases.length) {
                    userInput.value = testCases[index];
                    handleSend();
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 3000);
        }

        // Tambahkan tombol test memory di development (opsional)
        if (process.env.NODE_ENV === 'development') {
            const testBtn = document.createElement('button');
            testBtn.textContent = 'Test Memory';
            testBtn.className = 'fixed bottom-20 right-4 bg-blue-500 text-white p-2 rounded';
            testBtn.onclick = testMemory;
            document.body.appendChild(testBtn);
        }

    // Initialize
    renderHistory();
    renderChat();

    // Auto-create first chat if no sessions
    if (sessions.length === 0) {
        createSession();
    }
});

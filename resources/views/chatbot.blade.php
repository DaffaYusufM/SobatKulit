<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>SobatKulit — ChatBot</title>
  @vite(['resources/css/app.css', 'resources/js/app.js'])

  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

  <style>
    body { font-family: "Poppins", sans-serif; }

    /* Custom Scrollbar for Chat Area */
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 20px; }

    /* Animation */
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .msg-anim { animation: slideIn 0.3s ease-out forwards; }

    /* Hide scrollbar for topic buttons wrapper but allow scroll */
    .hide-scroll::-webkit-scrollbar { display: none; }
    .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }

    /* Typing indicator animation */
    @keyframes typing-bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-6px); }
    }
  </style>

  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#337743',
            primaryHover: '#2a6337',
          }
        }
      }
    }
  </script>
</head>
<body class="bg-gray-50 h-dvh w-full overflow-hidden flex text-gray-800">

  <div id="mobile-overlay" class="fixed inset-0 bg-black/50 z-20 hidden md:hidden transition-opacity"></div>

  <aside id="sidebar" class="fixed inset-y-0 left-0 z-30 bg-white border-r border-gray-200 w-64 transform -translate-x-full transition-all duration-300 md:relative md:translate-x-0 md:flex md:flex-col shrink-0">

    <div class="h-16 flex items-center justify-between px-4 border-b border-gray-100">
      <div class="flex items-center gap-3 overflow-hidden whitespace-nowrap">
        <div class="w-8 h-8 min-w-[2rem] bg-primary rounded-lg flex items-center justify-center text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </div>
        <div class="sidebar-text opacity-100 transition-opacity duration-200">
          <h1 class="font-bold text-lg tracking-tight">Riwayat</h1>
        </div>
      </div>

      <button id="close-sidebar-mobile" class="md:hidden p-1 rounded hover:bg-gray-100">
        <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>

    <div class="p-4">
      <button id="new-chat-btn" class="w-full flex items-center gap-3 bg-primary hover:bg-primaryHover text-white p-3 rounded-xl transition-all shadow-sm group overflow-hidden whitespace-nowrap">
        <span class="w-5 h-5 flex items-center justify-center">+</span>
        <span class="sidebar-text font-medium text-sm group-hover:pl-1 transition-all">Chat Baru</span>
      </button>
    </div>

    <div class="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-1" id="sessions-list">
      <div id="empty-history" class="text-center text-xs text-gray-400 mt-10 hidden sidebar-text">Belum ada riwayat</div>
    </div>

    <div class="p-4 border-t border-gray-100 hidden md:flex items-center justify-between">
      <button id="toggle-sidebar-desktop" class="p-2 rounded-lg hover:bg-gray-100 text-gray-500 w-full flex justify-center" title="Collapse Sidebar">
        <svg id="collapse-icon" class="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/></svg>
      </button>
    </div>

    <div class="p-4 border-t border-gray-100 md:hidden">
      <button id="clear-all-mobile" class="text-red-500 text-sm w-full text-left">Hapus Semua Riwayat</button>
    </div>
  </aside>

  <main class="flex-1 flex flex-col h-full min-w-0 relative bg-white md:bg-gray-50 transition-all duration-300">

    <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shrink-0 z-10">
      <div class="flex items-center gap-3">
        <button id="open-sidebar-mobile" class="md:hidden p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
        </button>

        <div class="flex flex-col">
            <a href="{{ url('/') }}">
                <h2 class="text-lg font-bold text-gray-800 leading-tight">SobatKulit</h2>
            </a>
          <span class="text-[10px] text-green-600 font-medium flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
          </span>
        </div>
      </div>

      <button id="clear-all-desktop" class="hidden md:block text-xs text-red-500 hover:text-red-700 font-medium px-3 py-1 rounded hover:bg-red-50 transition-colors">
        Hapus Riwayat
      </button>
    </header>

    <div id="chat-container" class="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 scroll-smooth">
      <div class="max-w-3xl mx-auto flex flex-col gap-6 min-h-full">

        <!-- Welcome Screen -->
        <div id="welcome-screen" class="flex-1 flex flex-col items-center justify-center text-center py-10">
          <div class="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Halo, Sobat Kulit! 👋</h2>
          <p class="text-gray-500 max-w-md mb-8">Saya asisten AI siap membantumu menjaga kesehatan kulit. Tanyakan apa saja atau pilih topik di bawah.</p>

          <div class="flex flex-wrap justify-center gap-2 max-w-lg">
            <button class="topic-btn px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors shadow-sm">💧 Kulit Kering</button>
            <button class="topic-btn px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors shadow-sm">☀️ Sunscreen Terbaik</button>
            <button class="topic-btn px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors shadow-sm">🌋 Jerawat Hormonal</button>
            <button class="topic-btn px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors shadow-sm">🧴 Urutan Skincare</button>
          </div>
        </div>

        <!-- Messages Container -->
        <div id="messages-container" class="flex flex-col gap-4 pb-2">
          <!-- Messages will be inserted here -->
          <div id="messages-list" class="flex flex-col gap-4"></div>

          <!-- Typing Indicator -->
          <div id="typing-indicator" class="hidden justify-start w-full msg-anim">
            <div class="max-w-[75%] px-4 py-3 bg-white border border-gray-100 rounded-2xl rounded-bl-none shadow-sm">
              <div class="flex space-x-1 items-center">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-typing-bounce" style="animation: typing-bounce 1.4s infinite"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-typing-bounce" style="animation: typing-bounce 1.4s infinite 0.2s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-typing-bounce" style="animation: typing-bounce 1.4s infinite 0.4s"></div>
                <span class="text-xs text-gray-500 ml-2">SobatKulit mengetik...</span>
              </div>
            </div>
          </div>
        </div>

        <div class="h-2"></div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="bg-white border-t border-gray-200 p-3 md:p-4 z-20 shrink-0">
      <div class="max-w-3xl mx-auto w-full">
        <div class="flex gap-2 overflow-x-auto hide-scroll mb-3 pb-1" id="quick-suggestions">
          <button class="quick-btn shrink-0 text-xs px-3 py-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">✨ Tips Glowing</button>
          <button class="quick-btn shrink-0 text-xs px-3 py-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">🌚 Mata Panda</button>
          <button class="quick-btn shrink-0 text-xs px-3 py-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">🧼 Double Cleansing</button>
          <button class="quick-btn shrink-0 text-xs px-3 py-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">🌿 Skincare Alami</button>
        </div>
        <div class="relative flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-green-100 focus-within:border-primary transition-all shadow-sm">
          <textarea id="user-input" rows="1" class="w-full bg-transparent border-0 focus:ring-0 resize-none p-2 max-h-32 text-gray-800 placeholder-gray-400 custom-scrollbar" placeholder="Ketik pertanyaanmu..."></textarea>

          <button id="send-btn" class="p-2 bg-primary text-white rounded-xl hover:bg-primaryHover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 mb-0.5">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div class="text-center mt-2 text-[10px] text-gray-400">SobatKulit mungkin membuat kesalahan. Selalu konsultasikan dengan dokter.</div>
      </div>
    </div>
  </main>

  <script src="{{ asset('js/chatbot.js') }}"></script>
</body>
</html>

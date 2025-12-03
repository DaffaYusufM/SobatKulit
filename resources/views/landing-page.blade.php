@extends('layouts.app')

@section('content')
    <section aria-labelledby="hero-title" class="relative
    before:content-[''] before:absolute before:w-40 before:h-40
        before:bg-[rgba(60,142,75,0.6)] before:blur-[80px] before:rounded-full
        before:left-[-210px] before:top-[260px]

        after:content-[''] after:absolute after:w-40 after:h-40
        after:bg-[rgba(60,142,75,0.6)] after:blur-[80px] after:rounded-full
        after:right-[-190px] after:top-[50px]

        pb-[30vw] md:pb-[10vw]">

    <!-- Container -->
    <div class="mx-auto mt-0 md:mt-14 mb-20 px-6 sm:px-10 md:px-12 lg:px-36 max-w-7xl">
        <!-- Text header -->
        <div class="text-header flex flex-col items-center text-center gap-5 mx-auto">
        <h1 id="hero-title"
            class="font-extrabold leading-tight text-[1.9rem] md:text-[2.8125rem] text-tertiary m-0">
            Mulai Kenali Kebutuhan Kulitmu untuk Meningkatkan Kesehatan Kulit!
        </h1>

        <p class="text-[0.8rem] md:text-[1rem] font-medium text-primary leading-snug m-0 max-w-196">
            Yuk, ngobrol santai dengan SobatKulit. Kami bantu cari tahu kondisi kulitmu dan berikan jawaban
            berdasarkan referensi ahli untuk mendukung kesehatan kulitmu.
        </p>

        <!-- Button mulai -->
        <a href="{{ route('chatbot') }}"
            class="inline-flex items-center gap-2.5 py-2.75 px-5 bg-secondary text-text
                    rounded-full font-bold text-[1rem] md:text-[1.1rem] shadow-lg transition-colors duration-300
                    hover:bg-[#f8bd1d]">
            <img src="{{ asset('assets/images/logo/logo-gemini.png') }}" alt="Logo Gemini AI" aria-hidden="true"
                class="w-8 h-8 object-contain">
            <span>Mulai Kenali Kulitmu</span>
        </a>
        </div>

        <!-- Jarvis images -->
        <div class="jarvis-header flex flex-row items-center justify-center gap-10 md:flex-row md:gap-50 mt-8">
        <img src="{{ asset('assets/images/jarvis-2.png') }}" alt="Ilustrasi karakter Jarvis versi 2"
            class="w-40 md:w-60 h-auto object-contain animate-float">
        <img src="{{ asset('assets/images/jarvis-1.png') }}" alt="Ilustrasi karakter Jarvis versi 1"
            class="w-40 md:w-60 h-auto object-contain animate-float">
        </div>
    </div>

    <!-- Full-bleed rumput (left & right) -->
    <div class="rumput-wrapper w-full md:w-screen absolute left-1/2 -translate-x-1/2 flex justify-between items-end pointer-events-none px-0 -mt-[18vw] md:-mt-[18vw] ">
        <img src="{{ asset('assets/images/Rumput-1.png') }}" alt="Dekorasi rumput di sisi kiri"
            class="rumput h-24 md:h-71 w-auto max-w-none object-cover">
        <img src="{{ asset('assets/images/Rumput-2.png') }}" alt="Dekorasi rumput di sisi kanan"
            class="rumput h-24 md:h-71 w-auto max-w-none object-cover">
    </div>
    </section>
    {{-- section 2 start --}}
    <section class="section-2" id="about" aria-labelledby="about-title">
        <div class="mx-auto my-20 md:my-28 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
            <h2 id="about-title" class="font-bold text-3xl md:text-4xl text-tertiary text-center mb-12 md:mb-20">
                Kenapa Harus SobatKulit?
            </h2>

            <div class="flex flex-col lg:flex-row items-start gap-8 md:gap-10 lg:gap-12">
                <!-- Gambar Ilustrasi -->
                <figure class="about-figure w-full lg:w-1/2">
                    <img
                        src="{{ asset('assets/images/About-SobatKulit.png') }}"
                        alt="Ilustrasi tentang platform SobatKulit"
                        class="w-full h-auto max-w-[550px] mx-auto object-cover rounded-lg"
                        loading="lazy"
                    >
                </figure>

                <!-- Konten Teks dan Fitur -->
                <div class="about-text w-full lg:w-1/2 space-y-6 md:space-y-3">
                    <p class="text-base md:text-lg text-gray-800 leading-relaxed text-justify">
                        SobatKulit hadir sebagai teman konsultasi berbasis AI yang membantu mengenali
                        jenis kulitmu sebagai langkah awal perawatan. Jawaban yang diberikan didukung
                        oleh referensi ahli dermatologi dan jurnal terpercaya.
                    </p>

                    <!-- Fitur 1 -->
                    <article class="feature verify-teks flex items-start gap-2 p-2 bg-gray-50 rounded-lg shadow-sm">
                        <div class="shrink-0">
                            <img
                                src="{{ asset('assets/images/Verify-Sobat.png') }}"
                                alt="Ikon verifikasi data dermatologi"
                                class="w-10 h-10 md:w-12 md:h-12 object-contain"
                            >
                        </div>
                        <div class="feature-text flex-1">
                            <h3 class="feature-title font-bold text-lg md:text-base text-gray-900 mb-2">
                                Didukung Data Dermatologi
                            </h3>
                            <p class="feature-desc text-gray-700 leading-relaxed md:text-sm">
                                Jawaban dihasilkan dari model AI yang dilatih menggunakan referensi ahli
                                dermatologi serta jurnal ilmiah terpercaya.
                            </p>
                        </div>
                    </article>

                    <!-- Fitur 2 -->
                    <article class="feature smart-personalize flex items-start gap-2 p-2 bg-gray-50 rounded-lg shadow-sm">
                        <div class="shrink-0">
                            <img
                                src="{{ asset('assets/images/People-Sobat.png') }}"
                                alt="Ikon personalisasi cerdas"
                                class="w-10 h-10 md:w-12 md:h-12 object-contain"
                            >
                        </div>
                        <div class="feature-text flex-1">
                            <h3 class="feature-title font-bold text-lg md:text-base text-gray-900 mb-2">
                                Smart Personalized
                            </h3>
                            <p class="feature-desc text-gray-700 leading-relaxed md:text-sm">
                                Setiap jawaban disesuaikan dengan kondisi dan kebutuhan kulitmu berdasarkan
                                informasi yang kamu berikan.
                            </p>
                        </div>
                    </article>

                    <!-- Fitur 3 -->
                    <article class="feature privasi-teks flex items-start gap-2 p-2 bg-gray-50 rounded-lg shadow-sm">
                        <div class="shrink-0">
                            <img
                                src="{{ asset('assets/images/Security-Sobat.png') }}"
                                alt="Ikon keamanan dan privasi"
                                class="w-10 h-10 md:w-12 md:h-12 object-contain"
                            >
                        </div>
                        <div class="feature-text flex-1">
                            <h3 class="feature-title font-bold text-lg md:text-base text-gray-900 mb-2">
                                Privasi Terjaga
                            </h3>
                            <p class="feature-desc text-gray-700 leading-relaxed md:text-sm">
                                SobatKulit tidak menyimpan riwayat percakapan, sehingga semua konsultasi
                                tetap aman dan bersifat pribadi.
                            </p>
                        </div>
                    </article>

                    <!-- Catatan -->
                    <p class="note text-xs md:text-sm text-gray-500 font-semibold italic mt-6 md:mt-8">
                        *SobatKulit tidak memberikan diagnosis. Untuk kasus yang memerlukan penanganan
                        lanjutan, disarankan berkonsultasi ke profesional.
                    </p>
                </div>
            </div>
        </div>
    </section>
<!-- Section 3: Ambil Langkahmu! (disesuaikan agar konsisten dengan Section 2) -->
<section class="section-3" id="benefit" aria-labelledby="benefit-title">
  <div class="mx-auto my-20 md:my-28 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
    <!-- Title -->
    <h2 id="benefit-title" class="font-bold text-3xl md:text-4xl text-tertiary text-center mb-12 md:mb-20">
      Ambil Langkahmu!
    </h2>

    <!-- Container: text + figure (sama layout & spacing seperti section 2) -->
    <div class="flex flex-col md:flex-row items-start gap-10">
      <!-- Text -->
      <div class="benefit-text flex-1">
        <h3 class="benefit-header text-[24px] font-bold mb-4">
          Setiap Orang Berhak Mendapatkan Kulit Sehat dan Terawat!
        </h3>

        <p class="text-base leading-[1.3] mb-4 text-justify text-text">
          Dapatkan pengalaman konsultasi kulit yang personal dan informatif. SobatKulit membantu kamu memahami kondisi dan kebutuhan kulit, memberikan informasi perawatan yang relevan, dan mendukungmu mengambil keputusan yang tepat untuk menjaga kesehatan kulit.
        </p>

        <p class="text-base leading-[1.3] mb-4 text-justify text-text">
          Mulai perjalananmu menuju kulit yang lebih sehat dan terawat bersama chatbot interaktif SobatKulit.
        </p>

        <a href="{{ route('chatbot') }}"
           aria-label="Mulai perjalanan kesehatan kulit"
           class="inline-flex items-center gap-2.5 py-3 px-5 rounded-full bg-[#f8bd1d] hover:bg-[#e6ab0c] text-text font-bold text-base mt-5 shadow-sm transition-colors duration-300">
          <img src="{{ asset('assets/images/logo/logo-gemini.png') }}" alt="" class="w-6 h-auto" aria-hidden="true">
          <span>Mulai Kenali Kulitmu</span>
        </a>
      </div>

      <!-- Figure -->
      <figure class="benefit-figure shrink-0">
        <img src="{{ asset('assets/images/Benefit-sobat.png') }}"
             alt="Ilustrasi manfaat menggunakan SobatKulit"
             class="w-full md:w-[550px] md:h-[478px] h-auto object-cover rounded-md">
      </figure>
    </div>
  </div>
</section>
<!-- Section 4: FAQ -->
<section class="section-4" id="faq" aria-labelledby="faq-page">
  <div class="mx-auto my-20 md:my-28 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">

    <!-- Title -->
    <h2 id="faq-title"
        class="font-bold text-3xl md:text-4xl text-tertiary text-center mb-12 md:mb-20">
      Pertanyaan yang Sering Diajukan
    </h2>

    <!-- FAQ List -->
    <div class="space-y-4">

      <!-- Item -->
      <details class="group border border-tertiary rounded-xl p-4 bg-white shadow-sm">
        <summary class="cursor-pointer text-lg font-semibold text-text list-none flex justify-between items-center">
          Apa itu SobatKulit?
          <span class="transition-transform group-open:rotate-180">▼</span>
        </summary>

        <div class="mt-3 text-gray-700 leading-relaxed">
          <p>
            SobatKulit adalah platform konsultasi kulit berbasis AI yang membantu mengenali kondisi
            dan kebutuhan kulit serta memberikan saran perawatan berdasarkan referensi ahli.
          </p>
        </div>
      </details>

      <!-- Item -->
      <details class="group border border-primary rounded-xl p-4 bg-white shadow-sm">
        <summary class="cursor-pointer text-lg font-semibold text-text list-none flex justify-between items-center">
          Apakah informasi dari SobatKulit akurat dan bisa dipercaya?
          <span class="transition-transform group-open:rotate-180">▼</span>
        </summary>

        <div class="mt-3 text-gray-700 leading-relaxed">
          <p>
            Ya. Data dan referensi yang digunakan telah diverifikasi oleh dokter dermatologis dan sumber ilmiah terpercaya.
          </p>
        </div>
      </details>

      <!-- Item -->
      <details class="group border border-primary rounded-xl p-4 bg-white shadow-sm">
        <summary class="cursor-pointer text-lg font-semibold text-text list-none flex justify-between items-center">
          Bisakah SobatKulit menggantikan kunjungan ke dokter kulit?
          <span class="transition-transform group-open:rotate-180">▼</span>
        </summary>

        <div class="mt-3 text-gray-700 leading-relaxed">
          <p>
            Tidak. SobatKulit memberikan saran dan informasi pendidikan; untuk diagnosis atau perawatan lanjutan, silakan kunjungi profesional kesehatan.
          </p>
        </div>
      </details>

      <!-- Item -->
      <details class="group border border-primary rounded-xl p-4 bg-white shadow-sm">
        <summary class="cursor-pointer text-lg font-semibold text-text list-none flex justify-between items-center">
          Apakah data yang saya berikan ke SobatKulit aman dan rahasia?
          <span class="transition-transform group-open:rotate-180">▼</span>
        </summary>

        <div class="mt-3 text-gray-700 leading-relaxed">
          <p>
            Ya. SobatKulit dirancang untuk menjaga privasi: data pengguna tidak disimpan untuk publikasi,
            dan komunikasi bersifat privat.
          </p>
        </div>
      </details>

      <!-- Item -->
      <details class="group border border-primary rounded-xl p-4 bg-white shadow-sm">
        <summary class="cursor-pointer text-lg font-semibold text-text list-none flex justify-between items-center">
          Apakah SobatKulit berbayar?
          <span class="transition-transform group-open:rotate-180">▼</span>
        </summary>

        <div class="mt-3 text-gray-700 leading-relaxed">
          <p>
            Tersedia layanan gratis dan fitur berbayar. Untuk detail paket dan manfaatnya,
            silakan lihat halaman pricing atau hubungi kami di kontak.
          </p>
        </div>
      </details>

    </div>
  </div>
</section>

@endsection

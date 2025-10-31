console.log("GameStore script loaded successfully.");

// --- DATABASE GAME ---
const gamesData = {
    'free-fire-id': {
        name: 'Free Fire (Indonesia)',
        apiEndpoint: '/api/freefireTopup',
        image: 'https://placehold.co/200x280?text=Free+Fire',
        id_placeholder: 'Masukkan User ID Anda',
        id_helper: 'Untuk menemukan ID Anda, klik pada avatar karakter Anda.',
        items: [
            { name: '70 Diamonds', price: 'Rp 10.000' },
            { name: '140 Diamonds', price: 'Rp 20.000' },
            { name: '355 Diamonds', price: 'Rp 50.000' },
            { name: '720 Diamonds', price: 'Rp 100.000' },
        ]
    },
    'free-fire-my': {
        name: 'Free Fire (Malaysia)',
        apiEndpoint: '/api/freefireTopup',
        image: 'https://placehold.co/200x280?text=Free+Fire',
        id_placeholder: 'Masukkan User ID Anda',
        id_helper: 'Untuk menemukan ID Anda, klik pada avatar karakter Anda.',
        items: [
            { name: '70 Diamonds', price: 'MYR 5' },
            { name: '140 Diamonds', price: 'MYR 10' },
            { name: '355 Diamonds', price: 'MYR 25' },
            { name: '720 Diamonds', price: 'MYR 50' },
        ]
    },
    'free-fire-gl': {
        name: 'Free Fire (Global)',
        apiEndpoint: '/api/freefireTopup',
        image: 'https://placehold.co/200x280?text=Free+Fire',
        id_placeholder: 'Enter Your User ID',
        id_helper: 'To find your ID, click on your character avatar.',
        items: [
            { name: '100 Diamonds', price: '$1' },
            { name: '520 Diamonds', price: '$5' },
            { name: '1060 Diamonds', price: '$10' },
            { name: '2180 Diamonds', price: '$20' },
        ]
    },
    'mobile-legends': {
        name: 'Mobile Legends',
        apiEndpoint: '/api/mobileLegendsTopup',
        image: 'https://placehold.co/200x280?text=Mobile+Legends',
        id_placeholder: 'Masukkan User ID (Server)',
        id_helper: 'Contoh: 12345678 (2109).',
        items: [
            { name: '86 Diamonds', price: 'Rp 25.000' },
            { name: '172 Diamonds', price: 'Rp 50.000' },
        ]
    },
    'pubg-mobile': {
        name: 'PUBG Mobile',
        apiEndpoint: '/api/pubgMobileTopup',
        image: 'https://placehold.co/200x280?text=PUBG+Mobile',
        id_placeholder: 'Masukkan ID Karakter Anda',
        id_helper: 'Temukan ID Karakter Anda di profil dalam game.',
        items: [
            { name: '60 UC', price: 'Rp 15.000' },
            { name: '325 UC', price: 'Rp 75.000' },
        ]
    },
    'valorant-na': {
        name: 'Valorant (North America)',
        apiEndpoint: '/api/valorantTopup',
        image: 'https://placehold.co/200x280?text=Valorant',
        id_placeholder: 'Enter Riot ID',
        id_helper: 'Example: PlayerName#1234',
        items: [
            { name: '100 VP', price: '$1' },
            { name: '280 VP', price: '$3' },
            { name: '1375 VP', price: '$14' },
        ]
    },
    'valorant-eu': {
        name: 'Valorant (Europe)',
        apiEndpoint: '/api/valorantTopup',
        image: 'https://placehold.co/200x280?text=Valorant',
        id_placeholder: 'Enter Riot ID',
        id_helper: 'Example: PlayerName#1234',
        items: [
            { name: '100 VP', price: '€1' },
            { name: '280 VP', price: '€3' },
            { name: '1375 VP', price: '€14' },
        ]
    },
    'valorant-asia': {
        name: 'Valorant (Asia)',
        apiEndpoint: '/api/valorantTopup',
        image: 'https://placehold.co/200x280?text=Valorant',
        id_placeholder: 'Enter Riot ID',
        id_helper: 'Example: PlayerName#1234',
        items: [
            { name: '100 VP', price: '¥100' },
            { name: '280 VP', price: '¥300' },
            { name: '1375 VP', price: '¥1400' },
        ]
    },
    'genshin-impact-asia': {
        name: 'Genshin Impact (Asia)',
        apiEndpoint: '/api/genshinImpactTopup',
        image: 'https://placehold.co/200x280?text=Genshin+Impact',
        id_placeholder: 'Enter UID',
        id_helper: 'Example: 123456789',
        items: [
            { name: '60 Genesis Crystals', price: '¥648' },
            { name: '300 Genesis Crystals', price: '¥3240' },
            { name: '980 Genesis Crystals', price: '¥6480' },
        ]
    },
    'genshin-impact-na': {
        name: 'Genshin Impact (North America)',
        apiEndpoint: '/api/genshinImpactTopup',
        image: 'https://placehold.co/200x280?text=Genshin+Impact',
        id_placeholder: 'Enter UID',
        id_helper: 'Example: 123456789',
        items: [
            { name: '60 Genesis Crystals', price: '$1' },
            { name: '300 Genesis Crystals', price: '$5' },
            { name: '980 Genesis Crystals', price: '$15' },
        ]
    },
    'genshin-impact-eu': {
        name: 'Genshin Impact (Europe)',
        apiEndpoint: '/api/genshinImpactTopup',
        image: 'https://placehold.co/200x280?text=Genshin+Impact',
        id_placeholder: 'Enter UID',
        id_helper: 'Example: 123456789',
        items: [
            { name: '60 Genesis Crystals', price: '€1' },
            { name: '300 Genesis Crystals', price: '€5' },
            { name: '980 Genesis Crystals', price: '€15' },
        ]
    },
    'codm-global': {
        name: 'Call of Duty: Mobile (Global)',
        apiEndpoint: '/api/codmTopup',
        image: 'https://placehold.co/200x280?text=CODM',
        id_placeholder: 'Enter Player ID',
        id_helper: 'Find your Player ID in game settings.',
        items: [
            { name: '120 CP', price: '$1' },
            { name: '1000 CP', price: '$8' },
            { name: '2400 CP', price: '$18' },
        ]
    },
    'apex-legends-na': {
        name: 'Apex Legends (North America)',
        apiEndpoint: '/api/apexLegendsTopup',
        image: 'https://placehold.co/200x280?text=Apex+Legends',
        id_placeholder: 'Enter Origin ID',
        id_helper: 'Example: PlayerName#1234',
        items: [
            { name: '100 Apex Coins', price: '$1' },
            { name: '500 Apex Coins', price: '$5' },
            { name: '1000 Apex Coins', price: '$10' },
        ]
    },
    'apex-legends-eu': {
        name: 'Apex Legends (Europe)',
        apiEndpoint: '/api/apexLegendsTopup',
        image: 'https://placehold.co/200x280?text=Apex+Legends',
        id_placeholder: 'Enter Origin ID',
        id_helper: 'Example: PlayerName#1234',
        items: [
            { name: '100 Apex Coins', price: '€1' },
            { name: '500 Apex Coins', price: '€5' },
            { name: '1000 Apex Coins', price: '€10' },
        ]
    },
    'apex-legends-asia': {
        name: 'Apex Legends (Asia)',
        apiEndpoint: '/api/apexLegendsTopup',
        image: 'https://placehold.co/200x280?text=Apex+Legends',
        id_placeholder: 'Enter Origin ID',
        id_helper: 'Example: PlayerName#1234',
        items: [
            { name: '100 Apex Coins', price: '¥100' },
            { name: '500 Apex Coins', price: '¥500' },
            { name: '1000 Apex Coins', price: '¥1000' },
        ]
    },
    'roblox-global': {
        name: 'Roblox (Global)',
        apiEndpoint: '/api/robloxTopup',
        image: 'https://placehold.co/200x280?text=Roblox',
        id_placeholder: 'Enter Roblox Username',
        id_helper: 'Example: CoolPlayer123',
        items: [
            { name: '80 Robux', price: '$1' },
            { name: '400 Robux', price: '$5' },
            { name: '800 Robux', price: '$10' },
        ]
    },
    'lol-na': {
        name: 'League of Legends (North America)',
        apiEndpoint: '/api/lolTopup',
        image: 'https://placehold.co/200x280?text=LoL',
        id_placeholder: 'Enter Summoner Name',
        id_helper: 'Example: PlayerName',
        items: [
            { name: '650 RP', price: '$5' },
            { name: '1380 RP', price: '$10' },
            { name: '2850 RP', price: '$20' },
        ]
    },
    'lol-eu': {
        name: 'League of Legends (Europe)',
        apiEndpoint: '/api/lolTopup',
        image: 'https://placehold.co/200x280?text=LoL',
        id_placeholder: 'Enter Summoner Name',
        id_helper: 'Example: PlayerName',
        items: [
            { name: '650 RP', price: '€5' },
            { name: '1380 RP', price: '€10' },
            { name: '2850 RP', price: '€20' },
        ]
    },
    'lol-asia': {
        name: 'League of Legends (Asia)',
        apiEndpoint: '/api/lolTopup',
        image: 'https://placehold.co/200x280?text=LoL',
        id_placeholder: 'Enter Summoner Name',
        id_helper: 'Example: PlayerName',
        items: [
            { name: '650 RP', price: '¥500' },
            { name: '1380 RP', price: '¥1000' },
            { name: '2850 RP', price: '¥2000' },
        ]
    }
};

// --- FUNGSI UNTUK HALAMAN TOPUP ---
function setupTopUpPage() {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get('game');
    const game = gamesData[gameId];

    if (!game) {
        const topupForm = document.querySelector('.topup-form');
        if(topupForm) {
            topupForm.innerHTML = '<h1>Game tidak ditemukan.</h1><p>Silakan kembali ke <a href="index.html">halaman utama</a>.</p>';
        }
        return;
    }

    document.title = `Top Up ${game.name} - GameStore`;
    document.getElementById('game-title').textContent = `Top Up ${game.name}`;
    document.getElementById('game-image').src = game.image;
    document.getElementById('game-image').alt = game.name;
    document.getElementById('user-id').placeholder = game.id_placeholder;
    document.querySelector('.input-helper').textContent = game.id_helper;

    const itemGrid = document.querySelector('.item-grid-topup');
    itemGrid.innerHTML = '';
    game.items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card-topup';
        itemCard.tabIndex = 0;
        itemCard.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-price">${item.price}</span>
        `;
        itemGrid.appendChild(itemCard);
    });

    addSelectionLogic('.item-card-topup');
    addSelectionLogic('.payment-card');
}

// --- FUNGSI UNTUK SELEKSI ITEM ---
function addSelectionLogic(selector) {
    const selectableItems = document.querySelectorAll(selector);
    selectableItems.forEach(item => {
        const handleSelection = (e) => {
            if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
            e.preventDefault();
            const currentGroup = e.currentTarget.closest('.item-grid-topup, .payment-grid');
            currentGroup.querySelectorAll(selector).forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
        };
        item.addEventListener('click', handleSelection);
        item.addEventListener('keydown', handleSelection);
    });
}

// --- FUNGSI UNTUK PROSES PEMBELIAN ---
async function handlePurchase() {
    const buyButton = document.querySelector('.buy-button');
    const originalButtonText = buyButton.textContent;

    const userId = document.getElementById('user-id').value;
    const selectedItemEl = document.querySelector('.item-card-topup.selected');
    const selectedPaymentEl = document.querySelector('.payment-card.selected');

    if (!userId || !selectedItemEl || !selectedPaymentEl) {
        alert('Harap lengkapi semua pilihan: ID Pengguna, Nominal Top Up, dan Metode Pembayaran.');
        return;
    }

    buyButton.disabled = true;
    buyButton.textContent = 'Memproses...';

    const itemName = selectedItemEl.querySelector('.item-name').textContent;
    const itemPrice = selectedItemEl.querySelector('.item-price').textContent;
    const paymentMethod = selectedPaymentEl.querySelector('img').alt;
    
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get('game');
    const game = gamesData[gameId];

    const orderData = {
        game: game.name,
        userId: userId,
        item: itemName,
        price: itemPrice,
        paymentMethod: paymentMethod
    };

    console.log('--- PANGGILAN API ---');
    console.log('Endpoint:', game.apiEndpoint);
    console.log('Metode: POST');
    console.log('Data yang dikirim:', JSON.stringify(orderData, null, 2));

    setTimeout(() => {
        const isSuccess = Math.random() > 0.1;

        if (isSuccess) {
            alert(`Pembelian ${itemName} untuk ${game.name} berhasil!\nTerima kasih telah menggunakan GameStore.`);
            document.getElementById('user-id').value = '';
            selectedItemEl.classList.remove('selected');
            selectedPaymentEl.classList.remove('selected');
        } else {
            alert('Maaf, terjadi kesalahan pada server. Silakan coba lagi nanti.');
        }

        buyButton.disabled = false;
        buyButton.textContent = originalButtonText;

        console.log('--- SELESAI ---');

    }, 2000);
}


// --- FUNGSI UNTUK MODAL PEMILIHAN WILAYAH ---
function setupRegionModal(cardId, modalId, closeBtnId) {
    const card = document.getElementById(cardId);
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeBtnId);

    if (card && modal && closeBtn) {
        card.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah link default
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
        });

        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 300);
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

// --- FUNGSI UNTUK SIDEBAR ---
function setupSidebar() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebar-close');

    if (sidebarToggle && sidebar && sidebarClose) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
        });

        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });

        sidebar.addEventListener('click', (e) => {
            if (e.target === sidebar) {
                sidebar.classList.remove('active');
            }
        });
    }
}

// --- FUNGSI UNTUK LOGIN DAN SIGNUP MODALS ---
function setupAuthModals() {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const sidebarLogin = document.getElementById('sidebar-login');
    const sidebarSignup = document.getElementById('sidebar-signup');

    const showLoginModal = () => {
        alert('Login modal would open here. Implement your login form.');
    };

    const showSignupModal = () => {
        alert('Sign up modal would open here. Implement your signup form.');
    };

    if (loginBtn) loginBtn.addEventListener('click', showLoginModal);
    if (signupBtn) signupBtn.addEventListener('click', showSignupModal);
    if (sidebarLogin) sidebarLogin.addEventListener('click', showLoginModal);
    if (sidebarSignup) sidebarSignup.addEventListener('click', showSignupModal);
}

// --- FUNGSI UNTUK PROMO MODAL ---
function setupPromoModal() {
    const redeemBtn = document.getElementById('redeem-voucher-btn');
    const sidebarRedeem = document.getElementById('sidebar-redeem');
    const modal = document.getElementById('promo-modal');
    const closeBtn = document.getElementById('promo-modal-close-btn');

    const showPromoModal = () => {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
    };

    const closePromoModal = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    };

    if (redeemBtn) redeemBtn.addEventListener('click', showPromoModal);
    if (sidebarRedeem) sidebarRedeem.addEventListener('click', showPromoModal);
    if (closeBtn) closeBtn.addEventListener('click', closePromoModal);
    if (modal) modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePromoModal();
        }
    });
}

// --- FUNGSI UNTUK PROMO CODE ---
function setupPromoCode() {
    const promoInput = document.getElementById('promo-code');
    const redeemBtn = document.getElementById('redeem-btn');

    if (promoInput && redeemBtn) {
        redeemBtn.addEventListener('click', () => {
            const promoCode = promoInput.value.trim().toUpperCase();

            if (!promoCode) {
                alert('Silakan masukkan kode promo terlebih dahulu.');
                return;
            }

            // Mock promo codes for demonstration
            const validCodes = {
                'WELCOME10': { discount: 10, type: 'percentage' },
                'TOPUP20': { discount: 20, type: 'percentage' },
                'BONUS50': { discount: 50000, type: 'fixed', currency: 'IDR' },
                'FREEFIRE': { discount: 15, type: 'percentage' },
                'MOBILELEGENDS': { discount: 25, type: 'percentage' }
            };

            if (validCodes[promoCode]) {
                const promo = validCodes[promoCode];
                let message = `Kode promo berhasil diredeem!\n\n`;

                if (promo.type === 'percentage') {
                    message += `Diskon: ${promo.discount}% untuk semua top-up`;
                } else {
                    message += `Bonus: ${promo.currency} ${promo.discount.toLocaleString()} untuk pembelian pertama`;
                }

                alert(message);
                promoInput.value = '';
            } else {
                alert('Kode promo tidak valid atau sudah kadaluarsa. Silakan coba kode lain.');
            }
        });

        // Allow Enter key to redeem
        promoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                redeemBtn.click();
            }
        });
    }
}

// --- CHAT WIDGET FUNCTIONALITY ---
function setupChatWidget() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatContainer = document.getElementById('chat-container');
    const chatClose = document.getElementById('chat-close');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input-field');
    const chatSend = document.getElementById('chat-send');

    let currentStep = 'initial';
    let userIssue = '';
    let userDetails = {};

    // Toggle chat widget
    chatToggle.addEventListener('click', () => {
        const isVisible = chatContainer.style.display !== 'none';
        chatContainer.style.display = isVisible ? 'none' : 'block';
    });

    // Close chat
    chatClose.addEventListener('click', () => {
        chatContainer.style.display = 'none';
        resetChat();
    });

    // Handle option buttons with event delegation
    chatMessages.addEventListener('click', (e) => {
        // Check if clicked element is an option button
        if (e.target && e.target.classList.contains('option-btn')) {
            e.preventDefault();
            e.stopPropagation();

            const option = e.target.getAttribute('data-option');
            const buttonText = e.target.textContent.trim();
            console.log('Button clicked:', option, buttonText); // Debug log
            handleOptionClick(option, buttonText);
        }
    });

    // Send message
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function handleOptionClick(option, buttonText) {
        addUserMessage(buttonText);

        switch (option) {
            case 'topup-issue':
                currentStep = 'topup-issue';
                userIssue = 'topup';
                showTopupIssueOptions();
                break;
            case 'payment-issue':
                currentStep = 'payment-issue';
                userIssue = 'payment';
                showPaymentIssueOptions();
                break;
            case 'account-issue':
                currentStep = 'account-issue';
                userIssue = 'account';
                showAccountIssueOptions();
                break;
            case 'other':
                currentStep = 'other';
                showOtherOptions();
                break;
            case 'diamonds-not-received':
                showDiamondsNotReceivedFlow();
                break;
            case 'refund-request':
                showRefundRequestFlow();
                break;
            case 'escalate-to-agent':
                escalateToAgent();
                break;
            case 'create-report':
                createReport();
                break;
            case 'solved':
                showSolvedMessage();
                break;
            case 'not-solved':
                showNotSolvedOptions();
                break;
        }
    }

    function showTopupIssueOptions() {
        const message = `
            <p>Maaf atas ketidaknyamanannya. Jenis masalah top up apa yang Anda alami?</p>
            <div class="message-options">
                <button class="option-btn" data-option="diamonds-not-received">Diamond tidak masuk</button>
                <button class="option-btn" data-option="refund-request">Minta refund</button>
                <button class="option-btn" data-option="escalate-to-agent">Hubungi Agent</button>
            </div>
        `;
        addBotMessage(message);
        showInputField(false);
    }

    function showPaymentIssueOptions() {
        const message = `
            <p>Untuk masalah pembayaran, silakan berikan detail berikut:</p>
            <p>- ID Transaksi</p>
            <p>- Metode pembayaran yang digunakan</p>
            <p>- Nominal pembayaran</p>
            <div class="message-options">
                <button class="option-btn" data-option="escalate-to-agent">Hubungi Agent</button>
            </div>
        `;
        addBotMessage(message);
        showInputField(true);
    }

    function showAccountIssueOptions() {
        const message = `
            <p>Untuk masalah akun, silakan berikan detail berikut:</p>
            <p>- Game yang dimainkan</p>
            <p>- ID Player/Game</p>
            <p>- Deskripsi masalah</p>
            <div class="message-options">
                <button class="option-btn" data-option="escalate-to-agent">Hubungi Agent</button>
            </div>
        `;
        addBotMessage(message);
        showInputField(true);
    }

    function showOtherOptions() {
        const message = `
            <p>Silakan jelaskan masalah Anda secara detail agar kami dapat membantu dengan lebih baik.</p>
            <div class="message-options">
                <button class="option-btn" data-option="escalate-to-agent">Hubungi Agent</button>
            </div>
        `;
        addBotMessage(message);
        showInputField(true);
    }

    function showDiamondsNotReceivedFlow() {
        const message = `
            <p>Untuk diamond yang tidak masuk, kami sarankan langkah berikut:</p>
            <p>1. Tunggu 5-10 menit (proses otomatis)</p>
            <p>2. Restart game Anda</p>
            <p>3. Periksa kembali ID yang dimasukkan</p>
            <p>4. Pastikan server game sesuai</p>
            <p>Apakah masalah sudah teratasi?</p>
            <div class="message-options">
                <button class="option-btn" data-option="solved">Sudah teratasi</button>
                <button class="option-btn" data-option="not-solved">Masih belum teratasi</button>
            </div>
        `;
        addBotMessage(message);
        showInputField(false);
    }

    function showRefundRequestFlow() {
        const message = `
            <p>Untuk permintaan refund, kami memerlukan:</p>
            <p>- ID Transaksi</p>
            <p>- Bukti pembayaran</p>
            <p>- Screenshot masalah</p>
            <p>Proses refund memakan waktu 1-3 hari kerja.</p>
            <div class="message-options">
                <button class="option-btn" data-option="create-report">Buat Laporan</button>
                <button class="option-btn" data-option="escalate-to-agent">Hubungi Agent</button>
            </div>
        `;
        addBotMessage(message);
        showInputField(true);
    }

    function showNotSolvedOptions() {
        const message = `
            <p>Maaf masalah belum teratasi. Mari kami bantu lebih lanjut:</p>
            <div class="message-options">
                <button class="option-btn" data-option="create-report">Buat Laporan Resmi</button>
                <button class="option-btn" data-option="escalate-to-agent">Chat dengan Agent</button>
            </div>
        `;
        addBotMessage(message);
        showInputField(false);
    }

    function escalateToAgent() {
        const message = `
            <p>Menghubungkan Anda dengan customer service agent...</p>
            <p>Agent kami akan segera merespons dalam 1-2 menit.</p>
            <p>Silakan tetap online.</p>
        `;
        addBotMessage(message);
        showInputField(true);
    }

    function createReport() {
        const message = `
            <p>Laporan Anda telah dibuat dengan nomor: #${Math.floor(Math.random() * 1000000)}</p>
            <p>Tim kami akan memproses dalam 24 jam.</p>
            <p>Terima kasih atas kesabaran Anda.</p>
        `;
        addBotMessage(message);
        showInputField(false);
    }

    function showSolvedMessage() {
        const message = `
            <p>Senang mendengar masalah sudah teratasi! 🎉</p>
            <p>Terima kasih telah menggunakan ArenaXStore.</p>
            <p>Apakah ada hal lain yang bisa kami bantu?</p>
            <div class="message-options">
                <button class="option-btn" data-option="other">Ya, ada pertanyaan lain</button>
            </div>
        `;
        addBotMessage(message);
        showInputField(false);
    }

    function addBotMessage(content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = content;
        chatMessages.appendChild(messageDiv);

        // Auto-scroll to bottom with smooth behavior
        setTimeout(() => {
            chatMessages.scrollTo({
                top: chatMessages.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    }

    function addUserMessage(content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `<p>${content}</p>`;
        chatMessages.appendChild(messageDiv);

        // Auto-scroll to bottom with smooth behavior
        setTimeout(() => {
            chatMessages.scrollTo({
                top: chatMessages.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addUserMessage(message);
            chatInput.value = '';

            // Simulate bot response
            setTimeout(() => {
                const response = `
                    <p>Terima kasih atas informasinya. Tim kami akan segera memproses.</p>
                    <p>Apakah ada informasi tambahan yang ingin Anda berikan?</p>
                `;
                addBotMessage(response);
            }, 1000);
        }
    }

    function showInputField(show) {
        const inputContainer = document.querySelector('.chat-input');
        inputContainer.style.display = show ? 'flex' : 'none';
    }

    function resetChat() {
        chatMessages.innerHTML = `
            <div class="message bot-message">
                <p>Hai! Saya AI Assistant ArenaXStore. Ada yang bisa saya bantu hari ini?</p>
                <div class="message-options">
                    <button class="option-btn" data-option="topup-issue">Masalah Top Up</button>
                    <button class="option-btn" data-option="payment-issue">Masalah Pembayaran</button>
                    <button class="option-btn" data-option="account-issue">Masalah Akun</button>
                    <button class="option-btn" data-option="other">Lainnya</button>
                </div>
            </div>
        `;
        currentStep = 'initial';
        userIssue = '';
        userDetails = {};
        showInputField(false);
    }
}

// --- MAIN EXECUTION ---
document.addEventListener('DOMContentLoaded', () => {
    // Setup chat widget
    setupChatWidget();

    // Setup sidebar
    setupSidebar();

    // Setup auth modals
    setupAuthModals();

    // Setup promo modal
    setupPromoModal();

    // Setup promo code functionality
    setupPromoCode();

    // Logika untuk halaman utama (index.html)
    if (document.getElementById('free-fire-card')) {
        setupRegionModal('free-fire-card', 'region-modal', 'modal-close-btn');
    }
    if (document.getElementById('mobile-legends-card')) {
        setupRegionModal('mobile-legends-card', 'mobile-legends-modal', 'ml-modal-close-btn');
    }
    if (document.getElementById('pubg-mobile-card')) {
        setupRegionModal('pubg-mobile-card', 'pubg-modal', 'pubg-modal-close-btn');
    }
    if (document.getElementById('valorant-card')) {
        setupRegionModal('valorant-card', 'valorant-modal', 'valorant-modal-close-btn');
    }
    if (document.getElementById('genshin-impact-card')) {
        setupRegionModal('genshin-impact-card', 'genshin-modal', 'genshin-modal-close-btn');
    }
    if (document.getElementById('codm-card')) {
        setupRegionModal('codm-card', 'codm-modal', 'codm-modal-close-btn');
    }
    if (document.getElementById('apex-legends-card')) {
        setupRegionModal('apex-legends-card', 'apex-modal', 'apex-modal-close-btn');
    }
    if (document.getElementById('roblox-card')) {
        setupRegionModal('roblox-card', 'roblox-modal', 'roblox-modal-close-btn');
    }
    if (document.getElementById('league-of-legends-card')) {
        setupRegionModal('league-of-legends-card', 'lol-modal', 'lol-modal-close-btn');
    }

    // Logika untuk halaman topup (topup.html)
    if (window.location.pathname.endsWith('topup.html')) {
        setupTopUpPage();
        const buyButton = document.querySelector('.buy-button');
        if (buyButton) {
            buyButton.addEventListener('click', handlePurchase);
        }
    }
});

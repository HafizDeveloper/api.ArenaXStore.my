// Topup Page JavaScript
let currentStep = 1;
let selectedPackage = null;
let selectedPayment = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeTopupPage();
    setupEventListeners();
});

function initializeTopupPage() {
    // Get game data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const game = urlParams.get('game');

    if (game) {
        updateGameInfo(game);
    }

    // Show first step
    showStep(1);
}

function updateGameInfo(game) {
    const gameData = {
        'free-fire': {
            title: 'Free Fire',
            image: 'https://placehold.co/200x280?text=Free+Fire'
        },
        'mobile-legends': {
            title: 'Mobile Legends',
            image: 'https://placehold.co/200x280?text=Mobile+Legends'
        },
        'pubg-mobile': {
            title: 'PUBG Mobile',
            image: 'https://placehold.co/200x280?text=PUBG+Mobile'
        },
        'genshin-impact': {
            title: 'Genshin Impact',
            image: 'https://placehold.co/200x280?text=Genshin+Impact'
        },
        'valorant': {
            title: 'Valorant',
            image: 'https://placehold.co/200x280?text=Valorant'
        },
        'apex-legends': {
            title: 'Apex Legends',
            image: 'https://placehold.co/200x280?text=Apex+Legends'
        },
        'lol': {
            title: 'League of Legends',
            image: 'https://placehold.co/200x280?text=LoL'
        },
        'roblox': {
            title: 'Roblox',
            image: 'https://placehold.co/200x280?text=Roblox'
        }
    };

    const data = gameData[game];
    if (data) {
        document.getElementById('game-image').src = data.image;
        document.getElementById('game-title').textContent = data.title;
        document.getElementById('success-game').textContent = data.title;
    }
}

function setupEventListeners() {
    // Package selection
    document.querySelectorAll('.item-card-topup').forEach(card => {
        card.addEventListener('click', function() {
            selectPackage(this);
        });
    });

    // Payment selection
    document.querySelectorAll('.payment-card').forEach(card => {
        card.addEventListener('click', function() {
            selectPayment(this);
        });
    });
}

function selectPackage(card) {
    // Remove previous selection
    document.querySelectorAll('.item-card-topup').forEach(c => {
        c.classList.remove('selected');
    });

    // Select new package
    card.classList.add('selected');
    selectedPackage = {
        id: card.dataset.packageId,
        name: card.querySelector('.item-name').textContent,
        price: card.querySelector('.item-price').textContent
    };
}

function fillExampleId(exampleId) {
    document.getElementById('user-id').value = exampleId;
    // Add visual feedback
    const input = document.getElementById('user-id');
    input.focus();
    input.style.borderColor = 'var(--primary-color)';
    setTimeout(() => {
        input.style.borderColor = '';
    }, 1000);
}

function selectPayment(card) {
    // Remove previous selection
    document.querySelectorAll('.payment-card').forEach(c => {
        c.classList.remove('selected');
    });

    // Select new payment
    card.classList.add('selected');
    selectedPayment = card.querySelector('.payment-name').textContent;
}

function nextStep(step) {
    if (step === 2 && !document.getElementById('user-id').value.trim()) {
        alert('Please enter your User ID');
        return;
    }

    if (step === 3 && !selectedPackage) {
        alert('Please select a package');
        return;
    }

    showStep(step);
}

function prevStep(step) {
    showStep(step);
}

function showStep(step) {
    currentStep = step;

    // Hide all steps
    document.querySelectorAll('.topup-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show current step
    document.querySelector(`[data-step="${step}"]`).classList.add('active');

    // Update progress bar
    updateProgressBar(step);
}

function updateProgressBar(step) {
    document.querySelectorAll('.progress-step').forEach((progressStep, index) => {
        const stepNumber = index + 1;
        if (stepNumber <= step) {
            progressStep.classList.add('active');
        } else {
            progressStep.classList.remove('active');
        }
    });
}

async function handlePurchase() {
    if (!selectedPayment) {
        alert('Please select a payment method');
        return;
    }

    if (!selectedPackage || !selectedPackage.id) {
        alert('Please select a package');
        return;
    }

    const userIdInput = document.getElementById('user-id').value.trim();
    if (!userIdInput) {
        alert('Please enter your User ID');
        return;
    }

    // Show loading state
    const buyBtn = document.querySelector('.buy-button');
    const originalText = buyBtn.textContent;
    buyBtn.textContent = 'Memproses...';
    buyBtn.disabled = true;

    // Get game parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const game = urlParams.get('game');

    try {
        const response = await fetch('/api/topup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Assuming you have a way to get the user's token for authentication
                // 'Authorization': `Bearer ${yourAuthToken}`,
            },
            body: JSON.stringify({
                game: game,
                playerId: userIdInput,
                packageId: selectedPackage.id,
                paymentMethod: selectedPayment,
                // userId: (This should come from the backend's auth middleware)
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Update success details
            document.getElementById('order-id').textContent = data.transaction.transaction_id;
            document.getElementById('success-package').textContent = selectedPackage.name;
            document.getElementById('success-total').textContent = selectedPackage.price;

            // Show success step
            showStep(4);
        } else {
            alert('Gagal memproses top-up: ' + (data.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat memproses pembelian');
    } finally {
        // Reset button state
        buyBtn.textContent = originalText;
        buyBtn.disabled = false;
    }
}

function resetForm() {
    // Reset form
    document.getElementById('user-id').value = '';
    selectedPackage = null;
    selectedPayment = null;

    // Remove selections
    document.querySelectorAll('.selected').forEach(el => {
        el.classList.remove('selected');
    });

    // Go back to first step
    showStep(1);
}

function goHome() {
    window.location.href = 'index.html';
}

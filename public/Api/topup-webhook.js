// [Fail: api/check.js]

// Fungsi yang dijalankan apabila ada permintaan ke /api/check
async function handleCheckPlayerId(request, response) {
    // 1. Terima Data dari Laman Web (Contoh guna GET Query)
    const playerId = request.query.player_id;
    const gameId = request.query.game_id;
    const apiKeySaya = 'KUNCI_RAHSIA_ANDA'; // Kunci API anda

    // 2. Buat Panggilan ke API Supplier Game Sebenar
    const supplierUrl = 'https://api.supplierutamaanda.com/v1/game/get_name';

    try {
        const supplierResponse = await fetch(supplierUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKeySaya}`, // Guna API Key untuk pengesahan
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                player_id: playerId,
                game_code: gameId
            })
        });

        const supplierData = await supplierResponse.json();

        // 3. Proses Respons Supplier
        if (supplierData.status === 'success') {
            // Hantar Balik Nama Pemain ke Laman Web Pelanggan
            response.status(200).json({
                success: true,
                nickname: supplierData.player_nickname 
            });
        } else {
            response.status(400).json({
                success: false,
                message: 'Player ID tidak sah.'
            });
        }
    } catch (error) {
        response.status(500).json({
            success: false,
            message: 'Ralat pelayan dalaman.'
        });
    }
}

// Export fungsi ini untuk digunakan oleh server/vercel
// module.exports = handleCheckPlayerId;

// [Fail: api/topup-webhook.js]

async function handlePaymentWebhook(request, response) {
    // 1. Terima Webhook (Notifikasi Bayaran Berjaya)
    const payload = request.body;
    
    // PENTING: Sahkan Webhook Signature untuk pastikan ia datang dari Payment Gateway
    if (!verifyWebhookSignature(payload, request.headers['x-signature'])) {
        return response.status(401).send('Signature tidak sah.');
    }

    // 2. Pastikan Bayaran Berjaya & Dapatkan Maklumat Pesanan
    if (payload.status === 'PAID') {
        const orderId = payload.custom_order_id;
        // Dapatkan Player ID dan Jumlah Diamond dari Pangkalan Data guna orderId

        const { playerId, amount } = await db.getOrderDetails(orderId); 
        
        // 3. Buat Panggilan ke API Supplier Top-Up Sebenar
        const topupUrl = 'https://api.supplierutamaanda.com/v1/transaction/create';
        
        try {
            const topupResponse = await fetch(topupUrl, {
                method: 'POST',
                // ... (Headers dan Body sama seperti di atas, termasuk Player ID & Amount)
            });

            const topupData = await topupResponse.json();

            // 4. Kemaskini Status Pesanan di Pangkalan Data Anda
            if (topupData.status === 'success') {
                await db.updateOrderStatus(orderId, 'DIAMOND_SENT');
            } else {
                await db.updateOrderStatus(orderId, 'TOPUP_FAILED');
            }
            
            return response.status(200).send('OK'); // Penting: Balas OK kepada Payment Gateway
            
        } catch (error) {
            await db.updateOrderStatus(orderId, 'API_ERROR');
            return response.status(500).send('Ralat pemprosesan API Top-Up.');
        }
    }
    
    response.status(200).send('OK');
}

// module.exports = handlePaymentWebhook;
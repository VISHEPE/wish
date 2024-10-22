document.getElementById('qrForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Get user input
    const data = document.getElementById('data').value;
    
    // Create a new QR code
    const qr = new QRious({
        element: document.createElement('canvas'),
        value: data,
        size: 200
    });
    
    // Display the QR code
    const qrCodeDiv = document.getElementById('qrCode');
    qrCodeDiv.innerHTML = ''; // Clear previous QR code
    qrCodeDiv.appendChild(qr.canvas);
});

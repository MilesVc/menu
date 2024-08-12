document.getElementById('menuForm').addEventListener('submit', function(event) {
    event.preventDefault();
    sendPDFEmail();
});

function sendPDFEmail() {
    // Access jsPDF from the global object
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const userName = document.getElementById('userName').value;
    const cateringDate = document.getElementById('cateringDate').value;

    // Add text to the PDF document
    doc.text(`Catering Order for ${userName}`, 10, 10);
    doc.text(`Catering Date: ${cateringDate}`, 10, 20);

    // Retrieve categories and dishes from localStorage
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    let y = 30; // Starting Y position for text
    categories.forEach(category => {
        doc.text(category.name, 10, y);
        y += 10;
        category.dishes.forEach(dish => {
            doc.text(`- ${dish}`, 20, y);
            y += 10;
        });
    });

    // Save the PDF to a file (optional)
    doc.save('CateringOrder.pdf');

    // Convert PDF to Data URL
    const pdfData = doc.output('datauristring');

    // Send the email with the PDF attachment
    sendEmail(pdfData);
}

function sendEmail(pdfData) {
    const adminEmail = 'admin@example.com';  // Replace with the actual admin email

    Email.send({
        SecureToken: 'YOUR_SECURE_TOKEN',  // Replace with your actual SMTP token
        To: adminEmail,
        From: 'noreply@example.com',
        Subject: 'New Catering Order',
        Body: 'Please find the attached catering order.',
        Attachments: [
            {
                name: 'CateringOrder.pdf',
                data: pdfData
            }
        ]
    }).then(
        message => alert("Order successfully sent to admin!")
    ).catch(
        error => console.error('Error sending email:', error)
    );
}

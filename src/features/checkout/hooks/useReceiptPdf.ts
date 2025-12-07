import jsPDF from "jspdf";

interface BookingSummary {
  customerName: string;
  email: string;
  phone: string;
  hotelName: string;
  totalCost: number;
  bookingDateTime: string;
  confirmationNumber: string;
  numberOfRooms: number;
  items?: Array<{
    roomType: string;
    roomId?: number;
    checkInDate: string;
    checkOutDate: string;
    price?: number;
  }>;
}

export function useReceiptPdf() {
  const generatePDF = (summary: BookingSummary) => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Smart Stays - Booking Receipt", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Confirmation #: ${summary.confirmationNumber}`, 20, 30);

    drawLine(doc, 35);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Customer Information", 20, 45);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(`Name: ${summary.customerName}`, 20, 55);
    doc.text(`Email: ${summary.email}`, 20, 63);
    doc.text(`Phone: ${summary.phone}`, 20, 71);

    drawLine(doc, 78);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Booking Details", 20, 90);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(`Hotel: ${summary.hotelName}`, 20, 100);
    doc.text(`Number of Rooms: ${summary.numberOfRooms}`, 20, 108);
    doc.text(`Total Paid: $${summary.totalCost.toFixed(2)}`, 20, 116);
    doc.text(
      `Booking Date: ${new Date(summary.bookingDateTime).toLocaleString()}`,
      20,
      124
    );

    drawLine(doc, 132);

    if (summary.items && summary.items.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Room Details", 20, 145);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      let y = 155;

      summary.items.forEach((item, idx) => {
        doc.text(`Room ${idx + 1}: ${item.roomType}`, 20, y);
        doc.text(`Room ID: ${item.roomId ?? "-"}`, 20, y + 8);
        doc.text(
          `Check-in: ${item.checkInDate}   Check-out: ${item.checkOutDate}`,
          20,
          y + 16
        );
        doc.text(`Price/night: $${item.price?.toFixed(2) ?? "0"}`, 20, y + 24);

        y += 34;
        drawLine(doc, y - 6);
      });
    }

    doc.setFont("helvetica", "italic");
    doc.setFontSize(12);
    doc.text("Thank you for choosing Smart Stays 💛", 20, 280);

    doc.save(`SmartStays-Booking-${summary.confirmationNumber}.pdf`);
  };

  return { generatePDF };
}

function drawLine(doc: jsPDF, y: number) {
  doc.setLineWidth(0.5);
  doc.line(20, y, 190, y);
}

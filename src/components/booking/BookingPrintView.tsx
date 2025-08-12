import React from 'react';
import Button from '../base/Button';

interface BookingPrintViewProps {
  bookingDetails: {
    reference: string;
    package: string;
    date: string;
    time: string;
    adults: number;
    adultPrice: number;
    children: number;
    childPrice: number;
    addons: Array<{
      name: string;
      price: number;
      count: number;
    }>;
    customer: {
      name: string;
      email: string;
      phone: string;
      hotel: string;
      country: string;
    };
    paymentMethod: string;
  };
  onClose: () => void;
}

const BookingPrintView: React.FC<BookingPrintViewProps> = ({
  bookingDetails,
  onClose
}) => {
  // Calculate totals
  const adultTotal = bookingDetails.adults * bookingDetails.adultPrice;
  const childTotal = bookingDetails.children * bookingDetails.childPrice;
  const addonTotal = bookingDetails.addons.reduce((total, addon) => total + (addon.price * addon.count), 0);
  const grandTotal = adultTotal + childTotal + addonTotal;

  return (
    <div className="p-8 max-w-4xl mx-auto relative" id="receipt-content">
      {/* Watermark for voucher */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="transform rotate-45 text-gray-200 text-[120px] font-bold opacity-20">
          VOUCHER
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Coral Island Pattaya</h1>
        <Button
          onClick={onClose}
          className="print:hidden"
          variant="primary"
        >
          Back to Confirmation
        </Button>
      </div>

      <div className="border-b-2 border-blue-900 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-blue-900">Booking Confirmation</h2>
        <p className="text-gray-600">Reference: {bookingDetails.reference}</p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
          <p><span className="font-medium">Name:</span> {bookingDetails.customer.name}</p>
          <p><span className="font-medium">Email:</span> {bookingDetails.customer.email}</p>
          <p><span className="font-medium">Phone:</span> {bookingDetails.customer.phone}</p>
          <p><span className="font-medium">Hotel:</span> {bookingDetails.customer.hotel}</p>
          <p><span className="font-medium">Country:</span> {bookingDetails.customer.country}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Tour Details</h3>
          <p><span className="font-medium">Package:</span> {bookingDetails.package}</p>
          <p><span className="font-medium">Date:</span> {bookingDetails.date}</p>
          <p><span className="font-medium">Time:</span> {bookingDetails.time}</p>
          <p><span className="font-medium">Pick-up:</span> From your hotel at 8:00 AM</p>
          <p><span className="font-medium">Payment Method:</span> {bookingDetails.paymentMethod}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-2">Item</th>
              <th className="text-right py-2">Quantity</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-2">Adult Ticket</td>
              <td className="text-right py-2">{bookingDetails.adults}</td>
              <td className="text-right py-2">฿{bookingDetails.adultPrice.toLocaleString()}</td>
              <td className="text-right py-2">฿{adultTotal.toLocaleString()}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2">Child Ticket</td>
              <td className="text-right py-2">{bookingDetails.children}</td>
              <td className="text-right py-2">฿{bookingDetails.childPrice.toLocaleString()}</td>
              <td className="text-right py-2">฿{childTotal.toLocaleString()}</td>
            </tr>
            {bookingDetails.addons.map((addon, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2">{addon.name}</td>
                <td className="text-right py-2">{addon.count}</td>
                <td className="text-right py-2">฿{addon.price.toLocaleString()}</td>
                <td className="text-right py-2">฿{(addon.price * addon.count).toLocaleString()}</td>
              </tr>
            ))}
            <tr className="font-bold">
              <td colSpan={3} className="text-right py-2">Grand Total:</td>
              <td className="text-right py-2">฿{grandTotal.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border-t-2 border-gray-200 pt-6 mb-8">
        <h3 className="text-lg font-semibold mb-2">Important Information</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Please be ready at your hotel lobby at 8:00 AM for pick-up.</li>
          <li>Bring sunscreen, hat, sunglasses, towel, and swimwear.</li>
          <li>Don't forget your camera and some cash for optional purchases.</li>
          <li>Tour duration: Approximately 8 hours (return to hotel around 5:00 PM).</li>
          <li>For any questions or changes, please contact us at +66 38 123 4567.</li>
        </ul>
      </div>

      <div className="text-center text-gray-600 text-sm mt-12 pt-6 border-t border-gray-200">
        <p>Coral Island Pattaya Tours</p>
        <p>123 Beach Road, Pattaya, Chonburi 20150, Thailand</p>
        <p>Tel: +66 38 123 4567 | Email: info@coralislandtour.com</p>
        <p className="mt-2">© {new Date().getFullYear()} Coral Island Pattaya Tours. All rights reserved.</p>
      </div>
    </div>
  );
};

export default BookingPrintView; 
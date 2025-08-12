import React from 'react';
import Button from '../base/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDownload, 
  faTicketAlt, 
  faPrint, 
  faHome 
} from '@fortawesome/free-solid-svg-icons';

interface BookingActionsProps {
  onDownloadReceipt: () => void;
  onDownloadVoucher: () => void;
  onPrintReceipt: () => void;
  onPrintVoucher: () => void;
  onReturnHome: () => void;
  className?: string;
}

const BookingActions: React.FC<BookingActionsProps> = ({
  onDownloadReceipt,
  onDownloadVoucher,
  onPrintReceipt,
  onPrintVoucher,
  onReturnHome,
  className
}) => {
  return (
    <div className={`flex flex-wrap gap-4 ${className || ''}`}>
      <Button
        className="rounded-full"
        variant="primary"
        size="md"
        onClick={onDownloadVoucher}
        icon={<FontAwesomeIcon icon={faTicketAlt} className="mr-2" />}
      >
        Download Voucher
      </Button>
      <Button
        variant="success"
        size="md"
        onClick={onReturnHome}
        className="rounded-full"
        icon={<FontAwesomeIcon icon={faHome} className="mr-2" />}
      >
        Return to Home
      </Button>
    </div>
  );
};

export default BookingActions; 
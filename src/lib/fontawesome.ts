import { library, config } from '@fortawesome/fontawesome-svg-core';
import { 
  faFacebookF, 
  faInstagram, 
  faTwitter, 
  faYoutube,
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcPaypal
} from '@fortawesome/free-brands-svg-icons';
import { 
  faMapMarkerAlt, 
  faPhoneAlt, 
  faEnvelope,
  faTicket,
  faCalendar,
  faUsers,
  faPlusCircle,
  faCheckCircle,
  faCheck,
  faArrowLeft,
  faArrowRight,
  faCreditCard,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

// Prevent FontAwesome from adding its CSS since we're doing it manually
config.autoAddCss = false;

// Add all icons to the library
library.add(
  faFacebookF, 
  faInstagram, 
  faTwitter, 
  faYoutube,
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcPaypal,
  faMapMarkerAlt, 
  faPhoneAlt, 
  faEnvelope,
  faTicket,
  faCalendar,
  faUsers,
  faPlusCircle,
  faCheckCircle,
  faCheck,
  faArrowLeft,
  faArrowRight,
  faCreditCard,
  faExclamationCircle
);
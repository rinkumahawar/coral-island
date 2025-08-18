import React from 'react';
import '../../styles/html-content.css';

interface TicketDetailsProps {
  ticket: {
    content?: string;
    instruction?: string[];
    itinerary?: Array<{
      icon: string | null;
      time: string;
      title: string;
      description: string;
    }>;
    include?: Array<{
      title: string;
    }>;
    exclude?: Array<{
      title: string;
    }>;
    term_condition?: string;
  };
  is_content: boolean;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket, is_content = true }) => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Content Section */}
      {ticket.content && is_content && (
        <div>
          <h5 className="font-semibold text-gray-900 mb-2 md:mb-3 flex items-center text-sm md:text-base">
            <span className="mr-2">📋</span> Event Overview:
          </h5>
          <div className="text-sm md:text-base text-gray-700 leading-relaxed" 
               dangerouslySetInnerHTML={{ __html: ticket.content }} />
        </div>
      )}

      {/* Instructions Section */}
      {ticket.instruction && ticket.instruction.length > 0 && (
        <div>
          <h5 className="font-semibold text-blue-700 mb-2 md:mb-3 flex items-center text-sm md:text-base">
            <span className="mr-2">📝</span> Important Instructions:
          </h5>
          <ul className="space-y-1 md:space-y-2">
            {ticket.instruction.map((item, idx) => (
              <li key={idx} className="flex items-start text-sm md:text-base">
                <span className="text-blue-500 mr-2 md:mr-3 mt-0.5 md:mt-1">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Itinerary Section */}
      {ticket.itinerary && ticket.itinerary.length > 0 && (
        <div>
          <h5 className="font-semibold text-purple-700 mb-2 md:mb-3 flex items-center text-sm md:text-base">
            <span className="mr-2">⏰</span> Event Itinerary:
          </h5>
          <div className="space-y-3 md:space-y-4">
            {ticket.itinerary.map((item, idx) => (
              <div key={idx} className="border-l-2 border-purple-200 pl-4 md:pl-6">
                <div className="flex items-start">
                  <div className="bg-purple-100 text-purple-700 text-xs md:text-sm font-semibold px-2 py-1 rounded-full mr-3 md:mr-4 flex-shrink-0">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <h6 className="font-semibold text-gray-900 text-sm md:text-base mb-1">
                      {item.title}
                    </h6>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Includes and Excludes Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Includes Section */}
          {ticket.include && ticket.include.length > 0 && (
            <div>
              <h5 className="font-semibold text-green-700 mb-2 md:mb-3 flex items-center text-sm md:text-base">
                <span className="mr-2">✓</span> What's Included:
              </h5>
              <ul className="space-y-1 md:space-y-2">
                {ticket.include.map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm md:text-base">
                    <span className="text-green-500 mr-2 md:mr-3 mt-0.5 md:mt-1">•</span>
                    <span className="text-gray-700">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Excludes Section */}
          {ticket.exclude && ticket.exclude.length > 0 && (
            <div>
              <h5 className="font-semibold text-red-700 mb-2 md:mb-3 flex items-center text-sm md:text-base">
                <span className="mr-2">✗</span> What's Not Included:
              </h5>
              <ul className="space-y-1 md:space-y-2">
                {ticket.exclude.map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm md:text-base">
                    <span className="text-red-500 mr-2 md:mr-3 mt-0.5 md:mt-1">•</span>
                    <span className="text-gray-700">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      {/* Terms & Conditions Section */}
      {ticket.term_condition && (
        <div>
          <h5 className="font-semibold text-orange-700 mb-2 md:mb-3 flex items-center text-sm md:text-base">
            <span className="mr-2">📋</span> Terms & Conditions:
          </h5>
              <div className="text-sm md:text-base text-gray-700 leading-relaxed bg-orange-50 p-3 md:p-4 rounded-lg border border-orange-200 html-content" 
               dangerouslySetInnerHTML={{ __html: ticket.term_condition }} />
        </div>
      )}
    </div>
  );
};

export default TicketDetails; 
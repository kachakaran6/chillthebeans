import { MapPin, Phone, Clock, Coffee, Car, Utensils } from 'lucide-react';

export default function FindUs() {
  return (
    <section id="find-us" className="py-24 bg-cream-foam text-cocoa-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          
          {/* Info Block */}
          <div className="space-y-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl mb-6 text-cocoa-dark">Find Us</h2>
              <p className="font-body text-lg opacity-80 leading-relaxed max-w-md">
                We're right on Main Street. Look for the queue, but don't worry—it moves fast.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="text-caramel shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Main Street, Castlemungret</p>
                  <p className="text-sm opacity-70">Mungret, Co. Limerick, V94 Y012</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="text-caramel shrink-0 mt-1" />
                <div>
                  <a href="tel:+353830811943" className="font-medium hover:text-caramel transition">
                    +353 83 081 1943
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="text-caramel shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Opening Hours</p>
                  <p className="text-sm opacity-70">Sat: Opens 8am</p>
                  <p className="text-sm text-cherry mt-1">Other days: Ask in store (TODO)</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-oat flex space-x-6 text-sm font-medium">
              <div className="flex items-center space-x-2">
                <Coffee size={16} className="text-caramel" />
                <span>Dine-in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Car size={16} className="text-caramel" />
                <span>Kerbside</span>
              </div>
              <div className="flex items-center space-x-2">
                <Utensils size={16} className="text-caramel" />
                <span>Delivery</span>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl bg-oat/50 relative">
            <iframe 
              title="Google Maps location of Chill The Beans Mungret"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d19413.499897715424!2d-8.6929814!3d52.6358076!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485b45611b2c5633%3A0x2261941a225af6b6!2sChill%20The%20Beans%20Mungret!5e0!3m2!1sen!2sie!4v1700000000000!5m2!1sen!2sie"
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(0.3) sepia(0.2) hue-rotate(5deg)' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            {/* Note: In a real environment, the iframe src would use the exact Place ID or Plus Code (J8P4+8R Mungret). 
                I'm using a placeholder lat/lng near Mungret. */}
          </div>

        </div>
      </div>
    </section>
  );
}

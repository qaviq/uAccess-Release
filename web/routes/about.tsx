import Header from "@/components/header1";
import { Card, CardContent } from "@/components/ui/card";
import uOttaHackImage from "../assets/Uottohack 7.jpg";

export default function About() {
  return (
 
 
    <div className="min-h-screen bg-[#FEF9E1] overflow-x-hidden">
      <Header />
      <main className="px-4 py-12 md:px-8 lg:px-12">
        <div className="md:flex md:gap-12 max-w-7xl mx-auto">
          {/* Image Section */}
          <div className="md:flex-1 mb-12 md:mb-0 animate-fade-in animate-duration-[800ms] h-full flex flex-col">
            <img
              src={uOttaHackImage}
              alt="uOttaHack 7 Event"
              className="w-full h-full aspect-[4/3] object-cover rounded-lg hover:scale-[1.02] transition-transform duration-500 border-4 border-[#A31D1D]"
            />
          </div>
          
          {/* Content Section */}
          <div className="md:flex-1 space-y-8 animate-fade-in animate-duration-[800ms]">
            <Card className="transform transition-all duration-300 hover:scale-[1.02] border-2 border-[#6D2323] bg-[#E5D0AC] hover:shadow-lg">
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold mb-4 text-[#6D2323]">About Us</h1>
                <p className="text-lg leading-relaxed text-[#A31D1D]">
                  uAccess is a service which couples AI and user generated content in order to provide 
                  accessibility reviews and aid to those who need it. AI creates summaries of areas 
                  and provides tips to those navigating them, while users provide reviews of accessibility 
                  and send data such as elevator functionality, ramp inclines, and more.
                </p>
                <div className="border-t border-[#6D2323] my-6" />
                <p className="text-lg font-semibold text-[#6D2323]">
                  Join the movement to make your city more accessible!
                </p>
              </CardContent>
            </Card>
            
            <Card className="transform transition-all duration-300 hover:scale-[1.02] border-2 border-[#6D2323] bg-[#E5D0AC] hover:shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-[#6D2323]">Contact Us</h2>
                <div className="space-y-4">
                  <a 
                    href="tel:613-123-1234" 
                    className="block text-lg text-[#A31D1D] transition-colors hover:text-[#6D2323]"
                  >
                    Phone: 613-123-1234
                  </a>
                  <a 
                    href="mailto:uaccess@dev.com" 
                    className="block text-lg text-[#A31D1D] transition-colors hover:text-[#6D2323]"
                  >
                    Email: uaccess@dev.com
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

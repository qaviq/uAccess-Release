// Framework imports
import { useOutletContext } from "@remix-run/react";
import { useState, useEffect } from "react";
import { X, Crosshair, ChevronLeft } from "lucide-react";
import { useFindMany, useAction } from "@gadgetinc/react";
import { api } from "../api";

// UI Components
import { Button } from "@/components/ui/button";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// Types
import type { AuthOutletContext } from "./_auth";

// Assets
import MapPNG from "@/assets/uAccess_uOttawa_map_10k.png";
import ElevatorIcon from "@/assets/elavator_icon.png";
import WheelchairIcon from "@/assets/wheelchair_icon.png";
import CautionIcon from "@/assets/caution_icon.png";

interface Point {
  id: number;
  x: number;
  y: number;
  label: string;
  icon: string; // Path to the icon image
}
 
export default function () {
  const context = useOutletContext<AuthOutletContext>();
  const [showGreeting, setShowGreeting] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [reviewData, setReviewData] = useState({ rating: "1", comment: "" });

 
  const [{ data: reviews, fetching: loadingReviews, error: reviewsError }, refetch] = useFindMany(api.review, {
    sort: { date: "Descending" },
    filter: selectedPoint ? { location: { equals: selectedPoint.label } } : undefined,
    select: {
      id: true,
      location: true,
      date: true,
      comment: true,
      rating: true,
      createdAt: true,
      updatedAt: true,
      user: {
        firstName: true,
        lastName: true
      }
    }
  });

  const [{ fetching: submitting }, createReview] = useAction(api.review.create);

  // Example points
    const points: Point[] = [
    { id: 1, x: 240, y: 230, label: "Tabaret South", icon: WheelchairIcon },
    { id: 2, x: 150, y: 220, label: "Tabaret West", icon: WheelchairIcon },
    { id: 3, x: 60, y: 240, label: "Desmarais North", icon: WheelchairIcon },
    { id: 4, x: 110, y: 320, label: "Desmarais East", icon: WheelchairIcon },
    { id: 5, x: 30, y: 360, label: "Desmarais West", icon: WheelchairIcon },
    { id: 6, x: 270, y: 370, label: "Hamelin-Simard Link", icon: WheelchairIcon },
    { id: 7, x: 400, y: 370, label: "Pérez", icon: WheelchairIcon },
    { id: 8, x: 540, y: 430, label: "Morisset East", icon: WheelchairIcon },
    { id: 9, x: 550, y: 490, label: "Morisset-UCU Link", icon: WheelchairIcon },
    { id: 10, x: 520, y: 510, label: "Morisset South", icon: WheelchairIcon },
    { id: 11, x: 600, y: 740, label: "FSS East", icon: WheelchairIcon },
    { id: 12, x: 590, y: 810, label: "FSS-Vanier Link", icon: WheelchairIcon },
    { id: 13, x: 790, y: 750, label: "Vanier-Lamoureux Link", icon: WheelchairIcon },
    { id: 14, x: 880, y: 780, label: "CRX South", icon: WheelchairIcon },
    { id: 15, x: 790, y: 610, label: "CRX North", icon: WheelchairIcon },
    { id: 16, x: 570, y: 370, label: "Morisset-Thompson Link", icon: WheelchairIcon },
    { id: 17, x: 730, y: 350, label: "Fauteux West", icon: WheelchairIcon },
    { id: 18, x: 740, y: 250, label: "Fauteux North", icon: WheelchairIcon },
    { id: 19, x: 790, y: 310, label: "Fauteux East", icon: WheelchairIcon },
    { id: 20, x: 650, y: 610, label: "Monpetit South", icon: WheelchairIcon },
    { id: 21, x: 800, y: 870, label: "CAREG", icon: WheelchairIcon },
    { id: 22, x: 870, y: 850, label: "Gendron", icon: WheelchairIcon },
    { id: 23, x: 850, y: 950, label: "D'Iorio", icon: WheelchairIcon },
    { id: 24, x: 910, y: 1000, label: "D'Iorio", icon: WheelchairIcon },
    { id: 25, x: 1030, y: 1020, label: "Stem North", icon: WheelchairIcon },
    { id: 26, x: 1080, y: 1110, label: "Stem South", icon: WheelchairIcon },
    { id: 27, x: 1180, y: 1150, label: "Colonel By", icon: WheelchairIcon },
    { id: 28, x: 1320, y: 1220, label: "Site", icon:  WheelchairIcon },
    { id: 29, x: 1460, y: 1250, label: "Minto South", icon: WheelchairIcon },
    { id: 30, x: 1380, y: 980, label: "Minto North", icon: WheelchairIcon },
    { id: 31, x: 1300, y: 960, label: "ARC", icon:   WheelchairIcon },
    { id: 32, x: 1110, y: 940, label: "Louis-Pasteur West", icon: WheelchairIcon },
    { id: 33, x: 1060, y: 750, label: "Louis-Pasteur Worth", icon: WheelchairIcon },
    { id: 34, x: 60, y: 320, label: "Desmarais Elevator1", icon: ElevatorIcon },
    { id: 35, x: 72, y: 320, label: "Desmarais Elevator2", icon: ElevatorIcon },
    { id: 36, x: 44, y: 320, label: "Desmarais Elevator3", icon: CautionIcon },
    { id: 37, x: 160, y: 160, label: "Tabaret Elevator", icon: ElevatorIcon },
    { id: 38, x: 230, y: 340, label: "Hamelin Elevator", icon: ElevatorIcon },
    { id: 39, x: 290, y: 400, label: "Simard Elevator", icon: ElevatorIcon },
    { id: 40, x: 390, y: 330, label: "Pérez Elevator", icon: ElevatorIcon },
    { id: 41, x: 390, y: 230, label: "Laurier Elevator", icon: ElevatorIcon },
    { id: 42, x: 470, y: 420, label: "Morisset Elevator1", icon: ElevatorIcon },
    { id: 43, x: 470, y: 440, label: "Morisset Elevator2", icon: ElevatorIcon },
    { id: 44, x: 490, y: 440, label: "Morisset Elevator3", icon: CautionIcon },
    { id: 45, x: 490, y: 420, label: "Morisset Elevator4", icon: ElevatorIcon },
    { id: 46, x: 550, y: 580, label: "UCU Elevator", icon: ElevatorIcon },
    { id: 47, x: 700, y: 530, label: "Monpetit Elevator1", icon: ElevatorIcon },
    { id: 48, x: 740, y: 530, label: "Monpetit Elevator2", icon: ElevatorIcon },
    { id: 49, x: 850, y: 680, label: "CRX Elevator1", icon: ElevatorIcon },
    { id: 50, x: 860, y: 690, label: "CRX Elevator2", icon: ElevatorIcon },
    { id: 51, x: 870, y: 700, label: "CRX Elevator3", icon: ElevatorIcon },
    { id: 52, x: 560, y: 760, label: "FSS Elevator 1", icon: ElevatorIcon },
    { id: 53, x: 550, y: 750, label: "FSS Elevator 2", icon: CautionIcon },
    { id: 54, x: 910, y: 850, label: "Bioscience Elevator", icon: ElevatorIcon },
    { id: 55, x: 940, y: 930, label: "D'Iorio Elevator", icon: ElevatorIcon },
    { id: 56, x: 860, y: 970, label: "Marion Elevator1", icon: ElevatorIcon },
    { id: 57, x: 920, y: 1070, label: "Marion Elevator2", icon: ElevatorIcon },
    { id: 58, x: 1000, y: 1090, label: "STEM Elevator1", icon: ElevatorIcon },
    { id: 59, x: 1020, y: 1100, label: "STEM Elevator2", icon: ElevatorIcon },
    { id: 60, x: 1120, y: 1150, label: "CBY Elevator1", icon: CautionIcon },
    { id: 61, x: 1130, y: 1140, label: "CBY Elevator2", icon: CautionIcon },
    { id: 62, x: 1380, y: 1290, label: "SITE Elevator1", icon: ElevatorIcon },
    { id: 63, x: 1240, y: 1240, label: "SITE Elevator2", icon: ElevatorIcon },
    { id: 64, x: 1250, y: 850, label: "ARC Elevator", icon: ElevatorIcon },
    { id: 65, x: 760, y: 330, label: "Fauteux Elevator1", icon: ElevatorIcon },
    { id: 66, x: 750, y: 320, label: "Fauteux Elevator2", icon: CautionIcon },
  ];

  const getCenterPosition = () => {
    const offsetX = 160;
    const offsetY = -50;
    return { x: offsetX, y: offsetY, scale: 0.8 };
  };

  const center = getCenterPosition();

  const handleReviewSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedPoint || !context.user) return;

    await createReview({
      rating: parseInt(reviewData.rating, 10),
      comment: reviewData.comment,
      date: new Date().toISOString(),
      location: selectedPoint.label,
      user: {
        _link: context.user.id
      }
    });

    // Reset form and refresh reviews
    setReviewData({ rating: "1", comment: "" });
    refetch();
  };

  return (
 
  
    <div className="w-full h-full overflow-hidden bg-white relative border border-[#E5D0AC]/20 rounded-lg shadow-[0_0_15px_-3px_rgba(109,35,35,0.1)]">
      {context.user && showGreeting && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 transition-opacity duration-300">
          <div
            className="bg-[#FEF9E1] border-2 border-[#E5D0AC] rounded-lg p-4 shadow-lg flex items-center gap-3 z-20"
            >
            <h2 className="text-[#A31D1D] font-semibold">
              Welcome, {context.user.firstName}!
            </h2>
            <button
              onClick={() => setShowGreeting(false)}
              className="p-1.5 rounded-full hover:bg-[#6D2323]/10 text-[#6D2323] transition-colors"
              aria-label="Close greeting"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <div className="absolute inset-0 z-10">
        <TransformWrapper
          initialScale={center.scale}
          minScale={0.05}
          maxScale={80}
          smooth={true} 
          wheel={{ step: 0.1 }}
          limitToBounds={false}
          panning={{ disabled: false, velocityDisabled: true }}
          centerOnInit={false}
          initialPositionX={center.x}
          initialPositionY={center.y}
        >
          {({ setTransform }) => (
            <> 
              <Button
                variant="outline"
                size="icon"
                className="fixed bottom-6 right-6 z-20 bg-[#FEF9E1] border-2 border-[#E5D0AC] shadow-lg hover:bg-[#E5D0AC]/10 text-[#6D2323]"
                onClick={() => setTransform(center.x, center.y, center.scale, 200)}
                title="Center map"
              >
                <Crosshair className="h-4 w-4" />
              </Button>
              <TransformComponent wrapperClass="w-full h-full" contentClass="w-full h-full">
                <div className="relative w-full h-full">
                  <img 
                    src={MapPNG}
                    className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(109,35,35,0.4)] drop-shadow-[0_0_16px_rgba(229,208,172,0.5)] drop-shadow-[0_0_24px_rgba(109,35,35,0.3)] drop-shadow-[0_0_40px_rgba(229,208,172,0.4)] shadow-inner-[0_0_20px_rgba(109,35,35,0.15)]"
                    alt="uOttawa campus accessibility map"
                  />
                  {points.map((point) => (
                    <div
                      key={point.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${point.x}px`,
                        top: `${point.y}px`,
                      }}
                    >
                      <div
                        className="relative group cursor-pointer"
                        onClick={() => {
                          setSelectedPoint(point);
                        }}
                      >
                        <img
                          src={point.icon}
                          alt={point.label}
                          className="w-6 h-6"
                        />
                        <span className="absolute left-1/2 bottom-full mb-2 w-max transform -translate-x-1/2 bg-[#FEF9E1] border border-[#E5D0AC] rounded-md p-1 text-sm text-[#6D2323] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          {point.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
        {/* Recent Reviews Box */}
      {/* Recent Reviews Box */}
      </div>
      <div
        className="fixed top-24 left-6 z-30 bg-[#FEF9E1]/95 border-2 border-[#E5D0AC] rounded-lg shadow-lg w-64 max-h-[calc(100vh-8rem)] overflow-hidden flex flex-col"
      >
        <div className="sticky top-0 bg-[#FEF9E1] z-20 p-3 border-b border-[#E5D0AC] flex items-center gap-2">
          {selectedPoint && (
            <button
              onClick={() => setSelectedPoint(null)}
              className="p-1.5 rounded-full hover:bg-[#6D2323]/10 text-[#6D2323] transition-colors"
              aria-label="Back to recent reviews"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <h2 className="text-[#A31D1D] font-bold text-base">
            {selectedPoint ? `Reviews for ${selectedPoint.label}` : 'Recent Reviews'}
          </h2>
        </div>
        <div className="p-3 border-b border-[#E5D0AC]">
          {loadingReviews && <div className="text-[#6D2323]">Loading reviews...</div>}
          {reviewsError && <div className="text-[#6D2323]">Error loading reviews: {reviewsError.message}</div>} 
        </div>
        <div className="overflow-y-auto flex-1 overscroll-contain pb-4">
          {selectedPoint && reviews && reviews.length === 0 && (
            <div className="px-3 py-4 text-[#6D2323]">
              No reviews yet for {selectedPoint.label}
            </div>
          )}
          {reviews && reviews.map((review) => (
          <div key={review.id} className="border-b border-[#E5D0AC] pt-2 px-3 pb-2 leading-tight">
            <h3 className="text-[#A31D1D] font-semibold">
              {review.location} - {review.date ? new Date(review.date).toLocaleTimeString() : "No date"}
            </h3>
            <p className="text-[#6D2323]">{review.comment}</p>
            <p className="text-[#6D2323] mt-1">Rating: {review.rating}/5</p>
          </div>
          ))}
          {selectedPoint && (
            <form onSubmit={handleReviewSubmit} className="px-3 pt-4">
              <h3 className="text-[#A31D1D] font-semibold mb-3">Add Review</h3>
              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-[#6D2323] text-sm mb-1">
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={reviewData.rating}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, rating: e.target.value })
                    }
                    required
                    className="w-full p-2 border-2 border-[#E5D0AC] rounded-lg text-[#6D2323] bg-white focus:outline-none focus:border-[#A31D1D] text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#6D2323] text-sm mb-1">
                    Comment
                  </label>
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, comment: e.target.value })
                    }
                    required
                    className="w-full p-2 border-2 border-[#E5D0AC] rounded-lg text-[#6D2323] bg-white focus:outline-none focus:border-[#A31D1D] text-sm resize-none h-20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#A31D1D] text-white p-2 rounded-lg hover:bg-[#6D2323] transition-colors border-2 border-[#A31D1D] hover:border-[#6D2323] text-sm font-semibold"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

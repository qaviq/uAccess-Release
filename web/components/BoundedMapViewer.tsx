import { type FC } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { cn } from "@/lib/utils";

interface BoundedMapViewerProps {
  imageSrc: string;
  className?: string;
  containerClassName?: string;
  defaultZoom?: number;
}

const BoundedMapViewer: FC<BoundedMapViewerProps> = ({
  imageSrc,
  className,
  containerClassName,
  defaultZoom = 1,
}) => {
  return (
    <div
      className={cn(
        "relative h-[600px] w-[800px] overflow-hidden rounded-lg border border-gray-200",
        containerClassName
      )}
    >
      <TransformWrapper
        initialScale={defaultZoom}
        minScale={0.5}
        maxScale={4}
        alignmentAnimation={{ sizeX: 1, sizeY: 1 }}
        centerOnInit={true}
        panning={{
          lockAxisY: false,
          lockAxisX: false
        }}
        wheel={{
          step: 0.2,
          smoothStep: 0.01
        }}
        doubleClick={{ mode: "reset" }}
        smooth={true}
      >
        <TransformComponent 
          wrapperClass={cn("h-full w-full cursor-grab active:cursor-grabbing", className)}
          contentClass="h-full w-full"
        >
          <img 
            src={imageSrc} 
            alt="Zoomable map" 
            className="h-full w-full select-none"
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default BoundedMapViewer;

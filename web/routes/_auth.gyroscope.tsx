import { useState, useEffect, useRef } from "react";
import { useGlobalAction } from "@gadgetinc/react";
import { api } from "../api";
import { Card } from "@/components/ui/card";

function isIOSMotionPermissionAPI(window: Window): window is Window & {
  DeviceMotionEvent: { requestPermission(): Promise<"granted" | "denied"> };
} {
  return (
    "DeviceMotionEvent" in window &&
    "requestPermission" in (window as any).DeviceMotionEvent
  );
}

export default function GyroscopeData() {
  const [measurementStatus, setMeasurementStatus] = useState<"idle" | "measuring">("idle");
  const [betaValue, setBetaValue] = useState<string | null>(null);
  const [actionResult, setActionResult] = useState<typeof processResult>(null);
  const [error, setError] = useState<string | null>(null);
  const latestBetaRef = useRef<number | null>(null);

  const [{ data: processResult, error: apiError }, gyroscopeBeta] =
    useGlobalAction(api.gyroscopeBeta);

  useEffect(() => {
    if (processResult) {
      setActionResult(processResult);
    }
  }, [processResult]);

  useEffect(() => {
    if (apiError) {
      setError(`API Error: ${apiError.message}`);
    }
  }, [apiError]);

  const resetState = () => {
    setBetaValue(null);
    setMeasurementStatus("idle");
    setError(null);
    latestBetaRef.current = null;
    setActionResult(null);
  };

  const enableGyroscope = async () => {
    try {
      if (!window.DeviceMotionEvent) {
        setError("Device orientation not supported on this device");
        return;
      }

      resetState();

      if (isIOSMotionPermissionAPI(window)) {
        const permission = await window.DeviceMotionEvent.requestPermission();
        if (permission !== "granted") {
          setError("Permission denied for gyroscope");
          resetState();
          return;
        }
      }

      setMeasurementStatus("measuring");
      window.addEventListener("deviceorientation", handleOrientation);

      setTimeout(() => {
        window.removeEventListener("deviceorientation", handleOrientation);
        setMeasurementStatus("idle");

        if (latestBetaRef.current !== null) {
          console.log("Sending Beta Value to API:", latestBetaRef.current);
          void gyroscopeBeta({ beta: latestBetaRef.current });
        } else {
          setError("No beta value detected.");
        }
      }, 5000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Gyroscope access failed";
      setError(message);
    }
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.beta !== null) {
      const beta = parseFloat(event.beta.toFixed(2));
      latestBetaRef.current = beta;
      setBetaValue(beta.toFixed(2));
    }
  };

  useEffect(() => {
    return () => {
      if (measurementStatus === "measuring") {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, [measurementStatus]);

  return (
    <div className="text-center space-y-6 bg-[#FEF9E1] min-h-screen py-8 px-4">
      <h1 className="text-3xl font-extrabold mb-6 text-[#A31D1D]">Device Tilt Tracker</h1>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
        This tool helps you check the safety of wheelchair ramps. To use it, click the "Enable Tilt Tracking" button below, then place your phone face down on the ramp with the top pointing forward. After 5 seconds, the tool will analyze the tilt angle and indicate if the ramp meets Ontario safety standards.
      </p>
      <div className="max-w-md mx-auto">
        <Card className="p-6 bg-[#E5D0AC] rounded-lg shadow-lg">
          <div className="text-xl">
            <p className="mb-2 text-gray-600">Front-to-back tilt angle</p>
            <span className="text-4xl font-extrabold text-[#A31D1D]">
              {measurementStatus === "measuring"
                ? betaValue !== null ? `${betaValue}°` : "Tracking..."
                : betaValue !== null
                ? `${betaValue}°`
                : "--"}
            </span>
          </div>
          {error && (
            <div className="mt-4 text-red-600 font-semibold">
              Error: {error}
            </div>
          )}
        </Card>
        {actionResult && (
          <Card className="p-6 mt-6 bg-[#E5D0AC] rounded-lg shadow-lg">
            <div className="text-xl">
              {actionResult.result && (
                <span className={`font-bold text-lg ${actionResult.result?.isSupported ? 'text-green-600' : 'text-red-600'}`}> 
                  {actionResult.result?.isSupported ? 'This slope is safe' : 'This slope is unsafe'}
                </span>
              )}
            </div>
          </Card>
        )}
        {measurementStatus !== "measuring" && (
          <button
            onClick={enableGyroscope}
            className="px-6 py-3 mt-8 text-lg font-bold cursor-pointer bg-[#A31D1D] text-white hover:bg-[#870F0F] rounded-lg shadow-md transition-colors duration-300"
          >
            Enable Tilt Tracking
          </button>
        )}
      </div>
    </div>
  );
}
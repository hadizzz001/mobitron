'use client';

import { MdVerifiedUser, MdLocalShipping, MdLock, MdHeadsetMic } from "react-icons/md";

export default function FeaturesRow() {
  const iconColor = "#1cd9ff";

  const features = [
    { icon: MdVerifiedUser, title: "Official Warranty" },
    { icon: MdLocalShipping, title: "Express Delivery" },
    { icon: MdLock, title: "Secure Payment" },
    { icon: MdHeadsetMic, title: "Live Support" },
  ];

  return (
    <div className="flex justify-between items-center max-w-6xl mx-auto py-10 px-6 gap-6">
      {features.map((item, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <item.icon size={48} style={{ color: iconColor }} />
          <p className="mt-3 text-[#222] font-semibold text-sm">{item.title}</p>
        </div>
      ))}
    </div>
  );
}

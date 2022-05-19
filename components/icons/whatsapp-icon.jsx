import React from "react";
import Image from "next/image";

const WhatsappIcon = () => {
  return (
    <Image
      src="/images/whatsapp.svg"
      alt="whatsapp"
      width={32}
      height={32}
      layout="fixed"
    />
  );
};

export default WhatsappIcon;

"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "@/lib/metaPixel";

export default function ProductViewTracker() {
  useEffect(() => {
    trackMetaEvent("ViewContent", {
      content_name: "SKIN RECOVERY PATCH™",
      content_type: "product",
    });
  }, []);

  return null;
}

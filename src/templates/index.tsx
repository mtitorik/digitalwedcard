import React from "react";
import { WeddingInviteData } from "@/types/invite";

export { Template01 } from "./Template01";
export type { Template01Props } from "./Template01";

export { Template02 } from "./Template02";
export type { Template02Props } from "./Template02";

export { Template03 } from "./Template03";
export type { Template03Props } from "./Template03";

export { Template04 } from "./Template04";
export type { Template04Props } from "./Template04";

export { Template05 } from "./Template05";
export type { Template05Props } from "./Template05";

export { Template06 } from "./Template06";
export type { Template06Props } from "./Template06";

export { Template07 } from "./Template07";
export type { Template07Props } from "./Template07";

export { Template08 } from "./Template08";
export type { Template08Props } from "./Template08";

export { Template09 } from "./Template09";
export type { Template09Props } from "./Template09";

export { Template10 } from "./Template10";
export type { Template10Props } from "./Template10";

export { Template11 } from "./Template11";
export type { Template11Props } from "./Template11";

export { Template12 } from "./Template12";
export type { Template12Props } from "./Template12";

export { Template13 } from "./Template13";
export type { Template13Props } from "./Template13";

export { Template14 } from "./Template14";
export type { Template14Props } from "./Template14";

export { Template15 } from "./Template15";
export type { Template15Props } from "./Template15";

export { Template16 } from "./Template16";
export type { Template16Props } from "./Template16";

export { Template17 } from "./Template17";
export type { Template17Props } from "./Template17";

export { Template18 } from "./Template18";
export type { Template18Props } from "./Template18";

export { Template19 } from "./Template19";
export type { Template19Props } from "./Template19";

export { Template20 } from "./Template20";
export type { Template20Props } from "./Template20";

import { Template01 } from "./Template01";
import { Template02 } from "./Template02";
import { Template03 } from "./Template03";
import { Template04 } from "./Template04";
import { Template05 } from "./Template05";
import { Template06 } from "./Template06";
import { Template07 } from "./Template07";
import { Template08 } from "./Template08";
import { Template09 } from "./Template09";
import { Template10 } from "./Template10";
import { Template11 } from "./Template11";
import { Template12 } from "./Template12";
import { Template13 } from "./Template13";
import { Template14 } from "./Template14";
import { Template15 } from "./Template15";
import { Template16 } from "./Template16";
import { Template17 } from "./Template17";
import { Template18 } from "./Template18";
import { Template19 } from "./Template19";
import { Template20 } from "./Template20";

export interface BaseTemplateProps {
  data?: WeddingInviteData;
  className?: string;
  isEnvelopeOpenDefault?: boolean;
}

/**
 * Central registry mapping all 20 template IDs to their React component
 */
export const TEMPLATE_REGISTRY: Record<string, React.ComponentType<BaseTemplateProps>> = {
  "template-01": Template01,
  "template-02": Template02,
  "template-03": Template03,
  "template-04": Template04,
  "template-05": Template05,
  "template-06": Template06,
  "template-07": Template07,
  "template-08": Template08,
  "template-09": Template09,
  "template-10": Template10,
  "template-11": Template11,
  "template-12": Template12,
  "template-13": Template13,
  "template-14": Template14,
  "template-15": Template15,
  "template-16": Template16,
  "template-17": Template17,
  "template-18": Template18,
  "template-19": Template19,
  "template-20": Template20,
};

export interface WeddingCardRendererProps {
  templateId: string;
  data?: WeddingInviteData;
  className?: string;
  isEnvelopeOpenDefault?: boolean;
}

/**
 * Dynamic wedding card renderer component that dynamically mounts
 * the corresponding template based on templateId.
 */
export const WeddingCardRenderer: React.FC<WeddingCardRendererProps> = ({
  templateId,
  data,
  className = "",
  isEnvelopeOpenDefault = false,
}) => {
  // Normalize IDs like "1" or "01" to "template-01"
  const normalizedId = templateId.startsWith("template-")
    ? templateId
    : `template-${templateId.padStart(2, "0")}`;

  const Component = TEMPLATE_REGISTRY[normalizedId] || TEMPLATE_REGISTRY[templateId];

  if (!Component) {
    return (
      <div className="p-8 text-center bg-stone-900 text-stone-200 rounded-2xl border border-amber-400/30 max-w-sm mx-auto my-12">
        <p className="font-serif text-amber-400 text-lg font-bold mb-1">
          Template Not Found
        </p>
        <p className="text-xs text-stone-400">
          Template &ldquo;{templateId}&rdquo; is not currently registered in the system.
        </p>
      </div>
    );
  }

  return (
    <Component
      data={data}
      className={className}
      isEnvelopeOpenDefault={isEnvelopeOpenDefault}
    />
  );
};

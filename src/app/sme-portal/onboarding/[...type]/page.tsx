"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { CompleteKYB } from "@evolt/components/features/sme/kyc/CompleteKYB";
import { PersonalInformation } from "@evolt/components/features/sme/kyc/PersonalInformation";

type KYCType = "personal-info" | "kyb";

const KYC_COMPONENTS: Record<KYCType, React.ReactNode> = {
  "personal-info": <PersonalInformation />,
  kyb: <CompleteKYB />,
};

export default function KYCPage() {
  const params = useParams<{ type?: string[] }>();
  const typeSegments = params?.type ?? [];

  const currentType = typeSegments[0] as KYCType | undefined;

  const content = useMemo(() => {
    if (!currentType || !(currentType in KYC_COMPONENTS)) {
      return <PersonalInformation />;
    }
    return KYC_COMPONENTS[currentType];
  }, [currentType]);

  return (
    <main className="mt-10 w-full lg:max-w-2xl mx-auto space-y-5">
      {content}
    </main>
  );
}

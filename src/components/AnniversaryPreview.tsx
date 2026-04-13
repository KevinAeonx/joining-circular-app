"use client";
import { AnniversaryFormData, AnniversaryTemplate } from "@/types";
import AnniversaryTemplateElegant  from "./AnniversaryTemplateElegant";
import AnniversaryTemplateRoyal    from "./AnniversaryTemplateRoyal";
import AnniversaryTemplateRose     from "./AnniversaryTemplateRose";
import AnniversaryTemplateEmerald  from "./AnniversaryTemplateEmerald";
import AnniversaryTemplateWarm     from "./AnniversaryTemplateWarm";
import AnniversaryTemplateCosmic   from "./AnniversaryTemplateCosmic";

interface Props {
  formData: AnniversaryFormData;
  message: string;
  template: AnniversaryTemplate;
}

export default function AnniversaryPreview({ formData, message, template }: Props) {
  const shared = { formData, message, id: "anniversary-preview" };
  switch (template) {
    case 1: return <AnniversaryTemplateElegant {...shared} />;
    case 2: return <AnniversaryTemplateRoyal   {...shared} />;
    case 3: return <AnniversaryTemplateRose    {...shared} />;
    case 4: return <AnniversaryTemplateEmerald {...shared} />;
    case 5: return <AnniversaryTemplateWarm    {...shared} />;
    case 6: return <AnniversaryTemplateCosmic  {...shared} />;
    default: return <AnniversaryTemplateElegant {...shared} />;
  }
}

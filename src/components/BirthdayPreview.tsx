"use client";
import { BirthdayFormData } from "@/types";
import BirthdayTemplateFestive  from "./BirthdayTemplateFestive";
import BirthdayTemplateElegant  from "./BirthdayTemplateElegant";
import BirthdayTemplateWarm     from "./BirthdayTemplateWarm";
import BirthdayTemplateConfetti from "./BirthdayTemplateConfetti";
import BirthdayTemplateFloral   from "./BirthdayTemplateFloral";
import BirthdayTemplateOcean    from "./BirthdayTemplateOcean";

export type BirthdayTemplate = 1 | 2 | 3 | 4 | 5 | 6;

interface Props {
  formData: BirthdayFormData;
  message: string;
  template: BirthdayTemplate;
}

export default function BirthdayPreview({ formData, message, template }: Props) {
  const shared = { formData, message, id: "birthday-preview" };
  switch (template) {
    case 1: return <BirthdayTemplateFestive  {...shared} />;
    case 2: return <BirthdayTemplateElegant  {...shared} />;
    case 3: return <BirthdayTemplateWarm     {...shared} />;
    case 4: return <BirthdayTemplateConfetti {...shared} />;
    case 5: return <BirthdayTemplateFloral   {...shared} />;
    case 6: return <BirthdayTemplateOcean    {...shared} />;
    default: return <BirthdayTemplateFestive {...shared} />;
  }
}

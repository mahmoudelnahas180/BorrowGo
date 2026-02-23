"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCalendarDays,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

const HowItWorks: React.FC = () => {
  const t = useTranslations("HowItWorks");

  const steps = [
    {
      id: 1,
      icon: faSearch,
      title: t("step1"),
      description: t("desc1"),
    },
    {
      id: 2,
      icon: faCalendarDays,
      title: t("step2"),
      description: t("desc2"),
    },
    {
      id: 3,
      icon: faTruck,
      title: t("step3"),
      description: t("desc3"),
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto bg-surface rounded-3xl shadow-sm py-16 px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-16">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] ltr:left-[60%] rtl:right-[60%] w-full h-0.5 bg-gradient-to-r from-button-primary/30 to-transparent z-0" />
              )}

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 bg-[var(--color-bg)] rounded-2xl shadow-lg flex items-center justify-center mb-8 border border-border group-hover:border-button-primary transition-all duration-300 group-hover:-translate-y-2">
                  <FontAwesomeIcon
                    icon={step.icon}
                    className="text-button-secondary text-3xl"
                  />
                </div>

                <h3 className="text-xl font-bold text-text-primary mb-4">
                  {step.title}
                </h3>

                <p className="text-text-secondary leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

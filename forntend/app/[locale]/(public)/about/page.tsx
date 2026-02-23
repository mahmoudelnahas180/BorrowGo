import React from "react";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faEye,
  faShieldHalved,
  faHandshake,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
    <main className="min-h-screen py-12 px-6 lg:px-12 bg-bg">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Mission & Vision Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Mission Island */}
          <div className="bg-surface rounded-3xl shadow-sm p-8 md:p-12 border border-border flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-button-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <FontAwesomeIcon
                icon={faRocket}
                className="text-button-primary text-2xl"
              />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              {t("missionTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("missionContent")}
            </p>
          </div>

          {/* Vision Island */}
          <div className="bg-surface rounded-3xl shadow-sm p-8 md:p-12 border border-border flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-button-secondary/10 rounded-2xl flex items-center justify-center mb-6">
              <FontAwesomeIcon
                icon={faEye}
                className="text-button-secondary text-2xl"
              />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              {t("visionTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("visionContent")}
            </p>
          </div>
        </div>

        {/* Why Choose Us Island */}
        <div className="bg-surface rounded-3xl shadow-sm p-8 md:p-12 border border-border">
          <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
            {t("whyTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-400">
            {/* Reason 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 bg-bg rounded-xl flex items-center justify-center mb-6 border border-border group-hover:border-button-primary transition-colors">
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  className="text-button-primary text-xl"
                />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {t("reason1Title")}
              </h3>
              <p className="text-text-secondary text-sm">{t("reason1Desc")}</p>
            </div>

            {/* Reason 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 bg-bg rounded-xl flex items-center justify-center mb-6 border border-border group-hover:border-button-secondary transition-colors">
                <FontAwesomeIcon
                  icon={faHandshake}
                  className="text-button-secondary text-xl"
                />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {t("reason2Title")}
              </h3>
              <p className="text-text-secondary text-sm">{t("reason2Desc")}</p>
            </div>

            {/* Reason 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 bg-bg rounded-xl flex items-center justify-center mb-6 border border-border group-hover:border-button-primary transition-colors">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="text-button-primary text-xl"
                />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {t("reason3Title")}
              </h3>
              <p className="text-text-secondary text-sm">{t("reason3Desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

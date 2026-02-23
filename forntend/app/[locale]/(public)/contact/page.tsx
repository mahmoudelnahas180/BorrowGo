import React from "react";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export default function ContactPage() {
  const t = useTranslations("ContactPage");

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

        {/* Content Island */}
        <div className="bg-surface rounded-3xl shadow-xl overflow-hidden border border-border">
          <div className="flex flex-col lg:flex-row">
            {/* Contact Form */}
            <div className="flex-1 p-8 md:p-12 border-b lg:border-b-0 lg:border-e border-border">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-primary">
                      {t("name")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-border focus:border-button-primary outline-none transition-colors bg-bg"
                      placeholder={t("name")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-primary">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-border focus:border-button-primary outline-none transition-colors bg-bg"
                      placeholder={t("email")}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-primary">
                    {t("subject")}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-button-primary outline-none transition-colors bg-bg"
                    placeholder={t("subject")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-primary">
                    {t("message")}
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-button-primary outline-none transition-colors bg-bg resize-none"
                    placeholder={t("message")}
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="w-full md:w-auto px-8 py-4 bg-button-primary text-white font-bold rounded-xl hover:bg-button-primary-hover transition-all transform hover:-translate-y-1 shadow-lg shadow-button-primary/20"
                >
                  {t("send")}
                </button>
              </form>
            </div>

            {/* Contact Info Panel */}
            <div className="w-full lg:w-[400px] bg-slate-50 p-8 md:p-12 space-y-12">
              <h2 className="text-2xl font-bold text-text-primary">
                {t("infoTitle")}
              </h2>

              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 border border-border">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-button-primary text-xl"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">
                      {t("address")}
                    </h3>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 border border-border">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-button-secondary text-xl"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">
                      {t("phone")}
                    </h3>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 border border-border">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-button-primary text-xl"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">
                      {t("emailInfo")}
                    </h3>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 border border-border">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-button-secondary text-xl"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">
                      {t("hours")}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {t("hoursDetail")}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

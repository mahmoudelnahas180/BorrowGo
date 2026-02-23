"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = () => {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border mt-12 py-12 text-slate-400">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Description */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-button-primary">
              {/* Using Logo from Header if possible, otherwise text */}
              BorrowGo
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("description")}
            </p>
            <div className="flex gap-4 rtl:flex-row-reverse">
              <Link
                href="#"
                className="text-text-muted hover:text-button-primary transition-colors"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </Link>
              <Link
                href="#"
                className="text-text-muted hover:text-button-primary transition-colors"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </Link>
              <Link
                href="#"
                className="text-text-muted hover:text-button-primary transition-colors"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </Link>
              <Link
                href="#"
                className="text-text-muted hover:text-button-primary transition-colors"
                aria-label="Linkedin"
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-6">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-text-secondary hover:text-button-primary transition-colors"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-secondary hover:text-button-primary transition-colors"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-secondary hover:text-button-primary transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-6">
              {t("categories")}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-text-secondary hover:text-button-primary transition-colors"
                >
                  {t("heavyEquipment")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-secondary hover:text-button-primary transition-colors"
                >
                  {t("tools")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-6">
              {t("contactUs")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 rtl:flex-row-reverse text-text-secondary">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-button-primary w-5"
                />
                <span>{t("email")}</span>
              </li>
              <li className="flex items-center gap-3 rtl:flex-row-reverse text-text-secondary">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-button-primary w-5"
                />
                <span>{t("phone")}</span>
              </li>
              <li className="flex items-center gap-3 rtl:flex-row-reverse text-text-secondary">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-button-primary w-5"
                />
                <span>{t("address")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-12 pt-8 text-center text-text-muted text-sm">
          <p>{t("copyright", { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

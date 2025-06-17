"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Language = "en" | "fi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    "header.letsTalk": "Let's Talk",

    // Hero Section
    "hero.online": "Online",
    "hero.title": "The Era of AI is Here",
    "hero.subtitle": "Envaire helps you master it",
    "hero.description":
      "We're a global collective of AI innovators, empowering you to leverage AI in ways that transform your business - no complexity; just elegant, value-driven solutions.",
    "hero.bookMeeting": "Book a Meeting",
    "hero.technologies": "Our core technologies",

    // Navigation
    "nav.services": "Services",
    "nav.process": "Process",

    // Services Section
    "services.title": "Our AI Services",
    "services.description":
      "Cutting-edge AI solutions designed to transform your business operations with security and efficiency at the forefront.",
    "services.automation.title": "Custom AI Automations",
    "services.automation.description":
      "Streamline your workflows with intelligent automation that learns and adapts to your business processes.",
    "services.automation.benefit1": "Reduce manual tasks by 80%",
    "services.automation.benefit2": "24/7 automated operations",
    "services.automation.benefit3": "Seamless integration with existing systems",
    "services.security.title": "Enterprise-Grade Security",
    "services.security.description":
      "Self-hosted solutions that keep your data secure within your infrastructure, meeting the highest compliance standards.",
    "services.security.benefit1": "Complete data sovereignty",
    "services.security.benefit2": "GDPR & SOC2 compliant",
    "services.security.benefit3": "Zero third-party data sharing",
    "services.voice.title": "Voice AI Agents",
    "services.voice.description":
      "Natural conversation AI that handles customer inquiries, support calls, and voice-based interactions with human-like quality.",
    "services.voice.benefit1": "Natural speech processing",
    "services.voice.benefit2": "Multi-language support",
    "services.voice.benefit3": "Real-time conversation handling",
    "services.text.title": "Text AI Agents",
    "services.text.description":
      "Intelligent chatbots and text processors that understand context, maintain conversation flow, and provide accurate responses.",
    "services.text.benefit1": "Context-aware responses",
    "services.text.benefit2": "Multi-channel deployment",
    "services.text.benefit3": "Advanced NLP capabilities",

    // CTA Sections
    "cta1.title": "Ready to Transform Your Business?",
    "cta1.description":
      "Let's assess your current workflows and identify the perfect AI automation opportunities for your business.",
    "cta1.button": "Get Assessed",
    "cta2.title": "Start Your AI Journey Today",
    "cta2.description": "Book a consultation to begin your three-step transformation with our proven process.",
    "cta2.button": "Get Assessed",

    // Process Section
    "process.title": "Our Process",
    "process.description":
      "A proven three-step approach that ensures successful AI implementation from concept to deployment.",
    "process.assess.title": "Assess",
    "process.assess.description":
      "We analyze your current workflows and identify automation opportunities that deliver maximum ROI.",
    "process.assess.detail1": "Business process mapping",
    "process.assess.detail2": "Technical requirements analysis",
    "process.assess.detail3": "ROI calculation",
    "process.assess.detail4": "Timeline planning",
    "process.demos.title": "Build Demos",
    "process.demos.description":
      "We create working prototypes that demonstrate the AI solution's capabilities with your actual data.",
    "process.demos.detail1": "Rapid prototyping",
    "process.demos.detail2": "Real data integration",
    "process.demos.detail3": "User experience testing",
    "process.demos.detail4": "Stakeholder feedback",
    "process.deploy.title": "Deploy",
    "process.deploy.description":
      "We implement the full solution with comprehensive training and ongoing support for your team.",
    "process.deploy.detail1": "Production deployment",
    "process.deploy.detail2": "Team training",
    "process.deploy.detail3": "Performance monitoring",
    "process.deploy.detail4": "Continuous optimization",

    // Booking Modal
    "booking.title": "Book a Meeting with Envaire",
    "booking.subtitle": "Schedule a consultation to discuss how AI can transform your business",
    "booking.selectDate": "Select Date",
    "booking.selectTime": "Select Time",
    "booking.chooseTime": "Choose a time slot",
    "booking.fullName": "Full Name",
    "booking.enterName": "Enter your full name",
    "booking.email": "Email Address",
    "booking.enterEmail": "Enter your email address",
    "booking.company": "Company",
    "booking.enterCompany": "Enter your company name",
    "booking.message": "Message (Optional)",
    "booking.messagePlaceholder": "Tell us about your AI automation needs...",
    "booking.cancel": "Cancel",
    "booking.bookMeeting": "Book Meeting",
    "booking.summary": "Meeting Summary",

    // Footer
    "footer.businessId": "Business ID",
  },
  fi: {
    // Header
    "header.letsTalk": "Keskustellaan",

    // Hero Section
    "hero.online": "Verkossa",
    "hero.title": "Tekoälyn aikakausi on täällä",
    "hero.subtitle": "Envaire auttaa sinua hallitsemaan sen",
    "hero.description":
      "Olemme maailmanlaajuinen tekoälyinnovaattoreiden kollektiivi, joka valtuuttaa sinut hyödyntämään tekoälyä tavoilla, jotka muuttavat liiketoimintaasi - ei monimutkaisuutta; vain elegantit, arvoa tuottavat ratkaisut.",
    "hero.bookMeeting": "Varaa tapaaminen",
    "hero.technologies": "Ydinteknologiamme",

    // Navigation
    "nav.services": "Palvelut",
    "nav.process": "Prosessi",

    // Services Section
    "services.title": "Tekoälypalvelumme",
    "services.description":
      "Huippuluokan tekoälyratkaisut, jotka on suunniteltu muuttamaan liiketoimintaasi turvallisuuden ja tehokkuuden ollessa etusijalla.",
    "services.automation.title": "Räätälöidyt tekoälyautomaatiot",
    "services.automation.description":
      "Virtaviivaista työnkulkujasi älykkäällä automaatiolla, joka oppii ja mukautuu liiketoimintaprosesseihisi.",
    "services.automation.benefit1": "Vähennä manuaalisia tehtäviä 80%",
    "services.automation.benefit2": "24/7 automaattiset toiminnot",
    "services.automation.benefit3": "Saumaton integraatio olemassa oleviin järjestelmiin",
    "services.security.title": "Yritystason turvallisuus",
    "services.security.description":
      "Itse isännöidyt ratkaisut, jotka pitävät tietosi turvassa infrastruktuurissasi ja täyttävät korkeimmat vaatimustenmukaisuusstandardit.",
    "services.security.benefit1": "Täydellinen tietojen hallinta",
    "services.security.benefit2": "GDPR ja SOC2 yhteensopiva",
    "services.security.benefit3": "Ei kolmannen osapuolen tietojen jakamista",
    "services.voice.title": "Ääni-tekoälyagentit",
    "services.voice.description":
      "Luonnollinen keskustelu-tekoäly, joka käsittelee asiakaskyselyjä, tukipuheluita ja äänipohjaisia vuorovaikutuksia ihmismäisellä laadulla.",
    "services.voice.benefit1": "Luonnollinen puheen käsittely",
    "services.voice.benefit2": "Monikielinen tuki",
    "services.voice.benefit3": "Reaaliaikainen keskustelun käsittely",
    "services.text.title": "Teksti-tekoälyagentit",
    "services.text.description":
      "Älykkäät chatbotit ja tekstinkäsittelijät, jotka ymmärtävät kontekstin, ylläpitävät keskustelun kulkua ja antavat tarkkoja vastauksia.",
    "services.text.benefit1": "Kontekstitietoiset vastaukset",
    "services.text.benefit2": "Monikanavainen käyttöönotto",
    "services.text.benefit3": "Edistyneet NLP-ominaisuudet",

    // CTA Sections
    "cta1.title": "Valmis muuttamaan liiketoimintaasi?",
    "cta1.description":
      "Arvioidaan nykyiset työnkulkusi ja tunnistetaan täydelliset tekoälyautomaatiomahdollisuudet liiketoiminnallesi.",
    "cta1.button": "Hanki arviointi",
    "cta2.title": "Aloita tekoälymatkasi tänään",
    "cta2.description": "Varaa konsultaatio aloittaaksesi kolmivaiheisen muutoksesi todistetulla prosessillamme.",
    "cta2.button": "Hanki arviointi",

    // Process Section
    "process.title": "Prosessimme",
    "process.description":
      "Todistettu kolmivaiheinen lähestymistapa, joka varmistaa onnistuneen tekoälyn käyttöönoton konseptista käyttöönottoon.",
    "process.assess.title": "Arviointi",
    "process.assess.description":
      "Analysoimme nykyiset työnkulkusi ja tunnistamme automaatiomahdollisuudet, jotka tuottavat maksimaalisen sijoitetun pääoman tuoton.",
    "process.assess.detail1": "Liiketoimintaprosessien kartoitus",
    "process.assess.detail2": "Teknisten vaatimusten analyysi",
    "process.assess.detail3": "ROI-laskenta",
    "process.assess.detail4": "Aikataulun suunnittelu",
    "process.demos.title": "Demojen rakentaminen",
    "process.demos.description":
      "Luomme toimivia prototyyppejä, jotka osoittavat tekoälyratkaisun kyvyt todellisilla tiedoillasi.",
    "process.demos.detail1": "Nopea prototyyppien kehitys",
    "process.demos.detail2": "Todellisten tietojen integrointi",
    "process.demos.detail3": "Käyttökokemuksen testaus",
    "process.demos.detail4": "Sidosryhmien palaute",
    "process.deploy.title": "Käyttöönotto",
    "process.deploy.description":
      "Toteutamme täydellisen ratkaisun kattavalla koulutuksella ja jatkuvalla tuella tiimillesi.",
    "process.deploy.detail1": "Tuotantokäyttöönotto",
    "process.deploy.detail2": "Tiimin koulutus",
    "process.deploy.detail3": "Suorituskyvyn seuranta",
    "process.deploy.detail4": "Jatkuva optimointi",

    // Booking Modal
    "booking.title": "Varaa tapaaminen Envairen kanssa",
    "booking.subtitle": "Ajoita konsultaatio keskustellaksesi siitä, miten tekoäly voi muuttaa liiketoimintaasi",
    "booking.selectDate": "Valitse päivämäärä",
    "booking.selectTime": "Valitse aika",
    "booking.chooseTime": "Valitse aikavälisi",
    "booking.fullName": "Koko nimi",
    "booking.enterName": "Syötä koko nimesi",
    "booking.email": "Sähköpostiosoite",
    "booking.enterEmail": "Syötä sähköpostiosoitteesi",
    "booking.company": "Yritys",
    "booking.enterCompany": "Syötä yrityksesi nimi",
    "booking.message": "Viesti (Valinnainen)",
    "booking.messagePlaceholder": "Kerro meille tekoälyautomaatiotarpeistasi...",
    "booking.cancel": "Peruuta",
    "booking.bookMeeting": "Varaa tapaaminen",
    "booking.summary": "Tapaamisen yhteenveto",

    // Footer
    "footer.businessId": "Y-tunnus",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

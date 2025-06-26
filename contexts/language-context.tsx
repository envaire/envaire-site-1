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
    "footer.termsOfService": "Terms of Service",
    "footer.privacyPolicy": "Privacy Policy",

    // Terms of Service
    "terms.title": "Terms of Service",
    "terms.lastUpdated": "Last Updated: June 25, 2025",
    "terms.backToHome": "Back to Home",
    "terms.welcome":
      'Welcome to Envaire.com ("we," "us," or "our"). These Terms of Service ("Terms") apply to your use of our website and booking services.',
    "terms.section1.title": "1. Use of Website",
    "terms.section1.content":
      "Our website provides information about our AI automation services and allows you to book consultation calls by submitting your contact details and service requests.",
    "terms.section2.title": "2. Booking Calls",
    "terms.section2.content":
      "By submitting a booking request, you agree to provide accurate and complete information. We will use this information solely to contact you and discuss your needs.",
    "terms.section3.title": "3. No Sale of Goods or Services on Site",
    "terms.section3.content":
      "Our website does not sell products or services directly. All arrangements for services occur separately during or after consultation.",
    "terms.section4.title": "4. Project Acceptance",
    "terms.section4.content":
      "At Envaire, we carefully assess every project inquiry to ensure we can deliver high-quality, effective AI automation solutions. We only proceed with projects that align with our expertise and resources to guarantee the best outcomes for our clients. This helps us maintain a high standard of service and avoid commitments that may not be feasible.",
    "terms.section5.title": "5. User Conduct",
    "terms.section5.content":
      "You agree not to misuse our website or provide false information. We reserve the right to refuse or cancel bookings at our discretion.",
    "terms.section6.title": "6. Privacy",
    "terms.section6.content":
      "Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your data.",
    "terms.section7.title": "7. Changes to Terms",
    "terms.section7.content":
      "We may update these Terms at any time. Continued use of the website means you accept any changes.",
    "terms.contact.title": "Contact",
    "terms.contact.content": "Questions? Contact us at",

    // Privacy Policy
    "privacy.title": "Privacy Policy",
    "privacy.lastUpdated": "Last Updated: June 25, 2025",
    "privacy.backToHome": "Back to Home",
    "privacy.welcome":
      "At Envaire, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.",
    "privacy.section1.title": "Information We Collect",
    "privacy.section1.content":
      "When you use our website or book a consultation, we may collect the following information:",
    "privacy.section1.item1": "Name and contact information (email, phone number)",
    "privacy.section1.item2": "Company name and business information",
    "privacy.section1.item3": "Messages and communications you send to us",
    "privacy.section1.item4": "Technical information such as IP address and browser type",
    "privacy.section2.title": "How We Use Your Information",
    "privacy.section2.content": "We use the information we collect for the following purposes:",
    "privacy.section2.item1": "To respond to your inquiries and schedule consultations",
    "privacy.section2.item2": "To provide and improve our AI automation services",
    "privacy.section2.item3": "To communicate with you about our services and updates",
    "privacy.section3.title": "Data Sharing",
    "privacy.section3.content":
      "We do not sell, trade, or share your personal information with third parties except as necessary to provide our services or as required by law. Your data remains confidential and is only used for the purposes outlined in this policy.",
    "privacy.section4.title": "Data Retention",
    "privacy.section4.content":
      "We retain your personal information only as long as necessary to fulfill the purposes for which it was collected or as required by applicable laws. You may request deletion of your data at any time by contacting us.",
    "privacy.section5.title": "Security Measures",
    "privacy.section5.content": "Our team implements strong security measures:",
    "privacy.section5.item1": "Data transfer encryption according to industry standards",
    "privacy.section5.item2": "Secure development practices",
    "privacy.section5.item3": "Regular security assessments",
    "privacy.contact.title": "Contact Information",
    "privacy.contact.content": "If you have any questions related to data protection, please contact:",
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
    "footer.termsOfService": "Käyttöehdot",
    "footer.privacyPolicy": "Tietosuojakäytäntö",

    // Terms of Service
    "terms.title": "Käyttöehdot",
    "terms.lastUpdated": "Viimeksi päivitetty: 25. kesäkuuta 2025",
    "terms.backToHome": "Takaisin etusivulle",
    "terms.welcome":
      'Tervetuloa Envaire.com-sivustolle ("me", "meidän" tai "meidät"). Nämä käyttöehdot ("Ehdot") koskevat verkkosivustomme ja varauspalveluidemme käyttöä.',
    "terms.section1.title": "1. Verkkosivuston käyttö",
    "terms.section1.content":
      "Verkkosivustomme tarjoaa tietoa tekoälyautomaatiopalveluistamme ja mahdollistaa konsultaatiopuhelujen varaamisen lähettämällä yhteystietosi ja palvelupyynnöt.",
    "terms.section2.title": "2. Puhelujen varaaminen",
    "terms.section2.content":
      "Lähettämällä varauspyynnön sitoudut antamaan tarkkoja ja täydellisiä tietoja. Käytämme näitä tietoja ainoastaan ottaaksemme sinuun yhteyttä ja keskustellaksemme tarpeistasi.",
    "terms.section3.title": "3. Ei tuotteiden tai palveluiden myyntiä sivustolla",
    "terms.section3.content":
      "Verkkosivustomme ei myy tuotteita tai palveluita suoraan. Kaikki palvelujärjestelyt tapahtuvat erikseen konsultaation aikana tai sen jälkeen.",
    "terms.section4.title": "4. Projektin hyväksyminen",
    "terms.section4.content":
      "Envairessa arvioimme huolellisesti jokaisen projektikyselyn varmistaaksemme, että voimme toimittaa korkealaatuisia, tehokkaita tekoälyautomaatioratkaisuja. Jatkamme vain projektien kanssa, jotka sopivat asiantuntemukseemme ja resursseihin taataksemme parhaat tulokset asiakkaillemme. Tämä auttaa meitä ylläpitämään korkeaa palvelutasoa ja välttämään sitoumuksia, jotka eivät ehkä ole toteutettavissa.",
    "terms.section5.title": "5. Käyttäjän käyttäytyminen",
    "terms.section5.content":
      "Sitoudut olemaan väärinkäyttämättä verkkosivustoamme tai antamatta vääriä tietoja. Pidätämme oikeuden kieltäytyä tai peruuttaa varauksia harkintamme mukaan.",
    "terms.section6.title": "6. Yksityisyys",
    "terms.section6.content":
      "Yksityisyytesi on meille tärkeää. Tutustu tietosuojakäytäntöömme ymmärtääksesi, miten keräämme ja käytämme tietojasi.",
    "terms.section7.title": "7. Ehtojen muutokset",
    "terms.section7.content":
      "Voimme päivittää näitä ehtoja milloin tahansa. Verkkosivuston jatkuva käyttö tarkoittaa, että hyväksyt mahdolliset muutokset.",
    "terms.contact.title": "Yhteystiedot",
    "terms.contact.content": "Kysymyksiä? Ota yhteyttä osoitteeseen",

    // Privacy Policy
    "privacy.title": "Tietosuojakäytäntö",
    "privacy.lastUpdated": "Viimeksi päivitetty: 25. kesäkuuta 2025",
    "privacy.backToHome": "Takaisin etusivulle",
    "privacy.welcome":
      "Envairessa olemme sitoutuneet suojelemaan yksityisyyttäsi ja varmistamaan henkilötietojesi turvallisuuden. Tämä tietosuojakäytäntö selittää, miten keräämme, käytämme ja suojaamme tietojasi, kun käytät verkkosivustoamme ja palveluitamme.",
    "privacy.section1.title": "Keräämämme tiedot",
    "privacy.section1.content":
      "Kun käytät verkkosivustoamme tai varaat konsultaation, voimme kerätä seuraavia tietoja:",
    "privacy.section1.item1": "Nimi ja yhteystiedot (sähköposti, puhelinnumero)",
    "privacy.section1.item2": "Yrityksen nimi ja liiketoimintatiedot",
    "privacy.section1.item3": "Viestit ja viestintä, jonka lähetät meille",
    "privacy.section1.item4": "Tekniset tiedot, kuten IP-osoite ja selaintyyppi",
    "privacy.section2.title": "Miten käytämme tietojasi",
    "privacy.section2.content": "Käytämme keräämiämme tietoja seuraaviin tarkoituksiin:",
    "privacy.section2.item1": "Vastataksemme kyselyihisi ja aikatauluttaaksemme konsultaatioita",
    "privacy.section2.item2": "Tarjotaksemme ja parantaaksemme tekoälyautomaatiopalveluitamme",
    "privacy.section2.item3": "Kommunikoidaksemme kanssasi palveluistamme ja päivityksistä",
    "privacy.section3.title": "Tietojen jakaminen",
    "privacy.section3.content":
      "Emme myy, vaihda tai jaa henkilötietojasi kolmansille osapuolille, paitsi tarvittaessa palveluidemme tarjoamiseksi tai lain vaatimana. Tietosi pysyvät luottamuksellisina ja niitä käytetään vain tässä käytännössä määriteltyihin tarkoituksiin.",
    "privacy.section4.title": "Tietojen säilyttäminen",
    "privacy.section4.content":
      "Säilytämme henkilötietojasi vain niin kauan kuin on tarpeen niiden keräämisen tarkoitusten täyttämiseksi tai sovellettavien lakien vaatimana. Voit pyytää tietojesi poistamista milloin tahansa ottamalla meihin yhteyttä.",
    "privacy.section5.title": "Turvatoimet",
    "privacy.section5.content": "Tiimimme toteuttaa vahvoja turvatoimia:",
    "privacy.section5.item1": "Tiedonsiirron salaus alan standardien mukaisesti",
    "privacy.section5.item2": "Turvalliset kehityskäytännöt",
    "privacy.section5.item3": "Säännölliset turvallisuusarvioinnit",
    "privacy.contact.title": "Yhteystiedot",
    "privacy.contact.content": "Jos sinulla on kysymyksiä tietosuojaan liittyen, ota yhteyttä:",
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

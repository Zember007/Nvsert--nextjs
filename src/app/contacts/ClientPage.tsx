import ContactsPageView from './ContactsPageView';

export type StrapiMedia = {
  url?: string;
  width?: number;
  height?: number;
  alternativeText?: string;
  name?: string;
};

export type ContactsOffice = {
  city: string;
  address: string;
  phones?: Array<{ value: string }> | string[];
  email?: string;
  image?: StrapiMedia;
};

export type ContactsFeatureCard = {
  title: string;
  text: string;
};

export type ContactsConnectSection = {
  spoilerTitle: string;
  heading: string;
  description: string;
  consultationTitle: string;
  consultationText: string;
  consultationButtonLabel: string;
  consultationImage?: StrapiMedia;
  featureCards?: ContactsFeatureCard[];
};

export type ContactsLegalDetails = {
  fullName: string;
  shortName?: string;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  legalAddress?: string;
  director?: string;
  chiefAccountant?: string;
  accountNumber?: string;
  bank?: string;
  bik?: string;
  corrAccount?: string;
  phone?: string;
  email?: string;
};

export type ContactsRequisitesSection = {
  spoilerTitle: string;
  heading: string;
  description: string;
  downloadButtonLabel: string;
  pdfUrl: string;
  legal: ContactsLegalDetails;
  image?: StrapiMedia;
};

export type ContactsSeo = {
  metaTitle: string;
  metaDescription: string;
  shareImage?: StrapiMedia;
};

export type ContactsRequisitesLabels = {
  fullName: string;
  legalAddress: string;
  inn: string;
  ogrn: string;
  director: string;
  email: string;
};

export type ContactsPageData = {
  title: string;
  intro: string;
  offices?: ContactsOffice[];
  connectSection: ContactsConnectSection;
  requisitesSection: ContactsRequisitesSection;
  seo?: ContactsSeo;
};

export default ContactsPageView;

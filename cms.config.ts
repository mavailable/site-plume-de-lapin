import type { CmsConfig } from './cms.types';

const cmsConfig: CmsConfig = {
  repo: 'mavailable/site-plume-de-lapin',
  branch: 'master',
  siteName: 'Plume de Lapin',

  singletons: {
    'site-info': {
      label: 'Infos du site',
      description: 'Nom, telephone, email, horaires',
      path: 'src/content/site-info/index.json',
      fields: {
        name: { type: 'text', label: 'Nom commercial' },
        phone: { type: 'text', label: 'Telephone' },
        email: { type: 'text', label: 'Email' },
        address: { type: 'text', label: 'Adresse' },
        postalCode: { type: 'text', label: 'Code postal' },
        city: { type: 'text', label: 'Ville' },
        openingHours: { type: 'text', label: 'Horaires d\'ouverture', multiline: true },
      },
    },

    hero: {
      label: 'Hero',
      description: 'Titre, sous-titre et boutons d\'appel a l\'action',
      path: 'src/content/hero/index.json',
      fields: {
        title: { type: 'text', label: 'Titre H1' },
        subtitle: { type: 'text', label: 'Sous-titre', multiline: true },
        ctaText: { type: 'text', label: 'CTA principal — texte' },
        ctaLink: { type: 'text', label: 'CTA principal — lien' },
        ctaSecondaryText: { type: 'text', label: 'CTA secondaire — texte' },
        ctaSecondaryLink: { type: 'text', label: 'CTA secondaire — lien' },
        reassurance: { type: 'text', label: 'Reassurance' },
      },
    },

    about: {
      label: 'A propos',
      description: 'Histoire de Sandra et Gaylord',
      path: 'src/content/about/index.json',
      fields: {
        directorName: { type: 'text', label: 'Nom des fondateurs' },
        tagline: { type: 'text', label: 'Tagline' },
        paragraph1: { type: 'text', label: 'Paragraphe 1', multiline: true },
        paragraph2: { type: 'text', label: 'Paragraphe 2', multiline: true },
        paragraph3: { type: 'text', label: 'Paragraphe 3', multiline: true },
        paragraph4: { type: 'text', label: 'Paragraphe 4', multiline: true },
        paragraph5: { type: 'text', label: 'Paragraphe 5', multiline: true },
        paragraph6: { type: 'text', label: 'Paragraphe 6', multiline: true },
      },
    },

    contact: {
      label: 'Contact',
      description: 'Section contact',
      path: 'src/content/contact/index.json',
      fields: {
        title: { type: 'text', label: 'Titre' },
        subtitle: { type: 'text', label: 'Sous-titre' },
        buttonText: { type: 'text', label: 'Texte du bouton' },
        web3formsKey: { type: 'text', label: 'Cle Web3Forms (formulaire)', description: 'Creez votre cle gratuite sur web3forms.com puis collez-la ici pour recevoir vos formulaires directement.' },
      },
    },
  },

  collections: {
    produits: {
      label: 'Produits',
      description: 'Catalogue de la ferme',
      path: 'src/content/produits',
      slugField: 'nom',
      labelField: 'nom',
      fields: {
        nom: { type: 'text', label: 'Nom du produit', required: true },
        photo: { type: 'image', label: 'Photo', description: 'Photo du produit' },
        prix: { type: 'number', label: 'Prix (euros)', required: true },
        categorie: {
          type: 'select',
          label: 'Categorie',
          required: true,
          options: [
            { label: 'Oeufs fermiers', value: 'oeufs' },
            { label: 'Volailles entieres', value: 'volailles' },
            { label: 'Lapin', value: 'lapin' },
          ],
        },
        description: { type: 'text', label: 'Description', multiline: true, required: true },
        disponible: {
          type: 'select',
          label: 'Disponible',
          options: [
            { label: 'Oui', value: 'true' },
            { label: 'Non', value: 'false' },
          ],
          defaultValue: 'true',
        },
        ordre: { type: 'number', label: 'Ordre d\'affichage', defaultValue: 0 },
      },
    },

    services: {
      label: 'Categories de produits',
      description: 'Oeufs, volailles, lapin',
      path: 'src/content/services',
      slugField: 'title',
      labelField: 'title',
      fields: {
        title: { type: 'text', label: 'Titre', required: true },
        shortDesc: { type: 'text', label: 'Description courte', multiline: true },
        description: { type: 'text', label: 'Description complete', multiline: true, required: true },
        image: { type: 'image', label: 'Image' },
        order: { type: 'number', label: 'Ordre', defaultValue: 0 },
      },
    },

    testimonials: {
      label: 'Temoignages',
      description: 'Avis et retours clients',
      path: 'src/content/testimonials',
      slugField: 'name',
      labelField: 'name',
      fields: {
        name: { type: 'text', label: 'Nom du client', required: true },
        context: { type: 'text', label: 'Contexte (ex: Cliente a la ferme)', required: true },
        quote: { type: 'text', label: 'Citation', multiline: true, required: true },
        order: { type: 'number', label: 'Ordre', defaultValue: 0 },
      },
    },

    faq: {
      label: 'FAQ',
      description: 'Questions frequentes',
      path: 'src/content/faq',
      slugField: 'question',
      labelField: 'question',
      fields: {
        question: { type: 'text', label: 'Question', required: true },
        answer: { type: 'text', label: 'Reponse', multiline: true, required: true },
        order: { type: 'number', label: 'Ordre', defaultValue: 0 },
      },
    },
  },
};

export default cmsConfig;

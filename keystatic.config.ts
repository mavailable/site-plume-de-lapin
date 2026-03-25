import { config, fields, singleton, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'cloud' },
  cloud: { project: 'web-factory/plume-de-lapin' },

  singletons: {
    siteInfo: singleton({
      label: 'Informations générales',
      path: 'src/content/site-info/index',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Nom commercial' }),
        phone: fields.text({ label: 'Téléphone' }),
        email: fields.text({ label: 'Email' }),
        address: fields.text({ label: 'Adresse' }),
        postalCode: fields.text({ label: 'Code postal' }),
        city: fields.text({ label: 'Ville' }),
        openingHours: fields.text({ label: 'Horaires d\'ouverture', multiline: true }),
      },
    }),

    hero: singleton({
      label: 'Section Hero',
      path: 'src/content/hero/index',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Titre (H1)' }),
        subtitle: fields.text({ label: 'Sous-titre', multiline: true }),
        ctaText: fields.text({ label: 'Texte bouton principal' }),
        ctaLink: fields.text({ label: 'Lien bouton principal' }),
        ctaSecondaryText: fields.text({ label: 'Texte bouton secondaire' }),
        ctaSecondaryLink: fields.text({ label: 'Lien bouton secondaire' }),
        reassurance: fields.text({ label: 'Texte de réassurance' }),
      },
    }),

    about: singleton({
      label: 'Section À Propos',
      path: 'src/content/about/index',
      format: { data: 'json' },
      schema: {
        directorName: fields.text({ label: 'Nom des fondateurs' }),
        tagline: fields.text({ label: 'Tagline' }),
        paragraph1: fields.text({ label: 'Paragraphe 1', multiline: true }),
        paragraph2: fields.text({ label: 'Paragraphe 2', multiline: true }),
        paragraph3: fields.text({ label: 'Paragraphe 3', multiline: true }),
        paragraph4: fields.text({ label: 'Paragraphe 4', multiline: true }),
        paragraph5: fields.text({ label: 'Paragraphe 5', multiline: true }),
        paragraph6: fields.text({ label: 'Paragraphe 6', multiline: true }),
      },
    }),

    contact: singleton({
      label: 'Section Contact',
      path: 'src/content/contact/index',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Titre' }),
        subtitle: fields.text({ label: 'Sous-titre' }),
        buttonText: fields.text({ label: 'Texte du bouton' }),
      },
    }),
  },

  collections: {
    services: collection({
      label: 'Catégories de produits',
      slugField: 'title',
      path: 'src/content/services/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Titre' } }),
        shortDesc: fields.text({ label: 'Description courte', multiline: true }),
        description: fields.text({ label: 'Description complète', multiline: true }),
        image: fields.text({ label: 'Chemin de l\'image' }),
        order: fields.integer({ label: 'Ordre d\'affichage', defaultValue: 0 }),
      },
    }),

    testimonials: collection({
      label: 'Témoignages',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Nom du client' } }),
        context: fields.text({ label: 'Contexte (ex: Cliente à la ferme)' }),
        quote: fields.text({ label: 'Citation', multiline: true }),
        order: fields.integer({ label: 'Ordre d\'affichage', defaultValue: 0 }),
      },
    }),

    faq: collection({
      label: 'Questions fréquentes',
      slugField: 'question',
      path: 'src/content/faq/*',
      format: { data: 'json' },
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        answer: fields.text({ label: 'Réponse', multiline: true }),
        order: fields.integer({ label: 'Ordre d\'affichage', defaultValue: 0 }),
      },
    }),

    produits: collection({
      label: 'Produits',
      slugField: 'nom',
      path: 'src/content/produits/*',
      format: { data: 'json' },
      schema: {
        nom: fields.slug({ name: { label: 'Nom du produit' } }),
        photo: fields.image({
          label: 'Photo',
          directory: 'public/images/produits',
          publicPath: '/images/produits/',
        }),
        prix: fields.number({ label: 'Prix (€)', validation: { min: 0 } }),
        categorie: fields.select({
          label: 'Catégorie',
          options: [
            { label: 'Œufs fermiers', value: 'oeufs' },
            { label: 'Volailles entières', value: 'volailles' },
            { label: 'Lapin', value: 'lapin' },
          ],
          defaultValue: 'oeufs',
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        disponible: fields.checkbox({ label: 'Disponible', defaultValue: true }),
        ordre: fields.number({ label: "Ordre d'affichage", defaultValue: 0 }),
      },
    }),
  },
});

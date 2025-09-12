// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ErciApps',
  tagline: 'La informática en divertida',
  favicon: 'img/favicon.ico',

  future: { v4: true },

  url: 'https://si-erciapps.sytes.net',
  baseUrl: '/',

  organizationName: 'erciapps',
  projectName: 'si-docu',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
        //  editUrl:
        //    'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
        //  editUrl:
        //    'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: { customCss: './src/css/custom.css' },
      }),
    ],
  ],

  // 👉 Alias para que 'react-player' sea la versión lazy (no rompe SSR)
  plugins: [
    function aliasReactPlayer() {
      return {
        name: 'alias-react-player-lazy',
        configureWebpack() {
          return {
            resolve: {
              alias: {
                'react-player': require.resolve('react-player/lazy'),
              },
            },
          };
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Sistemas Informáticos',
        logo: { alt: 'My Site Logo', src: 'img/si.png' },
        items: [
          { to: '/', label: 'Inicio', position: 'left' },
          { to: '/docs/category/hardware', label: 'Hardware', position: 'left' },
          //{
          //  href: 'https://github.com/facebook/docusaurus',
          //  label: 'GitHub',
          //  position: 'right',
         // },
        ],
      },
      footer: {
        style: 'dark',
        /*links: [
          {
            title: 'Docs',
            items: [{ label: 'Tutorial', to: '/docs/intro' },
              { label: 'Inicio', to: 'https://ddi-docu.sytes.net' }
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/docusaurus' },
              { label: 'Discord', href: 'https://discordapp.com/invite/docusaurus' },
              { label: 'X', href: 'https://x.com/docusaurus' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'Blog', to: '/blog' },
              { label: 'GitHub', href: 'https://github.com/facebook/docusaurus' },
            ],
          },
        ],*/
        copyright: `Copyright © ${new Date().getFullYear()} ErciApps`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['java','csharp','bash','json','python'],
      },
      zoom: {
        selector: '.markdown :not(em) > img',
        background: { light: 'rgb(255, 255, 255)', dark: 'rgb(50, 50, 50)' },
        config: { /* opciones medium-zoom si quieres */ },
      },
    }),
};

export default config;

// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ErciApps',
  tagline: 'La informática es divertida',
  favicon: 'img/favicon.ico',

  future: { v4: true },

  url: 'https://si-erciapps.sytes.net',
  baseUrl: '/',

  organizationName: 'erciapps',
  projectName: 'si-docu',
  trailingSlash: false,
  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    // 🖼️ Imágenes optimizadas y zoom
    '@docusaurus/plugin-ideal-image',
    'docusaurus-plugin-image-zoom',

    // ⚙️ React Player en modo lazy
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

    // 🎨 TailwindCSS + Autoprefixer
    function tailwindPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(tailwindcss);
          postcssOptions.plugins.push(autoprefixer);
          return postcssOptions;
        },
      };
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: { sidebarPath: './sidebars.js' },
        blog: { showReadingTime: true },
        theme: { customCss: require.resolve('./src/css/custom.css') },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      logo: {
        alt: 'ErciApps',
        src: 'img/ercilogo.png',
        href: 'https://erciapps.sytes.net',
        height: 40,
        width: 40,
      },
      items: [
        { to: '/', label: 'Inicio', position: 'left' },
        { to: '/docs/category/hardware', label: 'Hardware', position: 'left' },
        { to: '/docs/category/sistemas-operativos', label: 'S.O', position: 'left' },
       
        {
        label: 'Linux',
        to:'/docs/category/linux',
        position: 'left',
        items: [
          {
            label: 'Bash',
            to: '/docs/category/bash',
          },
          {
            label: 'Python',
            to: '/docs/category/python',
          },
          {
            label: 'Videos',
            to: '/docs/linux/videos',
          },
        ],
      },
        /* {
        label: 'Gestión',
        to:'/docs/category/servicios-y-procesos',
        position: 'left',
        items: [
          {
            label: 'Procesos',
            to: '/docs/servicios/procesos1',
          },
          {
            label: 'Tareas',
            to: '/docs/category/tareas',
          },
          {
            label: 'Servicios',
            to: '/docs/category/servicios',
          },
        ],
      }, */
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} ErciApps`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'bash', 'python', 'csharp', 'json'],
    },
    zoom: {
      selector: '.markdown img, .markdown picture img',
      background: {
        light: 'rgb(255,255,255)',
        dark: 'rgb(50,50,50)',
      },
    },
  },

  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
  ],
};

export default config;

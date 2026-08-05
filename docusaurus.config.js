// @ts-check
// Configuração do site do curso (Docusaurus 3, MDX + Mermaid).
// Publicação: GitHub Pages via GitHub Actions.

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Curso de Claude e Claude Code',
  tagline: 'Do básico ao avançado — para quem nunca programou',
  favicon: 'img/favicon.ico',

  // URL de produção do site e caminho base (GitHub Pages).
  url: 'https://junior-aguiar-eng.github.io',
  baseUrl: '/claude-curso-do-basico-ao-avancado/',

  // Configuração do GitHub Pages para deploy.
  organizationName: 'junior-aguiar-eng',
  projectName: 'claude-curso-do-basico-ao-avancado',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  clientModules: ['./src/clientModules/fonts.js', './src/clientModules/cardGlow.js'],

  // Analytics mínimo, sem backend: GoatCounter (gratuito, sem cookies,
  // script único). Rastreia visualização de página automaticamente — cada
  // lição já é uma URL própria, então dá para ver em qual módulo o
  // aluno tende a parar. Ver "Analytics" no README para configurar o
  // site code e acessar o painel.
  scripts: [
    {
      src: '//gc.zgo.at/count.js',
      async: true,
      'data-goatcounter': 'https://SEU-CODIGO.goatcounter.com/count',
    },
  ],

  // Habilita diagramas Mermaid nas lições (```mermaid).
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // As lições são o site: docs na raiz, sem blog.
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Tema único, sempre escuro — parte da identidade visual do
      // curso (mockup aprovado), não uma preferência alternável.
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Curso de Claude',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'cursoSidebar',
            position: 'left',
            label: 'Lições',
          },
          {
            href: 'https://github.com/junior-aguiar-eng/claude-curso-do-basico-ao-avancado',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Curso de Claude e Claude Code — ${new Date().getFullYear()}.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

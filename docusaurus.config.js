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
        links: [
          {
            items: [
              {label: 'Sobre', to: '/sobre'},
            ],
          },
        ],
        copyright: `Curso de Claude e Claude Code — ${new Date().getFullYear()}.<br />
          © ${new Date().getFullYear()} <a href="https://github.com/junior-aguiar-eng" target="_blank" rel="noopener noreferrer">Nerdola Programador Jurídico</a>.
          Licenciado sob
          <a rel="license noopener noreferrer" href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" style="margin: 0 0.35rem;">CC BY-NC 4.0</a>
          <a rel="license noopener noreferrer" href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">
            <img alt="Licença Creative Commons Atribuição-NãoComercial 4.0" style="border-width:0;vertical-align:middle;margin-left:0.35rem;" src="https://licensebuttons.net/l/by-nc/4.0/88x31.png" />
          </a>.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

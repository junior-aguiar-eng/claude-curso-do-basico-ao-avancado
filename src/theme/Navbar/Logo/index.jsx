import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useThemeConfig} from '@docusaurus/theme-common';
import Mascote from '@site/src/components/Mascote';

/**
 * Swizzle de @theme/Navbar/Logo: substitui a imagem de logo padrão
 * (nenhuma estava configurada) pelo mascote real do curso, primeiro dos
 * três pontos de presença ampliada (ver também docs/intro.mdx e
 * ConclusaoBloco). Mantém o link para a home e o título do navbar
 * (themeConfig.navbar.title), igual ao componente original do
 * Docusaurus — só troca o slot de imagem.
 */
export default function NavbarLogo() {
  const {
    navbar: {title},
  } = useThemeConfig();
  const logoLink = useBaseUrl('/');

  return (
    <Link to={logoLink} className="navbar__brand">
      <div className="navbar__logo">
        <Mascote estagio={0} tamanho={26} />
      </div>
      {title != null && <b className="navbar__title text--truncate">{title}</b>}
    </Link>
  );
}

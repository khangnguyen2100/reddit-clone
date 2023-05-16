import createEmotionServer from '@emotion/server/create-instance';
import { AppType } from 'next/app';
import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import * as React from 'react';

import createEmotionCache from 'src/createEmotionCache';
import theme from 'src/theme';

import { MyAppProps } from './_app';

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang='en'>
      <Head>
        {/* PWA primary color */}
        <meta name='theme-color' content={theme.palette.primary.main} />
        <link rel='shortcut icon' href='/public/images/redditFace.svg' />
        <meta name='emotion-insertion-point' content='' />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>,
      ) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};

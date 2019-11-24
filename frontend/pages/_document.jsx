import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, lang: ctx.query.language };
  }

  render() {
    const { lang } = this.props;

    return (
      <Html className="antialiased" lang="pt-BR">
        <Head>
          <link
            href={
              "https://fonts.googleapis.com/css?family=Poppins:300,400,600,700,900&display=swap"
            }
            rel="stylesheet"
          />
        </Head>
        <body className="font-body text-brand-black">
          <Main />
          <NextScript />
          <div vw="true" className="enabled">
            <div vw-access-button="true" className="active"></div>
            <div vw-plugin-wrapper="true">
              <div className="vw-plugin-top-wrapper"></div>
            </div>
          </div>
          <script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `new window.VLibras.Widget('https://vlibras.gov.br/app');`
            }}
          />
        </body>
      </Html>
    );
  }
}

export default AppDocument;

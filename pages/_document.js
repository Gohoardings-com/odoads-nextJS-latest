import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel="icon" href="../imgs/favicon.png" />
  
        <Script strategy="lazyOnload" id="lazyOnload">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T6SRDVL');

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-26FJP78MV3');
          `}
        </Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-26FJP78MV3"
        ></Script>{" "}
        <Script
          strategy="lazyOnload"
          id="lazyOnload"
        >{` window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-KS1XHTW3YH'); `}</Script>
      </Head>

      <body>
        <Main />
        <NextScript />
        <Script
          id="googlemaps"
          type="text/javascript"
          strategy="lazyOnload"
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAYkchdPoe5HqvV7RhgrXdC81-d8Mo-uC0&libraries=places"
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T6SRDVL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
       
      </body>
    </Html>
  );
}

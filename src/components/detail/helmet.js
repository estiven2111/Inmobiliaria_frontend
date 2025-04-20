   <Helmet>
            <title>{`${property.tipo} en arriendo en ${property.ciudad}`}</title>
            <meta
              name="description"
              content={`${property.tipo} en arriendo en ${property.titulo} | ${property.ciudad} || ${property.observaciones}`}
            />
            {/* <link rel="canonical" href={shareUrl} />
            <link rel="canonical" href={shareUrl} /> */}
            <meta
              property="og:title"
              content={`${property.tipo} en arriendo en ${property.ciudad}`}
            />
            <meta
              property="og:description"
              content={`${property.tipo} en arriendo en ${property.titulo} | ${property.ciudad} || ${property.observaciones}`}
            />
            <meta
              property="og:image"
              content="https://staticw.s3.amazonaws.com/inmuebles/110151920230804120623.jpg"
            />
            <meta
              name="og:image:secure_url"
              property="og:image:secure_url"
              content="https://staticw.s3.amazonaws.com/inmuebles/110151920230804120623.jpg"
            />
            <meta
              name="og:image:type"
              property="og:image:type"
              content="image/jpg"
            />
            <meta
              name="og:image:alt"
              property="og:image:alt"
              content="Propiedad en arriendo online con Arriendalo"
            ></meta>
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta
              name="og:site_name"
              property="og:site_name"
              content="Arriendalo"
            />
            <meta
              property="og:image"
              content="https://staticw.s3.amazonaws.com/inmuebles/110151920230804120623.jpg"
            />
            <meta
              property="og:image:secure_url"
              content="https://staticw.s3.amazonaws.com/inmuebles/110151920230804120623.jpg"
            />
            <meta property="og:image:type" content="image/jpg" />
            <meta
              property="og:image:alt"
              content="Propiedad en arriendo online con Arriendalo"
            />

            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Arriendalo" />
            <meta property="og:locale" content="es_CO" />
            <meta property="og:url" content={shareUrl} />
            <meta property="og:type" content="website" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:title"
              content={`${property.tipo} en arriendo en ${property.ciudad}`}
            />
            <meta
              name="twitter:description"
              content={`${property.tipo} en arriendo en ${property.titulo} | ${property.ciudad} || ${property.observaciones}`}
            />
            <meta name="twitter:image" content={property.imagenes[0]} />
            <meta name="twitter:url" content={shareUrl} />
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-65YKMC7CT1"
            ></script>
            <script>
              {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
     
       gtag('config', 'G-65YKMC7CT1');
    `}
            </script>

            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-BCXH8TFTD5"
            ></script>
            <script>
              {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
     
       gtag('config', 'G-BCXH8TFTD5');
    `}
            </script>
          </Helmet>
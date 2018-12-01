import React, { Component } from 'react'
import Helmet from 'react-helmet'
import 'modern-normalize'

interface Props {
  lang?: string
  title?: string
  titleTemplate?: string
  image?: {
    src: string
    width: string
    height: string
    mimeType: string
  }
}

class AppHelmet extends Component<Props, {}> {
  static defaultProps = {
    lang: 'ru',
    title: 'Title',
    titleTemplate: '%s | Application',
    image: {
      src: '',
      width: 0,
      height: 0,
      mimeType: 'image/jpeg'
    }
  }

  render() {
    const { lang, title, titleTemplate, image } = this.props

    return (
      <Helmet defaultTitle={title} titleTemplate={titleTemplate}>
        <html lang={lang} />
        <meta charSet="UTF-8" />
        {!!title && <title>{title}</title>}
        <meta content="description" name="description" />
        <meta name="robots" content="noodp" />
        <meta name="robots" content="noyaca" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="fragment" content="!" />
        <meta name="theme-color" content="#ffffff" />

        {/* Markdown for FB, VK e.t.c. */}
        <meta content="og:title" property="og:title" />
        <meta content="og:site_name" property="og:site_name" />
        <meta content="og:description" property="og:description" />
        <meta content="og:url" property="og:url" />
        <meta content={`${lang}_${lang.toUpperCase()}`} property="og:locale" />

        <meta content={image.src} property="og:image" />
        <meta content={image.mimeType} property="og:image:type" />
        <meta content={image.width} property="og:image:width" />
        <meta content={image.height} property="og:image:height" />

        {/* Markdown for Twitter */}
        <meta content="website" property="og:type" />
        <meta content="twitter:title" name="twitter:title" />
        <meta content="twitter:description" name="twitter:description" />

        <meta content={image.src} name="twitter:image:src" />
        <meta content="summary_large_image" name="twitter:card" />

        <meta content="twitter:url" name="twitter:url" />
        <meta content="twitter:domain" name="twitter:domain" />

        {/* Some necessaries tags */}
        <meta name="format-detection" content="telephone=no" />

        {/* http://www.geo-tag.de/generator/en.html */}
        <meta name="geo.region" content="RU-SPE" />
        <meta name="geo.placename" content="Санкт-Петербург" />
        <meta name="geo.position" content="59.939866;30.314486" />
        <meta name="ICBM" content="59.939866, 30.314486" />
      </Helmet>
    )
  }
}

export default AppHelmet

import React, { Component } from 'react'

import Typetura, { initializeTypetura } from '@typetura/react'

export default class App extends Component {
  componentDidMount() {
    initializeTypetura({
      withPackage: {
        // apiKey: "YOUR_API_KEY_HERE",
        // name: "zine",
      },
      contexts: [
        ':root',
        '.typetura',
        '.primary-headline',
        '.primary-subheadline',
        '.section-headline',
        '.section-label',
        '.pullquote',
        '.meta',
        'main',
        'article',
        'section',
        'aside'
      ]
    })
  }

  render() {
    return (
      <div>
        <Typetura.Big>Big</Typetura.Big>
        <Typetura.Blockquote>Blockquote</Typetura.Blockquote>
        <Typetura.Caption>Caption</Typetura.Caption>
        <Typetura.Meta>Meta</Typetura.Meta>
        <Typetura.PrimaryHeadline>PrimaryHeadline</Typetura.PrimaryHeadline>
        <Typetura.PrimarySubheadline>
          PrimarySubheadline
        </Typetura.PrimarySubheadline>
        <Typetura.Pullquote>Pullquote</Typetura.Pullquote>
        <Typetura.SectionHeadline>SectionHeadline</Typetura.SectionHeadline>
        <Typetura.SectionLabel>SectionLabel</Typetura.SectionLabel>
        <Typetura.SectionSubheadline>
          SectionSubheadline
        </Typetura.SectionSubheadline>
        <Typetura.Small>Small</Typetura.Small>

        <Typetura.Context>
          <h1 className='typetura'>Hello</h1>
          <h1 className='typetura'>Hi</h1>
        </Typetura.Context>
      </div>
    )
  }
}

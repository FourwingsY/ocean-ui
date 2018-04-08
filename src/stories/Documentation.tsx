import React, { Component, ReactNode } from 'react'
import Highlight from 'react-highlight'

import { StyledDocumentation } from './style'

interface Props {
  name: string
  description?: string | ReactNode
  usage?: string
  tsInterface?: string
}

export default class Documentation extends Component<Props> {
  render() {
    const { name, description, usage, tsInterface, children } = this.props
    return (
      <StyledDocumentation>
        <header>
          <h1>{name}</h1>
          <h2>{description}</h2>
        </header>
        <div className="preview">{children}</div>
        <div className="detail">
          {usage && (
            <>
              <h3>Usage</h3>
              <Highlight className="javascript">{usage}</Highlight>
            </>
          )}
          {tsInterface && (
            <>
              <h3>Props interface (Typescript)</h3>
              <Highlight className="typescript">{tsInterface}</Highlight>
            </>
          )}
        </div>
      </StyledDocumentation>
    )
  }
}

// @flow

/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Container } from 'semantic-ui-react';

import messages from './messages';

export default class NotFound extends React.PureComponent {
  render() {
    const style = {
      marginTop: '2rem',
      textAlign: 'center',
    };
    return (
      <Container style={ style }>
        <h1>
          <FormattedMessage { ...messages.header } />
        </h1>
      </Container>
    );
  }
}

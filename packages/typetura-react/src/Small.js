import React from 'react';
import PropTypes from 'prop-types';

import { typeturize } from 'typeturajs';

const Small = (props) => {
  const ref = React.useRef();

  React.useEffect(() => {
    typeturize(ref.current);
  }, [ref]);

  return React.createElement(props.as, {
    ref,
    className: 'small',
    children: props.children,
  });
};

Small.defaultProps = {
  as: 'p',
};

Small.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
};

export default Small;

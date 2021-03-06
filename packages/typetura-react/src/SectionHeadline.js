import React from 'react';
import PropTypes from 'prop-types';

import { typeturize } from 'typeturajs';

const SectionHeadline = (props) => {
  const ref = React.useRef();

  React.useEffect(() => {
    typeturize(ref.current);
  }, [ref]);

  return React.createElement(props.as, {
    ref,
    className: 'section-headline',
    children: props.children,
  });
};

SectionHeadline.defaultProps = {
  as: 'h1',
};

SectionHeadline.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
};

export default SectionHeadline;

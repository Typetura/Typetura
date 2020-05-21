import React from 'react';
import PropTypes from 'prop-types';

import { typeturize } from 'typeturajs';

const SectionSubheadline = (props) => {
  const ref = React.useRef();

  React.useEffect(() => {
    typeturize(ref.current);
  }, [ref]);

  return React.createElement(props.as, {
    ref,
    className: 'section-subheadline',
    children: props.children,
  });
};

SectionSubheadline.defaultProps = {
  as: 'h2',
};

SectionSubheadline.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
};

export default SectionSubheadline;

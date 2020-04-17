import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { typeturize } from 'typeturajs';

const Context = (props) => {
  const ref = React.useRef();
  const refCount = ref.current?.querySelectorAll('.typetura')?.length || 0;

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    typeturize(ref.current);

    ref.current.querySelectorAll(window.contexts).forEach((element) => {
      typeturize(element);
    });
  }, [ref, refCount]);

  return React.createElement(props.as, {
    ref,
    children: props.children,
  });
};

Context.defaultProps = {
  as: 'div',
};

Context.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
};

export default Context;

import typeturize from './typeturize';
import { createStyleSheet } from './utils/';

const typeturaInit = (options = {}) => {
  const { selectors = ['.typetura'], base = 20, scale = 1 } = options;

  return new Promise((resolve, reject) => {
    // Look for new elements on the page that might be Typetura contexts.
    const mutationObserver = new window.MutationObserver(mutations);
    mutationObserver.observe(document.documentElement, {
      childList: true,
      attributes: false,
      subtree: true,
    });

    // Loop through new elements and attach resize observations.
    function mutations(mutationsList) {
      mutationsList.forEach((mutation) => {
        const nodes = mutation.addedNodes;
        nodes.forEach((node) => {
          if (node.classList) {
            if (node.matches(selectors)) {
              typeturize(node);
            }
          }
        });
      });
    }
    const stylesheet = createStyleSheet({ base, scale });
    // Initiate Typetura on the root element
    typeturize(document.documentElement);

    // Write typetura properties to the top of the document head to avoid cascade conflicts
    document.head.insertBefore(stylesheet, document.head.firstChild);

    resolve();
  });
};

export default typeturaInit;

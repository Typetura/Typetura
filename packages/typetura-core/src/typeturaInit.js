import typeturize from './typeturize';
import { createStyleSheet } from './utils/';

const typeturaInit = (options = {}) => {
  // Look for new elements on the page that might be Typetura contexts.
  const mutationObserver = new MutationObserver(mutations);
  mutationObserver.observe(document.documentElement, {
    childList: true,
    attributes: false,
    subtree: true,
  });

  // Loop through new elements and attach resize observations.
  function mutations(mutationsList) {
    mutationsList.forEach(mutation => {
      const nodes = mutation.addedNodes;
      nodes.forEach(node => {
        if (node.classList) {
          if (node.classList.contains([typetura.classes])) {
            typeturize(node);
          }
        }
      });
    });
  }

  // Initiate Typetura on the root element
  typeturize(document.documentElement);

  // Write typetura properties to the top of the document head to avoid cascade conflicts
  document.head.insertBefore(stylesheet, document.head.firstChild);

  resolve();
};
typeturaInit();

export default typeturaInit;

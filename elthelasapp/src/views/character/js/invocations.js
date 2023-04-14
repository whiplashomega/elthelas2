import invocations from '@/components/characterbuilderv2/js/selectable/warlockinvocations.js';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';

export default {
  setup () {
    return {
      invocations,
      marked
    };
  }
};
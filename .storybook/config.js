import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

function loadStories() {
  require('../src/stories/style');
  require('../src/stories/Dropdown');
}

setOptions({
  addonPanelInRight: true,
  selectedAddonPanel: 'storybooks/storybook-addon-knobs'
});

configure(loadStories, module);

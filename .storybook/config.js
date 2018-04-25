import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

function loadStories() {
  require('../src/stories/style');
  require('../src/stories/Dropdown');
  require('../src/stories/DropdownMulti');
}

setOptions({
  addonPanelInRight: true,
  selectedAddonPanel: 'storybooks/storybook-addon-knobs',
});

configure(loadStories, module);

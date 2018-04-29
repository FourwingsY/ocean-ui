import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { Settings } from 'luxon';

function loadStories() {
  require('../src/stories/style');
  require('../src/stories/Theme');
  require('../src/stories/TextInput');
  require('../src/stories/TagsInput');
  require('../src/stories/Dropdown');
  require('../src/stories/DropdownMulti');
  require('../src/stories/Calendar');
  require('../src/stories/DatePicker');
  require('../src/stories/DateRangePicker');
}

Settings.defaultLocale = 'ko';

setOptions({
  addonPanelInRight: true,
  selectedAddonPanel: 'storybooks/storybook-addon-knobs',
});

configure(loadStories, module);

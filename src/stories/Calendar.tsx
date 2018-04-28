import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs/react';

import Calendar from '../components/Calendar';

import Documentation from './Documentation';

const CalendarProps = `\
  interface Props {
    onSelect?(selected: DateTime): void,
    dateRenderer?(date: DateTime, view: DateTime): ReactNode,
  }
`;

const usage = `\
  <Calendar />
`;

const description = (
  <>
    월별 달력 렌더링 컴포넌트.<br />
    렌더링만 담당하여 단독으로 사용되지 않고 SingleDatePicker와 같이 래핑하여
    사용한다.<br />
    luxon.DateTime을 사용한다.<br />
  </>
);

storiesOf('Calendar', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Documentation
      name="Calendar"
      description={description}
      usage={usage}
      tsInterface={CalendarProps}
    >
      <Calendar onSelect={action('onSelect')} />
    </Documentation>
  ));

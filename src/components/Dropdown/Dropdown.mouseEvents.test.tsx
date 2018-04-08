import React from 'react'
import { mount } from 'enzyme'

import Dropdown from './Dropdown'
import {
  DropdownControl,
  Menu,
  Option,
  Input,
  ClearButton,
  ToggleArrow,
} from './style'

const Options = [
  { label: 'Option 0', value: 0 },
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
  { label: 'Option 4', value: 4 },
]

describe('Dropdown: Mouse events', () => {
  let dropdown
  let control
  let input
  beforeEach(() => {
    dropdown = mount(
      <Dropdown options={Options} value={null} onChange={() => {}} />
    )
    control = dropdown.find(DropdownControl)
    input = dropdown.find('input')
  })

  test('should open menu on click', () => {
    expect(dropdown.find(Menu).exists()).toBe(false)
    control.simulate('mouseDown')
    expect(dropdown.find(Menu).exists()).toBe(true)
    control.simulate('mouseDown')
    expect(dropdown.find(Menu).exists()).toBe(true)
  })
  test('should select option on click', () => {
    const onChange = jest.fn()
    dropdown.setProps({ onChange })

    // open menu
    control.simulate('mouseDown')
    // select second option
    dropdown
      .find(Option)
      .at(2)
      .simulate('click')
    expect(onChange).toBeCalledWith(Options[2])
  })
  test('onMouseDownOnMenu', () => {
    // open menu
    control.simulate('mouseDown')
    const menu = dropdown.find(Menu)

    // simulate event
    expect(() => menu.simulate('mouseDown')).not.toThrowError()
  })
  test('focus and blur on input', () => {
    input.simulate('focus')
    expect(dropdown.state().inputFocused).toBe(true)

    input.simulate('blur')
    expect(dropdown.state().inputFocused).toBe(false)
  })
  test('hover should focus on option', () => {
    const disableEvenOption = option => {
      return option.value % 2 === 0
    }
    dropdown.setProps({ disableOption: disableEvenOption })
    // open menu
    control.simulate('mouseDown')
    const menu = dropdown.find(Menu)

    // hover on option
    const option1 = menu.find(Option).at(1)
    option1.simulate('mouseOver')
    expect(dropdown.state().focusedOption).toBe(Options[1])

    // hover on disabled option
    const option2 = menu.find(Option).at(2)
    option2.simulate('mouseOver')
    expect(dropdown.state().focusedOption).not.toBe(Options[2])
  })
  test('click should select a option', () => {
    const disableEvenOption = option => {
      return option.value % 2 === 0
    }
    const onChange = jest.fn()
    dropdown.setProps({ onChange, disableOption: disableEvenOption })
    // open menu
    control.simulate('mouseDown')
    let menu = dropdown.find(Menu)

    // click on option
    const option1 = menu.find(Option).at(1)
    option1.simulate('click')
    expect(onChange).toBeCalledWith(Options[1])

    // reopen menu
    control.simulate('mouseDown')
    menu = dropdown.find(Menu)

    // click on disabled option
    const option2 = menu.find(Option).at(2)
    option2.simulate('click')
    expect(onChange).not.toBeCalledWith(Options[2])
  })
  test('clear current value', () => {
    // no clear button on empty value
    expect(dropdown.find(ClearButton).exists()).toBe(false)

    const onChange = jest.fn()
    dropdown.setProps({ onChange, value: Options[1] })
    const clear = dropdown.find(ClearButton)
    expect(dropdown.find(ClearButton).exists()).toBe(true)

    clear.simulate('click')
    expect(onChange).toBeCalledWith(null)
  })
  test('toggle with arrow', () => {
    const arrow = dropdown.find(ToggleArrow)
    expect(dropdown.find(Menu).exists()).toBe(false)
    arrow.simulate('mouseDown')
    expect(dropdown.find(Menu).exists()).toBe(true)
    arrow.simulate('mouseDown')
    expect(dropdown.find(Menu).exists()).toBe(false)
  })
  test('on disabled, cannot open menu with click', () => {
    dropdown.setProps({ disabled: true })
    expect(dropdown.find(Menu).exists()).toBe(false)
    control.simulate('mouseDown')
    expect(dropdown.find(Menu).exists()).toBe(false)
  })
  test("on disabled, arrow doesn't rendered", () => {
    dropdown.setProps({ disabled: true })
    expect(dropdown.find(ToggleArrow).exists()).toBe(false)
  })
})

import React from 'react'
import { mount, ReactWrapper } from 'enzyme'

import Dropdown from './Dropdown'
import { DropdownControl, Menu, Option, Input } from './style'

const Options = [
  { label: 'Option 0', value: 0 },
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
  { label: 'Option 4', value: 4 },
]

describe('Dropdown: keyboard events', () => {
  let dropdown: ReactWrapper<any, any>
  let input: ReactWrapper<any, any>
  let control: ReactWrapper<any, any>
  const pushTab = () => {
    control.simulate('keyDown', {
      keyCode: 9, // tab
    })
  }
  const pushEnter = () => {
    control.simulate('keyDown', {
      keyCode: 13, // tab
    })
  }
  const pushDownArrow = () => {
    control.simulate('keyDown', {
      keyCode: 40, // ⬇
    })
  }
  const pushUpArrow = () => {
    control.simulate('keyDown', {
      keyCode: 38, // ⬆
    })
  }
  beforeEach(() => {
    dropdown = mount(
      <Dropdown options={Options} value={null} onChange={() => {}} />
    )
    input = dropdown.find('input')
    control = dropdown.find(DropdownControl)
  })

  test('can search with input', () => {
    input.simulate('change', {
      target: { value: '0' },
    })
    expect(dropdown.state().inputValue).toBe('0')
    // inputValue will filter options
    expect(dropdown.find(Menu).children).toHaveLength(1)
  })
  test('keyboard control: tab to select', () => {
    const onChange = jest.fn()
    dropdown.setProps({ onChange })

    pushTab()
    // not called when menu is not opened
    expect(onChange).not.toBeCalled()

    // open menu
    control.simulate('mouseDown')
    // focus on options 1
    pushDownArrow()
    pushDownArrow()
    pushTab()

    // now something selected
    expect(onChange).toBeCalledWith(Options[1])
  })
  test('keyboard control: enter to select', () => {
    const onChange = jest.fn()
    dropdown.setProps({ onChange })

    pushEnter()
    // not called when menu is not opened
    expect(onChange).not.toBeCalled()

    // open menu
    control.simulate('mouseDown')
    // focus on options 3
    pushUpArrow()
    pushUpArrow()
    pushEnter()

    // now something selected
    expect(onChange).toBeCalledWith(Options[3])
  })
  test('keyboard control: down, on init', () => {
    // open menu
    control.simulate('mouseDown')
    // check initial state
    expect(dropdown.state().focusedOption).toBeNull()

    // now something selected
    pushDownArrow()
    expect(dropdown.state().focusedOption).toBe(Options[0])
  })
  test('keyboard control: down, on last', () => {
    dropdown.setState({ focusedOption: Options[4] })
    // open menu
    control.simulate('mouseDown')
    expect(dropdown.state().focusedOption).toBe(Options[4])
    pushDownArrow()
    expect(dropdown.state().focusedOption).toBe(Options[0])
  })
  test('keyboard control, with no options', () => {
    dropdown.setProps({ options: [] })
    // open menu
    control.simulate('mouseDown')
    pushDownArrow()
    expect(dropdown.state().focusedOption).toBe(null)
    pushUpArrow()
    expect(dropdown.state().focusedOption).toBe(null)
  })
  test('keyboard control: up, on init', () => {
    // open menu
    control.simulate('mouseDown')
    // check initial state
    expect(dropdown.state().focusedOption).toBeNull()

    // now something selected
    pushUpArrow()
    expect(dropdown.state().focusedOption).toBe(Options[4])
  })
  test('keyboard control: up, on first', () => {
    dropdown.setState({ focusedOption: Options[0] })
    // open menu
    control.simulate('mouseDown')
    expect(dropdown.state().focusedOption).toBe(Options[0])
    pushUpArrow()
    expect(dropdown.state().focusedOption).toBe(Options[4])
  })
  test('keyboard control: down, with disable options', () => {
    const disableEvenOption = option => {
      return option.value % 2 === 0
    }
    dropdown.setState({ focusedOption: Options[1] })
    dropdown.setProps({ disableOption: disableEvenOption })

    // open menu
    control.simulate('mouseDown')
    expect(dropdown.state().focusedOption).toBe(Options[1])
    pushDownArrow()
    expect(dropdown.state().focusedOption).toBe(Options[3])
    pushDownArrow()
    expect(dropdown.state().focusedOption).toBe(Options[1])
  })
  test('keyboard control: up, with disable option', () => {
    const disableEvenOption = option => {
      return option.value % 2 === 0
    }
    dropdown.setState({ focusedOption: Options[1] })
    dropdown.setProps({ disableOption: disableEvenOption })

    // open menu
    control.simulate('mouseDown')
    expect(dropdown.state().focusedOption).toBe(Options[1])
    pushUpArrow()
    expect(dropdown.state().focusedOption).toBe(Options[3])
    pushUpArrow()
    expect(dropdown.state().focusedOption).toBe(Options[1])
  })
})

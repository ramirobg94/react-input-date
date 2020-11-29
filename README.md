# react-date-input

[![NPM](https://img.shields.io/npm/v/react-date-input.svg)](https://www.npmjs.com/package/react-date-input) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A simple input to enter dates. Inspired on Typeform input and trying to follow the flexibility and the philosophy of [React-select](https://github.com/JedWatson/react-select).

## Install

```bash
npm install --save react-date-input
```

or

```bash
yarn add react-date-input
```

## Usage

```jsx
import React, { Component } from 'react'

import DateInput from 'react-date-input'

class Example extends Component {
  state = {
    date: '12-02-2020'
  }
  handleChange = (newDate) => {
    this.setState({ date: newDate })
  }

  render() {
    const { date } = this.state
    return (
      <DateInput
        date={date}
        format='DDMMYYYY'
        separator='-'
        onChange={handleChange}
      />
    )
  }
}
```

# With React Hooks

```jsx
import React, { useState } from 'react'

import DateInput from 'react-date-input'

const Example = () => {
  const [date, setDate] = useState('12-02-2020')

  return (
    <DateInput date={date} format='DDMMYYYY' separator='-' onChange={setDate} />
  )
}
```

## Props

Common props yoy want to specify

* `date`
* `format`
* `separator`
* `onChange`

## License

MIT © [ramirobg94](https://github.com/ramirobg94)

> Made with create-react-library

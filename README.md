# react-input-date

[![NPM](https://img.shields.io/npm/v/react-input-date.svg)](https://www.npmjs.com/package/react-input-date) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A simple input to enter dates. Inspired on Typeform input and trying to follow the flexibility and the philosophy of [React-select](https://github.com/JedWatson/react-select).

## Install

```bash
npm install --save react-input-date
```

or

```bash
yarn add react-input-date
```

## Usage

```jsx
import React, { Component } from 'react'

import DateInput from 'react-input-date'

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

import DateInput from 'react-input-date'

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

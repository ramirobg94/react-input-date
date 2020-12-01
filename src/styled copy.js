import styled from '@emotion/styled'

import DateInput from './component'

export default styled(DateInput)`
  .date-input-container {
    display: flex;
    -webkit-box-align: baseline;
    align-items: baseline;
    width: fit-content;
    box-sizing: inherit;

    .input-container {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      box-sizing: inherit;

      input {
        &:active,
        &:focus {
          outline: none;
        }

        display: block;
        width: 100%;
        font-family: inherit;
        color: rgb(79, 176, 174);
        padding: 0px 0px 8px;
        border: none;
        outline: none;
        border-radius: 0px;
        appearance: none;
        background: none;
        transform: translateZ(0px);
        font-size: 30px;
        -webkit-font-smoothing: antialiased;
        line-height: unset;
        transition: box-shadow 0.1s ease-out 0s;
        box-shadow: rgba(79, 176, 174, 0.3) 0px 1px;
        width: calc(2.2ch);

        &.input-month {
          width: calc(2.7ch);
        }
        &.input-year {
          width: calc(4.4ch);
        }
        &::placeholder {
          color: rgb(79 176 174 / 25%);
        }
      }
      .label-container {
        flex: 0 0 auto;

        label {
          margin: 0px;
          max-width: 100%;
          font-weight: unset;
          font-size: 14px;
          line-height: 20px;
          color: rgb(79, 176, 174);
        }
      }
    }
  }

  .separator {
    margin-right: 16px;
    margin-bottom: 8px;
    margin-left: 20px;
    align-self: flex-end;

    color: rgb(79, 176, 174);

    font-size: 30px;
    line-height: 38px;

    max-width: 100%;
    font-weight: unset;
  }

  .error-container {
    margin: 0px;
    max-width: 100%;
    font-weight: unset;
    font-size: 14px;
    line-height: 20px;
    color: rgb(176 79 79);
    text-align: left;
  }

  margin: 16px 0 32px;
`

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

        font-family: inherit;

        border: none;
        outline: none;
        border-radius: 0px;
        appearance: none;
        background: none;
        transform: translateZ(0px);

        -webkit-font-smoothing: antialiased;
        line-height: unset;

        width: calc(2.2ch);

        &.input-month {
          &.empty {
            width: calc(2.7ch);
          }
        }
        &.input-year {
          width: calc(4ch);
        }
        &::placeholder {
        }
        &:focus {
          background: #c3c3c338;
        }
      }
      .label-container {
        flex: 0 0 auto;

        label {
          margin: 0px;
          max-width: 100%;
          font-weight: unset;
        }
      }
    }
  }

  .separator {
    align-self: flex-end;

    max-width: 100%;
  }

  .error-container {
    margin: 0px;
    max-width: 100%;

    line-height: 20px;
    color: rgb(176 79 79);
    text-align: left;
  }
`

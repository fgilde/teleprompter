import React, {
  Fragment
} from 'react'
import {
  GlobalStyles,
  StyledApp,
  StyledTeleprompter as Teleprompter,
  Controls,
  Buttons,
  Input,
  Button,
  ButtonRight
} from './styles'

const INITIAL_TEXT = `Dies ist ein Beispiel und sie können den Text vorlesen und der text folgt dem was sie sagen. Beginnen sie einfach damit nachdem sie auf start geklickt haben diesen Text zu lesen und beobachten sie wie die Wörter hervorgehoben werden und wie ihnen der Text folgt. Um einfach weiteren Inhalt zu haben ist hier noch etwas Text zum Vorlesen, allerdings fällt mir nichts sinnvolles ein außer ein Paar aneinander gereihter wörter`

export default function App() {
  const [
    listening,
    setListening
  ] = React.useState(false)
  const [
    words,
    setWords
  ] = React.useState(
    INITIAL_TEXT.split(' ')
  )
  const [
    progress,
    setProgress
  ] = React.useState(0)

  const [
    intervalValue,
    setIntervalValue
  ] = React.useState(200)

  const handleInput = e => {
    setWords(
      e.target.value.split(' ')
    )
    progress && setProgress(0)
  }

  const handleListening = () => {
    if (listening) {
      setListening(false)
      if (window.intervalId) {
        clearInterval(window.intervalId);
      }
    } else {
      setProgress(0)
      setListening(true)
    }
  }

  const handleIntervalValue = e => {
   setIntervalValue(e.target.value)
  }

  const startStatic = () => {
    handleListening();
    var i = progress;
    window.intervalId = setInterval(() => setProgress(i+=1), intervalValue);
  }

  const handleReset = () =>
    setProgress(0)

  const handleChange = progress =>
    setProgress(progress)

  return (
    <Fragment>
      <GlobalStyles />
      <StyledApp>
        <Controls>
          <Input
            onChange={handleInput}
            value={words.join(' ')}
          />

          <Buttons>
            <Button
              onClick={
                handleListening
              }
            >
              {listening
                ? 'Stop'
                : 'Start dynamic'}
            </Button>

            { listening ? null :
             <Button
              onClick={startStatic}
              disabled={listening}
            >
              Start static
            </Button>
          }

            <input type="text" onChange={handleIntervalValue} id="interval" value={intervalValue}></input> <p>MS</p>


            <ButtonRight
              onClick={handleReset}
              disabled={listening}
              secondary
            >
              Reset
            </ButtonRight>


          </Buttons>
        </Controls>
        <Teleprompter
          words={words}
          listening={listening}
          progress={progress}
          onChange={handleChange}
        />
      </StyledApp>
    </Fragment>
  )
}

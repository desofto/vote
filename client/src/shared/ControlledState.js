import { Button } from 'react-bootstrap'

function ControlledState({ state, onChange }) {
  const CAPTIONS = {
    initial: 'Ready',
    started: 'On the stage',
    finished: 'Finished'
  }

  const ICONS = {
    initial: 'fas fa-play',
    started: 'fas fa-stop',
    finished: 'fas fa-redo'
  }

  const NEXT_STATE = {
    initial: 'started',
    started: 'finished',
    finished: 'initial'
  }

  function changeState() {
    onChange(NEXT_STATE[state])
    window.focus()
  }

  return (
    <>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            {CAPTIONS[state]}
          </div>
          <div className="flip-card-back">
            <Button className="rounded-circle focus-visible" variant="outline-dark" onClick={changeState}>
              <i className={ICONS[state]}></i>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ControlledState
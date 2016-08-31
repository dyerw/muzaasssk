import React from 'react'
import { Modal, Button, Grid, Row, Col } from 'react-bootstrap'
import Autosuggest from 'react-autosuggest';

let ReviewEditor = (props) => {
  return(
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Add A Review</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Grid>
            <Row>
              <span>{props.loadingAlbumSuggestions ? "loading" : ""}</span>
              <Autosuggest
                  suggestions={props.albumSuggestions}
                  onSuggestionsFetchRequested={props.requestAlbumSuggestions}
                  onSuggestionsClearRequested={props.clearAlbumSuggestions}
                  getSuggestionValue={x => {
                    console.log(x);
                    return x.album;
                  }}
                  onSuggestionSelected={props.reviewEditorAlbumSelected}
                  renderSuggestion={x => <span>{x.album} by {x.artist}</span>}
                  inputProps={{
                    value: props.reviewEditorAlbumValue,
                    onChange: props.reviewEditorAlbumInputChanged
                  }} />
            </Row>
          </Grid>
        </Modal.Body>

        <Modal.Footer>
          <Button>Close</Button>
          <Button bsStyle="primary">Submit Review</Button>
        </Modal.Footer>

      </Modal.Dialog>
    </div>
  );
}

export default ReviewEditor

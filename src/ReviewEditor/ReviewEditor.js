import React from 'react'
import { Modal, Button, Grid, Row, Col } from 'react-bootstrap'
import Autosuggest from 'react-autosuggest';

let ReviewEditor = (props) => {
  let autoSuggest = <Autosuggest
                        suggestions={props.albumSuggestions}
                        onSuggestionsFetchRequested={props.requestAlbumSuggestions}
                        onSuggestionsClearRequested={props.clearAlbumSuggestions}
                        getSuggestionValue={x => {
                          console.log(x);
                          return x.album;
                        }}
                        onSuggestionSelected={props.reviewEditorAlbumSelected}
                        renderSuggestion={x => <div><img src={x.albumArtUrl} style={{height: '50px', width: '50px'}}/><span>{x.album} by {x.artist}</span></div>}
                        inputProps={{
                          value: props.reviewEditorAlbumValue,
                          onChange: props.reviewEditorAlbumInputChanged,
                          placeholder: "Enter album name..."
                        }} />

  let albumInfoView;
  if (props.selectedAlbumInfo) {
    albumInfoView = (
      <div>
        <img src={props.selectedAlbumInfo.albumArtUrl} style={{height: '50px', width: '50px'}} />
        <span>{props.selectedAlbumInfo.album} </span>
        <span>{props.selectedAlbumInfo.artist} </span>
        <span>{props.selectedAlbumInfo.date}</span>
      </div>
    );
  }

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
              { props.selectedAlbumInfo ? albumInfoView : autoSuggest }
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

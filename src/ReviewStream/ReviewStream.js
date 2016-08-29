import React from 'react'

import Review from './components/Review'

let ReviewStream = (props) => {
  if (props.loadingStream) {
    return <div>Loading...</div>
  }

  return(
    <div>
      {props.reviews.map((review, i) => <Review review={review} key={i}/>)}
    </div>
  );
}

export default ReviewStream

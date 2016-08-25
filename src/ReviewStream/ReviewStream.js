import React from 'react'

import Review from './components/Review'

let ReviewStream = (props) => {
  return(
    <div>
      {props.reviews.map((review, i) => Review({review: review, key: i}))}
    </div>
  );
}

export default ReviewStream

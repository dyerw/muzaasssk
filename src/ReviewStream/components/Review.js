import React from 'react'

let Review = (props) => {
  let review = props.review;
  return (
   <div>
      <div>{review.title}</div>
      <div>{review.artist}</div>
      <div>For people who like {review.relatedArtists}</div>
      <div>For people feeling {review.moods}</div>
      <div>{review.reviewText}</div>
      <div>{review.writingKudos} Writing Kudos | {review.discoveryKudos} Discovery Kudos</div>
      <br/>
   </div>
  )
}

export default Review;


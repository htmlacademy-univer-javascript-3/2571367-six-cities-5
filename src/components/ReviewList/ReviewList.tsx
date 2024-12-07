import Review from '../Review/Review.tsx';
import { review } from '../../types/review.ts';

function ReviewList({guestReview}:{guestReview:review[]}){
  return(
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{guestReview.length}</span></h2>
      <ul className="reviews__list">
        {guestReview.map((rev) =>
          (
            <Review key = {rev.name} guestReview={rev}/>
          ))}
      </ul>
    </>
  );
}
export default ReviewList;

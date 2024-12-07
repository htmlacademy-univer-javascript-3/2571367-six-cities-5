import { review } from '../../types/review.ts';

function Review({guestReview}:{guestReview:review}){
  return (
    <li key={guestReview.name} className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={guestReview.img}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {guestReview.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: guestReview.raitingStars }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {guestReview.description}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">
          {guestReview.date}
        </time>
      </div>
    </li>
  );
}
export default Review;

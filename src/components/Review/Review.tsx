import { Comment } from '../../types/comment';
import React from 'react';

function Review({guestReview}:{guestReview:Comment}){
  return (
    <li key={guestReview.id} className="reviews__item">
      <div className="reviews__user user" data-testid="user-info">
        <div className="reviews__avatar-wrapper user__avatar-wrapper" data-testid="user-image">
          <img
            className="reviews__avatar user__avatar"
            src={guestReview.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {guestReview.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating" data-testid="review-raitings">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${(guestReview.rating / 5) * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {guestReview.comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24" data-testid="review-time">
          {guestReview.date}
        </time>
      </div>
    </li>
  );
}

export default React.memo(Review);

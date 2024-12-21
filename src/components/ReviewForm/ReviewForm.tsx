
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { postComment } from '../../store/apiActions.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import { offerIsLoadingStatus } from '../../store/selectors.ts';

function ReviewForm(){
  const [rating, setRatingStar] = useState<number>(0);
  const [isFormDisabled, setFormDisabled] = useState<boolean>(false);

  const [isButtonDisable, setButtonDisable] = useState<boolean>(true);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const isReviewLoading = useAppSelector(offerIsLoadingStatus);

  const dispatch = useAppDispatch();
  const offerId = useAppSelector((state) => state.Data.offer.id);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRatingStar(+(event.target.value));
  };

  const handleButtonStatus = () => {
    if (commentRef.current){
      if ((commentRef.current.value.length > 50) && (commentRef.current.value.length < 300) && (rating > 0) || isReviewLoading){
        setButtonDisable(false);
      } else {
        setButtonDisable(true);
      }
    }
  };
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setFormDisabled(true);

    const submitComment = async () => {
      if (commentRef.current && rating > 0) {
        try {
          await dispatch(
            postComment({
              rating: rating,
              comment: commentRef.current.value,
              id: offerId,
            })
          ).unwrap();

          setRatingStar(0);
          if (commentRef.current) {
            commentRef.current.value = '';
          }
        } catch (error) {
          setFormDisabled(false);
        }
      }
    };
    submitComment();
  };
  useEffect(()=>{
    handleButtonStatus();
  },[rating, isReviewLoading]);
  return(

    <form className="reviews__form form" action="#" method="post"
      onSubmit={handleSubmit} data-testid = "review-form"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
          onChange = {handleRatingChange}
          disabled = {isFormDisabled}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
          onChange = {handleRatingChange}
          disabled = {isFormDisabled}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"
          onChange = {handleRatingChange}
          disabled = {isFormDisabled}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"
          onChange = {handleRatingChange}
          disabled = {isFormDisabled}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"
          onChange = {handleRatingChange}
          disabled = {isFormDisabled}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
        ref = {commentRef} onChange={handleButtonStatus}
        disabled = {isFormDisabled}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled = {isButtonDisable}>Submit</button>
      </div>
    </form>
  );
}

export default React.memo(ReviewForm);

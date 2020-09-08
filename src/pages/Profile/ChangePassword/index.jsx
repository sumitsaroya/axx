/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import classNames from 'classnames';

import { changeUserPassword, authCleanUp } from 'state/actions/auth';
import { useFormatMessage } from 'hooks';
import errorMessage from 'components/ErrorMessage';

const ChangePasswordCard = () => {
  const { loading } = useSelector(
    (state) => ({
      loading: state.auth.loading,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const schema = yup.object().shape({
    current: yup
      .string()
      .min(6)
      .notOneOf([yup.ref('new')])
      .required(),
    new: yup.string().min(6).required(),
    confirmation: yup
      .string()
      .equals([yup.ref('new')])
      .required(),
  });

  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      current: '',
      new: '',
      confirmation: '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    return () => dispatch(authCleanUp());
  }, [dispatch]);

  const isNewPasswordSecure = watch('new') && watch('new').length >= 6;

  const safePasswordMessage = useFormatMessage(`ChangePassword.safePassword`);

  const insecurePasswordMessage = useFormatMessage(
    `ChangePassword.insecurePassword`
  );

  const newPasswordsAreEqual =
    watch('new') &&
    watch('confirmation') &&
    watch('new') === watch('confirmation');

  const passwordsMatchMessagge = useFormatMessage(
    `ChangePassword.matchPassword`
  );

  const notMatchPasswordMessage = useFormatMessage(
    `ChangePassword.notMatchPassword`
  );

  const currentAndNewPasswordsEqual =
    watch('new') && watch('current') === watch('new');

  const samePasswordMessage = useFormatMessage(`ChangePassword.samePassword`);

  const onSubmitHandler = ({ current, confirmation }) => {
    dispatch(changeUserPassword(current, confirmation));
  };

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <span className="icon">
            <i className="fa fa-lock" />
          </span>
          {useFormatMessage(`ChangePassword.changePassword`)}
        </p>
      </header>
      <div className="card-content">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">
                {useFormatMessage(`ChangePassword.currentPassword`)}
              </label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className={classNames('input', {
                      'is-danger': errors.current,
                    })}
                    type="password"
                    name="current"
                    ref={register}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">
                {useFormatMessage(`ChangePassword.newPassword`)}
              </label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className={classNames(
                      `input`,
                      { 'is-success': isNewPasswordSecure },
                      { 'is-danger': watch('new') && !isNewPasswordSecure }
                    )}
                    type="password"
                    name="new"
                    ref={register}
                  />
                </div>
                {isNewPasswordSecure ? (
                  <p className="is-success">{safePasswordMessage}</p>
                ) : (
                  watch('new') && errorMessage(insecurePasswordMessage)
                )}
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">
                {useFormatMessage(`ChangePassword.confirmPassword`)}
              </label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className={classNames(
                      `input`,
                      { 'is-success': newPasswordsAreEqual },
                      {
                        'is-danger':
                          watch('confirmation') && !newPasswordsAreEqual,
                      }
                    )}
                    type="password"
                    name="confirmation"
                    ref={register}
                  />
                </div>
                {newPasswordsAreEqual ? (
                  <p className="is-success">{passwordsMatchMessagge}</p>
                ) : (
                  watch('confirmation') && errorMessage(notMatchPasswordMessage)
                )}
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal" />
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <button
                    type="submit"
                    className={`button is-primary ${loading && 'is-loading'}`}
                  >
                    {useFormatMessage(`ChangePassword.submits`)}
                  </button>
                </div>
                {currentAndNewPasswordsEqual &&
                  errorMessage(samePasswordMessage)}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordCard;

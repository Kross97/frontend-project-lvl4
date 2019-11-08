import React from 'react';
import cn from 'classnames';

const Input = (props) => {
  const {
    onSubmit,
    onChange,
    value,
    type,
    placeholder,
    btnValue,
  } = props;

  const classInput = cn({
    'form-control': true,
    'col-9': type === 'message',
    'col-7': type === 'channel',
  });

  const classBtn = cn({
    'btn btn-info': true,
    'col-3': type === 'message',
    'col-5': type === 'channel',
  });
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group row no-gutters">
        <input onChange={onChange} value={value} type="text" className={classInput} placeholder={placeholder} />
        <input type="submit" disabled={value === ''} className={classBtn} name="button1" value={btnValue} />
      </div>
    </form>
  );
};

export default Input;

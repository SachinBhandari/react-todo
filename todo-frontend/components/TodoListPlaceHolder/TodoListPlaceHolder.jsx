import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';

/**
 * @abstract
 * This component will render the placeholder lines w.r.t. the
 * amount of lines provided to it as props.
 */

const TodoListPlaceHolder = ({ lines }) => (
  <div>
    {/* <Placeholder.Line  length="medium" />
        <Placeholder.Line  length="medium" />
        <Placeholder.Line  length="medium" /> */}
    {(() => {
      const linePlaceHolders = [];
      for (let i = 0; i < lines; i += 1) {
        linePlaceHolders.push(<Skeleton key={i} variant="text" />);
      }
      return linePlaceHolders;
    })()}
  </div>
);

TodoListPlaceHolder.propTypes = {
  lines: PropTypes.number
};

TodoListPlaceHolder.defaultProps = {
  lines: 3
};

export default TodoListPlaceHolder;

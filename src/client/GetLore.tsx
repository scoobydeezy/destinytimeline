import * as React from 'react';

const GetLore = props => {
  const onSubmit = event => {
    event.preventDefault();
    props.onFormSubmit();
  };
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <div>
        <button disabled={props.isSearching}
                onClick={props.onGetLore}
          >
            Get Data
        </button>
      </div>
    </form>
  );
};

export default GetLore

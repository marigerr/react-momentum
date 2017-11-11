import React from 'react';
import 'Images/twitter.svg';

const TwitterLink = (props) => {
  const tweetURL = `https://twitter.com/intent/tweet?text="${props.quote}"—${props.author}`;
  return (
    <div>
      <a href={tweetURL} target='_blank'><img className="icon-quote" src='./assets/images/twitter.svg'/></a>
    </div>
  );
};

export default TwitterLink;

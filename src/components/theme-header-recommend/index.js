import React, { memo, Fragment } from 'react';
import PropTypes from "prop-types";

import classNames from "classnames";

import "./style.less";
import { Link } from 'react-router-dom';

const ThemeHeaderRecommend = memo(function (props) {
  const { title, tab, more, icon } = props;

  const classes = classNames("theme-header-recommend-wrapper", {
    "theme-header-recommend-hide-icon": icon
  });

  return (
    <div className={classes}>
      <div className="theme-header-left">

        <Link className="title" to="/discover/playlist/">{title}</Link>

        <div className="tab">
          {
            tab.length > 1 && tab.map((item, index) => (
              <Fragment key={index}>
                <a className="tab-item" href="#/">{item}</a>
                {
                  tab.length - 1 === index ? null : <span className="line">|</span>
                }
              </Fragment>
            ))
          }
        </div>
      </div>


      <div className="theme-header-right">

        <Link className="more" to={more}>更多</Link>

        <i className="cor"></i>
      </div>
    </div>
  );
});

ThemeHeaderRecommend.propTypes = {
  title: PropTypes.string.isRequired,
  more: PropTypes.string.isRequired,
  tab: PropTypes.array
}

ThemeHeaderRecommend.defaultProps = {
  tab: [],
  icon: false
}

export default ThemeHeaderRecommend;

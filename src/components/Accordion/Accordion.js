import React, { useState, useMemo, useReducer } from "react";
import Loader from "react-loader-spinner";
import { Scrollbars } from "react-custom-scrollbars";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";

import { AccordionRow } from "./AccordionRow";

import "./styles.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { arrayOf, shape } from "prop-types";

const scrollHight = { height: 500 };
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    padding: "10px",
    paddingRight: "30px",
    backgroundColor: theme.palette.background.paper
  }
}));

const accNum = 5;

const setActiveFoldNum = (activeFoldNum, foldNum) => {
  const current = activeFoldNum === foldNum ? -1 : foldNum;
  return current;
};

export const Accordion = props => {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const [active, setActive] = useReducer(setActiveFoldNum, -1);
  const [itemsNum, setItemsNum] = useState(10);

  const contentMap = (row, index) => {
    const isActive = index === active;
    return (
      <AccordionRow
        content={row}
        active={isActive}
        key={row.id}
        index={index}
        onClick={setActive}
      />
    );
  };

  const loadMore = (acc = accNum) => {
    setLoader(true);
    setTimeout(() => {
      setItemsNum(itemsNum + acc);
      setLoader(false);
    }, 1000);
  };

  const handleScrollFrame = ({ scrollTop, clientHeight, scrollHeight }) => {
    const canLoadMore = props.contents.length > itemsNum;
    if (!canLoadMore && scrollTop - clientHeight < scrollHeight) return;

    const itemNumDiff = props.contents.length - itemsNum;
    let acc = itemNumDiff >= accNum ? accNum : itemNumDiff;
    loadMore(acc);
  };

  const items = useMemo(() => props.contents.slice(0, itemsNum), [
    props.contents,
    itemsNum
  ]);

  return (
    <Scrollbars style={scrollHight} onScrollFrame={handleScrollFrame}>
      <List component="nav" className={classes.root}>
        {items.map(contentMap)}
      </List>
      <div className="loader">
        <Loader
          type="ThreeDots"
          color="lightgray"
          height={100}
          width={100}
          visible={loader}
        />
      </div>
    </Scrollbars>
  );
};

Accordion.propTypes = {
  contents: arrayOf(shape({}))
};

Accordion.defaultProps = {
  contents: []
};
